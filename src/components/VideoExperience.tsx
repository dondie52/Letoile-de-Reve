"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function VideoExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

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
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [useFallback]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { y: 80 },
        {
          y: -40,
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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-green py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="section-pad mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div ref={textRef} className="relative z-10 max-w-xl">
          <p className="eyebrow mb-5">The experience</p>
          <h2 id="experience-heading" className="heading-lg mb-6 text-ivory">
            More than a stay. A feeling.
          </h2>
          <p className="body-lg">
            Arrive, settle in and enjoy a home where style, convenience and
            privacy come naturally.
          </p>
        </div>

        <div className="relative mx-[-1.25rem] sm:mx-0">
          <div className="relative aspect-[9/14] w-full overflow-hidden border-y border-gold/30 sm:border lg:max-h-[78vh]">
            {!useFallback ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={ASSETS.bedroom}
              >
                <source src={ASSETS.lifestyleVideo} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={ASSETS.bedroom}
                alt="Lifestyle interior view of L’étoile de Rêve"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            )}

            {!useFallback && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 bg-forest/55 text-ivory backdrop-blur-sm transition hover:border-gold"
                  aria-label={playing ? "Pause video" : "Play video"}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 bg-forest/55 text-ivory backdrop-blur-sm transition hover:border-gold"
                  aria-label={muted ? "Unmute video" : "Mute video"}
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
