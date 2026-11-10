"use client";
import Link from "next/link";
import { useState } from "react";
import "./landing.css";
import Logo from "./Logo";
import { LangToggle, useLang } from "@/lib/i18n";

type Item = { t: string; b: string };
export default function Landing() {
  const { t, list } = useLang();
  const why = list<Item>("land.why"), steps = list<Item>("land.steps"), not = list<Item>("land.not"), hl = list<Item>("land.hotelsList");
  const offers = list<{ n: string; p: string; d: string }>("land.offers"), ideas = list<string>("land.ideas"), faq = list<{ q: string; a: string }>("land.faq");
  const guests = list<string>("land.guestsOpt");
  const [g, setG] = useState(1);
  return (
    <div className="lp">
      <header className="lp-head">
        <Link href="/" className="lp-logo"><Logo size={32} /><span>Jaha</span></Link>
        <nav className="lp-nav" aria-label="Primary">
          <a href="#why">{t("land.navWhy")}</a><a href="#how">{t("land.navHow")}</a><a href="#hotels">{t("land.navHotels")}</a><a href="#faq">{t("land.navFaq")}</a>
        </nav>
        <div className="lp-head-r"><LangToggle /><Link href="/dashboard/" className="lp-btn sm">{t("nav.openApp")}</Link></div>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-l">
          <span className="lp-eyebrow">{t("land.eyebrow")}</span>
          <h1>{t("land.h1a")} <em>{t("land.h1b")}</em></h1>
          <p className="lp-sub">{t("land.sub")}</p>
          <form className="lp-form" onSubmit={e => e.preventDefault()} aria-label={t("land.formTitle")}>
            <label className="wide"><span>{t("land.where")}</span><input placeholder={t("land.wherePh")} /></label>
            <label><span>{t("land.from")}</span><input type="date" /></label>
            <label><span>{t("land.to")}</span><input type="date" /></label>
            <label><span>{t("land.guests")}</span><select value={g} onChange={e => setG(Number(e.target.value))}>{guests.map((x, i) => <option key={x} value={i}>{x}</option>)}</select></label>
            <Link href="/intent/new/" className="lp-btn">{t("land.cta")}</Link>
          </form>
          <p className="lp-fine">{t("land.free")}</p>
        </div>
        <div className="lp-hero-r" aria-hidden="true">
          <div className="lp-blob" />
          <div className="lp-card back"><div className="img i2" /></div>
          <div className="lp-card front">
            <div className="img i1"><span className="tag">{t("land.cardTag")}</span></div>
            <div className="body"><b>{t("land.cardName")}</b><small>{t("land.cardPlace")}</small><span className="off">{t("land.cardOff")}</span></div>
          </div>
          <p className="note">{t("land.cardNote")}</p>
        </div>
      </section>

      <section id="why" className="lp-sec">
        <h2>{t("land.whyTitle")}</h2>
        <div className="lp-3">{why.map((w, i) => <article key={w.t} className="lp-tile"><span className="n">0{i + 1}</span><h3>{w.t}</h3><p>{w.b}</p></article>)}</div>
      </section>

      <section id="how" className="lp-sec tint">
        <h2>{t("land.journeyTitle")}</h2><p className="lp-lead">{t("land.journeySub")}</p>
        <ol className="lp-steps">{steps.map((s, i) => <li key={s.t}><span className="dot">{i + 1}</span><b>{s.t}</b><small>{s.b}</small></li>)}</ol>
        <div className="lp-example">
          <div className="ex-head"><b>{t("land.example")}</b></div>
          {offers.map((o, i) => (
            <div key={o.n} className={`ex-row ${i === 0 ? "top" : ""}`}><span className={`thumb t${i}`} /><div><b>{o.n}</b><small>{o.p}</small></div><span className="pill">{o.d}</span></div>
          ))}
          <p className="note">{t("land.exampleNote")}</p>
        </div>
      </section>

      <section className="lp-sec">
        <h2>{t("land.ideasTitle")}</h2><p className="lp-lead">{t("land.ideasSub")}</p>
        <div className="lp-chips">{ideas.map(x => <Link key={x} href="/intent/new/" className="chipx">“{x}”</Link>)}</div>
      </section>

      <section className="lp-sec dark">
        <h2>{t("land.notTitle")}</h2>
        <div className="lp-3">{not.map(w => <article key={w.t} className="lp-tile inv"><h3>{w.t}</h3><p>{w.b}</p></article>)}</div>
      </section>

      <section id="hotels" className="lp-sec">
        <div className="lp-hotels">
          <div>
            <span className="lp-eyebrow">{t("land.hotelsEyebrow")}</span>
            <h2>{t("land.hotelsTitle")}</h2><p className="lp-lead">{t("land.hotelsSub")}</p>
            <Link href="/for-hotels/" className="lp-btn">{t("land.hotelsCta")}</Link>
          </div>
          <ul className="lp-list">{hl.map(h => <li key={h.t}><b>{h.t}</b><span>{h.b}</span></li>)}</ul>
        </div>
      </section>

      <section id="faq" className="lp-sec tint">
        <h2>{t("land.faqTitle")}</h2>
        <div className="lp-faq">{faq.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
        <p className="lp-lead small">{t("land.faqMore")}</p>
      </section>

      <section className="lp-final">
        <h2>{t("land.finalTitle")}</h2><p>{t("land.finalSub")}</p>
        <Link href="/intent/new/" className="lp-btn light">{t("land.finalCta")}</Link>
      </section>

      <footer className="lp-foot">
        <div className="lp-logo"><Logo size={26} /><span>Jaha</span></div>
        <p>{t("land.footTag")}</p>
        <div className="links"><Link href="/about/">{t("nav.about")}</Link><Link href="/how-it-works/">{t("nav.how")}</Link><Link href="/for-hotels/">{t("nav.hotels")}</Link><Link href="/guest-demand/">{t("nav.demand")}</Link><Link href="/privacy/">{t("demand.privacy")}</Link></div>
        <small>© {t("land.rights")} {t("land.footDemo")}</small>
      </footer>
    </div>
  );
}
