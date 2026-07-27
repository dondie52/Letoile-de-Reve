import { withBase } from "@/lib/paths";

export const BRAND = {
  name: "L’étoile de Rêve",
  tagline: "The Star of Dreams",
  pronunciation: "[leh·twah·duh·rev]",
  email: "stay@letoiledereve.com",
  phoneDisplay: "71 813 137",
  phoneTel: "+26771813137",
  website: "letoiledereve.com",
  location: "Phakalane, Gaborone, Botswana",
  mapsQuery: "L’étoile de Rêve Phakalane Gaborone Botswana",
  /** Official page URL unknown in repo — omit until confirmed. */
  facebookUrl: null as string | null,
  whatsappUrl:
    "https://wa.me/26771813137?text=" +
    encodeURIComponent(
      "Hello, I would like to enquire about staying at L’étoile de Rêve.",
    ),
} as const;

export const NAV_LINKS = [
  { href: "#story", label: "Story", id: "story" },
  { href: "#apartment", label: "Residence", id: "apartment" },
  { href: "#amenities", label: "Details", id: "amenities" },
  { href: "#location", label: "Location", id: "location" },
] as const;

export const ROOMS = [
  {
    id: "living",
    label: "Living room",
    index: "01",
    description: "Warm light, considered textures and space to unwind.",
    src: withBase("/assets/images/living-room.webp"),
    alt: "Living room at L’étoile de Rêve with warm lighting and refined furnishings",
    objectPosition: "50% 42%",
    frame: "landscape" as const,
  },
  {
    id: "bedroom",
    label: "Bedroom",
    index: "02",
    description: "A private suite created for deep rest.",
    src: withBase("/assets/images/bedroom.webp"),
    alt: "Bedroom suite at L’étoile de Rêve designed for restful comfort",
    objectPosition: "50% 38%",
    frame: "portrait" as const,
  },
  {
    id: "kitchen",
    label: "Kitchen",
    index: "03",
    description: "Everything needed for effortless everyday living.",
    src: withBase("/assets/images/kitchen.webp"),
    alt: "Fully equipped kitchen at L’étoile de Rêve",
    objectPosition: "48% 45%",
    frame: "landscape" as const,
  },
  {
    id: "detail",
    label: "Detail",
    index: "04",
    description: "Quiet finishes and textures chosen for everyday ease.",
    src: withBase("/assets/images/living-room.webp"),
    alt: "Interior detail at L’étoile de Rêve",
    objectPosition: "72% 58%",
    frame: "detail" as const,
  },
  {
    id: "bathroom",
    label: "Bathroom",
    index: "05",
    description: "Clean modern finishes with a calm, spa-like character.",
    src: withBase("/assets/images/bathroom.webp"),
    alt: "Modern bathroom at L’étoile de Rêve with spa-like finishes",
    objectPosition: "52% 40%",
    frame: "portrait" as const,
  },
] as const;

export const AMENITIES = [
  { title: "Fully furnished", description: "Styled, equipped and ready on arrival." },
  { title: "Private bedroom", description: "A quiet suite for deep, uninterrupted rest." },
  { title: "Equipped kitchen", description: "Everything needed for effortless everyday living." },
  { title: "Modern bathroom", description: "Clean finishes with a calm, spa-like character." },
  { title: "High-speed Wi-Fi", description: "Reliable connection for work and leisure." },
  { title: "Secure parking", description: "Convenient parking within secure grounds." },
  { title: "24-hour security", description: "Peace of mind throughout your stay." },
  { title: "Prime Phakalane location", description: "A refined address near dining and essentials." },
] as const;

/** Public asset URLs - already include basePath for GitHub Pages. */
export const ASSETS = {
  logoNav: withBase("/assets/images/logo-nav.webp"),
  logoFull: withBase("/assets/images/logo-full.webp"),
  logoMark: withBase("/assets/images/logo-mark.webp"),
  logoWide: withBase("/assets/images/logo-wide.webp"),
  logoPortrait: withBase("/assets/images/logo-portrait.webp"),
  livingRoom: withBase("/assets/images/living-room.webp"),
  bedroom: withBase("/assets/images/bedroom.webp"),
  kitchen: withBase("/assets/images/kitchen.webp"),
  bathroom: withBase("/assets/images/bathroom.webp"),
  entranceMat: withBase("/assets/images/entrance-mat.webp"),
} as const;
