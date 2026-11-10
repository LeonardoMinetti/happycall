"use client";
import { useLang } from "@/lib/i18n";
export default function Offers() {
  const { t } = useLang();
  return (
    <main className="page">
      <h1>{t("offers.title")}</h1>
      <div className="centered"><h2>{t("offers.emptyTitle")}</h2><p>{t("offers.emptyBody")}</p></div>
    </main>
  );
}
