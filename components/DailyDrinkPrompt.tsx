"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import { motion } from "framer-motion";
import { logDailyDrink } from "@/app/actions/gamification";

interface DailyDrinkPromptProps {
    user: User;
    onLogged: () => void;
}

const DRINKS = [
    { id: "espresso", name: "Espresso Pur", icon: "⚡", desc: "Scurt și la obiect.", badge: "The Purist" },
    { id: "americano", name: "Americano", icon: "💧", desc: "Energie pentru cursă lungă.", badge: "Maratonistul" },
    { id: "flat_white", name: "Flat White", icon: "🤎", desc: "2 shot-uri, echilibru perfect.", badge: "The Balanced" },
    { id: "latte_macchiato", name: "Latte & Macchiato", icon: "☁️", desc: "Generos și catifelat.", badge: "Milk Lover" },
    { id: "iced", name: "Ice & Frozen", icon: "🧊", desc: "Cafeaua ta preferată, pe gheață.", badge: "Ice Ice Baby" },
    { id: "tonic_matcha", name: "Tonice & Matcha", icon: "🌿", desc: "Efervescent și alternativ.", badge: "Exploratorul" }
];

export default function DailyDrinkPrompt({ user, onLogged }: DailyDrinkPromptProps) {
    const [loading, setLoading] = useState(false);

    const handleSelect = async (drinkId: string) => {
        setLoading(true);
        try {
            await logDailyDrink(user.id, drinkId);
            onLogged();
        } catch (e) {
            console.error(e);
            onLogged(); // Skip on error to not block user
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4 z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-zinc-900 border border-purple-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.15)] text-center relative overflow-hidden"
            >
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[50px] rounded-full" />

                <h2 className="text-3xl font-black text-white mb-2">Ziua bună se cunoaște de dimineață.</h2>
                <p className="text-zinc-400 mb-8">Ce bem astăzi, {user.name.split(' ')[0]}?</p>

                <div className="grid grid-cols-2 gap-4">
                    {DRINKS.map(drink => (
                        <button
                            key={drink.id}
                            disabled={loading}
                            onClick={() => handleSelect(drink.id)}
                            className="flex flex-col items-center justify-center p-4 bg-black/40 border border-white/5 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group disabled:opacity-50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider backdrop-blur-md border-b border-l border-purple-500/30">
                                {drink.badge}
                            </div>
                            <div className="text-3xl group-hover:scale-110 transition-transform mb-2 mt-2">
                                {drink.icon}
                            </div>
                            <span className="font-bold text-white text-sm mb-1">{drink.name}</span>
                            <span className="text-[10px] text-zinc-500 px-1">{drink.desc}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
