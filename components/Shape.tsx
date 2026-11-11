import { asset } from "@/lib/asset";

export const PALETTE = { royal: "#0A3BD9", coral: "#FF7A67", sky: "#9ED7FF", sand: "#FFF6EE", navy: "#0F1B4C" } as const;
type Kind = "quarter" | "half" | "pill" | "circle" | "wave" | "arch";

/** Loose pieces taken from the HappyCall patterns: quarter disc, half disc, pill, circle, wave, arch. Positioned by the caller (style / className). */
export function Shape({ kind, color = "sky", size = 120, rotate = 0, className = "", style }: {
  kind: Kind; color?: keyof typeof PALETTE; size?: number; rotate?: number; className?: string; style?: React.CSSProperties;
}) {
  const c = PALETTE[color];
  const common = { className: `shape ${className}`, style: { width: size, transform: `rotate(${rotate}deg)`, ...style }, "aria-hidden": true as const };
  switch (kind) {
    case "quarter": return <svg viewBox="0 0 100 100" {...common}><path d="M0 100V0a100 100 0 0 1 100 100Z" fill={c} /></svg>;
    case "half": return <svg viewBox="0 0 100 50" {...common}><path d="M0 50a50 50 0 0 1 100 0Z" fill={c} /></svg>;
    case "pill": return <svg viewBox="0 0 160 52" {...common}><rect width="160" height="52" rx="26" fill={c} /></svg>;
    case "circle": return <svg viewBox="0 0 100 100" {...common}><circle cx="50" cy="50" r="50" fill={c} /></svg>;
    case "wave": return <svg viewBox="0 0 220 70" {...common}><path d="M6 44C34 6 64 6 92 34s58 28 86-6c14-16 28-22 40-20" fill="none" stroke={c} strokeWidth="26" /></svg>;
    case "arch": return <svg viewBox="0 0 120 64" {...common}><path d="M13 64a47 47 0 0 1 94 0" fill="none" stroke={c} strokeWidth="26" /></svg>;
  }
}

/** Brand pattern as a decorative layer inside a position:relative container. */
export function Pattern({ name, opacity = 0.14, blue = false, fade, className = "" }: {
  name: "blocks" | "arches" | "waves"; opacity?: number; blue?: boolean; fade?: "left" | "right" | "bottom" | "top"; className?: string;
}) {
  const dir = { left: "to right", right: "to left", bottom: "to top", top: "to bottom" } as const;
  const mask = fade ? `linear-gradient(${dir[fade]}, transparent 0%, #000 70%)` : undefined;
  return (
    <div
      aria-hidden="true"
      className={`pat ${className}`}
      style={{ backgroundImage: `url(${asset(`/patterns/${name}${blue ? "-blue" : ""}.webp`)})`, opacity, WebkitMaskImage: mask, maskImage: mask }}
    />
  );
}

/** Rounded banner cut from a pattern, for page headers. */
export function PatternBanner({ name, blue = false, height = 150 }: { name: "blocks" | "arches" | "waves"; blue?: boolean; height?: number }) {
  return <div className="pbanner" aria-hidden="true" style={{ height, backgroundImage: `url(${asset(`/patterns/${name}${blue ? "-blue" : ""}.webp`)})` }} />;
}
