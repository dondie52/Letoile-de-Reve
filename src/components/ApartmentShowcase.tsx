"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function ApartmentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const frames = section.querySelectorAll<HTMLElement>("[data-gallery-media]");

    const ctx = gsap.context(() => {
      frames.forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.03 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 90%",
              end: "bottom 25%",
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apartment"
      ref={sectionRef}
      className="relative bg-ivory-50"
      aria-labelledby="apartment-heading"
    >
      <div className="section-pad mx-auto max-w-[1400px] pb-10 pt-20 sm:pb-12 sm:pt-28">
        <h2 id="apartment-heading" className="heading-editorial mb-4 max-w-[14ch]">
          Inside the residence
        </h2>
        <p className="body-ink max-w-[42ch]">
          A sequence of rooms composed for quiet living — photographed as they are.
        </p>
      </div>

      <div className="flex flex-col">
        {ROOMS.map((room, i) => {
          const bleed = room.frame === "landscape";
          const onDark = i === 1 || i === 4;
          const inset = room.frame === "portrait" || room.frame === "detail";

          return (
            <article
              key={room.id}
              className={`relative ${
                onDark ? "bg-pine-950 text-ivory" : "bg-ivory-50 text-ink"
              } ${bleed ? "pb-10 pt-2 sm:pb-14" : "py-10 sm:py-14"}`}
            >
              <div
                className={
                  bleed
                    ? "w-full"
                    : `section-pad mx-auto max-w-[1400px] ${
                        i % 2 === 0 ? "" : "flex flex-col items-end"
                      }`
                }
              >
                <div
                  data-gallery-media
                  className={`gallery-frame gallery-frame--${room.frame} ${
                    bleed ? "max-h-[min(78svh,900px)] rounded-none" : ""
                  } ${inset && i % 2 === 1 ? "ml-auto" : ""}`}
                >
                  <Image
                    src={room.src}
                    alt={room.alt}
                    fill
                    sizes={
                      bleed
                        ? "100vw"
                        : "(max-width: 768px) 100vw, 560px"
                    }
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: room.objectPosition }}
                  />
                </div>

                <div
                  className={`gallery-caption ${bleed ? "section-pad mx-auto max-w-[1400px]" : ""} ${
                    i % 2 === 1 && inset ? "text-right justify-items-end" : ""
                  } ${onDark ? "is-on-dark" : ""}`}
                >
                  <p className="gallery-caption-index">
                    {room.index} — {room.label}
                  </p>
                  <p className="gallery-caption-body">{room.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
