"use client";

import { useEffect, useRef } from "react";
import { STAY_MOMENTS } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion-utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function StayMoments() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  /* The gold rail fills as the day unfolds */
  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail || prefersReducedMotion()) return;

    let cancelled = false;
    let revert: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void (async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.fromTo(
            rail,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 75%",
                scrub: 0.5,
              },
            },
          );
        }, section);
        revert = () => ctx.revert();
      })();
    }, { rootMargin: "20% 0px", threshold: 0.01 });
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stay"
      className="relative surface-dawn py-24 sm:py-32"
      aria-labelledby="stay-heading"
    >
      <div className="section-pad mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
          <h2
            id="stay-heading"
            data-reveal
            data-reveal-group="stay-intro"
            className="heading-lg max-w-[14ch]"
          >
            One day here explains the rest.
          </h2>
          <p
            data-reveal
            data-reveal-group="stay-intro"
            className="body-lg mt-5 max-w-[38ch] text-pretty"
          >
            Guests rarely describe the apartment by its features. They describe
            how the day felt.
          </p>

          <div className="mt-10 hidden border-t border-gold/35 pt-8 lg:block">
            <p
              data-reveal
              data-reveal-group="stay-close"
              className="lede mb-6 max-w-[24ch]"
            >
              A few nights or a few months — tell us your dates.
            </p>
            <a
              data-reveal
              data-reveal-group="stay-close"
              href="#book"
              className="btn btn-primary w-fit"
            >
              Check availability
            </a>
          </div>
        </div>

        <div className="relative pl-8 sm:pl-14 lg:pl-16">
          <div
            className="absolute bottom-2 left-0 top-2 w-px bg-ink/15"
            aria-hidden="true"
          >
            <div
              ref={railRef}
              className="h-full w-px origin-top bg-gradient-to-b from-gold via-gold/70 to-transparent"
            />
          </div>

          <ol className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
            {STAY_MOMENTS.map((moment) => (
              <li key={moment.time} data-reveal className="relative">
                <span
                  className="absolute -left-8 top-3 h-1.5 w-1.5 rounded-full bg-gold sm:-left-14 lg:-left-16"
                  aria-hidden="true"
                />
                <p className="meta mb-3 text-gold">{moment.time}</p>
                <h3 className="title-sm mb-3 max-w-[26ch]">
                  {moment.title}
                </h3>
                <p className="body-lg max-w-[52ch] text-pretty">
                  {moment.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 border-t border-gold/35 pt-10 lg:hidden">
            <p
              data-reveal
              data-reveal-group="stay-close-mobile"
              className="lede mb-6 max-w-[26ch]"
            >
              A few nights or a few months — tell us your dates.
            </p>
            <a
              data-reveal
              data-reveal-group="stay-close-mobile"
              href="#book"
              className="btn btn-primary w-fit"
            >
              Check availability
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
