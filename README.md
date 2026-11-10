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
