import type { Metadata } from "next";
import Link from "next/link";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { founders } from "@/lib/people";

/**
 * The founding story.
 *
 * WHAT THIS PAGE MAY AND MAY NOT SAY
 * A founding story is the easiest page on any website to make up, and the
 * hardest for a reader to check. So this one is built out of things that are
 * already on the public record or in this repository, and nothing else. There
 * is no invented scene, no reconstructed conversation, no first customer, no
 * revenue, no deployment count — because none of those exist on file, and a
 * story page is not a licence to start.
 *
 * Every factual beat below traces to one of:
 *   - lib/seo.ts — legal name, CIN, incorporation year, registered city
 *   - lib/people.ts — who founded the company and who runs it
 *   - app/about/page.tsx — the origin framing the owner already approved
 *   - lib/reviews.ts — the ratings block is empty, deliberately
 *   - lib/caseStudies.ts — scenarios are labelled illustrative and modelled
 *   - app/page.tsx — homepage reference footage is credited to Spot AI
 *   - lib/industries.ts — the decision not to publish thin per-sector pages
 *   - docs/seo/2026-09-22/CLAIMS_REGISTER.md — the written claims register
 *
 * The register is referred to as something PGAK keeps, NOT as something that
 * is finished. Several rows in it are still marked as needing the owner's
 * evidence. Saying "everything on this site is proven" would be the exact kind
 * of claim the register exists to catch.
 */

const PATH = "/our-story";

