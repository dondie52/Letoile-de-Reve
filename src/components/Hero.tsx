"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { ASSETS } from "@/lib/constants";
import { TOUR_VIDEO } from "@/lib/media";
import { prefersReducedMotion } from "@/lib/motion-utils";

const HERO_VIDEO = TOUR_VIDEO.hero;

function whenIdle(cb: () => void, timeout = 2500) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, Math.min(timeout, 1200));
  return () => window.clearTimeout(t);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
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

  /* Scroll polish only — intro is CSS so LCP/SI/TBT stay clean on both viewports */
  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!section || !media || !content) return;
    if (prefersReducedMotion()) {
      content.querySelector<HTMLElement>("[data-hero-scroll]")?.classList.add("is-ready");
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;
    const cancelIdle = whenIdle(() => {
      void (async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        content
          .querySelector<HTMLElement>("[data-hero-scroll]")
          ?.classList.add("is-ready");

        const ctx = gsap.context(() => {
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

        revert = () => ctx.revert();
      })();
    }, 2800);

    return () => {
      cancelled = true;
      cancelIdle();
      revert?.();
    };
  }, []);

  /* Still-photo motion when no tour video — after idle to protect TBT */
  useEffect(() => {
    if (!useFallback) return;
    const photo = photoRef.current;
    if (!photo) return;
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let kill: (() => void) | undefined;
    const cancelIdle = whenIdle(() => {
      void (async () => {
        const { kenBurns } = await import("@/lib/motion");
        if (cancelled) return;
        const tl = kenBurns(photo, {
          scaleFrom: 1.04,
          scaleTo: 1.12,
          xPercent: -2.2,
          yPercent: 1.8,
          duration: 22,
          delay: 0.2,
        });
        kill = () => tl?.kill();
      })();
    }, 3200);

    return () => {
      cancelled = true;
      cancelIdle();
      kill?.();
    };
  }, [useFallback]);

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
          <div ref={photoRef} className="absolute inset-[-6%] will-change-transform">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={ASSETS.livingRoomSm}
                type="image/webp"
              />
              <img
                src={ASSETS.livingRoom}
                alt=""
                width={810}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          </div>
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,21,14,0.62)_0%,rgba(6,21,14,0.48)_32%,rgba(6,21,14,0.72)_52%,rgba(6,21,14,0.9)_72%,rgba(6,21,14,0.97)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(180deg,transparent_0%,rgba(6,21,14,0.55)_45%,rgba(6,21,14,0.88)_100%)] md:h-[58%]"
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
