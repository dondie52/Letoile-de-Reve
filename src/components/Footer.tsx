import Image from "next/image";
import { ASSETS, BRAND } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-green">
      <div className="section-pad mx-auto flex max-w-[1400px] flex-col gap-10 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Image
            src={ASSETS.logoWide}
            alt={BRAND.name}
            width={180}
            height={44}
            className="mb-5 h-9 w-auto object-contain"
          />
          <p className="mb-4 max-w-sm font-display text-lg text-ivory/90">
            {BRAND.name} — Luxury Apartment, Phakalane
          </p>
          <div className="flex flex-col gap-2 text-sm text-stone">
            <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phoneTel}`} className="hover:text-gold">
              {BRAND.phoneDisplay}
            </a>
            <a
              href={`https://${BRAND.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              {BRAND.website}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-stone transition hover:text-gold"
          >
            Facebook
          </a>
          <p className="text-xs tracking-wide text-stone/80">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs tracking-[0.18em] uppercase text-stone/70">
            Designed by{" "}
            <a
              href="https://techlabbw.co.bw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition hover:text-ivory"
            >
              TechLab Botswana
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
