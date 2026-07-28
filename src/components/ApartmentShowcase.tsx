"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "@/lib/constants";
import { isMobileViewport, kenBurns, prefersReducedMotion } from "@/lib/motion";
import { useScrollReveal } from "@/lib/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

type Layer = {
  index: number;
  role: "current" | "incoming";
};

export function ApartmentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const displayedRef = useRef(0);
  const transitioningRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const layersRef = useRef<Map<number, HTMLElement>>(new Map());
  const kenBurnsRef = useRef<gsap.core.Timeline | null>(null);
  const genRef = useRef(0);
  const syncingTrackRef = useRef(false);
  const roomStepLockRef = useRef(false);

  const [active, setActive] = useState(0);
  const [layers, setLayers] = useState<Layer[]>([
    { index: 0, role: "current" },
  ]);

  useScrollReveal(sectionRef);

  const setActiveSafe = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  const paintProgress = useCallback((index: number, instant = false) => {
    const progress = progressRef.current;
    if (!progress) return;
    gsap.to(progress, {
      scaleY: (index + 1) / ROOMS.length,
      duration: instant ? 0 : 0.45,
      ease: "power2.out",
      transformOrigin: "top center",
    });
  }, []);

  const startKenBurns = useCallback((index: number) => {
    kenBurnsRef.current?.kill();
    kenBurnsRef.current = null;
    if (prefersReducedMotion()) return;

    const layer = layersRef.current.get(index);
    const photo = layer?.querySelector<HTMLElement>("[data-ken-burns]");
    if (!photo) return;

    const directions = [
      { xPercent: -2.4, yPercent: 1.6 },
      { xPercent: 2.2, yPercent: -1.4 },
      { xPercent: -1.6, yPercent: -2 },
      { xPercent: 1.8, yPercent: 2.2 },
    ] as const;
    const dir = directions[index % directions.length];

    kenBurnsRef.current = kenBurns(photo, {
      scaleFrom: 1.02,
      scaleTo: 1.1,
      ...dir,
      duration: 16,
    });
  }, []);

  const settleLayer = useCallback(
    (index: number) => {
      displayedRef.current = index;
      setLayers([{ index, role: "current" }]);
      transitioningRef.current = false;
      requestAnimationFrame(() => startKenBurns(index));
    },
    [startKenBurns],
  );

  const runDesktopTransition = useCallback(
    (next: number, instant = false) => {
      if (next < 0 || next >= ROOMS.length) return;
      setActiveSafe(next);
      paintProgress(next, instant);

      if (next === displayedRef.current && !transitioningRef.current) {
        return;
      }

      if (transitioningRef.current && !instant) {
        pendingRef.current = next;
        return;
      }

      const from = displayedRef.current;
      if (next === from) return;

      transitioningRef.current = true;
      pendingRef.current = null;
      kenBurnsRef.current?.kill();
      kenBurnsRef.current = null;

      if (prefersReducedMotion() || instant) {
        settleLayer(next);
        return;
      }

      setLayers([
        { index: from, role: "current" },
        { index: next, role: "incoming" },
      ]);
    },
    [paintProgress, setActiveSafe, settleLayer],
  );

  const runDesktopTransitionRef = useRef(runDesktopTransition);
  const settleLayerRef = useRef(settleLayer);

  useEffect(() => {
    runDesktopTransitionRef.current = runDesktopTransition;
    settleLayerRef.current = settleLayer;
  }, [runDesktopTransition, settleLayer]);

  /* Animate only the mounted current + incoming pair; drop previous when done */
  useEffect(() => {
    if (layers.length !== 2) return;

    const fromLayer = layers.find((l) => l.role === "current");
    const toLayer = layers.find((l) => l.role === "incoming");
    if (!fromLayer || !toLayer) return;

    const gen = ++genRef.current;
    let tl: gsap.core.Timeline | null = null;
    let settled = false;

    const finish = (index: number) => {
      if (settled || gen !== genRef.current) return;
      settled = true;
      settleLayerRef.current(index);
      const queued = pendingRef.current;
      pendingRef.current = null;
      if (queued !== null && queued !== index) {
        requestAnimationFrame(() =>
          runDesktopTransitionRef.current(queued, false),
        );
      }
    };

    const frame = requestAnimationFrame(() => {
      if (gen !== genRef.current) return;

      const outgoing = layersRef.current.get(fromLayer.index);
      const incoming = layersRef.current.get(toLayer.index);
      if (!outgoing || !incoming) {
        finish(toLayer.index);
        return;
      }

      const forward = toLayer.index > fromLayer.index;
      gsap.set(outgoing, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 1,
        scale: 1,
        xPercent: 0,
      });
      gsap.set(incoming, {
        opacity: 1,
        clipPath: forward
          ? "inset(0% 0% 0% 100%)"
          : "inset(0% 100% 0% 0%)",
        zIndex: 2,
        scale: 1.04,
        xPercent: forward ? 4 : -4,
      });

      tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => finish(toLayer.index),
      });

      tl.to(
        outgoing,
        {
          clipPath: forward
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)",
          opacity: 0,
          scale: 1.06,
          xPercent: forward ? -3 : 3,
          duration: 0.55,
        },
        0,
      ).to(
        incoming,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          xPercent: 0,
          duration: 0.55,
        },
        0,
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      tl?.kill();
    };
  }, [layers]);

  /* Initial desktop Ken Burns on first room */
  useEffect(() => {
    if (isMobileViewport()) return;
    const frame = requestAnimationFrame(() => startKenBurns(0));
    return () => {
      cancelAnimationFrame(frame);
      kenBurnsRef.current?.kill();
      kenBurnsRef.current = null;
    };
  }, [startKenBurns]);

  const syncMobileTrack = useCallback((index: number, instant = false) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(
      `[data-room-slide][data-index="${index}"]`,
    );
    if (!slide) return;

    const left =
      slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    syncingTrackRef.current = true;
    if (instant || prefersReducedMotion()) {
      track.scrollLeft = left;
      requestAnimationFrame(() => {
        syncingTrackRef.current = false;
      });
      return;
    }
    track.scrollTo({ left, behavior: "smooth" });
    window.setTimeout(() => {
      syncingTrackRef.current = false;
    }, 420);
  }, []);

  /* Desktop only — GSAP pin/scrub. Mobile uses native snap (no ScrollTrigger). */
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    if (!section || !pin || !progress) return;

    const reduced = prefersReducedMotion();
    if (isMobileViewport()) return;

    gsap.set(progress, {
      scaleY: 1 / ROOMS.length,
      transformOrigin: "top center",
    });

    if (reduced) {
      return;
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${ROOMS.length * 105}%`,
        scrub: 0.65,
        pin: pin,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            ROOMS.length - 1,
            Math.floor(self.progress * ROOMS.length + 0.001),
          );
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleY: Math.max(1 / ROOMS.length, self.progress),
              transformOrigin: "top center",
            });
          }
          if (idx !== activeRef.current) {
            runDesktopTransition(idx, false);
          }
        },
      });
      stRef.current = st;
    }, section);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [runDesktopTransition]);

  /* Mobile: native horizontal snap + vertical scroll/wheel steps rooms */
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track || !isMobileViewport()) return;

    const slides = Array.from(
      track.querySelectorAll<HTMLElement>("[data-room-slide]"),
    );
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (syncingTrackRef.current) return;
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const idx = Number((best.target as HTMLElement).dataset.index);
        if (Number.isFinite(idx) && idx !== activeRef.current) {
          setActiveSafe(idx);
        }
      },
      { root: track, threshold: [0.55, 0.7, 0.85] },
    );

    slides.forEach((slide) => observer.observe(slide));

    const stepRoom = (delta: number) => {
      if (roomStepLockRef.current || Math.abs(delta) < 8) return false;
      const next = Math.min(
        ROOMS.length - 1,
        Math.max(0, activeRef.current + (delta > 0 ? 1 : -1)),
      );
      if (next === activeRef.current) return false;
      roomStepLockRef.current = true;
      setActiveSafe(next);
      syncMobileTrack(next, prefersReducedMotion());
      window.setTimeout(() => {
        roomStepLockRef.current = false;
      }, 480);
      return true;
    };

    /* Trackpads / mouse: vertical wheel over the gallery advances rooms */
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = activeRef.current === 0 && event.deltaY < 0;
      const atEnd =
        activeRef.current === ROOMS.length - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      if (stepRoom(event.deltaY)) {
        event.preventDefault();
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      observer.disconnect();
      track.removeEventListener("wheel", onWheel);
    };
  }, [setActiveSafe, syncMobileTrack]);

  const scrollMobileTo = useCallback(
    (index: number) => {
      setActiveSafe(index);
      syncMobileTrack(index, prefersReducedMotion());
    },
    [setActiveSafe, syncMobileTrack],
  );

  const goToRoom = (index: number) => {
    if (index < 0 || index >= ROOMS.length) return;

    if (isMobileViewport()) {
      scrollMobileTo(index);
      return;
    }

    if (prefersReducedMotion()) {
      runDesktopTransition(index, true);
      return;
    }

    const st = stRef.current;
    if (!st) {
      runDesktopTransition(index, false);
      return;
    }
    const progress = (index + 0.45) / ROOMS.length;
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const room = ROOMS[active];

  return (
    <section
      id="apartment"
      ref={sectionRef}
      className="relative bg-forest"
      aria-label="Apartment spaces"
    >
      {/* Desktop pinned gallery */}
      <div ref={pinRef} className="relative hidden min-h-[100svh] md:block">
        <div className="section-pad mx-auto grid h-[100svh] max-w-[1400px] grid-cols-[1.15fr_0.85fr] items-center gap-10 py-24">
          <div className="apartment-frame relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden border border-gold/25">
            {layers.map((layer) => {
              const item = ROOMS[layer.index];
              return (
                <div
                  key={`${item.id}-${layer.role}`}
                  ref={(el) => {
                    if (el) layersRef.current.set(layer.index, el);
                    else layersRef.current.delete(layer.index);
                  }}
                  data-room-image
                  data-room-role={layer.role}
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    opacity: layer.role === "current" ? 1 : 0,
                    zIndex: layer.role === "incoming" ? 2 : 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                  }}
                >
                  <div
                    data-ken-burns
                    className="absolute inset-[-6%] will-change-transform"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1200px) 55vw, 700px"
                      className="object-cover"
                      style={{ objectPosition: item.objectPosition }}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-forest/45 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="relative flex h-full max-h-[78svh] flex-col justify-between py-4">
            <div>
              <h2 id="apartment-heading" className="heading-md mb-8 text-ivory">
                Spaces designed for quiet luxury.
              </h2>
            </div>

            <div className="relative min-h-[10rem]" aria-live="polite">
              <p className="meta mb-3 text-gold">{room.index} / 04</p>
              <p className="title-sm mb-3 text-ivory">{room.label}</p>
              <p className="body-lg">{room.description}</p>
            </div>

            <div className="mt-10 flex items-start gap-6">
              <div
                className="relative h-32 w-px bg-ivory/15"
                aria-hidden="true"
              >
                <div
                  ref={progressRef}
                  className="absolute left-0 top-0 h-full w-px origin-top bg-gold"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <ul
                  className="flex flex-col gap-0.5"
                  role="tablist"
                  aria-label="Apartment rooms"
                >
                  {ROOMS.map((r, i) => {
                    const isActive = i === active;
                    return (
                      <li key={r.id}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`View ${r.label}`}
                          onClick={() => goToRoom(i)}
                          className={`room-tab nav-label group relative flex min-h-11 w-full items-center py-3 text-left transition-colors duration-300 ${
                            isActive
                              ? "is-active text-gold"
                              : "text-stone/70 hover:text-ivory"
                          }`}
                        >
                          <span
                            className={`absolute -left-4 top-1/2 h-px -translate-y-1/2 bg-gold transition-all duration-500 ${
                              isActive ? "w-2.5 opacity-100" : "w-0 opacity-0"
                            }`}
                            aria-hidden="true"
                          />
                          {r.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center border border-gold/35 text-ivory transition hover:border-gold disabled:opacity-35"
                    aria-label="Previous room"
                    onClick={() => goToRoom(Math.max(0, active - 1))}
                    disabled={active === 0}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center border border-gold/35 text-ivory transition hover:border-gold disabled:opacity-35"
                    aria-label="Next room"
                    onClick={() =>
                      goToRoom(Math.min(ROOMS.length - 1, active + 1))
                    }
                    disabled={active === ROOMS.length - 1}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile native snap gallery (no GSAP pin — touch scroll stays free) */}
      <div className="apartment-mobile pt-[clamp(3.5rem,10vw,5rem)] md:hidden">
        <div className="section-pad mx-auto max-w-[1400px]">
          <h2
            id="apartment-heading-mobile"
            data-reveal
            data-reveal-group="apartment-intro"
            className="heading-md mb-3 text-ivory"
          >
            Spaces designed for quiet luxury.
          </h2>
          <p
            data-reveal
            data-reveal-group="apartment-intro"
            className="meta mb-[clamp(1.25rem,4vw,2rem)] text-stone"
          >
            Swipe through the rooms
          </p>
        </div>

        <div
          ref={mobileTrackRef}
          className="apartment-mobile-track"
          data-lenis-prevent
          aria-label="Apartment rooms gallery"
        >
          {ROOMS.map((r, i) => {
            const isActive = i === active;
            return (
              <article
                key={r.id}
                data-room-slide
                data-index={i}
                className={`apartment-mobile-slide ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="apartment-mobile-card flex flex-col gap-4">
                  <p className="meta text-gold">{r.index} / 04</p>
                  <h3 className="title-sm text-ivory">{r.label}</h3>
                  <p className="body-lg">{r.description}</p>

                  <div className="apartment-mobile-media relative w-full overflow-hidden border border-gold/20">
                    <div
                      className={`absolute inset-[-5%] transition-transform duration-[1.2s] ease-out ${
                        isActive ? "scale-100" : "scale-[1.06]"
                      }`}
                    >
                      <Image
                        src={r.src}
                        alt={r.alt}
                        fill
                        sizes="(max-width: 768px) 88vw, 600px"
                        loading="lazy"
                        className="object-cover"
                        style={{ objectPosition: r.objectPosition }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="section-pad mx-auto mt-5 flex max-w-[1400px] items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-gold/45 bg-forest/55 text-ivory backdrop-blur-sm transition hover:border-gold disabled:opacity-35"
              aria-label="Previous room"
              onClick={() => goToRoom(Math.max(0, active - 1))}
              disabled={active === 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-gold/45 bg-forest/55 text-ivory backdrop-blur-sm transition hover:border-gold disabled:opacity-35"
              aria-label="Next room"
              onClick={() => goToRoom(Math.min(ROOMS.length - 1, active + 1))}
              disabled={active === ROOMS.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div
            className="flex items-center gap-2 pr-1"
            role="tablist"
            aria-label="Room navigation"
          >
            {ROOMS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`View ${r.label}`}
                onClick={() => goToRoom(i)}
                className={`h-2.5 w-2.5 transition-colors duration-300 ${
                  i === active ? "bg-gold" : "bg-ivory/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
