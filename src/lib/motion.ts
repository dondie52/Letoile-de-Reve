import { gsap } from "gsap";

export const LUXURY_EASE = "power2.out";
export const LUXURY_DURATION = 1;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/** Standard fade-up reveal for elements entering the viewport. */
export function revealLines(
  elements: gsap.TweenTarget,
  trigger: Element,
  options?: { y?: number; stagger?: number; scrub?: boolean | number },
) {
  const y = options?.y ?? 28;
  const stagger = options?.stagger ?? 0.12;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, clearProps: "filter" });
    return null;
  }

  gsap.set(elements, { opacity: 0, y });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: LUXURY_DURATION,
    stagger,
    ease: LUXURY_EASE,
    scrollTrigger: options?.scrub
      ? {
          trigger,
          start: "top 75%",
          end: "top 35%",
          scrub: options.scrub === true ? true : options.scrub,
        }
      : {
          trigger,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
  });
}

export function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
