"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";

/**
 * Phone-only action bar. It stays out of the way while the hero's own buttons
 * are on screen and slides in once they scroll past, so the primary action is
 * never more than a thumb away without doubling up on the first screen.
 *
 * Locomotive keeps native scrolling on smartphones, so a plain
 * IntersectionObserver is enough here.
 */
export default function StickyCta({ watch }: { watch: React.RefObject<HTMLElement | null> }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = watch.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [watch]);

  return (
    <div
      ref={barRef}
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/25 bg-cream-50/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Link
          href="/login"
          tabIndex={show ? undefined : -1}
          className="bg-goldgrad flex min-h-[50px] flex-1 items-center justify-center rounded-full px-6 text-[15px] font-bold text-navy-900 shadow-[0_12px_28px_-14px_rgba(185,130,28,0.9)] active:scale-[0.98]"
        >
          {t("hero.ctaPrimary")}
        </Link>
        <Link
          href="/competitions"
          tabIndex={show ? undefined : -1}
          className="flex min-h-[50px] shrink-0 items-center justify-center rounded-full border-2 border-navy-800/25 px-5 text-[15px] font-bold text-navy-800"
        >
          {t("nav.competitions")}
        </Link>
      </div>
    </div>
  );
}
