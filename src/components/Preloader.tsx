"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/constants";

/** First-visit brand beat — keep short so Speed Index / LCP stay healthy. */
const PRELOADER_MS = 720;

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
        className={`transition-all duration-500 ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Same asset as nav LCP — no extra priority fetch */}
        <Image
          src={ASSETS.logoNav}
          alt=""
          width={205}
          height={52}
          className="h-auto w-[180px] object-contain sm:w-[205px]"
        />
      </div>
    </div>
  );
}
