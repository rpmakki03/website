"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/** Small shared pieces for the activity screens — same tokens as the landing page. */

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-600 uppercase sm:text-xs">{children}</p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-2 text-[28px] leading-tight font-bold text-navy-900 sm:text-4xl">{children}</h2>
  );
}

export function Chip({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap sm:px-3.5 sm:text-xs"
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

/* 16px minimum on inputs — anything smaller makes iOS Safari zoom the page on
   focus, which then leaves the user scrolled sideways. */
export const inputCls =
  "w-full rounded-xl border border-navy-900/15 bg-cream-50 px-4 py-3.5 text-base text-navy-900 placeholder:text-navy-900/35 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 sm:text-sm";

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
      className={`bg-goldgrad min-h-[52px] rounded-full px-8 py-3.5 text-[15px] font-bold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.9)] transition-transform active:scale-[0.98] sm:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 disabled:sm:hover:scale-100 ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  full,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-h-[52px] rounded-full border-2 border-navy-800/25 px-8 py-3 text-[15px] font-bold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600 disabled:opacity-40 ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}

/* ————————————————— accordion —————————————————
 * Long SOP sections (About / Steps / Timeline / Recognition) collapse into
 * these so a phone sees a short list of headings instead of a wall of text.
 * Built on <details> so it works before hydration and stays keyboard- and
 * screen-reader-native.
 */

export function Accordion({
  title,
  eyebrow,
  defaultOpen = false,
  accent = "#b9821c",
  children,
}: {
  title: string;
  eyebrow?: string;
  defaultOpen?: boolean;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-2xl border border-gold-500/25 bg-white shadow-[0_10px_30px_-24px_rgba(16,31,92,0.5)] open:shadow-[0_18px_45px_-28px_rgba(16,31,92,0.55)]"
    >
      <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          {eyebrow && (
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold-600 uppercase">
              {eyebrow}
            </span>
          )}
          <span className="font-display block text-lg font-bold text-navy-900 sm:text-xl">{title}</span>
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-open:rotate-180"
          style={{ background: `${accent}1a`, color: accent }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12 15.5 5.5 9l1.4-1.4L12 12.7l5.1-5.1L18.5 9z" />
          </svg>
        </span>
      </summary>
      <div className="border-t border-gold-500/15 px-5 pb-6 pt-5">{children}</div>
    </details>
  );
}

/* ————————————————— modal / bottom sheet —————————————————
 * On phones this is a bottom sheet (thumb-reachable close, rounded top,
 * safe-area padding); from sm up it becomes a centred dialog.
 */

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  accent,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accent?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
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
        className="animate-sheet-up flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-gold-500/30 bg-cream-50 shadow-[0_40px_90px_-30px_rgba(10,22,56,0.7)] sm:max-h-[88vh] sm:rounded-3xl"
      >
        {/* grab handle — a phone affordance only */}
        <span className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-navy-900/15 sm:hidden" aria-hidden="true" />

        <div
          className="flex items-start justify-between gap-4 border-b border-gold-500/20 bg-white px-5 py-4 text-left sm:px-8 sm:py-5"
          style={accent ? { background: `linear-gradient(160deg, ${accent}12, #ffffff 70%)` } : undefined}
        >
          <div className="min-w-0">
            <h2 id={titleId} className="font-display text-xl font-bold text-navy-900 sm:text-2xl">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-navy-900/60">{subtitle}</p>}
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy-900/50 transition-colors hover:bg-cream-200 hover:text-navy-900 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 py-5 text-left sm:px-8 sm:py-6">{children}</div>

        {footer && (
          <div className="shrink-0 border-t border-navy-900/10 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
            {footer}
          </div>
        )}
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
        <h3 className="font-display mt-5 text-2xl font-bold text-navy-900 sm:text-3xl">Entry received</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{note}</p>
        <p className="mx-auto mt-4 w-fit rounded-full bg-cream-100 px-4 py-1.5 font-mono text-xs text-navy-800">
          Entry ID · {entryId}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GoldButton onClick={() => setOpen(true)}>View Submission</GoldButton>
          <GhostButton onClick={onReset}>Submit another</GhostButton>
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
