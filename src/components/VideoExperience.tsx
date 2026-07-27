"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, FACEBOOK_REELS } from "@/lib/constants";
import { TOUR_VIDEO } from "@/lib/media";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LIFESTYLE_VIDEO = TOUR_VIDEO.lifestyle;

export function VideoExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(!LIFESTYLE_VIDEO);
  const [playing, setPlaying] = useState(Boolean(LIFESTYLE_VIDEO));

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
    if (!section || !text || !media || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { scale: 1.04 },
        {
          scale: 1,
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
        text,
        { opacity: 0.4, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center center",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

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
      className="relative min-h-[100dvh] overflow-hidden bg-pine-950"
      aria-labelledby="experience-heading"
    >
      <div ref={mediaWrapRef} className="absolute inset-0">
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
            aria-hidden="true"
          >
            <source src={LIFESTYLE_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={ASSETS.bedroom}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-[50%_38%]"
          />
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,29,21,0.45)_0%,rgba(7,29,21,0.35)_45%,rgba(7,29,21,0.72)_100%)]"
          aria-hidden="true"
        />
      </div>

      {!useFallback && LIFESTYLE_VIDEO ? (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute bottom-6 right-6 z-20 inline-flex h-11 w-11 items-center justify-center border border-gold-500/40 bg-pine-950/55 text-ivory backdrop-blur-sm transition hover:border-gold-500"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <Pause size={16} strokeWidth={1.5} /> : <Play size={16} strokeWidth={1.5} />}
        </button>
      ) : null}

      <div className="section-pad relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] items-end py-24 sm:py-28">
        <div ref={textRef} className="max-w-lg pb-8">
          <h2 id="experience-heading" className="heading-lg text-ivory">
            Arrive.
            <br />
            Exhale.
            <br />
            Stay a while.
          </h2>
          <p className="meta mt-8 text-ivory/55">Watch on Facebook</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {FACEBOOK_REELS.map((reel) => (
              <a
                key={reel.href}
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[0.9375rem] text-ivory/80 transition hover:text-gold-400"
              >
                {reel.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
