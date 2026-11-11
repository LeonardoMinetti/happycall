import { asset } from "@/lib/asset";

/** Brand line icon (hand-drawn set). Colour follows `currentColor`; size defaults to 1em. */
export default function Icon({ name, size, className = "", style }: { name: string; size?: number | string; className?: string; style?: React.CSSProperties }) {
  const url = `url(${asset(`/brand/icons/${name}.png`)})`;
  return (
    <span
      aria-hidden="true"
      className={`ic ${className}`}
      style={{ width: size ?? "1em", height: size ?? "1em", WebkitMaskImage: url, maskImage: url, ...style }}
    />
  );
}
