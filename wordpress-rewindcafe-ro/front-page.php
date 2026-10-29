<?php get_header(); ?>

<!-- HERO SECTION -->
<section class="relative min-h-screen flex items-center justify-center text-center px-4 pt-20 overflow-hidden">
    <div
        class="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-rewind-violet/10 rounded-full blur-[120px] -z-10">
    </div>
    <div class="max-w-5xl mx-auto z-10">
        <p class="font-dj font-bold tracking-[0.4em] text-sm text-rewind-violet uppercase mb-8">TASTE YOUR VIBE</p>
        <h1 class="font-dj font-black text-8xl md:text-[12rem] mb-10 leading-[0.8] uppercase">
            <span class="text-rewind-violet block mb-4 tracking-tighter filter drop-shadow-sm">REWIND</span>
            <span class="text-rewind-black block text-xl md:text-3xl tracking-[0.3em] font-bold">COFFEE • MUSIC •
                VIBE</span>
        </h1>
        <p class="text-lg text-gray-600 mb-12 max-w-xl mx-auto font-body font-normal leading-relaxed italic">
            Transformăm "amorțeala" în energie pură. Existăm ca să îți schimbăm frecvența.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#meniu"
                class="w-64 font-dj font-bold tracking-wider text-sm px-8 py-5 bg-rewind-violet text-white border-2 border-rewind-violet rounded-full shadow-xl shadow-purple-200 transition transform duration-300 hover:-translate-y-2 hover:bg-white hover:text-rewind-violet text-center">
                Vezi Meniul
            </a>
            <a href="#locatie"
                class="w-64 font-dj font-bold tracking-wider text-sm px-8 py-5 bg-white text-rewind-black border-2 border-rewind-black rounded-full shadow-xl transition transform duration-300 hover:-translate-y-2 hover:bg-rewind-violet hover:text-white hover:border-rewind-violet text-center">
                Găsește Locația
            </a>
        </div>
    </div>
</section>

<!-- GUST SUNET DESTIN -->
<section class="py-24 bg-white border-y border-gray-100">
    <div class="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center gap-16">
        <div class="w-full md:w-1/2 relative group">
            <div class="absolute inset-0 bg-rewind-violet rotate-3 rounded-3xl opacity-10"></div>
            <img src="<?php echo get_template_directory_uri(); ?>/images/pahari.jpg"
                class="relative z-10 rounded-3xl shadow-2xl w-full aspect-square md:aspect-auto md:h-[800px] object-cover"
                alt="Rewind Coffee">
        </div>

        <div class="w-full md:w-1/2">
            <h3 class="font-dj font-bold text-4xl mb-8 uppercase text-rewind-black">Gust. Sunet. Destin.</h3>
            <p class="text-gray-600 mb-10 text-lg font-bold leading-relaxed font-dj">
                Gustul care te trezește. Sunetul care te poartă. Destinul care te surprinde.
            </p>
            <div class="bg-rewind-cream p-10 rounded-[40px] border border-gray-100 shadow-inner">
                <p class="font-dj text-xs font-bold text-rewind-violet uppercase tracking-[0.3em] mb-8">Alege
                    Platforma Ta</p>
                <div class="flex flex-col gap-6 font-dj font-bold">
                    <a href="https://open.spotify.com/playlist/4cWhl4eD16LoKuJ81QVHDR?si=7aa457d25b7c4b02"
                        target="_blank"
                        class="flex items-center gap-5 text-gray-800 hover:text-rewind-violet transition group">
                        <span class="w-4 h-4 bg-[#1DB954] rounded-full group-hover:scale-125 transition"></span>
                        <span class="text-lg uppercase tracking-wider">Spotify Playlist</span>
                    </a>
                    <a href="https://www.youtube.com/playlist?list=PLvHUiOUzez7kc7h1BWWnSEwbde8TqKwaA" target="_blank"
                        class="flex items-center gap-5 text-gray-800 hover:text-rewind-violet transition group">
                        <span class="w-4 h-4 bg-[#FF0000] rounded-full group-hover:scale-125 transition"></span>
                        <span class="text-lg uppercase tracking-wider">YouTube Music</span>
                    </a>
                    <a href="#" target="_blank"
                        class="flex items-center gap-5 text-gray-800 hover:text-rewind-violet transition group">
                        <span class="w-4 h-4 bg-[#717171] rounded-full group-hover:scale-125 transition"></span>
                        <span class="text-lg uppercase tracking-wider">Apple Music</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- MENIU SECTION -->
