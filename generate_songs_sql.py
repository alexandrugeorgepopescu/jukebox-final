# Script Python pentru generarea SQL-ului din fișierul TXT cu melodii
# Rulează: python generate_songs_sql.py

import re

# Funcție pentru a escapa apostrofurile în SQL
def sql_escape(text):
    return text.replace("'", "''")

# Citește fișierul cu melodiile tale (copiat din mesajul tău)
# ÎNLOCUIEȘTE acest string cu datele tale complete
raw_data = """
  U2 - With or Without You", funMessage: "Nu putem trăi fără tine la petrecerea asta!", destinyPrize: "Un shot de Tequila", cat: "RETRO WAVE", yt: "https://www.youtube.com/watch?v=ujNeHIo7oTE", spotify: "https://open.spotify.com/track/4N0fzRX3T7QkOecp3pkWpp", apple: "https://music.apple.com/us/song/with-or-without-you/1440729860" },
  Simple Minds - Don't You (Forget About Me)", funMessage: "Promite-ne că nu ne vei uita pe ringul de dans!", destinyPrize: "O îmbrățișare de grup", cat: "RETRO WAVE", yt: "https://www.youtube.com/watch?v=CdqoNKCCt7A", spotify: "https://open.spotify.com/track/5Y8Rj0s6wuM5DlQdllYiWl", apple: "https://music.apple.com/us/song/dont-you-forget-about-me/1443234020" },
"""

# Parsează fiecare linie
songs = []
for line in raw_data.strip().split('\n'):
    line = line.strip()
    if not line or line.startswith('//'):
        continue
    
    # Extrage câmpurile folosind regex
    match = re.search(r'(.+?)", funMessage: "(.+?)", destinyPrize: "(.+?)", cat: "(.+?)", yt: "(.+?)", spotify: "(.+?)", apple: "(.+?)"', line)
    
    if match:
        title = match.group(1).strip()
        fun_msg = match.group(2)
        prize = match.group(3)
        category = match.group(4).replace(' ', '_')
        yt = match.group(5)
        spotify = match.group(6)
        apple = match.group(7)
        
        songs.append((title, category, fun_msg, prize, yt, spotify, apple))

# Generează SQL
with open('songs_final_import.sql', 'w', encoding='utf-8') as f:
    f.write("-- AUTO-GENERATED: Import complet pentru toate melodiile\n\n")
    
    current_category = None
    for song in songs:
        title, cat, fun, prize, yt, sp, ap = song
        
        # Adaugă comentariu când schimbăm categoria
        if cat != current_category:
            f.write(f"\n-- {cat} ({len([s for s in songs if s[1] == cat])} melodii)\n")
            current_category = cat
        
        # Generează INSERT
        sql = f"""INSERT INTO songs (full_title, category, fun_message, destiny_prize, yt_url, spotify_url, apple_url, active) 
VALUES ('{sql_escape(title)}', '{cat}', '{sql_escape(fun)}', '{sql_escape(prize)}', '{yt}', '{sp}', '{ap}', TRUE);\n"""
        f.write(sql)

print(f"✅ SQL generat cu succes! Total: {len(songs)} melodii")
print("📄 Fișier: songs_final_import.sql")
