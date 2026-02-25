"use server";

import { supabase } from "@/lib/supabase";
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

    // 1. Creează cont in Supabase Auth (dacă e activat, dacă nu, facem doar insert in users)
    // Pentru flexibilitate și viteză de prototipare, le punem direct in 'users' cu o parolă simplă (dacă vrea login custom)
    // Dar schema ta nu are parolă in 'users'. Varianta ideală: Supabase Auth.
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        return { error: authError.message };
    }

    const userId = authData.user?.id;

    // 2. Salvează profilul extins in tabelul 'users'
    const { data: userData, error: userError } = await supabase.from("users").insert({
        id: userId, // Folosește ID-ul de la auth
        email,
        name: `${firstname} ${lastname}`,
        birth_date: birthday,
        coffee_preference: coffee_type,
        music_preferences: music_cats,
        // tribe_id / nickname etc ar merge in coloane custom, dar le omitem daca nu-s in schema.
        // Or adding via JSONB metadata
    }).select().single();

    if (userError) {
        // Fallback or ignore if table isn't updated yet. We return authData anyway.
        console.error("User table insert error:", userError);
    }

    return { user: authData.user };
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
    const { data: userData } = await supabase.from("users").select("*").eq("id", data.user?.id).single();

    return { user: data.user, profile: userData };
}
