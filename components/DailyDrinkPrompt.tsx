"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { User } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Lock, CheckCircle, AlertTriangle, ChevronUp, ChevronDown, Search, Plus, X } from "lucide-react";
import { registerCoffeePurchase, checkVisitStatus, getConfig } from "@/app/actions/coffee";

interface DailyDrinkPromptProps {
    user: User;
    onLogged: () => void;
}

// ─── ONLY CAFFEINATED DRINKS FROM THE REWIND MENU ─────────────────────────
const DRINKS = [
    // HOT ESPRESSO-BASED
    { id: "espresso", name: "Espresso", category: "HOT", ml: "30ml", price: 9, badge: "The Purist", nlp: "Scurt. Direct. Fără compromisuri." },
    { id: "espresso_dublu", name: "Espresso Dublu", category: "HOT", ml: "60ml", price: 12, badge: "Double Shot", nlp: "Când un shot nu e de ajuns." },
    { id: "americano", name: "Americano", category: "HOT", ml: "150ml", price: 9, badge: "Maratonistul", nlp: "Energie pentru o cursă lungă." },
    { id: "long_black", name: "Long Black", category: "HOT", ml: "190ml", price: 12, badge: "The Focused", nlp: "Intensitate prelungită. Concentrare totală." },
    { id: "espresso_macchiato", name: "Espresso Macchiato", category: "HOT", ml: "100ml", price: 11, badge: "Touched", nlp: "Espresso atins ușor de lapte." },
    { id: "cortado", name: "Cortado", category: "HOT", ml: "120ml", price: 15, badge: "The Balanced", nlp: "Echilibrul perfect între putere și lapte." },
    { id: "cappuccino", name: "Cappuccino", category: "HOT", ml: "250ml", price: 14, badge: "Clasicul", nlp: "Cafeaua ta de zi cu zi, perfectă." },
    { id: "flat_white", name: "Flat White", category: "HOT", ml: "250ml", price: 16, badge: "Pură Energie", nlp: "Două shot-uri, velvet milk. Feline." },
    { id: "latte_macchiato", name: "Latte Macchiato", category: "HOT", ml: "330ml", price: 15, badge: "Milk Lover", nlp: "Generos și catifelat. Lapte cu suflet de cafea." },
    { id: "caffe_latte", name: "Caffè Latte", category: "HOT", ml: "330ml", price: 17, badge: "Generos", nlp: "Domol și bogat. Ziua o ia ușor." },
    { id: "large_latte", name: "Large Latte", category: "HOT", ml: "400ml", price: 20, badge: "Extra Large", nlp: "Cea mai generoasă cană din casă." },
    { id: "orange_espresso", name: "Orange Espresso", category: "HOT", ml: "300ml", price: 22, badge: "The Explorer", nlp: "Portocale proaspete întâlnesc espresso. Curaj vibrant." },
    // COLD COFFEE
    { id: "iced_latte", name: "Iced Latte", category: "COLD", ml: "400ml", price: 20, badge: "Ice Ice Baby", nlp: "Latte-ul tău, rece și refreshing." },
    { id: "iced_espresso", name: "Iced Espresso", category: "COLD", ml: "300ml", price: 16, badge: "Cold Rush", nlp: "Shot-ul de dimineață – pe gheață." },
    { id: "frozen_cappuccino", name: "Frozen Cappuccino", category: "COLD", ml: "400ml", price: 20, badge: "The Frozen One", nlp: "Cappuccino transformat în experiență glaciară." },
    { id: "ness_frappe_s", name: "Ness Frappé", category: "COLD", ml: "300ml", price: 18, badge: "Old School", nlp: "Un clasic românesc. Nostalgie în pahar." },
    { id: "ness_frappe_l", name: "Ness Frappé Large", category: "COLD", ml: "400ml", price: 20, badge: "Old School Max", nlp: "Același clasic, versiunea XXL." },
    // MATCHA (caffeinated)
    { id: "matcha_latte", name: "Matcha Latte", category: "MATCHA", ml: "330ml", price: 20, badge: "Alternativul", nlp: "Energie lentă, susținută. Zen în stare pură." },
    { id: "matcha_iced", name: "Matcha Iced Latte", category: "MATCHA", ml: "400ml", price: 20, badge: "Alt. Glaciar", nlp: "Matcha, lapte și gheață. Refresh total." },
    { id: "matcha_tonic", name: "Matcha Tonic", category: "MATCHA", ml: "400ml", price: 20, badge: "Efervescent", nlp: "Matcha întâlnește tonica. Senzația anului." },
    { id: "matcha_orange", name: "Matcha Orange", category: "MATCHA", ml: "300ml", price: 22, badge: "Citrus Zen", nlp: "Fresh de portocale cu matcha. Dimineața perfectă." },
    // COCKTAILS (caffeinated)
    { id: "espresso_martini", name: "Espresso Martini", category: "COCKTAIL", ml: "120ml", price: 23, badge: "After Dark", nlp: "Cafeaua ta de seară. Cu un twist." },
] as const;

