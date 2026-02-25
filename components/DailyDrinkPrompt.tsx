"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import { motion } from "framer-motion";
import { Coffee, CupSoda } from "lucide-react";
import { logDailyDrink } from "@/app/actions/gamification";

interface DailyDrinkPromptProps {
    user: User;
    onLogged: () => void;
}

const DRINKS = [
    { id: "espresso", name: "Espresso", icon: <Coffee className="w-6 h-6" />, desc: "Doza pură de concentrare" },
    { id: "latte", name: "Latte / Cappuccino", icon: <CupSoda className="w-6 h-6" />, desc: "Dimineata e mai bună cu lapte" },
    { id: "filter", name: "V60 / Batch Brew", icon: <Coffee className="w-6 h-6" />, desc: "Pentru drum lung" },
    { id: "cold_brew", name: "Cold Brew / Iced", icon: <CupSoda className="w-6 h-6 text-blue-400" />, desc: "Răcoritor și intens" }
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
                            className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group disabled:opacity-50"
                        >
                            <div className="text-purple-400 group-hover:scale-110 transition-transform mb-3">
                                {drink.icon}
                            </div>
                            <span className="font-bold text-white text-sm">{drink.name}</span>
                            <span className="text-[10px] text-zinc-500 mt-1">{drink.desc}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