export const metadata: Metadata = pageMeta({
  title: "Our story — why PGAK was built, and what we refuse to claim",
  description:
    "PGAK was started in Ludhiana in 2023 because the cameras were already there and the intelligence wasn't. The story, including the claims we decided not to make.",
  path: PATH,
  keywords: [
    "PGAK story",
    "why PGAK was founded",
    "AI CCTV company Ludhiana",
    "PGAK Innovations history",
    "honest CCTV company India",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Company", path: "/about" },
  { name: "Our story", path: PATH },
];

/** Acts of restraint, each one checkable by a reader who looks. */
const RESTRAINT = [
  {
    h: "No star rating anywhere on this site",
    p: "A rating a business publishes about itself is worth nothing, and Google treats it as self-serving. So the reviews file sits empty — rating zero, count zero, no AggregateRating in any page's structured data. When there are real Google reviews, they will appear. Until then a blank is more honest than a five.",
  },
  {
    h: "No per-camera price, even though everyone asks",
    p: "Publishing a rate would be the easiest conversion win on the site. We do not, because the number genuinely moves with camera count, which analytics run on each, how many sites report into one account and what processing the site needs. A printed figure would be a number nobody could honour.",
  },
  {
    h: "The case studies say they are not case studies",
    p: "Every scenario on this site carries a visible note that it is illustrative — configured for a representative site, with modelled figures rather than measured ones. Not one reports a completed customer project. They would convert better without that label. The label stays until a real customer signs off on a named story.",
  },
  {
    h: "The footage on the homepage is somebody else's, and says so",
    p: "The night-time yard clip is credited in plain text as reference footage from Spot AI, illustrative and not a PGAK deployment. Passing it off as our own would have taken one deleted caption.",
  },
  {
    h: "We did not generate a page per sector to win search",
    p: "The obvious play was fourteen thin landing pages, one per industry. Search Console already reports this site's templates sitting at their similarity ceiling, and thin pages would feed that. The industries hub points at pages that already exist and already earn their place instead.",
  },
  {
    h: "There is a written register of what this site claims",
    p: "Every marketing claim on these pages is listed in one document with what backs it, and rows that lack evidence are marked as needing it rather than quietly left alone. It is not finished. That is rather the point of keeping it.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "Our story — PGAK Innovations",
            description:
              "Why PGAK was founded in Ludhiana in 2023, and the claims the company decided not to make.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-[46px]">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <div className="mx-auto mt-6 max-w-[720px] text-center">
              <span className="eyebrow eyebrow-center mb-4">Our story</span>
              <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.4rem)]">
                The cameras were already there. The intelligence wasn&rsquo;t.
              </h1>
              <p className="mx-auto mt-5 max-w-[640px] text-[1.05rem] leading-relaxed text-ink-soft">
                This is the short version of how PGAK started and what it
                decided not to do. There is no origin myth in it, because we do
                not have one worth inventing.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- the problem */}
        <section className="sec bg-bg-2 pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[760px]">
              <div className="card p-8 sm:p-10">
                <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)]">
                  Ludhiana, where everyone already owned CCTV
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
                  {BUSINESS.legalName} was incorporated in {BUSINESS.founded} in
                  Ludhiana &mdash; a city of factories, hosiery units, rice
                  shellers and godowns. Almost every one of those premises had
                  already bought cameras. A great many of them were still losing
                  stock.
                </p>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                  That is the whole problem in one sentence, and it is not a
                  hardware problem. A recorder captures the theft perfectly and
                  tells nobody. The footage gets reviewed the morning after,
                  once the loss is already a loss. Meanwhile the motion alerts
                  that were supposed to help fire at every stray dog and passing
                  headlight until somebody mutes them, which takes about a week.
                </p>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                  So the gap was never &ldquo;these sites need cameras&rdquo;.
                  The gap was that the cameras could see and could not think.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ what was built */}
        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[760px]">
              <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)]">
                Built by people who had to answer for live sites
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
                PGAK was founded by{" "}
                {founders()
                  .map((p) => p.name)
                  .join(" and ")}
                . One of them had already spent over a decade running an
                engineering contractor on industrial and infrastructure sites,
                which matters less for the credential than for the instinct:
                people who have been accountable for what happens on a working
                site tend to be sceptical of software demos.
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                That shaped the product more than anything else. Detection had
                to run on the cameras a site already owned, because telling a
                mill owner to replace forty working cameras is not a solution,
                it is an invoice. Processing had to sit on site, because a
                factory in Punjab does not have the uplink to stream forty
                streams to a cloud and should not need one. And an alert had to
                classify what it saw before it fired, because an alert system
                people mute is worse than none &mdash; it costs money and
                provides nothing.
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                None of that is novel. It is simply what the constraint list
                looks like when you write it from the site backwards instead of
                from the software forwards.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- the restraint */}
        <section className="sec bg-bg-2 pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[900px]">
              <div className="mx-auto mb-10 max-w-[680px] text-center">
                <span className="eyebrow eyebrow-center mb-4">
                  The part worth reading
                </span>
                <h2 className="display mt-4 text-[clamp(1.5rem,3vw,2.1rem)]">
                  What we decided not to claim
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                  Anyone can write a founding story. The useful question about a
                  security vendor is what they refuse to say when saying it
                  would sell more. Each of these is visible on this site right
                  now, and each one costs us something.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {RESTRAINT.map((r) => (
                  <div key={r.h} className="card p-7">
                    <h3 className="font-display text-[1.15rem] font-medium leading-snug text-ink">
                      {r.h}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">
                      {r.p}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-[680px] text-center text-[1rem] leading-relaxed text-ink-soft">
                A company that will not overstate its ratings is not thereby
                good at its job. But a company that <em>will</em> overstate them
                has told you something, and you usually find out later.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- today */}
        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[760px]">
              <div className="card p-8 sm:p-10">
                <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  Where it stands
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
                  {BUSINESS.legalName} is a registered private limited company
                  in Ludhiana, incorporated in {BUSINESS.founded}, with its
                  company number on the public record and its founders and chief
                  executive named. It is a young company, and this page would be
                  a poorer one if it pretended otherwise.
                </p>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
                  The honest summary is that the engineering is further along
                  than the paperwork trail behind some of the marketing, and we
                  would rather you knew which was which before you spend
                  anything.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/leadership" className="btn btn-ghost">
                    Who runs the company
                  </Link>
                  <Link href="/free-audit" className="btn btn-primary">
                    Get a free camera audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
