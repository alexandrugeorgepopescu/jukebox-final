"use server";

import { supabase } from "@/lib/supabase";

import { unstable_noStore as noStore } from 'next/cache';

export async function getUserData(userId: string) {
    noStore(); // dezactivează cache-ul Next.js pt rezultate live
    // Fetch Playlist
    const { data: playlists } = await supabase
        .from('user_playlists')
        .select('listened_at, songs(*)')
        .eq('user_id', userId)
        .order('listened_at', { ascending: false });

    // Fetch Rewards
    const { data: rewards } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    return { playlists: playlists || [], rewards: rewards || [] };
}

export async function redeemReward(rewardId: string) {
    const { error } = await supabase
        .from('rewards')
        .update({
            redeemed: true,
            redeemed_at: new Date().toISOString()
        })
        .eq('id', rewardId);

    if (error) {
        return { error: error.message };
    }
    return { success: true };
}
