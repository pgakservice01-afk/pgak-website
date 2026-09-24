import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { INDUSTRIES } from "@/lib/industries";
import { CAPABILITIES } from "@/lib/capabilities";
import { SOLUTIONS } from "@/lib/solutions";
import { getAllInsights } from "@/lib/insights";

/**
 * The industries hub: the site's existing pages, cut by sector.
 *
 * This is a DIRECTORY, deliberately. Each sector states what its sites are
 * like and hands the reader the pages that already answer it — it does not
 * restate what those pages say. That matters here more than usual: Search
 * Console currently reports 19 URLs as "Duplicate without user-selected
 * canonical" with validation FAILED, so a hub that paraphrases the pages it
 * links to would join that cluster rather than help it.
 *
 * Every link is resolved from the real data files at render time, and
 * lib/industries.test.ts fails if any slug stops resolving.
 */

const PATH = "/industries";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV by Industry in India — Factories, Mandis, Retail | PGAK",
  description:
    "AI CCTV and attendance by sector: factories, warehouses, textile units, rice shellers and mandis, cold storage, retail, jewellery, pharmacies, petrol pumps, hotels, offices, schools, hospitals, societies and construction sites.",
  path: PATH,
  keywords: [
    "AI CCTV for industries",
    "CCTV for factories in India",
    "CCTV for warehouses",
    "CCTV for jewellery shops",
    "CCTV for petrol pumps",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Industries", path: PATH },
];

export default function IndustriesPage() {
  const solutionBySlug = new Map(SOLUTIONS.map((s) => [s.slug, s]));
  const capabilityBySlug = new Map(CAPABILITIES.map((c) => [c.slug, c]));
  const postBySlug = new Map(getAllInsights().map((p) => [p.slug, p]));

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "AI CCTV by industry",
            description:
              "The sectors PGAK publishes guidance for, each linked to the solution page and the articles written for it.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />

      <Nav />

      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Industries</p>
            <h1 className="display mt-4 max-w-[20ch] text-[clamp(2.1rem,4.8vw,3.4rem)]">
              Find your sector, not our product menu
            </h1>
            <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-relaxed text-ink-soft">
              A rice sheller and a jewellery showroom both need cameras that
              think, and almost nothing else about them is the same. Each sector
              below says what its sites are actually like, then points at the
              pages and guides written for it. Every one runs on the compatible
              CCTV already installed, billed per camera per month, with any
              on-site processing hardware confirmed before you commit.
            </p>
            <p className="mt-4 max-w-[64ch] text-[0.95rem] text-ink-faint">
              Suitability is decided on your own camera views and stream access,
              not by your sector. If yours is not listed, the assessment is the
              same — <Link href="/contact" className="text-accent underline underline-offset-2">tell us about the site</Link>.
            </p>
          </div>
        </section>

        {/* Jump list: real crawlable anchors, not a JavaScript dropdown. */}
        <section className="sec-band sec py-8">
          <div className="wrap">
            <h2 className="eyebrow">Jump to a sector</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {INDUSTRIES.map((industry) => (
                <li key={industry.slug}>
                  <a
                    href={`#${industry.slug}`}
                    className="inline-flex rounded-full border border-line bg-panel px-3.5 py-1.5 text-[0.88rem] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {industry.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec">
          <div className="wrap grid gap-5 md:grid-cols-2">
            {INDUSTRIES.map((industry) => {
              const solution = industry.solution ? solutionBySlug.get(industry.solution) : undefined;
              const capabilities = industry.capabilities
                .map((slug) => capabilityBySlug.get(slug))
                .filter((c): c is NonNullable<typeof c> => Boolean(c));
              const reading = industry.reading
                .map((slug) => postBySlug.get(slug))
                .filter((p): p is NonNullable<typeof p> => Boolean(p));

              return (
                <article
                  key={industry.slug}
                  id={industry.slug}
                  className="card flex scroll-mt-24 flex-col p-6 sm:p-7"
                >
                  <h2 className="display text-[1.25rem]">{industry.name}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {industry.context}
                  </p>

                  {capabilities.length > 0 && (
                    <>
                      <h3 className="eyebrow mt-6">What usually matters here</h3>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {capabilities.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/features/${c.slug}`}
                              className="inline-flex rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-[0.82rem] text-accent transition-colors hover:border-accent/50"
                            >
                              {c.navLabel}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {reading.length > 0 && (
                    <>
                      <h3 className="eyebrow mt-6">Written for this sector</h3>
                      <ul className="mt-2.5 flex flex-col gap-2">
                        {reading.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/insights/${p.slug}`}
                              className="group flex items-baseline gap-2 text-[0.92rem]"
                            >
                              <span aria-hidden="true" className="text-accent">→</span>
                              <span className="text-ink-soft transition-colors group-hover:text-accent">
                                {p.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {solution && (
                    <div className="mt-auto pt-6">
                      <Link
                        href={`/${solution.slug}`}
                        data-cta={`industry-${industry.slug}`}
                        className="btn btn-ghost w-full sm:w-auto"
                      >
                        {solution.navLabel} →
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="sec-band sec">
          <div className="wrap max-w-[68ch]">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              Not sure which of these you are?
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Most sites are more than one — a textile unit with a showroom
              attached, a mandi with a cold store behind it. The assessment does
              not ask you to choose: it looks at the camera views you have and
              says which of them can do what. Send your camera count and we will
              start there.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#dealer" data-cta="industries-audit" data-intent="assessment" className="btn btn-primary">
                Get a free camera audit →
              </Link>
              <Link href="/solutions" data-cta="industries-solutions" className="btn btn-ghost">
                Browse by capability instead
              </Link>
            </div>
          </div>
        </section>

        <DealerForm />
      </main>

      <Footer />
    </>
  );
}
