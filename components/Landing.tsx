"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./landing.css";
import Icon from "./Icon";
import Logo from "./Logo";
import Phone from "./Phone";
import Sparkle from "./Sparkle";
import { Pattern, Shape } from "./Shape";
import { asset } from "@/lib/asset";
import { LangToggle, useLang } from "@/lib/i18n";

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

const COLLAGE_IMG = ["card-cabin", "card-dog", "card-couple", "card-hiker", "card-pool", "card-village"];
const COLLAGE_POS = [
  { x: 19, y: 38, w: 22, h: 30, r: -5 }, { x: 59, y: 35, w: 22, h: 30, r: 4 }, { x: 83, y: 22, w: 24, h: 17, r: -3 },
  { x: 41, y: 20, w: 26, h: 19, r: 3 }, { x: 31, y: 76, w: 28, h: 19, r: 2 }, { x: 76, y: 80, w: 22, h: 28, r: -4 },
];
const OFFER_IMG = ["offer-resort", "offer-cabin", "offer-umbrellas"];
const FEATURE_BG = ["#FFE0D8", "#CFE9FF", "#FFE0D8", "#CFE9FF"];

export default function Landing() {
  const { t, list } = useLang();
  const [menu, setMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [audRef, audOn] = useInView<HTMLDivElement>(0.3);
  const [colRef, colOn] = useInView<HTMLDivElement>(0.35);
  const features = list<{ e: string; t: string; b: string }>("land.features");
  const collage = list<{ t: string; s: string }>("land.collage");
  const offers = list<{ badge: string; tags: string[]; name: string; off: string; cta: string }>("land.offers");
  const reviews = list<{ q: string; n: string }>("land.reviews");
  const faq = list<{ q: string; a: string }>("land.faq");
  const h1 = list<string>("land.h1"), audT = list<string>("land.audienceTitle"), faqT = list<string>("land.faqTitle"), nlT = list<string>("land.nlTitle");
  const aud = list<{ i: string; t: string }>("land.audience");
  const nav = [[t("land.nav.about"), "/about/"], [t("land.nav.how"), "#features"], [t("land.nav.hotels"), "/for-hotels/"], [t("land.nav.community"), "#community"], [t("land.nav.contact"), "#contact"]] as const;
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

      <section className="pg-hero" style={bg("hero-coast")}>
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

      <section className="pg-press">
        <h2>{t("land.pressTitle")}</h2>
        <div className="pg-logos">{[0, 1, 2, 3, 4, 5].map(i => <span key={i} className="pg-slot">{t("land.pressSlot")}</span>)}</div>
      </section>

      <section className="pg-aud">
        <Pattern name="waves" opacity={0.07} />
        <Shape kind="pill" color="coral" size={190} rotate={-8} style={{ left: "-40px", top: "18%" }} />
        <Shape kind="half" color="sky" size={170} rotate={12} style={{ right: "-30px", top: "10%" }} />
        <Shape kind="circle" color="royal" size={110} style={{ right: "8%", bottom: "8%" }} />
        <Sparkle size={30} color="#0F1B4C" className="sp-abs" style={{ left: "12%", bottom: "14%" }} />
        <h2>{audT[0]} <Icon name={audT[1]} className="hico" /> {audT[2]}</h2>
        <div ref={audRef} className={`pg-chips ${audOn ? "on" : ""}`}>
          {aud.map((a, i) => <span key={a.t} className="pg-chip" style={{ ["--i" as string]: i, ["--rot" as string]: `${i % 2 ? 2.5 : -2.5}deg` }}><Icon name={a.i} className="cico" />{a.t}</span>)}
        </div>
      </section>

      <section id="features" className="pg-feats">
        {features.map((f, i) => (
          <article key={f.t} className="pg-feat" style={{ background: FEATURE_BG[i], top: `${88 + i * 14}px` }}>
            <Pattern name={["blocks", "waves", "arches", "blocks"][i] as "blocks" | "waves" | "arches"} opacity={i % 2 ? 0.42 : 0.5} blue={i % 2 === 0} fade="left" />
            <div className="pg-feat-t"><h3><Icon name={f.e} className="hico" /> {f.t}</h3><p>{f.b}</p></div>
            <div className="pg-feat-p"><Phone /></div>
          </article>
        ))}
      </section>

      <section className="pg-mission">
        <Pattern name="blocks" opacity={0.08} />
        <Shape kind="arch" color="royal" size={210} rotate={-14} style={{ left: "-50px", top: "6%" }} />
        <Shape kind="quarter" color="coral" size={150} rotate={180} style={{ right: "-30px", top: "10%" }} />
        <Shape kind="wave" color="sky" size={240} style={{ right: "2%", bottom: "8%" }} />
        <div ref={colRef} className={`pg-collage ${colOn ? "open" : ""}`}>
          {collage.map((c, i) => {
            const p = COLLAGE_POS[i];
            return (
              <figure key={c.t} className="pg-cc" style={{ ...bg(COLLAGE_IMG[i]), ["--x" as string]: `${p.x}%`, ["--y" as string]: `${p.y}%`, ["--w" as string]: `${p.w}cqw`, ["--h" as string]: `${p.h}cqw`, ["--r" as string]: `${p.r}deg`, ["--d" as string]: `${i * 70}ms` }}>
                <figcaption><b>{c.t}</b><small>{c.s}</small></figcaption>
              </figure>
            );
          })}
        </div>
        <h2>{t("land.missionTitle")}</h2>
        <p>{t("land.mission1")}</p><p>{t("land.mission2")}</p>
      </section>

      <section className="pg-about">
        <Shape kind="half" color="navy" size={150} rotate={-20} style={{ left: "-40px", bottom: "20%" }} />
        <Shape kind="pill" color="sky" size={170} rotate={14} style={{ right: "-40px", top: "16%" }} />
        <Sparkle size={34} color="#FF7A67" className="sp-abs" style={{ right: "14%", bottom: "18%" }} />
        <h2>{t("land.aboutTitle")}</h2>
        <p>{t("land.aboutBody")}</p>
        <Link href="/about/" className="pg-pill lg">{t("land.aboutCta")}</Link>
      </section>

      <section className="pg-offers">
        <Pattern name="waves" opacity={0.2} blue />
        <Shape kind="quarter" color="royal" size={130} style={{ left: 0, top: 0 }} />
        <Shape kind="quarter" color="coral" size={110} rotate={180} style={{ right: 0, bottom: 0 }} />
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

      <section id="community" className="pg-comm">
        <h2>{t("land.communityTitle")}</h2>
        <p>{t("land.communityBody")}</p>
        <Link href="/about/" className="pg-pill">{t("land.communityCta")}</Link>
        <div className="pg-reviews" style={bg("sky")}>
          {reviews.map(r => (
            <blockquote key={r.q}><span className="tag">{t("land.reviewTag")}</span><p>{r.q}</p><cite>{r.n}</cite></blockquote>
          ))}
        </div>
        <small className="note">{t("land.reviewsNote")}</small>
      </section>

      <div className="pg-banner" style={bg("banner-van")} role="img" aria-label="" />

      <section id="faq" className="pg-faq">
        <Pattern name="arches" opacity={0.1} blue />
        <h2>{faqT[0]} <Icon name={faqT[1]} className="hico" /> {faqT[2]}</h2>
        <div className="pg-qs">{faq.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </section>

      <section id="contact" className="pg-foot">
        <Pattern name="blocks" opacity={0.26} blue fade="bottom" />
        <Shape kind="arch" color="royal" size={190} rotate={12} style={{ right: "4%", top: "-34px" }} />
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
