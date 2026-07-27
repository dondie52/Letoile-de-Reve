import { gsap } from "gsap";

/** Confident arrival — luxury hospitality (expo deceleration). */
export const ARRIVE_EASE = "expo.out";
/** Scroll / scrub continuity — linear relationship to scroll. */
export const SCRUB_EASE = "none";
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

/** Delay hero intro until the preloader has cleared on first visit. */
export function heroIntroDelay(): number {
  if (typeof window === "undefined") return 0.2;
  if (prefersReducedMotion()) return 0;
  const seen = sessionStorage.getItem("letoile-preloader") === "1";
  return seen ? 0.18 : 1.45;
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
    gsap.set(elements, { opacity: 1, y: 0, clearProps: "filter,clipPath" });
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

/**
 * Slow cinematic Ken Burns on a still photo — scale + gentle pan.
 * Returns the timeline (or null when reduced motion / missing target).
 */
export function kenBurns(
  target: gsap.TweenTarget | null | undefined,
  options?: {
    scaleFrom?: number;
    scaleTo?: number;
    xPercent?: number;
    yPercent?: number;
    duration?: number;
    delay?: number;
  },
): gsap.core.Timeline | null {
  if (!target || prefersReducedMotion()) return null;

  const scaleFrom = options?.scaleFrom ?? 1.04;
  const scaleTo = options?.scaleTo ?? 1.12;
  const xPercent = options?.xPercent ?? -2.5;
  const yPercent = options?.yPercent ?? 1.5;
  const duration = options?.duration ?? 18;
  const delay = options?.delay ?? 0;

  gsap.set(target, {
    scale: scaleFrom,
    xPercent: 0,
    yPercent: 0,
    transformOrigin: "50% 50%",
    force3D: true,
  });

  const tl = gsap.timeline({
    delay,
    repeat: -1,
    yoyo: true,
    defaults: { ease: "sine.inOut" },
  });

  tl.to(target, {
    scale: scaleTo,
    xPercent,
    yPercent,
    duration,
  });

  return tl;
}
