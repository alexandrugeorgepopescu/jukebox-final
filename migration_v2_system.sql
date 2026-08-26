-- ============================================================
-- REWIND JUKEBOX — SPRINT 1 MIGRATION
-- File: migration_v2_system.sql
-- Run this script in Supabase SQL Editor (Dashboard -> SQL Editor)
-- ============================================================

-- 1. ADĂUGARE COLOANE NOI PE TABELELE EXISTENTE
ALTER TABLE public.coffee_purchases 
ADD COLUMN IF NOT EXISTS location text;

ALTER TABLE public.rewards
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email_opt_out boolean DEFAULT false;

-- 2. TABELA EMAIL_LOG (Anti-Spam & Tracking Emailuri)
CREATE TABLE IF NOT EXISTS public.email_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    segment text NOT NULL,
    template_key text NOT NULL,
    sent_at timestamptz DEFAULT now()
);

ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;

-- Politică RLS pentru email_log (doar service_role poate citi și scrie)
DROP POLICY IF EXISTS "email_log_service_role_all" ON public.email_log;
CREATE POLICY "email_log_service_role_all"
    ON public.email_log
    FOR ALL
    TO service_role
    USING (true);

-- 3. VIEW: public.v_user_ltv (Fără multiplicare rânduri din JOIN-uri)
CREATE OR REPLACE VIEW public.v_user_ltv AS
WITH cafele AS (
    SELECT 
        user_id, 
        COALESCE(SUM(quantity), 0) AS total_cafele,
        MAX(purchased_at) AS ultima_cafea
    FROM public.coffee_purchases
    WHERE barista_validated = true
    GROUP BY user_id
),
vouchere AS (
    SELECT 
        user_id,
        COUNT(*) AS total_primite,
        COUNT(*) FILTER (WHERE redeemed = true) AS total_folosite
    FROM public.rewards
    GROUP BY user_id
)
SELECT 
    u.id, 
    u.name, 
    u.email, 
    u.coffee_preference, 
    u.music_preferences,
    u.created_at,
    u.email_opt_out,
    COALESCE(c.total_cafele, 0) AS total_cafele,
    c.ultima_cafea,
    COALESCE(v.total_primite, 0) AS vouchere_primite,
    COALESCE(v.total_folosite, 0) AS vouchere_folosite
FROM public.users u
LEFT JOIN cafele c ON u.id = c.user_id
LEFT JOIN vouchere v ON u.id = v.user_id;

