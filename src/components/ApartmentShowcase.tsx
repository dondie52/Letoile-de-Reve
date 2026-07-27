"use client";

import { useEffect, useRef, useState } from "react";
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    if (!section || !pin || !progress) return;

    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    if (reduced || mobile) {
      gsap.set(progress, { scaleY: 1 });
      return;
    }

    const images = gsap.utils.toArray<HTMLElement>("[data-room-image]");
    const copies = gsap.utils.toArray<HTMLElement>("[data-room-copy]");

    gsap.set(images, { opacity: 0, scale: 1.04 });
    gsap.set(images[0], { opacity: 1, scale: 1 });
    gsap.set(copies, { opacity: 0, y: 22 });
    gsap.set(copies[0], { opacity: 1, y: 0 });
    gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${ROOMS.length * 90}%`,
          scrub: true,
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

      ROOMS.forEach((_, i) => {
        if (i === 0) return;
        const start = (i - 0.28) / ROOMS.length;
        tl.to(
          images[i - 1],
          { opacity: 0, scale: 1.08, duration: 0.22, ease: "none" },
          start,
        )
          .fromTo(
            images[i],
            { opacity: 0, scale: 1.04 },
            { opacity: 1, scale: 1, duration: 0.22, ease: "none" },
            start,
          )
          .to(copies[i - 1], { opacity: 0, y: -16, duration: 0.14 }, start)
          .to(copies[i], { opacity: 1, y: 0, duration: 0.14 }, start + 0.04);
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

    if (isMobileViewport() || prefersReducedMotion()) {
      const el = document.getElementById(`room-${ROOMS[index].id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(index);
      return;
    }

    const st = stRef.current;
    if (!st) return;
    const progress = (index + 0.5) / ROOMS.length;
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
          <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden border border-gold/25">
            {ROOMS.map((room, i) => (
              <div
                key={room.id}
                data-room-image
                className="absolute inset-0"
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent"
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
                  className="flex flex-col gap-2"
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
                        className={`nav-label group relative py-1 text-left transition-colors ${
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
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ROOMS.map((room) => (
            <article
              key={room.id}
              id={`room-${room.id}`}
              className="w-[85%] shrink-0 snap-center"
              style={{ scrollMarginTop: "5.5rem" }}
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden border border-gold/20">
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes="85vw"
                  loading="lazy"
                  className="object-cover"
                />
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
