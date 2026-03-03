"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Music, CheckCircle2, Ticket, Megaphone, Coffee } from "lucide-react";
import { getUserData, redeemReward, getAnnouncements } from "@/app/actions/user";

interface UserProfileProps {
    user: User;
    onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
    welcome: "from-sky-900/60 to-blue-900/60 border-blue-500/40",
    loyalty: "from-purple-900/60 to-indigo-900/60 border-purple-500/40",
    event: "from-amber-900/60 to-orange-900/60 border-amber-500/40",
    menu: "from-emerald-900/60 to-teal-900/60 border-emerald-500/40",
    bday: "from-purple-900/60 to-fuchsia-900/60 border-pink-500/40",
    promo: "from-purple-900/60 to-indigo-900/60 border-purple-500/40",
    update: "from-blue-900/60 to-cyan-900/60 border-blue-500/40",
};

export default function UserProfile({ user, onClose }: UserProfileProps) {
    const [activeTab, setActiveTab] = useState<"vouchers" | "playlist" | "news">("vouchers");
    const [userData, setUserData] = useState<{ playlists: any[], rewards: any[], coffeeCount: number }>({ playlists: [], rewards: [], coffeeCount: 0 });
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [redeeming, setRedeeming] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [data, news] = await Promise.all([
            getUserData(user.id),
            getAnnouncements()
        ]);
        setUserData(data);
        setAnnouncements(news);
        setLoading(false);
    };

    const handleRedeem = async (rewardId: string) => {
        if (confirm("Ești sigur(ă)? Acest buton trebuie apăsat doar în fața Barista-ului Rewind!")) {
            setRedeeming(rewardId);
            await redeemReward(rewardId);
            await loadData();
            setRedeeming(null);
        }
    };

    const activeVouchers = userData.rewards.filter(r => !r.redeemed && new Date(r.expires_at) > new Date());
    const pastVouchers = userData.rewards.filter(r => r.redeemed || new Date(r.expires_at) <= new Date());

    // Coffee loyalty progress
    const coffeeCycle = userData.coffeeCount % 8;
    const coffeeProgress = (coffeeCycle / 8) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
        >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div>
                    <h2 className="text-xl font-black text-white">{user.name}</h2>
                    <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mt-0.5">
                        TRIBAL ID: {user.id.substring(0, 8).toUpperCase()}
                    </p>
                </div>
                <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Coffee Loyalty Bar */}
            <div className="px-5 py-3 bg-zinc-900/30 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold uppercase tracking-widest">
                        <Coffee className="w-3.5 h-3.5 text-amber-400" />
                        Loyalty Cafele
                    </div>
                    <span className="text-xs font-black text-amber-400">{coffeeCycle}/8 → cafea gratuită</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${coffeeProgress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
                <div className="flex justify-between mt-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <div key={n} className={`w-4 h-4 rounded-full border text-[8px] flex items-center justify-center font-black ${n <= coffeeCycle ? 'bg-amber-400 border-amber-400 text-black' : 'border-zinc-700 text-zinc-700'}`}>
                            {n === 8 ? '☕' : n}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800 p-2 gap-1 bg-zinc-900/30">
                <button
                    onClick={() => setActiveTab("vouchers")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === "vouchers" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-zinc-500 hover:bg-zinc-800"}`}
                >
                    <Gift className="w-3.5 h-3.5" /> Vouchers
                </button>
                <button
                    onClick={() => setActiveTab("playlist")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === "playlist" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-zinc-500 hover:bg-zinc-800"}`}
                >
                    <Music className="w-3.5 h-3.5" /> Playlist
                </button>
                <button
                    onClick={() => setActiveTab("news")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === "news" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-zinc-500 hover:bg-zinc-800"}`}
                >
                    <Megaphone className="w-3.5 h-3.5" /> Noutăți
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
                    </div>
                ) : activeTab === "vouchers" ? (
                    <div className="space-y-7">
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Ticket className="w-4 h-4" /> Vouchere Active
                            </h3>
                            {activeVouchers.length === 0 ? (
                                <p className="text-zinc-600 text-sm italic">Nu ai vouchere active. Revino la Jukebox!</p>
                            ) : (
                                <div className="space-y-4">
                                    {activeVouchers.map(v => (
                                        <div key={v.id} className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-5 rounded-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2.5 bg-purple-500/20 rounded-bl-2xl text-[9px] font-bold text-purple-300">
                                                Exp: {new Date(v.expires_at).toLocaleDateString()}
                                            </div>
                                            <h4 className="text-lg font-black text-white mb-1 uppercase tracking-tighter pr-20">{v.type}</h4>
                                            <p className="text-xs text-purple-200/70 mb-4 font-mono">CODE: {v.code}</p>
                                            <button
                                                onClick={() => handleRedeem(v.id)}
                                                disabled={redeeming === v.id}
                                                className="w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-2.5 rounded-xl text-sm uppercase transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                {redeeming === v.id ? "SE VALIDEAZĂ..." : "REVENDICĂ (la Barista)"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {pastVouchers.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Istoric</h3>
                                <div className="space-y-2 opacity-50">
                                    {pastVouchers.map(v => (
                                        <div key={v.id} className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl flex items-center justify-between">
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-400 line-through">{v.type}</h4>
                                                <p className="text-[9px] text-zinc-600">{v.redeemed ? `Folosit: ${new Date(v.redeemed_at).toLocaleDateString()}` : "Expirat"}</p>
                                            </div>
                                            {v.redeemed && <CheckCircle2 className="text-green-500/50 w-4 h-4" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : activeTab === "playlist" ? (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Colecția Ta</h3>
                        {userData.playlists.length === 0 ? (
                            <p className="text-zinc-600 text-sm italic">Nu ai extras nicio piesă încă.</p>
                        ) : (
                            <div className="space-y-3">
                                {userData.playlists.map((p, i) => (
                                    <div key={i} className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl hover:border-purple-500/30 transition-colors flex flex-col">
                                        <div className="flex justify-between items-start mb-1.5">
                                            <h4 className="font-bold text-white text-sm pr-2">{p.songs?.full_title}</h4>
                                            <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-sm uppercase shrink-0">
                                                {new Date(p.listened_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-purple-400/80 italic mb-3">"{p.songs?.fun_message}"</p>

                                        <div className="flex gap-2 mt-auto">
                                            {p.songs?.yt_url && (
                                                <a href={p.songs.yt_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#CC0000] hover:bg-[#FF0000] text-white py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-center transition-all shadow-md flex items-center justify-center gap-1">
                                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                    YouTube
                                                </a>
                                            )}
                                            {p.songs?.spotify_url && (
                                                <a href={p.songs.spotify_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-[#191414] py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-center transition-all shadow-md flex items-center justify-center gap-1">
                                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                                    Spotify
                                                </a>
                                            )}
                                            {p.songs?.apple_url && (
                                                <a href={p.songs.apple_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500 text-white py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-center transition-all shadow border border-gray-300/30 flex items-center justify-center gap-1">
                                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z" /></svg>
                                                    Apple
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* NOUTATI TAB */
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Megaphone className="w-4 h-4" /> Noutăți & Promoții
                        </h3>
                        {announcements.length === 0 ? (
                            <p className="text-zinc-600 text-sm italic">Nicio noutate momentan. Revino curând!</p>
                        ) : (
                            <AnimatePresence>
                                {announcements.map((a, i) => (
                                    <motion.div
                                        key={a.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className={`bg-gradient-to-r ${CATEGORY_COLORS[a.category] || CATEGORY_COLORS.update} border p-4 rounded-2xl`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl shrink-0">{a.emoji}</span>
                                            <div>
                                                <h4 className="font-black text-white text-sm leading-tight mb-1">{a.title}</h4>
                                                <p className="text-xs text-zinc-300/80 leading-relaxed">{a.body}</p>
                                                <p className="text-[9px] text-zinc-600 mt-2 uppercase tracking-wide">
                                                    {new Date(a.created_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' })}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
