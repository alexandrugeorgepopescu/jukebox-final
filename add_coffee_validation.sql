-- ================================================================
-- REWIND JUKEBOX - Sistem Validare Cafele (GPS + PIN Barista)
-- Copiaza TOT si ruleaza in Supabase -> SQL Editor -> New Query
-- ================================================================

-- 1. Adauga campuri noi la coffee_purchases
ALTER TABLE coffee_purchases ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE coffee_purchases ADD COLUMN IF NOT EXISTS barista_validated BOOLEAN DEFAULT FALSE;
ALTER TABLE coffee_purchases ADD COLUMN IF NOT EXISTS visit_number INTEGER DEFAULT 1;

-- 2. Tabel config (pentru PIN si alte setari)
CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE config DISABLE ROW LEVEL SECURITY;

-- 3. PIN-ul baristei (6 cifre)
INSERT INTO config (key, value) VALUES ('barista_pin', '493505')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 4. Raza de validare GPS (in metri)
INSERT INTO config (key, value) VALUES ('cafe_radius_meters', '150')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 5. Locatiile cafenelelor (ca JSON array cu lat/lng)
INSERT INTO config (key, value) VALUES ('cafe_locations', '[
  {"name": "Rewind Cafe Pacurari (Kaufland)", "lat": 47.174434, "lng": 27.537209},
  {"name": "Rewind Cafe Miroslava (Family Market)", "lat": 47.145912, "lng": 27.528504},
  {"name": "Rewind Cafe Alexandru (Kaufland)", "lat": 47.167054, "lng": 27.558252},
  {"name": "Rewind Cafe Tudor (Kaufland)", "lat": 47.155830, "lng": 27.604610},
  {"name": "Locatie test", "lat": 47.121838, "lng": 27.570153}
]')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;


-- GATA! Vei vedea "Success. No rows returned."
