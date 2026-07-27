"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function ApartmentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (reduced || isMobile) return;

    const images = gsap.utils.toArray<HTMLElement>("[data-room-image]");
    const labels = gsap.utils.toArray<HTMLElement>("[data-room-copy]");

    gsap.set(images, { opacity: 0, scale: 1.04 });
    gsap.set(images[0], { opacity: 1, scale: 1 });
    gsap.set(labels, { opacity: 0, y: 16 });
    gsap.set(labels[0], { opacity: 1, y: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${ROOMS.length * 85}%`,
          scrub: true,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              ROOMS.length - 1,
              Math.floor(self.progress * ROOMS.length),
            );
            setActive(idx);
          },
        },
      });

      ROOMS.forEach((_, i) => {
        if (i === 0) return;
        const start = (i - 0.35) / ROOMS.length;
        tl.to(
          images[i - 1],
          { opacity: 0, scale: 1.08, duration: 0.2, ease: "none" },
          start,
        )
          .to(
            images[i],
            { opacity: 1, scale: 1, duration: 0.2, ease: "none" },
            start,
          )
          .to(labels[i - 1], { opacity: 0, y: -12, duration: 0.15 }, start)
          .to(labels[i], { opacity: 1, y: 0, duration: 0.15 }, start + 0.05);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apartment"
      ref={sectionRef}
      className="relative bg-forest"
      aria-labelledby="apartment-heading"
    >
      {/* Desktop pinned showcase */}
      <div ref={pinRef} className="relative hidden min-h-[100svh] md:block">
        <div className="section-pad mx-auto grid h-[100svh] max-w-[1400px] grid-cols-[1.2fr_0.8fr] items-center gap-10 py-24">
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="relative flex h-full max-h-[78vh] flex-col justify-between py-4">
            <div>
              <p className="eyebrow mb-4">The apartment</p>
              <h2 id="apartment-heading" className="heading-md mb-10 text-ivory">
                Spaces designed for quiet luxury.
              </h2>
            </div>

            <div className="relative min-h-[9rem]">
              {ROOMS.map((room, i) => (
                <div
                  key={room.id}
                  data-room-copy
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <p className="mb-3 font-display text-sm tracking-[0.25em] text-gold">
                    {room.index} / 04
                  </p>
                  <p className="mb-3 font-display text-3xl text-ivory">
                    {room.label}
                  </p>
                  <p className="body-lg max-w-md">{room.description}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-10 flex items-center gap-4"
              role="navigation"
              aria-label="Room progress"
            >
              <div className="relative h-28 w-px bg-ivory/15">
                <div
                  className="absolute left-0 top-0 w-px bg-gold transition-all duration-500"
                  style={{
                    height: `${((active + 1) / ROOMS.length) * 100}%`,
                  }}
                />
              </div>
              <ul className="flex flex-col gap-3">
                {ROOMS.map((room, i) => (
                  <li
                    key={room.id}
                    className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                      i === active ? "text-gold" : "text-stone/70"
                    }`}
                  >
                    {room.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked layout */}
      <div className="section-pad mx-auto max-w-[1400px] py-20 md:hidden">
        <p className="eyebrow mb-4">The apartment</p>
        <h2 className="heading-md mb-12 text-ivory">
          Spaces designed for quiet luxury.
        </h2>
        <div className="flex flex-col gap-14">
          {ROOMS.map((room) => (
            <article key={room.id} className="group">
              <div className="relative mb-5 aspect-[4/5] overflow-hidden border border-gold/20">
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes="92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mb-2 font-display text-sm tracking-[0.25em] text-gold">
                {room.index} / 04
              </p>
              <h3 className="mb-2 font-display text-3xl text-ivory">
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
