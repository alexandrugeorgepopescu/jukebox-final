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

export async function sendTestCampaignEmail(targetEmail: string) {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
        return { error: "RESEND_API_KEY is not set in Vercel environment variables." };
    }

    const secret = process.env.UNSUBSCRIBE_SECRET;
    if (!secret) {
        return { error: "UNSUBSCRIBE_SECRET is not set in Vercel environment variables." };
    }

    const { data: user } = await supabaseAdmin
        .from('users')
        .select('id, name, email')
        .eq('email', targetEmail.toLowerCase())
        .single();

    if (!user) {
        return { error: `Utilizatorul cu email-ul ${targetEmail} nu a fost găsit în baza de date.` };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://app.rewindcafe.ro";
    
    // Generare token HMAC semnat
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(user.id));
    const hmacHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");
    const signedToken = `${user.id}.${hmacHex}`;
    
    const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${signedToken}`;

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center;">
            <h1 style="color: #a855f7; font-size: 28px; margin-bottom: 10px;">REWIND JUKEBOX</h1>
            <p style="color: #c084fc; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">COFFEE • MUSIC • VIBE</p>
            <div style="background-color: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 30px; margin: 30px 0; text-align: left;">
                <h2 style="color: #fff; font-size: 20px;">Salut, ${user.name || "Pasionat de Cafea"}!</h2>
                <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                    Ești la doar <strong>1 cafea</strong> de voucherul tău gratuit! Treci pe la una dintre locațiile noastre Rewind și deblochează recompensa.
                </p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${siteUrl}" style="background: linear-gradient(to right, #9333ea, #4f46e5); color: #fff; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 12px; display: inline-block;">
                        DESCHIDE JUKEBOX-UL
                    </a>
                </div>
            </div>
            <p style="color: #71717a; font-size: 11px;">
                Dacă nu mai dorești să primești aceste emailuri, te poți <a href="${unsubscribeUrl}" style="color: #a855f7;">dezabona aici</a>.
            </p>
        </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
            from: "Rewind Cafe <vibe@send.rewindcafe.ro>",
            to: [user.email],
            subject: "O singură cafea te desparte de premiul tău gratuit! ☕",
            html: htmlContent
        })
    });

    if (!res.ok) {
        const errText = await res.text();
        return { error: `Resend API Error: ${errText}` };
    }

    await supabaseAdmin.from("email_log").insert({
        user_id: user.id,
        segment: "aproape_de_premiu",
        template_key: "aproape_de_premiu"
    });

    return { success: true };
}

