"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ASSETS, BRAND } from "@/lib/constants";

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
      aria-label="Loading L’étoile de Rêve"
    >
      <div className="flex flex-col items-center gap-6">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className="text-gold"
        >
          <path
            d="M28 6 L30.8 22.2 L46 24 L30.8 25.8 L28 42 L25.2 25.8 L10 24 L25.2 22.2 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: 120,
              strokeDashoffset: animate ? 0 : 120,
              transition: "stroke-dashoffset 0.9s ease",
            }}
          />
          <circle
            cx="28"
            cy="24"
            r="2"
            fill="currentColor"
            className={`transition-opacity duration-500 delay-700 ${
              animate ? "opacity-100" : "opacity-0"
            }`}
          />
        </svg>
        <div
          className={`transition-all duration-700 delay-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <Image
            src={ASSETS.logoWide}
            alt={BRAND.name}
            width={220}
            height={56}
            priority
            className="h-auto w-[180px] object-contain sm:w-[220px]"
          />
        </div>
      </div>
    </div>
  );
}
