export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#3a5fd9" />
      <path d="M19.5 8.5v10a4.5 4.5 0 0 1-9 0" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="19.5" cy="6.2" r="0" fill="#fff" />
      <path d="M8.5 8.5h6" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}
