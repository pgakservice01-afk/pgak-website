/**
 * The people behind PGAK — the single source of truth for names, roles and
 * anything the site says about them.
 *
 * WHY THIS FILE EXISTS
 * Roles were previously spread across lib/seo.ts (LEADERSHIP, AUTHOR) and
 * lib/schema.ts (Organization.founder), and they disagreed with reality: the
 * site published Aditya Mittal as "Founder & CEO" and named him as the sole
 * founder in Organization schema, while Puneet Garg and Ankur Kaplesh were
 * listed as Directors. The owner corrected this on 2026-09-24 — Puneet and
 * Ankur founded the company; Aditya is CEO and did not found it. One file now
 * feeds the leadership page, the article byline and every schema block, so the
 * same correction cannot be applied in three places and missed in a fourth.
 *
 * TRUTH RULE (inherited from lib/buyerDecision.ts and lib/industries.ts)
 * This is a trust page about named, real people, which makes it the worst
 * place on the site to guess. Every line in `bio` and `credentials` must be
 * checkable by a reader who follows `source`. No invented job history, no
 * years-of-experience figure nobody published, no achievement without a URL
 * behind it. Where PGAK has not published something about a person, the field
 * stays empty and the page renders less — an empty bio is honest; an invented
 * one is the exact failure this page exists to prevent.
 *
 * ONE COMPANY'S RECORD IS NOT ANOTHER'S
 * Ankur's verifiable public record is with Secured Engineers Pvt. Ltd., a
 * separate MEPF and Solar EPC company he founded in 2011. Those project counts
 * and savings figures belong to that company and are deliberately NOT restated
 * here as PGAK's, because a customer who checks would find PGAK claiming work
 * it did not do. His credentials are presented as his own, with the other
 * company named, which is both true and still worth a reader's confidence.
 */

export type Person = {
  /** Anchor id on /leadership. Not a route — nobody gets their own URL yet. */
  slug: string;
  name: string;
  /** Exact title as the owner approved it on 2026-09-24. */
  role: string;
  /** Founded PGAK. Drives Organization.founder in schema. */
  founder: boolean;
  /** Public profile a reader can check the person against. */
  linkedin?: string;
  /**
   * Short, sourced paragraphs. Empty means PGAK has published nothing
   * checkable about this person yet — the page renders the role and the
   * profile link and stops, rather than padding.
   */
  bio: string[];
  /** Checkable credentials. Each must be supported by `source`. */
  credentials: string[];
  /** Where a reader can verify `bio` and `credentials`. */
  source?: string;
};

export const PEOPLE: Person[] = [
  {
    slug: "puneet-garg",
    name: "Puneet Garg",
    role: "Founder",
    founder: true,
    linkedin: "https://www.linkedin.com/in/puneetgarg-damsun/",
    bio: [],
    credentials: [],
  },
  {
    slug: "ankur-kaplesh",
    name: "Ankur Kaplesh",
    role: "Founder",
    founder: true,
    bio: [
      "An engineer-entrepreneur who founded Secured Engineers Pvt. Ltd. in 2011 and has run it as Founder & CMD since — an ISO 9001:2015-certified MEPF and Solar EPC contractor working in industrial, commercial and infrastructure projects across India.",
      "That is a different company and a different trade from PGAK's, and the work belongs to it rather than here. What it brings to PGAK is fifteen years of being accountable for what happens on a live industrial site — which is the kind of site PGAK's software has to work on.",
    ],
    credentials: [
      "Founder & CMD, Secured Engineers Pvt. Ltd. (since 2011)",
      "15+ years in MEPF and Solar EPC",
      "TEDx speaker",
      "Published author",
    ],
    source: "https://www.securedengineers.com/authors/ankur-kaplesh/",
  },
  {
    slug: "aditya-mittal",
    name: "Aditya Mittal",
    role: "CEO",
    founder: false,
    linkedin: "https://www.linkedin.com/in/adityamittal-pgak/",
    bio: [
      "Leads PGAK as chief executive and is the named author behind the company's published guides — the pricing breakdowns, camera-compatibility explainers and buying checklists on this site carry his byline.",
    ],
    credentials: [],
  },
];

/**
 * The person whose byline appears on every insights article. Exported so the
 * byline link, AUTHOR in lib/seo.ts and this file cannot drift apart — they
 * already had, which is how the site published "Founder & CEO" on 80 articles
 * for someone who did not found the company.
 */
export function bylineAuthor(): Person {
  const person = PEOPLE.find((p) => p.slug === "aditya-mittal");
  if (!person) throw new Error("byline author is missing from PEOPLE");
  return person;
}

/** The leadership page anchor for a person. */
export function personPath(person: Person): string {
  return `/leadership#${person.slug}`;
}

/** The founders, in the order they appear on /leadership. */
export function founders(): Person[] {
  return PEOPLE.filter((p) => p.founder);
}

/**
 * Integrity check, run by the test. Returns a list of problems — empty means
 * every person is safe to publish. It exists because the failure mode here is
 * silent: a credential with no source reads exactly like one with a source.
 */
export function peopleProblems(): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const p of PEOPLE) {
    if (seen.has(p.slug)) problems.push(`duplicate person slug: ${p.slug}`);
    seen.add(p.slug);
    if (!p.name.trim()) problems.push(`${p.slug}: no name`);
    if (!p.role.trim()) problems.push(`${p.slug}: no role`);
    if (p.credentials.length > 0 && !p.source) {
      problems.push(`${p.slug}: lists credentials with no source to check them against`);
    }
    if (p.bio.some((b) => b.trim().length < 40)) {
      problems.push(`${p.slug}: a bio paragraph is too thin to be worth publishing`);
    }
    if (p.linkedin && !p.linkedin.startsWith("https://www.linkedin.com/in/")) {
      problems.push(`${p.slug}: linkedin is not a profile URL`);
    }
  }
  if (founders().length === 0) problems.push("no founders — Organization schema would have none");
  return problems;
}
