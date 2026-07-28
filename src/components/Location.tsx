"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, BRAND } from "@/lib/constants";
import { kenBurns, parallax } from "@/lib/motion";
import { useScrollReveal } from "@/lib/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

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
    if (!section || !photo) return;
    const ctx = gsap.context(() => {
      parallax(photo, section, 70);
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const photo = kenBurnsRef.current;
    if (!photo) return;
    const tl = kenBurns(photo, {
      scaleFrom: 1.04,
      scaleTo: 1.12,
      xPercent: -2,
      yPercent: 1.6,
      duration: 18,
    });
    return () => {
      tl?.kill();
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
              <Image
                src={ASSETS.entranceMat}
                alt="Entrance at L’étoile de Rêve featuring branded welcome mat"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover object-[50%_40%]"
              />
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
