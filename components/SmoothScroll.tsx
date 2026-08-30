"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    __loco?: {
      scrollTo: (target: Element | string | number, opts?: Record<string, unknown>) => void;
      destroy: () => void;
      update: () => void;
      on: (event: string, cb: (args: { scroll: { y: number } }) => void) => void;
    };
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let scroll: NonNullable<Window["__loco"]> | undefined;

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      if (cancelled || !ref.current) return;

      scroll = new LocomotiveScroll({
        el: ref.current,
        smooth: true,
        lerp: 0.075,
        multiplier: 1,
        smartphone: { smooth: true },
        tablet: { smooth: true, breakpoint: 1024 },
      }) as unknown as NonNullable<Window["__loco"]>;

      window.__loco = scroll;

      scroll.on("scroll", (args) => {
        window.dispatchEvent(
          new CustomEvent("loco-scroll", { detail: args.scroll.y })
        );
      });

      // images loading later can change section heights
      const update = () => scroll?.update();
      window.addEventListener("load", update);
      setTimeout(update, 1200);
    })();

    return () => {
      cancelled = true;
      scroll?.destroy();
      window.__loco = undefined;
    };
  }, []);

  return (
    <div data-scroll-container ref={ref}>
      {children}
    </div>
  );
}
