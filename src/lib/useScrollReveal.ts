"use client";

import { useEffect, type RefObject } from "react";

/** Reveals `[data-reveal]` descendants of the referenced element on scroll. */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = () => {
      void (async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { initScrollReveal } = await import("@/lib/motion");
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = initScrollReveal(root);
        revert = () => ctx?.revert();
      })();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { rootMargin: "20% 0px", threshold: 0.01 },
    );
    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, [ref]);
}