-- 4. RPC: is_within_radius(p_lat float, p_lng float)
-- Verifică Haversine direct în baza de date
CREATE OR REPLACE FUNCTION public.is_within_radius(
    p_lat float8,
    p_lng float8
)
RETURNS TABLE (
    is_inside boolean,
    location_name text,
    distance_meters float8
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_radius float8 := 150.0;
    v_locations_json text;
    v_loc jsonb;
    v_cafes jsonb;
    v_lat float8;
    v_lng float8;
    v_name text;
    v_dist float8;
    v_min_dist float8 := 999999999.0;
    v_best_name text := NULL;
    v_r float8 := 6371000.0;
    v_dlat float8;
    v_dlng float8;
    v_a float8;
    v_c float8;
BEGIN
    SELECT value INTO v_radius 
    FROM public.config 
    WHERE key = 'cafe_radius_meters';
    
    IF v_radius IS NULL THEN
        v_radius := 150.0;
    END IF;

    SELECT value INTO v_locations_json 
    FROM public.config 
    WHERE key = 'cafe_locations';

    IF v_locations_json IS NOT NULL AND v_locations_json != '' THEN
        v_cafes := v_locations_json::jsonb;
        
        FOR v_loc IN SELECT * FROM jsonb_array_elements(v_cafes)
        LOOP
            v_lat := (v_loc->>'lat')::float8;
            v_lng := (v_loc->>'lng')::float8;
            v_name := v_loc->>'name';

            v_dlat := radians(v_lat - p_lat);
            v_dlng := radians(v_lng - p_lng);
            v_a := sin(v_dlat/2.0) * sin(v_dlat/2.0) +
                   cos(radians(p_lat)) * cos(radians(v_lat)) *
                   sin(v_dlng/2.0) * sin(v_dlng/2.0);
            v_c := 2.0 * atan2(sqrt(v_a), sqrt(1.0 - v_a));
            v_dist := v_r * v_c;

            IF v_dist < v_min_dist THEN
                v_min_dist := v_dist;
                v_best_name := v_name;
            END IF;
        END LOOP;
    ELSE
        v_best_name := 'Rewind Cafe Pacurari';
        v_min_dist := 0;
    END IF;

    IF v_min_dist <= v_radius THEN
        RETURN QUERY SELECT true, v_best_name, v_min_dist;
    ELSE
        RETURN QUERY SELECT false, COALESCE(v_best_name, 'Locație Necunoscută'), v_min_dist;
    END IF;
END;
$$;

-- 5. RPC: register_coffee_purchase(...)
-- Tranzacție atomică pentru achiziții, loialitate 1->8 și Micro-Reward la a 4-a cafea din ciclu
CREATE OR REPLACE FUNCTION public.register_coffee_purchase(
    p_user_id uuid,
    p_coffee_type text,
    p_quantity int,
    p_barista_validated boolean DEFAULT true,
    p_location text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_prev_total int := 0;
    v_new_total int := 0;
    v_prev_cycle int := 0;
    v_new_cycle int := 0;
    v_prev_pos int := 0;
    v_new_pos int := 0;
    v_mid_reward_type text := '⚡ SIROP EXTRA GRATUIT - Mid-Cycle Reward';
    v_expire_mid timestamptz;
    v_expire_full timestamptz;
    v_code_mid text;
    v_code_full text;
    v_mid_awarded boolean := false;
    v_full_awarded boolean := false;
    v_visit_number int := 1;
    v_today text;
BEGIN
    v_today := to_char(now(), 'YYYY-MM-DD');

    -- Calculare număr vizită astăzi
    SELECT COALESCE(COUNT(*), 0) + 1 INTO v_visit_number
    FROM public.coffee_purchases
    WHERE user_id = p_user_id
      AND purchased_at >= (v_today || 'T00:00:00Z')::timestamptz;

    -- Calculare total cafele validate anterior
    SELECT COALESCE(SUM(quantity), 0) INTO v_prev_total
    FROM public.coffee_purchases
    WHERE user_id = p_user_id AND barista_validated = true;

    -- Inserare achiziție
    INSERT INTO public.coffee_purchases (
        user_id,
        coffee_type,
        quantity,
        barista_validated,
        visit_number,
        location,
        purchased_at
    ) VALUES (
        p_user_id,
        p_coffee_type,
        p_quantity,
        p_barista_validated,
        v_visit_number,
        p_location,
        now()
    );

    IF p_barista_validated THEN
        v_new_total := v_prev_total + p_quantity;

        v_prev_cycle := v_prev_total / 8;
        v_new_cycle := v_new_total / 8;

        v_prev_pos := v_prev_total % 8;
        v_new_pos := v_new_total % 8;

        -- 1. VERIFICARE MICRO-REWARD LA A 4-A CAFEA DIN CICLU (Anti-duplicat per ciclu)
        IF (v_prev_pos < 4 AND (v_new_pos >= 4 OR v_new_cycle > v_prev_cycle)) THEN
            -- Verificare anti-duplicat pentru acest ciclu
            IF NOT EXISTS (
                SELECT 1 FROM public.rewards 
                WHERE user_id = p_user_id 
                  AND (metadata->>'cycle_index')::int = v_prev_cycle
                  AND (metadata->>'position')::int = 4
            ) THEN
                SELECT COALESCE(value, '⚡ SIROP EXTRA GRATUIT - Mid-Cycle Reward') INTO v_mid_reward_type
                FROM public.config WHERE key = 'mid_cycle_reward_type';

                v_expire_mid := now() + interval '14 days';
                v_code_mid := 'MID4-' || upper(substring(md5(random()::text) from 1 for 6));

                INSERT INTO public.rewards (
                    user_id,
                    type,
                    code,
                    expires_at,
                    metadata
                ) VALUES (
                    p_user_id,
                    v_mid_reward_type,
                    v_code_mid,
                    v_expire_mid,
                    jsonb_build_object('cycle_index', v_prev_cycle, 'position', 4)
                );

                v_mid_awarded := true;
            END IF;
        END IF;

        -- 2. VERIFICARE REWARD COMPLET (LA A 8-A CAFEA DIN CICLU)
        IF v_new_cycle > v_prev_cycle THEN
            v_expire_full := now() + interval '30 days';
            v_code_full := 'LOYA-' || upper(substring(md5(random()::text) from 1 for 6));

            INSERT INTO public.rewards (
                user_id,
                type,
                code,
                expires_at,
                metadata
            ) VALUES (
                p_user_id,
                '☕ CAFEA GRATUITA - Loyalty Reward',
                v_code_full,
                v_expire_full,
                jsonb_build_object('cycle_index', v_new_cycle)
            );

            v_full_awarded := true;
        END IF;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'previous_total', v_prev_total,
        'new_total', v_new_total,
        'mid_reward_awarded', v_mid_awarded,
        'full_reward_awarded', v_full_awarded,
        'visit_number', v_visit_number
    );
END;
$$;

-- 6. RPC: get_email_segments()
-- Returnează utilizatorii eligibili pentru email cu regula anti-spam 14 zile
CREATE OR REPLACE FUNCTION public.get_email_segments()
RETURNS TABLE (
    user_id uuid,
    email text,
    name text,
    segment text,
    coffees_remained int
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id AS user_id,
        v.email::text,
        v.name::text,
        CASE 
            WHEN (v.total_cafele % 8) IN (6, 7) THEN 'aproape_de_premiu'
            WHEN v.total_cafele BETWEEN 1 AND 2 THEN 'adormiti'
            WHEN (v.ultima_cafea < (now() - interval '30 days') AND v.total_cafele >= 3) THEN 'inactivi'
            ELSE 'none'
        END AS segment,
        (8 - (v.total_cafele % 8))::int AS coffees_remained
    FROM public.v_user_ltv v
    WHERE v.email_opt_out = false
      AND (
        (v.total_cafele % 8) IN (6, 7)
        OR v.total_cafele BETWEEN 1 AND 2
        OR (v.ultima_cafea < (now() - interval '30 days') AND v.total_cafele >= 3)
      )
      -- Regula anti-spam: maxim 1 email per user în ultimele 14 zile
      AND NOT EXISTS (
        SELECT 1 FROM public.email_log el
        WHERE el.user_id = v.id
          AND el.sent_at > (now() - interval '14 days')
      );
END;
$$;

-- 7. CONFIG: Plafon Acuratețe GPS (modificabil din Supabase fara redeploy)
INSERT INTO public.config (key, value)
VALUES ('max_gps_accuracy_meters', '200')
ON CONFLICT (key) DO UPDATE SET value = '200';

