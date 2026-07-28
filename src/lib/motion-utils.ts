/** Motion / timing helpers with no GSAP dependency — safe on the critical path. */

export const ARRIVE_EASE = "expo.out";
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

/** Short beat before hero intro — no blocking preloader. */
export function heroIntroDelay(): number {
  if (typeof window === "undefined") return 0.08;
  if (prefersReducedMotion()) return 0;
  return 0.08;
}

export function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
