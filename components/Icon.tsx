// Lightweight inline-SVG icon system for PGAK — stroke-based, inherits currentColor.
// Used in place of emoji so icons render identically on every device and stay on-brand.

type IconName =
  | "bell"
  | "face"
  | "filter"
  | "devices"
  | "camera"
  | "shield-lock"
  | "link"
  | "ai-node"
  | "radar"
  | "phone-alert";

const PATHS: Record<IconName, React.ReactNode> = {
  // Instant threat alerts
  bell: (
    <>
      <path d="M18 8.5A6 6 0 1 0 6 8.5c0 6.5-2.8 8.5-2.8 8.5h17.6S18 15 18 8.5Z" />
      <path d="M9.5 20.5a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  // Face & person recognition
  face: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
      <circle cx="9.4" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="11" r="1" fill="currentColor" stroke="none" />
      <path d="M9 14.6c.8.8 1.9 1.2 3 1.2s2.2-.4 3-1.2" />
    </>
  ),
  // False-alarm filtering
  filter: <path d="M3 4.5h18l-7 8.4V19l-4 2v-8.1L3 4.5Z" />,
  // Anywhere access (multi-device)
  devices: (
    <>
      <rect x="2.5" y="4" width="13" height="9" rx="1.6" />
      <path d="M6.5 17h5.5" />
      <path d="M9 13v4" />
      <rect x="15.5" y="8.5" width="6" height="11.5" rx="1.4" />
      <path d="M18 18h0.6" />
    </>
  ),
  // Retrofit-ready (CCTV camera)
  camera: (
    <>
      <path d="M3 8.4 17.3 4.8l.9 3.6L4 12 3 8.4Z" />
      <circle cx="14" cy="7.4" r="1.3" fill="currentColor" stroke="none" />
      <path d="M6.4 11.2 5 16.4a2 2 0 0 1-2 1.6" />
      <path d="M18.2 8.4 21 10" />
    </>
  ),
  // Private by design (shield + lock)
  "shield-lock": (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.6 3 7.6 7 9 4-1.4 7-4.4 7-9V5.8L12 3Z" />
      <rect x="9.4" y="11" width="5.2" height="4.4" rx="1" />
      <path d="M10.5 11V9.9a1.5 1.5 0 0 1 3 0V11" />
    </>
  ),
  // Connect (chain link)
  link: (
    <>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11.5 6.8 13 5.3a3.5 3.5 0 0 1 5 5l-1.6 1.6" />
      <path d="M12.5 17.2 11 18.7a3.5 3.5 0 0 1-5-5l1.6-1.6" />
    </>
  ),
  // Learn (AI node)
  "ai-node": (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 4.6v2.2M12 17.2v2.2M4.6 12h2.2M17.2 12h2.2" />
      <path d="M6.9 6.9 8.4 8.4M15.6 15.6 17.1 17.1M17.1 6.9 15.6 8.4M8.4 15.6 6.9 17.1" />
    </>
  ),
  // Detect (radar / target)
  radar: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 3.6v2.4M12 18v2.4M3.6 12H6M18 12h2.4" />
    </>
  ),
  // Alert (phone notification)
  "phone-alert": (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2.4" />
      <path d="M10.5 18h3" />
      <circle cx="17" cy="6" r="2.6" fill="currentColor" stroke="currentColor" />
    </>
  ),
};

export type { IconName };

export default function Icon({
  name,
  size = 24,
  strokeWidth = 1.7,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
