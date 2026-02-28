"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Lock, Coffee, CheckCircle, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";
import { registerCoffeePurchase, checkVisitStatus, getConfig } from "@/app/actions/coffee";

interface DailyDrinkPromptProps {
    user: User;
    onLogged: () => void;
}

const DRINKS = [
    { id: "espresso", name: "Espresso Pur", icon: "⚡", desc: "Scurt și la obiect.", badge: "The Purist" },
    { id: "americano", name: "Americano", icon: "💧", desc: "Energie pentru cursă lungă.", badge: "Maratonistul" },
    { id: "flat_white", name: "Flat White", icon: "🤎", desc: "2 shot-uri, echilibru perfect.", badge: "The Balanced" },
    { id: "latte_macchiato", name: "Latte & Macchiato", icon: "☁️", desc: "Generos și catifelat.", badge: "Milk Lover" },
    { id: "iced", name: "Ice & Frozen", icon: "🧊", desc: "Cafeaua ta preferată, pe gheată.", badge: "Ice Ice Baby" },
    { id: "tonic_matcha", name: "Tonice & Matcha", icon: "🌿", desc: "Efervescent și alternativ.", badge: "Exploratorul" }
];

type Step = "drink" | "gps" | "pin" | "done";

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
    const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [gpsStatus, setGpsStatus] = useState<"idle" | "checking" | "ok" | "fail">("idle");
    const [isFirstSingle, setIsFirstSingle] = useState(false);
    const [visitCount, setVisitCount] = useState(0);
    const [cafeLocations, setCafeLocations] = useState<Array<{ name: string, lat: number, lng: number }>>([]);
    const [config, setConfig] = useState<Record<string, string>>({});

    useEffect(() => {
        const init = async () => {
            const [status, cfg] = await Promise.all([
                checkVisitStatus(user.id),
                getConfig()
            ]);
            setVisitCount(status.visitCount);
            setConfig(cfg.config);
            setCafeLocations(cfg.cafeLocations);
        };
        init();
    }, [user.id]);

    const needsValidation = (qty: number) => {
        // Prima vizita, 1 cafea -> fara validare
        // Orice altceva -> GPS + PIN
        return visitCount > 0 || qty > 1;
    };

    const handleDrinkSelect = async (drinkId: string) => {
        setSelectedDrink(drinkId);
        const needs = needsValidation(quantity);
        setIsFirstSingle(!needs);

        if (!needs) {
            // Auto-submit: prima vizita, o singura cafea
            setLoading(true);
            const res = await registerCoffeePurchase(user.id, drinkId, 1, undefined, true);
            setLoading(false);
            if (res.success) {
                setStep("done");
                setTimeout(onLogged, 1500);
            } else {
                setError(res.error || "Eroare necunoscuta.");
            }
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

                // Verificam fata de TOATE cafenelele, luam cea mai apropiata
                const distances = cafeLocations.map(cafe => ({
                    ...cafe,
                    dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, cafe.lat, cafe.lng)
                }));

                // Fallback dacă db nu e încă populat
                if (distances.length === 0) {
                    distances.push(
                        { name: "Rewind Cafe Pacurari", lat: 47.174434, lng: 27.537209, dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, 47.174434, 27.537209) },
                        { name: "Rewind Cafe Miroslava", lat: 47.145912, lng: 27.528504, dist: getDistanceMeters(pos.coords.latitude, pos.coords.longitude, 47.145912, 27.528504) }
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
        if (!selectedDrink) return;
        setLoading(true);
        setError(null);

        const res = await registerCoffeePurchase(user.id, selectedDrink, quantity, pin, false);
        setLoading(false);

        if (res.error) {
            setError(res.error);
            setPin("");
        } else {
            setStep("done");
            setTimeout(onLogged, 1500);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4 z-50">
            <AnimatePresence mode="wait">
                {step === "drink" && (
                    <motion.div key="drink" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="bg-zinc-900 border border-purple-500/30 p-6 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.15)] relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[50px] rounded-full" />

                        <h2 className="text-2xl font-black text-white mb-1 text-center">
                            {visitCount > 0 ? `Bun revenit, ${user.name.split(' ')[0]}!` : "Ziua bună se cunoaște de dimineată."}
                        </h2>
                        <p className="text-zinc-400 mb-1 text-center text-sm">Ce bei astăzi?</p>

                        {/* Quantity selector */}
                        <div className="flex items-center justify-center gap-4 my-4 bg-black/30 rounded-2xl p-3 border border-white/5">
                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Nr. cafele:</span>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-purple-500/30 transition-all">
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <span className="text-2xl font-black text-white w-8 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => Math.min(10, q + 1))}
                                    className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-purple-500/30 transition-all">
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                            </div>
                            {needsValidation(quantity) && (
                                <span className="text-[9px] text-amber-400 font-bold uppercase">GPS + PIN necesar</span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {DRINKS.map(drink => (
                                <button key={drink.id} disabled={loading}
                                    onClick={() => handleDrinkSelect(drink.id)}
                                    className="flex flex-col items-center justify-center p-4 bg-black/40 border border-white/5 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group disabled:opacity-50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider backdrop-blur-md border-b border-l border-purple-500/30">
                                        {drink.badge}
                                    </div>
                                    <div className="text-3xl group-hover:scale-110 transition-transform mb-2 mt-2">{drink.icon}</div>
                                    <span className="font-bold text-white text-sm mb-1">{drink.name}</span>
                                    <span className="text-[10px] text-zinc-500 px-1">{drink.desc}</span>
                                </button>
                            ))}
                        </div>

                        {error && <p className="text-red-400 text-xs text-center mt-3">{error}</p>}
                    </motion.div>
                )}

                {step === "gps" && (
                    <motion.div key="gps" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="bg-zinc-900 border border-amber-500/30 p-8 rounded-3xl shadow-2xl text-center">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className={`w-10 h-10 ${gpsStatus === 'ok' ? 'text-green-400' : gpsStatus === 'fail' ? 'text-red-400' : 'text-amber-400'} ${gpsStatus === 'checking' ? 'animate-pulse' : ''}`} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">Confirmare locație</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            {visitCount > 0
                                ? `A ${visitCount + 1}-a vizită azi — avem nevoie să confirmăm că ești la cafenea.`
                                : `${quantity} cafele → avem nevoie să confirmăm că ești la cafenea.`
                            }
                        </p>

                        {gpsStatus === 'idle' && (
                            <button onClick={handleGPS}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
                                📍 Permite Locația
                            </button>
                        )}
                        {gpsStatus === 'checking' && (
                            <div className="text-amber-400 font-bold animate-pulse">Se verifică locația...</div>
                        )}
                        {gpsStatus === 'ok' && (
                            <div className="text-green-400 font-bold flex items-center justify-center gap-2">
                                <CheckCircle className="w-5 h-5" /> Ești la cafenea! ✅
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

                {step === "pin" && (
                    <motion.div key="pin" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="bg-zinc-900 border border-purple-500/30 p-8 rounded-3xl shadow-2xl text-center">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">PIN Barista</h2>
                        <p className="text-zinc-400 text-sm mb-6">Înmânează telefonul baristei să introducă codul secret.</p>

                        <div className="flex justify-center gap-1 mb-6">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                                <div key={i} className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-base font-black ${pin[i] ? 'border-purple-500 text-white bg-purple-500/10' : 'border-zinc-700 text-zinc-700'}`}>
                                    {pin[i] ? '●' : '–'}
                                </div>
                            ))}
                        </div>

                        {/* Keyboard numerica */}
                        <div className="grid grid-cols-3 gap-2 mb-4 max-w-[200px] mx-auto">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k, i) => (
                                <button key={i} disabled={!k}
                                    onClick={() => {
                                        if (k === '⌫') setPin(p => p.slice(0, -1));
                                        else if (pin.length < 8) setPin(p => p + k);
                                    }}
                                    className={`h-12 rounded-xl font-bold text-lg transition-all ${k ? 'bg-zinc-800 text-white hover:bg-purple-500/20 active:scale-95' : 'invisible'}`}>
                                    {k}
                                </button>
                            ))}
                        </div>

                        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

                        <button onClick={handlePinSubmit} disabled={pin.length < 8 || loading}
                            className="w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-4 rounded-2xl uppercase tracking-widest disabled:opacity-40 transition-all">
                            {loading ? "SE VALIDEAZĂ..." : "✓ VALIDEAZĂ"}
                        </button>
                    </motion.div>
                )}

                {step === "done" && (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900 border border-green-500/30 p-10 rounded-3xl text-center">
                        <div className="text-6xl mb-4">☕</div>
                        <h2 className="text-3xl font-black text-white mb-2">Savurează!</h2>
                        <p className="text-green-400 font-bold">Cafeaua {quantity > 1 ? `(×${quantity}) ` : ''}a fost înregistrată.</p>
                        <p className="text-zinc-500 text-sm mt-2">Se deschide Jukebox-ul...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
