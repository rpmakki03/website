"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AGE_GROUPS, LANGUAGES, TIMESTAMP_BANK } from "@/lib/activities";
import {
  Chip, type Detail, GoldButton, inputCls, Label, RulesGateHint, SubmittedCard,
} from "@/components/activities/ui";

const mockId = () => `SV50-${Math.floor(100000 + Math.random() * 900000)}`;

export type PanelProps = { rulesAccepted: boolean };

/* ————— Geeta Chitrakala: artwork upload ————— */

export function ChitrakalaPanel({ rulesAccepted }: PanelProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [statement, setStatement] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [entry, setEntry] = useState<{ id: string; details: Detail[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (entry) {
    return (
      <SubmittedCard
        entryId={entry.id}
        note="Your artwork and statement have been recorded for age-wise jury evaluation."
        details={entry.details}
        onReset={() => {
          setEntry(null); setPreview(null); setFileName(""); setStatement(""); setAgeGroup("");
        }}
      />
    );
  }

  const onFile = (f: File | undefined) => {
    if (!f) return;
    setFileName(f.name);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <form
      className="grid gap-6 text-left lg:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setEntry({
          id: mockId(),
          details: [
            { label: "Competition", value: "Geeta Chitrakala" },
            { label: "Age group", value: ageGroup },
            { label: "Artwork file", value: fileName },
            { label: "मेरे चित्र का भाव", value: statement },
            { label: "Submitted on", value: new Date().toLocaleString() },
          ],
        });
      }}
    >
      <div>
        <Label>Artwork photo / scan</Label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gold-500/40 bg-cream-50 p-6 transition-colors hover:border-gold-500 hover:bg-cream-100"
        >
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Artwork preview" className="max-h-56 rounded-xl object-contain" />
              <span className="text-xs text-navy-900/60">{fileName} — click to replace</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-10 w-10 fill-gold-500" aria-hidden="true">
                <path d="M19 13v6H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6zM11 6.8 8.4 9.4 7 8l5-5 5 5-1.4 1.4L13 6.8V16h-2z" />
              </svg>
              <span className="text-sm font-medium text-navy-800">Click to upload a clear photo of your artwork</span>
              <span className="text-xs text-navy-900/50">JPG or PNG · handmade physical artwork only</span>
            </>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <Label htmlFor="ck-age">Age group (varg)</Label>
          <select id="ck-age" required value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={inputCls}>
            <option value="" disabled>Select your varg…</option>
            {AGE_GROUPS.map((g) => (
              <option key={g.varg} value={g.varg}>{g.varg} — {g.range}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label htmlFor="ck-statement">मेरे चित्र का भाव — artwork statement</Label>
          <textarea
            id="ck-statement" required rows={5} maxLength={500}
            value={statement} onChange={(e) => setStatement(e.target.value)}
            placeholder="In your own words: which Geeta thought does your artwork express, and how?"
            className={`${inputCls} resize-none`}
          />
          <p className="mt-1 text-right text-[11px] text-navy-900/45">{statement.length}/500</p>
        </div>
        <label className="flex items-start gap-2.5 text-xs text-navy-900/70">
          <input type="checkbox" required className="mt-0.5 accent-gold-600" />
          This artwork is my original creation. For participants under 18, a parent/guardian has consented.
        </label>
        <div className="space-y-2.5">
          <GoldButton type="submit" full disabled={!preview || !rulesAccepted}>Submit Artwork</GoldButton>
          {!rulesAccepted && <RulesGateHint />}
        </div>
      </div>
    </form>
  );
}

/* ————— Reel submission (Geeta Swar & Geeta Expression) ————— */

type Reel = { url: string; meta: string };

export function ReelPanel({ kind, rulesAccepted }: PanelProps & { kind: "swar" | "expression" }) {
  const [url, setUrl] = useState("");
  const [adhyaya, setAdhyaya] = useState("");
  const [shloka, setShloka] = useState("");
  const [thought, setThought] = useState("");
  const [language, setLanguage] = useState("");
  const [reels, setReels] = useState<Reel[]>([]);
  const [entry, setEntry] = useState<{ id: string; details: Detail[] } | null>(null);
  const isSwar = kind === "swar";

  if (entry) {
    return (
      <SubmittedCard
        entryId={entry.id}
        note="At cut-off, your highest-reach eligible reel automatically becomes your competition entry."
        details={entry.details}
        onReset={() => { setEntry(null); setReels([]); }}
      />
    );
  }

  const valid = /instagram\.com\/(reel|p)\//.test(url);
  const metaOk = isSwar ? adhyaya && shloka && language : thought && language;

  const addReel = () => {
    setReels((r) => [...r, {
      url,
      meta: isSwar ? `Adhyaya ${adhyaya} · Shloka ${shloka} · ${language}` : `“${thought}” · ${language}`,
    }]);
    setUrl(""); setAdhyaya(""); setShloka(""); setThought("");
  };

  const submit = () => setEntry({
    id: mockId(),
    details: [
      { label: "Competition", value: isSwar ? "Geeta Swar" : "Geeta Expression" },
      { label: "Reels submitted", value: String(reels.length) },
      ...reels.map((r, i) => ({ label: `Reel ${i + 1}`, value: `${r.url} — ${r.meta}` })),
      { label: "Submitted on", value: new Date().toLocaleString() },
    ],
  });

  return (
    <div className="space-y-6 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="reel-url">Public Instagram Reel URL</Label>
          <input
            id="reel-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reel/…" className={inputCls}
          />
          {url && !valid && <p className="mt-1 text-xs text-red-600">Please paste a public instagram.com/reel/… link</p>}
        </div>

        {isSwar ? (
          <>
            <div>
              <Label htmlFor="reel-adhyaya">Adhyaya</Label>
              <select id="reel-adhyaya" value={adhyaya} onChange={(e) => setAdhyaya(e.target.value)} className={inputCls}>
                <option value="" disabled>Select…</option>
                {Array.from({ length: 18 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Adhyaya {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="reel-shloka">Shloka number</Label>
              <input
                id="reel-shloka" type="number" min={1} max={78} value={shloka}
                onChange={(e) => setShloka(e.target.value)} placeholder="e.g. 47" className={inputCls}
              />
            </div>
          </>
        ) : (
          <div>
            <Label htmlFor="reel-thought">Your central Geeta thought</Label>
            <input
              id="reel-thought" value={thought} onChange={(e) => setThought(e.target.value)}
              placeholder="e.g. Nishkama Karma in my exams" className={inputCls}
            />
          </div>
        )}

        <div>
          <Label htmlFor="reel-lang">{isSwar ? "Explanation language" : "Reel language"}</Label>
          <select id="reel-lang" value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
            <option value="" disabled>Select…</option>
            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button" onClick={addReel} disabled={!valid || !metaOk}
          className="w-full rounded-full border-2 border-navy-800/25 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          + Add this reel
        </button>
        <p className="text-center text-xs text-navy-900/55 sm:text-left">
          You may add multiple reels — the highest-reach eligible one becomes your entry.
        </p>
      </div>

      {reels.length > 0 && (
        <ul className="space-y-2.5">
          {reels.map((r, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-gold-500/25 bg-cream-50 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy-800">{r.url}</p>
                <p className="text-xs text-navy-900/55">{r.meta}</p>
              </div>
              <button
                type="button" aria-label="Remove reel"
                onClick={() => setReels((all) => all.filter((_, j) => j !== i))}
                className="text-navy-900/40 hover:text-red-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z" /></svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2.5">
        <GoldButton full disabled={reels.length === 0 || !rulesAccepted} onClick={submit}>
          Submit {reels.length > 0 ? `${reels.length} ` : ""}Reel{reels.length !== 1 ? "s" : ""}
        </GoldButton>
        {!rulesAccepted && <RulesGateHint />}
      </div>
    </div>
  );
}

/* ————— Geeta Gyan Challenge: mode launcher ————— */

export function GyanPanel({ rulesAccepted }: PanelProps) {
  const lockedCls = "pointer-events-none opacity-40";
  return (
    <div className="space-y-4">
      <div className="grid gap-6 text-left sm:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-teal-500/35 bg-teal-500/5 p-8">
          <Chip accent="#2cbfb4">4 – 11 Sep</Chip>
          <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">Practice Zone</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/70">
            Unlimited attempts with instant feedback after every question. Practice
            scores never count towards the final result — warm up freely.
          </p>
          <Link
            href="/competitions/gyan/quiz?mode=practice"
            aria-disabled={!rulesAccepted}
            tabIndex={rulesAccepted ? undefined : -1}
            className={`mt-6 w-full rounded-full border-2 border-teal-500/60 px-7 py-3 text-center text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-500/10 sm:w-fit ${rulesAccepted ? "" : lockedCls}`}
          >
            Start Practice Quiz
          </Link>
        </div>
        <div className="flex flex-col rounded-3xl border border-gold-500/40 bg-gold-500/5 p-8">
          <Chip>12 – 20 Sep</Chip>
          <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">Official Round</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/70">
            One scored attempt · 50 MCQs · about 35 minutes. Questions and options
            are randomised; answers reveal only after the window closes.
          </p>
          <Link
            href="/competitions/gyan/quiz?mode=official"
            aria-disabled={!rulesAccepted}
            tabIndex={rulesAccepted ? undefined : -1}
            className={`bg-goldgrad mt-6 w-full rounded-full px-7 py-3 text-center text-sm font-semibold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform hover:scale-[1.03] sm:w-fit ${rulesAccepted ? "" : lockedCls}`}
          >
            Start Official Attempt
          </Link>
        </div>
      </div>
      {!rulesAccepted && <RulesGateHint />}
    </div>
  );
}

/* ————— Vivechan Reel: timestamp bank + master file ————— */

export function VivechanPanel({ rulesAccepted }: PanelProps) {
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [entry, setEntry] = useState<{ id: string; details: Detail[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (entry) {
    return (
      <SubmittedCard
        entryId={entry.id}
        note="Your reel goes through context & technical screening after the reach cut-off."
        details={entry.details}
        onReset={() => { setEntry(null); setSource(""); setUrl(""); setFileName(""); }}
      />
    );
  }

  const valid = /instagram\.com\/(reel|p)\//.test(url);
  const picked = TIMESTAMP_BANK.find((r) => r.sourceId === source);

  return (
    <div className="space-y-8 text-left">
      <div>
        <Label>1 · Choose your approved source — Official Vivechan Timestamp Bank</Label>
        <div className="overflow-x-auto rounded-2xl border border-gold-500/25">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold-500/25 bg-cream-100 text-xs tracking-wider text-navy-800 uppercase">
                <th className="px-4 py-3 font-semibold">Select</th>
                <th className="px-4 py-3 font-semibold">Source ID</th>
                <th className="px-4 py-3 font-semibold">Segment</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Language</th>
                <th className="px-4 py-3 font-semibold">Permitted range</th>
              </tr>
            </thead>
            <tbody>
              {TIMESTAMP_BANK.map((row) => (
                <tr
                  key={row.sourceId}
                  onClick={() => setSource(row.sourceId)}
                  className={`cursor-pointer border-b border-navy-900/5 transition-colors last:border-0 ${
                    source === row.sourceId ? "bg-gold-500/10" : "hover:bg-cream-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="radio" name="source" checked={source === row.sourceId}
                      onChange={() => setSource(row.sourceId)} className="accent-gold-600"
                      aria-label={`Select ${row.sourceId}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-navy-800">{row.sourceId}</td>
                  <td className="px-4 py-3 font-medium text-navy-900">{row.title}</td>
                  <td className="px-4 py-3 text-navy-900/70">{row.speaker}</td>
                  <td className="px-4 py-3 text-navy-900/70">{row.language}</td>
                  <td className="px-4 py-3 font-mono text-xs text-navy-900/70">{row.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <Label htmlFor="vr-url">2 · Public Instagram Reel URL</Label>
          <input
            id="vr-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reel/…" className={inputCls}
          />
          {url && !valid && <p className="mt-1 text-xs text-red-600">Please paste a public instagram.com/reel/… link</p>}
        </div>
        <div>
          <Label>3 · Final master file (MP4)</Label>
          <button
            type="button" onClick={() => fileRef.current?.click()}
            className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-gold-500/40 bg-cream-50 px-4 py-3 text-sm text-navy-800 transition-colors hover:border-gold-500"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-gold-500"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" /></svg>
            <span className="truncate">{fileName || "Attach your master MP4…"}</span>
          </button>
          <input
            ref={fileRef} type="file" accept="video/mp4" className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-navy-900/70">
        <input type="checkbox" required className="mt-0.5 accent-gold-600" id="vr-consent" />
        My edit keeps the speaker&apos;s meaning, qualification and conclusion fully intact, and uses only the permitted clip range.
      </label>

      <div className="space-y-2.5">
        <GoldButton
          full
          disabled={!source || !valid || !fileName || !rulesAccepted}
          onClick={() => setEntry({
            id: mockId(),
            details: [
              { label: "Competition", value: "Vivechan Reel" },
              { label: "Source ID", value: `${source} — ${picked?.title ?? ""}` },
              { label: "Permitted range", value: picked?.range ?? "" },
              { label: "Reel URL", value: url },
              { label: "Master file", value: fileName },
              { label: "Submitted on", value: new Date().toLocaleString() },
            ],
          })}
        >
          Submit Reel Entry
        </GoldButton>
        {!rulesAccepted && <RulesGateHint />}
      </div>
    </div>
  );
}
