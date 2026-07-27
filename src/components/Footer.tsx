import Image from "next/image";
import { ASSETS, BRAND } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-green">
      <div className="section-pad mx-auto flex max-w-[1400px] flex-col gap-10 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Image
            src={ASSETS.logoNav}
            alt="L’étoile de Rêve Luxury Apartment"
            width={200}
            height={52}
            className="mb-5 h-10 w-auto max-w-none object-contain"
          />
          <p className="title-sm mb-4 text-ivory/90">
            Luxury apartment in Phakalane
          </p>
          <div className="contact-line flex flex-col gap-2">
            <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold">
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phoneTel}`} className="transition hover:text-gold">
              {BRAND.phoneDisplay}
            </a>
            <a
              href={`https://${BRAND.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold"
            >
              {BRAND.website}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <nav aria-label="Footer" className="nav-label flex flex-wrap gap-x-5 gap-y-2 text-stone">
            <a href="#story" className="transition hover:text-gold">
              Story
            </a>
            <a href="#apartment" className="transition hover:text-gold">
              Apartment
            </a>
            <a href="#amenities" className="transition hover:text-gold">
              Amenities
            </a>
            <a href="#location" className="transition hover:text-gold">
              Location
            </a>
            <a href="#book" className="transition hover:text-gold">
              Book
            </a>
          </nav>
          <p className="caption">
            © {year} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
