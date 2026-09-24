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
import {
  LOCATIONS,
  locationPath,
  resolveLocationName,
  type Location,
} from "@/lib/locations";
import { SOLUTIONS } from "@/lib/solutions";
import { getAllInsights } from "@/lib/insights";
import { HARDWARE_NOTE_LONG } from "@/lib/offer";

/**
 * Shared template for city pages. Each page's genuinely local content lives in
 * lib/locations.ts (`intro`, `localContext`, `nearby`) — the boilerplate here
 * is deliberately the smaller half, so these don't read as doorway pages.
 */
export default function LocationPage({ location }: { location: Location }) {
  const l = location;
  const path = locationPath(l.slug);

  // City pages are the most-crawled pages on the site, so they double as entry
  // points into the article archive. Each city takes a different slice of the
  // list — 18 cities x 4 guides spreads inbound links across every post
  // instead of pointing all of them at the same newest few.
  const allPosts = getAllInsights();
  const cityIndex = Math.max(
    0,
    LOCATIONS.findIndex((x) => x.slug === l.slug)
  );
  const guides = allPosts.length
    ? Array.from(
        { length: Math.min(4, allPosts.length) },
        (_, n) => allPosts[(cityIndex * 4 + n) % allPosts.length]
      )
    : [];

  // Showing all eighteen solution cards on every city page repeats ~200 words
  // of identical text site-wide. A city that names the handful its market
  // actually buys gets a shorter, more relevant block and less boilerplate.
  const solutions = l.solutionSlugs?.length
    ? l.solutionSlugs
        .map((slug) => SOLUTIONS.find((x) => x.slug === slug))
        .filter((x): x is (typeof SOLUTIONS)[number] => Boolean(x))
    : SOLUTIONS;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Areas we serve", path: "/areas-we-serve" },
    { name: l.city, path },
  ];

  // Every answer weaves in this city's own data (focus sectors, nearby towns,
  // direct-team vs dealer) so no two cities publish the same FAQ text — that
  // sameness is what tips templated location pages into doorway territory.
  const nearbyPair = l.nearby.slice(0, 2).join(" and ");
  // Exact-name resolution (aliases allowed), never substring matching, and
  // "nearby" only for genuine neighbours — see NEARBY_MAX_KM.
  const toPages = (names: string[]) =>
    names
      .map(resolveLocationName)
      .filter((x): x is Location => !!x && x.slug !== l.slug);
  const nearbyPages = toPages(l.nearby);
  const otherPages = toPages(l.otherCities ?? []);
  // A city that has written its own answers uses them instead — same four
  // sentences with the name swapped is what makes a set of city pages read as
  // one page to a crawler, and the FAQPage schema carries whichever set the
  // page actually renders.
  const faqs = l.faqs ?? [
    {
      q: `Do you install AI CCTV in ${l.city}?`,
      a: l.hasOffice
        ? `Yes — ${l.city} is our home base, so deployments here are handled directly by our own team, including the site survey and the first fortnight of tuning.`
        : `Yes, through our verified dealer network. Deployment in ${l.city} follows the same process as anywhere else: a free camera audit first, then installation on your existing cameras, then two weeks of tuning against your real footage.`,
    },
    {
      q: `Do I need to buy new cameras in ${l.city}?`,
      a: `Usually not, provided the DVR or NVR exposes an RTSP stream — which nearly all systems installed in the last decade do. ${HARDWARE_NOTE_LONG} In ${l.city} that check usually means the DVRs already running in ${l.focus.toLowerCase()} — the free audit confirms yours before you spend anything.`,
    },
    {
      q: `What does AI CCTV cost in ${l.city}?`,
      a: `Billing is per camera per month, with no hidden fees and no separate licence cost. Whether it's ${l.focus.toLowerCase()} or a single shop, ${l.city} is priced the same way as everywhere else in India — call or WhatsApp us and you'll have your number the same day.`,
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

      <main id="main-content" className="pt-[74px]">
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
              <Link href="#dealer" data-cta={`city-${l.slug}-assessment`} data-intent="assessment" className="btn btn-primary">
                Free camera audit in {l.city} →
              </Link>
              <a href={`tel:${BUSINESS.phoneE164}`} className="btn btn-ghost">
                Call {BUSINESS.phone}
              </a>
            </div>
            <p className="mt-4 text-[0.92rem] text-ink-soft">
              Planning a new site in {l.city} with no cameras yet?{" "}
              <Link
                href="#how-delivery-works"
                data-cta={`city-${l.slug}-new-install`}
                className="text-accent underline underline-offset-2"
              >
                See how a new installation works
              </Link>
              .
            </p>
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

        {l.localAreas && (
          <section className="sec">
            <div className="wrap">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                {l.localAreas.heading}
              </h2>
              <p className="mt-6 max-w-[74ch] text-[1.02rem] leading-relaxed text-ink-soft">
                {l.localAreas.text}
              </p>
              {l.areas && l.areas.length > 0 && (
                <div className="mt-9 grid gap-5 md:grid-cols-2">
                  {l.areas.map((a) => (
                    <div key={a.name} className="card p-7">
                      <h3 className="text-[1.05rem] font-semibold">{a.name}</h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                        {a.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {l.attendanceContext && (
          <section className="sec">
            <div className="wrap">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                Staff attendance in {l.city}
              </h2>
              <p className="mt-6 max-w-[74ch] text-[1.02rem] leading-relaxed text-ink-soft">
                {l.attendanceContext}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/biometric-attendance" className="btn btn-ghost">
                  Biometric attendance without the machine →
                </Link>
                <Link
                  href="/face-recognition-attendance-system"
                  className="btn btn-ghost"
                >
                  Face recognition attendance →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              Solutions available in {l.city}
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((s) => (
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

        {/* How each journey is delivered here. Deliberately neutral on who
            installs: that is an owner decision (CLAIMS_REGISTER C2), so the
            page says what is confirmed per project instead of guessing. */}
        <section className="sec pt-0" id="how-delivery-works">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              How delivery works in {l.city}
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="card p-6 sm:p-7">
                <h3 className="text-[1.05rem] font-semibold">
                  Upgrading CCTV you already have
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                  The camera assessment starts remotely from your recorder&rsquo;s
                  streams, so it does not wait for a site visit. What the
                  software needs on site — the processing unit, setup and any
                  camera changes — is confirmed and itemised in the quote.
                </p>
                <Link
                  href="#dealer"
                  data-cta={`city-${l.slug}-delivery-upgrade`}
                  className="mt-4 inline-block text-accent underline underline-offset-2"
                >
                  Check my cameras →
                </Link>
              </div>
              <div className="card p-6 sm:p-7">
                <h3 className="text-[1.05rem] font-semibold">
                  A new CCTV installation
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                  New sites need on-site survey and installation work.
                  Installation availability, delivery arrangements and
                  timelines are confirmed for your project in {l.city} before
                  quotation.
                </p>
                <Link
                  href="/cctv-installation-company#plan"
                  data-cta={`city-${l.slug}-delivery-new`}
                  className="mt-4 inline-block text-accent underline underline-offset-2"
                >
                  Plan a new installation →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {guides.length > 0 && (
          <section className="sec">
            <div className="wrap">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                Guides for {l.city} buyers
              </h2>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {guides.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/insights/${p.slug}`}
                      className="card flex h-full flex-col p-6 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="text-[0.74rem] uppercase tracking-[0.14em] text-accent">
                        {p.category}
                      </span>
                      <h3 className="mt-2 text-[1rem] font-semibold">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] text-ink-soft">
                        {p.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
                <li className="sm:col-span-2">
                  <Link
                    href="/insights"
                    className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                  >
                    <span className="text-accent">→</span>
                    <span>Read all PGAK insights</span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        )}

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
              {l.nearby.length > 0 ? (
                <>
                  <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                    Also serving near {l.city}
                  </h2>
                  <p className="mt-4 text-ink-soft">{l.nearby.join(" · ")}</p>
                </>
              ) : (
                <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  Outside {l.city}?
                </h2>
              )}
              <p className="mt-4 text-[0.9rem] text-ink-faint">
                Not on the list? We cover most of India through our dealer
                network —{" "}
                <Link href="/contact" className="text-accent underline underline-offset-2">
                  ask us about your area
                </Link>
                .
              </p>
            </div>

            <div>
              {nearbyPages.length > 0 && (
                <>
                  <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                    Nearby city pages
                  </h2>
                  {/* Curated by geography, not a sitewide directory: an identical
                      17-link block on every city page is a doorway-page signal. */}
                  <CityLinks cities={nearbyPages} />
                </>
              )}
              {otherPages.length > 0 && (
                <>
                  <h2
                    className={`display text-[clamp(1.4rem,2.6vw,1.9rem)]${
                      nearbyPages.length > 0 ? " mt-10" : ""
                    }`}
                  >
                    Other cities
                  </h2>
                  <CityLinks cities={otherPages} />
                </>
              )}
              <p className="mt-5">
                <Link
                  href="/areas-we-serve"
                  className="text-accent transition-colors hover:underline"
                >
                  All cities we serve →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Convert in place — the hero CTA targets this on-page form.

            cityHint is gone because the b2b form has no city field: it asks
            for a phone number and a camera count and nothing else. The city
            is still known from the page itself, so routing can read it from
            there, but it is no longer something the visitor confirms. */}
        <DealerForm />
      </main>

      <Footer />
    </>
  );
}

function CityLinks({ cities }: { cities: Location[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
      {cities.map((x) => (
        <li key={x.slug}>
          <Link
            href={locationPath(x.slug)}
            className="text-ink-soft transition-colors hover:text-accent"
          >
            {x.city}
          </Link>
        </li>
      ))}
    </ul>
  );
}