<section id="meniu" class="py-32 bg-rewind-cream relative">
    <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-12">
            <h2 class="font-dj font-bold text-5xl tracking-tighter mb-4 text-rewind-black text-center">MENIU</h2>
            <div class="w-16 h-1 bg-rewind-violet mx-auto mb-12"></div>

            <!-- 4 Location Buttons -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
                <button onclick="toggleMenu('pacurari')" id="btn-pacurari"
                    class="w-full font-dj font-bold tracking-wider text-sm px-6 py-4 rounded-full border-2 transition-all duration-300 bg-rewind-violet text-white border-rewind-violet shadow-lg transform -translate-y-1">
                    Kaufland Păcurari (To Go)
                </button>
                <button onclick="toggleMenu('alexandru')" id="btn-alexandru"
                    class="w-full font-dj font-bold tracking-wider text-sm px-6 py-4 rounded-full border-2 transition-all duration-300 bg-white text-rewind-black border-rewind-black hover:bg-rewind-violet hover:text-white hover:border-rewind-violet">
                    Kaufland Alexandru (To Go)
                </button>
                <button onclick="toggleMenu('tudor')" id="btn-tudor"
                    class="w-full font-dj font-bold tracking-wider text-sm px-6 py-4 rounded-full border-2 transition-all duration-300 bg-white text-rewind-black border-rewind-black hover:bg-rewind-violet hover:text-white hover:border-rewind-violet">
                    Kaufland Tudor (În curând)
                </button>
                <button onclick="toggleMenu('miroslava')" id="btn-miroslava"
                    class="w-full font-dj font-bold tracking-wider text-sm px-6 py-4 rounded-full border-2 transition-all duration-300 bg-white text-rewind-black border-rewind-black hover:bg-rewind-violet hover:text-white hover:border-rewind-violet">
                    Miroslava (Cafenea)
                </button>
            </div>
        </div>

        <!-- ====================== 1. KAUFLAND PĂCURARI MENU ====================== -->
        <div id="menu-pacurari"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-500">

            <!-- HOT COFFEE -->
            <div
                class="bg-white p-6 rounded-3xl shadow-md border border-gray-100 col-span-1 md:col-span-2 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-gray-100 pb-2">HOT COFFEE — PĂCURARI</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso / Espresso Dublu</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 / 10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Americano / Long Black</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 / 10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">9 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cappuccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">11 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cappucino Vienez</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Latte Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cortado</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Flat White</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Caffe Latte / Large Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">14 / 16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Matcha Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Mint Hot Chocolate</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Ciocolată caldă</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">10 / 12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Ceai Infuzie</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Babyccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 LEI</span>
                    </div>
                </div>
            </div>

            <!-- COLD COFFEE -->
            <div
                class="bg-rewind-black text-white p-6 rounded-3xl shadow-xl border border-white/10 col-span-1 md:col-span-2 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-white/10 pb-2">COLD COFFEE — PĂCURARI</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Espresso</span>
                        <span class="font-dj font-bold text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Latte</span>
                        <span class="font-dj font-bold text-sm">16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Vanilla / Salt Caramel Iced Latte</span>
                        <span class="font-dj font-bold text-sm">19 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Espresso Tonic</span>
                        <span class="font-dj font-bold text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Orange Espresso</span>
                        <span class="font-dj font-bold text-sm">17 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Frozen Cappuccino</span>
                        <span class="font-dj font-bold text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Ness Frappe</span>
                        <span class="font-dj font-bold text-sm">16 / 18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Tea Fructe</span>
                        <span class="font-dj font-bold text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Fresh</span>
                        <span class="font-dj font-bold text-sm">15 / 20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Limonadă</span>
                        <span class="font-dj font-bold text-sm">14 / 16 LEI</span>
                    </div>
                </div>
                <!-- EXTRA -->
                <div class="mt-8 border-t border-white/10 pt-4">
                    <h3 class="font-brand text-rewind-violet text-lg mb-4">EXTRA</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between"><span>Arome</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Frișcă</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Extra espresso</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Lapte vegetal</span> <span>4 lei</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ====================== 2. KAUFLAND ALEXANDRU MENU ====================== -->
        <div id="menu-alexandru"
            class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-500">

            <!-- HOT COFFEE -->
            <div
                class="bg-white p-6 rounded-3xl shadow-md border border-gray-100 col-span-1 md:col-span-2 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-gray-100 pb-2">HOT COFFEE — ALEXANDRU</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso / Espresso Dublu</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 / 10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Americano / Long Black</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 / 10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">9 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cappuccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">11 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cappucino Vienez</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Latte Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cortado</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Flat White</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Caffe Latte / Large Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">14 / 16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Matcha Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Mint Hot Chocolate</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Ciocolată caldă</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">10 / 12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Ceai Infuzie</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Babyccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 LEI</span>
                    </div>
                </div>
            </div>

            <!-- COLD COFFEE -->
            <div
                class="bg-rewind-black text-white p-6 rounded-3xl shadow-xl border border-white/10 col-span-1 md:col-span-2 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-white/10 pb-2">COLD COFFEE — ALEXANDRU</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Espresso</span>
                        <span class="font-dj font-bold text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Latte</span>
                        <span class="font-dj font-bold text-sm">16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Vanilla / Salt Caramel Iced Latte</span>
                        <span class="font-dj font-bold text-sm">19 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Espresso Tonic</span>
                        <span class="font-dj font-bold text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Orange Espresso</span>
                        <span class="font-dj font-bold text-sm">17 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Frozen Cappuccino</span>
                        <span class="font-dj font-bold text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Ness Frappe</span>
                        <span class="font-dj font-bold text-sm">16 / 18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Tea Fructe</span>
                        <span class="font-dj font-bold text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Fresh</span>
                        <span class="font-dj font-bold text-sm">15 / 20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Limonadă</span>
                        <span class="font-dj font-bold text-sm">14 / 16 LEI</span>
                    </div>
                </div>
                <!-- EXTRA -->
                <div class="mt-8 border-t border-white/10 pt-4">
                    <h3 class="font-brand text-rewind-violet text-lg mb-4">EXTRA</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between"><span>Arome</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Frișcă</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Extra espresso</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Lapte vegetal</span> <span>4 lei</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ====================== 3. KAUFLAND TUDOR MENU ====================== -->
        <div id="menu-tudor"
            class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-500">

            <!-- HOT COFFEE -->
            <div
                class="bg-white p-6 rounded-3xl shadow-md border border-gray-100 col-span-1 md:col-span-2 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-gray-100 pb-2">HOT COFFEE — TUDOR (ÎN CURÂND)</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso / Espresso Dublu</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 / 10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Americano / Long Black</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 / 10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">9 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cappuccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">11 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cappucino Vienez</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Latte Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Cortado</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Flat White</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Caffe Latte / Large Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">14 / 16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Matcha Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Mint Hot Chocolate</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Ciocolată caldă</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">10 / 12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Ceai Infuzie</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">10 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Babyccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">8 LEI</span>
                    </div>
                </div>
            </div>

            <!-- COLD COFFEE -->
            <div
                class="bg-rewind-black text-white p-6 rounded-3xl shadow-xl border border-white/10 col-span-1 md:col-span-2 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-white/10 pb-2">COLD COFFEE — TUDOR (ÎN CURÂND)</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Espresso</span>
                        <span class="font-dj font-bold text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Latte</span>
                        <span class="font-dj font-bold text-sm">16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Vanilla / Salt Caramel Iced Latte</span>
                        <span class="font-dj font-bold text-sm">19 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Espresso Tonic</span>
                        <span class="font-dj font-bold text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Orange Espresso</span>
                        <span class="font-dj font-bold text-sm">17 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Frozen Cappuccino</span>
                        <span class="font-dj font-bold text-sm">18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Ness Frappe</span>
                        <span class="font-dj font-bold text-sm">16 / 18 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Iced Tea Fructe</span>
                        <span class="font-dj font-bold text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Fresh</span>
                        <span class="font-dj font-bold text-sm">15 / 20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Limonadă</span>
                        <span class="font-dj font-bold text-sm">14 / 16 LEI</span>
                    </div>
                </div>
                <!-- EXTRA -->
                <div class="mt-8 border-t border-white/10 pt-4">
                    <h3 class="font-brand text-rewind-violet text-lg mb-4">EXTRA</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between"><span>Arome</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Frișcă</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Extra espresso</span> <span>3 lei</span></div>
                        <div class="flex justify-between"><span>Lapte vegetal</span> <span>4 lei</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ====================== 4. MIROSLAVA MENU ====================== -->
        <div id="menu-miroslava"
            class="hidden grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch transition-all duration-500">

            <!-- HOT COFFEE -->
            <div class="bg-white p-6 rounded-3xl shadow-md border border-gray-100 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-gray-100 pb-2">HOT COFFEE — MIROSLAVA</h3>
                <div class="space-y-4 flex-grow">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Espresso / Espresso Dublu</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">9 / 12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Americano / Long Black</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">9 / 12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Latte Macchiato</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">15 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Caramel Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">19 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Flat White</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Caffe Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">17 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Large Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">20 LEI</span>
                    </div>
                </div>
            </div>

            <!-- SIGNATURE & SPECIALITY -->
            <div
                class="bg-rewind-black text-white p-6 rounded-3xl shadow-xl border border-white/10 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-white/10 pb-2">SIGNATURE &
                    SPECIALITY</h3>
                <div class="space-y-4 flex-grow">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Matcha Tonic</span>
                        <span class="font-dj font-bold text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Ciocolată Caldă</span>
                        <span class="font-dj font-bold text-sm">15 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Chai Tonic (Raspberry)</span>
                        <span class="font-dj font-bold text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Orange Espresso</span>
                        <span class="font-dj font-bold text-sm">22 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Matcha Orange</span>
                        <span class="font-dj font-bold text-sm">22 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Matcha Latte</span>
                        <span class="font-dj font-bold text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Ceai Infuzie</span>
                        <span class="font-dj font-bold text-sm">14 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Babyccino</span>
                        <span class="font-dj font-bold text-sm">9 LEI</span>
                    </div>
                </div>
            </div>

            <!-- REFRESHING & COLD -->
            <div class="bg-white p-6 rounded-3xl shadow-md border border-gray-100 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-gray-100 pb-2">REFRESHING &
                    COLD</h3>
                <div class="space-y-4 flex-grow">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Iced Espresso</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Iced Latte</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Frozen Cappuccino</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Fresh Portocale</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Frozen (Fruit)</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">20 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Limonadă</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">16 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Răcoritoare</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">12 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Bona</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">13 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-rewind-black text-sm">Apă (500ml)</span>
                        <span class="font-dj font-bold text-rewind-black text-sm">9 LEI</span>
                    </div>
                </div>
            </div>

            <!-- AFTER HOURS -->
            <div
                class="bg-rewind-black text-white p-6 rounded-3xl shadow-xl border border-white/10 h-full flex flex-col">
                <h3 class="font-brand text-rewind-violet text-xl mb-6 border-b border-white/10 pb-2">AFTER HOURS
                    (ALCOHOL)</h3>
                <div class="space-y-4 flex-grow">
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Bacardi Breezer</span>
                        <span class="font-dj font-bold text-sm">22 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Espresso Martini</span>
                        <span class="font-dj font-bold text-sm">23 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Prosecco Mionetto</span>
                        <span class="font-dj font-bold text-sm">17 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Bere Capra Noastră</span>
                        <span class="font-dj font-bold text-sm">23 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Spirits</span>
                        <span class="font-dj font-bold text-sm">27 LEI</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-dj font-bold text-sm">Cocktails</span>
                        <span class="font-dj font-bold text-sm">36 LEI</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- LOCATION SECTION (ALL 4 LOCATIONS) -->
