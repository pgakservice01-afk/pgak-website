import Reveal from "@/components/Reveal";
import DetectionDashboard from "@/components/illustrations/DetectionDashboard";

const CHECKS = [
  "Facial & person recognition — know who belongs",
  "Intrusion, loitering & perimeter detection",
  "Real-time mobile alerts with live snapshots",
  "Monitor home or business from anywhere",
  "End-to-end encryption — your footage stays yours",
];

export default function LiveIntelligence() {
  return (
    <section className="sec">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <DetectionDashboard />
        </Reveal>

        <Reveal delay={0.08}>
          <span className="eyebrow mb-4">Real intelligence</span>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
            It doesn&rsquo;t just see. It understands.
          </h2>
          <p className="mt-4 text-ink-soft">
            PGAK distinguishes a family member from a stranger, a delivery from a
            break-in, a pet from a prowler — so the alerts you get actually mean
            something.
          </p>
          <ul className="mt-3 list-none">
            {CHECKS.map((c) => (
              <li
                key={c}
                className="flex gap-3.5 border-b border-line py-3 text-ink-soft last:border-none"
              >
                <span className="font-bold text-accent">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
