"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function logDailyDrink(userId: string, drink: string) {
    const { error } = await supabaseAdmin.from("coffee_purchases").insert({
        user_id: userId,
        coffee_type: drink,
    });

    if (error) {
        console.error("Error logging drink:", error);
        throw new Error(error.message);
    }

    return { success: true };
}
