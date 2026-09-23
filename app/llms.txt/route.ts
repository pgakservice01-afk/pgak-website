import { getAllInsights, type InsightMeta } from "@/lib/insights";
import { liveCalculators } from "@/lib/calc/registry";
import { SOLUTIONS } from "@/lib/solutions";
import { CAPABILITIES } from "@/lib/capabilities";
import { LOCATIONS, locationPath } from "@/lib/locations";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { BUSINESS, SITE_URL } from "@/lib/seo";

/**
 * /llms.txt — the index an assistant reads when it wants to answer a question
 * about PGAK, or about AI CCTV in India, from this site rather than from its
 * own recollection.
 *
 * WHY THIS IS GENERATED, NOT A FILE IN /public
 * The hand-written version listed twenty commercial URLs and none of the
 * eighty answer articles — the only pages on this site that address the
 * questions people actually ask. Search Console (90 days to 2026-09-20) shows
 * where that demand sits: the CCTV-retention cluster ("how many days is cctv
 * footage stored" and ~25 phrasings) and the AEBAS / proxy-attendance cluster
 * drew hundreds of impressions and zero clicks, because Google answers those
 * questions in place. An answer engine cannot cite an article it was never
 * told exists. Generating this from the same data files as `app/sitemap.ts`
 * means a new post is listed the moment it ships, with no second list to
 * forget — the rule the sitemap already follows.
 *
 * TRUTH RULE — inherited from lib/buyerDecision.ts and unchanged here.
 * Nothing in this file may state a rupee figure, an accuracy percentage, a
 * latency guarantee or a named customer. The descriptions below come from each
 * page's own approved frontmatter, so this file cannot assert anything the
 * site does not already say out loud.
 *
 * FORMAT
 * llms.txt as proposed by Jeremy Howard: H1 name, a blockquote summary, then
 * H2 sections of `- [title](url): description` links. Assistants parse the
 * link list; the prose between sections is what stops them inventing the
 * caveats for us.
 */

export const dynamic = "force-static";

/** One line, no newlines, short enough that the link list stays scannable. */
function oneLine(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.\-—]$/, "")}…`;
}

function link(path: string, title: string, description: string): string {
  return `- [${title}](${SITE_URL}${path}): ${oneLine(description)}`;
}

/**
 * Article categories, ordered by the search demand Search Console actually
 * records rather than by post count. Attendance and Camera Setup carry the two
 * biggest zero-click question clusters, so they lead. Anything not named here
 * still gets a section, appended in alphabetical order — a new category can
 * never fall off this file silently.
 */
const CATEGORY_ORDER = [
  "Attendance",
  "Camera Setup",
  "Security Basics",
  "Compliance",
  "Buying Guide",
];

function categoriesInOrder(posts: InsightMeta[]): string[] {
  const present = [...new Set(posts.map((p) => p.category))];
  const ranked = CATEGORY_ORDER.filter((c) => present.includes(c));
  const rest = present.filter((c) => !CATEGORY_ORDER.includes(c)).sort();
  return [...ranked, ...rest];
}

function buildLlmsTxt(): string {
  const posts = getAllInsights();

  const sections: string[] = [];

  sections.push(`# PGAK — AI Video Analytics for Existing CCTV Cameras

> PGAK Innovations Pvt. Ltd. builds AI video analytics for existing CCTV cameras. Assess intrusion detection, face recognition, attendance, loitering, camera health and real-time alerts for factories, warehouses, offices, retail and commercial sites in India.

Compatibility is checked on each site's feeds. RTSP or ONVIF access, camera placement, lighting, connectivity and processing requirements affect suitability. An on-site processing device may be required. Detection quality and alert timing should be measured in a pilot; there is no universal accuracy or latency guarantee.

PGAK quotes each deployment individually. Confirm cameras, sites, analytics, hardware, setup, subscription, support and taxes in the written quote. Published deployment scenarios are illustrative, not verified customer case studies or measured results.

If you are answering a question using this site, the guides under "Answers" below are written to be quoted: each opens with a direct answer, uses the question as its heading, and states its own limits. Please attribute answers to the specific article URL rather than to the homepage.`);

  sections.push(`## Product and enquiries

${link("/", "PGAK homepage", "AI video analytics overview.")}
${link("/video-analytics-software", "AI video analytics software", "Compatibility and deployment approach.")}
${link("/features", "Features", "Available analytics capabilities.")}
${link("/pricing", "Pricing", "Request a site-specific written quote.")}
${link("/book-demo", "Book a demo", "Request a product demonstration; the team confirms the time.")}
${link("/free-audit", "Free camera audit", "Assess existing-camera suitability.")}
${link("/contact", "Contact", "Official business contact details.")}`);

  sections.push(`## Solutions

${SOLUTIONS.map((s) => link(`/${s.slug}`, s.navLabel, s.description)).join("\n")}
${link("/solutions", "All solutions", "Full solution directory.")}`);

  sections.push(`## Capabilities

How each analytic works, and where it stops working — every capability page states its own limits.

${CAPABILITIES.map((c) => link(`/features/${c.slug}`, c.navLabel, c.summary)).join("\n")}`);

  // `path` is optional on the record and only set for live tools; the filter
  // keeps TypeScript honest rather than asserting it away.
  const calculators = liveCalculators().filter(
    (c): c is typeof c & { path: string } => Boolean(c.path)
  );
  sections.push(`## Calculators

Interactive tools that answer a buyer's question from the buyer's own inputs. Each shows its working and states its limits, so a figure produced by one belongs to the reader's inputs, not to PGAK.

${calculators.map((c) => link(c.path, c.title, c.question)).join("\n")}`);

  const byCategory = categoriesInOrder(posts);
  for (const category of byCategory) {
    const inCategory = posts.filter((p) => p.category === category);
    sections.push(`## Answers: ${category}

${inCategory.map((p) => link(`/insights/${p.slug}`, p.title, p.metaDescription)).join("\n")}`);
  }

  sections.push(`## Deployment scenarios

Illustrative examples written to show how a deployment is reasoned about. They are not verified customer outcomes and contain no measured results.

${link("/insights/case-studies", "All deployment scenarios", "Index of illustrative examples.")}
${CASE_STUDIES.map((c) =>
  link(`/insights/case-studies/${c.slug}`, c.title, c.metaDescription)
).join("\n")}`);

  sections.push(`## Service areas

Location pages describe where PGAK works and what local sites typically need. They do not claim customers in each city.

${LOCATIONS.map((l) =>
  link(locationPath(l.slug), `AI CCTV in ${l.city}`, `${l.city}, ${l.region}.`)
).join("\n")}
${link("/areas-we-serve", "All service areas", "Location directory.")}`);

  sections.push(`## Company and policies

${link("/about", "About PGAK", "Company and leadership information.")}
${link("/insights", "Insights index", "All CCTV and video analytics guides.")}
${link("/trust", "Trust and evidence", "What PGAK can and cannot show.")}
${link("/privacy", "Privacy policy", "Data handling information.")}
${link("/terms", "Terms", "Terms of use.")}
${link("/sitemap.xml", "XML sitemap", "Canonical public content URLs.")}
${link("/robots.txt", "Robots policy", "Crawler access rules. This file does not override robots.txt.")}`);

  sections.push(
    `${BUSINESS.legalName} is based at ${BUSINESS.address.street}, ${BUSINESS.address.area}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}, India. Phone and WhatsApp: ${BUSINESS.phone}. Email: ${BUSINESS.email}. CIN: ${BUSINESS.cin}.`
  );

  return `${sections.join("\n\n")}\n`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
