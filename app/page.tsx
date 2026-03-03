"use client";

import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import DailyDrinkPrompt from "@/components/DailyDrinkPrompt";
import Jukebox from "@/components/Jukebox";
import UserProfile from "@/components/UserProfile";
import { User } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { checkBirthdayReward } from "@/app/actions/user";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [drinkLogged, setDrinkLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

    // Initial session check
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // Fetch profile
                const { data } = await supabase.from("users").select("*").eq("id", session.user.id).single();
                if (data) {
                    const mappedUser: User = {
                        id: session.user.id,
                        name: data.name,
                        email: session.user.email,
                        musicPreference: data.music_preferences,
                        coffeePreference: data.coffee_preference,
                        birthDate: data.birth_date,
                        isTester: data.is_tester || false,
                    };
                    setUser(mappedUser);
                    // Check birthday reward
                    checkBirthdayReward(session.user.id, data.birth_date);
                }
            }
            setIsLoading(false);
        };
        checkSession();
    }, []);

    const handleAuthComplete = (u: User) => {
        setUser(u);
    };

    if (isLoading) {
        return <main className="min-h-screen flex items-center justify-center bg-black"></main>;
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black selection:bg-purple-500/30">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-10" />

         {/* Header */}
<div className="text-center mb-8 z-10 pt-10 w-full overflow-visible">
    <h1 className="text-[16vw] sm:text-[10vw] md:text-[7rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-2 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] leading-[0.85] text-center w-full px-2">
    <span className="inline-block ml-[0.3em]">REWIND</span><br />JUKEBOX
</h1>
    <p className="text-[10px] tracking-[0.4em] text-purple-400 uppercase font-bold animate-pulse">
        COFFEE • MUSIC • VIBE
    </p>
    {user && (
        <button
            onClick={() => setShowProfile(true)}
            className="mt-6 uppercase text-xs font-bold text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900/50 px-6 py-2 rounded-full transition-all hover:border-purple-500/50"
        >
            Accesează Portofel / {user.name}
        </button>
    )}
</div>

            {/* Content Sequencing */}
            <div className="w-full max-w-4xl z-10 flex flex-col items-center justify-center grow pb-20">
                {!user ? (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <AuthForm onComplete={handleAuthComplete} />
                    </div>
                ) : !drinkLogged ? (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <DailyDrinkPrompt user={user} onLogged={() => setDrinkLogged(true)} />
                    </div>
                ) : (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <Jukebox user={user} />
                    </div>
                )}
            </div>

            <footer className="absolute bottom-4 text-center w-full text-[10px] text-zinc-600 uppercase tracking-widest pointer-events-none">
                V2.0 THE PREMIUM TRIBE EXP
            </footer>

            {/* Slide Out Profile */}
            {showProfile && user && (
                <UserProfile user={user} onClose={() => setShowProfile(false)} />
            )}
        </main>
    );
}


