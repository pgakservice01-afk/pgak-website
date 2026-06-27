// Stylised live AI-detection dashboard: a depth scene with two tracked figures,
// detection boxes, scan line and a HUD. Replaces the old empty faux-feed box.

export default function DetectionDashboard({ className }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden rounded-[20px] border border-line bg-gradient-to-br from-panel-2 to-bg ${className ?? ""}`}
    >
      {/* depth scene */}
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dd-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7CF5C4" stopOpacity="0" />
            <stop offset="100%" stopColor="#7CF5C4" stopOpacity="0.10" />
          </linearGradient>
          <radialGradient id="dd-vig" cx="50%" cy="42%" r="75%">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
          <linearGradient id="dd-fig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d3942" />
            <stop offset="100%" stopColor="#0c1a20" />
          </linearGradient>
        </defs>

        {/* back wall + doorway */}
        <rect x="60" y="40" width="120" height="150" rx="3" fill="#0c1a20" stroke="#7CF5C4" strokeOpacity="0.12" strokeWidth="1.5" />
        <rect x="78" y="58" width="84" height="132" rx="2" fill="#061014" />

        {/* perspective floor */}
        <g stroke="#7CF5C4" strokeOpacity="0.16" strokeWidth="1">
          <path d="M0 200 L600 200" strokeOpacity="0.28" />
          <path d="M-40 400 L240 200 M120 400 L300 200 M300 400 L360 200 M480 400 L420 200 M640 400 L480 200" />
          <path d="M0 250 H600" strokeOpacity="0.12" />
          <path d="M0 310 H600" strokeOpacity="0.1" />
          <path d="M0 380 H600" strokeOpacity="0.08" />
        </g>
        <rect x="0" y="200" width="600" height="200" fill="url(#dd-floor)" />

        {/* known figure */}
        <g fill="url(#dd-fig)">
          <circle cx="222" cy="150" r="24" />
          <path d="M222 176 c-30 0 -42 22 -42 52 v82 h84 v-82 c0 -30 -12 -52 -42 -52 Z" />
        </g>
        {/* unknown figure (closer / larger) */}
        <g fill="url(#dd-fig)">
          <circle cx="416" cy="172" r="28" />
          <path d="M416 202 c-34 0 -48 26 -48 60 v98 h96 v-98 c0 -34 -14 -60 -48 -60 Z" />
        </g>

        {/* detection box — known (accent) */}
        <g stroke="#7CF5C4" strokeWidth="2">
          <rect x="184" y="120" width="78" height="194" rx="4" fill="none" />
          <path d="M184 134 V120 H198 M248 120 H262 V134 M184 300 V314 H198 M248 314 H262 V300" strokeWidth="3" />
        </g>
        {/* detection box — unknown (danger) */}
        <g stroke="#ff8a6b" strokeWidth="2">
          <rect x="366" y="146" width="100" height="216" rx="4" fill="none" />
          <path d="M366 160 V146 H380 M452 146 H466 V160 M366 348 V362 H380 M452 362 H466 V348" strokeWidth="3" />
        </g>

        <rect x="0" y="0" width="600" height="400" fill="url(#dd-vig)" />
      </svg>

      {/* scan line */}
      <div className="pointer-events-none absolute left-0 right-0 h-0.5 animate-scanY bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_18px_#7cf5c4]" />

      {/* corner brackets */}
      <span className="absolute left-[18px] top-[18px] h-[18px] w-[18px] border-l-2 border-t-2 border-ink-faint" />
      <span className="absolute right-[18px] top-[18px] h-[18px] w-[18px] border-r-2 border-t-2 border-ink-faint" />
      <span className="absolute bottom-[18px] left-[18px] h-[18px] w-[18px] border-b-2 border-l-2 border-ink-faint" />
      <span className="absolute bottom-[18px] right-[18px] h-[18px] w-[18px] border-b-2 border-r-2 border-ink-faint" />

      {/* HUD: status */}
      <div className="absolute left-[18px] top-[16px] flex items-center gap-2 text-[0.72rem] font-medium text-ink-soft">
        <span className="h-[9px] w-[9px] animate-pulseDot rounded-full bg-danger" />
        LIVE · CAM 02
      </div>
      <div className="absolute right-[44px] top-[16px] font-sans text-[0.7rem] tabular-nums text-ink-faint">
        02:14:07 · REC
      </div>

      {/* detection labels */}
      <span className="absolute left-[30.6%] top-[24%] -translate-y-full rounded-[5px] bg-accent px-2 py-0.5 text-[0.66rem] font-bold tracking-wide text-[#04201a]">
        Known · Family 99%
      </span>
      <span className="absolute left-[61%] top-[33%] -translate-y-full rounded-[5px] bg-danger px-2 py-0.5 text-[0.66rem] font-bold tracking-wide text-[#2a0d05]">
        Unknown 86%
      </span>

      {/* bottom stat strip */}
      <div className="absolute inset-x-[18px] bottom-[16px] flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/35 px-3 py-1.5 text-[0.66rem] text-ink-soft backdrop-blur-sm">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> 2 people</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-danger" /> 1 unknown</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent-2" /> motion</span>
        <span className="text-accent">analysing…</span>
      </div>
    </div>
  );
}
