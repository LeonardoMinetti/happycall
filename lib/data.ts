// Mock data only. Names, places and numbers are invented for this demo. Market: Brazil.
export type Trip = { id: string; startISO: string; endISO: string; places: string; adults: number; price: string; step: number };
const iso = (offset: number) => { const x = new Date(); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() + offset); return x.toISOString(); };
export const trips: Trip[] = [
  { id: "demo-1", startISO: iso(1), endISO: iso(114), places: "Serra Gaúcha, Paraty", adults: 2, price: "$$", step: 3 },
];
export const invites = [
  { id: "i1", who: "M", pct: 6, place: "Paraty", date: "2026-10-30" },
  { id: "i2", who: "P", pct: 15, place: "Florianópolis", date: "2026-10-30" },
];
export const trending = [
  { place: "Florianópolis", n: 474 }, { place: "Rio de Janeiro", n: 459 }, { place: "Gramado", n: 455 },
  { place: "Jericoacoara", n: 447 }, { place: "Paraty", n: 445 },
];
export const pins = [
  { name: "Gramado", lat: -29.38, lng: -50.87 }, { name: "Florianópolis", lat: -27.6, lng: -48.55 }, { name: "Paraty", lat: -23.22, lng: -44.72 },
];
export const regions: [string, number][] = [
  ["Florianópolis", 12], ["Gramado", 14], ["Paraty", 9], ["Rio de Janeiro", 15], ["Búzios", 10], ["Ilhabela", 7], ["Campos do Jordão", 11],
  ["Praia do Forte", 6], ["Trancoso", 6], ["Morro de São Paulo", 6], ["Maragogi", 5], ["Pipa", 8], ["Jericoacoara", 8],
  ["Lençóis Maranhenses", 4], ["Chapada Diamantina", 7], ["Fernando de Noronha", 3], ["Bonito", 6], ["Ouro Preto", 5], ["Canela", 5], ["São Miguel dos Milagres", 4],
];
/** Suggestions for the trip-request destination field. */
export const destinations = regions.map(([r]) => r).concat(["Foz do Iguaçu", "Pantanal", "Salvador", "Recife", "Belo Horizonte", "Curitiba"]);
const A = ["Mar Azul", "Pedra Grande", "Recanto do Sol", "Vila Bonita", "Ipê Amarelo", "Cajueiro", "Brisa do Mar", "Aldeia", "Buriti", "Jacarandá", "Maré Mansa", "Serra Verde", "Coqueiral", "Lagoa Dourada", "Araçá", "Sabiá"];
const B = ["Pousada", "Chalés", "Casarão", "Hotel Fazenda", "Refúgio", "Resort", "Bangalôs", "Villa"];
/** `note` is an index into the translated `detail.notes` list. */
export type Stay = { name: string; area: string; region: string; note: number; hue: number };
const HUES = [215, 235, 195, 150, 25, 70, 180, 130];
export const catalog: Stay[] = regions.flatMap(([region, count], ri) =>
  Array.from({ length: count }, (_, i) => {
    const k = ri * 7 + i * 3;
    return { name: `${B[(k + ri) % B.length]} ${A[k % A.length]}`, area: region, region, note: (ri + i) % 6, hue: HUES[(ri + i) % HUES.length] };
  }),
).reduce<Stay[]>((acc, h) => (acc.some(x => x.name === h.name) ? [...acc, { ...h, name: `${h.name} ${h.region.split(" ")[0]}` }] : [...acc, h]), []);
export const detailHotels = catalog.filter(h => ["Gramado", "Paraty", "Canela"].includes(h.region)).slice(0, 8);
export const moreHotels = catalog.filter(h => !detailHotels.includes(h)).slice(0, 26).map(h => h.name);
export const nightsBetween = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
