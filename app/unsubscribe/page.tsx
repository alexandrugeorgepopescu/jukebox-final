"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, MailX, ShieldAlert } from "lucide-react";
import { optOutEmail } from "@/app/actions/user";

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Link-ul de dezabonare este invalid, lipsă sau incomplet.");
            return;
        }

        const handleUnsubscribe = async () => {
            const res = await optOutEmail(token);
            if (res.error) {
                setStatus("error");
                setMessage(res.error);
            } else {
                setStatus("success");
            }
        };

        handleUnsubscribe();
    }, [token]);

    return (
        <div className="text-center space-y-6">
            {status === "loading" && (
                <div className="space-y-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-zinc-400 text-sm">Se verifică semnătura de securitate a token-ului...</p>
                </div>
            )}

            {status === "success" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white">Te-ai dezabonat cu succes</h2>
                    <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                        Semnătura ta a fost verificată. Nu vei mai primi nicio comunicare promoțională prin email de la Rewind Cafe.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 uppercase text-xs font-bold text-zinc-300 hover:text-white border border-zinc-700 bg-zinc-800/60 px-6 py-3 rounded-full transition-all"
                    >
                        Înapoi la aplicație
                    </button>
                </motion.div>
            )}

            {status === "error" && (
                <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto">
                        <ShieldAlert className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Solicitare Respinsă</h2>
                    <p className="text-red-400 text-sm max-w-xs mx-auto">{message}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 uppercase text-xs font-bold text-zinc-300 hover:text-white border border-zinc-700 bg-zinc-800/60 px-6 py-3 rounded-full transition-all"
                    >
                        Înapoi la aplicație
                    </button>
                </div>
            )}
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-900/20 blur-[100px] -z-10 rounded-full" />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    REWIND JUKEBOX
                </h1>
                <p className="text-[10px] tracking-[0.4em] text-purple-400 uppercase font-bold mt-1">
                    CONFIRMARE GDPR DEZABONARE
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
                    <MailX className="w-6 h-6 text-purple-400" />
                </div>

                <Suspense fallback={
                    <div className="flex justify-center py-8">
                        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                }>
                    <UnsubscribeContent />
                </Suspense>
            </motion.div>
        </main>
    );
}
