import { asset } from "@/lib/asset";

type Variant = "full" | "white" | "navy" | "hc" | "icon";
const FILE: Record<Variant, string> = {
  full: "happycall-wordmark.png", white: "happycall-wordmark-white.png", navy: "happycall-wordmark-navy.png",
  hc: "happycall-hc.png", icon: "happycall-appicon.png",
};

/** HappyCall logo. full = stacked wordmark, hc = reduced H✦C, icon = app icon, white/navy = wordmark recolours. Height in px. */
export default function Logo({ height = 40, variant = "full", className = "" }: { height?: number; variant?: Variant; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/brand/${FILE[variant]}`)} alt="HappyCall" className={className} style={{ height, width: "auto", display: "block" }} />;
}
