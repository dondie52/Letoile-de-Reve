---
target: entire hospitality landing page
total_score: 17
max_score: 20
prior_score: 15
timestamp: 2026-07-27T20-00-01Z
slug: full-site-reaudit
---

# Audit (re-run): L’étoile de Rêve — full site

**Target:** Entire marketing landing  
**Mode:** Persuade (web)  
**Compared to:** `.impeccable/audit/2026-07-27T19-36-30Z__full-site.md` (**15/20**)  
**Detector:** `[]` (clean)

## Audit Health Score

| # | Dimension | Score | Δ | Key Finding |
|---|-----------|------:|:-:|-------------|
| 1 | Accessibility | 3 | — | Still strong AA; remaining: global motion kill, `aria-required`, tab `aria-controls` |
| 2 | Performance | 3 | **+1** | Video 404s eliminated; `will-change` only while scrubbing; lazy gallery + dynamic sections |
| 3 | Responsive Design | 4 | **+1** | **21/21** mobile targets ≥44×44; no overflow; logo 169×44 |
| 4 | Theming | 3 | — | Tokens dominate; hero overlay gradient still hard-coded |
| 5 | Implementation Integrity | 4 | — | Coherent product system; `#experience` present; detector clean |
| **Total** | | **17/20** | **+2** | **Good** |

**Rating band:** 14–17 Good (address weak dimensions) — closer to Excellent

## Score movement

| Prior P1/P2 | Status after fixes |
|---|---|
| [P1] Missing tour videos → 404s | **Resolved** (`TOUR_VIDEO` null → no `<video>`, 0 failed requests) |
| [P1] Room tabs <44px | **Resolved** (all tabs 504×44) |
| [P1] Footer/contact hit height | **Resolved** (0 failing mobile targets) |
| [P3] `#experience` / logo hit area | **Resolved** |
| [P2] Global `0.01ms` motion kill | **Open** |
| [P2] Tablist `aria-controls` | **Open** |
| [P2] Form `aria-required` | **Open** |
| [P2] Hard-coded hero gradient | **Open** |

## Implementation Integrity Verdict

**Pass.** Product-specific hospitality system intact. Measured improvements are real (network silence without videos; full touch-target pass) without diluting brand identity.

## Executive Summary

- **Audit Health Score: 17/20 (Good)** — was **15/20**
- **Issues now:** 0 P0 · 0 P1 · 4 P2 · 1 P3
- **Top remaining:** global reduced-motion CSS nuke; booking `aria-required`; apartment tabpanels; tokenized hero overlay
- **Next step:** `/impeccable harden` for the three a11y/production gaps, optional `/impeccable colorize` for the gradient

## Detailed Findings by Severity

### [P2] Global `prefers-reduced-motion` 0.01ms kill switch
- **Location:** `src/app/globals.css`
- **Category:** Accessibility
- **Evidence:** Under `reducedMotion: "reduce"`, `.btn` `transitionDuration` is `1e-05s`; `html` has `reduced-motion`
- **Impact:** Wipes useful hover/focus transition feedback site-wide despite intentional GSAP reduced paths
- **Recommendation:** Remove universal `*` duration nuke; keep JS reduced branches + selective decorative disables
- **Suggested command:** `/impeccable harden`

### [P2] Tablist missing `aria-controls` / tabpanels
- **Location:** `ApartmentShowcase.tsx` (`ariaControls: null` on all four tabs)
- **Category:** Accessibility
- **Impact:** Selected state exists; panel association incomplete for AT
- **Recommendation:** Wire `aria-controls` + `role="tabpanel"` (or simplify to buttons)
- **Suggested command:** `/impeccable harden`

### [P2] Required fields only enforced in JS
- **Location:** `BookingFinale.tsx` — labels present; `required`/`aria-required` absent
- **Category:** Accessibility
- **Impact:** Requiredness announced only after failed submit
- **Recommendation:** Add `aria-required="true"` on enquiry fields
- **Suggested command:** `/impeccable harden`

### [P2] Hard-coded hero gradient colors
- **Location:** `Hero.tsx` `bg-[linear-gradient(...rgba(6,21,14,...))]`
- **Category:** Theming
- **Impact:** Palette drift risk if `--forest` changes
- **Recommendation:** Express via `color-mix` on `--forest`
- **Suggested command:** `/impeccable colorize`

### [P3] `images.unoptimized: true`
- **Location:** `next.config.ts`
- **Category:** Performance
- **Impact:** Expected for static export; WebP set remains lean
- **Suggested command:** `/impeccable optimize` only if hosting model changes

## Positive Findings (verified this run)

- **0** failed network responses; **0** `<video>` elements when tours disabled
- Contrast AA: primary CTA **7.27**, H1 **16.34**, eyebrow/gold **7.27**, meta/contact **8.82**, lede **6.55**
- Mobile touch: **21/21** pass; logo **169×44**
- Room tabs **44px** tall; `will-change` idle count **0** (compositing class only while scrubbing)
- Skip link focuses first; landmarks header/main/footer; `#experience` present
- No horizontal overflow at 375 or 1440

## Recommended Actions

1. **[P2] `/impeccable harden`**: Motion strategy, `aria-required`, tab/tabpanel wiring  
2. **[P2] `/impeccable colorize`**: Tokenize hero overlay gradient  
3. **[P3] `/impeccable polish`**: Final pass after harden  

Re-run `/impeccable audit` again after harden to push toward **18–20 Excellent**.
