// Realistic PGAK app phone mockup showing live security notifications.
// Pure markup (no JS) so it renders crisp text and stays reusable across sections.

import Icon, { type IconName } from "@/components/Icon";

type Tone = "danger" | "accent" | "cyan";

const TONE: Record<Tone, { ring: string; text: string; dot: string }> = {
  danger: { ring: "border-danger/40 bg-danger/10", text: "text-danger", dot: "bg-danger" },
  accent: { ring: "border-accent/40 bg-accent/10", text: "text-accent", dot: "bg-accent" },
  cyan: { ring: "border-accent-2/40 bg-accent-2/10", text: "text-accent-2", dot: "bg-accent-2" },
};

const NOTIFS: {
  tone: Tone;
  ic: IconName;
  title: string;
  sub: string;
  time: string;
}[] = [
  { tone: "danger", ic: "bell", title: "Unknown person at the gate", sub: "Front Gate · Cam 02", time: "now" },
  { tone: "accent", ic: "face", title: "Aarav arrived home", sub: "Main Door · Cam 01", time: "2m" },
  { tone: "cyan", ic: "shield-lock", title: "All clear overnight", sub: "12 cameras · 0 alerts", time: "6:00" },
];

export default function PhoneMockup({ className }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-[262px] max-w-full ${className ?? ""}`}>
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(124,245,196,0.20),transparent)] blur-2xl" />

      {/* device frame */}
      <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#1b2e35] to-[#080d10] p-2.5 shadow-[0_50px_90px_-30px_#000]">
        <div className="relative overflow-hidden rounded-[2rem] bg-bg">
          {/* notch */}
          <div className="absolute left-1/2 top-2.5 z-10 h-[18px] w-24 -translate-x-1/2 rounded-full bg-black/80" />

          {/* status bar */}
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-medium text-ink-soft">
            <span>9:41</span>
            <span className="tracking-tight">PGAK</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent" />
              live
            </span>
          </div>

          {/* app header */}
          <div className="px-4 pb-3 pt-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">Today</p>
            <h5 className="font-display text-lg font-semibold leading-tight text-ink">
              3 events
            </h5>
          </div>

          {/* live camera tile */}
          <div className="mx-4 mb-3 overflow-hidden rounded-xl border border-line bg-gradient-to-br from-panel-2 to-bg">
            <div className="relative h-24">
              <div className="absolute inset-0 [background:linear-gradient(transparent,transparent_50%,rgba(124,245,196,0.08)_50%,transparent)] [background-size:100%_5px]" />
              <span className="absolute left-2 top-2 flex items-center gap-1 text-[8px] font-semibold text-ink-soft">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-danger" /> CAM 02
              </span>
              {/* detected figure */}
              <span className="absolute left-[34%] top-[26%] h-[58%] w-[26%] rounded border-2 border-danger">
                <span className="absolute -top-[14px] left-0 rounded bg-danger px-1 text-[7px] font-bold text-[#2a0d05]">
                  UNKNOWN 86%
                </span>
              </span>
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 animate-scanY bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
            </div>
          </div>

          {/* notifications */}
          <div className="space-y-2 px-4 pb-6">
            {NOTIFS.map((n) => {
              const t = TONE[n.tone];
              return (
                <div
                  key={n.title}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${t.ring} ${t.text}`}>
                    <Icon name={n.ic} size={16} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-semibold text-ink">
                      {n.title}
                    </span>
                    <span className="block truncate text-[10px] text-ink-soft">{n.sub}</span>
                  </span>
                  <span className="shrink-0 text-[9px] text-ink-faint">{n.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
