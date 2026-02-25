"use server";

import { supabase } from "@/lib/supabase";

export async function logDailyDrink(userId: string, drink: string) {
    const { error } = await supabase.from("coffee_purchases").insert({
        user_id: userId,
        coffee_type: drink,
    });

    if (error) {
        console.error("Error logging drink:", error);
        throw new Error(error.message);
    }

    return { success: true };
}
