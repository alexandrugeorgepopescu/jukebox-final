<?php
/*
Template Name: The Lineup
*/
get_header(); ?>

<!-- HERO -->
<section class="pt-48 pb-24 px-4 bg-rewind-cream relative overflow-hidden">
    <div class="container mx-auto max-w-6xl text-center relative z-10">
        <span class="block text-rewind-violet font-dj text-sm tracking-[0.3em] uppercase mb-6">Meet the
            Stars</span>
        <h1 class="font-dj font-black text-6xl md:text-9xl mb-8 uppercase text-rewind-black tracking-tighter">
            THE LINEUP
        </h1>
        <p
            class="font-dj text-xl md:text-3xl tracking-widest text-rewind-black uppercase max-w-4xl mx-auto border-y-2 border-rewind-black py-6">
            Nu avem angajați. Avem headlineri.
        </p>
        <p class="max-w-2xl mx-auto text-gray-600 mt-8 text-lg font-light leading-relaxed">
            La REWIND, cafeaua o face aparatul, dar vibe-ul îl fac oamenii. Ei sunt cei care mixează gustul cu starea de
            spirit. Cunoaște trupa din spatele barului și din spatele scenei.
        </p>
    </div>
</section>

<!-- TEAM GRID -->
<section class="pb-32 px-4">
    <div class="container mx-auto max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">

            <!-- 1. AMALIA -->
            <div class="flex flex-col gap-6 group">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/amalia.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Amalia">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">AMALIA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Barista & The
                            Reliable Hero</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        📼 RETRO WAVE (Classic Values. New Energy.)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Amalia este dovada vie că energia potrivită schimbă complet ziua unui om. O prezență frumoasă și
                        mereu cu zâmbetul pe buze, ea are darul de a transforma orice oprire la bar într-un moment fain
                        și relaxant. Dincolo de spiritul ei tânăr și efervescent, se ascunde o inimă extraordinar de
                        bună. Este doza noastră zilnică de optimism și omul care ne amintește, zi de zi, că un zâmbet
                        sincer este cel mai de preț ingredient.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Transformă o zi agitată într-o stare totală de
                            bine.</span>
                    </div>
                </div>
            </div>

            <!-- 2. IONELA -->
            <div class="flex flex-col gap-6 group md:mt-24">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="https://app.rewindcafe.ro/images/ionela.jpg"
                        onerror="this.onerror=null;this.src='<?php echo get_template_directory_uri(); ?>/images/ionela.jpg';"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Ionela">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">IONELA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Location Manager
                            Păcurari & The Standard</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        ⚡ SOLID GROUND (Strong Mind. Pure Precision.)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Ionela este definiția caracterului strong și a lucrurilor făcute ca la carte. Manager de locație
                        la REWIND Păcurari, ea este omul bine pus la punct, cu o personalitate serioasă și o disciplină
                        care ridică ștacheta în fiecare zi. Lângă ea nu ai cum să stagnezi — energia și exigența ei te
                        ajută doar să crești. Este pilonul nostru de siguranță: omul în care te poți încrede cu absolut
                        orice și care se asigură că fiecare detaliu funcționează ceas.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Face treburile ca la carte și inspiră încredere
                            absolută.</span>
                    </div>
                </div>
            </div>

            <!-- 3. FLORI -->
            <div class="flex flex-col gap-6 group">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/flori.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Flori">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">FLORI.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Location Manager
                            Miroslava & The Rising Star</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        ✨ MAIN CHARACTER (Soundtrack Energy)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Flori și-a demonstrat din plin toate abilitățile la cafeneaua din Miroslava și, prin muncă,
                        devotament și maturitate, a ajuns la gradul de Manager de Locație. Reprezintă noua generație de
                        profesioniști: extrem de muncitoare, atentă la detalii și cu o sensibilitate care o face să
                        simtă exact ce are nevoie fiecare client. Este omul care își iese din cale ca să susțină echipa,
                        iar pentru ea fiecare cafea este o scenă pe care performanța trebuie să fie de Oscar.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Devotament total și o evoluție spectaculoasă
                            până la rolul de Manager.</span>
                    </div>
                </div>
            </div>

            <!-- 4. CARINA -->
            <div class="flex flex-col gap-6 group md:mt-24">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="https://app.rewindcafe.ro/images/carina.jpg"
                        onerror="this.onerror=null;this.src='<?php echo get_template_directory_uri(); ?>/images/carina.jpg';"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Carina">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">CARINA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Barista & The Free
                            Spirit</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        🌿 FREE SPIRIT (Calm Soul. Fast Learner.)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Carina este un spirit liber și acea prezență liniștită care îți transmite imediat o stare de
                        calm. Este omul care îți este aproape exact atunci când ai nevoie, cu o empatie naturală și o
                        atenție sinceră față de cei din jur. Mereu dornică de cunoaștere și curioasă să descopere
                        secretele cafelei de specialitate, Carina prinde lucrurile din zbor și aduce un aer proaspăt și
                        autentic în spatele barului.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Prinde totul din zbor și aduce liniște în jurul
                            ei.</span>
                    </div>
                </div>
            </div>

            <!-- 5. ADELINA -->
            <div class="flex flex-col gap-6 group">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/adelina.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Adelina">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">ADELINA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Barista & The Latte
                            Artist</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        ☀️ GOOD VIBE (Instant Mood Upgrade)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Nu te lăsa păcălit de aparența ei inițial reținută. Sub acele bucle rebele se ascunde o energie
                        solară care așteaptă momentul potrivit să explodeze. Adelina este artista vizuală a cafelei
                        tale. Este perfecționista care nu îți dă paharul până când crema nu stă impecabil. Clienții o
                        adoră pentru că, dincolo de cafea, servește zâmbete și optimism. Când Adelina e pe tură, cafeaua
                        nu e doar gustoasă, e "instagramabilă".
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Transformă laptele în artă și clienții în
                            prieteni.</span>
                    </div>
                </div>
            </div>

            <!-- 6. VLAD -->
            <div class="flex flex-col gap-6 group md:mt-24">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/vlad.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Vlad">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">VLAD.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Social Media & The
                            Hype Man</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        🔥 BASS MODE (Feel it in your chest)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Vlad este accelerația brandului. Student la FEAA, pasionat de mașini și viteză, el transpune
                        adrenalina în vizual. El este cel care capturează momentele REWIND și le aruncă în feed-ul tău
                        cu o prospețime vizuală greu de ignorat. Are ochiul format pentru detalii estetice (mulțumită
                        pasiunii pentru fotografie) și mintea setată pe idei fresh. Dacă vezi ceva cool pe net de la
                        noi, e „vina” lui.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Face brandul să arate la fel de bine precum
                            gustul cafelei.</span>
                    </div>
                </div>
            </div>

            <!-- 7. ALINA -->
            <div class="flex flex-col gap-6 group">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/alina.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Alina">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">ALINA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">The Queen & The Soul
                            of Rewind</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        👑 THE HEADLINER (The Greatest Hits Collection)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Ea este motivul pentru care te întorci. Alina nu face doar cafea; ea oferă exact ceea ce ai
                        nevoie, chiar înainte să ceri. Este piesa de rezistență a echipei, iubită de clienți, adorată de
                        colegi și indispensabilă pentru tot ce înseamnă REWIND. Când Alina este la bar, totul curge
                        perfect. Are acel talent rar de a te face să te simți cel mai important om din încăpere. Este
                        standardul nostru de aur și inima care pompează viață în acest business.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Pur și simplu, cea mai bună.</span>
                    </div>
                </div>
            </div>

            <!-- 8. ALEXANDRU -->
            <div class="flex flex-col gap-6 group md:mt-24">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/alexandru.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Alexandru">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">ALEXANDRU.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Founder & The
                            Fixer</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        🎚️ THE PRODUCER (Behind the scenes)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        El este omul din umbră. Alexandru gestionează tot mecanismul invizibil care face REWIND să
                        funcționeze: de la logistică și furnizori, până la intervențiile rapide în spatele barului când
                        situația o cere. Este liantul care ține toate piesele împreună, asigurându-se mereu că scena
                        este pregătită pentru ca restul echipei să strălucească.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Misiune</span>
                        <span class="font-dj text-lg text-rewind-black">Să se asigure că REWIND rămâne locul tău
                            preferat.</span>
                    </div>
                </div>
            </div>

            <!-- 9. ANA -->
            <div class="flex flex-col gap-6 group">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="https://app.rewindcafe.ro/images/ana.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Ana">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">ANA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Barista & New Entry (The Sister Duo)</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        🌟 NEW WAVE (Pure Smile. Rising Star.)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Ana face parte din cel mai proaspăt „new entry” al familiei REWIND. Alături de sora ei, Rebeca, aduce în spatele barului o energie luminoasă, zâmbete sincere de la prima oră a dimineții și dorința de a pregăti de fiecare dată cea mai bună cafea pentru tine. În ele ne punem speranța și încrederea că vor duce locațiile noastre în topul ieșean.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Zâmbet molipsitor și cafea făcută din tot sufletul.</span>
                    </div>
                </div>
            </div>

            <!-- 10. REBECA -->
            <div class="flex flex-col gap-6 group md:mt-24">
                <div class="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl">
                    <img src="https://app.rewindcafe.ro/images/rebeca.jpg"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="Rebeca">
                </div>
                <div>
                    <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <h3 class="font-dj text-4xl font-bold text-rewind-black uppercase">REBECA.</h3>
                        <span class="font-dj text-rewind-violet text-sm tracking-widest uppercase">Barista & New Entry (The Sister Duo)</span>
                    </div>
                    <div
                        class="bg-rewind-black text-white inline-block px-4 py-1 rounded-full text-xs font-dj tracking-wider mb-6">
                        ✨ SISTER ENERGY (Double the Vibe. Top Ambition.)
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-6 font-light">
                        Rebeca completează duo-ul de surori care dă un suflu nou echipei REWIND. Mereu zâmbitoare, atentă la detalii și gata în fiecare clipă să îți ofere cea mai bună cafea, Rebeca formează împreună cu sora ei Ana echipa în care ne punem toată speranța că va ridica locațiile noastre în topul ieșean.
                    </p>
                    <div class="border-l-2 border-rewind-violet pl-4 py-1">
                        <span
                            class="block text-xs font-bold text-rewind-violet uppercase tracking-widest mb-1">Superputere</span>
                        <span class="font-dj text-lg text-rewind-black">Sincronizare de surori și ambiția de a duce REWIND în topul Iașului.</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<?php get_footer(); ?>
