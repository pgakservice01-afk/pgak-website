import Link from "next/link";
const USE_CASES = [
  ["Warehouse video analytics", "/ai-cctv-for-warehouses", "Assess loading bays, restricted stock areas and after-hours movement."],
  ["Factory security and attendance", "/factory-security", "Plan perimeter alerts and entrance coverage around your shifts."],
  ["Face recognition attendance", "/face-recognition-attendance-system", "Check entrance camera suitability and review attendance exceptions."],
  ["AI intrusion detection", "/ai-intruder-detection", "Define zones, schedules and the person who will respond to an alert."],
  ["Multi-site CCTV monitoring", "/multi-site-cctv-monitoring", "Evaluate visibility across sites and camera-health requirements."],
  ["AI video analytics software", "/video-analytics-software", "Understand stream compatibility, processing and the rollout process."],
];
export default function ProtectedSites() {
  return <section id="sites" className="sec"><div className="wrap">
    <p className="eyebrow">Business use cases</p>
    <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">Find the right starting point for your site</h2>
    <p className="mt-4 max-w-[70ch] text-ink-soft">These are applications to evaluate, not measured customer results. Start with a small set of cameras and agree acceptance criteria before a wider rollout.</p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{USE_CASES.map(([title,href,body])=><article key={href} className="card p-6"><h3 className="text-lg font-semibold"><Link href={href} className="text-accent hover:underline">{title} →</Link></h3><p className="mt-3 text-ink-soft">{body}</p></article>)}</div>
  </div></section>;
}
