"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { detailHotels, moreHotels, nightsBetween, Trip } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { useWatchlist } from "@/lib/watchlist";
import { useTripLabel } from "./TripCard";

export default function TripDetail({ trip }: { trip: Trip }) {
  const { t, list } = useLang();
  const wl = useWatchlist();
  const label = useTripLabel();
  const [live, setLive] = useState(true);
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(Math.max(0, Math.ceil((new Date(trip.startISO).getTime() - Date.now()) / 86400000))), [trip.startISO]);
  const steps = list<string>("detail.steps"), subs = list<string>("detail.stepsSub");
  const nights = nightsBetween(trip.startISO, trip.endISO);
  return (
    <main className="detail">
      <div className="eyebrow" style={{ color: "#b5562f" }}>● {live ? t("detail.live") : t("detail.paused")}</div>
      <h1 className="dh1">{t("detail.headline", { places: `${trip.places} ${t("detail.and")}`, state: live ? t("detail.stateLive") : t("detail.statePaused") })}</h1>
      <p className="dmeta">{t("detail.meta", { dates: label(trip), nights: t("common.nights", { n: nights }), adults: t("common.adults", { n: trip.adults }) })}</p>
      <div className="dgrid">
        <div>
          <div className="tracker">
            <div className="steps4">{steps.map((_, i) => <i key={i} className={i < 2 ? "done" : i === 2 ? "now" : ""} />)}</div>
            <div className="steps4 labels">
              {steps.map((a, i) => (
                <div key={a} className="step"><span className={`sc ${i < 2 ? "done" : i === 2 ? "now" : ""}`}>{i < 2 ? "✓" : i + 1}</span>
                  <div><b>{a}</b><small>{subs[i]}</small></div></div>
              ))}
            </div>
          </div>
          <div className="stats">
            <div className="stat"><b>34</b><small>{t("detail.netMatch")}</small></div>
            <div className="stat"><b>{days ?? "–"}</b><small>{days === 1 ? t("detail.dayUntil") : t("detail.daysUntil")}</small></div>
          </div>
          <h2 className="h2s">{t("detail.considering")}</h2>
          <p className="sub2">{t("detail.consideringSub")}</p>
          <div className="hgrid">
            {detailHotels.map(h => (
              <div key={h.name} className="hcard">
                <div className="himg" style={{ background: `linear-gradient(135deg,hsl(${h.hue} 35% 82%),hsl(${h.hue} 30% 70%))` }}>
                  <button className="bm" aria-pressed={wl.has(h.name)} aria-label={t("detail.save", { name: h.name })} onClick={() => wl.toggle(h.name)}>{wl.has(h.name) ? "★" : "☆"}</button>
                </div>
                <div className="hbody"><b>{h.name}</b><small>{h.area}</small><span>{h.note}</span></div>
              </div>
            ))}
            <Link href="/watchlist/" className="hadd"><span>+</span><b>{t("detail.addHotel")}</b><small>{t("detail.addHotelSub")}</small></Link>
          </div>
          <div className="more"><div className="eyebrow">{t("detail.andMore", { n: moreHotels.length })}</div><p>{moreHotels.join(" · ")}</p></div>
          <div style={{ textAlign: "center", margin: "28px 0" }}>
            <button className="unpub" onClick={() => setLive(v => !v)}>{live ? t("detail.unpublish") : t("detail.publish")}</button>
          </div>
        </div>
        <aside>
          <div className="next">
            <div className="eyebrow" style={{ color: "#dbe4fb" }}>{t("detail.nextTitle")}</div>
            <h3>{t("detail.n1t")}</h3><p>{t("detail.n1b")}</p>
            <h3>{t("detail.n2t")}</h3><p>{t("detail.n2b")}</p>
            <h3>{t("detail.n3t")}</h3><p>{t("detail.n3b")}</p>
          </div>
          <div className="bucket"><h3>{t("detail.bucketTitle")}</h3><p>{t("detail.bucketBody")}</p><Link href="/watchlist/" className="bucketbtn">{t("detail.bucketCta")}</Link></div>
        </aside>
      </div>
    </main>
  );
}
