// Mock data only. Names, places and numbers are invented for this clone.
export type Trip = {
  id: string; start: Date; end: Date; places: string; adults: number; price: string;
  step: number; stepLabel: string;
};
const d = (offset: number) => { const x = new Date(); x.setHours(0,0,0,0); x.setDate(x.getDate()+offset); return x; };
export const trips: Trip[] = [
  { id: "demo-1", start: d(1), end: d(114), places: "Mendocino, Russian River +2", adults: 2, price: "$$", step: 3, stepLabel: "Probing rates" },
];
export const invites = [
  { id: "i1", who: "M", pct: 6, place: "Russian River", date: "Oct 30" },
  { id: "i2", who: "H", pct: 15, place: "Santa Cruz", date: "Oct 30" },
];
export const trending = [
  { place: "San Francisco", n: 474 }, { place: "Carmel + Monterey", n: 459 }, { place: "Napa", n: 455 },
  { place: "Los Angeles", n: 447 }, { place: "San Diego", n: 445 },
];
export const pins = [
  { name: "Point Reyes", lat: 38.07, lng: -122.88 }, { name: "Napa", lat: 38.30, lng: -122.29 },
  { name: "Mendocino", lat: 39.31, lng: -123.80 },
];
export const fmt = (t: Trip) => {
  const o: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return `${t.start.toLocaleDateString("en-US", o)} – ${t.end.toLocaleDateString("en-US", o)}`;
};

export const hotels = [
  { name: "Cedar Hollow Lodge", area: "Valley Town", note: "Three Keys · 2025", hue: 215 },
  { name: "Saltmarsh House", area: "Harbor Point", note: "Two Keys · 2024", hue: 180 },
  { name: "Vine & Lantern Inn", area: "Valley Town", note: "Two Keys · 2024", hue: 235 },
  { name: "North Ridge Hotel", area: "Valley Town", note: "Two Keys · 2024", hue: 150 },
  { name: "The Willowmere", area: "River Bend", note: "Two Keys · 2024", hue: 195 },
  { name: "Copper Gate Inn", area: "Valley Town", note: "One Key · 2024–2025", hue: 130 },
  { name: "Starling Ranch", area: "Valley Town", note: "One Key · 2025", hue: 70 },
  { name: "Alder Springs Resort", area: "Hot Springs", note: "Four-Star Rating · 2026", hue: 25 },
];
export const moreHotels = ["Oak Barrel Inn","Tidewater Lodge","Driftline Cabins","Foxglove Farm Hotel","Granite Cove Resort","Bluff House","Mistral Motor Lodge","Quail Run Inn","Seabird Landing","Hearth & Hammock"];
export const nights = (t: Trip) => Math.round((t.end.getTime() - t.start.getTime()) / 86400000);
