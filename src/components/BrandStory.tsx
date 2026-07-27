"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = section.querySelectorAll<HTMLElement>("[data-story-line]");
    const stars = section.querySelectorAll<HTMLElement>("[data-parallax-star]");

    if (reduced) {
      gsap.set(lines, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(lines, { opacity: 0, y: 40, filter: "blur(10px)" });

    const ctx = gsap.context(() => {
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.14,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 25%",
          scrub: true,
        },
      });

      stars.forEach((star, i) => {
        gsap.to(star, {
          y: i % 2 === 0 ? -60 : -30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-green py-28 sm:py-36"
      aria-labelledby="story-heading"
    >
      <div className="pointer-events-none absolute inset-0 star-field opacity-60" aria-hidden="true" />
      <span
        data-parallax-star
        className="pointer-events-none absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-gold/70"
        aria-hidden="true"
      />
      <span
        data-parallax-star
        className="pointer-events-none absolute right-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-ivory/50"
        aria-hidden="true"
      />
      <span
        data-parallax-star
        className="pointer-events-none absolute bottom-[22%] left-[28%] h-1 w-1 rounded-full bg-gold/50"
        aria-hidden="true"
      />

      <div className="section-pad relative z-10 mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p data-story-line className="eyebrow mb-6">
            Our name
          </p>
          <h2
            id="story-heading"
            data-story-line
            className="heading-lg mb-4 text-ivory"
          >
            {BRAND.name}
          </h2>
          <p
            data-story-line
            className="mb-3 font-display text-2xl text-gold sm:text-3xl"
          >
            {BRAND.tagline}
          </p>
          <p data-story-line className="mb-8 text-sm tracking-[0.18em] text-stone">
            {BRAND.pronunciation}
          </p>
          <p data-story-line className="body-lg max-w-[36rem]">
            Named to reflect a vision of creating a luxurious and peaceful
            retreat in Phakalane. Inspired by the elegance of the stars and the
            comfort of home, every detail is designed for a refined stay and a
            new standard of living.
          </p>
        </div>

        <div data-story-line className="relative mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
          <div className="absolute -inset-4 border border-gold/25" aria-hidden="true" />
          <Image
            src={ASSETS.logoPortrait}
            alt={`${BRAND.name} logo mark`}
            width={480}
            height={620}
            sizes="(max-width: 768px) 80vw, 320px"
            className="relative mx-auto h-auto w-[70%] object-contain lg:w-full"
          />
        </div>
      </div>
    </section>
  );
}
