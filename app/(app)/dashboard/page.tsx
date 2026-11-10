"use client";
import Link from "next/link";
import Calendar from "@/components/Calendar";
import MapPanel from "@/components/MapPanel";
import TripCard from "@/components/TripCard";
import { invites, trending, trips } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { useWatchlist } from "@/lib/watchlist";

export default function Dashboard() {
  const { t, fmtNum, fmtDate } = useLang();
  const wl = useWatchlist();
  return (
    <main>
      <section className="trips-strip" aria-label={t("dash.openTrips")}>
        <span className="eyebrow strip-label">{t("dash.openTrips")}</span>
        {trips.map(x => <TripCard key={x.id} t={x} />)}
      </section>
      <div className="dash">
        <Calendar trip={trips[0]} />
        <div className="main">
          <section className="where">
            <div>
              <div className="eyebrow">{t("dash.whereToGo")}</div>
              <div className="hotels-head">
                <span className="eyebrow" style={{ letterSpacing: ".08em" }}>{t("dash.hotels")} <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>&nbsp;{t("dash.onWatchlist", { n: wl.saved.length })}</span></span>
                <Link href="/watchlist/" className="outlined">{t("dash.addHotelsWatchlist")}</Link>
              </div>
              {wl.saved.length === 0 ? (
                <p className="empty">{t("dash.emptyWatchlist")} <Link href="/watchlist/" className="link">{t("dash.addHotels")}</Link></p>
              ) : (
                <ul className="savedlist">{wl.saved.slice(0, 6).map(n => <li key={n}>★ {n}</li>)}</ul>
              )}
            </div>
            <div>
              <div className="eyebrow">{t("dash.places")}</div>
              <MapPanel />
            </div>
          </section>
          <section className="across">
            <h2>{t("dash.across")}</h2>
            <p className="sub">{t("dash.acrossSub")}</p>
            <div className="row-head"><span className="eyebrow">{t("dash.recentInvites")}</span></div>
            <div className="invites">
              {invites.map(i => (
                <div key={i.id} className="invite"><span className="avatar">{i.who}</span>
                  <span>{t("dash.offeredIn", { pct: i.pct, place: i.place })}</span><small>{fmtDate(new Date(i.date + "T12:00"), { month: "short", day: "numeric" })}</small></div>
              ))}
            </div>
            <div className="row-head">
              <span className="eyebrow">{t("dash.trending")} <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 500 }}>&nbsp;{t("dash.trendingSub")}</span></span>
              <Link href="/watchlist/" className="accent-link">{t("dash.browseRegions")}</Link>
            </div>
            <div className="trending">
              {trending.map(x => <Link key={x.place} href="/watchlist/"><b className="n">{fmtNum(x.n)}</b><b className="p">{x.place}</b></Link>)}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
