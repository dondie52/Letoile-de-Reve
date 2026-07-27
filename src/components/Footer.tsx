import Image from "next/image";
import { ASSETS, BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-gold-500/20 bg-pine-900">
      <div className="section-pad mx-auto flex max-w-[1400px] flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-12">
        <div>
          <Image
            src={ASSETS.logoNav}
            alt="L’étoile de Rêve Luxury Apartment"
            width={180}
            height={46}
            className="mb-4 h-9 w-auto max-w-none object-contain"
          />
          <p className="mb-3 text-[0.9375rem] text-ivory/85">
            Luxury apartment in Phakalane
          </p>
          <div className="contact-line flex flex-col gap-0.5 text-stone">
            <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold-400">
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phoneTel}`} className="transition hover:text-gold-400">
              {BRAND.phoneDisplay}
            </a>
            <a
              href={`https://${BRAND.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold-400"
            >
              {BRAND.website}
            </a>
            {BRAND.facebookUrl ? (
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-gold-400"
              >
                Facebook
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <nav
            aria-label="Footer"
            className="nav-label flex flex-wrap gap-x-1 gap-y-0 text-stone sm:justify-end"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="tap-link transition hover:text-gold-400"
              >
                {link.label}
              </a>
            ))}
            <a href="#book" className="tap-link transition hover:text-gold-400">
              Book
            </a>
          </nav>
          <p className="caption text-ivory/70">
            © {year} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
