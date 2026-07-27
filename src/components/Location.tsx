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
      className="surface-ivory relative"
      aria-labelledby="location-heading"
    >
      <div className="section-pad mx-auto grid max-w-[1400px] gap-12 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-32">
        <div className="flex flex-col justify-center">
          <h2
            id="location-heading"
            className="heading-editorial mb-6 max-w-[14ch]"
          >
            Quietly placed in Phakalane.
          </h2>
          <p className="body-ink mb-6 text-pretty">
            A peaceful address in Gaborone with convenient access to everyday
            essentials, dining and key destinations.
          </p>
          <p className="title-sm mb-8 text-ink">{BRAND.location}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-on-light w-fit"
          >
            Get directions
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>

          <div className="mt-12 grid max-w-md gap-4 border-t border-stone-200 pt-8 sm:grid-cols-[140px_1fr] sm:items-end">
            <div className="relative aspect-[4/5] w-full max-w-[140px] overflow-hidden">
              <Image
                src={ASSETS.entranceMat}
                alt="Branded welcome mat at the entrance of L’étoile de Rêve"
                fill
                sizes="140px"
                loading="lazy"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <p className="caption max-w-[28ch] text-muted">
              Arrival detail — the welcome at the threshold of the residence.
            </p>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden border border-stone-200 bg-ivory-100 lg:min-h-[420px]">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `
                linear-gradient(to right, color-mix(in srgb, var(--stone-200) 70%, transparent) 1px, transparent 1px),
                linear-gradient(to bottom, color-mix(in srgb, var(--stone-200) 70%, transparent) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-6 sm:p-8 lg:min-h-[420px]">
            <div>
              <p className="meta mb-3 text-muted">Location diagram</p>
              <p className="title-sm text-ink">Phakalane</p>
              <p className="mt-1 text-[0.9375rem] text-muted">Gaborone, Botswana</p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="max-w-[16ch]">
                <p className="text-[0.8125rem] leading-relaxed text-muted">
                  Residential grounds with secure access and considered quiet.
                </p>
              </div>
              <span
                className="inline-flex h-3 w-3 rounded-full bg-pine-800 ring-4 ring-pine-800/15"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
