"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ASSETS, BRAND, NAV_LINKS } from "@/lib/constants";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [pastHero, setPastHero] = useState(false);
  const [coverZoneVisible, setCoverZoneVisible] = useState(false);

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
    const hero = document.getElementById("top");
    const book = document.getElementById("book");
    const footer = document.querySelector("footer");

    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            setPastHero(!entry.isIntersecting);
          },
          { root: null, threshold: 0, rootMargin: "0px 0px -42% 0px" },
        )
      : null;

    const coverTargets = [book, footer].filter(Boolean) as Element[];
    const coverVisible = new Set<Element>();

    const coverObserver =
      coverTargets.length > 0
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) coverVisible.add(entry.target);
                else coverVisible.delete(entry.target);
              });
              setCoverZoneVisible(coverVisible.size > 0);
            },
            {
              root: null,
              threshold: 0,
              rootMargin: "0px 0px -8% 0px",
            },
          )
        : null;

    if (hero && heroObserver) heroObserver.observe(hero);
    coverTargets.forEach((el) => coverObserver?.observe(el));

    return () => {
      heroObserver?.disconnect();
      coverObserver?.disconnect();
    };
  }, []);

  const showMobileBook = pastHero && !coverZoneVisible;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const mobileLinks = [
    ...NAV_LINKS,
    { href: "#book", label: "Book", id: "book" },
  ] as const;

  const headerH = scrolled ? 76 : 84;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
          scrolled || open ? "nav-blur nav-compact" : "bg-transparent"
        }`}
        style={{ ["--nav-h" as string]: `${headerH}px` }}
      >
        <nav
          className="section-pad mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[auto_1fr_auto] lg:gap-8"
          aria-label="Primary"
          style={{ height: headerH }}
        >
          <a
            href="#top"
            className="tap-target relative z-10 -ml-1 shrink-0 justify-self-start px-1.5"
            aria-label={`${BRAND.name} home`}
            onClick={() => setOpen(false)}
          >
            <Image
              src={ASSETS.logoNav}
              alt="L’étoile de Rêve Luxury Apartment"
              width={205}
              height={52}
              priority
              className="h-9 w-auto max-w-none object-contain object-left sm:h-[48px]"
            />
          </a>

          <ul className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="flex items-center">
                <a
                  href={link.href}
                  className={`nav-label link-underline inline-flex min-h-11 items-center px-3 py-2 transition-colors ${
                    active === link.id
                      ? "text-gold-400"
                      : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center justify-self-end">
            <div className="max-lg:hidden">
              <a href="#book" className="btn btn-secondary">
                Book
              </a>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-ivory transition hover:text-gold-400 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`fixed inset-0 z-0 bg-pine-950/98 transition-all duration-500 lg:hidden ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!open}
          {...(!open ? ({ inert: true } as React.HTMLAttributes<HTMLDivElement>) : {})}
        >
          <ul className="flex h-full flex-col justify-center gap-2 px-8 pt-20">
            {mobileLinks.map((link, i) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`nav-drawer-link inline-flex min-h-11 items-center transition-all duration-500 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${100 + i * 55}ms` : "0ms" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <a
        href="#book"
        className={`mobile-book-float lg:hidden ${showMobileBook && !open ? "is-visible" : ""}`}
        tabIndex={showMobileBook && !open ? 0 : -1}
        aria-hidden={!showMobileBook || open}
      >
        Book your stay
        <span aria-hidden="true">→</span>
      </a>
    </>
  );
}
