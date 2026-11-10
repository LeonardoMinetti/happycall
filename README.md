# Driftwell (demo)

An independent, front-end-only demo of a "private hotel deals" dashboard: dashboard, trips, trip detail, new-trip step 1 and a how-it-works page. All data is mock data, names and copy are original, and nothing is stored or sent anywhere. It is not affiliated with any existing product.

Built with Next.js (static export), React and Leaflet.

## Run locally

```bash
npm install
npm run dev -- -p 3111
```

## Build for GitHub Pages

```bash
NEXT_PUBLIC_BASE_PATH=/driftwell-clone npm run build   # writes ./out
```

## Brand

Primary colour: royal blue `#3a5fd9` (`--brand`), dark `#1f3a9e`, tint `rgba(58,95,217,.15)`. Neutrals are cool greys on `#fafafa`; coral `#c24a24` / `#e8714a` is the secondary accent. Fonts: Bricolage Grotesque (display) and Hanken Grotesk (body).
