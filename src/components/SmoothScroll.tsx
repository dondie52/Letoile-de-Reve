"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    /* Lenis wheel smoothing is desktop-only — keep native touch scroll on phones */
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) {
      return;
    }

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (destroyed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.1,
        allowNestedScroll: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(ticker);
        lenis.destroy();
      };
    })();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
