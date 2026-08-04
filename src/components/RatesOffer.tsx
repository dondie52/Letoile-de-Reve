"use client";

import { useRef } from "react";
import { applyBookingCode } from "@/lib/booking-code";
import { OFFER, RATE } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function RatesOffer() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  return (
    <section
      id="rates"
      ref={sectionRef}
      className="relative surface-deep py-24 sm:py-32"
      aria-labelledby="rates-heading"
    >
      <div className="section-pad mx-auto grid max-w-[1400px] items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p
            data-reveal
            data-reveal-group="rates-intro"
            className="meta mb-6 text-gold"
          >
            Nightly rate
          </p>
          <h2
            id="rates-heading"
            data-reveal
            data-reveal-group="rates-intro"
            className="heading-lg text-ivory"
          >
            {RATE.nightlyDisplay}
            <span className="meta ml-4 align-middle">{RATE.unit}</span>
          </h2>
          <p
            data-reveal
            data-reveal-group="rates-intro"
            className="body-lg mt-5 text-pretty"
          >
            Experience luxury, embrace comfort. The whole apartment is yours —
            fully furnished, with high-speed Wi-Fi, secure parking and 24/7
            security included.
          </p>
          <p
            data-reveal
            data-reveal-group="rates-intro"
            className="caption mt-8 border-t border-gold/25 pt-6"
          >
            Book direct and save — best rate guaranteed.
          </p>
        </div>

        <div
          data-reveal
          data-reveal-group="rates-offer"
          className="booking-panel relative px-6 py-10 sm:px-10 sm:py-12"
        >
          <div
            className="pointer-events-none absolute inset-2 border border-gold/15"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="meta mb-5 text-gold">Exclusive offer</p>
            <h3 className="heading-md text-ivory">{OFFER.title}.</h3>
            <p className="body-lg mt-5 text-pretty">{OFFER.summary}</p>

            <p className="meta mt-8 mb-3">Use booking code</p>
            <p className="code-chip">{OFFER.codeDisplay}</p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#book"
                className="btn btn-primary"
                onClick={() => applyBookingCode(OFFER.code)}
              >
                Book with {OFFER.codeDisplay}
              </a>
              <p className="caption max-w-[34ch] text-pretty">{OFFER.terms}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
