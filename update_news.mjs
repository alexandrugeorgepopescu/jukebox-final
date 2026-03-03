import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newsItems = [
    {
        title: "Bun venit în Tribul Rewind!",
        body: "Vibe de primăvară și premii zilnice! Dă un spin la Jukebox, descoperă melodia zilei și prinde surprizele din portofel. Îți spunem un secret: negociem cu marile festivaluri pentru a pune la bătaie câte 2 invitații VIP pe fiecare categorie muzicală! Până la marele anunț, bucură-te de voucherele tale zilnice la bar.",
        category: "event",
        emoji: "🎵",
        active: true
    },
    {
        title: "A 9-a cafea e mereu din partea casei!",
        body: "Ritmul tău merită răsplătit. Savurează 8 cafele la noi, iar sistemul îți generează automat un voucher cadou direct în portofelul tău digital. Fără cartoane pierdute, doar o experiență simplă, rapidă și cu gust de „mai vreau”. Ne vedem la cafea?",
        category: "promo",
        emoji: "☕",
        active: true
    },
    {
        title: "Călătorie la origini: Păcurari vs. Miroslava",
        body: "Primăvara asta schimbăm vibe-ul în ceașcă! Treci pe la Rewind Păcurari pentru opțiunea BOMBON – o explozie exotică cu note de bomboane de căpșuni, ciocolată cu lapte și vanilie. Ești în Miroslava? Cere ETHIOPIA GUJI SHAKISO pentru un profil rafinat, cu coacăze negre și nectarine. Tu din ce tabără faci parte?",
        category: "menu",
        emoji: "🌍",
        active: true
    },
    {
        title: "Signature Drinks: Vibe fresh în meniu",
        body: "Indiferent la care Rewind te afli, te așteptăm cu un Latte Macchiato cremos sau un Matcha Tonic super fresh. Dar dacă ai drum pe la Miroslava, trebuie să încerci vedeta locației noastre: un Espresso Martini perfect echilibrat. Dă un refresh zilei tale!",
        category: "menu",
        emoji: "✨",
        active: true
    },
    {
        title: "Ziua ta = Cafeaua noastră!",
        body: "Avem grijă să-ți începem ziua perfect! Asigură-te că ți-ai completat data nașterii în profilul tău. Când vine momentul, noi îți trimitem automat un voucher pentru o cafea gratuită direct în cont. Sărbătorește momentele bune alături de tribul tău!",
        category: "promo",
        emoji: "🎂",
        active: true
    }
];

async function updateNews() {
    try {
        console.log("Emptying old announcements...");
        const { error: deleteError } = await supabase
            .from('announcements')
            .delete()
            .neq('id', 0); // Delete all

        if (deleteError) {
            console.error("Error deleting old announcements:", deleteError);
            return;
        }

        console.log("Inserting new announcements...");
        const { error: insertError } = await supabase
            .from('announcements')
            .insert(newsItems);

        if (insertError) {
            console.error("Error inserting new announcements:", insertError);
            return;
        }

        console.log("Successfully updated all news items!");
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

updateNews();
