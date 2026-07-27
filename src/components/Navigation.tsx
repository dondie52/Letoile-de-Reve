"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...NAV_LINKS.map((l) => l.id), "book"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.25, 0.45] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mobileLinks = [
    ...NAV_LINKS,
    { href: "#book", label: "Book Your Stay", id: "book" },
  ] as const;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open ? "nav-blur nav-compact" : "bg-transparent"
        }`}
      >
        <nav
          className={`section-pad mx-auto flex max-w-[1400px] items-center justify-between transition-[height] duration-500 ${
            scrolled ? "h-[3.85rem]" : "h-[4.75rem]"
          }`}
          aria-label="Primary"
        >
          <a
            href="#top"
            className="relative z-10"
            aria-label={`${BRAND.name} home`}
          >
            <BrandLogo variant="nav" priority />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} className="flex items-center">
                {i > 0 ? (
                  <span
                    className="mx-3 h-3 w-px bg-gold/25"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={link.href}
                  className={`link-underline py-2 text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
                    active === link.id
                      ? "text-gold"
                      : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a href="#book" className="btn btn-primary">
              Book now
            </a>
          </div>

          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center text-ivory md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={`fixed inset-0 z-0 bg-forest/98 transition-all duration-500 md:hidden ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex h-full flex-col justify-center gap-7 px-8 pt-16">
            {mobileLinks.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-display text-4xl text-ivory transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${100 + i * 55}ms` : "0ms" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="mobile-book-bar md:hidden">
        <a href="#book" className="btn btn-primary w-full">
          Book your stay
        </a>
      </div>
    </>
  );
}
