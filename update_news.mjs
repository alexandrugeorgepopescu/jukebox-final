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
        title: "Bombon de la Dropshot: Ritmul verii în ceașcă",
        body: "Simte textura catifelată a noului blend de specialitate co-fermentat anaerob! Închide ochii și lasă-te purtat de acordurile dulci de căpșuni coapte, vanilie fină și ciocolată cremoasă. O aromă intensă care îți inundă simțurile ca un milkshake glaciar de vară. Cere-o la bar și upgradează-ți frecvența!",
        category: "menu",
        emoji: "🍓",
        active: true
    },
    {
        title: "Play pe vacanță, Pause la Rewind!",
        body: "Fie că îți pregătești bagajele și vrei un boost de energie înainte de drum, fie că te întorci cu povești proaspete de pe plajă, tribul te așteaptă! Oprește-te o secundă, ascultă basul din locație și privește cum se prepară ritualul tău preferat. Suntem aici și înainte, și după vacanță, pe aceeași lungime de undă.",
        category: "event",
        emoji: "✈️",
        active: true
    },
    {
        title: "Rewind Alexandru este oficial ONLINE!",
        body: "Ritmul urban se extinde! Vezi noua noastră scenă din Kaufland Alexandru, un spațiu complet reconfigurat pentru energia ta. Acum ne găsești în trei puncte cheie din Iași: vibe-ul rapid din Kaufland Păcurari, designul modern din Kaufland Alexandru și atmosfera relaxantă din Family Market Miroslava. Treci să ne auzi și să ne simți aproape!",
        category: "event",
        emoji: "🏪",
        active: true
    },
    {
        title: "Sunetul verii aduce premii în portofel",
        body: "Dă un spin la Jukebox-ul digital din aplicație și prinde frecvența norocoasă! În august 2026, am dublat surprizele ascunse în melodii. Privește ecranul, ascultă piesa extrasă și simte bucuria când portofelul tău se luminează cu un voucher cadou. Ritmul verii se trăiește live la bar!",
        category: "promo",
        emoji: "🎟️",
        active: true
    },
    {
        title: "Răsplătim rezonanța ta: A 9-a cafea cadou",
        body: "Fără cartoane rătăcite prin buzunare, doar energie pură monitorizată digital. Privește cum se adună punctele tale de loialitate la fiecare vizită validată de barista. La 8 cafele savurate, sistemul îți trimite instant un voucher gratuit în portofel. Simte gustul unui cadou binemeritat!",
        category: "promo",
        emoji: "☕",
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
