import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";

const STEPS: { n: string; t: string; d: string; ic: IconName }[] = [
  {
    n: "01",
    t: "Connect",
    ic: "link",
    d: "Link your existing cameras and DVR/NVR to PGAK's AI layer — no new hardware required.",
  },
  {
    n: "02",
    t: "Learn",
    ic: "ai-node",
    d: "The AI studies your normal routine — who comes and goes, and what counts as ordinary.",
  },
  {
    n: "03",
    t: "Detect",
    ic: "radar",
    d: "Unknown faces, loitering, intrusion and unusual activity are flagged in under three seconds.",
  },
  {
    n: "04",
    t: "Alert",
    ic: "phone-alert",
    d: "You get a clear, instant notification on your phone — with context, before things escalate.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="sec bg-bg-2">
      <div className="wrap">
        <Reveal className="mb-14 max-w-[680px]">
          <span className="eyebrow mb-4">How it works</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            From passive footage to active protection — in four steps.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            No engineers in vans. No new wiring. PGAK&rsquo;s intelligence layer
            connects to what you already run.
          </p>
        </Reveal>

        <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.06}
              className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent"
            >
              {/* watermark step number */}
              <span className="pointer-events-none absolute -right-1 -top-2 font-display text-[4.5rem] leading-none text-accent/[0.07] transition-colors duration-300 group-hover:text-accent/15">
                {s.n}
              </span>
              <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/15">
                <Icon name={s.ic} size={24} strokeWidth={1.7} />
              </div>
              <div className="relative mt-4 font-display text-sm font-semibold tracking-[0.18em] text-accent/50">
                STEP {s.n}
              </div>
              <h4 className="relative mt-1 text-[1.18rem] font-semibold">{s.t}</h4>
              <p className="relative mt-2 text-[0.92rem] text-ink-soft">{s.d}</p>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-accent/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
