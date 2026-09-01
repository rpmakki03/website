"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header, { LotusMark } from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import StickyCta from "@/components/StickyCta";
import { useTranslation } from "@/lib/i18n";
import { Accordion, Modal } from "@/components/activities/ui";

/* ————————————————— localized content shapes ————————————————— */

type Stat = { value: string; label: string };
type Benefit = { title: string; description: string };
type Competition = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  participants: string;
  window: string;
  highlights: string[];
};

/* ————————————————— decorative bits ————————————————— */

function Ornament({ light = false }: { light?: boolean }) {
  const c = light ? "#f0d28a" : "#b9821c";
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-12 sm:w-28" style={{ background: `linear-gradient(to left, ${c}, transparent)` }} />
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 3c1.8 3 1.8 6.5 0 9.5C10.2 9.5 10.2 6 12 3z" fill={c} />
        <path d="M5.5 7c3 1 5.2 3.5 6 6.5-3.2-.3-5.8-3-6-6.5z" fill={c} opacity=".7" />
        <path d="M18.5 7c-.2 3.5-2.8 6.2-6 6.5.8-3 3-5.5 6-6.5z" fill={c} opacity=".7" />
        <circle cx="12" cy="17.5" r="1.6" fill={c} />
      </svg>
      <span className="h-px w-12 sm:w-28" style={{ background: `linear-gradient(to right, ${c}, transparent)` }} />
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
  chitrakala: ( // drawing & painting — palette
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 1.7 1.7 0 0 0 1.2-2.8 1.7 1.7 0 0 1 1.2-2.7H16a6 6 0 0 0 6-6c0-4.6-4.5-8.5-10-8.5zM6.5 12A1.5 1.5 0 1 1 8 10.5 1.5 1.5 0 0 1 6.5 12zm3-4A1.5 1.5 0 1 1 11 6.5 1.5 1.5 0 0 1 9.5 8zm5 0A1.5 1.5 0 1 1 16 6.5 1.5 1.5 0 0 1 14.5 8zm3 4A1.5 1.5 0 1 1 19 10.5 1.5 1.5 0 0 1 17.5 12z" />
  ),
  swar: ( // shloka recitation — mic
    <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4zm6.5-4a6.5 6.5 0 0 1-13 0H4a8 8 0 0 0 7 7.94V21H8v2h8v-2h-3v-2.06A8 8 0 0 0 20 11h-1.5z" />
  ),
  gyan: ( // quiz — question
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 16h-2v-2h2v2zm1.8-6.9c-.6.6-1.3 1.1-1.6 1.9-.1.3-.2.6-.2 1h-2c0-.7.1-1.3.4-1.9.4-.8 1.1-1.3 1.7-1.9.5-.5.8-1 .8-1.7A2 2 0 0 0 12 6.6 2.1 2.1 0 0 0 9.9 8.7h-2A4.1 4.1 0 0 1 12 4.6a4 4 0 0 1 4 3.9c0 1.1-.5 1.9-1.2 2.6z" />
  ),
  expression: ( // personal reflection — heart in speech bubble
    <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.7 1.4 5.1 3.7 6.7L5 22l4.6-2.4c.8.2 1.6.3 2.4.3 5.5 0 10-3.9 10-8.7S17.5 2 12 2zm0 13.1-.6-.5c-2.2-1.9-3.7-3.1-3.7-4.7 0-1.2 1-2.1 2.2-2.1.7 0 1.5.3 2.1 1 .6-.7 1.4-1 2.1-1 1.2 0 2.2.9 2.2 2.1 0 1.6-1.5 2.8-3.7 4.7l-.6.5z" />
  ),
  vivechan: ( // creative edit — film reel
    <path d="M18 4v1h-2V4H8v1H6V4H4v16h2v-1h2v1h8v-1h2v1h2V4h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm-4 4.5-4 2.3V9.2l4 2.3v2z" />
  ),
};

/**
 * Space between two inline fragments, unless the next one opens with
 * punctuation — several languages use a bare "," or "।" as the connector
 * between the highlighted terms in the About paragraph.
 */
