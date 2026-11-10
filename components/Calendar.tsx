"use client";
import { useEffect, useState } from "react";
import { Trip } from "@/lib/data";

const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
function Month({ y, m, trip, today, nav }: { y: number; m: number; trip?: Trip; today: Date; nav?: React.ReactNode }) {
  const first = new Date(y, m, 1), n = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first.getDay()).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)];
  return (
    <div className="cal">
      <div className="calhead"><h3>{first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3>{nav}</div>
      <div className="calgrid" role="grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(w => <div key={w} className="dow">{w}</div>)}
        {cells.map((c, i) => {
          if (!c) return <div key={i} />;
          const day = new Date(y, m, c);
          const inRange = trip && day >= trip.start && day <= trip.end;
          const cls = ["day", inRange ? "in" : "", trip && same(day, trip.start) ? "start" : "", same(day, today) ? "today" : ""].join(" ");
          return <button key={i} className={cls} style={{ border: 0 }} aria-label={day.toDateString()}>{c}</button>;
        })}
      </div>
    </div>
  );
}
export default function Calendar({ trip }: { trip?: Trip }) {
  const [today, setToday] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => setToday(new Date()), []);
  if (!today) return <aside className="rail"><div className="eyebrow">Your calendar</div></aside>;
  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  return (
    <aside className="rail">
      <div className="eyebrow">Your calendar</div>
      <div style={{ height: 14 }} />
      {[0, 1].map(k => {
        const x = new Date(base.getFullYear(), base.getMonth() + k, 1);
        const nav = k === 0 ? (
          <span>
            <button onClick={() => setOffset(o => o - 1)} aria-label="Previous month">‹</button>
            <button onClick={() => setOffset(o => o + 1)} aria-label="Next month">›</button>
          </span>
        ) : undefined;
        return <Month key={k} y={x.getFullYear()} m={x.getMonth()} trip={trip} today={today} nav={nav} />;
      })}
      {trip && <div className="legend"><i />Travel nights <span>selected</span></div>}
    </aside>
  );
}
