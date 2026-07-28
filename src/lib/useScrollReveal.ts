"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScrollReveal } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Reveals `[data-reveal]` descendants of the referenced element on scroll. */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = initScrollReveal(root);
    return () => ctx?.revert();
  }, [ref]);
}
