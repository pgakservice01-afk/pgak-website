import Reveal from "@/components/Reveal";

type Plan = {
  name: string;
  desc: string;
  amt: string;
  unit?: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Home",
    desc: "Smart protection for apartments & homes.",
    amt: "₹1,000",
    unit: "/month · per camera",
    features: [
      "1 camera included",
      "Real-time mobile alerts",
      "Person & motion detection",
      "7-day cloud event history",
      "Encrypted & private",
      "Add more cameras anytime",
    ],
    cta: "Get started",
  },
  {
    name: "Office",
    desc: "For shops, offices & workplaces.",
    amt: "₹1,000",
    unit: "/month · per camera",
    features: [
      "1 camera included",
      "Face recognition & trusted list",
      "Intrusion & loitering detection",
      "30-day cloud event history",
      "Multi-user access & roles",
      "Priority support",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Enterprise",
    desc: "Multi-site & industrial deployments.",
    amt: "Custom",
    features: [
      "Volume pricing for many cameras",
      "Custom AI rules & analytics",
      "Central command dashboard",
      "On-prem or private cloud",
      "Dedicated account manager",
      "SLA-backed support",
    ],
    cta: "Talk to sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="sec">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Plans &amp; pricing</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            One simple rate. ₹1,000 per camera.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            The same transparent price whether it&rsquo;s a home or an office —
            add more cameras as you grow. No hidden fees, no hardware lock-in.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-[22px] md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.07}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                p.featured
                  ? "panel-dark border-accent bg-gradient-to-b from-[#13332b] to-[#0c1a17]"
                  : "border-line bg-panel"
              }`}
            >
              {p.featured && (
                <span className="absolute right-[18px] top-[18px] rounded-full bg-accent px-[11px] py-1 text-[0.68rem] font-bold tracking-wide text-[#04201a]">
                  Most popular
                </span>
              )}
              <h3 className="text-[1.3rem] font-semibold">{p.name}</h3>
              <p className="min-h-[40px] text-[0.86rem] text-ink-faint">
                {p.desc}
              </p>
              <div className="mb-1 mt-3.5 font-display text-[2.7rem]">
                {p.amt}
                {p.unit && (
                  <small className="font-sans text-[0.85rem] font-medium text-ink-faint">
                    {p.unit}
                  </small>
                )}
              </div>
              <ul className="my-6 flex-1 list-none">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 py-2 text-[0.92rem] text-ink-soft"
                  >
                    <span className="text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                // Relative anchor: this table renders on both / and /pricing,
                // and both carry the lead form — so the buyer never leaves the
                // page they're reading to convert.
                href="#dealer"
                className={`btn w-full ${p.featured ? "btn-primary" : "btn-ghost"}`}
              >
                {p.cta}
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-7 text-center text-[0.85rem] text-ink-faint">
          Prices are indicative for early access. A PGAK partner will confirm the
          right plan for your site during your demo.
        </p>
      </div>
    </section>
  );
}
