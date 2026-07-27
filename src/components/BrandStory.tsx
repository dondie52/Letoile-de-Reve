"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, BRAND } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = prefersReducedMotion();
    const lines = section.querySelectorAll<HTMLElement>("[data-story-line]");
    const star = section.querySelector<HTMLElement>("[data-story-star]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([lines, star], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 28 });
      gsap.set(star, { opacity: 0, y: 12 });

      gsap.to(lines, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.95,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(star, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="surface-ivory relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="story-heading"
    >
      <div className="section-pad relative z-10 mx-auto max-w-[920px]">
        <div
          data-story-star
          className="mb-10 flex justify-center sm:mb-12 sm:justify-start"
        >
          <Image
            src={ASSETS.logoMark}
            alt=""
            width={72}
            height={60}
            sizes="72px"
            className="h-auto w-14 object-contain opacity-90 sm:w-16"
          />
        </div>

        <h2
          id="story-heading"
          data-story-line
          className="heading-editorial mb-8 max-w-[18ch]"
        >
          A peaceful residence created for stays that feel entirely your own.
        </h2>

        <p data-story-line className="body-ink mb-8 text-pretty">
          Named to reflect a vision of creating a luxurious and peaceful retreat
          in Phakalane. Inspired by the elegance of the stars and the comfort of
          home, every detail is designed for a refined stay.
        </p>

        <div data-story-line className="flex flex-col gap-2 border-t border-stone-200 pt-6 sm:flex-row sm:items-baseline sm:gap-8">
          <p className="meta text-muted">{BRAND.pronunciation}</p>
          <p className="translation">
            {BRAND.name} — French for “{BRAND.tagline}”
          </p>
        </div>
      </div>
    </section>
  );
}
