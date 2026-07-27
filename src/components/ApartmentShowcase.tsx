"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "@/lib/constants";
import { isMobileViewport, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function ApartmentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const imagesRef = useRef<HTMLElement[]>([]);
  const copiesRef = useRef<HTMLElement[]>([]);
  const [active, setActive] = useState(0);

  const paintRoom = useCallback((index: number, instant = false) => {
    const images = imagesRef.current;
    const copies = copiesRef.current;
    const progress = progressRef.current;
    if (!images.length || !copies.length) return;

    images.forEach((img, i) => {
      const on = i === index;
      if (instant) {
        gsap.set(img, {
          opacity: on ? 1 : 0,
          scale: 1,
          xPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          zIndex: on ? 2 : 1,
        });
      } else {
        gsap.to(img, {
          opacity: on ? 1 : 0,
          scale: on ? 1 : 1.04,
          xPercent: on ? 0 : i < index ? -4 : 4,
          duration: 0.55,
          ease: "power2.inOut",
          zIndex: on ? 2 : 1,
        });
      }
    });

    copies.forEach((copy, i) => {
      const on = i === index;
      if (instant) {
        gsap.set(copy, { opacity: on ? 1 : 0, y: 0 });
      } else {
        gsap.to(copy, {
          opacity: on ? 1 : 0,
          y: on ? 0 : i < index ? -14 : 14,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });

    if (progress) {
      gsap.to(progress, {
        scaleY: (index + 1) / ROOMS.length,
        duration: instant ? 0 : 0.45,
        ease: "power2.out",
        transformOrigin: "top center",
      });
    }

    setActive(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    if (!section || !pin || !progress) return;

    const images = gsap.utils.toArray<HTMLElement>("[data-room-image]");
    const copies = gsap.utils.toArray<HTMLElement>("[data-room-copy]");
    imagesRef.current = images;
    copiesRef.current = copies;

    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    /* Mobile: snap carousel — activate the centered room */
    if (mobile) {
      const scroller = section.querySelector<HTMLElement>("[data-room-scroller]");
      const articles = section.querySelectorAll<HTMLElement>("[data-room-card]");
      if (!scroller) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          const idx = Number(
            (visible.target as HTMLElement).dataset.roomIndex ?? "0",
          );
          setActive(idx);
          if (!prefersReducedMotion()) {
            const media = visible.target.querySelector<HTMLElement>(
              "[data-room-card-media]",
            );
            if (media) {
              gsap.fromTo(
                media,
                { scale: 1.04 },
                { scale: 1, duration: 0.85, ease: "power2.out", overwrite: true },
              );
            }
          }
        },
        {
          root: scroller,
          threshold: [0.55, 0.75],
          rootMargin: "0px -12% 0px -12%",
        },
      );
      articles.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }

    /* Desktop + reduced motion: clickable rooms, no pin scrub */
    if (reduced) {
      gsap.set(images, { opacity: 0, scale: 1, xPercent: 0 });
      gsap.set(images[0], { opacity: 1, zIndex: 2 });
      gsap.set(copies, { opacity: 0, y: 0 });
      gsap.set(copies[0], { opacity: 1 });
      gsap.set(progress, {
        scaleY: 1 / ROOMS.length,
        transformOrigin: "top center",
      });
      return;
    }

    /* Desktop tour — walk through the residence */
    gsap.set(images, {
      opacity: 0,
      scale: 1.06,
      xPercent: 6,
      clipPath: "inset(0% 0% 0% 100%)",
      zIndex: 1,
    });
    gsap.set(images[0], {
      opacity: 1,
      scale: 1,
      xPercent: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      zIndex: 2,
    });
    gsap.set(copies, { opacity: 0, y: 28 });
    gsap.set(copies[0], { opacity: 1, y: 0 });
    gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
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
            setActive(idx);
          },
        },
      });

      stRef.current = tl.scrollTrigger ?? null;

      tl.to(progress, { scaleY: 1, ease: "none", duration: 1 }, 0);

      /* Gentle living ken-burns on the first room while held */
      tl.fromTo(
        images[0],
        { scale: 1 },
        { scale: 1.05, ease: "none", duration: 0.22 },
        0,
      );

      ROOMS.forEach((_, i) => {
        if (i === 0) return;
        const start = (i - 0.22) / ROOMS.length;
        const hold = 0.18;

        tl.to(
          images[i - 1],
          {
            opacity: 0,
            scale: 1.08,
            xPercent: -5,
            clipPath: "inset(0% 18% 0% 0%)",
            duration: hold,
            ease: "none",
          },
          start,
        )
          .fromTo(
            images[i],
            {
              opacity: 0.35,
              scale: 1.06,
              xPercent: 7,
              clipPath: "inset(0% 0% 0% 72%)",
              zIndex: 3,
            },
            {
              opacity: 1,
              scale: 1,
              xPercent: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: hold,
              ease: "none",
            },
            start,
          )
          .to(
            images[i],
            { scale: 1.05, ease: "none", duration: 0.2 },
            start + hold,
          )
          .to(
            copies[i - 1],
            { opacity: 0, y: -18, duration: 0.1, ease: "none" },
            start,
          )
          .fromTo(
            copies[i],
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.12, ease: "none" },
            start + 0.04,
          );
      });
    }, section);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, []);

  const goToRoom = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    if (isMobileViewport()) {
      const el = document.getElementById(`room-${ROOMS[index].id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActive(index);
      return;
    }

    if (prefersReducedMotion()) {
      paintRoom(index, false);
      return;
    }

    const st = stRef.current;
    if (!st) {
      paintRoom(index, true);
      return;
    }
    const progress = (index + 0.45) / ROOMS.length;
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="apartment"
      ref={sectionRef}
      className="relative bg-forest"
      aria-labelledby="apartment-heading"
    >
      <div ref={pinRef} className="relative hidden min-h-[100dvh] md:block">
        <div className="section-pad mx-auto grid h-[100dvh] max-w-[1400px] grid-cols-[1.15fr_0.85fr] items-center gap-10 py-24">
          <div className="apartment-frame relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden border border-gold/25">
            {ROOMS.map((room, i) => (
              <div
                key={room.id}
                data-room-image
                className="absolute inset-0 will-change-transform"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes="(max-width: 1200px) 55vw, 700px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-forest/45 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="relative flex h-full max-h-[78vh] flex-col justify-between py-4">
            <div>
              <h2 id="apartment-heading" className="heading-md mb-8 text-ivory">
                Spaces designed for quiet luxury.
              </h2>
            </div>

            <div className="relative min-h-[10rem]" aria-live="polite">
              {ROOMS.map((room, i) => (
                <div
                  key={room.id}
                  data-room-copy
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <p className="meta mb-3 text-gold">
                    {room.index} / 04
                  </p>
                  <p className="title-sm mb-3 text-ivory">
                    {room.label}
                  </p>
                  <p className="body-lg">{room.description}</p>
                </div>
              ))}
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
                  {ROOMS.map((room, i) => (
                    <li key={room.id}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={i === active}
                        aria-label={`View ${room.label}`}
                        onClick={() => goToRoom(i)}
                        className={`room-tab nav-label group relative flex min-h-11 w-full items-center py-3 text-left transition-colors duration-300 ${
                          i === active
                            ? "text-gold"
                            : "text-stone/70 hover:text-ivory"
                        }`}
                      >
                        <span
                          className={`absolute -left-4 top-1/2 h-px -translate-y-1/2 bg-gold transition-all duration-500 ${
                            i === active ? "w-2.5 opacity-100" : "w-0 opacity-0"
                          }`}
                          aria-hidden="true"
                        />
                        {room.label}
                      </button>
                    </li>
                  ))}
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

      <div className="section-pad mx-auto max-w-[1400px] py-20 md:hidden">
        <h2 className="heading-md mb-12 text-ivory">
          Spaces designed for quiet luxury.
        </h2>
        <div
          data-room-scroller
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ROOMS.map((room, i) => (
            <article
              key={room.id}
              id={`room-${room.id}`}
              data-room-card
              data-room-index={i}
              className={`w-[85%] shrink-0 snap-center transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-70"
              }`}
              style={{ scrollMarginTop: "5.5rem" }}
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden border border-gold/20">
                <div
                  data-room-card-media
                  className="absolute inset-0 origin-center"
                >
                  <Image
                    src={room.src}
                    alt={room.alt}
                    fill
                    sizes="85vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="meta mb-2 text-gold">
                {room.index} / 04
              </p>
              <h3 className="title-sm mb-2 text-ivory">
                {room.label}
              </h3>
              <p className="body-lg">{room.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