type DrinkId = typeof DRINKS[number]["id"];

interface DrinkSelection {
    drinkId: DrinkId;
    qty: number;
}

type Step = "drink" | "gps" | "pin" | "done";

const CATEGORY_LABELS: Record<string, string> = {
    HOT: "Hot Coffee",
    COLD: "Cold Coffee",
    MATCHA: "Matcha",
    COCKTAIL: "Cocktail",
};

function getDistanceMeters(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function DailyDrinkPrompt({ user, onLogged }: DailyDrinkPromptProps) {
    const [step, setStep] = useState<Step>("drink");
    const [basket, setBasket] = useState<DrinkSelection[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [gpsStatus, setGpsStatus] = useState<"idle" | "checking" | "ok" | "fail">("idle");
    const [visitCount, setVisitCount] = useState(0);
    const [totalCoffees, setTotalCoffees] = useState(0);
    const [cafeLocations, setCafeLocations] = useState<Array<{ name: string, lat: number, lng: number }>>([]);
    const [config, setConfig] = useState<Record<string, string>>({});
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            const [status, cfg] = await Promise.all([
                checkVisitStatus(user.id),
                getConfig()
            ]);
            setVisitCount(status.visitCount);
            setTotalCoffees(status.totalCoffees);
            setConfig(cfg.config);
            setCafeLocations(cfg.cafeLocations);
        };
        init();
    }, [user.id]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const totalQty = basket.reduce((s, b) => s + b.qty, 0);

    const filteredDrinks = useMemo(() => {
        if (!searchQuery.trim()) return DRINKS;
        const q = searchQuery.toLowerCase();
        return DRINKS.filter(d =>
            d.name.toLowerCase().includes(q) ||
            d.badge.toLowerCase().includes(q) ||
            d.nlp.toLowerCase().includes(q) ||
            CATEGORY_LABELS[d.category].toLowerCase().includes(q)
        );
    }, [searchQuery]);

    const needsValidation = () => visitCount > 0 || totalQty > 1;

    const addToBasket = (drinkId: DrinkId) => {
        setBasket(prev => {
            const existing = prev.find(b => b.drinkId === drinkId);
            if (existing) return prev.map(b => b.drinkId === drinkId ? { ...b, qty: b.qty + 1 } : b);
            return [...prev, { drinkId, qty: 1 }];
        });
        setSearchQuery("");
        setShowDropdown(false);
    };

    const adjustQty = (drinkId: DrinkId, delta: number) => {
        setBasket(prev => {
            const updated = prev.map(b => b.drinkId === drinkId ? { ...b, qty: Math.max(0, b.qty + delta) } : b);
            return updated.filter(b => b.qty > 0);
        });
    };

    const removeFromBasket = (drinkId: DrinkId) => {
        setBasket(prev => prev.filter(b => b.drinkId !== drinkId));
    };

    const handleConfirmDrinks = async () => {
        if (basket.length === 0) {
            setError("Alege cel puțin o băutură.");
            return;
        }
        const needs = needsValidation();
        if (!needs) {
            // Prima vizita, o singura cafea → auto-submit
            setLoading(true);
            const res = await registerCoffeePurchase(user.id, basket[0].drinkId, 1, undefined, true);
            setLoading(false);
            if (res.success) { setStep("done"); setTimeout(onLogged, 1500); }
            else setError(res.error || "Eroare necunoscuta.");
        } else {
            setStep("gps");
        }
    };

    const handleGPS = () => {
        setGpsStatus("checking");
        setError(null);
        if (!navigator.geolocation) {
            setGpsStatus("fail");
            setError("Browser-ul tău nu suportă GPS. Roagă barista să valideze.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const radius = parseFloat(config.cafe_radius_meters || "150");
                const distances = cafeLocations.map(cafe => ({
                    ...cafe,
                    dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, cafe.lat, cafe.lng)
                }));
                if (distances.length === 0) {
                    distances.push(
    { 
        name: "Rewind Cafe Pacurari", 
        lat: 47.174434, 
        lng: 27.537209, 
        dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, 47.174434, 27.537209) 
    },
    { 
        name: "Rewind Cafe Miroslava", 
        lat: 47.145912, 
        lng: 27.528504, 
        dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, 47.145912, 27.528504) 
    },
    { 
        name: "Rewind Cafe Alexandru", 
        lat: 47.16102361939559, 
        lng: 27.575434156561894, 
        dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, 47.16102361939559, 27.575434156561894) 
    },
    { 
        name: "Birou Alexandru (Test)", 
        lat: 47.121484748827186, 
        lng: 27.570058466395786, 
        dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, 47.121484748827186, 27.570058466395786) 
    }
);
                }
                const nearest = distances.reduce((a, b) => a.dist < b.dist ? a : b);
                if (nearest.dist <= radius) {
                    setGpsStatus("ok");
                    setTimeout(() => setStep("pin"), 600);
                } else {
                    setGpsStatus("fail");
                    setError(`Ești la ${Math.round(nearest.dist)}m de ${nearest.name}. Trebuie să fii în raza de ${radius}m.`);
                }
            },
            () => {
                setGpsStatus("fail");
                setError("Nu am putut accesa locația. Activează GPS-ul și încearcă din nou.");
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    };

    const handlePinSubmit = async () => {
        if (basket.length === 0) return;
        setLoading(true);
        setError(null);
        try {
            // Register each drink separately
            const results = await Promise.all(
                basket.map(b => registerCoffeePurchase(user.id, b.drinkId, b.qty, pin, false))
            );
            const failed = results.find(r => r.error);
            if (failed) {
                setError(failed.error || "Eroare la validare.");
                setPin("");
            } else {
                setStep("done");
                setTimeout(onLogged, 1500);
            }
        } catch {
            setError("Eroare necunoscută.");
            setPin("");
        } finally {
            setLoading(false);
        }
    };

    const getDrinkName = (id: DrinkId) => DRINKS.find(d => d.id === id)?.name || id;

    return (
        <div className="w-full max-w-lg mx-auto p-4 z-50">
            <AnimatePresence mode="wait">

                {/* ─── STEP: DRINK SELECTION ─── */}
                {step === "drink" && (
                    <motion.div key="drink" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="bg-zinc-900 border border-purple-500/30 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.15)] relative">

                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[50px] rounded-full" />

                        {/* Header */}
                        <div className="p-6 pb-0">
                            <h2 className="text-2xl font-black text-white mb-1 text-center tracking-tight">
                                {visitCount > 0 ? `Bun revenit, ${user.name.split(' ')[0]}.` : "Ce bei astăzi?"}
                            </h2>
                            <p className="text-zinc-500 text-center text-xs uppercase tracking-widest mb-4">
                                Selectează băuturile tale cu cofeină
                            </p>

                            {/* Search box */}
                            <div className="relative mb-4" ref={searchRef}>
                                <div className="flex items-center bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                                    <Search className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Caută o băutură... (ex: cappuccino, matcha)"
                                        value={searchQuery}
                                        onChange={e => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                                        onFocus={() => setShowDropdown(true)}
                                        className="bg-transparent text-white text-sm outline-none w-full placeholder-zinc-600"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => { setSearchQuery(""); setShowDropdown(false); }} className="text-zinc-600 hover:text-white transition-colors ml-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Dropdown results */}
                                <AnimatePresence>
                                    {showDropdown && filteredDrinks.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl max-h-[28rem] overflow-y-auto"
                                        >
                                            {Object.entries(CATEGORY_LABELS).map(([cat, catLabel]) => {
                                                const catDrinks = filteredDrinks.filter(d => d.category === cat);
                                                if (catDrinks.length === 0) return null;
                                                return (
                                                    <div key={cat}>
                                                        <div className="px-4 py-2 bg-black/40 text-[9px] text-zinc-500 uppercase tracking-widest font-bold border-b border-white/5">
                                                            {catLabel}
                                                        </div>
                                                        {catDrinks.map(drink => (
                                                            <button
                                                                key={drink.id}
                                                                onClick={() => addToBasket(drink.id)}
                                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-500/10 transition-colors text-left border-b border-white/5 last:border-0 group"
                                                            >
                                                                <div>
                                                                    <span className="text-white font-semibold text-sm">{drink.name}</span>
                                                                    <span className="text-zinc-600 text-xs ml-2">{drink.ml}</span>
                                                                    <p className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors mt-0.5">{drink.nlp}</p>
                                                                </div>
                                                                <div className="flex items-center gap-2 shrink-0 ml-4">
                                                                    <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider border border-purple-500/30 rounded-full px-2 py-0.5">{drink.badge}</span>
                                                                    <Plus className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Grid of all drinks (3 columns, scrollable) */}
                        {!showDropdown && (
                            <div className="px-6 pb-2">
                                {Object.entries(CATEGORY_LABELS).map(([cat, catLabel]) => {
                                    const catDrinks = DRINKS.filter(d => d.category === cat);
                                    return (
                                        <div key={cat} className="mb-4">
                                            <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold mb-2 ml-1">{catLabel}</div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {catDrinks.map(drink => {
                                                    const inBasket = basket.find(b => b.drinkId === drink.id);
                                                    return (
                                                        <button
                                                            key={drink.id}
                                                            onClick={() => addToBasket(drink.id)}
                                                            className={`relative flex flex-col items-start p-3 rounded-xl border transition-all text-left overflow-hidden group ${inBasket
                                                                ? "bg-purple-500/15 border-purple-500/60"
                                                                : "bg-black/40 border-white/5 hover:bg-purple-500/8 hover:border-purple-500/30"
                                                                }`}
                                                        >
                                                            {/* Badge */}
                                                            <span className="text-[7px] text-purple-400/80 uppercase tracking-wider font-bold mb-1.5 leading-none">{drink.badge}</span>
                                                            <span className="font-semibold text-white text-[11px] leading-tight mb-0.5">{drink.name}</span>
                                                            <span className="text-[9px] text-zinc-600">{drink.ml}</span>
                                                            {inBasket && (
                                                                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                                                                    <span className="text-[8px] text-white font-black">{inBasket.qty}</span>
                                                                </div>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Basket */}
                        {basket.length > 0 && (
                            <div className="px-6 pb-4">
                                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-2">
                                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Selecția ta</div>
                                    {basket.map(b => {
                                        const drink = DRINKS.find(d => d.id === b.drinkId);
                                        if (!drink) return null;
                                        return (
                                            <div key={b.drinkId} className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <span className="text-white text-sm font-semibold">{drink.name}</span>
                                                    <span className="text-zinc-600 text-xs ml-1.5">{drink.ml}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <button onClick={() => adjustQty(b.drinkId, -1)} className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-purple-500/30 transition-all">
                                                        <ChevronDown className="w-3 h-3 text-white" />
                                                    </button>
                                                    <span className="text-white font-black text-sm w-5 text-center">{b.qty}</span>
                                                    <button onClick={() => adjustQty(b.drinkId, +1)} className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-purple-500/30 transition-all">
                                                        <ChevronUp className="w-3 h-3 text-white" />
                                                    </button>
                                                    <button onClick={() => removeFromBasket(b.drinkId)} className="w-6 h-6 rounded-lg bg-zinc-800/60 flex items-center justify-center hover:bg-red-500/30 transition-all ml-1">
                                                        <X className="w-3 h-3 text-zinc-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center">
                                        <span className="text-zinc-500 text-xs uppercase tracking-widest">Total</span>
                                        <span className="text-white font-black text-sm">{totalQty} {totalQty === 1 ? "băutură" : "băuturi"}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Confirm button */}
                        <div className="px-6 pb-6">
                            {needsValidation() && basket.length > 0 && (
                                <p className="text-amber-400/70 text-[10px] uppercase tracking-widest text-center mb-3">GPS + PIN necesar</p>
                            )}
                            <button
                                onClick={handleConfirmDrinks}
                                disabled={loading || basket.length === 0}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {loading ? "SE PROCESEAZĂ..." : basket.length === 0 ? "Alege o băutură" : `Confirmă ${totalQty} ${totalQty === 1 ? "băutură" : "băuturi"}`}
                            </button>
                            {error && <p className="text-red-400 text-xs text-center mt-3">{error}</p>}
                        </div>
                    </motion.div>
                )}

                {/* ─── STEP: GPS ─── */}
                {step === "gps" && (
                    <motion.div key="gps" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="bg-zinc-900 border border-amber-500/30 p-8 rounded-3xl shadow-2xl text-center">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className={`w-10 h-10 ${gpsStatus === 'ok' ? 'text-green-400' : gpsStatus === 'fail' ? 'text-red-400' : 'text-amber-400'} ${gpsStatus === 'checking' ? 'animate-pulse' : ''}`} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Confirmare locație</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            {visitCount > 0
                                ? `A ${visitCount + 1}-a vizită azi — confirmăm că ești la cafenea.`
                                : `${totalQty} băuturi → confirmăm că ești la cafenea.`
                            }
                        </p>
                        {gpsStatus === 'idle' && (
                            <button onClick={handleGPS} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
                                Permite Locația
                            </button>
                        )}
                        {gpsStatus === 'checking' && <div className="text-amber-400 font-bold animate-pulse">Se verifică locația...</div>}
                        {gpsStatus === 'ok' && (
                            <div className="text-green-400 font-bold flex items-center justify-center gap-2">
                                <CheckCircle className="w-5 h-5" /> Ești la cafenea!
                            </div>
                        )}
                        {gpsStatus === 'fail' && error && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                                    <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
                                </div>
                                <button onClick={handleGPS} className="w-full bg-zinc-800 text-white font-bold py-3 rounded-xl text-sm">
                                    Încearcă din nou
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ─── STEP: PIN ─── */}
                {step === "pin" && (
                    <motion.div key="pin" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="bg-zinc-900 border border-purple-500/30 p-8 rounded-3xl shadow-2xl text-center">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">PIN Barista</h2>
                        <p className="text-zinc-400 text-sm mb-4">Înmânează telefonul baristei să introducă codul secret.</p>

                        {/* Summary of what's being validated */}
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 mb-6 text-left space-y-1">
                            <span className="text-amber-400 text-[9px] font-bold uppercase tracking-widest block mb-2">DE VALIDAT ACUM</span>
                            {basket.map(b => (
                                <div key={b.drinkId} className="flex items-center justify-between">
                                    <span className="text-white text-sm font-semibold">{getDrinkName(b.drinkId)}</span>
                                    <span className="text-purple-300 font-black text-sm">×{b.qty}</span>
                                </div>
                            ))}
                            <div className="border-t border-purple-500/20 pt-2 mt-2 flex justify-between">
                                <span className="text-zinc-500 text-xs">Total</span>
                                <span className="text-white font-black">{totalQty} {totalQty === 1 ? 'băutură' : 'băuturi'}</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 mb-6">
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black ${pin[i] ? 'border-purple-500 text-white bg-purple-500/10' : 'border-zinc-700 text-zinc-700'}`}>
                                    {pin[i] ? '●' : '–'}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-4 max-w-[200px] mx-auto">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k, i) => (
                                <button key={i} disabled={!k}
                                    onClick={() => {
                                        if (k === '⌫') setPin(p => p.slice(0, -1));
                                        else if (pin.length < 6) setPin(p => p + k);
                                    }}
                                    className={`h-12 rounded-xl font-bold text-lg transition-all ${k ? 'bg-zinc-800 text-white hover:bg-purple-500/20 active:scale-95' : 'invisible'}`}>
                                    {k}
                                </button>
                            ))}
                        </div>

                        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

                        <button onClick={handlePinSubmit} disabled={pin.length < 6 || loading}
                            className="w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-4 rounded-2xl uppercase tracking-widest disabled:opacity-40 transition-all">
                            {loading ? "SE VALIDEAZĂ..." : "Validează"}
                        </button>
                    </motion.div>
                )}

                {/* ─── STEP: DONE ─── */}
                {step === "done" && (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900 border border-green-500/30 p-10 rounded-3xl text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Savurează!</h2>
                        <p className="text-green-400 font-bold">
                            {basket.map(b => `${getDrinkName(b.drinkId)}${b.qty > 1 ? ` ×${b.qty}` : ''}`).join(", ")} — înregistrat.
                        </p>
                        <p className="text-zinc-500 text-sm mt-2">Se deschide Jukebox-ul...</p>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
