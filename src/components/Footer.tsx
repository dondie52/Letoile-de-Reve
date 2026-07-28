import Image from "next/image";
import { ASSETS, BRAND, FACEBOOK_REELS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-gold/20 surface-canopy">
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
          <div className="contact-line flex flex-col gap-1">
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
            {FACEBOOK_REELS.map((reel) => (
              <a
                key={reel.href}
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-gold"
              >
                {reel.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <nav
            aria-label="Footer"
            className="nav-label flex flex-wrap gap-x-2 gap-y-1 text-stone sm:justify-end"
          >
            <a href="#story" className="tap-link transition hover:text-gold">
              Story
            </a>
            <a href="#stay" className="tap-link transition hover:text-gold">
              The Stay
            </a>
            <a href="#apartment" className="tap-link transition hover:text-gold">
              Apartment
            </a>
            <a href="#amenities" className="tap-link transition hover:text-gold">
              Amenities
            </a>
            <a href="#location" className="tap-link transition hover:text-gold">
              Location
            </a>
            <a href="#book" className="tap-link transition hover:text-gold">
              Book
            </a>
          </nav>
          <p className="caption sm:text-right">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="caption sm:text-right">
            Designed by{" "}
            <span className="text-stone transition hover:text-gold">Tech Lab</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
