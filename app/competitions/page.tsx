import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { ACTIVITIES } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Competitions · Swarnim Varg — LearnGeeta Golden Batch 50",
  description: "All five Swarnim Varg competitions — Geeta Chitrakala, Geeta Swar, Geeta Gyan Challenge, Geeta Expression and Vivechan Reel.",
};

export default function CompetitionsHub() {
  const list = Object.values(ACTIVITIES);
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-28 pb-20 sm:pt-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase">Swarnim Varg 2026</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-navy-900 sm:text-6xl">
            Five Divine <span className="text-goldgrad font-bold">Competitions</span>
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-navy-900/70">
            Choose your path of expression — paint, recite, answer, reflect or create.
            Open each competition to see its rules, timeline and participation screen.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {list.map((a, i) => (
              <Link
                key={a.id}
                href={`/competitions/${a.id}`}
                className="group flex flex-col rounded-3xl border border-gold-500/25 bg-white p-8 shadow-[0_16px_40px_-28px_rgba(16,31,92,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_30px_60px_-30px_rgba(16,31,92,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-white" style={{ background: a.accent }}>
                    {i + 1}
                  </span>
                  <span className="text-xs font-medium text-navy-900/45">{a.chips[1]}</span>
                </div>
                <h2 className="font-display mt-5 text-2xl font-semibold text-navy-900">{a.name}</h2>
                <p className="mt-1 text-sm font-medium" style={{ color: a.accent }}>{a.subtitle}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-900/65">{a.about[0]}</p>
                <span className="mt-6 text-sm font-semibold text-gold-600 transition-colors group-hover:text-gold-700">
                  Open competition →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
