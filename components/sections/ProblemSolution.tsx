import Reveal from "@/components/Reveal";

const PAIN = [
  "Cameras only record, never protect — you discover incidents after the loss has already happened.",
  "Too many false alerts, or none at all — so people stop trusting the system completely.",
  "No intelligence — it can't tell who belongs, who doesn't, or what's unusual.",
  "Complicated setup and poor service — DVRs, storage and maintenance feel like a burden.",
  "Zero peace of mind — despite the spend, safety still depends on luck, not technology.",
];

const SOL = [
  "Get alerted before incidents — not after losses.",
  "AI learns your routine and cuts false alarms dramatically.",
  "Detects strangers and threats in seconds — protecting the people you love.",
  "Works on your existing cameras — no new setup, no rip-and-replace.",
  "Private by design — your data stays encrypted and secure.",
];

export default function ProblemSolution() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="mb-14 max-w-[680px]">
          <span className="eyebrow mb-4">The reality today</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            You spent lakhs on cameras. So why doesn&rsquo;t it feel safe?
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            Traditional security shows you the damage after it&rsquo;s done.
            PGAK changes that equation entirely.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-gradient-to-br from-[#1a1113] to-[#120d0e] p-8">
            <h3 className="mb-5 flex items-center gap-3 text-[1.4rem]">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-danger/15 text-danger">
                ⚠
              </span>
              The problem
            </h3>
            <ul>
              {PAIN.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 border-b border-line py-2.5 text-[0.97rem] text-ink-soft last:border-none"
                >
                  <span className="font-bold text-danger">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="card p-8">
            <h3 className="mb-5 flex items-center gap-3 text-[1.4rem]">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-accent/15 text-accent">
                ✦
              </span>
              The PGAK way
            </h3>
            <ul>
              {SOL.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 border-b border-line py-2.5 text-[0.97rem] text-ink-soft last:border-none"
                >
                  <span className="font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
