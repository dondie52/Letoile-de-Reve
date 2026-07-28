"use client";

import { useEffect, type ReactNode } from "react";

function whenIdle(cb: () => void, timeout = 2500) {
  if (typeof window === "undefined") return () => undefined;
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, Math.min(timeout, 1200));
  return () => window.clearTimeout(t);
}

/**
 * Desktop-only Lenis smooth wheel. Deferred until idle so it does not
 * inflate Total Blocking Time on lab desktop PageSpeed runs.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;
    let cancelIdle: (() => void) | undefined;

    const start = () => {
      if (destroyed) return;
      cancelIdle = whenIdle(() => {
        if (destroyed) return;
        void (async () => {
          const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
            await Promise.all([
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
      }, 3000);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      destroyed = true;
      cancelIdle?.();
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
