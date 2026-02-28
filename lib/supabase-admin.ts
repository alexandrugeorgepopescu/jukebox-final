import { createClient } from '@supabase/supabase-js';

// Acest client are privilegii COMPLETE (ignoră RLS).
// FOLOSIT DOAR PE SERVER (Server Actions, API Routes).
// NU îl expune niciodată pe client!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
