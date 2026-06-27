// "Your existing hardware" node — a CCTV camera + DVR/NVR, line-style.

export default function CameraStack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="cs-lens" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6fff0" />
          <stop offset="45%" stopColor="#7CF5C4" />
          <stop offset="100%" stopColor="#7CF5C4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16303a" />
          <stop offset="100%" stopColor="#0c1b21" />
        </linearGradient>
      </defs>

      {/* ambient lens glow */}
      <circle cx="150" cy="70" r="34" fill="url(#cs-lens)" opacity="0.4" />

      {/* wall mount */}
      <g stroke="#65807f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 40 L40 78" />
        <path d="M40 52 L70 60" />
      </g>

      {/* camera body */}
      <path
        d="M60 52 L138 64 L142 84 L64 74 Z"
        fill="url(#cs-body)"
        stroke="#9fb4b6"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M70 56 L132 65" stroke="#7CF5C4" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
      {/* sunshade */}
      <path d="M58 50 L138 62" stroke="#9fb4b6" strokeWidth="2.2" strokeLinecap="round" />

      {/* lens */}
      <circle cx="146" cy="76" r="11" fill="#0a1014" stroke="#9fb4b6" strokeWidth="2.2" />
      <circle cx="146" cy="76" r="5.5" fill="url(#cs-lens)" />
      <circle cx="146" cy="76" r="2" fill="#04201a" />

      {/* REC dot */}
      <circle cx="72" cy="62" r="2.6" fill="#ff8a6b" />

      {/* cable to DVR */}
      <path d="M64 74 C 56 100, 70 108, 84 118" stroke="#65807f" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="1 6" />

      {/* DVR / NVR box */}
      <rect x="52" y="120" width="96" height="30" rx="6" fill="url(#cs-body)" stroke="#9fb4b6" strokeWidth="2.2" />
      <path d="M62 132 H92 M62 138 H84" stroke="#65807f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="128" cy="131" r="2.6" fill="#7CF5C4" />
      <circle cx="138" cy="131" r="2.6" fill="#3ed8e0" />
      <circle cx="128" cy="140" r="2.6" fill="#65807f" />
      <circle cx="138" cy="140" r="2.6" fill="#65807f" />
    </svg>
  );
}
