"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { ACTIVITIES, type Activity } from "@/lib/activities";
import {
  Accordion, Chip, GhostButton, GoldButton, Modal, SectionEyebrow, SectionTitle,
} from "@/components/activities/ui";
import { ChitrakalaPanel, GyanPanel, ReelPanel, VivechanPanel } from "@/components/activities/panels";

const PANEL_TITLES: Record<Activity["id"], { title: string; blurb: string }> = {
  chitrakala: { title: "Upload your artwork", blurb: "A clear photo of your handmade artwork, plus its statement." },
  swar: { title: "Add your reels", blurb: "Paste each published reel with its Adhyaya, Shloka and language." },
  gyan: { title: "Take the challenge", blurb: "One scored attempt, 50 questions, about 35 minutes." },
  expression: { title: "Add your reels", blurb: "Paste each published reflection reel." },
  vivechan: { title: "Submit your entry", blurb: "Pick your approved source, then add your reel and master file." },
};

function Panel({ id }: { id: Activity["id"] }) {
  switch (id) {
    case "chitrakala": return <ChitrakalaPanel />;
    case "swar": return <ReelPanel kind="swar" />;
    case "gyan": return <GyanPanel />;
    case "expression": return <ReelPanel kind="expression" />;
    case "vivechan": return <VivechanPanel />;
  }
}

/* ————— rules content, shared by the step and the modal ————— */

