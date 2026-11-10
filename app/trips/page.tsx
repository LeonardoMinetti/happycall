import TripCard from "@/components/TripCard";
import { trips } from "@/lib/data";
export default function Trips() {
  return (
    <main className="page">
      <h1>Trips</h1>
      <div className="cols trips-col">
        <section className="trips-col"><div className="eyebrow">Planning · {trips.length}</div>{trips.map(t => <TripCard key={t.id} t={t} />)}</section>
        <section><div className="eyebrow">Booked · 0</div><div className="col-empty">Nothing booked yet. Stays you accept show up here until you get back.</div></section>
        <section><div className="eyebrow">Past &amp; cancelled · 0</div><div className="col-empty">Nothing here yet. Stays you&apos;ve taken, and bookings you cancel, end up here.</div></section>
      </div>
    </main>
  );
}
