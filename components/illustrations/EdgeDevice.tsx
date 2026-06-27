// PGAK AI edge device — isometric SVG with premium lighting + a pulsing "AI" core.
// The brain that sits between the cameras and the phone.

export default function EdgeDevice({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ed-ambient" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#7CF5C4" stopOpacity="0.30" />
          <stop offset="55%" stopColor="#3ed8e0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0a1014" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ed-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c3640" />
          <stop offset="100%" stopColor="#0f2128" />
        </linearGradient>
        <linearGradient id="ed-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2027" />
          <stop offset="100%" stopColor="#091317" />
        </linearGradient>
        <linearGradient id="ed-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16303a" />
          <stop offset="100%" stopColor="#0c1b21" />
        </linearGradient>
        <radialGradient id="ed-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6fff0" />
          <stop offset="40%" stopColor="#7CF5C4" />
          <stop offset="100%" stopColor="#0fb89a" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <rect x="10" y="6" width="200" height="200" fill="url(#ed-ambient)" />

      {/* floor shadow */}
      <ellipse cx="110" cy="180" rx="62" ry="14" fill="#04080a" opacity="0.55" />

      <g className="animate-floaty" style={{ transformOrigin: "110px 110px" }}>
        {/* right face */}
        <path
          d="M110 118 L160 90 L160 126 L110 154 Z"
          fill="url(#ed-right)"
          stroke="#7CF5C4"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {/* left face */}
        <path
          d="M110 118 L60 90 L60 126 L110 154 Z"
          fill="url(#ed-left)"
          stroke="#7CF5C4"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        {/* top face */}
        <path
          d="M110 62 L160 90 L110 118 L60 90 Z"
          fill="url(#ed-top)"
          stroke="#7CF5C4"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />

        {/* status LEDs on right face */}
        <circle cx="146" cy="112" r="2.4" fill="#7CF5C4" />
        <circle cx="138" cy="116.5" r="2.4" fill="#3ed8e0" />
        <circle cx="130" cy="121" r="2.4" fill="#65807f" />
        {/* vents on left face */}
        <path d="M72 104 L86 96 M72 110 L86 102 M72 116 L86 108" stroke="#65807f" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />

        {/* glowing AI core on top face */}
        <g style={{ transformOrigin: "110px 90px" }}>
          <circle cx="110" cy="90" r="26" fill="url(#ed-core)" className="animate-glowPulse" style={{ transformOrigin: "110px 90px" }} />
          <ellipse cx="110" cy="90" rx="15" ry="8.6" fill="none" stroke="#04201a" strokeOpacity="0.6" strokeWidth="1.4" />
          <ellipse cx="110" cy="90" rx="8" ry="4.6" fill="#eafff8" />
          <circle cx="110" cy="90" r="2.2" fill="#0fb89a" />
        </g>
      </g>
    </svg>
  );
}
