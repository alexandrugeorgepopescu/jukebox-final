"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { motion } from "framer-motion";
import { X, Gift, Music, CheckCircle2, Ticket } from "lucide-react";
import { getUserData, redeemReward } from "@/app/actions/user";

interface UserProfileProps {
    user: User;
    onClose: () => void;
}

export default function UserProfile({ user, onClose }: UserProfileProps) {
    const [activeTab, setActiveTab] = useState<"vouchers" | "playlist">("vouchers");
    const [userData, setUserData] = useState<{ playlists: any[], rewards: any[] }>({ playlists: [], rewards: [] });
    const [loading, setLoading] = useState(true);
    const [redeeming, setRedeeming] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await getUserData(user.id);
        setUserData(data);
        setLoading(false);
    };

    const handleRedeem = async (rewardId: string) => {
        if (confirm("Ești sigur(ă)? Acest buton trebuie apăsat doar în fața Barista-ului Rewind!")) {
            setRedeeming(rewardId);
            await redeemReward(rewardId);
            await loadData(); // refresh list
            setRedeeming(null);
        }
    };

    const activeVouchers = userData.rewards.filter(r => !r.redeemed && new Date(r.expires_at) > new Date());
    const pastVouchers = userData.rewards.filter(r => r.redeemed || new Date(r.expires_at) <= new Date());

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
        >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div>
                    <h2 className="text-xl font-black text-white">{user.name}</h2>
                    <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mt-1">
                        TRIBAL ID: {user.id.substring(0, 8).toUpperCase()}
                    </p>
                </div>
                <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800 p-2 gap-2 bg-zinc-900/30">
                <button
                    onClick={() => setActiveTab("vouchers")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "vouchers" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-zinc-500 hover:bg-zinc-800"}`}
                >
                    <Gift className="w-4 h-4" /> Vouchers
                </button>
                <button
                    onClick={() => setActiveTab("playlist")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "playlist" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-zinc-500 hover:bg-zinc-800"}`}
                >
                    <Music className="w-4 h-4" /> Playlist
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
                    </div>
                ) : activeTab === "vouchers" ? (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Ticket className="w-4 h-4" /> Vouchere Active
                            </h3>
                            {activeVouchers.length === 0 ? (
                                <p className="text-zinc-600 text-sm italic">Nu ai vouchere active. Revino la Jukebox!</p>
                            ) : (
                                <div className="space-y-4">
                                    {activeVouchers.map(v => (
                                        <div key={v.id} className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-5 rounded-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-3 bg-purple-500/20 rounded-bl-2xl text-[10px] font-bold text-purple-300">
                                                Exp: {new Date(v.expires_at).toLocaleDateString()}
                                            </div>
                                            <h4 className="text-xl font-black text-white mb-1 uppercase tracking-tighter">{v.type}</h4>
                                            <p className="text-xs text-purple-200/70 mb-4 font-mono">CODE: {v.code}</p>

                                            <button
                                                onClick={() => handleRedeem(v.id)}
                                                disabled={redeeming === v.id}
                                                className="w-full bg-purple-500 text-white font-black py-3 rounded-xl text-sm uppercase transition-transform active:scale-95 disabled:opacity-50"
                                            >
                                                {redeeming === v.id ? "SE VALIDEAZĂ..." : "REVENDICĂ ACUM (Barista)"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {pastVouchers.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-zinc-600 uppercase tracking-widest mb-4">Istoric</h3>
                                <div className="space-y-3 opacity-60">
                                    {pastVouchers.map(v => (
                                        <div key={v.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold text-zinc-400 line-through">{v.type}</h4>
                                                <p className="text-[10px] text-zinc-600">{v.redeemed ? `Folosit la: ${new Date(v.redeemed_at).toLocaleDateString()}` : "Expirat"}</p>
                                            </div>
                                            {v.redeemed && <CheckCircle2 className="text-green-500/50 w-5 h-5" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Colecția Ta</h3>
                        {userData.playlists.length === 0 ? (
                            <p className="text-zinc-600 text-sm italic">Nu ai extras nicio piesă încă.</p>
                        ) : (
                            <div className="space-y-3">
                                {userData.playlists.map((p, i) => (
                                    <div key={i} className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl hover:border-purple-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-white text-sm">{p.songs?.full_title}</h4>
                                            <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-sm uppercase">
                                                {new Date(p.listened_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-purple-400/80 italic">"{p.songs?.fun_message}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
