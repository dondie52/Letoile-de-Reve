"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/constants";
import { TOUR_VIDEO } from "@/lib/media";
import {
  ARRIVE_EASE,
  heroIntroDelay,
  prefersReducedMotion,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const EYEBROW = "LUXURY APARTMENT · PHAKALANE";
const HERO_VIDEO = TOUR_VIDEO.hero;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /* No video path → photo only (avoids HEAD/GET 404s) */
  const [useFallback, setUseFallback] = useState(!HERO_VIDEO);
  const [playing, setPlaying] = useState(Boolean(HERO_VIDEO));

  useEffect(() => {
    if (!HERO_VIDEO) return;
    const video = videoRef.current;
    if (!video) return;
    const onError = () => setUseFallback(true);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  /* Pause looping video when the hero leaves the viewport */
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || useFallback) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (playing) void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [playing, useFallback]);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const veil = veilRef.current;
    const content = contentRef.current;
    if (!section || !media || !veil || !content) return;

    const reduced = prefersReducedMotion();
    const lines = content.querySelectorAll<HTMLElement>("[data-hero-line]");
    const scrollHint = content.querySelector<HTMLElement>("[data-hero-scroll]");
    const scrollStem = scrollHint?.querySelector<HTMLElement>("[data-scroll-stem]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([lines, scrollHint, media, veil], {
          clearProps: "all",
        });
        gsap.set(lines, { opacity: 1, y: 0, clipPath: "none", filter: "none" });
        gsap.set(scrollHint, { opacity: 1, y: 0 });
        gsap.set(media, { scale: 1, filter: "none" });
        gsap.set(veil, { opacity: 0 });
        return;
      }

      /* Dawn under the stars — veil clears, type unveils, cue breathes */
      gsap.set(media, { scale: 1.1, filter: "blur(10px)" });
      gsap.set(veil, { opacity: 1 });
      gsap.set(lines, {
        opacity: 0,
        y: 36,
        clipPath: "inset(110% 0 0 0)",
        filter: "blur(6px)",
      });
      gsap.set(scrollHint, { opacity: 0, y: 12 });
      if (scrollStem) gsap.set(scrollStem, { scaleY: 0, transformOrigin: "top center" });

      const intro = gsap.timeline({
        delay: heroIntroDelay(),
        defaults: { ease: ARRIVE_EASE },
        onComplete: () => {
          gsap.set(media, { clearProps: "filter" });
          gsap.set(lines, { clearProps: "clipPath,filter" });
          media.classList.remove("is-animating");
        },
      });

      media.classList.add("is-animating");

      intro
        .to(
          media,
          {
            scale: 1.04,
            filter: "blur(0px)",
            duration: 1.35,
            onComplete: () => media.classList.remove("is-animating"),
          },
          0,
        )
        .to(
          veil,
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.1,
        )
        .to(
          lines,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.11,
          },
          0.35,
        )
        .to(
          scrollHint,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            onComplete: () => scrollHint?.classList.add("is-ready"),
          },
          "-=0.25",
        );

      if (scrollStem) {
        intro.to(
          scrollStem,
          { scaleY: 1, duration: 0.75, ease: "power2.out" },
          "-=0.45",
        );
      }

      /* Scroll continuity — settle into the residence */
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
        y: -36,
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
      className="relative min-h-[100dvh] overflow-hidden bg-forest"
      aria-label="Hero"
    >
      <div
        ref={mediaRef}
        className="hero-media absolute inset-0 origin-center"
      >
        {!useFallback && HERO_VIDEO ? (
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
            <source src={HERO_VIDEO} type="video/mp4" />
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,21,14,0.55)_0%,rgba(6,21,14,0.32)_38%,rgba(6,21,14,0.78)_72%,rgba(6,21,14,0.95)_100%)]"
          aria-hidden="true"
        />
        <div
          ref={veilRef}
          className="hero-veil pointer-events-none absolute inset-0 bg-forest/70"
          aria-hidden="true"
        />
      </div>

      {!useFallback && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute right-4 top-[calc(var(--nav-h)+0.75rem)] z-20 inline-flex h-11 w-11 items-center justify-center border border-gold/35 bg-forest/45 text-ivory backdrop-blur-sm transition hover:border-gold sm:right-8"
          aria-label={playing ? "Pause background video" : "Play background video"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      )}

      <div
        ref={contentRef}
        className="hero-content section-pad relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end"
      >
        <p data-hero-line className="eyebrow mb-4">
          {EYEBROW}
        </p>

        <h1
          data-hero-line
          className="heading-xl mb-5 max-w-[14ch] text-pretty text-ivory sm:mb-6 sm:max-w-[16ch] lg:max-w-[18ch]"
        >
          Your dream stay, written in the stars.
        </h1>

        <p data-hero-line className="body-lg mb-8 text-pretty sm:mb-10">
          A refined fully furnished retreat in the heart of Phakalane, created
          for comfort, privacy and effortless living.
        </p>

        <div
          data-hero-line
          data-hero-actions
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
        >
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
          className="meta mt-10 hidden w-fit flex-col items-start gap-2 transition hover:text-gold lg:mt-12 lg:inline-flex"
        >
          Scroll to the story
          <span
            data-scroll-stem
            className="scroll-stem block h-10 w-px origin-top bg-gradient-to-b from-gold to-transparent"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
