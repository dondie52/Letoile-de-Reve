import { BrandLogo } from "@/components/BrandLogo";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-green">
      <div className="section-pad mx-auto max-w-[1400px] py-16 sm:py-20">
        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <a href="#top" className="mb-7 inline-block" aria-label={BRAND.name}>
              <BrandLogo variant="nav" />
            </a>
            <p className="mb-3 font-display text-2xl text-ivory">
              {BRAND.name}
            </p>
            <p className="mb-6 text-stone">
              Luxury Apartment, Phakalane
            </p>
            <p className="font-display text-lg text-gold/90">
              Your dream stay is almost here.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Contact</p>
              <div className="flex flex-col gap-3 text-sm text-stone">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="link-underline w-fit hover:text-gold"
                >
                  {BRAND.email}
                </a>
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="link-underline w-fit hover:text-gold"
                >
                  {BRAND.phoneDisplay}
                </a>
                <a
                  href={`https://${BRAND.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline w-fit hover:text-gold"
                >
                  {BRAND.website}
                </a>
                <p>{BRAND.location}</p>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline w-fit uppercase tracking-[0.18em] hover:text-gold"
                >
                  Facebook
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">Explore</p>
              <ul className="flex flex-col gap-3 text-sm text-stone">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="link-underline w-fit hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#book" className="link-underline w-fit hover:text-gold">
                    Book your stay
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="gold-rule mb-6" aria-hidden="true" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs tracking-wide text-stone/80">
            <p>
              © {year} {BRAND.name}. All rights reserved.
            </p>
            <p className="mt-2 uppercase tracking-[0.16em]">
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

          <a href="#top" className="btn btn-ghost w-fit text-[0.65rem]">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
