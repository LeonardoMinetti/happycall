import Link from "next/link";
import Calendar from "@/components/Calendar";
import MapPanel from "@/components/MapPanel";
import TripCard from "@/components/TripCard";
import { invites, trending, trips } from "@/lib/data";

export default function Dashboard() {
  return (
    <main>
      <section className="trips-strip" aria-label="Open trips">
        <span className="eyebrow strip-label">Open trips</span>
        {trips.map(t => <TripCard key={t.id} t={t} />)}
      </section>
      <div className="dash">
        <Calendar trip={trips[0]} />
        <div className="main">
          <section className="where">
            <div>
              <div className="eyebrow">Where you want to go</div>
              <div className="hotels-head">
                <span className="eyebrow" style={{ letterSpacing: ".08em" }}>Hotels <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>&nbsp;0 on watchlist</span></span>
                <Link href="/dashboard" className="outlined">Add hotels to watchlist</Link>
              </div>
              <p className="empty">Nothing on your watchlist yet. Save hotels you&apos;d love to visit. No dates needed. <Link href="/dashboard" className="link">Add hotels</Link></p>
            </div>
            <div>
              <div className="eyebrow">Places</div>
              <MapPanel />
            </div>
          </section>
          <section className="across">
            <h2>Across Driftwell</h2>
            <p className="sub">What other travelers and hotels are doing right now</p>
            <div className="row-head"><span className="eyebrow">Recent invites</span></div>
            <div className="invites">
              {invites.map(i => (
                <div key={i.id} className="invite"><span className="avatar">{i.who}</span>
                  <span>offered <b>{i.pct}% off</b> in<br />{i.place}</span><small>{i.date}</small></div>
              ))}
            </div>
            <div className="row-head">
              <span className="eyebrow">Trending places <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 500 }}>&nbsp;Travelers adding in the last 30 days</span></span>
              <Link href="/dashboard" className="accent-link">Browse all regions</Link>
            </div>
            <div className="trending">
              {trending.map(t => <Link key={t.place} href="/dashboard"><b className="n">{t.n}</b><b className="p">{t.place}</b></Link>)}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
