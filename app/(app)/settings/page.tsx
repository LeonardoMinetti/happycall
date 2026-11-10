"use client";
import Link from "next/link";
import { useState } from "react";
import { LangToggle, useLang } from "@/lib/i18n";

export default function Settings() {
  const { t } = useLang();
  const [name, setName] = useState("Alex Demo");
  const [draft, setDraft] = useState(name);
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [out, setOut] = useState(false);
  return (
    <main className="page narrow settings">
      <h1>{t("settings.title")}</h1>
      <div className="card2">
        <div className="row2">
          <div><small className="eyebrow">{t("settings.name")}</small>
            {editing ? <input className="inl" value={draft} autoFocus onChange={e => setDraft(e.target.value)} aria-label={t("settings.name")} /> : <div className="val">{name}</div>}</div>
          {editing ? (
            <span className="acts"><button className="linkbtn" onClick={() => { setName(draft.trim() || name); setEditing(false); }}>{t("settings.save")}</button><button className="linkbtn muted" onClick={() => { setDraft(name); setEditing(false); }}>{t("settings.cancel")}</button></span>
          ) : <button className="linkbtn" onClick={() => { setDraft(name); setEditing(true); }}>{t("settings.edit")}</button>}
        </div>
        <div className="row2 bt"><div><small className="eyebrow">{t("settings.email")}</small><div className="val">alex@example.com</div></div></div>
      </div>
      <Link href="/watchlist/" className="card2 navrow"><div><b>{t("settings.watchlist")}</b><small>{t("settings.watchlistSub")}</small></div><span>›</span></Link>
      <Link href="/about/" className="card2 navrow"><div><b>{t("settings.about")}</b><small>{t("settings.aboutSub")}</small></div><span>›</span></Link>
      <div className="card2 navrow"><div><b>{t("settings.language")}</b><small>{t("settings.languageSub")}</small></div><LangToggle /></div>
      <p className="muted2">{t("settings.help")} <Link href="/for-hotels/" className="link">{t("settings.contact")}</Link></p>
      <p className="muted2"><Link href="/privacy/" className="link">{t("settings.privacy")}</Link></p>
      <button className="signout" onClick={() => setOut(true)}>{t("settings.signOut")}</button>
      {out && <p className="notice" role="status">{t("settings.signedOut")}</p>}
      <div style={{ textAlign: "center", marginTop: 18 }}><button className="ulink linkbtn muted" onClick={() => setConfirm(true)}>{t("settings.delete")}</button></div>
      {confirm && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={t("settings.deleteTitle")} onClick={() => setConfirm(false)}>
          <div className="modalbox" onClick={e => e.stopPropagation()}>
            <h2>{t("settings.deleteTitle")}</h2><p>{t("settings.deleteBody")}</p>
            <div className="modalacts"><button className="btn" onClick={() => setConfirm(false)}>{t("settings.keep")}</button><button className="linkbtn danger" onClick={() => setConfirm(false)}>{t("settings.deleteConfirm")}</button></div>
          </div>
        </div>
      )}
    </main>
  );
}
