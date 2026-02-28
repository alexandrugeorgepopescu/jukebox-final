"use server";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserData(userId: string) {
    noStore();

    const [playlists, rewards, coffeeCount] = await Promise.all([
        supabase
            .from('user_playlists')
            .select('listened_at, songs(*)')
            .eq('user_id', userId)
            .order('listened_at', { ascending: false }),
        supabase
            .from('rewards')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false }),
        supabase
            .from('coffee_purchases')
            .select('id', { count: 'exact' })
            .eq('user_id', userId)
    ]);

    return {
        playlists: playlists.data || [],
        rewards: rewards.data || [],
        coffeeCount: coffeeCount.count || 0
    };
}

export async function getAnnouncements() {
    noStore();
    const { data } = await supabase
        .from('announcements')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(20);
    return data || [];
}

export async function checkBirthdayReward(userId: string, birthDate?: string) {
    if (!birthDate) return;

    const today = new Date();
    const bday = new Date(birthDate);
    const isBirthday = today.getMonth() === bday.getMonth() && today.getDate() === bday.getDate();
    if (!isBirthday) return;

    // Verifica daca nu a primit deja cadoul de ziua azi
    const thisYear = today.getFullYear();
    const { data: existing } = await supabase
        .from('rewards')
        .select('id')
        .eq('user_id', userId)
        .eq('type', 'BIRTHDAY: Cafea + Prajitura Gratuita 🎂')
        .gte('created_at', `${thisYear}-01-01T00:00:00Z`);

    if (existing && existing.length > 0) return; // deja primit

    // Creeaza cadoul
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);
    await supabaseAdmin.from('rewards').insert({
        user_id: userId,
        type: 'BIRTHDAY: Cafea + Prajitura Gratuita 🎂',
        code: `BDAY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        expires_at: expire.toISOString()
    });
}

export async function redeemReward(rewardId: string) {
    const { error } = await supabase
        .from('rewards')
        .update({
            redeemed: true,
            redeemed_at: new Date().toISOString()
        })
        .eq('id', rewardId);

    if (error) return { error: error.message };
    return { success: true };
}
