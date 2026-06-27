// PGAK brand lockup — faithful SVG recreation of the shield + camera-aperture mark
// with focus-corner brackets, the PGAK wordmark and the "Intelligent Security" tagline.
// Vector + transparent, so it sits cleanly on the dark theme and scales to any size.

const SHIELD =
  "M50 22 C60 22 68 25 75 28 C77 29 78 30 78 33 L78 50 " +
  "C78 66 66 78 50 84 C34 78 22 66 22 50 L22 33 " +
  "C22 30 23 29 25 28 C32 25 40 22 50 22 Z";

// 6-blade iris (classic camera aperture), centred at (50,50) — each blade is a
// quadrilateral; the gap left in the middle is the hexagonal aperture opening.
const BLADES = [
  "M50 34.5 L63.4 42.3 L55.5 50 L52.8 45.2 Z",
  "M63.4 42.3 L63.4 57.8 L52.8 54.8 L55.5 50 Z",
  "M63.4 57.8 L50 65.5 L47.3 54.8 L52.8 54.8 Z",
  "M50 65.5 L36.6 57.8 L44.5 50 L47.3 54.8 Z",
  "M36.6 57.8 L36.6 42.3 L47.3 45.2 L44.5 50 Z",
  "M36.6 42.3 L50 34.5 L52.8 45.2 L47.3 45.2 Z",
];

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pgak-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b9ffe6" />
          <stop offset="55%" stopColor="#7CF5C4" />
          <stop offset="100%" stopColor="#3ed8e0" />
        </linearGradient>
      </defs>

      {/* focus-corner brackets */}
      <g stroke="url(#pgak-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M7 23 L7 13 Q7 7 13 7 L23 7" />
        <path d="M77 7 L87 7 Q93 7 93 13 L93 23" />
        <path d="M7 77 L7 87 Q7 93 13 93 L23 93" />
        <path d="M93 77 L93 87 Q93 93 87 93 L77 93" />
      </g>

      {/* shield */}
      <path d={SHIELD} fill="#7CF5C4" fillOpacity="0.06" stroke="url(#pgak-grad)" strokeWidth="3" strokeLinejoin="round" />

      {/* aperture */}
      <g fill="url(#pgak-grad)" stroke="#0c1a20" strokeWidth="0.7" strokeLinejoin="round">
        {BLADES.map((d, i) => (
          <path key={i} d={d} fillOpacity={i % 2 === 0 ? 0.95 : 0.74} />
        ))}
      </g>
      <circle cx="50" cy="50" r="18" stroke="url(#pgak-grad)" strokeWidth="1.6" fill="none" />
      {/* highlight catch-light */}
      <circle cx="60" cy="40" r="2.4" fill="#eafff8" />
    </svg>
  );
}

export default function Logo({
  variant = "compact",
  className,
}: {
  variant?: "mark" | "compact" | "full";
  className?: string;
}) {
  if (variant === "mark") return <LogoMark className={className} />;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-[1.55em] w-[1.55em] shrink-0 drop-shadow-[0_0_14px_rgba(124,245,196,0.35)]" />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-sans text-[1em] font-extrabold tracking-[0.06em] text-ink">
          PGAK
        </span>
        {variant === "full" && (
          <span className="mt-[0.3em] font-sans text-[0.3em] font-semibold uppercase tracking-[0.34em] text-ink-soft">
            Intelligent Security
          </span>
        )}
      </span>
    </span>
  );
}
