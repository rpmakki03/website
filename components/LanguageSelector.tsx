"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/locales";

function GlobeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/**
 * Language switcher styled with the existing header tokens.
 * `dropdown` sits in the desktop navbar, `compact` is the icon-only trigger
 * that fits beside the mobile hamburger, and `inline` is a flat grid.
 */
export default function LanguageSelector({
  variant = "dropdown",
}: {
  variant?: "dropdown" | "compact" | "inline";
}) {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listboxId = useId();

  const currentIndex = LOCALES.findIndex((l) => l.code === locale);
  const current = LOCALES[currentIndex] ?? LOCALES[0];

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  // move DOM focus with the active option so screen readers announce it
  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const openList = () => {
    setActiveIndex(currentIndex < 0 ? 0 : currentIndex);
    setOpen(true);
  };

  const choose = (code: Locale) => {
    setLocale(code);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % LOCALES.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + LOCALES.length) % LOCALES.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(LOCALES.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(LOCALES[activeIndex].code);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  // ——— mobile: flat grid, matching the mobile menu's button styling ———
  if (variant === "inline") {
    return (
      <div className="mt-5 border-t border-gold-500/20 pt-4">
        <p
          id={`${listboxId}-label`}
          className="mb-2 flex items-center gap-2 px-1 text-[11px] font-semibold tracking-[0.18em] text-gold-600 uppercase"
        >
          <GlobeIcon className="h-3.5 w-3.5" />
          {t("language.label")}
        </p>
        <ul
          role="listbox"
          aria-labelledby={`${listboxId}-label`}
          className="grid grid-cols-2 gap-1.5"
        >
          {LOCALES.map((l) => {
            const selected = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  lang={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "bg-goldgrad font-semibold text-navy-900"
                      : "text-navy-800 hover:bg-cream-200"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // ——— desktop dropdown, and its icon-only mobile twin ———
  const compact = variant === "compact";
  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={`${t("language.selectorAria")} — ${t("language.currentAria")}: ${current.label}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            openList();
          }
        }}
        className={
          compact
            ? "flex h-10 w-10 items-center justify-center rounded-full border border-navy-800/20 text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
            : "flex items-center gap-1.5 rounded-full border border-navy-800/20 px-3 py-2 text-sm font-medium whitespace-nowrap text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
        }
      >
        <GlobeIcon className={compact ? "h-5 w-5" : "h-4 w-4"} />
        {!compact && (
          <>
            <span lang={current.code}>{current.label}</span>
            <svg
              viewBox="0 0 12 12"
              className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path d="M1 3.5 6 8.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </>
        )}
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={t("language.selectorAria")}
          onKeyDown={onListKeyDown}
          className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-48 overflow-y-auto rounded-2xl border border-gold-500/25 bg-cream-50 py-2 shadow-[0_20px_50px_-15px_rgba(16,31,92,0.4)]"
        >
          {LOCALES.map((l, i) => {
            const selected = l.code === locale;
            return (
              <li
                key={l.code}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={selected}
                lang={l.code}
                tabIndex={-1}
                onClick={() => choose(l.code)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors outline-none ${
                  activeIndex === i ? "bg-cream-200" : ""
                } ${selected ? "font-semibold text-gold-700" : "text-navy-800"}`}
              >
                {l.label}
                {selected && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 fill-gold-600" aria-hidden="true">
                    <path d="M4.6 9.6 1.4 6.4l1.2-1.2 2 2 4.8-4.8 1.2 1.2z" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
