"use client";
import Link from "next/link";
import Logo from "./Logo";
import { Pattern, Shape } from "./Shape";
import Sparkle from "./Sparkle";
import { LangToggle, useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="nf">
      <Pattern name="arches" opacity={0.07} blue />
      <Shape kind="quarter" color="coral" size={180} rotate={180} style={{ right: 0, bottom: 0 }} />
      <Shape kind="half" color="royal" size={160} rotate={-12} style={{ left: "-30px", top: "18%" }} />
      <div className="nf-box">
        <Logo height={56} />
        <h1>404 <Sparkle size={34} color="#FF7A67" /></h1>
        <h2>{t("notfound.title")}</h2>
        <p>{t("notfound.body")}</p>
        <Link href="/" className="pg-pill lg">{t("notfound.cta")}</Link>
        <LangToggle />
      </div>
    </main>
  );
}
