import Reveal from "@/components/Reveal";
import CameraStack from "@/components/illustrations/CameraStack";
import EdgeDevice from "@/components/illustrations/EdgeDevice";
import PhoneMockup from "@/components/illustrations/PhoneMockup";

function Connector() {
  return (
    <div className="flex items-center justify-center">
      {/* horizontal (desktop) */}
      <svg viewBox="0 0 110 24" className="hidden h-6 w-full lg:block" fill="none" aria-hidden="true">
        <line x1="2" y1="12" x2="98" y2="12" stroke="#7CF5C4" strokeOpacity="0.2" strokeWidth="2" />
        <line x1="2" y1="12" x2="98" y2="12" stroke="#7CF5C4" strokeWidth="2.4" strokeDasharray="2 8" strokeLinecap="round" className="animate-dash" />
        <path d="M94 6 L106 12 L94 18" stroke="#7CF5C4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* vertical (mobile) */}
      <svg viewBox="0 0 24 56" className="h-12 w-6 lg:hidden" fill="none" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="46" stroke="#7CF5C4" strokeOpacity="0.2" strokeWidth="2" />
        <line x1="12" y1="2" x2="12" y2="46" stroke="#7CF5C4" strokeWidth="2.4" strokeDasharray="2 8" strokeLinecap="round" className="animate-dash" />
        <path d="M6 42 L12 54 L18 42" stroke="#7CF5C4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function NodeLabel({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  return (
    <div className="mt-2 text-center">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent/70">
        {tag}
      </span>
      <h4 className="mt-1.5 text-[1.05rem] font-semibold">{title}</h4>
      <p className="mx-auto mt-1 max-w-[15rem] text-[0.86rem] text-ink-soft">{sub}</p>
    </div>
  );
}

export default function SystemFlow() {
  return (
    <section className="sec bg-bg-2">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[720px] text-center">
          <span className="eyebrow eyebrow-center mb-4">The system</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            One intelligent layer between your cameras and your phone.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            PGAK slots into the gear you already own. The AI watches every feed,
            understands what it sees, and only reaches you when something truly
            matters.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
            {/* cameras */}
            <div className="card flex flex-col items-center p-6">
              <CameraStack className="h-44 w-full max-w-[230px]" />
              <NodeLabel
                tag="Your hardware"
                title="Existing cameras"
                sub="CCTV, IP cams and DVR/NVR — no rip-and-replace."
              />
            </div>

            <Connector />

            {/* PGAK AI — emphasised */}
            <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-b from-panel-2 to-panel p-6 shadow-[0_0_60px_-20px_#7cf5c4]">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <EdgeDevice className="h-48 w-full max-w-[240px]" />
              <NodeLabel
                tag="PGAK AI"
                title="The intelligence layer"
                sub="Learns your routine, watches every feed, decides in real time."
              />
            </div>

            <Connector />

            {/* phone */}
            <div className="card flex flex-col items-center p-6">
              <PhoneMockup className="scale-90" />
              <NodeLabel
                tag="You"
                title="Instant alerts"
                sub="Clear, contextual notifications — anywhere you are."
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
