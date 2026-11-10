"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type W = { saved: string[]; has: (n: string) => boolean; toggle: (n: string) => void };
const C = createContext<W | null>(null);
const KEY = "jaha.watchlist";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => { try { const s = JSON.parse(localStorage.getItem(KEY) ?? "[]"); if (Array.isArray(s)) setSaved(s.filter(x => typeof x === "string")); } catch { /* ignore */ } }, []);
  const toggle = useCallback((n: string) => setSaved(s => {
    const next = s.includes(n) ? s.filter(x => x !== n) : [...s, n];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
    return next;
  }), []);
  const value = useMemo<W>(() => ({ saved, has: n => saved.includes(n), toggle }), [saved, toggle]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useWatchlist = () => {
  const c = useContext(C);
  if (!c) throw new Error("WatchlistProvider missing");
  return c;
};
