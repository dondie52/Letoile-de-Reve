"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AMENITIES } from "@/lib/constants";
import { isMobileViewport, prefersReducedMotion } from "@/lib/motion-utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

function AmenityIcon({ index }: { index: number }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 36 36",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.15,
    "aria-hidden": true as const,
  };

  switch (index) {
    case 0:
      return (
        <svg {...common}>
          <rect x="6" y="10" width="24" height="18" />
          <path d="M6 16h24M14 10V8h8v2" />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <path d="M8 22c4-8 16-8 20 0" />
          <path d="M12 18c2.5-4 9.5-4 12 0" />
          <circle cx="18" cy="25" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <path d="M18 6l10 5v7c0 6-4.5 10-10 12-5.5-2-10-6-10-12v-7l10-5z" />
          <path d="M18 14v8M15 18h6" />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="10" />
          <path d="M18 8v10l6 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M18 7l2 7h7l-5.5 4 2 7L18 21l-5.5 4 2-7L9 14h7l2-7z" />
        </svg>
      );
  }
}

export function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const items = section.querySelectorAll<HTMLElement>("[data-amenity]");
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: mobile ? 18 : 28, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: mobile ? 0.7 : 0.9,
            delay: mobile ? 0 : (i % 3) * 0.06,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: mobile ? "top 90%" : "top 85%",
              once: true,
            },
            onComplete: () => gsap.set(item, { clearProps: "filter" }),
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="relative surface-deep py-24 sm:py-32"
      aria-labelledby="amenities-heading"
    >
      <div className="section-pad mx-auto max-w-[1400px]">
        <div className="mb-16 max-w-2xl">
          <h2
            id="amenities-heading"
            data-reveal
            data-reveal-group="amenities-intro"
            className="heading-lg text-ivory"
          >
            Everything considered.
          </h2>
          <p
            data-reveal
            data-reveal-group="amenities-intro"
            className="body-lg mt-5 text-pretty"
          >
            The details you would otherwise have to arrange yourself are already
            handled.
          </p>
        </div>

        <ul className="amenities-grid border-t border-gold/25">
          {AMENITIES.map((item, i) => (
            <li
              key={item.title}
              data-amenity
              className="group border-b border-gold/25 px-0 py-9 sm:px-6 lg:border-r lg:[&:nth-child(3)]:border-r-0 lg:[&:nth-child(5)]:border-r-0 sm:[&:nth-child(even)]:border-r-0 sm:border-r"
            >
              <div className="mb-5 text-gold transition-transform duration-500 group-hover:-translate-y-0.5">
                <AmenityIcon index={i} />
              </div>
              <h3 className="title-sm mb-3 text-ivory">
                {item.title}
              </h3>
              <p className="body-lg">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
