"use client";
import { useEffect, useState } from "react";
import { hotels, moreHotels } from "@/lib/data";

const steps = [["Trip submitted", "Today"], ["Matched 34 hotels", "From our network"], ["Inventory and rate probe", "Up next"], ["Your private invite", "When we find great value"]];
export default function TripDetail(p: { id: string; dates: string; nights: number; adults: number; places: string; startISO: string }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(Math.max(0, Math.ceil((new Date(p.startISO).getTime() - Date.now()) / 86400000))), [p.startISO]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [live, setLive] = useState(true);
  const toggle = (n: string) => setSaved(s => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });
  return (
    <main className="detail">
      <div className="eyebrow" style={{ color: "var(--accent)" }}>{live ? "● Live · submitted today" : "● Unpublished"}</div>
      <h1 className="dh1">Your {p.places.replace(" +2", " and more")} trip is {live ? "live" : "paused"}.</h1>
      <p className="dmeta">{p.dates} · {p.nights} nights · {p.adults} adults</p>
      <div className="dgrid">
        <div>
          <div className="tracker">
            <div className="steps4">{steps.map((_, i) => <i key={i} className={i < 2 ? "done" : i === 2 ? "now" : ""} />)}</div>
            <div className="steps4 labels">
              {steps.map(([a, b], i) => (
                <div key={a} className="step"><span className={`sc ${i < 2 ? "done" : i === 2 ? "now" : ""}`}>{i < 2 ? "✓" : i + 1}</span>
                  <div><b>{a}</b><small>{b}</small></div></div>
              ))}
            </div>
          </div>
          <div className="stats">
            <div className="stat"><b>34</b><small>network hotels match</small></div>
            <div className="stat"><b>{days ?? "–"}</b><small>{days === 1 ? "day" : "days"} until check-in</small></div>
          </div>
          <h2 className="h2s">The hotels we&apos;re considering for you</h2>
          <p className="sub2">Save the ones you&apos;d love to your watchlist. We ask those first.</p>
          <div className="hgrid">
            {hotels.map(h => (
              <div key={h.name} className="hcard">
                <div className="himg" style={{ background: `linear-gradient(135deg,hsl(${h.hue} 35% 82%),hsl(${h.hue} 30% 70%))` }}>
                  <button className="bm" aria-pressed={saved.has(h.name)} aria-label={`Save ${h.name}`} onClick={() => toggle(h.name)}>{saved.has(h.name) ? "★" : "☆"}</button>
                </div>
                <div className="hbody"><b>{h.name}</b><small>{h.area}</small><span>{h.note}</span></div>
              </div>
            ))}
            <div className="hadd"><span>+</span><b>Add a hotel</b><small>Have one in mind? We&apos;ll check it for your dates too.</small></div>
          </div>
          <div className="more"><div className="eyebrow">And {moreHotels.length + 16} more</div><p>{moreHotels.join(" · ")}</p></div>
          <div style={{ textAlign: "center", margin: "28px 0" }}>
            <button className="unpub" onClick={() => setLive(v => !v)}>{live ? "Unpublish trip" : "Publish trip"}</button>
          </div>
        </div>
        <aside>
          <div className="next">
            <div className="eyebrow" style={{ color: "#d9c8ea" }}>What happens next</div>
            <h3>Inventory and rate probe</h3><p>We query room inventory and rates at all 34 for your exact nights, and compare them with published prices.</p>
            <h3>When we find great value</h3><p>You get a private invite: the room, the total price and the cancellation terms. Invites usually go out on Tuesdays, and more often if your dates are close.</p>
            <h3>Until then</h3><p>We keep looking, and you can follow along here.</p>
          </div>
          <div className="bucket"><h3>Bucket list hotels?</h3><p>We&apos;ll tell you about the cheapest nights.</p><button>Add to Watchlist</button></div>
        </aside>
      </div>
    </main>
  );
}
