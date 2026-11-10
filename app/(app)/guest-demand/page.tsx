"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7);
export default function GuestDemand() {
  const { t, fmtNum, fmtDate } = useLang();
  const [where, setWhere] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [res, setRes] = useState<{ n: number; where: string; a: string; b: string } | null>(null);
  return (
    <main className="demand">
      <div className="eyebrow" style={{ color: "#b5562f" }}>{t("demand.eyebrow")}</div>
      <h1><em>{fmtNum(1077)}</em> {t("demand.headline", { n: "" }).trim()}</h1>
      <p className="dsub">{t("demand.sub")}</p>
      <form className="dform" onSubmit={e => { e.preventDefault(); setRes({ n: 40 + hash(where + a + b) % 600, where, a, b }); }}>
        <label><span>{t("demand.where")}</span><input value={where} onChange={e => setWhere(e.target.value)} placeholder={t("demand.wherePh")} /></label>
        <label><span>{t("demand.checkIn")}</span><input type="date" value={a} onChange={e => setA(e.target.value)} aria-label={t("demand.addDate")} /></label>
        <label><span>{t("demand.checkOut")}</span><input type="date" value={b} min={a} onChange={e => setB(e.target.value)} aria-label={t("demand.addDate")} /></label>
        <button type="submit" className="btn">{t("demand.search")}</button>
      </form>
      {res && (
        <div className="dresult" role="status">
          <b>{t("demand.resultTitle", { n: res.n })}</b>{" "}
          {res.where ? t("demand.resultIn", { place: res.where }) : t("demand.anywhere")}
          {res.a && res.b ? " " + t("demand.resultDates", { a: fmtDate(new Date(res.a + "T12:00"), { month: "short", day: "numeric" }), b: fmtDate(new Date(res.b + "T12:00"), { month: "short", day: "numeric" }) }) : ""}
          <small>{t("demand.resultNote")}</small>
        </div>
      )}
      <div className="dfoot"><span>{t("demand.footTag")}</span><Link href="/for-hotels/" className="ulink">{t("demand.aboutHotels")}</Link><Link href="/privacy/" className="ulink">{t("demand.privacy")}</Link></div>
    </main>
  );
}
