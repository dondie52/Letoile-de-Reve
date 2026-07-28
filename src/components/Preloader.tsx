"use client";

import { useEffect } from "react";

/** First-visit brand beat — keep concise so Speed Index stays healthy. */
export const PRELOADER_MS = 1100;
const FADE_MS = 580;

/**
 * Dismisses the SSR boot preloader (painted in layout for instant first paint).
 * The overlay itself lives in layout.tsx so it never waits on hydration.
 */
export function Preloader() {
  useEffect(() => {
    const el = document.getElementById("boot-preloader");
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("letoile-preloader") === "1";

    if (reduced || seen) {
      el.remove();
      document.documentElement.classList.add("preloader-done");
      return;
    }

    let fadeTimer: number | undefined;
    const hideTimer = window.setTimeout(() => {
      el.classList.add("is-done");
      sessionStorage.setItem("letoile-preloader", "1");
      document.documentElement.classList.add("preloader-done");
      fadeTimer = window.setTimeout(() => {
        el.remove();
      }, FADE_MS);
    }, PRELOADER_MS);

    return () => {
      window.clearTimeout(hideTimer);
      if (fadeTimer) window.clearTimeout(fadeTimer);
    };
  }, []);

  return null;
}
