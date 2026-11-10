"use client";
import { useEffect, useState } from "react";
import { Trip } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
export function useWeekdays() {
  const { fmtDate } = useLang();
  return Array.from({ length: 7 }, (_, i) => fmtDate(new Date(2026, 0, 4 + i), { weekday: "short" }).replace(".", "").slice(0, 2));
}
function Month({ y, m, trip, today, nav }: { y: number; m: number; trip?: Trip; today: Date; nav?: React.ReactNode }) {
  const { fmtDate } = useLang();
  const wd = useWeekdays();
  const first = new Date(y, m, 1), n = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first.getDay()).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)];
  const start = trip ? new Date(trip.startISO) : null, end = trip ? new Date(trip.endISO) : null;
  return (
    <div className="cal">
      <div className="calhead"><h3>{fmtDate(first, { month: "long", year: "numeric" })}</h3>{nav}</div>
      <div className="calgrid" role="grid">
        {wd.map((w, i) => <div key={i} className="dow">{w}</div>)}
        {cells.map((c, i) => {
          if (!c) return <div key={i} />;
          const day = new Date(y, m, c, 12);
          const inRange = start && end && day >= new Date(start.getFullYear(), start.getMonth(), start.getDate()) && day <= end;
          const cls = ["day", inRange ? "in" : "", start && same(day, start) ? "start" : "", same(day, today) ? "today" : ""].join(" ");
          return <button key={i} className={cls} aria-label={fmtDate(day, { dateStyle: "full" })}>{c}</button>;
        })}
      </div>
    </div>
  );
}
export default function Calendar({ trip }: { trip?: Trip }) {
  const { t } = useLang();
  const [today, setToday] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => setToday(new Date()), []);
  if (!today) return <aside className="rail"><div className="eyebrow">{t("dash.yourCalendar")}</div></aside>;
  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  return (
    <aside className="rail">
      <div className="eyebrow">{t("dash.yourCalendar")}</div>
      <div style={{ height: 14 }} />
      {[0, 1].map(k => {
        const x = new Date(base.getFullYear(), base.getMonth() + k, 1);
        const nav = k === 0 ? (
          <span>
            <button onClick={() => setOffset(o => o - 1)} aria-label={t("dash.prevMonth")}>‹</button>
            <button onClick={() => setOffset(o => o + 1)} aria-label={t("dash.nextMonth")}>›</button>
          </span>
        ) : undefined;
        return <Month key={k} y={x.getFullYear()} m={x.getMonth()} trip={trip} today={today} nav={nav} />;
      })}
      {trip && <div className="legend"><i />{t("dash.travelNights")} <span>{t("dash.selected")}</span></div>}
    </aside>
  );
}
