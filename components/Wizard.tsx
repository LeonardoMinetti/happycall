"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { loadRequest, TripRequest } from "@/lib/request";
import { useWeekdays } from "./Calendar";

const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
export default function Wizard() {
  const { t, fmtDate, list } = useLang();
  const wd = useWeekdays();
  const [today, setToday] = useState<Date | null>(null);
  const [off, setOff] = useState(0);
  const [a, setA] = useState<Date | null>(null);
  const [b, setB] = useState<Date | null>(null);
  const [windows, setWindows] = useState(0);
  const [req, setReq] = useState<TripRequest | null>(null);
  useEffect(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); setToday(d);
    const r = loadRequest();
    if (!r) return;
    setReq(r);
    const f = r.from ? new Date(r.from + "T00:00") : null, e = r.to ? new Date(r.to + "T00:00") : null;
    if (f && !isNaN(f.getTime()) && f >= d) {
      setA(f); if (e && !isNaN(e.getTime()) && e >= f) setB(e);
      setOff((f.getFullYear() - d.getFullYear()) * 12 + f.getMonth() - d.getMonth());
    }
  }, []);
  if (!today) return <div className="wiz" />;
  const first = new Date(today.getFullYear(), today.getMonth() + off, 1);
  const n = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)] as (number | null)[];
  const pick = (d: Date) => { if (!a || b) { setA(d); setB(null); } else if (d < a) setA(d); else setB(d); };
  const inSel = (d: Date) => a && (same(d, a) || (b && d >= a && d <= b));
  return (
    <div className="wiz">
      <header className="wizbar">
        <Link href="/dashboard/" aria-label={t("common.back")}>←</Link>
        <span className="wiztitle">{t("wizard.step")}</span><span className="wizstep">{t("wizard.of", { a: 1, b: 5 })}</span>
        <div className="wizprog"><i /></div>
      </header>
      <section className="wizbody">
        <h1>{t("wizard.title")}</h1>
        {req && <p className="wizreq">{t("wizard.request", { where: req.where || t("wizard.anywhere"), guests: list<string>("land.req.guestsOpt")[Math.min(Math.max(req.guests, 1), 6) - 1] })}</p>}
        <p className="wizsub">{t("wizard.sub")}</p>
        <div className="wizcal">
          <div className="wizmonth"><b>{fmtDate(first, { month: "long", year: "numeric" })}</b>
            <span><button onClick={() => setOff(o => Math.max(0, o - 1))} aria-label={t("dash.prevMonth")}>‹</button><button onClick={() => setOff(o => o + 1)} aria-label={t("dash.nextMonth")}>›</button></span></div>
          <div className="calgrid">
            {wd.map((w, i) => <div key={i} className="dow">{w}</div>)}
            {cells.map((c, i) => {
              if (!c) return <div key={i} />;
              const d = new Date(first.getFullYear(), first.getMonth(), c);
              const past = d < today;
              return <button key={i} disabled={past} onClick={() => pick(d)} className={["day", inSel(d) ? "in" : "", a && same(d, a) ? "start" : "", same(d, today) ? "today" : ""].join(" ")} style={past ? { opacity: .35 } : undefined}>{c}</button>;
            })}
          </div>
        </div>
        <button className="wizcont" disabled={!a} onClick={() => a && setWindows(w => w + 1)}>{t("wizard.cont")}</button>
        <button className="wizadd" onClick={() => { if (a) { setWindows(w => w + 1); setA(null); setB(null); } }}>{t("wizard.addWindow")}</button>
        {windows > 0 && <p className="wizsub" style={{ textAlign: "center" }}>{t("wizard.saved", { n: windows })}</p>}
      </section>
    </div>
  );
}
