"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/constants";
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
    const lines = content.querySelectorAll("[data-hero-line]");
    const scrollHint = content.querySelector("[data-hero-scroll]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([lines, scrollHint], { opacity: 1, y: 0 });
        gsap.set(media, { scale: 1 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 28 });
      gsap.set(scrollHint, { opacity: 0, y: 16 });
      gsap.set(media, { scale: 1.06 });

      const intro = gsap.timeline({ delay: 0.3 });
      intro
        .to(lines, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power2.out",
        })
        .to(
          scrollHint,
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
          "-=0.4",
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
        opacity: 0.4,
        y: -28,
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,21,14,0.55)_0%,rgba(6,21,14,0.32)_38%,rgba(6,21,14,0.78)_72%,rgba(6,21,14,0.95)_100%)]"
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
          className="heading-xl mb-5 max-w-[16ch] text-pretty text-ivory sm:mb-6 sm:max-w-[18ch] lg:max-w-[20ch]"
        >
          Your dream stay, written in the stars.
        </h1>

        <p
          data-hero-line
          className="body-lg mb-8 max-w-[36rem] text-pretty text-ivory/85 sm:mb-10"
        >
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
          className="mt-10 hidden w-fit flex-col items-start gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-stone transition hover:text-gold md:mt-12 md:inline-flex"
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
