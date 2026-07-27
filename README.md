# L’étoile de Rêve

Premium cinematic website for **L’étoile de Rêve**, a luxury fully furnished apartment in Phakalane, Gaborone, Botswana.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis smooth scrolling

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

### GitHub Pages static export

```bash
npm run build:pages
```

This builds with `basePath` `/Letoile-de-Reve` for
`https://dondie52.github.io/Letoile-de-Reve/`.

## Assets

Place property media in:

- `public/assets/images/` — logos and room photography
- `public/assets/videos/hero-tour.mp4` — hero background reel
- `public/assets/videos/lifestyle-tour.mp4` — experience section reel

Header and footer use `logo-nav.webp` (official star + wordmark).
The introduction uses only `logo-mark.webp` as a small decorative star.

If videos are missing, the site falls back to apartment photography automatically.

## Contact

- Email: stay@letoiledereve.com
- Phone: 71 813 137
- WhatsApp: +267 71 813 137
