"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./landing.css";
import Icon from "./Icon";
import Logo from "./Logo";
import Phone from "./Phone";
import Sparkle from "./Sparkle";
import { Shape } from "./Shape";
import { asset } from "@/lib/asset";
import { destinations } from "@/lib/data";
import { saveRequest } from "@/lib/request";
import { LangToggle, useLang } from "@/lib/i18n";

const HEADER = 78; // sticky header height, px

/** Calls `cb` with 0..1 while a tall track scrolls past a pinned (sticky) child. */
function useScrub(ref: React.RefObject<HTMLElement | null>, cb: (p: number, reduce: boolean) => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const run = () => {
      raf = 0;
      if (reduce) { cbRef.current(1, true); return; }
      const r = el.getBoundingClientRect();
      const total = r.height - (window.innerHeight - HEADER);
      const p = total > 0 ? Math.min(1, Math.max(0, (HEADER - r.top) / total)) : 1;
      cbRef.current(p, false);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, [ref]);
}
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const COLLAGE_IMG = ["card-paraty", "card-lencois", "card-floripa", "card-noronha", "card-jeri", "card-chapada"];
const OFFER_IMG = ["offer-forte", "offer-paraty", "offer-lencois"];
const FEATURE_BG = ["#FFE0D8", "#CFE9FF", "#FFE0D8", "#CFE9FF"];

