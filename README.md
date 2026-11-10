# Jaha (demo)

Front-end-only demo of **Jaha**, a reverse booking platform for hotel stays: travelers share when they are free and hotels answer with private offers. Everything is mock data; nothing is stored on a server.

## What is inside
- `/` one-page institutional site (hero, why, journey, ideas, hotels, FAQ), EN and PT-BR
- App pages: `/dashboard`, `/trips`, `/trips/demo-1`, `/offers`, `/intent/new`, `/watchlist`, `/settings`, `/how-it-works`, `/about`, `/for-hotels`, `/guest-demand`, `/privacy`
- Language: English and Portuguese (pt-BR), switched with the EN/PT toggle; the choice and the demo watchlist live in `localStorage`. Copy is in `lib/dict.ts` (`pt` must match the shape of `en`).

Stack: Next.js (static export), React, Leaflet.

## Run locally
```bash
npm install
npm run dev -- -p 3111
```

## Build for GitHub Pages
```bash
NEXT_PUBLIC_BASE_PATH=/jaha npm run build   # writes ./out (add .nojekyll)
```

## Brand
Primary colour royal blue `#3a5fd9` (`--brand`), dark `#1f3a9e`, tint `rgba(58,95,217,.15)`; coral `#c24a24` / `#e8714a` as secondary accent; fonts Bricolage Grotesque (display) and Hanken Grotesk (body).

Placeholders to replace before any real launch: contact address `hello@jaha.example`, all product claims on the landing page and FAQ, the privacy text.
