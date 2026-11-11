// The visitor's trip request, kept in localStorage so the landing page form can hand it to the new-trip wizard.
export type TripRequest = { where: string; from: string; to: string; guests: number };
const KEY = "happycall.request";
export function saveRequest(r: TripRequest) { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch { /* ignore */ } }
export function loadRequest(): TripRequest | null {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (r && typeof r === "object" && typeof r.where === "string") return { where: r.where, from: String(r.from ?? ""), to: String(r.to ?? ""), guests: Number(r.guests) || 2 };
  } catch { /* ignore */ }
  return null;
}
