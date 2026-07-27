/**
 * Optional tour videos. Set a path only when the file exists under `public/`.
 * `null` skips `<video>` entirely — no HEAD/GET and no console 404s.
 *
 * When assets ship, import `withBase` from `@/lib/paths` and set:
 *   hero: withBase("/assets/videos/hero-tour.mp4"),
 *   lifestyle: withBase("/assets/videos/lifestyle-tour.mp4"),
 */
export const TOUR_VIDEO = {
  hero: null as string | null,
  lifestyle: null as string | null,
} as const;
