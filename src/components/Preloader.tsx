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

<<<<<<< HEAD
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest"
      role="status"
      aria-live="polite"
      aria-label="Loading L’étoile de Rêve"
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <Image
          src={ASSETS.logoFull}
          alt="L’étoile de Rêve"
          width={220}
          height={256}
          priority
          className="h-auto w-[min(42vw,11.5rem)] object-contain sm:w-[13rem]"
        />
        <span
          className={`mt-8 h-px w-12 origin-center bg-gold/70 transition-transform duration-700 delay-200 ${
            animate ? "scale-x-100" : "scale-x-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
=======
  return null;
>>>>>>> 86d29f5 (Fix instant preloader paint and transparent star favicon)
}
