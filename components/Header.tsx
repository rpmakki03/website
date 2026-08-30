"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { label: "About", target: "#about" },
  { label: "Competitions", target: "#competitions" },
  { label: "Why Join", target: "#why" },
  { label: "Contact", target: "#contact" },
];

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* brand */}
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <LotusMark />
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold tracking-[0.08em] text-navy-800">
              LEARN GEETA
            </span>
            <span className="block text-[11px] font-medium tracking-[0.22em] text-gold-600">
              स्वर्णिम वर्ग · GOLDEN BATCH 50
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) =>
            onHome ? (
              <button
                key={item.label}
                onClick={() => goTo(item.target)}
                className="text-sm font-medium text-navy-800/80 transition-colors hover:text-gold-600"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={`/${item.target}`}
                className="text-sm font-medium text-navy-800/80 transition-colors hover:text-gold-600"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-navy-800 transition-colors hover:text-gold-600"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="bg-goldgrad rounded-full px-6 py-2.5 text-sm font-semibold text-navy-900 shadow-[0_10px_30px_-10px_rgba(185,130,28,0.8)] transition-transform hover:scale-[1.04]"
          >
            Join Now
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-navy-800 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-navy-800 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-navy-800 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-gold-500/20 bg-cream-50/98 px-6 pb-6 pt-3 shadow-xl backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) =>
              onHome ? (
                <button
                  key={item.label}
                  onClick={() => goTo(item.target)}
                  className="rounded-lg px-3 py-3 text-left text-[15px] font-medium text-navy-800 hover:bg-cream-200"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={`/${item.target}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-navy-800 hover:bg-cream-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <div className="mt-4 flex gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-navy-800/25 px-5 py-3 text-center text-sm font-semibold text-navy-800"
            >
              Login
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-goldgrad flex-1 rounded-full px-5 py-3 text-center text-sm font-semibold text-navy-900"
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export { LotusMark };