export default function Landing() {
  const { t, list } = useLang();
  const [menu, setMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState(1);
  const audRef = useRef<HTMLDivElement>(null);
  const misRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [still, setStill] = useState(false);
  const features = list<{ e: string; t: string; b: string }>("land.features");
  const collage = list<{ t: string; s: string }>("land.collage");
  const offers = list<{ badge: string; tags: string[]; name: string; off: string; cta: string }>("land.offers");
  const guestOpt = list<string>("land.req.guestsOpt"), reqT = list<string>("land.req.title");
  const faq = list<{ q: string; a: string }>("land.faq");
  const h1 = list<string>("land.h1"), audT = list<string>("land.audienceTitle"), faqT = list<string>("land.faqTitle"), nlT = list<string>("land.nlTitle");
  const aud = list<{ i: string; t: string }>("land.audience");
  useScrub(audRef, (p, reduce) => { setStill(reduce); setCur(Math.min(aud.length - 1, Math.floor(p * aud.length))); });
  useScrub(misRef, (p) => {
    const el = misRef.current;
    if (!el) return;
    const q = clamp01(p / 0.66);
    el.querySelectorAll<HTMLElement>(".pg-cc").forEach((c, i) => c.style.setProperty("--e", String(clamp01(q * 1.25 - i * 0.05))));
    const tt = clamp01((p - 0.42) / 0.4);
    el.style.setProperty("--t", String(tt));
    el.dataset.on = tt > 0.35 ? "1" : "0";
  });
  const nav = [[t("land.nav.about"), "/about/"], [t("land.nav.how"), "#features"], [t("land.nav.hotels"), "/for-hotels/"], [t("land.nav.contact"), "#contact"]] as const;
  const bg = (n: string) => ({ backgroundImage: `url(${asset(`/img/${n}.jpg`)})` });
  const isAnchor = (h: string) => h.startsWith("#");

  return (
    <div className="pg">
      <div className="pg-bar"><span>{t("land.banner")}</span><a href="#contact" className="pg-barbtn">{t("land.bannerCta")}</a></div>
      <header className="pg-head">
        <Link href="/" aria-label="HappyCall"><Logo height={46} className="lg-only" /><Logo variant="hc" height={30} className="sm-only" /></Link>
        <nav className="pg-nav" aria-label="Primary">
          {nav.map(([l, h]) => (isAnchor(h) ? <a key={h} href={h}>{l}</a> : <Link key={h} href={h}>{l}</Link>))}
        </nav>
        <div className="pg-head-r">
          <LangToggle />
          <Link href="/dashboard/" className="pg-pill">{t("nav.openApp")}</Link>
          <button className="pg-burger" aria-label={t("nav.menu")} aria-expanded={menu} onClick={() => setMenu(m => !m)}><span /><span /></button>
        </div>
        {menu && (
          <div className="pg-mob" onClick={() => setMenu(false)}>
            {nav.map(([l, h]) => (isAnchor(h) ? <a key={h} href={h}>{l}</a> : <Link key={h} href={h}>{l}</Link>))}
            <Link href="/dashboard/" className="pg-pill">{t("nav.openApp")}</Link>
          </div>
        )}
      </header>

      <section className="pg-hero" style={bg("hero")}>
        <div className="pg-veil" />
        <Sparkle size={34} color="#FF7A67" className="sp s1" /><Sparkle size={22} color="#fff" className="sp s2" /><Sparkle size={26} color="#0A3BD9" className="sp s3" />
        <div className="pg-hero-in">
          <h1>{h1[0]} <Icon name={h1[1]} className="hico" /> {h1[2]} <Icon name={h1[3]} className="hico" /> {h1[4]}</h1>
          <div className="pg-ctas"><Link href="/intent/new/" className="pg-pill lg">{t("land.cta")}</Link><Link href="/dashboard/" className="pg-ghost">{t("land.cta2")}</Link></div>
          <p className="pg-sub">{t("land.sub")}</p>
        </div>
        <div className="pg-phones">
          <Phone className="p-side l" /><Phone className="p-mid" /><Phone className="p-side r" />
        </div>
      </section>

      <section id="pedido" className="pg-req">
        <h2>{reqT[0]}<span className="acc">{reqT[1]}</span>{reqT[2]}</h2>
        <form className="pg-reqbar" onSubmit={e => { e.preventDefault(); saveRequest({ where: where.trim(), from, to, guests: guests + 1 }); router.push("/intent/new/"); }}>
          <label className="seg grow"><Icon name="pin" className="sico" /><span className="sr">{t("land.req.where")}</span>
            <input list="br-destinos" value={where} onChange={e => setWhere(e.target.value)} placeholder={t("land.req.wherePh")} autoComplete="off" />
          </label>
          <datalist id="br-destinos">{destinations.map(d => <option key={d} value={d} />)}</datalist>
          <label className="seg"><Icon name="calendar" className="sico" /><span className="lab">{t("land.req.checkIn")}</span>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
          </label>
          <label className="seg"><span className="lab">{t("land.req.checkOut")}</span>
            <input type="date" value={to} min={from || undefined} onChange={e => setTo(e.target.value)} />
          </label>
          <label className="seg"><Icon name="traveler" className="sico" /><span className="sr">{t("land.req.guests")}</span>
            <select value={guests} onChange={e => setGuests(Number(e.target.value))}>{guestOpt.map((g, i) => <option key={g} value={i}>{g}</option>)}</select>
          </label>
          <button type="submit" className="pg-pill lg">{t("land.req.cta")}</button>
        </form>
        <p className="free">{t("land.req.sub")}</p>
        <small className="note">{t("land.req.hint")}</small>
      </section>

      <section className={`pg-aud ${still ? "still" : ""}`}>
        <div ref={audRef} className="pg-aud-track" style={{ ["--n" as string]: aud.length }}>
          <div className="pg-aud-stick">
            <Shape kind="pill" color="coral" size={150} rotate={-8} style={{ left: "-60px", top: "22%" }} />
            <Shape kind="half" color="sky" size={130} rotate={12} style={{ right: "-30px", top: "16%" }} />
            <h2>{audT[0]} <Icon name={audT[1]} className="hico" /> {audT[2]}</h2>
            <div className="pg-chipstage" aria-live="polite">
              {aud.map((a, i) => (
                <span key={a.t} className={`pg-chip ${i === cur ? "cur" : i < cur ? "past" : "next"}`} style={{ ["--rot" as string]: `${i % 2 ? 2.5 : -2.5}deg` }}>
                  <Icon name={a.i} className="cico" />{a.t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="pg-feats">
        {features.map((f, i) => (
          <article key={f.t} className="pg-feat" style={{ background: FEATURE_BG[i], top: `${88 + i * 14}px` }}>
            <div className="pg-feat-t"><h3><Icon name={f.e} className="hico" /> {f.t}</h3><p>{f.b}</p></div>
            <div className="pg-feat-p"><Phone /></div>
          </article>
        ))}
      </section>

      <section className="pg-mission">
        <div ref={misRef} className="pg-mis-track" data-on="0">
          <div className="pg-mis-stick">
            <div className="pg-mis-text">
              <h2>{t("land.aboutTitle")}</h2>
              <p>{t("land.aboutBody")}</p>
              <Link href="/about/" className="pg-pill lg">{t("land.aboutCta")}</Link>
            </div>
            <div className="pg-cards" aria-hidden="false">
              {collage.map((c, i) => (
                <figure key={c.t} className="pg-cc" role="img" aria-label={`${c.t}: ${c.s}`} style={bg(COLLAGE_IMG[i])} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pg-offers">
        <Shape kind="quarter" color="royal" size={90} style={{ left: 0, top: 0 }} />
        <Shape kind="quarter" color="coral" size={80} rotate={180} style={{ right: 0, bottom: 0 }} />
        <h2>{t("land.offersTitle")}</h2>
        <p className="lead">{t("land.offersBody")}</p>
        <div className="pg-ogrid">
          {offers.map((o, i) => (
            <article key={o.name} className="pg-offer">
              <div className="img" style={bg(OFFER_IMG[i])}><span className="badge"><Sparkle size={14} color="#0A3BD9" />{o.badge}</span></div>
              <div className="tags">{o.tags.map(g => <span key={g}>{g}</span>)}</div>
              <h3>{o.name}</h3>
              <p className="off">{o.off}</p>
              <Link href="/dashboard/" className="pg-dark">{o.cta}</Link>
            </article>
          ))}
        </div>
        <Link href="/dashboard/" className="pg-pill lg">{t("land.offersAll")}</Link>
        <small className="note">{t("land.offersNote")}</small>
      </section>

            <div className="pg-banner" style={bg("banner")} role="img" aria-label="" />

      <section id="faq" className="pg-faq">
        <h2>{faqT[0]} <Icon name={faqT[1]} className="hico" /> {faqT[2]}</h2>
        <div className="pg-qs">{faq.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </section>

      <section id="contact" className="pg-foot">
        <Shape kind="arch" color="royal" size={130} rotate={12} style={{ right: "5%", top: "-26px" }} />
        <h2>{nlT[0]} <Icon name={nlT[1]} className="hico" /> {nlT[2]}</h2>
        <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <label htmlFor="nl">{t("land.nlLabel")}</label>
          <input id="nl" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t("land.nlPh")} />
          <button type="submit" className="pg-dark sm">{t("land.nlBtn")}</button>
          {sent && <p role="status" className="thanks">{t("land.nlThanks")}</p>}
        </form>
        <div className="pg-foot-row">
          <nav>
            <Link href="/about/">{t("land.foot.about")}</Link><a href="#features">{t("land.foot.how")}</a><Link href="/for-hotels/">{t("land.foot.hotels")}</Link>
            <a href="mailto:hello@happycall.example">{t("land.foot.contact")}</a>
          </nav>
          <div className="pg-foot-lang"><span>{t("land.foot.lang")}</span><LangToggle /></div>
        </div>
        <Logo height={64} />
      </section>
      <div className="pg-legal"><span>{t("land.copyright")}</span><span><Link href="/privacy/">{t("land.foot.privacy")}</Link><Link href="/terms/">{t("land.foot.terms")}</Link></span></div>
    </div>
  );
}
