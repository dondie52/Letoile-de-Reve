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
      <div className="section-pad mx-auto grid max-w-[1100px] gap-12 py-24 lg:grid-cols-[1fr_220px] lg:items-end lg:gap-16 lg:py-32">
        <div>
          <p className="meta mb-5 text-muted">Phakalane · Gaborone · Botswana</p>
          <h2
            id="location-heading"
            className="heading-editorial mb-6 max-w-[14ch]"
          >
            Quietly placed in Phakalane.
          </h2>
          <p className="body-ink mb-8 max-w-[48ch] text-pretty">
            A peaceful residential address with convenient access to everyday
            essentials, dining and key destinations across Gaborone.
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-on-light w-fit"
          >
            Get directions
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>

        <figure className="max-w-[220px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={ASSETS.entranceMat}
              alt="Branded welcome mat at the entrance of L’étoile de Rêve"
              fill
              sizes="220px"
              loading="lazy"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <figcaption className="caption caption-muted mt-3">
            Arrival detail
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
