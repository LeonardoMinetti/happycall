"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LangToggle, useLang } from "@/lib/i18n";
import Logo from "./Logo";

export default function TopNav() {
  const path = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  if (path.startsWith("/intent")) return null;
  const tabs = [[t("nav.dashboard"), "/dashboard/"], [t("nav.invites"), "/offers/"], [t("nav.trips"), "/trips/"]] as const;
  const links = [[t("nav.about"), "/about/"], [t("nav.how"), "/how-it-works/"], [t("nav.hotels"), "/for-hotels/"], [t("nav.demand"), "/guest-demand/"]] as const;
  const norm = (x: string) => x.replace(/\/$/, "");
  const cur = (h: string) => (norm(path) === norm(h) || path.startsWith(norm(h) + "/") ? "page" : undefined);
  return (
    <>
      <nav className="topnav">
        <Link href="/" className="brand" aria-label={t("nav.home")}><Logo height={26} /></Link>
        <Link href="/intent/new/" className="newtrip" aria-label={t("nav.newTrip")}>{t("nav.newTrip")}</Link>
        <div className="tabs">
          {tabs.map(([l, h]) => <Link key={h} href={h} aria-current={cur(h)}>{l}</Link>)}
        </div>
        <div className="toplinks">
          {links.map(([l, h]) => <Link key={h} href={h} aria-current={cur(h)}>{l}</Link>)}
          <LangToggle />
          <Link href="/settings/" className="avatar" aria-label={t("nav.account")}>A</Link>
        </div>
        <button className="burger" aria-label={t("nav.menu")} aria-expanded={open} onClick={() => setOpen(o => !o)}><span /><span /><span /></button>
        {open && (
          <div className="mobmenu" onClick={() => setOpen(false)}>
            {links.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
            <Link href="/watchlist/">{t("nav.watchlist")}</Link>
            <Link href="/settings/">{t("nav.settings")}</Link>
            <div onClick={e => e.stopPropagation()}><LangToggle /></div>
          </div>
        )}
      </nav>
      <Link href="/intent/new/" className="fab">{t("nav.newTrip")}</Link>
    </>
  );
}
