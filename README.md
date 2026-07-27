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

## GitHub Pages

Static export deploys via GitHub Actions to:

**https://dondie52.github.io/Letoile-de-Reve/**

```bash
npm run build:pages
```

In the repo: **Settings → Pages → Source: GitHub Actions**.

## Assets

Place property media in:

- `public/assets/images/` — logos and room photography
- `public/assets/videos/hero-tour.mp4` — hero background reel
- `public/assets/videos/lifestyle-tour.mp4` — experience section reel

If videos are missing, the site falls back to apartment photography automatically.

## Contact

- Email: stay@letoiledereve.com
- Phone: 71 813 137
- WhatsApp: +267 71 813 137
