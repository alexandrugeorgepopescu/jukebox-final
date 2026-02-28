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
        const res = await performDrop(user.id, user.musicPreference || [], user.isTester);

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
                                <Sparkles className="absolute top-4 right-4 text-black/20 w-12 h-12 animate-pulse" />
                                <p className="font-bold text-[10px] uppercase tracking-widest mb-2 opacity-70">🌟 Destinul a decis:</p>
                                <h3 className="text-2xl font-black uppercase leading-none tracking-tighter drop-shadow-md">{result.destinyPrize}</h3>
                                <p className="text-[10px] font-bold mt-2 opacity-60 bg-black/10 inline-block px-3 py-1 rounded-full">S-a creat un voucher virtual în portofel.</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 mt-4 px-6 w-full max-w-[260px]">
                            {result?.yt && (
                                <a href={result.yt} target="_blank" rel="noopener noreferrer" className="w-full bg-[#CC0000] hover:bg-[#FF0000] text-white text-[9px] font-bold py-2 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg animate-[pulse_3s_ease-in-out_infinite]">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                    YOUTUBE
                                </a>
                            )}
                            {result?.spotify && (
                                <a href={result.spotify} target="_blank" rel="noopener noreferrer" className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-[#191414] text-[9px] font-bold py-2 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg animate-[pulse_3s_ease-in-out_infinite] delay-75">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                    SPOTIFY
                                </a>
                            )}
                            {result?.apple && (
                                <a href={result.apple} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500 text-white text-[9px] font-bold py-2 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg border border-gray-300/30 animate-[pulse_3s_ease-in-out_infinite] delay-150">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z" /></svg>
                                    APPLE MUSIC
                                </a>
                            )}
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
