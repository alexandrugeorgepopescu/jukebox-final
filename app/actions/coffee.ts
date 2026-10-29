"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

const EXTRA_CAFE_LOCATIONS: Array<{ name: string; lat: number; lng: number }> = [
    { name: "Rewind Cafe Pacurari", lat: 47.174434, lng: 27.537209 },
    { name: "Rewind Cafe Miroslava", lat: 47.145912, lng: 27.528504 },
    { name: "Rewind Cafe Alexandru", lat: 47.167054, lng: 27.558252 },
    { name: "Rewind Cafe Tudor", lat: 47.155830, lng: 27.604610 },
];

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

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

    // Verificăm și locațiile noi (Alexandru & Tudor) în caz că nu sunt încă în tabela config din Supabase
    let closestExtra = { name: "Locație Necunoscută", distance: 999999 };
    for (const loc of EXTRA_CAFE_LOCATIONS) {
        const d = haversineMeters(lat, lng, loc.lat, loc.lng);
        if (d < closestExtra.distance) {
            closestExtra = { name: loc.name, distance: d };
        }
    }

    if (!error && data && data.length > 0 && data[0].is_inside) {
        return {
            isInside: true,
            locationName: data[0].location_name,
            distance: Math.round(data[0].distance_meters)
        };
    }

    if (closestExtra.distance <= 150) {
        return {
            isInside: true,
            locationName: closestExtra.name,
            distance: Math.round(closestExtra.distance)
        };
    }

    if (error || !data || data.length === 0) {
        return {
            isInside: false,
            locationName: closestExtra.name,
            distance: Math.round(closestExtra.distance)
        };
    }

    const bestDistance = Math.min(Math.round(data[0].distance_meters), Math.round(closestExtra.distance));
    const bestName = closestExtra.distance < data[0].distance_meters ? closestExtra.name : data[0].location_name;

    return {
        isInside: false,
        locationName: bestName,
        distance: bestDistance
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

    for (const loc of EXTRA_CAFE_LOCATIONS) {
        const exists = cafeLocations.some(
            c => Math.abs(c.lat - loc.lat) < 0.002 && Math.abs(c.lng - loc.lng) < 0.002
        );
        if (!exists) {
            cafeLocations.push(loc);
        }
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
