"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/** Small shared pieces for the activity screens — same tokens as the landing page. */

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase">{children}</p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">{children}</h2>
  );
}

export function Chip({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className="rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap"
      style={{
        borderColor: `${accent ?? "#b9821c"}55`,
        background: `${accent ?? "#b9821c"}12`,
        color: accent ?? "#96660f",
      }}
    >
      {children}
    </span>
  );
}

export function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-left text-xs font-semibold tracking-wide text-navy-800 uppercase">
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-navy-900/15 bg-cream-50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/35 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40";

export function GoldButton({
  children,
  onClick,
  type = "button",
  disabled,
  full,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  full?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-goldgrad rounded-full px-8 py-3.5 text-sm font-semibold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}

/* ————————————————— modal ————————————————— */

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // lock background scroll while the dialog is up
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-gold-500/30 bg-cream-50 shadow-[0_40px_90px_-30px_rgba(10,22,56,0.7)] sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gold-500/20 bg-white px-6 py-5 text-left sm:px-8">
          <div>
            <h2 id={titleId} className="font-display text-2xl font-semibold text-navy-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-navy-900/60">{subtitle}</p>}
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-navy-900/50 transition-colors hover:bg-cream-200 hover:text-navy-900 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 text-left sm:px-8">{children}</div>
      </div>
    </div>
  );
}

/* ————————————————— submitted state ————————————————— */

export type Detail = { label: string; value: string };

export function SubmittedCard({
  entryId,
  note,
  details,
  onReset,
}: {
  entryId: string;
  note: string;
  details: Detail[];
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/12">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-emerald-600" aria-hidden="true">
            <path d="M9.2 18.4 3.4 12.6l1.7-1.7 4.1 4.1 9.7-9.7 1.7 1.7z" />
          </svg>
        </span>
        <h3 className="font-display mt-5 text-3xl font-semibold text-navy-900">You have submitted</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{note}</p>
        <p className="mx-auto mt-4 w-fit rounded-full bg-cream-100 px-4 py-1.5 font-mono text-xs text-navy-800">
          Entry ID · {entryId}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GoldButton onClick={() => setOpen(true)}>View Submission</GoldButton>
          <button
            onClick={onReset}
            className="rounded-full border-2 border-navy-800/25 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            Submit another entry
          </button>
        </div>
        <p className="mt-5 text-[11px] text-navy-900/45">
          Mock submission — no backend is connected yet.
        </p>
      </div>

      <Modal open={open} onClose={close} title="Your Submission" subtitle={`Entry ID · ${entryId}`}>
        <dl className="divide-y divide-navy-900/10">
          {details.map((d) => (
            <div key={d.label} className="grid gap-1 py-3.5 sm:grid-cols-[180px_1fr] sm:gap-4">
              <dt className="text-xs font-semibold tracking-wide text-navy-800 uppercase">{d.label}</dt>
              <dd className="text-sm break-words text-navy-900/75">{d.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-xl border border-gold-500/25 bg-gold-500/5 px-4 py-3 text-xs text-navy-900/70">
          Keep your Entry ID safe — you will need it to track results once the portal goes live.
        </div>
      </Modal>
    </>
  );
}

/** Shown in place of a submit button while the rules tick is unchecked. */
export function RulesGateHint() {
  return (
    <p className="text-center text-xs font-medium text-gold-700">
      Tick “I have read the Rules &amp; Guidelines” above to enable submission.
    </p>
  );
}
