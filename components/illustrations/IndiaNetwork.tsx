// Stylised India silhouette with a live network of verified-dealer pins.
// Shape is intentionally illustrative (not a survey-grade map).

const HUB = { x: 150, y: 96 }; // Delhi-ish hub

const PINS: { x: number; y: number; city: string; delay: string }[] = [
  { x: 137, y: 72, city: "Ludhiana", delay: "0s" },
  { x: 150, y: 96, city: "Delhi", delay: "0.3s" },
  { x: 128, y: 116, city: "Jaipur", delay: "0.9s" },
  { x: 112, y: 206, city: "Mumbai", delay: "0.5s" },
  { x: 176, y: 232, city: "Hyderabad", delay: "1.1s" },
  { x: 166, y: 280, city: "Bengaluru", delay: "0.7s" },
  { x: 201, y: 268, city: "Chennai", delay: "1.4s" },
  { x: 236, y: 172, city: "Kolkata", delay: "0.2s" },
];

const INDIA =
  "M150 28 C175 24 205 40 220 58 C235 72 266 70 292 92 C301 100 296 116 282 122 " +
  "C268 128 258 150 250 178 C242 206 232 232 222 258 C214 280 208 320 196 356 " +
  "C192 366 184 366 180 354 C172 320 162 292 150 262 C140 238 132 214 120 192 " +
  "C110 174 96 168 86 156 C74 144 60 150 58 136 C56 124 74 120 86 122 " +
  "C100 124 110 110 118 92 C126 74 132 50 150 28 Z";

export default function IndiaNetwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 400" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="in-glow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#7CF5C4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7CF5C4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="in-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#13252e" />
          <stop offset="100%" stopColor="#0c1a20" />
        </linearGradient>
        <pattern id="in-dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#7CF5C4" fillOpacity="0.18" />
        </pattern>
      </defs>

      <rect x="20" y="10" width="300" height="360" fill="url(#in-glow)" />

      {/* silhouette */}
      <path d={INDIA} fill="url(#in-fill)" stroke="#7CF5C4" strokeOpacity="0.45" strokeWidth="1.4" />
      <path d={INDIA} fill="url(#in-dots)" />

      {/* hub → dealer links */}
      <g stroke="#7CF5C4" strokeWidth="1.1" strokeLinecap="round">
        {PINS.filter((p) => p.city !== "Delhi").map((p) => (
          <line
            key={`l-${p.city}`}
            x1={HUB.x}
            y1={HUB.y}
            x2={p.x}
            y2={p.y}
            strokeOpacity="0.28"
            strokeDasharray="2 6"
            className="animate-dash"
          />
        ))}
      </g>

      {/* pins */}
      {PINS.map((p) => (
        <g key={p.city}>
          <circle cx={p.x} cy={p.y} r="9" fill="#7CF5C4" fillOpacity="0.18" className="animate-glowPulse" style={{ transformOrigin: `${p.x}px ${p.y}px`, animationDelay: p.delay }} />
          <circle cx={p.x} cy={p.y} r="3" fill="#7CF5C4" />
          <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="#04201a" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}
