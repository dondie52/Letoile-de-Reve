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

- **Display:** Cormorant Garamond (editorial serif)
- **Body / UI:** Manrope
- **Eyebrow:** 0.7rem, uppercase, `letter-spacing: 0.28em`, gold
- **Hero H1:** `clamp(2.5rem, 7vw, 5.75rem)`, line-height ~0.98, balanced wrap
- Body measure ~36–38rem / ~65ch

## Layout

- Max content width `1400px`
- Header height `76–92px` (`--nav-h`)
- Section padding `py-24` to `py-36`
- Fine 1px gold rules; sharp corners (no heavy radius system)
- Asymmetric editorial splits where useful; no card-in-card grids

## Header lockup

- Asset: `logo-nav.webp` / `logo-nav.png` (official star + wordmark, no eyebrow)
- Max height ~48–54px · width auto · `object-fit: contain`
- No duplicate typed brand name beside the logo
- Eyebrow `LUXURY APARTMENT · PHAKALANE` lives only in the hero

## Motion

- Hero: media scale `1.06 → 1`, staggered content reveal, header transparent → forest glass
- Story: editorial fade-up; star mark subtle glow (no black logo slab)
- Apartment: desktop pinned crossfade gallery; mobile stacked panels (no 400vh pin)
- Prefer `transform` / `opacity`; honor `prefers-reduced-motion`

## Components

- Primary CTA: gold fill / forest text
- Secondary CTA: gold hairline / ivory text
- Inputs: bordered fields with visible focus (not low-contrast underline-only)
- Amenities: five-item composition with gold separators
