"use client";
import Link from "next/link";
import { useState } from "react";
import { catalog, regions, Stay } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { useWatchlist } from "@/lib/watchlist";

export default function Watchlist() {
  const { t, list } = useLang();
  const notes = list<string>("detail.notes");
  const wl = useWatchlist();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string[]>([]);
  const term = q.trim().toLowerCase();
  const shown = catalog.filter(h => (term ? (h.name + " " + h.region).toLowerCase().includes(term) : sel.includes(h.region)));
  const savedHotels = catalog.filter(h => wl.has(h.name));
  const card = (h: Stay) => (
    <div key={h.name} className="hcard">
      <div className="himg" style={{ background: `linear-gradient(135deg,hsl(${h.hue} 35% 82%),hsl(${h.hue} 30% 70%))` }}>
        <button className="bm" aria-pressed={wl.has(h.name)} aria-label={t("detail.save", { name: h.name })} onClick={() => wl.toggle(h.name)}>{wl.has(h.name) ? "★" : "☆"}</button>
      </div>
      <div className="hbody"><b>{h.name}</b><small>{h.area}</small><span>{notes[h.note]}</span></div>
    </div>
  );
  return (
    <main className="page narrow">
      <Link href="/dashboard/" className="link small">{t("common.backToDashboard")}</Link>
      <h1 style={{ marginTop: 14 }}>{t("watch.title")}</h1>
      <p className="sub2">{t("watch.sub")}</p>
      {savedHotels.length === 0 ? <div className="notice">{t("watch.empty")}</div> : (
        <><div className="eyebrow" style={{ margin: "6px 0 10px" }}>{t("watch.saved", { n: savedHotels.length })} · {t("watch.removeHint")}</div><div className="hgrid g3">{savedHotels.map(card)}</div></>
      )}
      <h2 className="h2s" style={{ marginTop: 28 }}>{t("watch.addTitle")}</h2>
      <p className="sub2">{t("watch.addSub")}</p>
      <input className="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t("watch.search")} aria-label={t("watch.search")} />
      <div className="regions">
        {regions.map(([r, n]) => (
          <button key={r} className="region" aria-pressed={sel.includes(r)} onClick={() => setSel(s => (s.includes(r) ? s.filter(x => x !== r) : [...s, r]))}>{r} <span>{n}</span></button>
        ))}
      </div>
      {shown.length > 0 ? <div className="hgrid g3" style={{ marginTop: 18 }}>{shown.map(card)}</div>
        : <p className="empty">{term ? t("watch.noResults") : t("watch.pickRegion")}</p>}
    </main>
  );
}
