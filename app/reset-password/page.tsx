"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { updatePassword } from "@/app/actions/auth";
import { supabase } from "@/lib/supabase";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [sessionReady, setSessionReady] = useState(false);

    // Supabase trimite token-ul ca fragment (#access_token=...) în URL.
    // Trebuie să așteptăm ca supabase să proceseze sesiunea din fragment.
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY" && session) {
                setSessionReady(true);
            }
        });

        // Safety timeout de 5 secunde în caz că Supabase nu declanșează evenimentul
        const timer = setTimeout(() => {
            if (!sessionReady) {
                setStatus("error");
                setMessage("Link-ul de resetare a expirat sau este invalid. Te rugăm să soliciți un link nou din pagina de login.");
            }
        }, 5000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(timer);
        };
    }, [sessionReady]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            setStatus("error");
            setMessage("Parola trebuie să aibă cel puțin 8 caractere.");
            return;
        }
        if (password !== confirm) {
            setStatus("error");
            setMessage("Parolele nu se potrivesc.");
            return;
        }

        setLoading(true);
        setMessage("");

        const res = await updatePassword(password);

        setLoading(false);

        if (res?.error) {
            setStatus("error");
            setMessage(res.error);
        } else {
            setStatus("success");
            setMessage("Parola a fost schimbată! Te redirectăm...");
            setTimeout(() => router.push("/"), 2500);
        }
    };

    if (status === "error") {
        return (
            <div className="text-center space-y-5">
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-left">{message}</span>
                </div>
                <button
                    onClick={() => router.push("/")}
                    className="mt-4 uppercase text-xs font-bold text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900/50 px-6 py-2 rounded-full transition-all hover:border-purple-500/50"
                >
                    Înapoi la pornire
                </button>
            </div>
        );
    }

    if (!sessionReady) {
        return (
            <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-zinc-400 text-sm">Se verifică link-ul de resetare...</p>
                <p className="text-zinc-600 text-xs">Asigură-te că ai accesat link-ul din email.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {status === "success" && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    {message}
                </div>
            )}

            <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Parolă nouă</label>
                <div className="relative mt-1">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                    <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Minim 8 caractere"
                        required
                        className="w-full bg-black/50 p-4 pl-10 pr-12 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-2">Confirmă parola</label>
                <div className="relative mt-1">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                    <input
                        type={showPw ? "text" : "password"}
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        placeholder="Repetă parola"
                        required
                        className="w-full bg-black/50 p-4 pl-10 rounded-xl border border-white/10 text-white outline-none focus:border-purple-500 transition-colors"
                    />
                </div>
            </div>

            {/* Password strength indicator */}
            <div className="flex gap-1 px-1">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            password.length >= i * 3
                                ? i <= 1 ? "bg-red-500"
                                : i <= 2 ? "bg-yellow-500"
                                : i <= 3 ? "bg-blue-500"
                                : "bg-green-500"
                                : "bg-white/10"
                        }`}
                    />
                ))}
            </div>

            <button
                type="submit"
                disabled={loading || status === "success"}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 rounded-xl hover:opacity-90 transition transform active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50"
            >
                {loading ? "SE SALVEAZĂ..." : "SETEAZĂ PAROLA NOUĂ"}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-900/20 blur-[120px] -z-10 rounded-full" />

            <div className="text-center mb-8">
                <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    REWIND JUKEBOX
                </h1>
                <p className="text-[10px] tracking-[0.4em] text-purple-400 uppercase font-bold mt-1">
                    COFFEE • MUSIC • VIBE
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-500/20 blur-[100px] -z-10 rounded-full" />

                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">PAROLĂ NOUĂ</h2>
                    <p className="text-purple-300/60 mt-2 text-sm">
                        Alege o parolă sigură pentru contul tău Rewind.
                    </p>
                </div>

                <Suspense fallback={
                    <div className="flex justify-center py-8">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                }>
                    <ResetPasswordForm />
                </Suspense>
            </motion.div>
        </main>
    );
}
