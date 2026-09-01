"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { ACTIVITIES, type Activity } from "@/lib/activities";
import { Accordion, Chip, Modal } from "@/components/activities/ui";

/* Compact glyphs — one per competition, drawn at 24×24. */
const ICONS: Record<Activity["id"], React.ReactNode> = {
  chitrakala: <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 1.7 1.7 0 0 0 1.2-2.8 1.7 1.7 0 0 1 1.2-2.7H16a6 6 0 0 0 6-6c0-4.6-4.5-8.5-10-8.5zM6.5 12A1.5 1.5 0 1 1 8 10.5 1.5 1.5 0 0 1 6.5 12zm3-4A1.5 1.5 0 1 1 11 6.5 1.5 1.5 0 0 1 9.5 8zm5 0A1.5 1.5 0 1 1 16 6.5 1.5 1.5 0 0 1 14.5 8zm3 4A1.5 1.5 0 1 1 19 10.5 1.5 1.5 0 0 1 17.5 12z" />,
  swar: <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4zm6.5-4a6.5 6.5 0 0 1-13 0H4a8 8 0 0 0 7 7.94V21H8v2h8v-2h-3v-2.06A8 8 0 0 0 20 11h-1.5z" />,
  gyan: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 16h-2v-2h2v2zm1.8-6.9c-.6.6-1.3 1.1-1.6 1.9-.1.3-.2.6-.2 1h-2c0-.7.1-1.3.4-1.9.4-.8 1.1-1.3 1.7-1.9.5-.5.8-1 .8-1.7A2 2 0 0 0 12 6.6 2.1 2.1 0 0 0 9.9 8.7h-2A4.1 4.1 0 0 1 12 4.6a4 4 0 0 1 4 3.9c0 1.1-.5 1.9-1.2 2.6z" />,
  expression: <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.7 1.4 5.1 3.7 6.7L5 22l4.6-2.4c.8.2 1.6.3 2.4.3 5.5 0 10-3.9 10-8.7S17.5 2 12 2zm0 13.1-.6-.5c-2.2-1.9-3.7-3.1-3.7-4.7 0-1.2 1-2.1 2.2-2.1.7 0 1.5.3 2.1 1 .6-.7 1.4-1 2.1-1 1.2 0 2.2.9 2.2 2.1 0 1.6-1.5 2.8-3.7 4.7l-.6.5z" />,
  vivechan: <path d="M18 4v1h-2V4H8v1H6V4H4v16h2v-1h2v1h8v-1h2v1h2V4h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm-4 4.5-4 2.3V9.2l4 2.3v2z" />,
};

