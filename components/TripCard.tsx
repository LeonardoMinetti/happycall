"use client";
import Link from "next/link";
import { Trip } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export function useTripLabel() {
  const { fmtDate, lang } = useLang();
  return (t: Trip) => {
    const o: Intl.DateTimeFormatOptions = lang === "pt" ? { day: "2-digit", month: "2-digit", year: "numeric" } : { month: "short", day: "numeric", year: "numeric" };
    return `${fmtDate(new Date(t.startISO), o)} – ${fmtDate(new Date(t.endISO), o)}`;
  };
}
export default function TripCard({ t: trip }: { t: Trip }) {
  const { t } = useLang();
  const label = useTripLabel();
  return (
    <Link href={`/trips/${trip.id}/`} className="tripcard" aria-label={`${t("common.seeDetails")}: ${t("common.probing")}`}>
      <div className="dates"><span className="dot" />{label(trip)}</div>
      <div className="places">{trip.places} +2</div>
      <div className="chips"><span className="chip">{t("common.adults", { n: trip.adults })}</span><span className="chip">{trip.price}</span></div>
      <div className="steps">{[1, 2, 3, 4].map(i => <i key={i} className={i < trip.step ? "done" : i === trip.step ? "now" : ""} />)}</div>
      <div className="tripfoot"><span>{t("common.probing")}</span><span className="pillbtn">{t("common.seeDetails")}</span></div>
    </Link>
  );
}
