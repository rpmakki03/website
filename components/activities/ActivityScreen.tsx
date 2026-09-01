"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { ACTIVITIES, AGE_GROUPS, type Activity } from "@/lib/activities";
import { Chip, Modal, SectionEyebrow, SectionTitle } from "@/components/activities/ui";
import { ChitrakalaPanel, GyanPanel, ReelPanel, VivechanPanel } from "@/components/activities/panels";

const PANEL_TITLES: Record<Activity["id"], { title: string; blurb: string }> = {
  chitrakala: { title: "Submit Your Artwork", blurb: "Upload a clear photo of your handmade artwork with its statement." },
  swar: { title: "Submit Your Reels", blurb: "Add every eligible reel you have published — with its Adhyaya, Shloka and language." },
  gyan: { title: "Take the Challenge", blurb: "Warm up in the Practice Zone, then give your one scored attempt in the Official Window." },
  expression: { title: "Submit Your Reels", blurb: "Add every eligible reflection reel you have published." },
  vivechan: { title: "Submit Your Entry", blurb: "Pick your approved source, then submit your published reel and master file." },
};

function Panel({ id, rulesAccepted }: { id: Activity["id"]; rulesAccepted: boolean }) {
  switch (id) {
    case "chitrakala": return <ChitrakalaPanel rulesAccepted={rulesAccepted} />;
    case "swar": return <ReelPanel kind="swar" rulesAccepted={rulesAccepted} />;
    case "gyan": return <GyanPanel rulesAccepted={rulesAccepted} />;
    case "expression": return <ReelPanel kind="expression" rulesAccepted={rulesAccepted} />;
    case "vivechan": return <VivechanPanel rulesAccepted={rulesAccepted} />;
  }
}