function RulesBody({ a }: { a: Activity }) {
  return (
    <>
      <section>
        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-emerald-600 uppercase">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M9.2 18.4 3.4 12.6l1.7-1.7 4.1 4.1 9.7-9.7 1.7 1.7z" />
          </svg>
          What counts
        </h3>
        <ul className="mt-3 space-y-2.5">
          {a.dos.map((d) => (
            <li key={d.slice(0, 24)} className="flex gap-2.5 text-sm leading-relaxed text-navy-900/80">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />{d}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border-t border-navy-900/10 pt-5">
        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-red-600/80 uppercase">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z" />
          </svg>
          What does not
        </h3>
        <ul className="mt-3 space-y-2.5">
          {a.donts.map((d) => (
            <li key={d.slice(0, 24)} className="flex gap-2.5 text-sm leading-relaxed text-navy-900/80">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/70" />{d}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border-t border-navy-900/10 pt-5">
        <h3 className="text-sm font-bold tracking-wide text-navy-800 uppercase">Good to know</h3>
        <ul className="mt-3 space-y-2.5">
          {a.recognition.map((r) => (
            <li key={r.slice(0, 24)} className="flex gap-2.5 text-sm leading-relaxed text-navy-900/80">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />{r}
            </li>
          ))}
          <li className="flex gap-2.5 text-sm leading-relaxed text-navy-900/80">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
            {a.openToAll
              ? "Open to every age and country. Participants under 18 need a parent or guardian's consent."
              : "You are placed in the right category automatically from your date of birth. Participants under 18 need a parent or guardian's consent."}
          </li>
        </ul>
      </section>
    </>
  );
}

export default function ActivityScreen({ id }: { id: Activity["id"] }) {
  const a = ACTIVITIES[id];
  const [rulesOpen, setRulesOpen] = useState(false);
  /** Step 1 = rules & guidelines, step 2 = the submission form. */
  const [step, setStep] = useState<1 | 2>(1);
  const [accepted, setAccepted] = useState(false);
  const closeRules = useCallback(() => setRulesOpen(false), []);
  const participateRef = useRef<HTMLElement>(null);

  // Moving to the form is a page change in the user's mind — put them at the
  // top of it rather than wherever the rules step left the scroll position.
  useEffect(() => {
    if (step === 2) participateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const goToParticipate = () =>
    participateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <Header />
      <main className="bg-cream-50">
        {/* ————— sub-hero ————— */}
        <section
          className="relative overflow-hidden pt-24 pb-10 text-center sm:pt-32 sm:pb-14"
          style={{ background: `linear-gradient(165deg, ${a.accent}1f, transparent 60%)` }}
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <nav className="text-[11px] text-navy-900/50 sm:text-xs" aria-label="Breadcrumb">
              <Link href="/competitions" className="hover:text-gold-600">Competitions</Link>
              <span className="mx-2">/</span>
              <span className="text-navy-800">{a.name}</span>
            </nav>

            <h1 className="font-display mt-3 text-[34px] leading-[1.1] font-bold text-navy-900 sm:text-6xl">
              {a.name}
            </h1>
            <p className="mt-1.5 text-sm font-bold tracking-wide sm:text-lg" style={{ color: a.accent }}>
              {a.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-snug font-semibold text-navy-900/80 sm:text-xl">
              {a.hook}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {a.chips.map((c) => <Chip key={c} accent={a.accent}>{c}</Chip>)}
            </div>

            <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <GoldButton onClick={goToParticipate}>Start your entry →</GoldButton>
              <GhostButton onClick={() => setRulesOpen(true)}>Read the rules</GhostButton>
            </div>
          </div>
        </section>

        {/* ————— quick facts — three bold lines, no paragraph ————— */}
        <section className="border-y border-gold-500/20 bg-navy-900">
          <div className="mx-auto grid max-w-4xl gap-px overflow-hidden px-5 py-6 text-left sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-8">
            {a.facts.map((f) => (
              <div key={f.label} className="py-2 sm:py-0">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-300 uppercase">{f.label}</p>
                <p className="mt-1 text-sm font-semibold text-cream-50">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ————— PARTICIPATE — first thing after the hero ————— */}
        <section
          ref={participateRef}
          id="participate"
          className="scroll-mt-20 bg-cream-50 px-5 py-12 sm:px-8 sm:py-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Participate</SectionEyebrow>
            <SectionTitle>{step === 1 ? "Before you begin" : PANEL_TITLES[id].title}</SectionTitle>

            {/* step indicator */}
            <ol className="mx-auto mt-6 flex max-w-sm items-center gap-3" aria-label="Progress">
              {([1, 2] as const).map((n) => (
                <li key={n} className="flex flex-1 items-center gap-2.5">
                  <span
                    className={`font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      step >= n ? "text-navy-900" : "bg-navy-900/10 text-navy-900/45"
                    }`}
                    style={step >= n ? { background: a.accent, color: "#fff" } : undefined}
                  >
                    {step > n ? "✓" : n}
                  </span>
                  <span className={`text-left text-xs font-semibold ${step >= n ? "text-navy-800" : "text-navy-900/40"}`}>
                    {n === 1 ? "Rules" : "Submit"}
                  </span>
                  {n === 1 && <span className={`h-0.5 flex-1 rounded ${step > 1 ? "bg-gold-500" : "bg-navy-900/10"}`} />}
                </li>
              ))}
            </ol>
          </div>

          {/* ————— step 1: rules & guidelines ————— */}
          {step === 1 ? (
            <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-gold-500/25 bg-white p-5 text-left shadow-[0_20px_50px_-34px_rgba(16,31,92,0.5)] sm:p-8">
              <p className="text-sm font-semibold text-navy-800">
                Read the {a.name} rules, then continue to your entry.
              </p>
              <div className="mt-5">
                <RulesBody a={a} />
              </div>

              <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl bg-cream-100 px-4 py-4">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-gold-600"
                />
                <span className="text-sm font-semibold text-navy-800">
                  I have read and understood the rules &amp; guidelines.
                </span>
              </label>

              <div className="mt-5">
                <GoldButton full disabled={!accepted} onClick={() => setStep(2)}>
                  Next → Go to my entry
                </GoldButton>
                {!accepted && (
                  <p className="mt-3 text-center text-xs font-medium text-gold-700">
                    Tick the box above to continue.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* ————— step 2: the actual submission ————— */
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="flex flex-col gap-3 rounded-2xl border border-emerald-600/25 bg-emerald-600/5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true">
                    <path d="M9.2 18.4 3.4 12.6l1.7-1.7 4.1 4.1 9.7-9.7 1.7 1.7z" />
                  </svg>
                  Rules accepted
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="text-left text-sm font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600 sm:text-right"
                >
                  ← Back to rules
                </button>
              </div>

              <p className="mt-5 text-center text-sm text-navy-900/65">{PANEL_TITLES[id].blurb}</p>

              <div className="mt-5 rounded-3xl border border-gold-500/25 bg-white p-5 shadow-[0_20px_50px_-34px_rgba(16,31,92,0.5)] sm:p-8">
                <Panel id={id} />
              </div>
            </div>
          )}
        </section>

        {/* ————— everything else, collapsed ————— */}
        <section className="bg-cream-100 px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-[11px] font-semibold tracking-[0.28em] text-gold-600 uppercase">
              More about this competition
            </p>
            <div className="mt-6 space-y-3">
              <Accordion title={`What is ${a.name}?`} eyebrow="Overview" accent={a.accent}>
                <p className="font-display text-lg italic leading-snug text-navy-800">{a.tagline}</p>
                {a.about.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-navy-900/75">{p}</p>
                ))}
              </Accordion>

              <Accordion title="How to participate" eyebrow="Step by step" accent={a.accent}>
                <ol className="space-y-3">
                  {a.steps.map((s, i) => (
                    <li key={s.title} className="flex gap-3.5">
                      <span
                        className="font-display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ background: a.accent }}
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
              </Accordion>

              <Accordion title="Timeline" eyebrow="Key dates" accent={a.accent}>
                <ol>
                  {a.timeline.map((t) => (
                    <li key={t.period} className="relative border-l-2 border-gold-500/30 pb-5 pl-5 last:border-transparent last:pb-0">
                      <span
                        className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white"
                        style={{ background: a.accent }}
                      />
                      <p className="text-xs font-bold tracking-wider text-gold-600 uppercase">{t.period}</p>
                      <p className="mt-0.5 text-sm text-navy-900/75">{t.event}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-xs text-navy-900/45">
                  The Competition Committee may revise dates; the portal schedule is final.
                </p>
              </Accordion>

              {step === 2 && (
                <Accordion title="Rules &amp; guidelines" eyebrow="The full list" accent={a.accent}>
                  <RulesBody a={a} />
                </Accordion>
              )}
            </div>

            <div className="mt-8 text-center">
              <GoldButton onClick={goToParticipate}>Start your entry →</GoldButton>
            </div>
          </div>
        </section>

        {/* ————— footer strip ————— */}
        <footer className="border-t border-gold-500/20 bg-navy-950 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
            <p className="text-xs text-cream-100/50">
              LearnGeeta · Swarnim Varg · Golden Batch 50 — © {new Date().getFullYear()} Geeta Pariwar
            </p>
            <Link href="/competitions" className="text-xs font-semibold text-gold-400 hover:text-gold-300">
              ← All competitions
            </Link>
          </div>
        </footer>
      </main>

      {/* ————— rules modal (from the hero) ————— */}
      <Modal
        open={rulesOpen}
        onClose={closeRules}
        title={`${a.name} — Rules`}
        subtitle={a.subtitle}
        accent={a.accent}
        footer={
          <GoldButton
            full
            onClick={() => { setAccepted(true); setRulesOpen(false); setStep(2); }}
          >
            I understand — take me to my entry
          </GoldButton>
        }
      >
        <RulesBody a={a} />
      </Modal>
    </>
  );
}
