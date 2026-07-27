# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Guests and travellers evaluating a private luxury apartment stay in Phakalane, Gaborone. Primary job: understand the property, trust the brand, and enquire or book via WhatsApp or email.

## Product Purpose

Marketing site for **L’étoile de Rêve**, a fully furnished luxury apartment. Success means visitors feel calm confidence in the property and complete a booking enquiry without friction.

## Positioning

A private boutique residence under the stars in Phakalane: refined hospitality, not a generic hotel booking funnel or SaaS landing page.

## Operating Context

- Hosted as a static Next.js site (Render and GitHub Pages under `/Letoile-de-Reve`)
- Enquiry via mailto and WhatsApp deep links (no booking backend)
- Property photography and optional tour videos in `public/assets`

## Capabilities and Constraints

- Preserve official brand assets, contact details, dark-green + champagne-gold identity, and written content
- Do not invent phone numbers, addresses, testimonials, or pricing
- GitHub Pages requires `basePath` `/Letoile-de-Reve` when `GITHUB_PAGES=true`
- Header must show one official logo lockup only; eyebrow belongs in the hero

## Brand Commitments

- Name: L’étoile de Rêve (“The Star of Dreams”)
- Pronunciation: [leh·twah·duh·rev]
- Palette: deep pine green for cinematic moments, warm ivory editorial surfaces, champagne gold accents (never gold body text)
- Typography: editorial serif for emotional headlines only; modern sans for UI, captions, amenities and forms
- Visual world: “The Private Residence” — architecture-magazine editorial, not a dark-green template canvas
- Contact: stay@letoiledereve.com · 71 813 137 · WhatsApp +267 71 813 137

## Evidence on Hand

- Official logo artwork in `public/assets/images/` (nav lockup, full lockup, star mark)
- Room photography: living room, bedroom, kitchen, bathroom, entrance
- Brand flyer reference: `public/assets/images/brand-flyer.webp`
- Optional videos: `public/assets/videos/hero-tour.mp4`, `lifestyle-tour.mp4` (fallback to photos when missing)
- Facebook Reels (outbound tour links): apartment tour `https://www.facebook.com/reel/1490590898839114/`, lifestyle tour `https://www.facebook.com/reel/24987327710964150/`

## Product Principles

1. Quiet luxury over flash: spacious, cinematic, restrained motion
2. One clear brand hierarchy: logo in header, story in content
3. Photography and real contact paths lead; no fabricated social proof
4. Accessible, keyboard-friendly navigation and forms
5. Paths must work both locally and on GitHub Pages

## Accessibility & Inclusion

Target WCAG-readable contrast on dark surfaces, visible focus states, reduced-motion support, pause controls for autoplay media, and semantic landmark structure.
