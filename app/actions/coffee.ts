"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

export async function checkVisitStatus(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    // Câte vizite validate are azi?
    const { data: todayPurchases } = await supabaseAdmin
        .from('coffee_purchases')
        .select('id, quantity, barista_validated, visit_number')
        .eq('user_id', userId)
        .gte('purchased_at', `${today}T00:00:00Z`)
        .order('purchased_at', { ascending: true });

    const visitCount = todayPurchases?.length || 0;
    const isFirstVisit = visitCount === 0;

    // Total cafele din ciclul de loialitate - suma cantitatilor, nu numarul de randuri
    const { data: allPurchases } = await supabaseAdmin
        .from('coffee_purchases')
        .select('quantity')
        .eq('user_id', userId)
        .eq('barista_validated', true);

    const totalCoffees = allPurchases?.reduce((sum, row) => sum + (row.quantity || 1), 0) || 0;

    return {
        isFirstVisit,
        visitCount,
        totalCoffees
    };
}

export async function getConfig() {
    const { data } = await supabaseAdmin
        .from('config')
        .select('key, value');

    const config: Record<string, string> = {};
    data?.forEach(row => { config[row.key] = row.value; });

    // Parse cafe_locations as JSON if present
    let cafeLocations: Array<{ name: string, lat: number, lng: number }> = [];
    if (config.cafe_locations) {
        try { cafeLocations = JSON.parse(config.cafe_locations); } catch { }
    }

    return { config, cafeLocations };
}

export async function registerCoffeePurchase(
    userId: string,
    coffeeType: string,
    quantity: number,
    baristaPinProvided?: string,
    isFirstSingleCoffee?: boolean
) {
    const today = new Date().toISOString().split('T')[0];

    // Numărul vizitei de azi
    const { data: todayPurchases } = await supabaseAdmin
        .from('coffee_purchases')
        .select('id')
        .eq('user_id', userId)
        .gte('purchased_at', `${today}T00:00:00Z`);

    const visitNumber = (todayPurchases?.length || 0) + 1;

    let baristValidated = false;

    if (isFirstSingleCoffee) {
        // Prima vizita, 1 cafea -> validat automat
        baristValidated = true;
    } else {
        // Verificam PIN-ul baristei
        const { data: pinConfig } = await supabaseAdmin
            .from('config')
            .select('value')
            .eq('key', 'barista_pin')
            .single();

        if (!pinConfig || baristaPinProvided !== pinConfig.value) {
            return { error: "PIN incorect! Cere baristei să introducă codul." };
        }
        baristValidated = true;
    }

    // Inseram achizitia
    const { error } = await supabaseAdmin.from('coffee_purchases').insert({
        user_id: userId,
        coffee_type: coffeeType,
        quantity: quantity,
        barista_validated: baristValidated,
        visit_number: visitNumber
    });

    if (error) {
        console.error("Coffee purchase error:", error);
        return { error: "Eroare la salvarea cafelei: " + error.message };
    }

    // Verificam daca a ajuns la 8 cafele -> voucher gratuit
    // Sumam cantitatea, nu numaram randuri
    const { data: allValidated } = await supabaseAdmin
        .from('coffee_purchases')
        .select('quantity')
        .eq('user_id', userId)
        .eq('barista_validated', true);

    const totalCount = allValidated?.reduce((sum, row) => sum + (row.quantity || 1), 0) || 0;

    // La fiecare multiplu de 8 -> free coffee voucher
    const prevCycle = Math.floor((totalCount - quantity) / 8);
    const newCycle = Math.floor(totalCount / 8);

    if (newCycle > prevCycle) {
        const expire = new Date();
        expire.setDate(expire.getDate() + 30);
        await supabaseAdmin.from('rewards').insert({
            user_id: userId,
            type: '☕ CAFEA GRATUITA - Loyalty Reward',
            code: `LOYA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            expires_at: expire.toISOString()
        });
    }

    return { success: true, canDrop: true, visitNumber };
}
