"use client";
import { useLang } from "@/lib/i18n";
export default function Privacy() {
  const { t, list } = useLang();
  return <main className="page prose"><h1>{t("privacy.title")}</h1>{list<string>("privacy.body").map(x => <p key={x}>{x}</p>)}</main>;
}
