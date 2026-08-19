# THE ARCHONS — Website

Cinematic 3D-feel website. **React + Vite + GSAP + Lenis**.

## Stack
- React 18 + Vite 5
- GSAP 3 + ScrollTrigger (animations, scroll-scrubbed hero video)
- Lenis (smooth scrolling)
- Three.js (available for optional 3D — currently used lightweight)

## Brand palette (extracted from logo)
- Primary: `#006080`
- Secondary: `#58B0A0`
- Background: `#050B14`
- Surface: `#0F1E2A`

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Content placeholders
All real content (clients, team, testimonials, contact details, socials) is centralised in `src/data/content.js`. Replace the bracketed placeholders there — no layout changes needed.

## Files
- `src/App.jsx` — root composition
- `src/components/` — Hero, Services, About, Process, Portfolio, Team, Testimonials, Contact, Footer, Nav, Cursor, Loader
- `src/hooks/` — `useLenis`, `useMagnetic`
- `src/styles/tokens.css` — design tokens (colors, type, spacing)
- `src/styles/global.css` — global styles + utilities
- `public/assets/` — logo + hero video
