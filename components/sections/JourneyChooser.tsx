import Link from "next/link";

/**
 * The two customer journeys, side by side.
 *
 *   A. Upgrade my existing CCTV   → free camera assessment (existing flow)
 *   B. Plan a new CCTV installation → /cctv-installation-company#plan
 *
 * Before this, every primary CTA on the site was an audit of cameras the
 * visitor already owns, so a buyer planning a new factory or warehouse had no
 * honest way in. Each card states who it is for, what is supplied, how
 * feasibility is checked, what happens next and the genuine limitation — the
 * wording avoids any claim about who installs where (see CLAIMS_REGISTER C2):
 * availability and delivery are confirmed per project before quotation.
 *
 * `upgradeHref` lets a page point journey A at its own on-page form.
 */
export default function JourneyChooser({
  upgradeHref = "/free-audit",
  newHref = "/cctv-installation-company#plan",
  heading = "Which describes your site?",
  ctaPrefix = "journey",
  className = "",
}: {
  upgradeHref?: string;
  newHref?: string;
  heading?: string;
  /** Prefix for data-cta, so reports can tell which page the choice was made on. */
  ctaPrefix?: string;
  className?: string;
}) {
  const journeys = [
    {
      key: "upgrade",
      title: "Upgrade my existing CCTV",
      forWho:
        "For businesses that already have cameras and a DVR/NVR, and want alerts, attendance or vehicle logging from them.",
      supplied:
        "AI video analytics on your compatible cameras, running on an on-site processing unit, billed per camera per month.",
      checked:
        "A free assessment of your camera views and stream access shows which cameras can do what, and what processing hardware is needed.",
      next: "We call you back, check your cameras, then send a written assessment and quote.",
      limit:
        "Not every camera suits every feature — placement, lighting and stream access decide it.",
      cta: "Check my cameras",
      href: upgradeHref,
    },
    {
      key: "new",
      title: "Plan a new CCTV installation",
      forWho:
        "For new factories, warehouses, offices and other sites with no cameras yet, or a system that needs replacing.",
      supplied:
        "A designed CCTV system — cameras, cabling, recording and storage itemised in the quote — with AI alerts set up from the start.",
      checked:
        "We discuss the site, the areas to cover and your timeline before anything is quoted.",
      next: "We call you back to understand the project; scope and a quotation follow from that.",
      limit:
        "Installation availability, delivery arrangements and timelines are confirmed for your project before quotation.",
      cta: "Plan my installation",
      href: newHref,
    },
  ];

  return (
    <div className={className}>
      <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">{heading}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {journeys.map((j) => (
          <div key={j.key} className="card flex flex-col p-6 sm:p-7">
            <h3 className="text-[1.15rem] font-semibold">{j.title}</h3>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{j.forWho}</p>
            <dl className="mt-4 grid gap-3 text-[0.92rem]">
              <div>
                <dt className="font-semibold">What PGAK supplies</dt>
                <dd className="mt-0.5 text-ink-soft">{j.supplied}</dd>
              </div>
              <div>
                <dt className="font-semibold">How it is checked</dt>
                <dd className="mt-0.5 text-ink-soft">{j.checked}</dd>
              </div>
              <div>
                <dt className="font-semibold">What happens next</dt>
                <dd className="mt-0.5 text-ink-soft">{j.next}</dd>
              </div>
              <div>
                <dt className="font-semibold">Good to know</dt>
                <dd className="mt-0.5 text-ink-soft">{j.limit}</dd>
              </div>
            </dl>
            <div className="mt-auto pt-6">
              <Link
                href={j.href}
                data-cta={`${ctaPrefix}-${j.key}`}
                data-intent={j.key === "new" ? "new-installation" : "assessment"}
                className={j.key === "upgrade" ? "btn btn-primary w-full sm:w-auto" : "btn btn-ghost w-full sm:w-auto"}
              >
                {j.cta} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