const glue = (next: string) => (/^[,.;:!?)\]}।॥]/.test(next.trim()) ? "" : " ");

const ACCENTS = ["#2456b8", "#2cbfb4", "#d6a02f", "#1f9e52", "#2e6ad6"];
const WHY_ICONS = ["🏆", "📜", "🪷", "🤝"];

/* ————————————————— page ————————————————— */

export default function Home() {
  const { t, raw } = useTranslation();
  const [activeComp, setActiveComp] = useState<Competition | null>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  const competitions = raw<Competition[]>("competitions.items");
  const stats = raw<Stat[]>("hero.stats");
  const aboutPoints = raw<string[]>("about.points");
  const benefits = raw<Benefit[]>("why.benefits");

  const activeIndex = activeComp ? competitions.findIndex((c) => c.id === activeComp.id) : -1;
  const activeAccent = ACCENTS[(activeIndex < 0 ? 0 : activeIndex) % ACCENTS.length];

  return (
    <>
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />

      <Header />
      <SmoothScroll>
        <main>
          {/* ————— HERO ————— */}
          <section
            data-scroll-section
            className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100 pt-24 pb-14 sm:pt-40 sm:pb-20"
          >
            {/* floating petals */}
            {/* the content column is max-w-5xl, so these only clear the text
                from xl up — below that they drifted behind the stats */}
            <Petal className="left-[4%] top-40 hidden h-12 w-12 opacity-60 xl:block" color="#2456b8" speed="2" />
            <Petal className="right-[5%] top-56 hidden h-10 w-10 opacity-50 xl:block" color="#2cbfb4" speed="3" />
            <Petal className="left-[3%] bottom-24 hidden h-9 w-9 opacity-45 xl:block" color="#1f9e52" speed="1.5" />
            <Petal className="right-[4%] bottom-40 hidden h-12 w-12 opacity-50 xl:block" color="#e3b85c" speed="2.5" />

            <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
              <div data-scroll data-scroll-speed="1">
                <Image
                  src="/assets/logo-50-hindi.png"
                  alt={t("hero.logoAlt")}
                  width={520}
                  height={470}
                  priority
                  className="mx-auto w-52 sm:w-96 md:w-[440px]"
                />
              </div>

              <p className="mt-2 text-[11px] font-semibold tracking-[0.25em] text-gold-600 uppercase sm:text-sm sm:tracking-[0.35em]">
                {t("hero.eyebrow")}
              </p>

              <h1 className="font-display mt-3 text-[48px] leading-none font-bold text-navy-900 sm:mt-4 sm:text-[70px] md:text-[84px]">
                LearnGeeta
                <span className="text-goldgrad text-[32px] sm:text-[42px] md:text-[56px] block -mt-1 sm:-mt-3 md:-mt-4">Competitions</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-900/70 sm:text-lg">
                {t("hero.shortDescription")}
              </p>

              {/* CTAs — full-width and thumb-sized on a phone */}
              <div ref={heroCtaRef} className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/login"
                  className="bg-goldgrad flex min-h-[56px] items-center justify-center rounded-full px-10 text-center text-base font-bold text-navy-900 shadow-[0_18px_45px_-14px_rgba(185,130,28,0.9)] transition-transform active:scale-[0.98] sm:hover:scale-[1.05]"
                >
                  {t("hero.ctaPrimary")}
                </Link>
                <Link
                  href="/competitions"
                  className="flex min-h-[56px] items-center justify-center rounded-full border-2 border-navy-800/25 px-10 text-center text-base font-bold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
              <p className="mt-3.5 text-xs font-medium text-navy-900/55">{t("hero.ctaNote")}</p>

              {/* stats */}
              <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-gold-500/25 sm:mt-14">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-1.5 py-2 sm:px-2">
                    <p className="font-display text-2xl font-bold leading-tight text-balance break-words text-navy-800 sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-balance text-gold-600 uppercase sm:text-xs sm:tracking-[0.18em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ————— gold marquee ————— */}
          <section data-scroll-section className="bg-goldgrad overflow-hidden py-2.5 sm:py-3">
            <div className="animate-marquee flex w-max whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, half) => (
                <div key={half} className="flex items-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="mx-5 flex items-center gap-5 text-xs font-bold tracking-[0.15em] text-navy-900 sm:mx-6 sm:gap-6 sm:text-sm sm:tracking-[0.2em]">
                      {t("marquee.sanskrit")} <span className="text-navy-900/60">✦</span> {t("marquee.latin")}
                      <span className="text-navy-900/60">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ————— COMPETITIONS — moved up: it is what people came for ————— */}
          <section
            id="competitions"
            data-scroll-section
            className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 py-16 sm:py-32"
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
                <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-300 uppercase sm:text-xs sm:tracking-[0.3em]">
                  {t("competitions.eyebrow")}
                </p>
                <h2 className="font-display mt-2 text-[32px] leading-tight font-bold text-cream-50 sm:mt-3 sm:text-5xl">
                  {t("competitions.titleLead")}{" "}
                  <span className="text-goldgrad">{t("competitions.titleHighlight")}</span>
                  {t("competitions.titleTail") ? ` ${t("competitions.titleTail")}` : ""}
                </h2>
                <div className="mt-4 sm:mt-5">
                  <Ornament light />
                </div>
                <p className="mx-auto mt-4 hidden max-w-2xl text-cream-100/70 sm:block">
                  {t("competitions.description")}
                </p>
              </div>

              {/* the cards: short, bold, and everything else behind Know more */}
              <ul className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {competitions.map((comp, i) => {
                  const accent = ACCENTS[i % ACCENTS.length];
                  return (
                    <li key={comp.id}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold-500/25 bg-cream-50 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] transition-all duration-300 sm:hover:-translate-y-2 sm:hover:border-gold-500/60">
                        <span className="block h-1.5 w-full" style={{ background: accent }} />
                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <span
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                              style={{ background: `${accent}1a` }}
                            >
                              <svg viewBox="0 0 24 24" className="h-6 w-6" fill={accent}>{ICONS[comp.id]}</svg>
                            </span>
                            <span className="font-display text-4xl font-bold text-navy-900/10 transition-colors group-hover:text-navy-900/20">
                              0{i + 1}
                            </span>
                          </div>

                          <h3 className="font-display mt-4 text-[26px] leading-tight font-bold text-navy-900">{comp.name}</h3>
                          <p className="mt-0.5 text-[13px] font-bold" style={{ color: accent }}>{comp.subtitle}</p>

                          {/* two lines on a phone — the rest is one tap away */}
                          <p className="mt-3 line-clamp-2 text-[15px] leading-snug text-navy-900/70 sm:line-clamp-3">
                            {comp.description}
                          </p>

                          {/* Chips removed from card, shown in Know More instead */}

                          <div className="mt-auto flex items-center gap-2.5 pt-5">
                            <Link
                              href={`/competitions/${comp.id}`}
                              className="bg-goldgrad flex min-h-[48px] flex-1 items-center justify-center rounded-full px-4 text-sm font-bold text-navy-900 shadow-[0_12px_28px_-14px_rgba(185,130,28,0.9)] transition-transform active:scale-[0.98]"
                            >
                              {t("competitions.participate")}
                            </Link>
                            <button
                              onClick={() => setActiveComp(comp)}
                              className="min-h-[48px] shrink-0 rounded-full border-2 border-navy-800/20 px-5 text-sm font-bold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                            >
                              {t("competitions.knowMore")}
                            </button>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}

                {/* CTA card completing the grid */}
                <li>
                  <article className="bg-goldgrad flex h-full flex-col items-center justify-center rounded-3xl p-8 text-center shadow-[0_30px_60px_-25px_rgba(185,130,28,0.7)] sm:p-10">
                    <LotusMark className="h-12 w-12 opacity-90 sm:h-14 sm:w-14" />
                    <h3 className="font-display mt-4 text-[28px] leading-tight font-bold text-navy-900 sm:text-3xl">
                      {t("competitions.ctaCard.titleLine1")} <br /> {t("competitions.ctaCard.titleLine2")}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed font-medium text-navy-900/75">
                      {t("competitions.ctaCard.description")}
                    </p>
                    <Link
                      href="/login"
                      className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-navy-900 px-9 text-sm font-bold text-gold-200 shadow-xl transition-transform active:scale-[0.98] sm:hover:scale-[1.05]"
                    >
                      {t("competitions.ctaCard.button")}
                    </Link>
                  </article>
                </li>
              </ul>

              <div className="mt-8 text-center">
                <Link
                  href="/competitions"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-gold-400/50 px-8 text-sm font-bold text-gold-200 transition-colors hover:bg-gold-400/10"
                >
                  {t("competitions.viewAll")} →
                </Link>
              </div>
            </div>

            <Modal
              open={!!activeComp}
              onClose={() => setActiveComp(null)}
              title={activeComp?.name || ""}
              subtitle={activeComp?.subtitle}
              accent={activeAccent}
              footer={
                activeComp ? (
                  <Link
                    href={`/competitions/${activeComp.id}`}
                    className="bg-goldgrad flex min-h-[52px] w-full items-center justify-center rounded-full px-8 text-[15px] font-bold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)]"
                  >
                    {t("competitions.registerCta")}
                  </Link>
                ) : undefined
              }
            >
              {activeComp && (
                <>
                  <p className="text-[15px] leading-relaxed text-navy-900/75">{activeComp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3.5 py-1.5 text-xs font-semibold text-teal-600">
                      {activeComp.participants}
                    </span>
                    <span className="rounded-full border border-gold-400/40 bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold text-gold-700">
                      {activeComp.window}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3 border-t border-navy-900/10 pt-5">
                    {activeComp.highlights.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-900/75">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Modal>
          </section>

          {/* ————— ABOUT ————— */}
          <section id="about" data-scroll-section className="bg-cream-50 py-16 sm:py-32">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:gap-14 sm:px-8 lg:grid-cols-2 lg:gap-20">
              <div className="relative" data-scroll data-scroll-speed="1">
                <div className="gold-frame overflow-hidden rounded-[2rem]">
                  <Image
                    src="/assets/krishna-artwork.jpeg"
                    alt={t("about.imageAlt")}
                    width={950}
                    height={882}
                    className="h-72 w-full object-cover object-center sm:h-[520px]"
                  />
                </div>
                <div
                  className="absolute -bottom-6 -right-2 max-w-[65%] rounded-2xl bg-navy-900 px-5 py-4 shadow-2xl sm:-bottom-8 sm:-right-8 sm:px-6 sm:py-5"
                  data-scroll
                  data-scroll-speed="2"
                >
                  <p className="font-display text-3xl font-bold text-gold-300 sm:text-4xl">{t("about.badgeValue")}</p>
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-cream-100/80 uppercase sm:text-xs sm:tracking-[0.2em]">
                    {t("about.badgeLabel")}
                  </p>
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-600 uppercase sm:text-xs sm:tracking-[0.3em]">
                  {t("about.eyebrow")}
                </p>
                <h2 className="font-display mt-2 text-[32px] leading-tight font-bold text-navy-900 sm:mt-3 sm:text-5xl">
                  {t("about.titleLine1")} <br /> {t("about.titleLine2")}
                </h2>
                <div className="mt-4 w-fit">
                  <Ornament />
                </div>

                {/* the long paragraph folds away on a phone */}
                <div className="mt-5 sm:hidden">
                  <Accordion title={t("nav.about")}>
                    <AboutBody t={t} />
                  </Accordion>
                </div>
                <p className="mt-6 hidden leading-relaxed text-navy-900/70 sm:block">
                  <AboutBody t={t} />
                </p>

                <ul className="mt-6 space-y-3.5 sm:mt-8 sm:space-y-4">
                  {aboutPoints.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="bg-goldgrad mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <svg viewBox="0 0 12 12" className="h-3 w-3 fill-navy-900">
                          <path d="M4.6 9.6 1.4 6.4l1.2-1.2 2 2 4.8-4.8 1.2 1.2z" />
                        </svg>
                      </span>
                      <span className="text-[15px] font-medium text-navy-900/80">{line}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className="bg-goldgrad mt-8 flex min-h-[52px] w-full items-center justify-center rounded-full px-9 text-center text-[15px] font-bold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform active:scale-[0.98] sm:mt-10 sm:inline-flex sm:w-auto sm:hover:scale-[1.04]"
                >
                  {t("about.cta")}
                </Link>
              </div>
            </div>
          </section>

          {/* ————— WHY JOIN ————— */}
          <section id="why" data-scroll-section className="overflow-hidden bg-cream-100 py-16 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-600 uppercase sm:text-xs sm:tracking-[0.3em]">
                    {t("why.eyebrow")}
                  </p>
                  <h2 className="font-display mt-2 text-[32px] leading-tight font-bold text-navy-900 sm:mt-3 sm:text-5xl">
                    {t("why.titleLead")} <br />
                    <span className="text-goldgrad">{t("why.titleHighlight")}</span>
                    {t("why.titleTail") ? ` ${t("why.titleTail")}` : ""}
                  </h2>
                  <p className="mt-4 hidden max-w-xl leading-relaxed text-navy-900/70 sm:mt-6 sm:block">
                    {t("why.description")}
                  </p>

                  <div className="mt-7 grid gap-3.5 sm:mt-10 sm:gap-6 sm:grid-cols-2">
                    {benefits.map((benefit, i) => (
                      <div key={benefit.title} className="rounded-2xl border border-gold-500/20 bg-cream-50 p-5 shadow-[0_10px_30px_-18px_rgba(16,31,92,0.25)] sm:p-6">
                        <span className="text-2xl">{WHY_ICONS[i]}</span>
                        <h3 className="font-display mt-2.5 text-xl font-bold text-navy-900">{benefit.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-navy-900/65">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md" data-scroll data-scroll-speed="1.5">
                  <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold-300/40 via-transparent to-teal-500/20 blur-2xl" aria-hidden="true" />
                  <div className="gold-frame relative overflow-hidden rounded-[2rem] bg-white p-6 sm:p-8">
                    <Image
                      src="/assets/logo-50-golden-batch.png"
                      alt={t("why.logoAlt")}
                      width={640}
                      height={560}
                      className="w-full"
                    />
                    <blockquote className="mt-2 border-t border-gold-500/25 pt-5 text-center">
                      <p className="font-display text-lg leading-relaxed text-navy-800">
                        &ldquo;{t("why.quote")}&rdquo;
                      </p>
                      <p className="mt-2 text-[11px] tracking-[0.15em] text-navy-900/55 uppercase">
                        {t("why.quoteSource")}
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ————— FINAL CTA ————— */}
          <section data-scroll-section className="relative overflow-hidden bg-navy-900 py-16 sm:py-24">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
              <Image
                src="/assets/mandala-navy.jpeg"
                alt=""
                width={700}
                height={848}
                className="mask-feather w-[560px] max-w-none"
              />
            </div>
            {/* keeps the heading and copy off the mandala's busiest area */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_center,rgba(16,31,92,0.92)_0%,rgba(16,31,92,0.55)_55%,transparent_85%)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
              <p className="text-xs tracking-[0.25em] text-gold-300 uppercase sm:text-sm sm:tracking-[0.3em]">
                {t("finalCta.eyebrow")}
              </p>
              <h2 className="font-display mt-3 text-[34px] leading-tight font-bold text-cream-50 sm:mt-4 sm:text-6xl">
                {t("finalCta.titleLead") ? `${t("finalCta.titleLead")} ` : ""}
                <span className="text-goldgrad">{t("finalCta.titleHighlight")}</span>
                {t("finalCta.titleTail") ? ` ${t("finalCta.titleTail")}` : ""}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-cream-100/70 sm:mt-5 sm:text-base">
                {t("finalCta.description")}
              </p>
              <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
                <Link
                  href="/login"
                  className="bg-goldgrad flex min-h-[56px] items-center justify-center rounded-full px-12 text-center text-base font-bold text-navy-900 shadow-[0_20px_50px_-15px_rgba(214,160,47,0.8)] transition-transform active:scale-[0.98] sm:hover:scale-[1.05]"
                >
                  {t("finalCta.button")}
                </Link>
                <Link
                  href="/competitions"
                  className="flex min-h-[56px] items-center justify-center rounded-full border-2 border-cream-100/25 px-10 text-center text-base font-bold text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
              <p className="mt-3.5 text-xs font-medium text-cream-100/50">{t("hero.ctaNote")}</p>
            </div>
          </section>

          {/* ————— FOOTER ————— */}
          <footer id="contact" data-scroll-section className="border-t border-gold-500/20 bg-navy-950 pb-[max(3.5rem,calc(env(safe-area-inset-bottom)+5rem))] pt-12 sm:pb-14 sm:pt-14">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
                <div className="max-w-sm text-center md:text-left">
                  <div className="flex items-center justify-center gap-3 md:justify-start">
                    {/* the parent organisation's mark leads the footer lockup too */}
                    <span className="shrink-0 rounded-xl bg-cream-100 p-1.5">
                      <Image
                        src="/assets/geeta-pariwar-logo.png"
                        alt={t("footer.pariwarLogoAlt")}
                        width={387}
                        height={363}
                        className="h-12 w-auto"
                      />
                    </span>
                    <div className="leading-tight">
                      <p className="font-display text-xl font-bold tracking-[0.08em] text-cream-50">{t("footer.brandName")}</p>
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-400">{t("footer.brandTagline")}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-4 md:justify-start">
                    <Image
                      src="/assets/logo-mark.png"
                      alt=""
                      width={400}
                      height={309}
                      className="h-12 w-auto shrink-0"
                    />
                    <p className="text-sm leading-relaxed text-cream-100/55">
                      {t("footer.about")}
                    </p>
                  </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-8 text-center sm:w-auto sm:gap-20 md:text-left">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">{t("footer.exploreHeading")}</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-cream-100/65">
                      <li><a href="#about" className="hover:text-gold-300">{t("footer.links.about")}</a></li>
                      <li><Link href="/competitions" className="hover:text-gold-300">{t("footer.links.competitions")}</Link></li>
                      <li><a href="#why" className="hover:text-gold-300">{t("footer.links.why")}</a></li>
                      <li><Link href="/login" className="hover:text-gold-300">{t("footer.links.login")}</Link></li>
                    </ul>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">{t("footer.connectHeading")}</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-cream-100/65">
                      <li><a href="https://learngeeta.com" target="_blank" rel="noreferrer" className="hover:text-gold-300">learngeeta.com</a></li>
                      <li><a href="mailto:support@learngeeta.com" className="break-all hover:text-gold-300">support@learngeeta.com</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-cream-50/10 pt-6 text-center text-xs text-cream-100/40 sm:mt-12">
                <p>{t("footer.motto")}</p>
                <p className="mt-2">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
              </div>
            </div>
          </footer>
        </main>
      </SmoothScroll>

      <StickyCta watch={heroCtaRef} />
    </>
  );
}

/** The About paragraph — one source, rendered inline on desktop and inside
 *  the accordion on phones. */
function AboutBody({ t }: { t: (path: string) => string }) {
  return (
    <>
      {t("about.bodyLead")}
      {glue(t("about.term1"))}
      <em className="font-semibold not-italic text-navy-800">{t("about.term1")}</em>
      {glue(t("about.gloss1"))}
      {t("about.gloss1")}
      {glue(t("about.term2"))}
      <em className="font-semibold not-italic text-navy-800">{t("about.term2")}</em>
      {glue(t("about.gloss2"))}
      {t("about.gloss2")}
      {glue(t("about.term3"))}
      <em className="font-semibold not-italic text-navy-800">{t("about.term3")}</em>
      {glue(t("about.gloss3"))}
      {t("about.gloss3")}
      {glue(t("about.bodyTail"))}
      {t("about.bodyTail")}
    </>
  );
}
