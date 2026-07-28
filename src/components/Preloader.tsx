"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/constants";

/** First-visit brand beat — keep concise so Speed Index stays healthy. */
export const PRELOADER_MS = 900;

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let hideTimer: number | undefined;

    const frame = window.requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = sessionStorage.getItem("letoile-preloader") === "1";

      if (reduced || seen) {
        setVisible(false);
        return;
      }

      setAnimate(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("letoile-preloader", "1");
      }, PRELOADER_MS);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

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
}
