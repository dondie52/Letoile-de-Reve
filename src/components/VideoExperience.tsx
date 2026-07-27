"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/constants";
import { TOUR_VIDEO } from "@/lib/media";
import { kenBurns, prefersReducedMotion } from "@/lib/motion";
import { useScrollReveal } from "@/lib/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const LIFESTYLE_VIDEO = TOUR_VIDEO.lifestyle;

export function VideoExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(!LIFESTYLE_VIDEO);
  const [playing, setPlaying] = useState(Boolean(LIFESTYLE_VIDEO));

  useScrollReveal(sectionRef);

  useEffect(() => {
    if (!LIFESTYLE_VIDEO) return;
    const video = videoRef.current;
    if (!video) return;
    const onError = () => setUseFallback(true);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || useFallback) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [useFallback]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const media = mediaWrapRef.current;
    if (!section || !text || !media) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { y: 48 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        media,
        { y: 24 },
        {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!useFallback) return;
    const photo = photoRef.current;
    if (!photo) return;
    const tl = kenBurns(photo, {
      scaleFrom: 1.05,
      scaleTo: 1.13,
      xPercent: 2,
      yPercent: -1.5,
      duration: 20,
    });
    return () => {
      tl?.kill();
    };
  }, [useFallback]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
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
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-green py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="section-pad mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div ref={textRef} className="relative z-10 max-w-xl">
          <h2
            id="experience-heading"
            data-reveal
            data-reveal-group="experience"
            className="heading-lg mb-6 text-ivory"
          >
            More than a stay. A feeling.
          </h2>
          <p data-reveal data-reveal-group="experience" className="body-lg">
            Arrive, settle in and enjoy a home where style, convenience and
            privacy come naturally.
          </p>
          <p
            data-reveal
            data-reveal-group="experience"
            className="body-lg mt-5 text-pretty"
          >
            Every stay is prepared before you arrive — fresh linen, a stocked
            kitchen and quiet rooms that let the day slow down.
          </p>
          <a
            data-reveal
            data-reveal-group="experience"
            href="#book"
            className="btn btn-secondary mt-9 w-fit"
          >
            Check your dates
          </a>
        </div>

        <div ref={mediaWrapRef} className="relative mx-[-1.25rem] sm:mx-0">
          <div className="relative aspect-[9/14] w-full overflow-hidden border-y border-gold/30 sm:border lg:max-h-[78vh]">
            {!useFallback && LIFESTYLE_VIDEO ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={ASSETS.bedroom}
              >
                <source src={LIFESTYLE_VIDEO} type="video/mp4" />
              </video>
            ) : (
              <div
                ref={photoRef}
                className="absolute inset-[-8%] will-change-transform"
              >
                <Image
                  src={ASSETS.bedroom}
                  alt="Lifestyle interior view of L’étoile de Rêve"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-forest/20"
              aria-hidden="true"
            />

            {!useFallback && LIFESTYLE_VIDEO ? (
              <div className="absolute bottom-4 right-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 bg-forest/55 text-ivory backdrop-blur-sm transition hover:border-gold"
                  aria-label={playing ? "Pause video" : "Play video"}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
