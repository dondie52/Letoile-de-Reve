"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { BRAND } from "@/lib/constants";

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
      }, 1400);
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
      aria-label={`Loading ${BRAND.name}`}
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className={`transition-all duration-700 ${
            animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <BrandLogo variant="mark" className="h-14 w-auto" priority />
        </div>
        <div
          className={`transition-all duration-700 delay-300 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="font-display text-2xl tracking-[0.04em] text-ivory sm:text-3xl">
            {BRAND.name}
          </p>
        </div>
      </div>
    </div>
  );
}
