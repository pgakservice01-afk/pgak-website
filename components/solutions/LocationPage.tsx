import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { BUSINESS } from "@/lib/seo";
import { LOCATIONS, locationPath, type Location } from "@/lib/locations";
import { SOLUTIONS } from "@/lib/solutions";

/**
 * Shared template for city pages. Each page's genuinely local content lives in
 * lib/locations.ts (`intro`, `localContext`, `nearby`) — the boilerplate here
 * is deliberately the smaller half, so these don't read as doorway pages.
 */
export default function LocationPage({ location }: { location: Location }) {
  const l = location;
  const path = locationPath(l.slug);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Areas we serve", path: "/areas-we-serve" },
    { name: l.city, path },
  ];

  // Every answer weaves in this city's own data (focus sectors, nearby towns,
  // direct-team vs dealer) so no two cities publish the same FAQ text — that
  // sameness is what tips templated location pages into doorway territory.
  const nearbyPair = l.nearby.slice(0, 2).join(" and ");
  const faqs = [
    {
      q: `Do you install AI CCTV in ${l.city}?`,
      a: l.hasOffice
        ? `Yes — ${l.city} is our home base, so deployments here are handled directly by our own team, including the site survey and the first fortnight of tuning.`
        : `Yes, through our verified dealer network. Deployment in ${l.city} follows the same process as anywhere else: a free camera audit first, then installation on your existing cameras, then two weeks of tuning against your real footage.`,
    },
    {
      q: `Do I need to buy new cameras in ${l.city}?`,
      a: `Almost never. PGAK runs as software on the CCTV you already own, provided the DVR or NVR exposes an RTSP stream — which nearly all systems installed in the last decade do. In ${l.city} that check usually means the DVRs already running in ${l.focus.toLowerCase()} — the free audit confirms yours before you spend anything.`,
    },
    {
      q: `What does AI CCTV cost in ${l.city}?`,
      a: `₹1,000 per camera per month, with no hidden fees and no separate licence cost. Whether it's ${l.focus.toLowerCase()} or a single shop, the ${l.city} rate is the same flat number as everywhere else in India.`,
    },
    {
      q: `How long does deployment take in ${l.city}?`,
      a: l.hasOffice
        ? `Most sites are live within a day of the survey, and our ${l.city} team also covers ${nearbyPair} directly. Tuning zones, schedules and thresholds against your actual footage takes another fortnight — that part is what determines whether you keep the alerts switched on.`
        : `Most sites are live within a day of the survey; the partner covering ${l.city} also serves ${nearbyPair}. Tuning zones, schedules and thresholds against your actual footage takes another fortnight — that part is what determines whether you keep the alerts switched on.`,
    },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path,
            name: `AI CCTV in ${l.city}`,
            description: l.intro,
          }),
          serviceSchema({
            name: `AI CCTV and intruder detection in ${l.city}`,
            description: l.intro,
            path,
            areaServed: `${l.city}, ${l.region}, India`,
          }),
          breadcrumbSchema(trail),
          faqSchema(faqs),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        {/* Extra mobile bottom padding keeps the hero CTA clear of the fixed
            bottom action bar on short viewports. */}
        <section className="sec pb-28 md:pb-10">
          <div className="wrap">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow mt-6">
              {l.city} · {l.region}
            </p>
            <h1 className="display mt-4 max-w-[17ch] text-[clamp(2rem,4.6vw,3.2rem)]">
              AI CCTV and intruder detection in {l.city}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              {l.intro}
            </p>

            <p className="mt-5 text-[0.92rem] text-ink-faint">
              Focus in this market: {l.focus}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#dealer" className="btn btn-primary">
                Free camera audit in {l.city} →
              </Link>
              <a href={`tel:${BUSINESS.phoneE164}`} className="btn btn-ghost">
                Call {BUSINESS.phone}
              </a>
            </div>
            {l.caseStudy && (
              <p className="mt-5 text-ink-soft">
                Worked example for {l.city}:{" "}
                <Link
                  href={l.caseStudy.href}
                  className="text-accent underline underline-offset-4"
                >
                  {l.caseStudy.label}
                </Link>
              </p>
            )}
          </div>
        </section>

        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              What we typically see in {l.city}
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-3">
              {l.localContext.map((c) => (
                <li key={c} className="card p-7 text-[0.95rem] leading-relaxed text-ink-soft">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              Solutions available in {l.city}
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="card flex h-full flex-col p-6 transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="text-[1rem] font-semibold">{s.navLabel}</h3>
                    <p className="mt-2 text-[0.9rem] text-ink-soft">
                      {s.primaryKeyword}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              AI CCTV in {l.city} — common questions
            </h2>
            <div className="mt-8 max-w-[76ch]">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6">
                    <h3 className="text-[1.02rem] font-medium">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Also serving near {l.city}
              </h2>
              <p className="mt-4 text-ink-soft">
                {l.nearby.join(" · ")}
              </p>
              <p className="mt-4 text-[0.9rem] text-ink-faint">
                Not on the list? We cover most of India through our dealer
                network —{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  ask us about your area
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Nearby city pages
              </h2>
              {/* Curated by geography, not a sitewide directory: an identical
                  17-link block on every city page is a doorway-page signal. */}
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {LOCATIONS.filter(
                  (x) =>
                    x.slug !== l.slug &&
                    l.nearby.some(
                      (n) => x.city.includes(n) || n.includes(x.city)
                    )
                ).map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={locationPath(x.slug)}
                      className="text-ink-soft transition-colors hover:text-accent"
                    >
                      {x.city}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/areas-we-serve"
                    className="text-accent transition-colors hover:underline"
                  >
                    All cities we serve →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Convert in place — the hero CTA targets this on-page form. */}
        <DealerForm />
      </main>

      <Footer />
    </>
  );
}
