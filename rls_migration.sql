-- ============================================================
-- RLS MIGRATION: Rewind Jukebox - Enable Row-Level Security
-- ============================================================
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- The service_role key (supabaseAdmin) bypasses RLS entirely, so all
-- existing server actions that use supabaseAdmin continue to work.
-- The anon key (supabase client) is bound by these policies.
-- ============================================================


-- ============================================================
-- 1. SONGS (public read, no user writes via anon)
-- ============================================================
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Anyone (including logged-out users on the landing page) can read active songs
CREATE POLICY "songs_select_all"
    ON public.songs
    FOR SELECT
    USING (true);

-- Inserts/updates only via service_role (supabaseAdmin) — no anon policy needed


-- ============================================================
-- 2. USERS (users read/update their own row only)
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- A user can read their own profile
CREATE POLICY "users_select_own"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- A user can update their own profile
CREATE POLICY "users_update_own"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Insert is done via supabaseAdmin (signUpUser action) — no anon insert policy needed


-- ============================================================
-- 3. COFFEE_PURCHASES (users read their own; inserts via admin)
-- ============================================================
ALTER TABLE public.coffee_purchases ENABLE ROW LEVEL SECURITY;

-- A user can read their own coffee purchase history (for loyalty bar, visit count)
CREATE POLICY "coffee_purchases_select_own"
    ON public.coffee_purchases
    FOR SELECT
    USING (auth.uid() = user_id);

-- Inserts are done via supabaseAdmin (registerCoffeePurchase) — no anon insert policy needed


-- ============================================================
-- 4. REWARDS (users read their own; insert/update via admin or own)
-- ============================================================
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- A user can read their own rewards
CREATE POLICY "rewards_select_own"
    ON public.rewards
    FOR SELECT
    USING (auth.uid() = user_id);

-- A user can mark their own reward as redeemed (redeemReward action uses anon client)
CREATE POLICY "rewards_update_own"
    ON public.rewards
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Inserts are done via supabaseAdmin — no anon insert policy needed


-- ============================================================
-- 5. SCANS (users read their own; inserts via admin)
-- ============================================================
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- A user can read their own scan history (for daily drop count check)
CREATE POLICY "scans_select_own"
    ON public.scans
    FOR SELECT
    USING (auth.uid() = user_id);

-- Inserts are done via supabaseAdmin (performDrop) — no anon insert policy needed


-- ============================================================
-- 6. USER_PLAYLISTS (users read their own; inserts via admin)
-- ============================================================
ALTER TABLE public.user_playlists ENABLE ROW LEVEL SECURITY;

-- A user can read their own playlist
CREATE POLICY "user_playlists_select_own"
    ON public.user_playlists
    FOR SELECT
    USING (auth.uid() = user_id);

-- Inserts are done via supabaseAdmin (performDrop) — no anon insert policy needed


-- ============================================================
-- 7. ANNOUNCEMENTS (public read, admin-only writes)
-- ============================================================
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read active announcements
-- (getAnnouncements() uses anon client with no auth check)
CREATE POLICY "announcements_select_all"
    ON public.announcements
    FOR SELECT
    USING (true);

-- Inserts/updates only via service_role (update_news.mjs / Supabase dashboard)


-- ============================================================
-- 8. CONFIG (authenticated read only; admin-only writes)
-- ============================================================
ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read config (barista PIN check, cafe locations, etc.)
-- Note: barista_pin is sensitive — if you want extra hardening, move PIN
-- validation entirely to a server action using supabaseAdmin and remove this policy.
CREATE POLICY "config_select_authenticated"
    ON public.config
    FOR SELECT
    TO authenticated
    USING (true);

-- Writes only via service_role


-- ============================================================
-- VERIFICATION QUERIES
-- Run these after applying to confirm RLS is enabled on all tables
-- ============================================================
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
--   AND tablename IN ('songs','users','coffee_purchases','rewards','scans','user_playlists','announcements','config');
