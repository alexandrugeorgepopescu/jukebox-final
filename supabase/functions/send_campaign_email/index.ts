import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const UNSUBSCRIBE_SECRET = Deno.env.get("UNSUBSCRIBE_SECRET");
const SITE_URL = Deno.env.get("NEXT_PUBLIC_SITE_URL") || "https://app.rewindcafe.ro";

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const TEMPLATES: Record<string, { subject: string; bodyHtml: string }> = {
    aproape_de_premiu: {
        subject: "O singură cafea te desparte de premiul tău gratuit! ☕",
        bodyHtml: `
            <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center;">
                <h1 style="color: #a855f7; font-size: 28px; margin-bottom: 10px;">REWIND JUKEBOX</h1>
                <p style="color: #c084fc; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">COFFEE • MUSIC • VIBE</p>
                <div style="background-color: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 30px; margin: 30px 0; text-align: left;">
                    <h2 style="color: #fff; font-size: 20px;">Salut, {{nume}}!</h2>
                    <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                        Ești la doar <strong>{{cafele_ramase}} cafea</strong> de voucherul tău gratuit! Treci pe la una dintre locațiile noastre Rewind și deblochează recompensa.
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="{{link_app}}" style="background: linear-gradient(to right, #9333ea, #4f46e5); color: #fff; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 12px; display: inline-block;">
                            DESCHIDE JUKEBOX-UL
                        </a>
                    </div>
                </div>
                <p style="color: #71717a; font-size: 11px;">
                    Dacă nu mai dorești să primești aceste emailuri, te poți <a href="{{link_unsubscribe}}" style="color: #a855f7;">dezabona aici</a>.
                </p>
            </div>
        `
    },
    adormiti: {
        subject: "Ritmul tău ne lipsește la Rewind! 🎵",
        bodyHtml: `
            <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center;">
                <h1 style="color: #a855f7; font-size: 28px; margin-bottom: 10px;">REWIND JUKEBOX</h1>
                <p style="color: #c084fc; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">COFFEE • MUSIC • VIBE</p>
                <div style="background-color: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 30px; margin: 30px 0; text-align: left;">
                    <h2 style="color: #fff; font-size: 20px;">Hei, {{nume}}!</h2>
                    <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                        Cafeaua ta preferată și cel mai bun vibe sonor te așteaptă! Treci pe la noi pentru doza zilnică de energie și dă un spin la Jukebox.
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="{{link_app}}" style="background: linear-gradient(to right, #9333ea, #4f46e5); color: #fff; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 12px; display: inline-block;">
                            VEZI CE E NOU LA REWIND
                        </a>
                    </div>
                </div>
                <p style="color: #71717a; font-size: 11px;">
                    Dacă nu mai dorești să primești aceste emailuri, te poți <a href="{{link_unsubscribe}}" style="color: #a855f7;">dezabona aici</a>.
                </p>
            </div>
        `
    },
    inactivi: {
        subject: "Pauza ta de cafea te așteaptă! ☕✨",
        bodyHtml: `
            <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center;">
                <h1 style="color: #a855f7; font-size: 28px; margin-bottom: 10px;">REWIND JUKEBOX</h1>
                <p style="color: #c084fc; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">COFFEE • MUSIC • VIBE</p>
                <div style="background-color: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 30px; margin: 30px 0; text-align: left;">
                    <h2 style="color: #fff; font-size: 20px;">Salut, {{nume}}!</h2>
                    <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                        A trecut ceva timp de la ultima ta vizită. Treci pe la Rewind Păcurari, Alexandru sau Miroslava pentru a-ți reseta frecvența!
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="{{link_app}}" style="background: linear-gradient(to right, #9333ea, #4f46e5); color: #fff; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 12px; display: inline-block;">
                            REVIENI ÎN TRIB
                        </a>
                    </div>
                </div>
                <p style="color: #71717a; font-size: 11px;">
                    Dacă nu mai dorești să primești aceste emailuri, te poți <a href="{{link_unsubscribe}}" style="color: #a855f7;">dezabona aici</a>.
                </p>
            </div>
        `
    }
};

async function createSignedToken(userId: string, secret: string): Promise<string> {
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
    const hmacHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    return `${userId}.${hmacHex}`;
}

serve(async (req) => {
    try {
        if (!RESEND_API_KEY) {
            return new Response(JSON.stringify({ error: "RESEND_API_KEY is not set" }), { status: 500 });
        }
        if (!UNSUBSCRIBE_SECRET) {
            return new Response(JSON.stringify({ error: "UNSUBSCRIBE_SECRET is not set" }), { status: 500 });
        }

        // Extrage utilizatorii eligibili
        const { data: users, error: rpcError } = await supabase.rpc("get_email_segments");
        if (rpcError) {
            return new Response(JSON.stringify({ error: rpcError.message }), { status: 500 });
        }

        const sentLogs = [];

        for (const user of users || []) {
            const templateObj = TEMPLATES[user.segment] || TEMPLATES.adormiti;

            // Generare token semnat HMAC-SHA256 pentru dezabonare (IDOR proof)
            const signedToken = await createSignedToken(user.user_id, UNSUBSCRIBE_SECRET);
            const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${signedToken}`;

            const htmlContent = templateObj.bodyHtml
                .replace(/{{nume}}/g, user.name || "Pasionat de Cafea")
                .replace(/{{cafele_ramase}}/g, String(user.coffees_remained || 1))
                .replace(/{{link_app}}/g, SITE_URL)
                .replace(/{{link_unsubscribe}}/g, unsubscribeUrl);

            // Subdomeniul de trimitere izolat: send.rewindcafe.ro
            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: "Rewind Cafe <vibe@send.rewindcafe.ro>",
                    to: [user.email],
                    subject: templateObj.subject,
                    html: htmlContent
                })
            });

            if (resendRes.ok) {
                // Înregistrează expedierea în email_log (anti-spam 14 zile)
                await supabase.from("email_log").insert({
                    user_id: user.user_id,
                    segment: user.segment,
                    template_key: user.segment
                });
                sentLogs.push({ user_id: user.user_id, email: user.email, segment: user.segment });
            }
        }

        return new Response(JSON.stringify({ success: true, count: sentLogs.length, sent: sentLogs }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
});
