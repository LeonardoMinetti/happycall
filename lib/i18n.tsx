"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dicts, Lang } from "./dict";

type Vars = Record<string, string | number>;
type Ctx = {
  lang: Lang; setLang: (l: Lang) => void; locale: string;
  t: (path: string, vars?: Vars) => string;
  list: <T = unknown>(path: string) => T[];
  fmtDate: (d: Date, o?: Intl.DateTimeFormatOptions) => string;
  fmtNum: (n: number) => string;
};
const C = createContext<Ctx | null>(null);
const KEY = "jaha.lang";

const dig = (obj: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), obj);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    let l: Lang = "en";
    try {
      const s = localStorage.getItem(KEY);
      if (s === "pt" || s === "en") l = s; else if (navigator.language.toLowerCase().startsWith("pt")) l = "pt";
    } catch { /* storage unavailable */ }
    setLangState(l);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = String(dig(dicts[lang], "meta.title"));
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  }, []);
  const value = useMemo<Ctx>(() => {
    const locale = lang === "pt" ? "pt-BR" : "en-US";
    const t = (path: string, vars?: Vars) => {
      const v = dig(dicts[lang], path);
      if (typeof v !== "string") return path;
      return vars ? v.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : v;
    };
    const list = <T,>(path: string) => (Array.isArray(dig(dicts[lang], path)) ? (dig(dicts[lang], path) as T[]) : []);
    return { lang, setLang, locale, t, list, fmtDate: (d, o) => d.toLocaleDateString(locale, o), fmtNum: n => n.toLocaleString(locale) };
  }, [lang, setLang]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useLang = () => {
  const c = useContext(C);
  if (!c) throw new Error("LangProvider missing");
  return c;
};

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`langtoggle ${className}`} role="group" aria-label={t("nav.language")}>
      {(["en", "pt"] as Lang[]).map(l => (
        <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}
