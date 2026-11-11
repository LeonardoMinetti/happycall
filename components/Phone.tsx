import { asset } from "@/lib/asset";

/** Empty smartphone mockup. Drop a screenshot into `.phone-screen` (or pass `src`) when the product screens are ready. */
export default function Phone({ className = "", src, style }: { className?: string; src?: string; style?: React.CSSProperties }) {
  return (
    <div className={`phone ${className}`} style={style} aria-hidden="true">
      <div className="phone-screen">
        <span className="phone-island" />
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="phone-shot" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset("/brand/happycall-appicon.png")} alt="" className="phone-mark" />
        )}
      </div>
    </div>
  );
}
