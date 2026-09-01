"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { QUIZ_QUESTIONS } from "@/lib/activities";
import { GoldButton } from "@/components/activities/ui";

const OFFICIAL_SECONDS = 35 * 60;

function fmt(s: number) {
  const m = Math.floor(s / 60), r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export default function QuizScreen() {
  const params = useSearchParams();
  const official = params.get("mode") === "official";

  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUIZ_QUESTIONS.map(() => null));
  const [secondsLeft, setSecondsLeft] = useState(OFFICIAL_SECONDS);
  const [copied, setCopied] = useState(false);

  // countdown only during an official attempt
  useEffect(() => {
    if (phase !== "quiz" || !official) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { setPhase("result"); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, official]);

  const q = QUIZ_QUESTIONS[current];
  const chosen = answers[current];
  const answered = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>((n, a, i) => n + (a === QUIZ_QUESTIONS[i].answer ? 1 : 0), 0);

  const select = (i: number) => {
    // practice reveals the answer immediately, so lock the first choice
    if (!official && chosen !== null) return;
    setAnswers((all) => all.map((a, j) => (j === current ? i : a)));
  };

  const shareScore = async () => {
    const text = `॥ स्वर्णिम वर्ग ॥ I scored ${score}/${QUIZ_QUESTIONS.length} in the Geeta Gyan Challenge — LearnGeeta Golden Batch 50! Join at joingeeta.com`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
  };

  /* ————— intro ————— */
  if (phase === "intro") {
    return (
      <Shell official={official}>
        <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/25 bg-white p-8 text-center shadow-[0_20px_50px_-30px_rgba(16,31,92,0.4)] sm:p-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase">
            {official ? "Official Round" : "Practice Zone"}
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">
            {official ? "One Golden Attempt" : "Warm Up Freely"}
          </h1>
          <ul className="mx-auto mt-6 max-w-sm space-y-2.5 text-left text-sm text-navy-900/75">
            <li className="flex gap-2"><Dot />{QUIZ_QUESTIONS.length} sample questions · single-answer MCQs</li>
            {official ? (
              <>
                <li className="flex gap-2"><Dot />35-minute countdown — the attempt auto-submits at 00:00</li>
                <li className="flex gap-2"><Dot />Correct answers reveal only after the window closes</li>
                <li className="flex gap-2"><Dot />You can revisit and change answers before submitting</li>
              </>
            ) : (
              <>
                <li className="flex gap-2"><Dot />Instant feedback after every answer</li>
                <li className="flex gap-2"><Dot />No timer, unlimited attempts — scores never count</li>
              </>
            )}
          </ul>
          <div className="mt-8">
            <GoldButton onClick={() => setPhase("quiz")}>
              {official ? "Begin Official Attempt" : "Begin Practice"}
            </GoldButton>
          </div>
          <p className="mt-4 text-[11px] text-navy-900/45">Demo question set — the full 50-question bank arrives with the backend.</p>
        </div>
      </Shell>
    );
  }

  /* ————— result ————— */
  if (phase === "result") {
    const pct = Math.round((100 * score) / QUIZ_QUESTIONS.length);
    return (
      <Shell official={official}>
        <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/25 bg-white p-8 text-center shadow-[0_20px_50px_-30px_rgba(16,31,92,0.4)] sm:p-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase">
            {official ? "Provisional Score Card" : "Practice Result"}
          </p>
          <div
            className="font-display mx-auto mt-6 flex h-36 w-36 items-center justify-center rounded-full text-5xl font-bold text-navy-900"
            style={{ background: `conic-gradient(#d6a02f ${pct * 3.6}deg, #f1e9d6 0deg)` }}
          >
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white">
              {score}<span className="text-2xl text-navy-900/40">/{QUIZ_QUESTIONS.length}</span>
            </span>
          </div>
          <h1 className="font-display mt-5 text-3xl font-semibold text-navy-900">
            {pct >= 80 ? "उत्तम! Outstanding" : pct >= 50 ? "साधु! Well done" : "Keep practising!"}
          </h1>
          <p className="mt-2 text-sm text-navy-900/65">
            {official
              ? `You answered ${answered} of ${QUIZ_QUESTIONS.length} questions. Correct answers reveal after the competition window closes.`
              : `You scored ${pct}% — practice as many times as you like.`}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GoldButton onClick={shareScore}>{copied ? "Copied to clipboard ✓" : "Share Score Card"}</GoldButton>
            <button
              onClick={() => { setPhase("intro"); setCurrent(0); setAnswers(QUIZ_QUESTIONS.map(() => null)); setSecondsLeft(OFFICIAL_SECONDS); }}
              className="rounded-full border-2 border-navy-800/25 px-7 py-3 text-sm font-semibold text-navy-800 hover:border-gold-500 hover:text-gold-600"
            >
              {official ? "Back to start" : "Practise Again"}
            </button>
          </div>
          <Link href="/competitions/gyan" className="mt-6 inline-block text-sm font-semibold text-gold-600 hover:text-gold-700">
            ← Back to Geeta Gyan Challenge
          </Link>
        </div>
      </Shell>
    );
  }

  /* ————— quiz ————— */
  return (
    <Shell official={official}>
      <div className="mx-auto max-w-3xl">
        {/* status bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-navy-900/70">
            Question <span className="font-display text-lg font-bold text-navy-900">{current + 1}</span> / {QUIZ_QUESTIONS.length}
          </p>
          {official ? (
            <p className={`rounded-full px-4 py-1.5 font-mono text-sm font-semibold ${secondsLeft < 300 ? "bg-red-600/10 text-red-600" : "bg-navy-900/5 text-navy-800"}`}>
              ⏱ {fmt(secondsLeft)}
            </p>
          ) : (
            <p className="rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-600">Practice · instant feedback</p>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-900/10">
          <div className="bg-goldgrad h-full transition-all duration-500" style={{ width: `${(100 * answered) / QUIZ_QUESTIONS.length}%` }} />
        </div>

        {/* question card */}
        <div className="mt-6 rounded-3xl border border-gold-500/25 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(16,31,92,0.4)] sm:p-10">
          <h2 className="font-display text-xl font-semibold leading-relaxed text-navy-900 sm:text-2xl">{q.q}</h2>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const isChosen = chosen === i;
              const showState = !official && chosen !== null;
              const isCorrect = i === q.answer;
              let cls = "border-navy-900/15 bg-cream-50 hover:border-gold-500";
              if (showState && isCorrect) cls = "border-emerald-600 bg-emerald-600/10";
              else if (showState && isChosen && !isCorrect) cls = "border-red-500 bg-red-500/10";
              else if (isChosen) cls = "border-gold-500 bg-gold-500/10";
              return (
                <button
                  key={opt}
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-5 py-3.5 text-left text-sm font-medium text-navy-900 transition-colors ${cls}`}
                >
                  <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy-900/20 text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {showState && isCorrect && <span className="ml-auto text-emerald-600">✓</span>}
                  {showState && isChosen && !isCorrect && <span className="ml-auto text-red-500">✕</span>}
                </button>
              );
            })}
          </div>
          {!official && chosen !== null && (
            <p className="mt-5 rounded-xl bg-cream-100 px-4 py-3 text-sm text-navy-900/75">
              <span className="font-semibold text-gold-700">Why: </span>{q.ref}
            </p>
          )}
        </div>

        {/* palette + nav — stacked so phones never crowd */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start" aria-label="Question palette">
            {QUIZ_QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to question ${i + 1}`}
                className={`h-9 w-9 rounded-lg text-xs font-bold transition-colors ${
                  i === current ? "bg-navy-900 text-gold-300"
                  : answers[i] !== null ? "bg-goldgrad text-navy-900"
                  : "bg-navy-900/10 text-navy-800 hover:bg-navy-900/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex-1 rounded-full border-2 border-navy-800/25 px-6 py-3 text-sm font-semibold text-navy-800 hover:border-gold-500 hover:text-gold-600 disabled:opacity-35 sm:flex-none"
            >
              ← Previous
            </button>
            {current < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="flex-1 rounded-full border-2 border-navy-800/25 px-6 py-3 text-sm font-semibold text-navy-800 hover:border-gold-500 hover:text-gold-600 sm:flex-none"
              >
                Next →
              </button>
            ) : (
              <div className="flex-1 sm:flex-none">
                <GoldButton onClick={() => setPhase("result")}>Submit Attempt</GoldButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Dot() {
  return <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />;
}

function Shell({ official, children }: { official: boolean; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <div className="mx-auto mb-6 max-w-3xl">
          <nav className="text-xs text-navy-900/50" aria-label="Breadcrumb">
            <Link href="/competitions" className="hover:text-gold-600">Competitions</Link>
            <span className="mx-2">/</span>
            <Link href="/competitions/gyan" className="hover:text-gold-600">Geeta Gyan Challenge</Link>
            <span className="mx-2">/</span>
            <span className="text-navy-800">{official ? "Official Round" : "Practice Zone"}</span>
          </nav>
        </div>
        {children}
      </main>
    </>
  );
}
