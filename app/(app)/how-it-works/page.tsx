"use client";
import Link from "next/link";
import { PatternBanner } from "@/components/Shape";
import { useLang } from "@/lib/i18n";
export default function How() {
  const { t, list } = useLang();
  const sections = list<{ t: string; b: string }>("how.sections");
  return (
    <main className="page prose">
      <PatternBanner name="blocks" />
      <h1>{t("how.title")}</h1>
      <p className="lead">{t("how.intro")}</p>
      <p>{t("how.intro2")}</p>
      {sections.map((s, i) => (
        <section key={s.t} className="prose-sec"><span className="num">{i + 1}</span><div><h2>{s.t}</h2><p>{s.b}</p></div></section>
      ))}
      <p className="tagline">{t("how.tagline")}</p>
      <Link href="/dashboard/" className="btn">{t("how.cta")}</Link>
    </main>
  );
}
