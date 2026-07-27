"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function VideoExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    fetch(ASSETS.lifestyleVideo, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setUseFallback(true);
      })
      .catch(() => setUseFallback(true));
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
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [useFallback]);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const text = textRef.current;
    if (!section || !media || !text) return;

    const reduced = prefersReducedMotion();
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { y: 70, opacity: 0.15 },
        {
          y: -20,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        media,
        { y: -30 },
        {
          y: 40,
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
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-forest"
      aria-labelledby="experience-heading"
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 will-change-transform"
      >
        {!useFallback ? (
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
            <source src={ASSETS.lifestyleVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={ASSETS.bedroom}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,14,0.88)_0%,rgba(6,21,14,0.55)_48%,rgba(6,21,14,0.35)_100%)] max-md:bg-[linear-gradient(180deg,rgba(6,21,14,0.35)_0%,rgba(6,21,14,0.82)_55%,rgba(6,21,14,0.94)_100%)]"
          aria-hidden="true"
        />
      </div>

      {!useFallback && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute bottom-6 right-4 z-20 inline-flex h-11 w-11 items-center justify-center border border-gold/40 bg-forest/55 text-ivory backdrop-blur-sm transition hover:border-gold sm:right-8"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      )}

      <div className="section-pad relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] items-end py-24 md:items-center">
        <div ref={textRef} className="max-w-xl">
          <p className="eyebrow mb-5">The experience</p>
          <h2 id="experience-heading" className="heading-lg mb-6 text-ivory">
            More than a place to stay.
            <br />
            A feeling.
          </h2>
          <p className="body-lg text-ivory/85">
            Arrive, settle in and enjoy a home where style, convenience and
            privacy come naturally.
          </p>
        </div>
      </div>
    </section>
  );
}
