"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onError = () => setUseFallback(true);
    video.addEventListener("error", onError);

    fetch(ASSETS.heroVideo, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setUseFallback(true);
      })
      .catch(() => setUseFallback(true));

    return () => video.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    const progress = progressRef.current;
    if (!section || !pin || !media || !content || !progress) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = content.querySelectorAll<HTMLElement>("[data-hero-line]");
    const mm = gsap.matchMedia();

    if (reduced) {
      gsap.set(lines, { opacity: 1, y: 0, filter: "none" });
      gsap.set(progress, { scaleX: 1 });
      return;
    }

    gsap.set(lines, { opacity: 0, y: 28, filter: "blur(6px)" });
    gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

    const intro = gsap.to(lines, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.12,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.35,
    });

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (ctx) => {
        const { isMobile } = ctx.conditions as { isMobile: boolean };
        const end = isMobile ? "+=110%" : "+=170%";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            scrub: true,
            pin: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(media, { scale: 1.08, ease: "none", duration: 1 }, 0)
          .to(progress, { scaleX: 1, ease: "none", duration: 0.9 }, 0)
          .to(
            pin,
            {
              clipPath: "inset(0% 0% 14% 0%)",
              ease: "power1.inOut",
              duration: 0.28,
            },
            0.75,
          );
      },
    );

    return () => {
      intro.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative bg-forest"
      aria-label="Hero"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <div
          ref={mediaRef}
          className="absolute inset-0 origin-center will-change-transform"
        >
          {!useFallback ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={ASSETS.livingRoom}
              aria-hidden="true"
            >
              <source src={ASSETS.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={ASSETS.livingRoom}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,21,14,0.35)_0%,rgba(6,21,14,0.45)_40%,rgba(6,21,14,0.88)_100%)]"
            aria-hidden="true"
          />
        </div>

        <div
          ref={contentRef}
          className="section-pad relative z-10 mx-auto w-full max-w-[1400px] pb-16 pt-28 sm:pb-20"
        >
          <p
            data-hero-line
            className="font-display mb-3 text-[clamp(2rem,6vw,3.75rem)] leading-none text-ivory"
          >
            {BRAND.name}
          </p>
          <p data-hero-line className="eyebrow mb-5">
            Luxury apartment · Phakalane
          </p>
          <h1 data-hero-line className="heading-xl mb-6 max-w-[14ch] text-ivory">
            Stay among the stars.
          </h1>
          <p data-hero-line className="body-lg mb-10 max-w-[38rem] text-ivory/80">
            A refined fully furnished retreat in the heart of Phakalane, created
            for comfort, privacy and effortless living.
          </p>
          <div data-hero-line className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#book" className="btn btn-primary">
              Book your stay
            </a>
            <a href="#apartment" className="btn btn-secondary">
              Explore the apartment
            </a>
          </div>
          <div
            ref={progressRef}
            className="mt-12 h-px w-full max-w-xs origin-left bg-gold/80"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
