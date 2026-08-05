# Design System — L’étoile de Rêve

<!-- Generated with UI UX Pro Max (Luxury Premium / Hospitality) + Taste Skill + Impeccable -->

## Design read

Redesign of an existing luxury hospitality marketing site for boutique-apartment guests, with a quiet-luxury editorial language: deep forest green, champagne gold, Cormorant Garamond + Manrope, preserving property photography.

**Dials:** `DESIGN_VARIANCE: 6` · `MOTION_INTENSITY: 5` · `VISUAL_DENSITY: 3`

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `--forest` | `#06150e` | Page ground |
| `--green` | `#0b2117` | Section surface |
| `--gold` | `#c79a49` | Accent, rules, CTAs |
| `--champagne` | `#d4b56a` | Soft highlight |
| `--ivory` | `#f4efe5` | Primary text |
| `--stone` | `#b9b1a4` | Secondary text |

Avoid purple/blue gradients, cheap metallics, and pure `#000` panels behind logos.

## Typography

- **Display:** Cormorant Garamond 400 / 500 (editorial serif)
- **Body / UI:** Manrope 400 / 500 / 600
- **Roles**
  - `.eyebrow` — 0.6875rem, uppercase, `0.28em` tracking, gold (hero only)
  - `.heading-xl` — hero display: `clamp(2.55rem, 6.8vw, 5.5rem)`, lh `0.98`, tracking `-0.025em`
  - `.heading-lg` — section titles: `clamp(2.05rem, 4.2vw, 3.55rem)`, lh `1.08`
  - `.heading-md` — gallery / mid sections: `clamp(1.85rem, 3.2vw, 2.85rem)`
  - `.title-sm` — room & amenity titles: `clamp(1.45rem, 2.1vw, 1.85rem)`, weight 500
  - `.lede` — gold display subhead (tagline, location line)
  - `.body-lg` — primary reading: ≥1.0625rem, lh `1.8`, tracking `0.014em`, measure `65ch`
  - `.meta` / `.nav-label` — uppercase metadata and navigation
  - `.contact-line` / `.caption` / `.field-label` / `.field-error` — UI chrome
- Light-on-dark body uses slightly open tracking and leading; display stays optically tight
- Body measure ~65ch; avoid arbitrary one-off `text-*` sizes for product roles

## Layout

- Max content width `1400px`
- Header height `76–92px` (`--nav-h`)
- Section padding `py-24` to `py-36`
- Fine 1px gold rules; sharp corners (no heavy radius system)
- Asymmetric editorial splits where useful; no card-in-card grids

## Header lockup

- Vertical brand stack in the transparent header over the hero
- Star mark: `logo-mark.webp` (transparent, ~3.5KB) centered above the wordmark
- Wordmark: `L’ÉTOILE` / `DE RÊVE` in display serif, all caps, ivory
- Tagline: `THE STAR OF DREAMS` in gold sans with wide tracking
- Gold hairline + diamond rule
- Subtitle: `LUXURY APARTMENT | PHAKALANE` in soft ivory sans
- Scales up on desktop (`lg+`); compact variant when scrolled / menu open
- No horizontal `logo-nav` lockup in the header (footer may still use it)
- Location subtitle lives in the header lockup only (not duplicated in the hero)

## Motion

- **Thesis:** Hero = dawn under the stars; Apartment = walk through the residence
- Hero: veiled media clears (blur + forest veil), type unveils via clip-path, scroll stem breathes; scroll settles scale and dims copy; video pauses offscreen
- Apartment desktop: pinned scrub tour with directional clip/crossfade + ken-burns hold; gold progress is the path; tabs/arrows scrub to room
- Apartment mobile: horizontal snap with centered-room settle (scale)
- Reduced motion: no pin/scrub; instant or short crossfades; hero content visible without choreography
- Prefer `transform` / `opacity` / bounded `filter` / `clip-path`; honor `prefers-reduced-motion`
- Optional tour videos via `TOUR_VIDEO` in `src/lib/media.ts` (null = photo only, no 404 probes)
- Gallery `will-change` only while the pin scrub is active (`.is-compositing`)
- Below-fold sections use `content-visibility: auto`; mid/lower sections are dynamically imported
- Optional tour videos via `TOUR_VIDEO` in `src/lib/media.ts` (null = photo only, no 404 probes)
- Gallery `will-change` only while the pin scrub is active (`.is-compositing`)

## Components

- Primary CTA: gold fill / forest text
- Secondary CTA: gold hairline / ivory text
- Inputs: bordered fields with visible focus (not low-contrast underline-only)
- Amenities: five-item composition with gold separators
- Scrolled header / mobile book bar: solid `--green` (no content bleed)
- Desktop nav from `lg` (1024px); hamburger below that
- Interactive hit areas ≥44×44 (`tap-link`, room tabs, contact lines) while type roles stay quiet
- Booking form: WhatsApp/Email method toggle, validation alerts, post-submit acknowledgement
- Rates section (`#rates`): nightly rate on the left, offer in a `.booking-panel` on the right, code shown in a `.code-chip`; its CTA pre-fills the form via the `letoile:booking-code` event
- Booking code field: always optional — never validated, never blocks submission, and omitted from the enquiry message when blank
- `viewport-fit: cover` for notched devices
