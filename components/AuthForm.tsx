"use client";

import { useState } from "react";
import { User, MusicCategory } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Check, Flame, Star, Zap, Ghost } from "lucide-react";
import { signUpUser, loginUser } from "@/app/actions/auth";

const MUSIC_CATEGORIES: { id: MusicCategory; label: string; desc: string; vibe: string }[] = [
    { id: "RETRO_WAVE", label: "RETRO WAVE", desc: "Nostalgie care te ridică", vibe: "Old memories." },
    { id: "CHILL_FLOW", label: "CHILL FLOW", desc: "Calmare fără plictiseală", vibe: "Slow down." },
    { id: "GOOD_VIBE", label: "GOOD VIBE", desc: "Fericire pură, ușoară", vibe: "Mood upgrade." },
    { id: "BASS_MODE", label: "BASS MODE", desc: "Energie care te pornește", vibe: "Feel it." },
    { id: "SOUL_SELECT", label: "SOUL SELECT", desc: "Pentru pasionații de voci calde", vibe: "Smooth and deep." },
    { id: "MAIN_CHARACTER", label: "MAIN CHARACTER", desc: "Când viața e un film", vibe: "Center stage." },
];

const TRIBES = [
    { id: "retro", name: "Retro Souls", icon: <Star className="w-5 h-5 text-yellow-500" />, desc: "Pentru cei care vânează vibe-ul clasic." },
    { id: "energy", name: "Energy Junkies", icon: <Zap className="w-5 h-5 text-blue-400" />, desc: "Trăiesc pe BPM mare și double espresso." },
    { id: "chill", name: "Chill Phantoms", icon: <Ghost className="w-5 h-5 text-purple-400" />, desc: "Smooth, invizibili, mereu prezenți." },
];

interface AuthFormProps {
    onComplete: (user: User) => void;
}

