"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ASSETS, BRAND } from "@/lib/constants";

export function Location() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    BRAND.mapsQuery,
  )}`;

  return (
    <section
      id="location"
      className="relative bg-green"
      aria-labelledby="location-heading"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[55vh] lg:min-h-[78vh]">
          <Image
            src={ASSETS.entranceMat}
            alt="Entrance at L’étoile de Rêve featuring branded welcome mat"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-green/40 max-lg:bg-gradient-to-t max-lg:from-green/50 max-lg:to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="section-pad flex flex-col justify-center py-20 lg:py-28">
          <p className="eyebrow mb-5">Location & arrival</p>
          <h2 id="location-heading" className="heading-lg mb-6 max-w-[12ch] text-ivory">
            Perfectly placed in Phakalane.
          </h2>
          <p className="body-lg mb-8 max-w-md">
            A peaceful address in Gaborone with convenient access to everyday
            essentials, dining and key destinations.
          </p>
          <p className="mb-10 font-display text-xl text-gold">
            {BRAND.location}
          </p>
          <a
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
