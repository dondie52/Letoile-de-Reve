# Design System — L’étoile de Rêve

<!-- impeccable:design-schema 1 -->
<!-- Generated for “The Private Residence” redesign -->

## Design read

Editorial luxury residence marketing site for boutique-apartment guests. Visual world: a private architecture magazine — warm ivory editorial plates alternating with deep-green cinematic moments and full-bleed photography. Not a dark-green branded canvas.

**Dials:** `DESIGN_VARIANCE: 7` · `MOTION_INTENSITY: 4` · `VISUAL_DENSITY: 3`

**Mode:** Persuade

## Palette

Colour distribution ≈ 35% warm ivory · 30% photography · 25% deep green · 10% champagne gold / neutrals.

| Token | Value | Role |
| --- | --- | --- |
| `--pine-950` | `#071d15` | Deepest green (hero ground, booking finale) |
| `--pine-900` | `#0b281d` | Nav / scrolled header / dark sections |
| `--pine-800` | `#11372a` | Elevated dark surface |
| `--ivory-50` | `#f7f3e9` | Primary light editorial surface |
| `--ivory-100` | `#efe8d9` | Soft stone panel / form panel |
| `--stone-200` | `#d8cfbf` | Hairlines, rules on light |
| `--gold-500` | `#c89b45` | Accent, borders, primary CTA fill |
| `--gold-400` | `#d7b66c` | Soft highlight |
| `--ink` | `#172019` | Body text on ivory |
| `--muted` | `#6e746d` | Secondary text on ivory |
| `--danger` | `#c45c4e` | Form errors |

Legacy aliases: `--forest` → `--pine-950`, `--green` → `--pine-900`, `--gold` → `--gold-500`, `--ivory` → light text on dark (`#f7f3e9`), `--stone` → muted on dark.

Never use gold for paragraph text. Maintain accessible contrast on both surfaces.

## Surfaces

- **Dark cinematic:** hero, navigation (scrolled), emotional media, booking finale background, footer
- **Warm editorial:** introduction, stay details, parts of location
- **Photography:** cinematic gallery, emotional full-bleed, location arrival detail

## Typography

- **Display serif:** Cormorant Garamond 400 / 500 — emotional headlines only (hero, intro statement, emotional moment, booking title)
- **UI / body sans:** Manrope 400 / 500 / 600 — navigation, paragraphs, room captions, amenities, form labels, buttons, metadata

### Roles

- `.heading-xl` — hero display (serif)
- `.heading-lg` — emotional section titles (serif)
- `.heading-editorial` — large ivory-surface statement (serif)
- `.title-sm` — **sans**, room & amenity names (not serif)
- `.body-lg` / `.body-ink` — reading text, measure ~48–62ch
- `.caption` / `.room-caption` — editorial image captions (sans)
- `.meta` — sparse metadata; prefer sentence case over uppercase tracking
- `.field-label` — visible form labels (sans, not heavy uppercase)

Reduce uppercase letter-spaced eyebrows. Hero may keep one quiet location line.

## Layout

- Max content width `1400px`
- Header height `76–84px` (`--nav-h`)
- Section padding generous on ivory; tighter on compact footer
- Sharp corners (`2–4px` max on floating CTA / inputs)
- No amenity cards; use rules and lists
- No bordered logo shrine in story

## Header

- Asset: `logo-nav.webp` (official lockup)
- Desktop: Story · Residence · Details · Location · Book + one restrained booking button
- Mobile: logo + menu; no permanent full-width gold bar

## Mobile booking action

Compact floating button: `Book your stay →`

- 16–20px from viewport edges (+ safe-area)
- Dark green + fine gold border; gold fill on hover/active
- Hide when booking section or footer is visible
- Never cover essential content

## Section architecture

1. **Hero** — full-bleed living-room media; brand + short headline; desktop availability panel lower-right; one mobile CTA
2. **Introduction** — ivory; editorial statement; star mark; pronunciation; concise story
3. **Residence gallery** — full-width editorial sequence; captions; natural scroll (no tall pin wrappers on mobile)
4. **Stay details** — ivory two-column editorial list
5. **Emotional moment** — full-bleed bedroom media; three short lines
6. **Location** — typographic + small arrival detail; map/directions; doormat not dominant
7. **Booking** — pine background; ivory concierge form panel
8. **Footer** — compact; one logo; contacts; nav; copyright; Facebook when URL known

## Motion

- Slow hero media settle (scale 1.02 → 1)
- Masked headline reveals
- Gentle gallery image scale
- Fine line reveals
- Honor `prefers-reduced-motion`
- No bouncing, particles, heavy pin scrub, or ghost image layers

## Components

- Primary CTA (on dark): gold fill / pine text
- Primary CTA (on ivory): pine fill / ivory text
- Secondary: hairline gold / contextual text
- Floating book: pine + gold border → gold on hover
- Inputs on ivory panel: light fields, dark text, 16px min, visible labels
- Gallery controls: buttons (not tabs) when changing room state

## Accessibility

- Native lists and landmarks; no fake tablists without panels
- Touch targets ≥44×44
- Visible focus rings on both surfaces
- Reduced-motion paths for GSAP
