import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Regulamentul Oficial — Vânătoarea Cardului de Aur Rewind | Rewind Café",
    description:
        "Regulamentul oficial al campaniei Vânătoarea Cardului de Aur Rewind, ediția I (1–30 noiembrie 2026), organizată de Rewind Café în Iași.",
};

export default function RegulamentCardDeAurPage() {
    return (
        <main className="min-h-screen bg-[#232223] text-[#F0EEE9] font-sans selection:bg-[#5F4B8B] selection:text-white">
            {/* Top Bar */}
            <nav className="w-full px-6 py-6 flex justify-between items-center max-w-5xl mx-auto border-b border-white/10">
                <Link
                    href="https://rewindcafe.ro"
                    className="font-black text-2xl tracking-[0.3em] text-[#F0EEE9] hover:text-amber-400 transition-colors uppercase"
                >
                    REWIND
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="https://rewindcafe.ro"
                        className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
                    >
                        rewindcafe.ro
                    </Link>
                    <Link
                        href="/"
                        className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-[#5F4B8B] text-white hover:bg-amber-500 hover:text-black transition-colors"
                    >
                        Jukebox App
                    </Link>
                </div>
            </nav>

            {/* Hero Header */}
            <section className="relative pt-16 pb-14 px-4 overflow-hidden border-b border-white/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-[0.22em] uppercase mb-6">
                        Ediția I • 1–30 Noiembrie 2026 • Iași
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-5 leading-tight">
                        Regulamentul Oficial <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                            Vânătoarea Cardului de Aur Rewind
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
                        365 de zile de cafea gratuită în locațiile Rewind Café. Citește mai jos regulamentul complet al campaniei.
                    </p>
                </div>
            </section>

            {/* Articles Section */}
            <section className="py-12 sm:py-20 px-4 bg-[#F0EEE9] text-[#232223]">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-black/5 p-6 sm:p-12 md:p-14 space-y-10">
                    {/* Art. 1 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 1 — Organizatorul
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">1.1.</strong> Campania „Vânătoarea Cardului de Aur” (denumită în continuare „Campania”) este organizată de <strong>GOAT SRL</strong>, cu sediul în Iași, Bd. Chimiei nr. 10, bl. 10B, sc. B, et. 2, ap. 8, cod poștal 700393, CUI 49350521, înregistrată la Registrul Comerțului sub nr. J2023004179226, care operează cafenelele Rewind Café (denumită în continuare „Organizatorul”).
                            </p>
                            <p>
                                <strong className="text-[#232223]">1.2.</strong> Campania se desfășoară conform prezentului regulament (denumit în continuare „Regulamentul”), obligatoriu pentru toți participanții. Prin participare, fiecare participant confirmă că a citit și acceptă Regulamentul.
                            </p>
                        </div>
                    </article>

                    {/* Art. 2 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 2 — Durata și aria Campaniei
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">2.1.</strong> Campania se desfășoară în perioada <strong>1 noiembrie 2026, ora 10:00 – 30 noiembrie 2026, ora 22:00</strong>, sau până la predarea Cardului de Aur, dacă aceasta are loc mai devreme.
                            </p>
                            <p>
                                <strong className="text-[#232223]">2.2.</strong> Campania se desfășoară în municipiul Iași și în localitățile învecinate, în zona indicată public de Organizator, precum și în locațiile Rewind Café: <strong>Kaufland Păcurari, Family Market Miroslava și Kaufland Alexandru</strong>.
                            </p>
                            <p>
                                <strong className="text-[#232223]">2.3.</strong> Aceasta este ediția I a Campaniei. Organizatorul intenționează să o repete anual, fiecare ediție având propriul regulament, publicat la aceeași adresă.
                            </p>
                        </div>
                    </article>

                    {/* Art. 3 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 3 — Dreptul de participare
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">3.1.</strong> Poate participa orice persoană fizică cu domiciliul sau reședința în România, care a împlinit 18 ani până la data găsirii cardului.
                            </p>
                            <p>
                                <strong className="text-[#232223]">3.2.</strong> Sunt excluși de la Campanie angajații și colaboratorii Organizatorului, ai partenerilor implicați în organizarea Campaniei, persoana care păstrează cardul, precum și rudele de gradul I și soții/soțiile tuturor acestora.
                            </p>
                            <p>
                                <strong className="text-[#232223]">3.3.</strong> Participarea la vânătoare este gratuită. Harta zilnică și indiciile publicate online sunt accesibile oricui. Cuvântul-cheie al zilei, oferit în locațiile Rewind Café, este un indiciu suplimentar.
                            </p>
                        </div>
                    </article>

                    {/* Art. 4 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 4 — Premiul
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">4.1.</strong> Campania are un singur premiu: dreptul de a primi gratuit o băutură pe zi, timp de <strong>365 de zile consecutive</strong> de la data activării, în oricare dintre locațiile Rewind Café, inclusiv în locațiile deschise ulterior în această perioadă.
                            </p>
                            <p>
                                <strong className="text-[#232223]">4.2.</strong> Băuturile incluse în premiu sunt: <strong>espresso simplu, americano, macchiato sau ceai</strong>. Orice adaos se achită separat, la prețul din meniu: de exemplu, pentru un cappuccino se plătește laptele suplimentar, iar pentru un flat white sau un latte mare se plătesc shotul de espresso și laptele suplimentar.
                            </p>
                            <p>
                                <strong className="text-[#232223]">4.3.</strong> Premiul se acordă prin intermediul Cardului de Aur, un card metalic unic, proprietatea Organizatorului. Câștigătorul primește cardul în folosință pe durata celor 365 de zile, conform art. 7.
                            </p>
                            <p>
                                <strong className="text-[#232223]">4.4.</strong> Premiul și Cardul de Aur sunt nominale, personale și netransmisibile. Băutura zilnică se folosește în ziua respectivă; zilele nefolosite se încheie odată cu ziua calendaristică. Premiul se oferă exclusiv în natură, fără echivalent în bani.
                            </p>
                        </div>
                    </article>

                    {/* Art. 5 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 5 — Mecanismul Campaniei
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">5.1.</strong> În perioada Campaniei, Cardul de Aur se află într-un loc din zona Campaniei, accesibil publicului, la o persoană desemnată de Organizator (denumită în continuare „păstrătorul cardului”).
                            </p>
                            <p>
                                <strong className="text-[#232223]">5.2.</strong> Zilnic, la ora 10:00, Organizatorul publică pe paginile oficiale Rewind Café (Instagram, TikTok, Facebook) o hartă cu zona de căutare a zilei, sub forma unui cerc care se micșorează de la o zi la alta, împreună cu un indiciu.
                            </p>
                            <p>
                                <strong className="text-[#232223]">5.3.</strong> În fiecare zi a Campaniei, clienții care fac o comandă într-o locație Rewind Café și spun <strong>„Am venit după aur”</strong> primesc cuvântul-cheie al zilei, scris pe pahar sau pe bon. Cuvintele unei săptămâni formează împreună un indiciu. În anumite zile, locațiile oferă cuvinte diferite.
                            </p>
                            <p>
                                <strong className="text-[#232223]">5.4.</strong> Organizatorul poate oferi indicii suplimentare prin parteneri media, anunțate pe paginile oficiale Rewind Café.
                            </p>
                            <p>
                                <strong className="text-[#232223]">5.5.</strong> Indiciile conduc, în final, la păstrătorul cardului și la un cod de recunoaștere. Păstrătorul predă cardul primei persoane care îl găsește și îi comunică exact codul de recunoaștere, cu respectarea art. 3 și art. 6.
                            </p>
                            <p>
                                <strong className="text-[#232223]">5.6.</strong> Organizatorul păstrează confidențial locația cardului, identitatea păstrătorului și codul de recunoaștere până la dezvăluirea lor prin indicii.
                            </p>
                            <p>
                                <strong className="text-[#232223]">5.7.</strong> Dacă până pe 30 noiembrie 2026 cardul rămâne negăsit, în această zi Organizatorul anunță public, pe paginile oficiale Rewind Café, locul exact al cardului și codul de recunoaștere. Cardul revine primului participant eligibil care ajunge la păstrătorul cardului și îi comunică exact codul de recunoaștere.
                            </p>
                        </div>
                    </article>

                    {/* Art. 6 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 6 — Validarea câștigătorului
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">6.1.</strong> La predarea cardului, păstrătorul verifică actul de identitate al găsitorului, pentru confirmarea vârstei și a eligibilității, și anunță imediat Organizatorul.
                            </p>
                            <p>
                                <strong className="text-[#232223]">6.2.</strong> Găsitorul prezintă Cardul de Aur și actul de identitate într-o locație Rewind Café și semnează un proces-verbal de predare-primire, prin care își dă acordul pentru gravarea numelui pe card. Premiul se activează odată cu gravarea numelui pe Lista de Aur, iar cele 365 de zile curg de la această dată.
                            </p>
                            <p>
                                <strong className="text-[#232223]">6.3.</strong> Este valid exclusiv cardul original emis de Organizator. Organizatorul verifică autenticitatea cardului pe baza elementelor de identificare pe care le deține.
                            </p>
                            <p>
                                <strong className="text-[#232223]">6.4.</strong> Organizatorul poate refuza validarea în cazul nerespectării Regulamentului, al încercărilor de fraudă sau al obținerii cardului prin încălcarea regulilor de la art. 8.
                            </p>
                            <p>
                                <strong className="text-[#232223]">6.5.</strong> Numele câștigătorului se anunță public pe paginile oficiale Rewind Café în cel mult 3 zile de la validare, cu acordul său.
                            </p>
                        </div>
                    </article>

                    {/* Art. 7 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 7 — Folosirea premiului și Lista de Aur
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">7.1.</strong> Pe durata celor 365 de zile, câștigătorul prezintă Cardul de Aur la comandă, iar barista înregistrează băutura inclusă în premiu. Se acordă o singură băutură pe zi calendaristică.
                            </p>
                            <p>
                                <strong className="text-[#232223]">7.2.</strong> Cardul de Aur rămâne proprietatea Organizatorului. La încheierea celor 365 de zile, câștigătorul îl returnează într-o locație Rewind Café, pentru a fi folosit în ediția următoare.
                            </p>
                            <p>
                                <strong className="text-[#232223]">7.3.</strong> Pe spatele cardului se află Lista de Aur, cu numele câștigătorilor tuturor edițiilor. Numele câștigătorului se gravează permanent pe card, în dreptul ediției câștigate, conform acordului dat la art. 6.2, și se publică pe pagina Campaniei.
                            </p>
                            <p>
                                <strong className="text-[#232223]">7.4.</strong> În caz de pierdere, furt sau deteriorare a cardului în perioada de folosire, câștigătorul anunță imediat Organizatorul. Costul realizării unui card nou, identic, este suportat de câștigător. Premiul continuă pe noul card după realizarea acestuia.
                            </p>
                        </div>
                    </article>

                    {/* Art. 8 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 8 — Siguranță și conduită
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">8.1.</strong> Cardul se află într-un loc accesibil publicului. Găsirea lui necesită exclusiv atenție la indicii și un dialog cu păstrătorul cardului.
                            </p>
                            <p>
                                <strong className="text-[#232223]">8.2.</strong> Participanții respectă legea, regulile de circulație, proprietatea publică și privată, precum și regulile spațiilor pe care le vizitează. Sunt interzise săpatul, cățăratul, deteriorarea bunurilor și intrarea în spații private fără acordul proprietarului.
                            </p>
                            <p>
                                <strong className="text-[#232223]">8.3.</strong> Participanții tratează cu respect personalul Rewind Café, păstrătorul cardului și ceilalți participanți. Baristele oferă doar cuvântul-cheie al zilei și nu cunosc locația cardului.
                            </p>
                            <p>
                                <strong className="text-[#232223]">8.4.</strong> Fiecare participant poartă întreaga răspundere pentru propria siguranță și pentru faptele sale pe durata Campaniei.
                            </p>
                        </div>
                    </article>

                    {/* Art. 9 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 9 — Protecția datelor personale
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">9.1.</strong> Organizatorul prelucrează datele personale ale câștigătorului (nume, prenume, date din actul de identitate, imagine) conform Regulamentului (UE) 2016/679 (GDPR), exclusiv pentru validarea și acordarea premiului, îndeplinirea obligațiilor fiscale și, cu acord separat, pentru anunțarea publică a câștigătorului și gravarea numelui pe Lista de Aur.
                            </p>
                            <p>
                                <strong className="text-[#232223]">9.2.</strong> Datele se păstrează pe durata necesară scopurilor de mai sus și pe durata impusă de legislația fiscală. Numele gravat pe card și publicat pe Lista de Aur rămâne parte a istoricului Campaniei.
                            </p>
                            <p>
                                <strong className="text-[#232223]">9.3.</strong> Persoanele vizate au dreptul de acces, rectificare, ștergere, restricționare, opoziție și portabilitate a datelor, precum și dreptul de a depune plângere la ANSPDCP. Solicitările se trimit la{" "}
                                <a
                                    href="mailto:strategy@socratesanalytica.ro"
                                    className="text-[#5F4B8B] font-semibold underline hover:text-black transition-colors"
                                >
                                    strategy@socratesanalytica.ro
                                </a>
                                .
                            </p>
                        </div>
                    </article>

                    {/* Art. 10 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 10 — Limitarea răspunderii și forța majoră
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">10.1.</strong> Organizatorul răspunde exclusiv pentru acordarea premiului conform Regulamentului. Organizatorul este exonerat de răspundere pentru prejudiciile produse de participanți prin încălcarea legii sau a art. 8.
                            </p>
                            <p>
                                <strong className="text-[#232223]">10.2.</strong> În caz de forță majoră sau de evenimente care fac imposibilă desfășurarea Campaniei, Organizatorul poate suspenda, prelungi sau încheia Campania, anunțând public decizia pe paginile oficiale Rewind Café.
                            </p>
                        </div>
                    </article>

                    {/* Art. 11 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 11 — Litigii și modificări
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">11.1.</strong> Eventualele neînțelegeri se rezolvă pe cale amiabilă. Dacă acest lucru este imposibil, litigiile se soluționează de instanțele competente din Iași.
                            </p>
                            <p>
                                <strong className="text-[#232223]">11.2.</strong> Organizatorul poate modifica Regulamentul pe durata Campaniei, cu anunț public prealabil. Modificările intră în vigoare la data publicării lor.
                            </p>
                        </div>
                    </article>

                    {/* Art. 12 */}
                    <article className="space-y-3">
                        <h2 className="font-black text-lg sm:text-xl uppercase tracking-wider text-[#5F4B8B] border-b border-zinc-100 pb-2.5">
                            Art. 12 — Accesul la Regulament
                        </h2>
                        <div className="space-y-2.5 text-zinc-700 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong className="text-[#232223]">12.1.</strong> Regulamentul este disponibil gratuit pe{" "}
                                <a
                                    href="https://rewindcafe.ro/regulamentcarddeaur"
                                    className="text-[#5F4B8B] font-semibold underline hover:text-black transition-colors"
                                >
                                    rewindcafe.ro/regulamentcarddeaur
                                </a>
                                , prin codul QR de pe Cardul de Aur și, la cerere, în orice locație Rewind Café.
                            </p>
                            <p>
                                <strong className="text-[#232223]">12.2.</strong> Întrebările despre Campanie se trimit la{" "}
                                <a
                                    href="mailto:strategy@socratesanalytica.ro"
                                    className="text-[#5F4B8B] font-semibold underline hover:text-black transition-colors"
                                >
                                    strategy@socratesanalytica.ro
                                </a>{" "}
                                sau prin mesaj pe paginile oficiale Rewind Café.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 text-center border-t border-white/10 text-zinc-500 text-xs tracking-[0.25em] uppercase font-bold">
                © {new Date().getFullYear()} REWIND CAFÉ • IAȘI
            </footer>
        </main>
    );
}
