"use client";
import { useLang } from "@/lib/i18n";
export default function Terms() {
  const { t, list } = useLang();
  return <main className="page prose"><h1>{t("terms.title")}</h1>{list<string>("terms.body").map(x => <p key={x}>{x}</p>)}</main>;
}
