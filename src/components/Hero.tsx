"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
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
  todayISO,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO = TOUR_VIDEO.hero;

function nextDayISO(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + 1);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(!HERO_VIDEO);
  const [playing, setPlaying] = useState(Boolean(HERO_VIDEO));
  const minDate = useMemo(() => todayISO(), []);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const checkOutMin = arrival ? nextDayISO(arrival) : minDate;

  useEffect(() => {
    if (!HERO_VIDEO) return;
    const video = videoRef.current;
    if (!video) return;
    const onError = () => setUseFallback(true);
    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

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
    const panel = content.querySelector<HTMLElement>("[data-hero-panel]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([lines, scrollHint, panel, media, veil], { clearProps: "all" });
        gsap.set(lines, { opacity: 1, y: 0, clipPath: "none", filter: "none" });
        gsap.set([scrollHint, panel], { opacity: 1, y: 0 });
        gsap.set(media, { scale: 1, filter: "none" });
        gsap.set(veil, { opacity: 0 });
        return;
      }

      gsap.set(media, { scale: 1.06, filter: "blur(8px)" });
      gsap.set(veil, { opacity: 1 });
      gsap.set(lines, {
        opacity: 0,
        y: 28,
        clipPath: "inset(110% 0 0 0)",
        filter: "blur(4px)",
      });
      gsap.set([scrollHint, panel], { opacity: 0, y: 16 });
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
            scale: 1.02,
            filter: "blur(0px)",
            duration: 1.3,
            onComplete: () => media.classList.remove("is-animating"),
          },
          0,
        )
        .to(veil, { opacity: 0, duration: 1.15, ease: "power2.inOut" }, 0.08)
        .to(
          lines,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
          },
          0.3,
        )
        .to(
          [scrollHint, panel],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            onComplete: () => scrollHint?.classList.add("is-ready"),
          },
          "-=0.2",
        );

      if (scrollStem) {
        intro.to(
          scrollStem,
          { scaleY: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4",
        );
      }

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

  const onCheckAvailability = (e: FormEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(
        "letoile-enquiry",
        JSON.stringify({ arrival, departure, guests }),
      );
    } catch {
      /* ignore quota / private mode */
    }
    window.dispatchEvent(new Event("letoile:enquiry-prefill"));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-pine-950"
      aria-label="Hero"
    >
      <div ref={mediaRef} className="hero-media absolute inset-0 origin-center">
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
            className="object-cover object-[50%_42%]"
          />
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,29,21,0.78)_0%,rgba(7,29,21,0.35)_42%,rgba(7,29,21,0.55)_70%,rgba(7,29,21,0.88)_100%)]"
          aria-hidden="true"
        />
        <div
          ref={veilRef}
          className="hero-veil pointer-events-none absolute inset-0 bg-pine-950/70"
          aria-hidden="true"
        />
      </div>

      {!useFallback && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute right-4 top-[calc(var(--nav-h)+0.75rem)] z-20 inline-flex h-11 w-11 items-center justify-center border border-gold-500/35 bg-pine-950/45 text-ivory backdrop-blur-sm transition hover:border-gold-500 sm:right-8"
          aria-label={playing ? "Pause background video" : "Play background video"}
        >
          {playing ? <Pause size={15} strokeWidth={1.5} /> : <Play size={15} strokeWidth={1.5} />}
        </button>
      )}

      <div
        ref={contentRef}
        className="hero-content section-pad relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10"
      >
        <div className="max-w-xl">
          <p data-hero-line className="mb-3 font-display text-[clamp(1.65rem,3.5vw,2.35rem)] leading-none tracking-[-0.02em] text-ivory">
            L’étoile de Rêve
          </p>

          <h1
            data-hero-line
            className="heading-xl mb-5 max-w-[12ch] text-pretty text-ivory sm:mb-6"
          >
            A private stay,
            <br />
            beautifully considered.
          </h1>

          <p data-hero-line className="body-lg mb-8 max-w-[36ch] text-pretty sm:mb-10">
            Fully furnished luxury living in Phakalane.
          </p>

          <div data-hero-line className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a href="#book" className="btn btn-primary w-fit">
              Book your stay
            </a>
            <a
              href="#apartment"
              className="link-underline meta w-fit text-ivory/75 transition hover:text-gold-400"
            >
              Explore the residence
            </a>
          </div>

          <a
            href="#story"
            data-hero-scroll
            className="meta mt-10 hidden w-fit flex-col items-start gap-2 text-ivory/60 transition hover:text-gold-400 lg:mt-14 lg:inline-flex"
          >
            Continue
            <span
              data-scroll-stem
              className="scroll-stem block h-10 w-px origin-top bg-gradient-to-b from-gold-500 to-transparent"
              aria-hidden="true"
            />
          </a>
        </div>

        <form
          data-hero-panel
          onSubmit={onCheckAvailability}
          className="hero-avail mt-10 hidden w-full max-w-sm justify-self-end lg:mt-0 lg:block"
          aria-label="Check availability"
        >
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hero-arrival" className="field-label">
                Arrival
              </label>
              <input
                id="hero-arrival"
                type="date"
                min={minDate}
                value={arrival}
                onChange={(e) => {
                  const next = e.target.value;
                  setArrival(next);
                  if (departure && next && departure <= next) setDeparture("");
                }}
                className="input-field input-date"
              />
            </div>
            <div>
              <label htmlFor="hero-departure" className="field-label">
                Departure
              </label>
              <input
                id="hero-departure"
                type="date"
                min={checkOutMin}
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="input-field input-date"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="hero-guests" className="field-label">
              Guests
            </label>
            <select
              id="hero-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="input-field"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Check availability
          </button>
        </form>
      </div>
    </section>
  );
}