export default function CompetitionsHub() {
  const list = Object.values(ACTIVITIES);
  const [active, setActive] = useState<Activity | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pb-20">
        {/* ————— hero ————— */}
        <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 px-5 pt-24 pb-10 text-center sm:px-8 sm:pt-32 sm:pb-14">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-600 uppercase sm:text-xs">
            Swarnim Varg 2026
          </p>
          <h1 className="font-display mx-auto mt-3 max-w-2xl text-[36px] leading-[1.08] font-bold text-navy-900 sm:text-6xl">
            Five ways to <span className="text-goldgrad">celebrate</span> the Geeta
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-snug font-semibold text-navy-900/70 sm:max-w-xl sm:text-xl">
            Paint it. Recite it. Answer it. Live it. Edit it.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-navy-900/60">
            Every competition is free, open worldwide, and closes in September.
          </p>
        </section>

        {/* ————— the five ————— */}
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((a, i) => (
              <li key={a.id}>
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold-500/25 bg-white shadow-[0_16px_40px_-30px_rgba(16,31,92,0.5)] transition-all duration-300 sm:hover:-translate-y-1.5 sm:hover:border-gold-500/60 sm:hover:shadow-[0_30px_60px_-30px_rgba(16,31,92,0.5)]"
                >
                  <span className="block h-1.5 w-full" style={{ background: a.accent }} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{ background: `${a.accent}1a` }}
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill={a.accent}>{ICONS[a.id]}</svg>
                      </span>
                      <span className="font-display text-4xl font-bold text-navy-900/10">
                        0{i + 1}
                      </span>
                    </div>

                    <h2 className="font-display mt-4 text-2xl leading-tight font-bold text-navy-900">{a.name}</h2>
                    <p className="mt-0.5 text-[13px] font-bold" style={{ color: a.accent }}>{a.subtitle}</p>
                    <p className="mt-3 text-[15px] leading-snug font-semibold text-navy-900/75">{a.hook}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.chips.map((c) => <Chip key={c} accent={a.accent}>{c}</Chip>)}
                    </div>

                    <div className="mt-auto flex items-center gap-2.5 pt-6">
                      <Link
                        href={`/competitions/${a.id}`}
                        className="bg-goldgrad flex min-h-[48px] flex-1 items-center justify-center rounded-full px-4 text-sm font-bold text-navy-900 shadow-[0_12px_28px_-14px_rgba(185,130,28,0.9)] transition-transform active:scale-[0.98]"
                      >
                        Participate
                      </Link>
                      <button
                        onClick={() => setActive(a)}
                        className="min-h-[48px] rounded-full border-2 border-navy-800/20 px-5 text-sm font-bold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                      >
                        Know more
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}

            {/* completes the grid rather than leaving a hole at the end */}
            <li>
              <article className="bg-goldgrad flex h-full flex-col items-center justify-center rounded-3xl p-8 text-center shadow-[0_30px_60px_-30px_rgba(185,130,28,0.7)]">
                <h2 className="font-display text-3xl leading-tight font-bold text-navy-900">
                  Enter as many <br /> as you like
                </h2>
                <p className="mt-3 text-sm font-medium text-navy-900/75">
                  One account opens every competition.
                </p>
                <Link
                  href="/login"
                  className="mt-6 flex min-h-[48px] items-center justify-center rounded-full bg-navy-900 px-8 text-sm font-bold text-gold-200 shadow-xl transition-transform active:scale-[0.98]"
                >
                  Create my account
                </Link>
              </article>
            </li>
          </ul>

          {/* ————— shared questions, collapsed ————— */}
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            <h2 className="text-center text-[11px] font-semibold tracking-[0.28em] text-gold-600 uppercase">
              Common questions
            </h2>
            <Accordion title="Who can take part?">
              <p className="text-[15px] leading-relaxed text-navy-900/75">
                Anyone, anywhere in the world. There is no entry fee for any competition. If you are
                under 18, a parent or guardian simply needs to consent when you submit.
              </p>
            </Accordion>
            <Accordion title="Can I enter more than one?">
              <p className="text-[15px] leading-relaxed text-navy-900/75">
                Yes. One account gives you access to all five. Many participants enter two or three.
              </p>
            </Accordion>
            <Accordion title="Do I get a certificate?">
              <p className="text-[15px] leading-relaxed text-navy-900/75">
                Every valid entry earns a participation certificate. Top entries are showcased at the
                Golden Batch opening on 16 October.
              </p>
            </Accordion>
            <Accordion title="What do I need before I start?">
              <p className="text-[15px] leading-relaxed text-navy-900/75">
                Your date of birth, and whatever the competition asks for — a photo of your artwork,
                or the link to a reel you have already published. Each competition page walks you
                through the rules first, then the form.
              </p>
            </Accordion>
          </div>
        </div>
      </main>

      {/* ————— "know more" sheet ————— */}
      <Modal
        open={!!active}
        onClose={close}
        title={active?.name ?? ""}
        subtitle={active?.subtitle}
        accent={active?.accent}
        footer={
          active ? (
            <Link
              href={`/competitions/${active.id}`}
              className="bg-goldgrad flex min-h-[52px] w-full items-center justify-center rounded-full px-8 text-[15px] font-bold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)]"
            >
              Participate in {active.name} →
            </Link>
          ) : undefined
        }
      >
        {active && (
          <>
            <p className="font-display text-lg leading-snug italic text-navy-800">{active.tagline}</p>

            <dl className="mt-5 divide-y divide-navy-900/10 rounded-2xl border border-gold-500/25 bg-white px-4">
              {active.facts.map((f) => (
                <div key={f.label} className="grid gap-0.5 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="text-[11px] font-semibold tracking-wide text-navy-800 uppercase">{f.label}</dt>
                  <dd className="text-sm font-medium text-navy-900/80">{f.value}</dd>
                </div>
              ))}
            </dl>

            {active.about.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-navy-900/75">{p}</p>
            ))}

            <h3 className="mt-6 text-sm font-bold tracking-wide text-navy-800 uppercase">How it works</h3>
            <ol className="mt-3 space-y-3">
              {active.steps.map((s, i) => (
                <li key={s.title} className="flex gap-3.5">
                  <span
                    className="font-display mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: active.accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-navy-900">{s.title}</span>
                    <span className="block text-sm leading-relaxed text-navy-900/70">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 text-sm font-bold tracking-wide text-navy-800 uppercase">Key dates</h3>
            <ol className="mt-3">
              {active.timeline.map((t) => (
                <li key={t.period} className="relative border-l-2 border-gold-500/30 pb-4 pl-5 last:border-transparent last:pb-0">
                  <span
                    className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-cream-50"
                    style={{ background: active.accent }}
                  />
                  <p className="text-xs font-bold tracking-wider text-gold-600 uppercase">{t.period}</p>
                  <p className="mt-0.5 text-sm text-navy-900/75">{t.event}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 text-sm font-bold tracking-wide text-navy-800 uppercase">What you get</h3>
            <ul className="mt-3 space-y-2">
              {active.recognition.map((r) => (
                <li key={r.slice(0, 20)} className="flex gap-2.5 text-sm leading-relaxed text-navy-900/75">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />{r}
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </>
  );
}
