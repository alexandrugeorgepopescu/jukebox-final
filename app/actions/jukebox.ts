"use server";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Song } from "@/lib/types";

export async function performDrop(userId: string, musicPrefs: string[], isTester?: boolean) {
    const now = new Date();
    const currentHour = now.getUTCHours() + 3; // Romanian time (EEST - ora de vară)

    // 1. Verificare Interval Orar (07:00 - 21:00) - testers ocolesc
    if (!isTester && (currentHour < 7 || currentHour >= 21)) {
        return {
            error: "Jukebox-ul doarme! Te așteptăm între 07:00 și 21:00 la o cafea.",
            fomo: "Noaptea e pentru visat. Ne vedem dimineată cu forțe proaspete."
        };
    }

    const today = now.toISOString().split('T')[0];

    // 2. Verificare Scanare per vizită validată - testerii pot scana oricât
    if (!isTester) {
        const today = now.toISOString().split('T')[0];

        // Câte cafele validate are azi?
        const { count: visitCount } = await supabase
            .from('coffee_purchases')
            .select('id', { count: 'exact' })
            .eq('user_id', userId)
            .eq('barista_validated', true)
            .gte('purchased_at', `${today}T00:00:00Z`);

        if (!visitCount || visitCount === 0) {
            return { error: "Trebuie să înregistrezi o cafea înainte de Drop the Beat!" };
        }

        // Câte drop-uri a folosit azi?
        const { count: scanCount } = await supabase
            .from('scans')
            .select('id', { count: 'exact' })
            .eq('user_id', userId)
            .gte('scanned_at', `${today}T00:00:00Z`);

        if ((scanCount || 0) >= visitCount) {
            const mockedFomo = [
                "User-ul 'Nightrider' tocmai a extras un Flat White gratuit!",
                "Mai sunt 3 surprize mari ascunse în Jukebox astăzi.",
                "O piesă legendară tocmai a fost deblocată la masa 4."
            ];
            return {
                error: "Ai folosit Drop the Beat pentru această vizită! Revino cu o nouă cafea.",
                fomo: mockedFomo[Math.floor(Math.random() * mockedFomo.length)]
            };
        }
    }


    // 3. Alegere Piesă - NUMAI din categoriile selectate de utilizator
    const allCategories = ['RETRO_WAVE', 'CHILL_FLOW', 'GOOD_VIBE', 'BASS_MODE', 'SOUL_SELECT', 'MAIN_CHARACTER'];
    let { data: songs, error: fetchErr } = await supabase
        .from('songs')
        .select('*')
        .filter('active', 'eq', true)
        .in('category', musicPrefs && musicPrefs.length > 0 ? musicPrefs : allCategories);

    if (fetchErr || !songs || songs.length === 0) {
        const { data: fallback } = await supabase.from('songs').select('*').limit(10);
        songs = fallback || [];
    }

    if (!songs || songs.length === 0) {
        return { error: "Nu am găsit nicio piesă momentan. Sistemul se resetează." };
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    // 4. Salvare Scan (cu admin client - bypass RLS)
    const { error: scanErr } = await supabaseAdmin.from('scans').insert({
        user_id: userId,
        song_id: randomSong.id
    });
    if (scanErr) {
        console.error("Scan Error:", scanErr);
        return { error: "Eroare la înregistrarea scanării. Mesaj intern: " + scanErr.message };
    }

    // 5. Salvare in User Playlist (cu admin client - bypass RLS)
    const { error: plErr } = await supabaseAdmin.from('user_playlists').insert({
        user_id: userId,
        song_id: randomSong.id
    });
    if (plErr) {
        console.error("Playlist Error:", plErr);
        return { error: "Eroare la adăugarea în playlist. Mesaj: " + plErr.message };
    }

    // 6. Creare Voucher - NUMAI cu 60% șanse (nu la fiecare drop)
    let voucherAwarded = false;
    if (randomSong.destiny_prize && Math.random() < 0.50) {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);

        const { error: rewardErr } = await supabaseAdmin.from('rewards').insert({
            user_id: userId,
            type: randomSong.destiny_prize,
            code: `RWND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            expires_at: expireDate.toISOString()
        });
        if (rewardErr) {
            console.error("Reward Error:", rewardErr);
            // Nu oprim fluxul principal dacă reward-ul pică, melodia tot apare
        } else {
            voucherAwarded = true;
        }
    }

    return {
        song: {
            id: randomSong.id,
            fullTitle: randomSong.full_title,
            funMessage: randomSong.fun_message,
            // destinyPrize apare în UI NUMAI dacă voucherul a fost efectiv creat
            destinyPrize: voucherAwarded ? randomSong.destiny_prize : null,
            cat: randomSong.category,
            yt: randomSong.yt_url,
            spotify: randomSong.spotify_url,
            apple: randomSong.apple_url
        }
    };
}