export default function AuthForm({ onComplete }: AuthFormProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tempMusicPrefs, setTempMusicPrefs] = useState<string[]>([]);
    const [selectedTribe, setSelectedTribe] = useState("retro");

    const toggleMusic = (id: string) => {
        if (tempMusicPrefs.includes(id)) {
            setTempMusicPrefs(tempMusicPrefs.filter((c) => c !== id));
        } else {
            if (tempMusicPrefs.length < 2) {
                setTempMusicPrefs([...tempMusicPrefs, id]);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);

        // Append custom array states
        tempMusicPrefs.forEach(pref => formData.append("music_cats", pref));
        formData.append("tribe", selectedTribe);

        try {
            if (isLogin) {
                const res = await loginUser(formData);
                if (res?.error) {
                    setErrorMsg(res.error);
                } else if (res?.user) {
                    onComplete({
                        id: res.user.id,
                        name: res.profile?.name || res.user.email?.split("@")[0] || "Guest",
                        email: res.user.email,
                        musicPreference: res.profile?.music_preferences || [],
                        coffeePreference: res.profile?.coffee_preference || "",
                    } as User);
                }
            } else {
                if (tempMusicPrefs.length === 0) {
                    setErrorMsg("Alege cel puțin o categorie muzicală!");
                    setLoading(false);
                    return;
                }
                const res = await signUpUser(formData);
                if (res?.error) {
                    setErrorMsg(res.error);
                } else if (res?.user) {
                    const fname = formData.get("firstname") as string;
                    const lname = formData.get("lastname") as string;
                    onComplete({
                        id: res.user.id,
                        name: `${fname} ${lname}`,
                        email: res.user.email,
                        musicPreference: tempMusicPrefs as MusicCategory[],
                        coffeePreference: formData.get("coffee_type") as string,
                    } as User);
                }
            }
        } catch (err: any) {
            setErrorMsg(err.message || "A apărut o eroare necunoscută.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-500/20 blur-[100px] -z-10 rounded-full" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-white tracking-tight">
                        {isLogin ? "BINE AI REVENIT" : "DEVINO MEMBRU"}
                    </h2>
                    <p className="text-purple-300/60 mt-2 text-sm">
                        {isLogin ? "Conectează-te pentru doza zilnică de energie." : "Alege-ți tribul și începe jocul Rewind."}
                    </p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Prenume</label>
                                    <input type="text" name="firstname" required className="w-full bg-black/50 p-4 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors mt-1" />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Nume</label>
                                    <input type="text" name="lastname" required className="w-full bg-black/50 p-4 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Poreclă (Nickname)</label>
                                    <div className="relative mt-1">
                                        <Flame className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                                        <input type="text" name="nickname" required placeholder="ex: Alex" className="w-full bg-black/50 p-4 pl-10 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Data de naștere (Pt cadouri)</label>
                                    <input type="date" name="birthday" required className="w-full bg-black/50 p-4 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors mt-1 [color-scheme:dark]" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 space-y-4">
                                <label className="text-xs uppercase tracking-widest text-purple-400 font-bold">1. Alege-ți Tribul</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {TRIBES.map((t) => (
                                        <div
                                            key={t.id}
                                            onClick={() => setSelectedTribe(t.id)}
                                            className={clsx(
                                                "p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2",
                                                selectedTribe === t.id ? "bg-purple-500/20 border-purple-500" : "bg-black/40 border-white/5 hover:border-white/20"
                                            )}
                                        >
                                            {t.icon}
                                            <span className="text-xs font-bold text-white leading-tight">{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="text-xs uppercase tracking-widest text-purple-400 font-bold">2. Forma Ta De Energie</label>
                                <select name="coffee_type" className="w-full bg-black/50 p-4 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors mt-2 appearance-none">
                                    <option value="pura" className="bg-zinc-900 text-[#fbe485]">⚡ Pură (Boost-ul instant) - Espresso, Espresso Dublu</option>
                                    <option value="lunga" className="bg-zinc-900 text-[#fbe485]">💧 Lungă (Boost prelungit) - Americano, Long Black</option>
                                    <option value="intensa" className="bg-zinc-900 text-[#fbe485]">🤎 Intensă (Balansul perfect) - Flat White</option>
                                    <option value="clasica" className="bg-zinc-900 text-[#fbe485]">☁️ Clasică (Cafeaua ta de zi cu zi) - Cappuccino</option>
                                    <option value="generoasa" className="bg-zinc-900 text-[#fbe485]">🤗 Generoasă (Cafea domolită) - Caffe Latte, Large Latte</option>
                                    <option value="laptoasa" className="bg-zinc-900 text-[#fbe485]">🤍 Lăptoasă (Atinsă ușor de cafea) - Latte Macchiato</option>
                                    <option value="dulce" className="bg-zinc-900 text-[#fbe485]">🍫 Dulce (Răsfăț absolut) - Caramel Latte, Ciocolată Caldă, Babyccino</option>
                                    <option value="glaciara" className="bg-zinc-900 text-[#fbe485]">🧊 Glaciară (Ice, ice baby) - Iced Latte, Iced Espresso, Frozen Cappuccino</option>
                                    <option value="alternativa" className="bg-zinc-900 text-[#fbe485]">🌿 Alternativă (Boost din natură) - Matcha Latte, Orange Espresso, Limonadă</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <label className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2 block">3. Vibe-ul Tău (Alege 2)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {MUSIC_CATEGORIES.map((cat) => (
                                        <div
                                            key={cat.id}
                                            onClick={() => toggleMusic(cat.id)}
                                            className={clsx(
                                                "p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden",
                                                tempMusicPrefs.includes(cat.id)
                                                    ? "border-purple-500 bg-purple-500/10"
                                                    : "border-white/5 bg-black/40 hover:border-white/20"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className={clsx("font-bold text-xs", tempMusicPrefs.includes(cat.id) ? "text-purple-400" : "text-white")}>
                                                    {cat.label}
                                                </h3>
                                                {tempMusicPrefs.includes(cat.id) && <Check className="text-purple-400 w-4 h-4" />}
                                            </div>
                                            <p className="text-[10px] text-zinc-500">{cat.vibe}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="space-y-4 pt-4 border-t border-white/5 mt-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                            <input type="email" name="email" required className="w-full bg-black/50 p-4 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors mt-1" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Parolă</label>
                            <input type="password" name="password" required className="w-full bg-black/50 p-4 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors mt-1" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 rounded-xl hover:opacity-90 transition transform active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.3)] mt-6 disabled:opacity-50"
                    >
                        {loading ? "SE PROCESEAZĂ..." : isLogin ? "INTRĂ ÎN CONT" : "CREEAZĂ CONTUL"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }} className="text-xs text-zinc-500 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4">
                        {isLogin ? "Nu ești în trib încă? Înscrie-te aici." : "Ai deja cardul virtual? Loghează-te."}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
