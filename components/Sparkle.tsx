/** Four-point sparkle from the HappyCall identity. */
export default function Sparkle({ size = 24, color = "currentColor", className = "", style }: { size?: number; color?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path d="M12 1.5c.9 5.4 3.6 8.1 9 9-.0 0 0 0 0 0-5.4.9-8.1 3.6-9 9-.9-5.4-3.6-8.1-9-9 5.4-.9 8.1-3.6 9-9Z" fill={color} stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
