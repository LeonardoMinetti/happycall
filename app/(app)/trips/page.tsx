"use client";
import TripCard from "@/components/TripCard";
import { trips } from "@/lib/data";
import { useLang } from "@/lib/i18n";
export default function Trips() {
  const { t } = useLang();
  return (
    <main className="page">
      <h1>{t("trips.title")}</h1>
      <div className="cols trips-col">
        <section className="trips-col"><div className="eyebrow">{t("trips.planning")} · {trips.length}</div>{trips.map(x => <TripCard key={x.id} t={x} />)}</section>
        <section><div className="eyebrow">{t("trips.booked")} · 0</div><div className="col-empty">{t("trips.emptyBooked")}</div></section>
        <section><div className="eyebrow">{t("trips.past")} · 0</div><div className="col-empty">{t("trips.emptyPast")}</div></section>
      </div>
    </main>
  );
}
