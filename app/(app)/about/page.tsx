"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
export default function About() {
  const { t, list } = useLang();
  return (
    <main className="page prose">
      <h1 className="big">{t("about.title")}</h1>
      {list<string>("about.p").map(x => <p key={x}>{x}</p>)}
      <p><strong>{t("about.strong")}</strong></p>
      {list<string>("about.p2").map(x => <p key={x}>{x}</p>)}
      <p>{t("about.twoWays")}</p>
      <ul>{list<string>("about.ways").map(x => <li key={x}>{x}</li>)}</ul>
      <p>{t("about.p3")}</p>
      <h2>{t("about.hoteliersTitle")}</h2>
      <p>{t("about.h1")}</p><p>{t("about.h2")}</p><p>{t("about.h3")}</p>
      <h3>{t("about.parityTitle")}</h3>
      <p>{t("about.parity")}</p>
      <ul>{list<string>("about.parityList").map(x => <li key={x}>{x}</li>)}</ul>
      <h2>{t("about.closing")}</h2>
      <p>{t("about.closingBody")}</p>
      <Link href="/dashboard/" className="btn">{t("about.cta")}</Link>
    </main>
  );
}