export default function ActivityScreen({ id }: { id: Activity["id"] }) {
  const a = ACTIVITIES[id];
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const closeRules = useCallback(() => setRulesOpen(false), []);

  return (
    <>
      <Header />
      <main className="bg-cream-50 text-center">
        {/* ————— sub-hero ————— */}
        <section
          className="relative overflow-hidden pt-28 pb-14 sm:pt-36"
          style={{ background: `linear-gradient(165deg, ${a.accent}14, transparent 55%)` }}
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <nav className="text-xs text-navy-900/50" aria-label="Breadcrumb">
              <Link href="/competitions" className="hover:text-gold-600">Swarnim Varg Competitions</Link>
              <span className="mx-2">/</span>
              <span className="text-navy-800">{a.name}</span>
            </nav>
            <h1 className="font-display mt-4 text-4xl font-semibold text-navy-900 sm:text-6xl">{a.name}</h1>
            <p className="mt-2 text-lg font-medium" style={{ color: a.accent }}>{a.subtitle}</p>
            <p className="font-display mx-auto mt-4 max-w-2xl text-xl italic text-navy-800/80">{a.tagline}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {a.chips.map((c) => <Chip key={c} accent={a.accent}>{c}</Chip>)}
            </div>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="#participate"
                className="bg-goldgrad rounded-full px-9 py-3.5 text-center text-sm font-semibold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform hover:scale-[1.04]"
              >
                Participate Now
              </a>
              <button
                onClick={() => setRulesOpen(true)}
                className="rounded-full border-2 border-navy-800/25 px-9 py-[13px] text-center text-sm font-semibold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
              >
                Rules &amp; Guidelines
              </button>
            </div>
          </div>
        </section>

        {/* ————— evaluation band ————— */}
        <section className="border-y border-gold-500/20 bg-navy-900">
          <div className="mx-auto grid max-w-4xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
            {a.evaluation.map((e) => (
              <div key={e.label}>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-gold-300 uppercase">{e.label}</p>
                <p className="mt-1 text-sm font-medium text-cream-50">{e.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ————— about ————— */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionEyebrow>About the Competition</SectionEyebrow>
          <SectionTitle>What is {a.name}?</SectionTitle>
          {a.about.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-navy-900/70">{p}</p>
          ))}

          <div className="mt-12">
            <SectionEyebrow>{a.openToAll ? "Eligibility" : "Age Categories"}</SectionEyebrow>
            {a.openToAll ? (
              <div className="mx-auto mt-4 max-w-xl rounded-2xl border border-gold-500/25 bg-white p-6">
                <h3 className="font-display text-xl font-semibold text-navy-900">Open to All</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
                  All ages and all countries — no age-category judging. Professional editors,
                  students, volunteers and first-time editors are equally welcome. Participants
                  under 18 need parent/guardian consent.
                </p>
              </div>
            ) : (
              <ul className="mt-5 flex flex-wrap justify-center gap-3">
                {AGE_GROUPS.map((g) => (
                  <li key={g.varg} className="rounded-2xl border border-gold-500/25 bg-white px-5 py-3">
                    <p className="font-display text-base font-semibold text-navy-900">{g.varg}</p>
                    <p className="mt-0.5 text-xs text-navy-900/60">{g.range}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ————— how it works ————— */}
        <section id="how" className="bg-cream-100 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <SectionEyebrow>Step by Step</SectionEyebrow>
            <SectionTitle>How to Participate</SectionTitle>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {a.steps.map((s, i) => (
                <li key={s.slice(0, 24)} className="rounded-2xl border border-gold-500/20 bg-cream-50 p-6">
                  <span
                    className="font-display mx-auto flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{ background: a.accent }}
                  >
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/75">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ————— rules gate + participate ————— */}
        <section id="participate" className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionEyebrow>Participate</SectionEyebrow>
          <SectionTitle>{PANEL_TITLES[id].title}</SectionTitle>
          <p className="mx-auto mt-3 max-w-xl text-sm text-navy-900/65">{PANEL_TITLES[id].blurb}</p>

          {/* rules acknowledgement */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-gold-500/30 bg-white p-5 sm:p-6">
            <p className="text-sm text-navy-900/70">
              Please read the complete rules for {a.name} before you submit.
            </p>
            <button
              onClick={() => setRulesOpen(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-gold-500/50 px-6 py-2.5 text-sm font-semibold text-gold-700 transition-colors hover:bg-gold-500/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M4 3h11l5 5v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm10 1.5V9h4.5zM7 12h10v1.6H7zm0 4h10v1.6H7z" />
              </svg>
              View Rules &amp; Guidelines
            </button>
            <label className="mt-5 flex cursor-pointer items-start justify-center gap-3 rounded-xl bg-cream-100 px-4 py-3.5 text-left">
              <input
                type="checkbox"
                checked={rulesAccepted}
                onChange={(e) => setRulesAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold-600"
              />
              <span className="text-sm font-medium text-navy-800">
                I have read and understood the Rules &amp; Guidelines.
              </span>
            </label>
          </div>

          <div className="mt-8 rounded-3xl border border-gold-500/25 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(16,31,92,0.4)] sm:p-10">
            <Panel id={id} rulesAccepted={rulesAccepted} />
          </div>
        </section>

        {/* ————— timeline, below the submission ————— */}
        <section className="bg-cream-100 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <SectionEyebrow>Key Dates</SectionEyebrow>
            <SectionTitle>Timeline</SectionTitle>
            <ol className="mt-8 space-y-0 text-left">
              {a.timeline.map((t) => (
                <li key={t.period} className="relative border-l-2 border-gold-500/30 pb-6 pl-6 last:border-transparent last:pb-0">
                  <span
                    className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-cream-100"
                    style={{ background: a.accent }}
                  />
                  <p className="text-xs font-semibold tracking-wider text-gold-600 uppercase">{t.period}</p>
                  <p className="mt-0.5 text-sm text-navy-900/75">{t.event}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-navy-900/45">
              The Competition Committee may revise dates; the official portal schedule is final.
            </p>
          </div>
        </section>

        {/* ————— footer strip ————— */}
        <footer className="border-t border-gold-500/20 bg-navy-950 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
            <p className="text-xs text-cream-100/50">
              LearnGeeta · Swarnim Varg · Golden Batch 50 — © {new Date().getFullYear()} Geeta Pariwar
            </p>
            <Link href="/competitions" className="text-xs font-semibold text-gold-400 hover:text-gold-300">
              ← All competitions
            </Link>
          </div>
        </footer>
      </main>

      {/* ————— rules modal ————— */}
      <Modal
        open={rulesOpen}
        onClose={closeRules}
        title={`${a.name} — Rules & Guidelines`}
        subtitle={a.subtitle}
      >
        <section>
          <h3 className="text-sm font-bold tracking-wide text-emerald-600 uppercase">Encouraged</h3>
          <ul className="mt-3 space-y-2.5">
            {a.dos.map((d) => (
              <li key={d.slice(0, 24)} className="flex gap-2.5 text-sm leading-relaxed text-navy-900/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />{d}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7 border-t border-navy-900/10 pt-6">
          <h3 className="text-sm font-bold tracking-wide text-red-600/80 uppercase">Not Eligible</h3>
          <ul className="mt-3 space-y-2.5">
            {a.donts.map((d) => (
              <li key={d.slice(0, 24)} className="flex gap-2.5 text-sm leading-relaxed text-navy-900/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/70" />{d}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7 border-t border-navy-900/10 pt-6">
          <h3 className="text-sm font-bold tracking-wide text-navy-800 uppercase">Evaluation</h3>
          <dl className="mt-3 space-y-2">
            {a.evaluation.map((e) => (
              <div key={e.label} className="flex flex-wrap gap-x-3 text-sm">
                <dt className="font-semibold text-navy-800">{e.label}:</dt>
                <dd className="text-navy-900/75">{e.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-7 border-t border-navy-900/10 pt-6">
          <h3 className="text-sm font-bold tracking-wide text-navy-800 uppercase">
            {a.openToAll ? "Eligibility" : "Age Categories"}
          </h3>
          {a.openToAll ? (
            <p className="mt-3 text-sm leading-relaxed text-navy-900/75">
              Open to all ages and all countries — no age-category judging. Participants under 18
              need parent/guardian consent.
            </p>
          ) : (
            <ul className="mt-3 space-y-1.5">
              {AGE_GROUPS.map((g) => (
                <li key={g.varg} className="flex justify-between gap-4 text-sm">
                  <span className="font-medium text-navy-800">{g.varg}</span>
                  <span className="text-navy-900/65">{g.range}</span>
                </li>
              ))}
            </ul>
          )}
          {!a.openToAll && (
            <p className="mt-3 text-xs text-navy-900/55">
              Age is taken as on the submission closing date. Participants under 18 need
              parent/guardian consent.
            </p>
          )}
        </section>

        <div className="mt-8 flex flex-col gap-3 border-t border-navy-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={rulesAccepted}
              onChange={(e) => setRulesAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-gold-600"
            />
            <span className="text-sm font-medium text-navy-800">
              I have read and understood the Rules &amp; Guidelines.
            </span>
          </label>
          <button
            onClick={closeRules}
            className="bg-goldgrad shrink-0 rounded-full px-7 py-3 text-sm font-semibold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform hover:scale-[1.03]"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
