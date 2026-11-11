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
Logo files in `public/brand/` (full, mark, white wordmark). Colours: deep blue `#0026dd` (`--brand`), sky `#45a1fd`, navy `#02194f`, tints `#dcebff` / `#cfe3ff`; coral `#c24a24` as a small accent. Fonts: Bricolage Grotesque (display) and Hanken Grotesk (body).

## Images
Photos come from Unsplash (see `CREDITS.md`). The phone mockups are empty on purpose: pass a screenshot to `<Phone src=... />` (`components/Phone.tsx`) when the product screens are ready. The "Featured in" row and the sample reviews are placeholders.

## Placeholders to replace before any real launch
Contact address `hello@happycall.example`, product claims on the landing page and FAQ, press logos, sample reviews, privacy and terms text.
