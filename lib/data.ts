// Mock data only. Names, places and numbers are invented for this demo.
export type Trip = { id: string; startISO: string; endISO: string; places: string; adults: number; price: string; step: number };
const iso = (offset: number) => { const x = new Date(); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() + offset); return x.toISOString(); };
export const trips: Trip[] = [
  { id: "demo-1", startISO: iso(1), endISO: iso(114), places: "Mendocino, Russian River", adults: 2, price: "$$", step: 3 },
];
export const invites = [
  { id: "i1", who: "M", pct: 6, place: "Russian River", date: "2026-10-30" },
  { id: "i2", who: "H", pct: 15, place: "Santa Cruz", date: "2026-10-30" },
];
export const trending = [
  { place: "San Francisco", n: 474 }, { place: "Carmel + Monterey", n: 459 }, { place: "Napa", n: 455 },
  { place: "Los Angeles", n: 447 }, { place: "San Diego", n: 445 },
];
export const pins = [
  { name: "Point Reyes", lat: 38.07, lng: -122.88 }, { name: "Napa", lat: 38.30, lng: -122.29 },
  { name: "Mendocino", lat: 39.31, lng: -123.80 },
];
export const regions: [string, number][] = [
  ["Mendocino", 8], ["Russian River", 6], ["Point Reyes", 3], ["Napa", 17], ["Sonoma", 17], ["San Francisco", 11], ["Santa Cruz", 7],
  ["Carmel + Monterey", 14], ["Big Sur", 3], ["San Luis Obispo", 13], ["Santa Barbara", 12], ["San Diego", 13], ["Palm Springs", 12],
  ["Lake Tahoe", 10], ["Yosemite", 7], ["Gold Country", 8], ["Los Angeles", 24], ["Orange County", 5], ["Joshua Tree", 3],
  ["SF Peninsula", 6], ["Inland Empire", 3],
];
const A = ["Cedar", "Saltmarsh", "Vine", "North Ridge", "Willow", "Copper", "Starling", "Alder", "Harbor", "Fernhill", "Juniper", "Marlow", "Quill", "Sable", "Tern", "Umber"];
const B = ["Lodge", "House", "Inn", "Hotel", "Retreat", "Resort", "Cabins", "Rooms"];
export type Hotel = { name: string; area: string; region: string; note: string; hue: number };
const NOTES = ["Three Keys · 2025", "Two Keys · 2024", "One Key · 2025", "Four-Star Rating · 2026", "Editor's pick · 2025"];
const HUES = [215, 235, 195, 150, 25, 70, 180, 130];
export const catalog: Hotel[] = regions.flatMap(([region, count], ri) =>
  Array.from({ length: count }, (_, i) => {
    const k = ri * 7 + i * 3;
    return { name: `${A[k % A.length]} ${B[(k + ri) % B.length]}`, area: region, region, note: NOTES[(ri + i) % NOTES.length], hue: HUES[(ri + i) % HUES.length] };
  }),
).reduce<Hotel[]>((acc, h) => (acc.some(x => x.name === h.name) ? [...acc, { ...h, name: `${h.name} ${h.region.split(" ")[0]}` }] : [...acc, h]), []);
export const detailHotels = catalog.filter(h => ["Napa", "Russian River", "Mendocino"].includes(h.region)).slice(0, 8);
export const moreHotels = catalog.filter(h => !detailHotels.includes(h)).slice(0, 26).map(h => h.name);
export const nightsBetween = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
