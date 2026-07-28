"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ASSETS, BRAND } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const kenBurnsRef = useRef<HTMLDivElement>(null);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    BRAND.mapsQuery,
  )}`;

  useScrollReveal(sectionRef);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const ken = kenBurnsRef.current;
    if (!section || !photo) return;

    let cancelled = false;
    let revert: (() => void) | undefined;
    let killKen: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void (async () => {
          const [{ gsap }, { ScrollTrigger }, motion] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
            import("@/lib/motion"),
          ]);
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          const ctx = gsap.context(() => {
            motion.parallax(photo, section, 70);
          }, section);
          revert = () => ctx.revert();
          if (ken) {
            const tl = motion.kenBurns(ken, {
              scaleFrom: 1.04,
              scaleTo: 1.12,
              xPercent: -2,
              yPercent: 1.6,
              duration: 18,
            });
            killKen = () => tl?.kill();
          }
        })();
      },
      { rootMargin: "25% 0px", threshold: 0.01 },
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
      killKen?.();
    };
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative surface-canopy"
      aria-labelledby="location-heading"
    >
      <div className="grid lg:grid-cols-2">
        <div className="location-media relative">
          <div ref={photoRef} className="absolute inset-[-8%]">
            <div
              ref={kenBurnsRef}
              className="absolute inset-[-5%] will-change-transform"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={ASSETS.entranceMatSm}
                  type="image/webp"
                />
                <img
                  src={ASSETS.entranceMat}
                  alt="Entrance at L’étoile de Rêve featuring branded welcome mat"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
                />
              </picture>
            </div>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-green/40 max-lg:bg-gradient-to-t max-lg:from-green/55 max-lg:via-transparent max-lg:to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="section-pad flex flex-col justify-center py-[clamp(2.5rem,8vw,5rem)] lg:py-28">
          <h2
            id="location-heading"
            data-reveal
            data-reveal-group="location"
            className="heading-lg mb-6 max-w-[12ch] text-ivory"
          >
            Perfectly placed in Phakalane.
          </h2>
          <p
            data-reveal
            data-reveal-group="location"
            className="body-lg mb-8 text-pretty"
          >
            A peaceful address in Gaborone with convenient access to everyday
            essentials, dining and key destinations.
          </p>
          <p data-reveal data-reveal-group="location" className="lede mb-10">
            {BRAND.location}
          </p>
          <a
            data-reveal
            data-reveal-group="location"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-fit"
          >
            Get directions
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
