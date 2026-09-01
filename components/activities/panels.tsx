"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LANGUAGES, TIMESTAMP_BANK, ageFromDob, vargForDob } from "@/lib/activities";
import {
  type Detail, GhostButton, GoldButton, inputCls, Label, SubmittedCard,
} from "@/components/activities/ui";

const mockId = () => `SV50-${Math.floor(100000 + Math.random() * 900000)}`;

/* ————— date of birth —————
 * The age category is never shown as a list to choose from; participants
 * give their date of birth and the varg is derived from it silently.
 */

function DobField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const age = ageFromDob(value);
  const varg = vargForDob(value);
  return (
    <div>
      <Label htmlFor="dob">Date of birth</Label>
      <input
        id="dob"
        type="date"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={new Date().toISOString().slice(0, 10)}
        className={inputCls}
      />
      <p className="mt-1.5 text-xs text-navy-900/55">
        {varg
          ? `You are ${age} — we will place you in the right category automatically.`
          : "Used only to place you in the right category."}
      </p>
    </div>
  );
}

/** Consent line — shown to everyone, worded for the under-18 case. */
function ConsentBox({ children }: { children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-cream-100 px-4 py-3.5 text-[13px] leading-relaxed text-navy-900/75">
      <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-gold-600" />
      {children}
    </label>
  );
}

/* ————— Geeta Chitrakala: artwork upload ————— */

export function ChitrakalaPanel() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [statement, setStatement] = useState("");
  const [dob, setDob] = useState("");
  const [entry, setEntry] = useState<{ id: string; details: Detail[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (entry) {
    return (
      <SubmittedCard
        entryId={entry.id}
        note="Your artwork and statement have been recorded for evaluation."
        details={entry.details}
        onReset={() => {
          setEntry(null); setPreview(null); setFileName(""); setStatement(""); setDob("");
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
            { label: "Category", value: vargForDob(dob)?.varg ?? "—" },
            { label: "Artwork file", value: fileName },
            { label: "मेरे चित्र का भाव", value: statement },
            { label: "Submitted on", value: new Date().toLocaleString() },
          ],
        });
      }}
    >
      {/* the upload is the point of this screen, so it leads */}
      <div>
        <Label>Your artwork</Label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gold-500/40 bg-cream-50 p-6 transition-colors hover:border-gold-500 hover:bg-cream-100 sm:min-h-64"
        >
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Artwork preview" className="max-h-56 rounded-xl object-contain" />
              <span className="text-xs text-navy-900/60">{fileName} — tap to replace</span>
            </>
          ) : (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/12">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-gold-600" aria-hidden="true">
                  <path d="M19 13v6H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6zM11 6.8 8.4 9.4 7 8l5-5 5 5-1.4 1.4L13 6.8V16h-2z" />
                </svg>
              </span>
              <span className="text-base font-bold text-navy-900">Upload a photo of your artwork</span>
              <span className="text-xs text-navy-900/55">JPG or PNG · handmade artwork only</span>
            </>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>

      <div className="flex flex-col gap-5">
        <DobField value={dob} onChange={setDob} />
        <div className="flex-1">
          <Label htmlFor="ck-statement">मेरे चित्र का भाव — your statement</Label>
          <textarea
            id="ck-statement" required rows={5} maxLength={500}
            value={statement} onChange={(e) => setStatement(e.target.value)}
            placeholder="Which Geeta thought does your artwork express, and how?"
            className={`${inputCls} resize-none`}
          />
          <p className="mt-1 text-right text-[11px] text-navy-900/45">{statement.length}/500</p>
        </div>
        <ConsentBox>
          This artwork is my own original creation. If I am under 18, a parent or guardian has consented.
        </ConsentBox>
        <GoldButton type="submit" full disabled={!preview || !dob}>Submit artwork</GoldButton>
      </div>
    </form>
  );
}

/* ————— Reel submission (Geeta Swar & Geeta Expression) ————— */

type Reel = { url: string; meta: string };

