import { withBase } from "@/lib/paths";

export const BRAND = {
  name: "L’étoile de Rêve",
  tagline: "The Star of Dreams",
  pronunciation: "[leh·twah·duh·rev]",
  email: "stay@letoiledereve.com",
  phoneDisplay: "+267 71 070 488",
  phoneTel: "+26771070488",
  website: "letoiledereve.com",
  location: "Phakalane, Gaborone, Botswana",
  mapsQuery: "L’étoile de Rêve Phakalane Gaborone Botswana",
  whatsappUrl:
    "https://wa.me/26771070488?text=" +
    encodeURIComponent(
      "Hello, I would like to enquire about staying at L’étoile de Rêve.",
    ),
} as const;

export const FACEBOOK_REELS = [
  {
    label: "Apartment tour",
    href: "https://www.facebook.com/reel/1490590898839114/",
  },
  {
    label: "Lifestyle tour",
    href: "https://www.facebook.com/reel/24987327710964150/",
  },
] as const;

export const NAV_LINKS = [
  { href: "#story", label: "Story", id: "story" },
  { href: "#apartment", label: "Apartment", id: "apartment" },
  { href: "#stay", label: "The Stay", id: "stay" },
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
    /** ~720w — sized for mobile snap gallery (≤88vw). */
    srcSm: withBase("/assets/images/living-room-sm.webp"),
    alt: "Living room at L’étoile de Rêve with warm lighting and refined furnishings",
    objectPosition: "50% 42%",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    index: "02",
    description: "A restful private suite designed for deep comfort.",
    src: withBase("/assets/images/bedroom.webp"),
    srcSm: withBase("/assets/images/bedroom-sm.webp"),
    alt: "Bedroom suite at L’étoile de Rêve designed for restful comfort",
    objectPosition: "50% 38%",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    index: "03",
    description: "Fully equipped for effortless everyday living.",
    src: withBase("/assets/images/kitchen.webp"),
    srcSm: withBase("/assets/images/kitchen-sm.webp"),
    alt: "Fully equipped kitchen at L’étoile de Rêve",
    objectPosition: "48% 45%",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    index: "04",
    description: "Clean, modern finishes with a spa-like sense of calm.",
    src: withBase("/assets/images/bathroom.webp"),
    srcSm: withBase("/assets/images/bathroom-sm.webp"),
    alt: "Modern bathroom at L’étoile de Rêve with spa-like finishes",
    objectPosition: "52% 40%",
  },
] as const;

export const AMENITIES = [
  {
    title: "Fully furnished apartments",
    description: "Arrive to a complete home: styled, equipped and ready.",
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

/** Sensory moments of a stay — narrative, not a feature list. */
export const STAY_MOMENTS = [
  {
    time: "Arrival",
    title: "The door opens on a home, not a room.",
    description:
      "Warm light, made beds and space to put everything down. Nothing to set up, nothing to ask for.",
  },
  {
    time: "Daytime",
    title: "Work, cook, or do very little.",
    description:
      "Fast Wi-Fi and a full kitchen when the day needs structure. Quiet rooms when it does not.",
  },
  {
    time: "Evening",
    title: "The city goes quiet from here.",
    description:
      "Secure grounds, soft lamplight and a living room made for slow evenings and long conversations.",
  },
  {
    time: "Morning",
    title: "Wake to Phakalane light.",
    description:
      "Coffee in your own kitchen, then a calm start with everything you need already close by.",
  },
] as const;

/** Public asset URLs - already include basePath for GitHub Pages. */
export const ASSETS = {
  logoNav: withBase("/assets/images/logo-nav.webp"),
  logoFull: withBase("/assets/images/logo-full.webp"),
  logoMark: withBase("/assets/images/logo-mark.webp"),
  logoWide: withBase("/assets/images/logo-wide.webp"),
  logoPortrait: withBase("/assets/images/logo-portrait.webp"),
  livingRoom: withBase("/assets/images/living-room.webp"),
  livingRoomSm: withBase("/assets/images/living-room-sm.webp"),
  bedroom: withBase("/assets/images/bedroom.webp"),
  kitchen: withBase("/assets/images/kitchen.webp"),
  bathroom: withBase("/assets/images/bathroom.webp"),
  entranceMat: withBase("/assets/images/entrance-mat.webp"),
  entranceMatSm: withBase("/assets/images/entrance-mat-sm.webp"),
} as const;
