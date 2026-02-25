"use client";

import { useState } from "react";
import { Song, User } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Play, Sparkles, Music, AlertCircle } from "lucide-react";
import { performDrop } from "@/app/actions/jukebox";

interface JukeboxProps {
    user: User;
}

export default function Jukebox({ user }: JukeboxProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<Song | null>(null);
    const [errorData, setErrorData] = useState<{ error: string, fomo?: string } | null>(null);

    const handleDrop = async () => {
        setIsSpinning(true);
        setResult(null);
        setErrorData(null);

        // Fetch securely from server
        const res = await performDrop(user.id, user.musicPreference || []);

        setTimeout(() => { // Keep the spin for suspense
            setIsSpinning(false);

            if (res.error) {
                setErrorData({ error: res.error, fomo: res.fomo });
                return;
            }

            if (res.song) {
                setResult(res.song as Song);
                confetti({
                    particleCount: 200,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: ['#A855F7', '#ffffff', '#EAB308']
                });
            }
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto p-2 space-y-8">
            <AnimatePresence mode="wait">
                {!result && !errorData ? (
                    <motion.div key="ready" className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500 w-full">
                        <div className="text-center">
                            <h3 className="text-purple-400 font-bold tracking-widest text-[10px] uppercase mb-1">Status Sistem: <span className="text-green-400">ONLINE</span></h3>
                            <p className="text-zinc-500 text-xs text-balance">Astăzi s-au dat deja 3 prăjituri! Mai este ceva în Jukebox pentru tine?</p>
                        </div>

                        <div className="relative w-64 h-64 cursor-pointer group" onClick={!isSpinning ? handleDrop : undefined}>
                            {/* Outer Glow */}
                            <div className="absolute inset-[-20px] bg-purple-500/20 blur-[30px] rounded-full group-hover:bg-purple-500/40 transition-all duration-500" />

                            <div className={`absolute inset-0 rounded-full border-[2px] border-purple-500/30 flex items-center justify-center bg-black/60 shadow-[inset_0_0_50px_rgba(147,51,234,0.2)] backdrop-blur-md ${isSpinning ? "animate-[spin_0.5s_linear_infinite]" : ""}`}>
                                <div className="absolute inset-2 rounded-full border border-white/5 border-dashed" />
                                <div className="w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.8)] filter blur-[2px]" />
                            </div>

                            {!isSpinning && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <Play className="w-20 h-20 text-white opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transform group-hover:scale-110 transition-transform" />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleDrop}
                            disabled={isSpinning}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-5 rounded-[2rem] font-black text-2xl uppercase active:scale-95 transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)] disabled:opacity-50 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-white/20 skew-x-[-20deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                            {isSpinning ? "SE SCANEAZĂ..." : "DROP THE BEAT"}
                        </button>
                    </motion.div>
                ) : errorData ? (
                    <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-center space-y-6">
                        <div className="bg-zinc-900/90 border border-red-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4 opacity-80" />
                            <h2 className="text-xl font-bold text-white mb-2 leading-tight">{errorData.error}</h2>
                            <div className="h-px w-1/2 bg-white/10 mx-auto my-6" />
                            {errorData.fomo && (
                                <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/20 text-purple-300 text-sm italic">
                                    " {errorData.fomo} "
                                </div>
                            )}
                        </div>
                        <button onClick={() => setErrorData(null)} className="text-zinc-500 hover:text-white uppercase text-xs font-bold tracking-widest underline decoration-zinc-700 underline-offset-8 transition-colors">
                            Întoarce-te
                        </button>
                    </motion.div>
                ) : (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center space-y-6">
                        {/* Result Card */}
                        <div className="bg-zinc-900/90 border border-purple-500/30 p-8 rounded-[2.5rem] w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.15)]">
                            <span className="text-[10px] bg-purple-500 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-6 inline-block shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                                {result?.cat.replace('_', ' ')}
                            </span>
                            <h2 className="text-3xl font-black text-white leading-tight mb-4 drop-shadow-lg">{result?.fullTitle}</h2>
                            <p className="text-lg italic text-purple-300/80 font-medium">"{result?.funMessage}"</p>
                        </div>

                        {/* Prize Card */}
                        {result?.destinyPrize && (
                            <div className="bg-gradient-to-br from-yellow-400 to-amber-600 text-black p-6 rounded-[2rem] shadow-[0_0_40px_rgba(251,191,36,0.4)] w-full text-center transform hover:scale-[1.02] transition-transform relative overflow-hidden">
                                <Sparkles className="absolute top-4 right-4 text-black/20 w-12 h-12" />
                                <p className="font-bold text-[10px] uppercase tracking-widest mb-2 opacity-70">Destinul a decis:</p>
                                <h3 className="text-2xl font-black uppercase leading-none tracking-tighter">{result.destinyPrize}</h3>
                                <p className="text-[10px] font-bold mt-2 opacity-60">S-a creat un voucher virtual în portofel.</p>
                            </div>
                        )}

                        {/* Links */}
                        <div className="w-full flex flex-col gap-3 mt-4">
                            <a href={result?.yt} target="_blank" rel="noopener noreferrer" className="w-full bg-[#FF0000]/20 border border-[#FF0000]/50 text-white py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-[#FF0000]/30 transition-all flex items-center justify-center gap-2">
                                <span>▶</span> YouTube
                            </a>
                        </div>

                        <button onClick={() => setResult(null)} className="mt-4 text-zinc-500 hover:text-white uppercase text-[10px] font-bold tracking-[0.4em] underline decoration-zinc-700 underline-offset-8 transition-colors">
                            ÎNCHIDE
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