export function ReelPanel({ kind }: { kind: "swar" | "expression" }) {
  const [url, setUrl] = useState("");
  const [adhyaya, setAdhyaya] = useState("");
  const [shloka, setShloka] = useState("");
  const [thought, setThought] = useState("");
  const [language, setLanguage] = useState("");
  const [dob, setDob] = useState("");
  const [reels, setReels] = useState<Reel[]>([]);
  const [entry, setEntry] = useState<{ id: string; details: Detail[] } | null>(null);
  const isSwar = kind === "swar";

  if (entry) {
    return (
      <SubmittedCard
        entryId={entry.id}
        note="Your strongest eligible reel becomes your entry when the window closes."
        details={entry.details}
        onReset={() => { setEntry(null); setReels([]); setDob(""); }}
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
      { label: "Category", value: vargForDob(dob)?.varg ?? "—" },
      { label: "Reels submitted", value: String(reels.length) },
      ...reels.map((r, i) => ({ label: `Reel ${i + 1}`, value: `${r.url} — ${r.meta}` })),
      { label: "Submitted on", value: new Date().toLocaleString() },
    ],
  });

  return (
    <div className="space-y-6 text-left">
      {/* the reel link is the primary action — first field on the screen */}
      <div className="rounded-2xl border border-gold-500/25 bg-cream-50 p-4 sm:p-5">
        <Label htmlFor="reel-url">Your published Reel link</Label>
        <input
          id="reel-url" type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.instagram.com/reel/…" className={inputCls}
        />
        {url && !valid && <p className="mt-1.5 text-xs font-medium text-red-600">Paste a public instagram.com/reel/… link</p>}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                  id="reel-shloka" type="number" inputMode="numeric" min={1} max={78} value={shloka}
                  onChange={(e) => setShloka(e.target.value)} placeholder="e.g. 47" className={inputCls}
                />
              </div>
            </>
          ) : (
            <div className="sm:col-span-2">
              <Label htmlFor="reel-thought">Your central Geeta thought</Label>
              <input
                id="reel-thought" value={thought} onChange={(e) => setThought(e.target.value)}
                placeholder="e.g. Nishkama Karma in my exams" className={inputCls}
              />
            </div>
          )}

          <div className={isSwar ? "sm:col-span-2" : ""}>
            <Label htmlFor="reel-lang">{isSwar ? "Explanation language" : "Reel language"}</Label>
            <select id="reel-lang" value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
              <option value="" disabled>Select…</option>
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <GhostButton full onClick={addReel} disabled={!valid || !metaOk}>+ Add this reel</GhostButton>
          <p className="mt-2 text-center text-xs text-navy-900/55">
            Add as many reels as you like — your best one is taken.
          </p>
        </div>
      </div>

      {reels.length > 0 && (
        <ul className="space-y-2.5">
          {reels.map((r, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-gold-500/25 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy-800">{r.url}</p>
                <p className="text-xs text-navy-900/55">{r.meta}</p>
              </div>
              <button
                type="button" aria-label="Remove reel"
                onClick={() => setReels((all) => all.filter((_, j) => j !== i))}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-navy-900/40 hover:bg-cream-100 hover:text-red-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z" /></svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <DobField value={dob} onChange={setDob} />

      <ConsentBox>
        These reels are my own work. If I am under 18, a parent or guardian has consented.
      </ConsentBox>

      <GoldButton full disabled={reels.length === 0 || !dob} onClick={submit}>
        Submit {reels.length > 0 ? `${reels.length} ` : ""}reel{reels.length !== 1 ? "s" : ""}
      </GoldButton>
    </div>
  );
}

/* ————— Geeta Gyan Challenge: single scored attempt ————— */

export function GyanPanel() {
  const [dob, setDob] = useState("");
  const [language, setLanguage] = useState("");
  const ready = !!dob && !!language;

  return (
    <div className="space-y-6 text-left">
      <div className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 sm:p-6">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-700 uppercase">12 – 20 September</p>
        <h3 className="font-display mt-1.5 text-2xl font-bold text-navy-900">One golden attempt</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-navy-900/75">
          <li className="flex gap-2.5"><Dot />50 single-answer questions across all 18 chapters</li>
          <li className="flex gap-2.5"><Dot />About 35 minutes — the attempt auto-submits at 00:00</li>
          <li className="flex gap-2.5"><Dot />You can revisit and change answers before submitting</li>
        </ul>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <DobField value={dob} onChange={setDob} />
        <div>
          <Label htmlFor="gy-lang">Quiz language</Label>
          <select id="gy-lang" value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
            <option value="" disabled>Select…</option>
            {LANGUAGES.filter((l) => l !== "Sanskrit").map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <ConsentBox>
        I will attempt this on my own, without reference material. If I am under 18, a parent or guardian has consented.
      </ConsentBox>

      <Link
        href="/competitions/gyan/quiz"
        aria-disabled={!ready}
        tabIndex={ready ? undefined : -1}
        className={`bg-goldgrad flex min-h-[52px] w-full items-center justify-center rounded-full px-8 text-[15px] font-bold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform active:scale-[0.98] ${
          ready ? "" : "pointer-events-none opacity-40"
        }`}
      >
        Begin my attempt →
      </Link>
      {!ready && (
        <p className="text-center text-xs font-medium text-gold-700">
          Fill in your date of birth and quiz language to begin.
        </p>
      )}
    </div>
  );
}

function Dot() {
  return <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />;
}

/* ————— Vivechan Reel: timestamp bank + master file ————— */

export function VivechanPanel() {
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [entry, setEntry] = useState<{ id: string; details: Detail[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (entry) {
    return (
      <SubmittedCard
        entryId={entry.id}
        note="Your reel goes through context and technical screening after the cut-off."
        details={entry.details}
        onReset={() => { setEntry(null); setSource(""); setUrl(""); setFileName(""); }}
      />
    );
  }

  const valid = /instagram\.com\/(reel|p)\//.test(url);
  const picked = TIMESTAMP_BANK.find((r) => r.sourceId === source);

  return (
    <div className="space-y-7 text-left">
      {/* 1 · source — cards on phones, a table would force sideways scrolling */}
      <div>
        <Label>1 · Choose your approved source</Label>
        <ul className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {TIMESTAMP_BANK.map((row) => {
            const on = source === row.sourceId;
            return (
              <li key={row.sourceId}>
                <button
                  type="button"
                  onClick={() => setSource(row.sourceId)}
                  aria-pressed={on}
                  className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                    on ? "border-gold-500 bg-gold-500/10" : "border-navy-900/10 bg-cream-50 hover:border-gold-500/50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      on ? "border-gold-600 bg-gold-600" : "border-navy-900/25"
                    }`}
                  >
                    {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-navy-900">{row.title}</span>
                    <span className="mt-0.5 block text-xs text-navy-900/60">
                      {row.speaker} · {row.language}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] text-navy-900/55">
                      {row.sourceId} · {row.range}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2 · reel link */}
      <div>
        <Label htmlFor="vr-url">2 · Your published Reel link</Label>
        <input
          id="vr-url" type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.instagram.com/reel/…" className={inputCls}
        />
        {url && !valid && <p className="mt-1.5 text-xs font-medium text-red-600">Paste a public instagram.com/reel/… link</p>}
      </div>

      {/* 3 · master file */}
      <div>
        <Label>3 · Upload your master file (MP4)</Label>
        <button
          type="button" onClick={() => fileRef.current?.click()}
          className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border-2 border-dashed border-gold-500/40 bg-cream-50 px-4 py-3.5 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-500"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/12">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-gold-600"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" /></svg>
          </span>
          <span className="truncate">{fileName || "Attach your master MP4…"}</span>
        </button>
        <input
          ref={fileRef} type="file" accept="video/mp4" className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </div>

      <ConsentBox>
        My edit keeps the speaker&apos;s meaning and conclusion fully intact, and uses only the permitted clip range.
        If I am under 18, a parent or guardian has consented.
      </ConsentBox>

      <GoldButton
        full
        disabled={!source || !valid || !fileName}
        onClick={() => setEntry({
          id: mockId(),
          details: [
            { label: "Competition", value: "Vivechan Reel" },
            { label: "Source", value: `${source} — ${picked?.title ?? ""}` },
            { label: "Permitted range", value: picked?.range ?? "" },
            { label: "Reel URL", value: url },
            { label: "Master file", value: fileName },
            { label: "Submitted on", value: new Date().toLocaleString() },
          ],
        })}
      >
        Submit my entry
      </GoldButton>
    </div>
  );
}
