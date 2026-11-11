"use client";
import Link from "next/link";
import { PatternBanner } from "@/components/Shape";
import { useLang } from "@/lib/i18n";
export default function ForHotels() {
  const { t } = useLang();
  return (
    <main className="page prose">
      <PatternBanner name="waves" />
      <h1 className="big">{t("hotels.title")}</h1>
      <h2>{t("hotels.s1t")}</h2><p>{t("hotels.s1b")}</p>
      <p><Link href="/guest-demand/" className="ulink">{t("hotels.s1link")}</Link></p>
      <h2>{t("hotels.s2t")}</h2><p>{t("hotels.s2b")}</p>
      <h2>{t("hotels.s3t")}</h2><p>{t("hotels.s3b")}</p>
      <p>{t("hotels.idea")}</p>
      <h3>{t("hotels.interested")}</h3>
      <p>{t("hotels.contact")}</p>
      <Link href="/dashboard/" className="btn">{t("hotels.cta")}</Link>
    </main>
  );
}
