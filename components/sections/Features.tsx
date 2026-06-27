import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";

const FEATURES: { ic: IconName; t: string; d: string }[] = [
  {
    ic: "bell",
    t: "Instant Threat Alerts",
    d: "Sub-three-second detection of intrusions and anomalies, pushed straight to your phone with context.",
  },
  {
    ic: "face",
    t: "Face & Person Recognition",
    d: "Tell family from strangers automatically and build a trusted list of known faces.",
  },
  {
    ic: "filter",
    t: "False-Alarm Filtering",
    d: "AI learns your routine and ignores wind, shadows and pets — so alerts stay meaningful.",
  },
  {
    ic: "devices",
    t: "Anywhere Access",
    d: "Live view and history from any device, whether you're across the room or across the country.",
  },
  {
    ic: "camera",
    t: "Retrofit Ready",
    d: "Works with your current CCTV, IP cameras and DVR/NVR — no rip-and-replace, no downtime.",
  },
  {
    ic: "shield-lock",
    t: "Private by Design",
    d: "End-to-end encryption keeps your footage and data secure and fully under your control.",
  },
];

export default function Features() {
  return (
    <section id="features" className="sec bg-bg-2">
      <div className="wrap">
        <Reveal className="mb-14 max-w-[680px]">
          <span className="eyebrow mb-4">Products &amp; features</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            Everything you need for genuine peace of mind.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            A complete intelligence suite that layers onto your security — built
            for homes, shops, offices and industrial sites alike.
          </p>
        </Reveal>

        {/* Glassmorphism grid — backdrop-blur, thin borders, subtle hover glow */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.t}
              delay={(i % 3) * 0.06}
              className="glass group p-8 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_#7cf5c4]"
            >
              <div className="mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_10px_24px_-12px_#7cf5c4] transition-transform duration-300 group-hover:scale-105">
                <Icon name={f.ic} size={24} strokeWidth={1.8} />
              </div>
              <h4 className="mb-2 text-[1.2rem] font-semibold">{f.t}</h4>
              <p className="text-[0.93rem] text-ink-soft">{f.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
