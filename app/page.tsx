import Image from "next/image";
import Link from "next/link";
import Header, { LotusMark } from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import data from "@/data/competitions.json";

/* ————————————————— decorative bits ————————————————— */

function Ornament({ light = false }: { light?: boolean }) {
  const c = light ? "#f0d28a" : "#b9821c";
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-16 sm:w-28" style={{ background: `linear-gradient(to left, ${c}, transparent)` }} />
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 3c1.8 3 1.8 6.5 0 9.5C10.2 9.5 10.2 6 12 3z" fill={c} />
        <path d="M5.5 7c3 1 5.2 3.5 6 6.5-3.2-.3-5.8-3-6-6.5z" fill={c} opacity=".7" />
        <path d="M18.5 7c-.2 3.5-2.8 6.2-6 6.5.8-3 3-5.5 6-6.5z" fill={c} opacity=".7" />
        <circle cx="12" cy="17.5" r="1.6" fill={c} />
      </svg>
      <span className="h-px w-16 sm:w-28" style={{ background: `linear-gradient(to right, ${c}, transparent)` }} />
    </div>
  );
}

function Petal({ className, color, speed }: { className: string; color: string; speed: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} data-scroll data-scroll-speed={speed} aria-hidden="true">
      <svg viewBox="0 0 60 60" className="animate-floaty-slow h-full w-full" style={{ filter: "drop-shadow(0 6px 12px rgba(16,31,92,.15))" }}>
        <path d="M30 4c10 8 14 20 10 32-4 12-14 18-10 20-10-8-14-20-10-32C24 12 34 6 30 4z" fill={color} stroke="#d6a02f" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ————————————————— competition icons ————————————————— */

const ICONS: Record<string, React.ReactNode> = {
  comp_1: ( // recitation — sound waves
    <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm6-3a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2z" />
  ),
  comp_2: ( // quiz — question
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 16h-2v-2h2v2zm1.8-6.9c-.6.6-1.3 1.1-1.6 1.9-.1.3-.2.6-.2 1h-2c0-.7.1-1.3.4-1.9.4-.8 1.1-1.3 1.7-1.9.5-.5.8-1 .8-1.7A2 2 0 0 0 12 6.6 2.1 2.1 0 0 0 9.9 8.7h-2A4.1 4.1 0 0 1 12 4.6a4 4 0 0 1 4 3.9c0 1.1-.5 1.9-1.2 2.6z" />
  ),
  comp_3: ( // essay — quill
    <path d="M20.7 3.3c-3.7.3-8.6 1.5-11.5 4.4-2 2-3 4.6-3.2 7.2L3 18l1.4 1.4 3.1-3.1c2.6-.2 5.2-1.2 7.2-3.2 2.9-2.9 4.1-7.8 4.4-11.5l1.6-1.6-1.4-1.4-1.6 1.7zM13.3 11.7c-1.3 1.3-3 2.1-4.8 2.4 1.7-3.5 4.8-6.2 8.4-7.7-.6 1.9-1.8 3.6-3.6 5.3z" />
  ),
  comp_4: ( // poster — palette
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 1.7 1.7 0 0 0 1.2-2.8 1.7 1.7 0 0 1 1.2-2.7H16a6 6 0 0 0 6-6c0-4.6-4.5-8.5-10-8.5zM6.5 12A1.5 1.5 0 1 1 8 10.5 1.5 1.5 0 0 1 6.5 12zm3-4A1.5 1.5 0 1 1 11 6.5 1.5 1.5 0 0 1 9.5 8zm5 0A1.5 1.5 0 1 1 16 6.5 1.5 1.5 0 0 1 14.5 8zm3 4A1.5 1.5 0 1 1 19 10.5 1.5 1.5 0 0 1 17.5 12z" />
  ),
  comp_5: ( // elocution — mic
    <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4zm6.5-4a6.5 6.5 0 0 1-13 0H4a8 8 0 0 0 7 7.94V21H8v2h8v-2h-3v-2.06A8 8 0 0 0 20 11h-1.5z" />
  ),
};

const ACCENTS = ["#2456b8", "#2cbfb4", "#d6a02f", "#1f9e52", "#2e6ad6"];

/* ————————————————— page ————————————————— */

export default function Home() {
  const competitions = data.competitions;

  return (
    <>
      <Header />
      <SmoothScroll>
        <main>
          {/* ————— HERO ————— */}
          <section
            data-scroll-section
            className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100 pt-32 pb-20 sm:pt-40"
          >
            {/* floating petals */}
            <Petal className="left-[6%] top-40 h-12 w-12 opacity-70" color="#2456b8" speed="2" />
            <Petal className="right-[8%] top-56 h-10 w-10 opacity-60" color="#2cbfb4" speed="3" />
            <Petal className="left-[14%] bottom-24 h-9 w-9 opacity-50" color="#1f9e52" speed="1.5" />
            <Petal className="right-[16%] bottom-40 h-12 w-12 opacity-60" color="#e3b85c" speed="2.5" />

            <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
              <div data-scroll data-scroll-speed="1">
                <Image
                  src="/assets/logo-50-hindi.png"
                  alt="Learn Geeta — 50 Swarnim Varg"
                  width={520}
                  height={470}
                  priority
                  className="mx-auto w-72 sm:w-96 md:w-[440px]"
                />
              </div>

              <p className="mt-2 text-sm font-medium tracking-[0.35em] text-gold-600 uppercase">
                The 50th Batch · A Golden Milestone
              </p>

              <h1 className="font-display mt-4 text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl md:text-6xl">
                Celebrate the <span className="text-goldgrad font-bold">Swarnim Varg</span>
                <br className="hidden sm:block" /> of Learn Geeta
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-900/70 sm:text-lg">
                Fifty batches of wisdom, devotion and transformation. As our Golden Batch
                begins, we invite you to a grand celebration of the Bhagavad Geeta — through
                five divine competitions open to every age.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="bg-goldgrad rounded-full px-10 py-4 text-base font-semibold text-navy-900 shadow-[0_18px_45px_-14px_rgba(185,130,28,0.9)] transition-transform hover:scale-[1.05]"
                >
                  Join Now — It&apos;s Free
                </Link>
                <a
                  href="#competitions"
                  className="rounded-full border-2 border-navy-800/25 px-10 py-[14px] text-base font-semibold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                >
                  Explore Competitions
                </a>
              </div>

              {/* stats */}
              <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-gold-500/25">
                {[
                  ["50th", "Golden Batch"],
                  ["5", "Competitions"],
                  ["All Ages", "Welcome"],
                ].map(([big, small]) => (
                  <div key={small} className="px-2 py-2">
                    <p className="font-display text-3xl font-bold text-navy-800 sm:text-4xl">{big}</p>
                    <p className="mt-1 text-[11px] font-medium tracking-[0.18em] text-gold-600 uppercase sm:text-xs">
                      {small}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ————— gold marquee ————— */}
          <section data-scroll-section className="bg-goldgrad overflow-hidden py-3">
            <div className="animate-marquee flex w-max whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, half) => (
                <div key={half} className="flex items-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="mx-6 flex items-center gap-6 text-sm font-semibold tracking-[0.2em] text-navy-900">
                      ॥ स्वर्णिम वर्ग ॥ <span className="text-navy-900/60">✦</span> GOLDEN BATCH 50
                      <span className="text-navy-900/60">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ————— ABOUT ————— */}
          <section id="about" data-scroll-section className="bg-cream-50 py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
              <div className="relative" data-scroll data-scroll-speed="1">
                <div className="gold-frame overflow-hidden rounded-[2rem]">
                  <Image
                    src="/assets/krishna-sunrise.jpeg"
                    alt="Shri Krishna in meditation at sunrise"
                    width={880}
                    height={1300}
                    className="h-[420px] w-full object-cover object-top sm:h-[520px]"
                  />
                </div>
                <div
                  className="absolute -bottom-8 -right-4 rounded-2xl bg-navy-900 px-6 py-5 shadow-2xl sm:-right-8"
                  data-scroll
                  data-scroll-speed="2"
                >
                  <p className="font-display text-4xl font-bold text-gold-300">50</p>
                  <p className="text-xs font-medium tracking-[0.2em] text-cream-100/80 uppercase">
                    Batches of Geeta
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase">About the Celebration</p>
                <h2 className="font-display mt-3 text-3xl font-semibold leading-snug text-navy-900 sm:text-5xl">
                  A Golden Opportunity <br /> Awaits You
                </h2>
                <div className="mt-4 w-fit">
                  <Ornament />
                </div>
                <p className="mt-6 leading-relaxed text-navy-900/70">
                  Learn Geeta&apos;s 50th special batch is a journey of{" "}
                  <em className="font-medium not-italic text-navy-800">gyan</em> (knowledge),{" "}
                  <em className="font-medium not-italic text-navy-800">atma-chintan</em> (self-reflection) and{" "}
                  <em className="font-medium not-italic text-navy-800">jeevan-parivartan</em> (life
                  transformation). To honour this milestone, the Swarnim Varg brings a festival of
                  competitions celebrating the timeless wisdom of the Bhagavad Geeta.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Five competitions across recitation, art, writing, quiz and oratory",
                    "Categories for children, youth and adults — everyone participates",
                    "Certificates and recognition for all participants",
                    "Guided by the Geeta Pariwar tradition of seva and swadhyay",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="bg-goldgrad mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <svg viewBox="0 0 12 12" className="h-3 w-3 fill-navy-900">
                          <path d="M4.6 9.6 1.4 6.4l1.2-1.2 2 2 4.8-4.8 1.2 1.2z" />
                        </svg>
                      </span>
                      <span className="text-[15px] text-navy-900/80">{line}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="bg-goldgrad mt-10 inline-block rounded-full px-9 py-3.5 text-sm font-semibold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform hover:scale-[1.04]"
                >
                  Join the Golden Batch
                </Link>
              </div>
            </div>
          </section>

          {/* ————— COMPETITIONS ————— */}
          <section
            id="competitions"
            data-scroll-section
            className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 py-24 sm:py-32"
          >
            {/* feathered mandala */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
              <Image
                src="/assets/mandala-navy.jpeg"
                alt=""
                width={900}
                height={1090}
                className="mask-feather w-[1000px] max-w-none"
                data-scroll
                data-scroll-speed="-2"
              />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
              <div className="text-center">
                <p className="text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">Swarnim Varg 2026</p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-cream-50 sm:text-5xl">
                  Five Divine <span className="text-goldgrad font-bold">Competitions</span>
                </h2>
                <div className="mt-5">
                  <Ornament light />
                </div>
                <p className="mx-auto mt-5 max-w-2xl text-cream-100/70">
                  Choose your path of expression — recite, paint, write, answer or speak.
                  Every competition is an offering to the wisdom of the Geeta.
                </p>
              </div>

              <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {competitions.map((comp, i) => (
                  <article
                    key={comp.id}
                    className="group relative flex flex-col rounded-3xl border border-gold-500/25 bg-white/[0.06] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold-400/60 hover:bg-white/[0.09] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
                  >
                    <span
                      className="absolute inset-x-8 top-0 h-[3px] rounded-b"
                      style={{ background: `linear-gradient(to right, ${ACCENTS[i % ACCENTS.length]}, transparent)` }}
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: `${ACCENTS[i % ACCENTS.length]}26`, color: ACCENTS[i % ACCENTS.length] === "#d6a02f" ? "#f0d28a" : "#cfe0ff" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill={ACCENTS[i % ACCENTS.length] === "#d6a02f" ? "#f0d28a" : ACCENTS[i % ACCENTS.length] === "#2456b8" ? "#8fb4f5" : ACCENTS[i % ACCENTS.length]}>
                          {ICONS[comp.id]}
                        </svg>
                      </span>
                      <span className="font-display text-5xl font-bold text-cream-50/10 transition-colors group-hover:text-gold-300/25">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-display mt-6 text-2xl font-semibold text-cream-50">{comp.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{comp.description}</p>

                    <span className="mt-5 w-fit rounded-full border border-teal-500/40 bg-teal-500/10 px-3.5 py-1.5 text-xs font-medium text-teal-500">
                      {comp.eligibility}
                    </span>

                    <ul className="mt-5 space-y-2.5 border-t border-cream-50/10 pt-5">
                      {comp.rules.map((rule) => (
                        <li key={rule} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-cream-100/60">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                          {rule}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/login"
                      className="mt-auto pt-7 text-sm font-semibold text-gold-300 transition-colors group-hover:text-gold-200"
                    >
                      Register for this competition →
                    </Link>
                  </article>
                ))}

                {/* CTA card completing the grid */}
                <article className="bg-goldgrad relative flex flex-col items-center justify-center rounded-3xl p-10 text-center shadow-[0_30px_60px_-25px_rgba(185,130,28,0.7)]">
                  <LotusMark className="h-14 w-14 opacity-90" />
                  <h3 className="font-display mt-5 text-3xl font-bold text-navy-900">
                    Can&apos;t decide? <br /> Join them all.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/75">
                    One account opens the door to every Swarnim Varg competition.
                  </p>
                  <Link
                    href="/login"
                    className="mt-7 rounded-full bg-navy-900 px-9 py-3.5 text-sm font-semibold text-gold-200 shadow-xl transition-transform hover:scale-[1.05]"
                  >
                    Join Now
                  </Link>
                </article>
              </div>
            </div>
          </section>

          {/* ————— WHY JOIN ————— */}
          <section id="why" data-scroll-section className="bg-cream-100 py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <div>
                  <p className="text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase">Why Participate</p>
                  <h2 className="font-display mt-3 text-3xl font-semibold leading-snug text-navy-900 sm:text-5xl">
                    More than a contest — <br />
                    <span className="text-goldgrad font-bold">a sadhana</span>
                  </h2>
                  <p className="mt-6 max-w-xl leading-relaxed text-navy-900/70">
                    Every shloka memorised, every essay written and every colour placed on
                    canvas draws you closer to the eternal song of Shri Krishna. Walk this
                    journey with thousands of fellow seekers of the Geeta Pariwar.
                  </p>

                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {[
                      ["🏆", "Recognition & Prizes", "Winners honoured at the grand Swarnim Varg ceremony."],
                      ["📜", "Certificates for All", "Every participant receives a certificate of participation."],
                      ["🪷", "Divine Wisdom", "Deepen your bond with the Bhagavad Geeta's teachings."],
                      ["🤝", "A Global Family", "Connect with the worldwide Learn Geeta community."],
                    ].map(([icon, title, desc]) => (
                      <div key={title} className="rounded-2xl border border-gold-500/20 bg-cream-50 p-6 shadow-[0_10px_30px_-18px_rgba(16,31,92,0.25)]">
                        <span className="text-2xl">{icon}</span>
                        <h3 className="font-display mt-3 text-xl font-semibold text-navy-900">{title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md" data-scroll data-scroll-speed="1.5">
                  <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold-300/40 via-transparent to-teal-500/20 blur-2xl" aria-hidden="true" />
                  <div className="gold-frame relative overflow-hidden rounded-[2rem] bg-white p-8">
                    <Image
                      src="/assets/logo-50-golden-batch.png"
                      alt="Learn Geeta 50 — Golden Batch"
                      width={640}
                      height={560}
                      className="w-full"
                    />
                    <blockquote className="mt-2 border-t border-gold-500/25 pt-5 text-center">
                      <p className="font-display text-lg leading-relaxed text-navy-800">
                        “कर्मण्येवाधिकारस्ते मा फलेषु कदाचन”
                      </p>
                      <p className="mt-2 text-xs tracking-[0.15em] text-navy-900/55 uppercase">
                        Bhagavad Geeta · 2.47
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ————— FINAL CTA ————— */}
          <section data-scroll-section className="relative overflow-hidden bg-navy-900 py-24">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
              <Image
                src="/assets/mandala-navy.jpeg"
                alt=""
                width={700}
                height={848}
                className="mask-feather w-[560px] max-w-none"
              />
            </div>
            <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
              <p className="text-sm tracking-[0.3em] text-gold-300 uppercase">॥ स्वर्णिम वर्ग ॥</p>
              <h2 className="font-display mt-4 text-4xl font-semibold text-cream-50 sm:text-6xl">
                Be part of the <span className="text-goldgrad font-bold">Golden Batch</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-cream-100/70">
                A golden opportunity awaits you. Register today and celebrate fifty batches
                of the Bhagavad Geeta with the whole Learn Geeta pariwar.
              </p>
              <Link
                href="/login"
                className="bg-goldgrad mt-10 inline-block rounded-full px-12 py-4 text-base font-semibold text-navy-900 shadow-[0_20px_50px_-15px_rgba(214,160,47,0.8)] transition-transform hover:scale-[1.05]"
              >
                Join Now
              </Link>
            </div>
          </section>

          {/* ————— FOOTER ————— */}
          <footer id="contact" data-scroll-section className="border-t border-gold-500/20 bg-navy-950 py-14">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
                <div className="max-w-sm text-center md:text-left">
                  <div className="flex items-center justify-center gap-3 md:justify-start">
                    <LotusMark className="h-10 w-10" />
                    <div className="leading-tight">
                      <p className="font-display text-xl font-bold tracking-[0.08em] text-cream-50">LEARN GEETA</p>
                      <p className="text-[11px] font-medium tracking-[0.22em] text-gold-400">स्वर्णिम वर्ग · GOLDEN BATCH 50</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-cream-100/55">
                    An initiative of Geeta Pariwar — spreading the eternal wisdom of the
                    Bhagavad Geeta to every home, in every language.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 text-center sm:gap-20 md:text-left">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">Explore</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-cream-100/65">
                      <li><a href="#about" className="hover:text-gold-300">About</a></li>
                      <li><a href="#competitions" className="hover:text-gold-300">Competitions</a></li>
                      <li><a href="#why" className="hover:text-gold-300">Why Join</a></li>
                      <li><Link href="/login" className="hover:text-gold-300">Login</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">Connect</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-cream-100/65">
                      <li><a href="https://learngeeta.com" target="_blank" rel="noreferrer" className="hover:text-gold-300">learngeeta.com</a></li>
                      <li><a href="mailto:support@learngeeta.com" className="hover:text-gold-300">support@learngeeta.com</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t border-cream-50/10 pt-6 text-center text-xs text-cream-100/40">
                <p>॥ गीता पढ़ें — गीता आत्मसात करें ॥</p>
                <p className="mt-2">© {new Date().getFullYear()} Learn Geeta · Geeta Pariwar. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </main>
      </SmoothScroll>
    </>
  );
}
