import { asset } from "@/lib/asset";

/** HappyCall logo. variant: "full" (mark + wordmark), "mark" (symbol only), "white" (wordmark in white for dark backgrounds). */
export default function Logo({ height = 28, variant = "full" }: { height?: number; variant?: "full" | "mark" | "white" }) {
  const file = variant === "mark" ? "happycall-mark.png" : variant === "white" ? "happycall-logo-white.png" : "happycall-logo.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/brand/${file}`)} alt="HappyCall" height={height} style={{ height, width: "auto", display: "block" }} />;
}
