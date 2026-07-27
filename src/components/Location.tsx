"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, BRAND } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    BRAND.mapsQuery,
  )}`;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: -28 },
        {
          y: 28,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative overflow-hidden bg-green"
      aria-labelledby="location-heading"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[55vh] overflow-hidden lg:min-h-[82vh]">
          <div ref={imageRef} className="absolute inset-[-8%]">
            <Image
              src={ASSETS.entranceMat}
              alt="Entrance at L’étoile de Rêve featuring branded welcome mat"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green max-lg:bg-gradient-to-t max-lg:from-green max-lg:via-green/40 max-lg:to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="section-pad flex flex-col justify-center py-20 lg:py-28">
          <p className="eyebrow mb-5">Location & arrival</p>
          <h2
            id="location-heading"
            className="heading-lg mb-6 max-w-[12ch] text-ivory"
          >
            Perfectly placed in Phakalane.
          </h2>
          <p className="body-lg mb-8 max-w-md">
            A peaceful address in Gaborone with convenient access to everyday
            essentials, dining and key destinations.
          </p>
          <p className="mb-10 inline-flex items-center gap-3 font-display text-xl text-gold">
            <MapPin
              size={18}
              className="animate-pulse text-gold"
              aria-hidden="true"
            />
            {BRAND.location}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-fit"
          >
            Get directions
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
