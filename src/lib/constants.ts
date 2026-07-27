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
  whatsappUrl:
    "https://wa.me/26771813137?text=" +
    encodeURIComponent(
      "Hello, I would like to enquire about staying at L’étoile de Rêve.",
    ),
} as const;

export const NAV_LINKS = [
  { href: "#story", label: "Story", id: "story" },
  { href: "#apartment", label: "Apartment", id: "apartment" },
  { href: "#amenities", label: "Amenities", id: "amenities" },
  { href: "#location", label: "Location", id: "location" },
] as const;

export const ROOMS = [
  {
    id: "living",
    label: "Living room",
    index: "01",
    description: "Warm light, considered textures and a calm space to unwind.",
    src: withBase("/assets/images/living-room.webp"),
    alt: "Living room at L’étoile de Rêve with warm lighting and refined furnishings",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    index: "02",
    description: "A restful private suite designed for deep comfort.",
    src: withBase("/assets/images/bedroom.webp"),
    alt: "Bedroom suite at L’étoile de Rêve designed for restful comfort",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    index: "03",
    description: "Fully equipped for effortless everyday living.",
    src: withBase("/assets/images/kitchen.webp"),
    alt: "Fully equipped kitchen at L’étoile de Rêve",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    index: "04",
    description: "Clean, modern finishes with a spa-like sense of calm.",
    src: withBase("/assets/images/bathroom.webp"),
    alt: "Modern bathroom at L’étoile de Rêve with spa-like finishes",
  },
] as const;

export const AMENITIES = [
  {
    title: "Fully furnished apartments",
    description: "Arrive to a complete home—styled, equipped and ready.",
  },
  {
    title: "High-speed Wi-Fi",
    description: "Stay connected for work, streaming and everyday ease.",
  },
  {
    title: "24/7 security and parking",
    description: "Peace of mind with secure grounds and convenient parking.",
  },
  {
    title: "Prime Phakalane location",
    description: "A refined address with access to dining and essentials.",
  },
  {
    title: "Comfort, style and privacy",
    description: "Thoughtful interiors designed for a quiet, elevated stay.",
  },
] as const;

/** Public asset URLs — already include basePath for GitHub Pages. */
export const ASSETS = {
  logoWide: withBase("/assets/images/logo-wide.webp"),
  logoPortrait: withBase("/assets/images/logo-portrait.webp"),
  logoFull: withBase("/assets/images/logo-full.webp"),
  logoMark: withBase("/assets/images/logo-mark.webp"),
  livingRoom: withBase("/assets/images/living-room.webp"),
  bedroom: withBase("/assets/images/bedroom.webp"),
  kitchen: withBase("/assets/images/kitchen.webp"),
  bathroom: withBase("/assets/images/bathroom.webp"),
  entranceMat: withBase("/assets/images/entrance-mat.webp"),
  heroVideo: withBase("/assets/videos/hero-tour.mp4"),
  lifestyleVideo: withBase("/assets/videos/lifestyle-tour.mp4"),
} as const;
