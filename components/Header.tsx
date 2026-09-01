"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/lib/i18n";

const NAV = [
  { key: "nav.about", target: "#about" },
  { key: "nav.competitions", target: "#competitions" },
  { key: "nav.why", target: "#why" },
  { key: "nav.contact", target: "#contact" },
];

/**
 * Off the landing page the "Competitions" item goes to the real hub route
 * rather than back to the home anchor — from a competition screen the hub is
 * what people actually want.
 */
const hrefFor = (target: string) =>
  target === "#competitions" ? "/competitions" : `/${target}`;

function LotusMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" strokeWidth="0">
        <path d="M24 6c3 5 3 11 0 16-3-5-3-11 0-16z" fill="#2456b8" />
        <path d="M13 10c5 3 8 8 8 14-5-2-9-8-8-14z" fill="#2cbfb4" />
        <path d="M35 10c1 6-3 12-8 14 0-6 3-11 8-14z" fill="#2e6ad6" />
        <path d="M5 20c6 0 11 3 14 8-6 1-12-3-14-8z" fill="#1f9e52" />
        <path d="M43 20c-2 5-8 9-14 8 3-5 8-8 14-8z" fill="#2cbfb4" />
        <path d="M10 32c4-2 10-2 14 2-4 4-10 4-14-2z" fill="#d6a02f" />
        <path d="M38 32c-4 6-10 6-14 2 4-4 10-4 14-2z" fill="#d6a02f" />
      </g>
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const solid = scrolled || !onHome;
  const { t } = useTranslation();

  useEffect(() => {
    const onLoco = (e: Event) => setScrolled((e as CustomEvent<number>).detail > 24);
    const onWin = () => setScrolled(window.scrollY > 24);
    window.addEventListener("loco-scroll", onLoco);
    window.addEventListener("scroll", onWin, { passive: true });
    return () => {
      window.removeEventListener("loco-scroll", onLoco);
      window.removeEventListener("scroll", onWin);
    };
  }, []);

  const goTo = (target: string) => {
    setOpen(false);
    const el = document.querySelector(target);
    if (window.__loco && el) {
      window.__loco.scrollTo(el, { offset: -88, duration: 900 });
    } else {
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-cream-50/95 shadow-[0_10px_40px_-18px_rgba(16,31,92,0.35)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:gap-4 sm:px-8">
        {/* brand */}
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          {/* Geeta Pariwar is the parent organisation and leads the lockup; the
              50 lotus sits beside it as the campaign mark, and drops out first
              when the row gets tight. */}
          <Image
            src="/assets/geeta-pariwar-logo.png"
            alt={t("footer.pariwarLogoAlt")}
            width={387}
            height={363}
            priority
            className="h-11 w-auto shrink-0 sm:h-12"
          />
          <span className="h-8 w-px shrink-0 bg-gold-500/35 max-[330px]:hidden" aria-hidden="true" />
          <span className="min-w-0 leading-tight max-[330px]:hidden">
            <span className="block font-display text-base font-bold tracking-[0.06em] text-navy-800 uppercase sm:text-xl sm:tracking-[0.08em]">
              LearnGeeta
            </span>
            <span className="block truncate text-[9px] font-bold tracking-[0.2em] text-navy-800 uppercase sm:text-[10px]">
              Competitions
            </span>
          </span>
          <Image
            src="/assets/logo-mark.png"
            alt=""
            width={400}
            height={309}
            className="hidden h-9 w-auto shrink-0 xl:block"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV.map((item) =>
            onHome ? (
              <button
                key={item.key}
                onClick={() => goTo(item.target)}
                className="text-sm font-medium whitespace-nowrap text-navy-800/80 transition-colors hover:text-gold-600"
              >
                {t(item.key)}
              </button>
            ) : (
              <Link
                key={item.key}
                href={hrefFor(item.target)}
                className="text-sm font-medium whitespace-nowrap text-navy-800/80 transition-colors hover:text-gold-600"
              >
                {t(item.key)}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          <LanguageSelector />
          <Link
            href="/login"
            className="text-sm font-semibold whitespace-nowrap text-navy-800 transition-colors hover:text-gold-600"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/login"
            className="bg-goldgrad rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap text-navy-900 shadow-[0_10px_30px_-10px_rgba(185,130,28,0.8)] transition-transform hover:scale-[1.04]"
          >
            {t("nav.joinNow")}
          </Link>
        </div>

        {/* mobile: language + menu toggle */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageSelector variant="compact" />
          <button
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("nav.toggleMenu")}
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-navy-800 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-navy-800 transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-navy-800 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-gold-500/20 bg-cream-50/98 px-6 pb-6 pt-3 shadow-xl backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) =>
              onHome ? (
                <button
                  key={item.key}
                  onClick={() => goTo(item.target)}
                  className="rounded-lg px-3 py-3.5 text-left text-[16px] font-semibold text-navy-800 hover:bg-cream-200"
                >
                  {t(item.key)}
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={hrefFor(item.target)}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3.5 text-[16px] font-semibold text-navy-800 hover:bg-cream-200"
                >
                  {t(item.key)}
                </Link>
              )
            )}
          </nav>
          <div className="mt-4 flex gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] flex-1 items-center justify-center rounded-full border-2 border-navy-800/25 px-5 text-center text-[15px] font-bold text-navy-800"
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-goldgrad flex min-h-[52px] flex-1 items-center justify-center rounded-full px-5 text-center text-[15px] font-bold text-navy-900"
            >
              {t("nav.joinNow")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export { LotusMark };
