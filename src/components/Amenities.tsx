"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AMENITIES } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function AmenityIcon({ index }: { index: number }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 36 36",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
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
          <path d="M8 24h20M10 24V14l8-4 8 4v10" />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <rect x="7" y="12" width="22" height="14" />
          <path d="M11 16h6M11 20h4" />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <path d="M10 14h16v12H10z" />
          <path d="M14 14v-2a4 4 0 018 0v2" />
        </svg>
      );
    case 4:
      return (
        <svg {...common}>
          <path d="M8 22c4-8 16-8 20 0" />
          <path d="M12 18c2.5-4 9.5-4 12 0" />
          <circle cx="18" cy="25" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 5:
      return (
        <svg {...common}>
          <rect x="8" y="14" width="20" height="12" />
          <path d="M12 14v-2h12v2M14 20h8" />
        </svg>
      );
    case 6:
      return (
        <svg {...common}>
          <path d="M18 6l10 5v7c0 6-4.5 10-10 12-5.5-2-10-6-10-12v-7l10-5z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="10" />
          <path d="M18 8v10l6 4" />
        </svg>
      );
  }
}

export function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const items = section.querySelectorAll<HTMLElement>("[data-amenity]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="surface-stone relative py-24 sm:py-32"
      aria-labelledby="amenities-heading"
    >
      <div className="section-pad mx-auto max-w-[1100px]">
        <div className="mb-12 max-w-xl sm:mb-16">
          <h2 id="amenities-heading" className="heading-editorial mb-4">
            Everything you need, already considered.
          </h2>
          <p className="body-ink">
            The residence is fully prepared so your stay begins quietly and
            completely.
          </p>
        </div>

        <ul className="amenities-editorial">
          {AMENITIES.map((item, i) => (
            <li key={item.title} data-amenity>
              <span className="amenity-icon">
                <AmenityIcon index={i} />
              </span>
              <div>
                <h3 className="title-sm text-ink">{item.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
