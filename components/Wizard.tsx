"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
export default function Wizard() {
  const [today, setToday] = useState<Date | null>(null);
  const [off, setOff] = useState(0);
  const [a, setA] = useState<Date | null>(null);
  const [b, setB] = useState<Date | null>(null);
  const [windows, setWindows] = useState<[Date, Date][]>([]);
  useEffect(() => { const t = new Date(); t.setHours(0, 0, 0, 0); setToday(t); }, []);
  if (!today) return <div className="wiz" />;
  const first = new Date(today.getFullYear(), today.getMonth() + off, 1);
  const n = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)] as (number | null)[];
  const pick = (d: Date) => { if (!a || b) { setA(d); setB(null); } else if (d < a) { setA(d); } else setB(d); };
  const inSel = (d: Date) => a && (same(d, a) || (b && d >= a && d <= b));
  const ready = !!a;
  return (
    <div className="wiz">
      <header className="wizbar">
        <Link href="/dashboard" aria-label="Back">←</Link>
        <span className="wiztitle">Dates</span><span className="wizstep">1 of 5</span>
        <div className="wizprog"><i /></div>
      </header>
      <section className="wizbody">
        <h1>When are you free?</h1>
        <p className="wizsub">Pick the exact dates you&apos;d travel. Have a few options? Add each as its own window.</p>
        <div className="wizcal">
          <div className="wizmonth"><b>{first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</b>
            <span><button onClick={() => setOff(o => Math.max(0, o - 1))} aria-label="Previous month">‹</button><button onClick={() => setOff(o => o + 1)} aria-label="Next month">›</button></span></div>
          <div className="calgrid">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(w => <div key={w} className="dow">{w}</div>)}
            {cells.map((c, i) => {
              if (!c) return <div key={i} />;
              const d = new Date(first.getFullYear(), first.getMonth(), c);
              const past = d < today;
              return <button key={i} disabled={past} onClick={() => pick(d)} className={["day", inSel(d) ? "in" : "", a && same(d, a) ? "start" : "", same(d, today) ? "today" : ""].join(" ")} style={past ? { opacity: .35 } : undefined}>{c}</button>;
            })}
          </div>
        </div>
        <button className="wizcont" disabled={!ready} onClick={() => { if (a) setWindows(w => [...w, [a, b ?? a]]); }}>Continue</button>
        <button className="wizadd" onClick={() => { if (a) { setWindows(w => [...w, [a, b ?? a]]); setA(null); setB(null); } }}>+ Add another window</button>
        {windows.length > 0 && <p className="wizsub" style={{ textAlign: "center" }}>{windows.length} window(s) saved in this demo (nothing is stored).</p>}
      </section>
    </div>
  );
}
