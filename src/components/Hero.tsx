"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarMark } from "@/components/StarMark";
import { ASSETS, BRAND } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const EYEBROW = "LUXURY APARTMENT · PHAKALANE";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    fetch(ASSETS.heroVideo, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setUseFallback(true);
      })
      .catch(() => setUseFallback(true));

    if (!video) return;
    const onError = () => setUseFallback(true);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!section || !media || !content) return;

    const reduced = prefersReducedMotion();
    const logo = content.querySelector("[data-hero-logo]");
    const chars = content.querySelectorAll("[data-hero-char]");
    const brand = content.querySelector("[data-hero-brand]");
    const lines = content.querySelectorAll("[data-hero-line]");
    const copy = content.querySelector("[data-hero-copy]");
    const actions = content.querySelector("[data-hero-actions]");
    const scrollHint = content.querySelector("[data-hero-scroll]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([logo, chars, brand, lines, copy, actions, scrollHint], {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      gsap.set(logo, { opacity: 0, y: 18 });
      gsap.set(chars, { opacity: 0, y: 10 });
      gsap.set(brand, { opacity: 0, y: 18 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set([copy, actions, scrollHint], { opacity: 0, y: 24 });
      gsap.set(media, { scale: 1.08 });

      const intro = gsap.timeline({ delay: 0.25 });
      intro
        .to(logo, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.018,
            ease: "power2.out",
          },
          "-=0.35",
        )
        .to(brand, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.25")
        .to(
          lines,
          {
            yPercent: 0,
            duration: 1.05,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to(
          copy,
          { opacity: 1, y: 0, duration: 0.95, ease: "power2.out" },
          "-=0.55",
        )
        .to(
          actions,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.55",
        )
        .to(
          scrollHint,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.45",
        );

      gsap.to(media, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(content, {
        opacity: 0.35,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || useFallback) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-forest"
      aria-label="Hero"
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,21,14,0.45)_0%,rgba(6,21,14,0.35)_35%,rgba(6,21,14,0.78)_72%,rgba(6,21,14,0.94)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 star-field opacity-40"
          aria-hidden="true"
        />
      </div>

      {!useFallback && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute right-4 top-[5.5rem] z-20 inline-flex h-11 w-11 items-center justify-center border border-gold/35 bg-forest/45 text-ivory backdrop-blur-sm transition hover:border-gold sm:right-8"
          aria-label={playing ? "Pause background video" : "Play background video"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      )}

      <div
        ref={contentRef}
        className="section-pad relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end pb-16 pt-28 sm:pb-20"
      >
        <div data-hero-logo className="mb-6 flex items-center gap-3 text-gold">
          <StarMark className="h-10 w-10 sm:h-11 sm:w-11" />
        </div>

        <p className="eyebrow mb-4" aria-label={EYEBROW}>
          {EYEBROW.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-hero-char
              className="inline-block"
              style={{ whiteSpace: ch === " " ? "pre" : undefined }}
            >
              {ch}
            </span>
          ))}
        </p>

        <p
          data-hero-brand
          className="mb-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none tracking-[0.02em] text-ivory"
        >
          {BRAND.name}
        </p>

        <h1 className="heading-xl mb-6 max-w-[14ch] text-ivory">
          <span className="line-mask">
            <span data-hero-line className="inline-block">
              Your dream stay,
            </span>
          </span>
          <span className="line-mask">
            <span data-hero-line className="inline-block">
              written in the stars.
            </span>
          </span>
        </h1>

        <p
          data-hero-copy
          className="body-lg mb-10 max-w-[36rem] text-ivory/85"
        >
          A refined fully furnished retreat in the heart of Phakalane, created
          for comfort, privacy and effortless living.
        </p>

        <div data-hero-actions className="flex flex-wrap gap-3 sm:gap-4">
          <a href="#book" className="btn btn-primary">
            Book your stay
          </a>
          <a href="#apartment" className="btn btn-secondary">
            Explore the apartment
          </a>
        </div>

        <a
          href="#story"
          data-hero-scroll
          className="mt-12 inline-flex w-fit flex-col items-start gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-stone transition hover:text-gold"
        >
          Scroll to discover
          <span
            className="block h-10 w-px origin-top bg-gradient-to-b from-gold to-transparent"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
