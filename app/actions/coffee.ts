"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

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

    // Total cafele din ciclul de loialitate - suma cantităților
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

export async function checkGPSLocation(lat: number, lng: number) {
    const { data, error } = await supabaseAdmin.rpc("is_within_radius", {
        p_lat: lat,
        p_lng: lng
    });

    if (error || !data || data.length === 0) {
        return { isInside: false, locationName: "Locație Necunoscută", distance: 9999 };
    }

    return {
        isInside: data[0].is_inside,
        locationName: data[0].location_name,
        distance: Math.round(data[0].distance_meters)
    };
}

export async function getConfig() {
    const { data } = await supabaseAdmin
        .from('config')
        .select('key, value');

    const config: Record<string, string> = {};
    data?.forEach(row => { config[row.key] = row.value; });

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
    isFirstSingleCoffee?: boolean,
    locationName?: string
) {
    let baristValidated = false;

    if (isFirstSingleCoffee) {
        baristValidated = true;
    } else {
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

    // Apelare RPC atomic register_coffee_purchase (tranzacție unică)
    const { data: rpcRes, error: rpcErr } = await supabaseAdmin.rpc("register_coffee_purchase", {
        p_user_id: userId,
        p_coffee_type: coffeeType,
        p_quantity: quantity,
        p_barista_validated: baristValidated,
        p_location: locationName || null
    });

    if (rpcErr) {
        console.error("Coffee purchase RPC error:", rpcErr);
        return { error: "Eroare la salvarea cafelei: " + rpcErr.message };
    }

    return { 
        success: true, 
        canDrop: true, 
        visitNumber: rpcRes.visit_number,
        midRewardAwarded: rpcRes.mid_reward_awarded,
        fullRewardAwarded: rpcRes.full_reward_awarded,
        newTotal: rpcRes.new_total
    };
}
