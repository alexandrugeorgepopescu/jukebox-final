"use server";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserData(userId: string) {
    noStore();

    const [playlists, rewards, coffeePurchases] = await Promise.all([
        supabaseAdmin
            .from('user_playlists')
            .select('listened_at, songs(*)')
            .eq('user_id', userId)
            .order('listened_at', { ascending: false }),
        supabaseAdmin
            .from('rewards')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false }),
        supabaseAdmin
            .from('coffee_purchases')
            .select('quantity')
            .eq('user_id', userId)
            .eq('barista_validated', true)
    ]);

    // Suma cantitatilor validate - 4 cafele = 4 puncte, nu 1
    const coffeeCount = coffeePurchases.data?.reduce(
        (sum: number, row: { quantity: number }) => sum + (row.quantity || 1), 0
    ) || 0;

    return {
        playlists: playlists.data || [],
        rewards: rewards.data || [],
        coffeeCount
    };
}

export async function getAnnouncements() {
    noStore();
    const { data } = await supabaseAdmin
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
    const { data: existing } = await supabaseAdmin
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
    const { error } = await supabaseAdmin
        .from('rewards')
        .update({
            redeemed: true,
            redeemed_at: new Date().toISOString()
        })
        .eq('id', rewardId);

    if (error) return { error: error.message };
    return { success: true };
}
