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
    const captions = section.querySelectorAll<HTMLElement>("[data-gallery-caption]");

    const ctx = gsap.context(() => {
      frames.forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.04 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 85%",
              end: "bottom 20%",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        captions,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apartment"
      ref={sectionRef}
      className="surface-ivory relative"
      aria-labelledby="apartment-heading"
    >
      <div className="section-pad mx-auto max-w-[1400px] pb-8 pt-20 sm:pb-10 sm:pt-28">
        <h2 id="apartment-heading" className="heading-editorial mb-4 max-w-[14ch]">
          Inside the residence
        </h2>
        <p className="body-ink max-w-[42ch]">
          A sequence of rooms composed for quiet living — photographed as they are,
          presented as an editorial walkthrough.
        </p>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-14 pb-24 sm:gap-20 sm:pb-32">
        {ROOMS.map((room, i) => {
          const alignEnd = room.frame === "portrait" || room.frame === "detail";
          const offset = i % 2 === 1;

          return (
            <article
              key={room.id}
              className={`section-pad grid gap-2 ${
                offset ? "lg:justify-items-end" : "lg:justify-items-start"
              }`}
            >
              <div
                data-gallery-media
                className={`gallery-frame gallery-frame--${room.frame} ${
                  alignEnd && offset ? "lg:ml-auto" : ""
                } ${alignEnd && !offset ? "lg:mr-auto" : ""} ${
                  room.frame === "landscape" ? "w-full" : "w-full"
                }`}
              >
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes={
                    room.frame === "landscape"
                      ? "(max-width: 1024px) 100vw, 1200px"
                      : "(max-width: 768px) 100vw, 560px"
                  }
                  loading="lazy"
                  className="object-cover"
                  style={{ objectPosition: room.objectPosition }}
                />
              </div>

              <div
                data-gallery-caption
                className={`gallery-caption ${offset ? "lg:text-right lg:justify-items-end" : ""}`}
              >
                <p className="gallery-caption-index">
                  {room.index} — {room.label}
                </p>
                <p className="gallery-caption-body">{room.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