<section id="locatie" class="bg-rewind-black text-white py-32 px-4 font-bold font-dj">
    <div class="container mx-auto max-w-6xl">
        <h2 class="font-bold text-4xl md:text-6xl mb-20 uppercase tracking-tight text-center">
            <span class="text-rewind-cream">Vino în comunitatea</span>
            <span class="text-rewind-violet block md:inline md:ml-4 tracking-[0.4em]">REWIND</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-16 text-left">
            <!-- 1. REWIND PĂCURARI -->
            <div class="flex flex-col h-full space-y-8">
                <div class="bg-white/5 p-10 rounded-3xl border border-white/10 flex-grow">
                    <h3 class="font-dj text-rewind-violet text-2xl uppercase mb-4">REWIND PĂCURARI</h3>
                    <p class="text-gray-400 font-dj text-[10px] tracking-widest mb-6 uppercase italic">(Incinta
                        Kaufland Păcurari)</p>
                    <p class="text-lg mb-6 leading-tight">Șoseaua Păcurari 86m, 700547 Iași</p>
                    <div class="border-t border-white/10 pt-6">
                        <span
                            class="block text-rewind-violet text-xs font-dj mb-2 uppercase tracking-widest">Program</span>
                        <span class="text-xl block">L-S: 07:00 - 18:30</span>
                        <span class="text-xl block">DUMINICĂ: 08:00 - 19:00</span>
                    </div>
                </div>
                <div
                    class="w-full h-80 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 border border-white/10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d169.50961528818024!2d27.537118730177824!3d47.1744243732085!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cafb255fc0f94d%3A0x7177760909cd13b!2sRewind%20Cafe!5e0!3m2!1sen!2sro!4v1768842279179!5m2!1sen!2sro"
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <!-- 2. REWIND MIROSLAVA -->
            <div class="flex flex-col h-full space-y-8">
                <div class="bg-white/5 p-10 rounded-3xl border border-white/10 flex-grow">
                    <h3 class="font-dj text-rewind-violet text-2xl uppercase mb-4">REWIND MIROSLAVA</h3>
                    <p class="text-gray-400 font-dj text-[10px] tracking-widest mb-6 uppercase italic">(Incinta
                        Family Market)</p>
                    <p class="text-lg mb-6 leading-tight">Strada Constantin Langa 91B, Miroslava</p>
                    <div class="border-t border-white/10 pt-6">
                        <span
                            class="block text-rewind-violet text-xs font-dj mb-2 uppercase tracking-widest">Program</span>
                        <span class="text-xl block">L-V: 07:00 - 21:00</span>
                        <span class="text-xl block">S-D: 08:00 - 21:00</span>
                    </div>
                </div>
                <div
                    class="w-full h-80 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 border border-white/10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d678.4027674546635!2d27.5286705!3d47.1458853!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cafb58ac476eaf%3A0xe7cbccf9395d85d7!2sRewind%20Cafe!5e0!3m2!1sen!2sro!4v1768323906611!5m2!1sen!2sro"
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>

            <!-- 3. REWIND ALEXANDRU -->
            <div class="flex flex-col h-full space-y-8">
                <div class="bg-white/5 p-10 rounded-3xl border border-white/10 flex-grow">
                    <h3 class="font-dj text-rewind-violet text-2xl uppercase mb-4">REWIND ALEXANDRU</h3>
                    <p class="text-gray-400 font-dj text-[10px] tracking-widest mb-6 uppercase italic">(Incinta
                        Kaufland Alexandru)</p>
                    <p class="text-lg mb-6 leading-tight">Strada Tabacului 2A, 700440 Iași</p>
                    <div class="border-t border-white/10 pt-6">
                        <span
                            class="block text-rewind-violet text-xs font-dj mb-2 uppercase tracking-widest">Program</span>
                        <span class="text-xl block">L-S: 07:00 - 18:30</span>
                        <span class="text-xl block">DUMINICĂ: 08:00 - 19:00</span>
                    </div>
                </div>
                <div
                    class="w-full h-80 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 border border-white/10">
                    <iframe
                        src="https://www.google.com/maps?q=Kaufland+Alexandru+cel+Bun+Strada+Tabacului+2A+Iasi&output=embed"
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <!-- 4. REWIND TUDOR -->
            <div class="flex flex-col h-full space-y-8">
                <div class="bg-white/5 p-10 rounded-3xl border border-white/10 flex-grow">
                    <div class="flex items-center justify-between gap-2 mb-4">
                        <h3 class="font-dj text-rewind-violet text-2xl uppercase">REWIND TUDOR</h3>
                        <span class="px-3 py-1 rounded-full bg-rewind-violet/20 border border-rewind-violet/40 text-rewind-violet text-[10px] tracking-widest uppercase">În curând</span>
                    </div>
                    <p class="text-gray-400 font-dj text-[10px] tracking-widest mb-6 uppercase italic">(Incinta
                        Kaufland Tudor)</p>
                    <p class="text-lg mb-6 leading-tight">Bulevardul Chimiei 2, 700291 Iași</p>
                    <div class="border-t border-white/10 pt-6">
                        <span
                            class="block text-rewind-violet text-xs font-dj mb-2 uppercase tracking-widest">Program (În curând)</span>
                        <span class="text-xl block">L-S: 07:00 - 18:30</span>
                        <span class="text-xl block">DUMINICĂ: 08:00 - 19:00</span>
                    </div>
                </div>
                <div
                    class="w-full h-80 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 border border-white/10">
                    <iframe
                        src="https://www.google.com/maps?q=Kaufland+Tudor+Vladimirescu+Bulevardul+Chimiei+2+Iasi&output=embed"
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    function toggleMenu(location) {
        const locations = ['pacurari', 'alexandru', 'tudor', 'miroslava'];
        const activeClass = "w-full font-dj font-bold tracking-wider text-sm px-6 py-4 rounded-full border-2 transition-all duration-300 bg-rewind-violet text-white border-rewind-violet shadow-lg transform -translate-y-1";
        const inactiveClass = "w-full font-dj font-bold tracking-wider text-sm px-6 py-4 rounded-full border-2 transition-all duration-300 bg-white text-rewind-black border-rewind-black hover:bg-rewind-violet hover:text-white hover:border-rewind-violet";

        locations.forEach(loc => {
            const btn = document.getElementById('btn-' + loc);
            const menu = document.getElementById('menu-' + loc);
            if (btn && menu) {
                if (loc === location) {
                    menu.classList.remove('hidden');
                    btn.className = activeClass;
                } else {
                    menu.classList.add('hidden');
                    btn.className = inactiveClass;
                }
            }
        });
    }
</script>

<?php get_footer(); ?>
