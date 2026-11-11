# HappyCall (demo)

Front-end-only demo of **HappyCall**, a reverse booking platform for hotel stays: travelers share when they are free and hotels answer with private offers. Everything is mock data; nothing is stored on a server.

## What is inside
- `/` one-page institutional site, structured after a modern "app landing" layout: announcement bar, hero with empty phone mockups, press row, audience chips, four stacked feature cards, photo collage, about, featured offers, community and sample reviews, FAQ, newsletter and footer. EN and PT-BR.
- App pages: `/dashboard`, `/trips`, `/trips/demo-1`, `/offers`, `/intent/new`, `/watchlist`, `/settings`, `/how-it-works`, `/about`, `/for-hotels`, `/guest-demand`, `/privacy`, `/terms`
- Language: English and Portuguese (pt-BR) with the EN/PT toggle; the choice and the demo watchlist live in `localStorage`. All copy is in `lib/dict.ts` (`pt` must match the shape of `en`).

Stack: Next.js (static export), React, Leaflet.

## Run locally
```bash
npm install
npm run dev -- -p 3111
```

## Build for GitHub Pages
```bash
NEXT_PUBLIC_BASE_PATH=/happycall npm run build   # writes ./out (add .nojekyll)
```
Use the repository name as the base path.

## Brand
Identity files supplied by the brand team live in `design/brand-sources/` (app icon, logo sheet, icon library, palette). Derived, ready-to-use assets are in `public/brand/`:
- `happycall-wordmark.png` (stacked HAPPY / CALL), `-white`, `-navy`; `happycall-hc.png` (reduced H✦C, for small sizes); `happycall-appicon.png` (also `app/icon.png`)
- `public/brand/icons/*.png`: 45 hand-drawn line icons. Use `<Icon name="calendar" />` (`components/Icon.tsx`); colour follows `currentColor`. `<Sparkle />` draws the four-point star.

Palette: Azul Royal `#0A3BD9` (`--brand`), Salmão `#FF7A67` (`--coral`, decoration only: white text on it fails contrast), Azul Céu `#9ED7FF` (`--sky`), Areia `#FFF6EE` (`--sand`), Marinho `#0F1B4C` (`--navy`). Fonts for now: Bricolage Grotesque (display) and Hanken Grotesk (body); the identity sheets show a rounded geometric sans that is not specified yet.

## Patterns and loose shapes
The three brand patterns are in `public/patterns/` (`blocks`, `arches`, `waves`, each with a `-blue` variant that swaps the salmon for sky blue). Use `<Pattern name opacity blue fade />` as a decorative layer inside a `position:relative` container, `<PatternBanner />` for page headers, and `<Shape kind="quarter|half|pill|circle|wave|arch" color rotate size />` for loose pieces. Colours stay inside the palette; opacity and the `-blue` variant are the knobs.

## Images
Photos come from Unsplash (see `CREDITS.md`). The phone mockups are empty on purpose: pass a screenshot to `<Phone src=... />` (`components/Phone.tsx`) when the product screens are ready. The "Featured in" row and the sample reviews are placeholders.

## Placeholders to replace before any real launch
Contact address `hello@happycall.example`, product claims on the landing page and FAQ, press logos, sample reviews, privacy and terms text.
