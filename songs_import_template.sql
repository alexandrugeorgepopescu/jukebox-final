-- Template pentru import bulk de 300 de melodii
-- Copiază acest template și completează pentru fiecare melodie

INSERT INTO songs (full_title, category, fun_message, destiny_prize, yt_url, spotify_url, apple_url, active) VALUES
('The Weeknd - Blinding Lights', 'RETRO_WAVE', 'Nostalgie pură, energie nouă!', 'Free Espresso', 'https://youtube.com/watch?v=4NRXx6U8ABQ', 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b', 'https://music.apple.com/us/album/blinding-lights/1499378108', TRUE),
('Dua Lipa - Levitating', 'GOOD_VIBE', 'Instant mood upgrade!', 'Free Croissant', 'https://youtube.com/watch?v=TUVcZfQe-Kw', 'https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9', 'https://music.apple.com/us/album/levitating/1590035691', TRUE),
('Lofi Girl - Study Beats', 'CHILL_FLOW', 'Slow down. Stay sharp.', NULL, 'https://youtube.com/watch?v=jfKfPfyJRdk', 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM', NULL, TRUE);

-- INSTRUCȚIUNI PENTRU BULK IMPORT:
-- 1. Deschide fișierul CSV/Excel cu cele 300 de melodii
-- 2. Creează query-uri INSERT pentru fiecare melodie folosind template-ul de mai sus
-- 3. SAU: Folosește "Import data from CSV" în Supabase Table Editor
--    (Table Editor -> songs -> Import data from CSV)
