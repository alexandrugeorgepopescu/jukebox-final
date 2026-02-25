"use server";

import { supabase } from "@/lib/supabase";
import { Song } from "@/lib/types";

export async function performDrop(userId: string, musicPrefs: string[]) {
    const now = new Date();
    // In UTC or local? Usually better to pass from client or assume server timezone. We'll use getUTCHours + 2 for Romanian time approximate (EET)
    // Actually, simple JS date gets server time.
    const currentHour = now.getUTCHours() + 2;

    // 1. Verificare Interval Orar (07:00 - 21:00)
    if (currentHour < 7 || currentHour >= 21) {
        return {
            error: "Jukebox-ul doarme! Te așteptăm între 07:00 și 21:00 la o cafea.",
            fomo: "Noaptea e pentru visat. Ne vedem dimineață cu forțe proaspete."
        };
    }

    const today = now.toISOString().split('T')[0];

    // 2. Verificare Scanare Unică
    const { data: existingScan } = await supabase
        .from('scans')
        .select('id')
        .eq('user_id', userId)
        .gte('scanned_at', `${today}T00:00:00Z`)
        .single();

    if (existingScan) {
        // FOMO effect
        const mockedFomo = [
            "User-ul 'Nightrider' tocmai a extras un Flat White gratuit!",
            "Mai sunt 3 surprize mari ascunse in Jukebox astăzi.",
            "O piesă legendară tocmai a fost deblocată la masa 4."
        ];
        return {
            error: "Ți-ai primit deja doza de muzică pe ziua de azi! Revino mâine.",
            fomo: mockedFomo[Math.floor(Math.random() * mockedFomo.length)]
        };
    }

    // 3. Alegere Piesă
    let { data: songs, error: fetchErr } = await supabase
        .from('songs')
        .select('*')
        .filter('active', 'eq', true)
        .in('category', musicPrefs && musicPrefs.length > 0 ? musicPrefs : ['RETRO_WAVE']);

    if (fetchErr || !songs || songs.length === 0) {
        const { data: fallback } = await supabase.from('songs').select('*').limit(10);
        songs = fallback || [];
    }

    if (!songs || songs.length === 0) {
        return { error: "Nu am găsit nicio piesă momentan. Sistemul se resetează." };
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    // 4. Salvare Scan
    await supabase.from('scans').insert({
        user_id: userId,
        song_id: randomSong.id
    });

    // 5. Salvare in User Playlist
    await supabase.from('user_playlists').insert({
        user_id: userId,
        song_id: randomSong.id
    });

    // 6. Creare Voucher daca exista premiu
    if (randomSong.destiny_prize) {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30); // valabil 30 zile

        await supabase.from('rewards').insert({
            user_id: userId,
            type: randomSong.destiny_prize,
            code: `RWND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            expires_at: expireDate.toISOString()
        });
    }

    return {
        song: {
            id: randomSong.id,
            fullTitle: randomSong.full_title,
            funMessage: randomSong.fun_message,
            destinyPrize: randomSong.destiny_prize,
            cat: randomSong.category,
            yt: randomSong.yt_url,
            spotify: randomSong.spotify_url,
            apple: randomSong.apple_url
        }
    };
}
