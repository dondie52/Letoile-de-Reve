"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, BRAND } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = prefersReducedMotion();
    const lines = section.querySelectorAll<HTMLElement>("[data-story-line]");
    const logoWrap = section.querySelector<HTMLElement>("[data-story-logo]");
    const star = section.querySelector<HTMLElement>("[data-story-star]");
    const accents = section.querySelectorAll<HTMLElement>("[data-story-accent]");
    const floatStars = section.querySelectorAll<HTMLElement>("[data-parallax-star]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([lines, logoWrap, accents], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 32 });
      gsap.set(logoWrap, { opacity: 0, scale: 0.94 });
      gsap.set(accents, { opacity: 0 });

      gsap.to(lines, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      });

      gsap.to(logoWrap, {
        opacity: 1,
        scale: 1,
        duration: 1.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      if (star) {
        gsap.fromTo(
          star,
          { rotate: -4 },
          {
            rotate: 3,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      gsap.to(accents, {
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      floatStars.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -50 : -28,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-green py-28 sm:py-36"
      aria-labelledby="story-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 star-field opacity-50"
        aria-hidden="true"
      />
      <span
        data-parallax-star
        className="pointer-events-none absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-gold/70"
        aria-hidden="true"
      />
      <span
        data-parallax-star
        className="pointer-events-none absolute right-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-ivory/45"
        aria-hidden="true"
      />
      <span
        data-parallax-star
        className="pointer-events-none absolute bottom-[22%] left-[28%] h-1 w-1 rounded-full bg-gold/45"
        aria-hidden="true"
      />

      <div className="section-pad relative z-10 mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p data-story-line className="eyebrow mb-6">
            Our name
          </p>
          <h2
            id="story-heading"
            data-story-line
            className="heading-lg mb-4 text-ivory"
          >
            {BRAND.name}
          </h2>
          <p
            data-story-line
            className="mb-3 font-display text-2xl text-gold sm:text-3xl"
          >
            {BRAND.tagline}
          </p>
          <p
            data-story-line
            className="mb-8 text-sm tracking-[0.18em] text-stone"
          >
            {BRAND.pronunciation}
          </p>
          <p data-story-line className="body-lg max-w-[36rem]">
            Named to reflect a vision of creating a luxurious and peaceful
            retreat in Phakalane. Inspired by the elegance of the stars and the
            comfort of home, every detail is designed for a refined stay and a
            new standard of living.
          </p>
        </div>

        <div
          data-story-logo
          className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:justify-self-end"
        >
          <div
            data-story-accent
            className="absolute -inset-[1px] border border-gold/30"
            aria-hidden="true"
          />
          <div
            data-story-accent
            className="absolute inset-3 border border-gold/15"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden bg-forest/50 px-8 py-12 sm:px-10 sm:py-14">
            <div
              className="logo-glow pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div data-story-star className="relative origin-center">
              <Image
                src={ASSETS.logoFull}
                alt={`${BRAND.name} logo mark`}
                width={365}
                height={424}
                sizes="(max-width: 768px) 70vw, 300px"
                className="relative mx-auto h-auto w-full max-w-[260px] object-contain"
              />
            </div>
            <p
              data-story-accent
              className="mt-8 text-center text-sm tracking-[0.18em] text-stone"
            >
              {BRAND.pronunciation}
            </p>
            <p
              data-story-accent
              className="mt-2 text-center font-display text-base text-gold/90"
            >
              French for “The Star of Dreams”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
