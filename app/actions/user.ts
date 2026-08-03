"use server";

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

    const thisYear = today.getFullYear();
    const { data: existing } = await supabaseAdmin
        .from('rewards')
        .select('id')
        .eq('user_id', userId)
        .eq('type', 'BIRTHDAY: Cafea + Prajitura Gratuita 🎂')
        .gte('created_at', `${thisYear}-01-01T00:00:00Z`);

    if (existing && existing.length > 0) return;

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

// ─── GDPR OPT-OUT HMAC SIGNATURE VERIFICATION ────────────────────────────────
async function verifyHmacToken(token: string): Promise<string | null> {
    if (!token || !token.includes(".")) return null;
    const [userId, hmacHex] = token.split(".");
    if (!userId || !hmacHex) return null;

    const secret = process.env.UNSUBSCRIBE_SECRET;
    if (!secret) {
        console.error("CRITICAL: UNSUBSCRIBE_SECRET environment variable is missing!");
        return null;
    }
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(userId));
    const expectedHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    if (expectedHex === hmacHex) {
        return userId;
    }
    return null;
}

export async function optOutEmail(token: string) {
    const userId = await verifyHmacToken(token);
    if (!userId) {
        return { error: "Token de dezabonare invalid sau modificat. Solicitarea a fost respinsă din motive de securitate." };
    }

    const { error } = await supabaseAdmin
        .from('users')
        .update({ email_opt_out: true })
        .eq('id', userId);

    if (error) return { error: error.message };
    return { success: true };
}
