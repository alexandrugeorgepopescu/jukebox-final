"use server";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { MusicCategory } from "@/lib/types";

export async function signUpUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const birthday = formData.get("birthday") as string;
    const nickname = formData.get("nickname") as string;
    const coffee_type = formData.get("coffee_type") as string;
    const tribe = formData.get("tribe") as string;
    const music_cats = formData.getAll("music_cats") as string[];

    // 1. Creează cont in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        return { error: authError.message };
    }

    const userId = authData.user?.id;

    // 2. Salvează profilul in 'users' cu upsert + admin client
    // upsert: dacă un trigger a creat deja rândul, îl actualizăm cu datele complete
    // supabaseAdmin: ocolește RLS ca să funcționeze imediat după signup
    const { error: userError } = await supabaseAdmin.from("users").upsert({
        id: userId,
        email,
        name: `${firstname} ${lastname}`,
        birth_date: birthday,
        coffee_preference: coffee_type,
        music_preferences: music_cats,
    }, { onConflict: "id" });

    if (userError) {
        console.error("User upsert error:", userError);
    }

    return { user: authData.user };
}

export async function resetPassword(email: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/reset-password`,
    });

    if (error) return { error: error.message };
    return { success: true };
}

export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: error.message };
    return { success: true };
}

export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    // Fetch user details
    const { data: userData } = await supabaseAdmin.from("users").select("*").eq("id", data.user?.id).single();

    return { user: data.user, profile: userData };
}
