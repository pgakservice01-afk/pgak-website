import Image from "next/image";

import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import ProofVideo from "@/components/ProofVideo";
import { pageMeta } from "@/lib/seo";
import { EVIDENCE_DATE } from "@/lib/b2b/claims";
import { publishedProjects } from "@/lib/proof/projects";
import { DEMO_TASKS, guideFor } from "@/lib/proof/demo-guide";
import DemoTaskFilter from "@/components/tools/DemoTaskFilter";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

/**
 * When each clip was first published on www.pgak.co.in: the date its file was
 * added to the repository (git log --diff-filter=A on public/proof/*.mp4).
 * That is an upload date, not a recording date; the recording conditions stay
 * in each record's `conditions` text.
 */
const UPLOADED: Record<string, string> = {
  "/proof/ppe-gloves.mp4": "2026-09-24",
  "/proof/dock-count.mp4": "2026-09-24",
  "/proof/hot-work.mp4": "2026-09-27",
};

export const metadata = pageMeta({
  title: "PGAK demonstrations you can inspect | PGAK",
  description:
    "PGAK's own recorded demonstrations, each with its date, conditions and limits, and what a demonstration does not prove about results at your site.",
  path: "/resources/evidence",
});

/**
 * Renders from lib/proof/projects.ts only — the one registry that carries an
 * approval, conditions and limits for each piece of PGAK material — so this
 * page cannot drift from the homepage, the feature pages or the register.
 */
export default function Page() {
  const projects = publishedProjects();
  // VideoObject for each published clip, built from the same records the page
  // renders, so the markup cannot say more than the visible card does.
  const videos = projects.flatMap((p) =>
    p.media.kind === "video" && UPLOADED[p.media.src]
      ? [
          {
            "@type": "VideoObject",
            "@id": `${SITE_URL}/resources/evidence#video-${p.id}`,
            name: p.title,
            description: `${p.description} Limits: ${p.limits}`,
            thumbnailUrl: `${SITE_URL}${p.media.poster}`,
            contentUrl: `${SITE_URL}${p.media.src}`,
            uploadDate: UPLOADED[p.media.src],
            duration: `PT${p.media.durationSeconds}S`,
          },
        ]
      : [],
  );
  return (
    <BuyerPage
      title="PGAK demonstrations you can inspect"
      intro="Choose a task and watch what PGAK has recorded working — each with when and where it was captured and what it does not prove. A demonstration is not a measured customer result."
      path="/resources/evidence"
      eyebrow="EVIDENCE"
    >
      {videos.length > 0 && <JsonLd nodes={videos} id="evidence-videos" />}
      <section>
        <div className="evidence-meta">
          <span>Evidence status</span>
          <span>Reviewed {EVIDENCE_DATE}</span>
        </div>
        <h2>PGAK&rsquo;s own recorded demonstrations</h2>
        <p>
          {projects.length} pieces of PGAK material are published, each with
          the conditions it was captured under and what it does not prove. They
          show a function running on a stated scene. None is an accuracy
          measurement, and none is presented as a customer&rsquo;s endorsement.
        </p>
        <p>
          No customer result or measured accuracy report is published yet, and
          the deployment scenarios elsewhere on the site are illustrations, not
          verified deployments.
        </p>
        <DemoTaskFilter tasks={DEMO_TASKS} />
      </section>
      {projects.map((p) => (
        <section key={p.id} id={`evidence-${p.id}`} data-demo-task={guideFor(p.id)?.task}>
          <div className="evidence-meta">
            <span>{p.category}</span>
            <span>{p.scope}</span>
          </div>
          <h2>{p.title}</h2>
          <div style={{ marginTop: "1rem" }}>
            {p.media.kind === "video" ? (
              <ProofVideo
                src={p.media.src}
                poster={p.media.poster}
                title={p.title}
                caption={p.description}
                durationSeconds={p.media.durationSeconds}
              />
            ) : (
              <figure>
                <Image
                  src={p.media.src}
                  alt={p.alt}
                  width={p.media.width}
                  height={p.media.height}
                  sizes="(max-width: 800px) 100vw, 760px"
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption className="mt-2 text-[0.9rem] text-ink-soft">{p.description}</figcaption>
              </figure>
            )}
          </div>
          {guideFor(p.id) && (
            <p className="mt-4">
              <strong>What to watch:</strong> {guideFor(p.id)!.watch}
            </p>
          )}
          <dl className="mt-4">
            {guideFor(p.id) && (
              <>
                <dt className="font-semibold">What it shows</dt>
                <dd className="mb-3">{guideFor(p.id)!.shows}</dd>
              </>
            )}
            <dt className="font-semibold">Conditions</dt>
            <dd className="mb-3">{p.conditions}</dd>
            <dt className="font-semibold">What it does not prove</dt>
            <dd className="mb-3">{p.limits}</dd>
          </dl>
          <div className="action-row">
            {guideFor(p.id) && (
              <>
                <a href={guideFor(p.id)!.next.href} className="btn btn-primary" data-cta={`demo-${p.id}-next`}>
                  {guideFor(p.id)!.next.label} →
                </a>
                <a href={guideFor(p.id)!.calculator.href} className="text-link">
                  {guideFor(p.id)!.calculator.label}
                </a>
              </>
            )}
            <a href={p.href} className="text-link">
              Where this is discussed →
            </a>
          </div>
        </section>
      ))}
      <section>
        <h2>What a useful demonstration should establish</h2>
        <ul className="buyer-list">
          <li>
            The supported function and exact software/processing configuration.
          </li>
          <li>
            The source of the scene: customer deployment, permissioned lab test
            or illustration.
          </li>
          <li>
            Camera/firmware settings, site conditions and relevant constraints.
          </li>
          <li>
            What the operator sees, the evidence format, recipient and handling
            process.
          </li>
          <li>
            False alerts, missed events and failures, with a denominator and
            test method for any measurement.
          </li>
        </ul>
        <a href="/resources/evaluation-method" className="text-link">
          Use the test worksheet →
        </a>
      </section>
      <section>
        <h2>Illustrative deployment scenarios</h2>
        <p>
          The scenarios explain a possible approach. They are illustrations,
          separate from the recordings above and from any customer result.
        </p>
        <a href="/insights/case-studies" className="text-link">
          Read labelled scenarios →
        </a>
      </section>
      <BuyerCTA label="Request a product demonstration" href="/book-demo" />
    </BuyerPage>
  );
}
