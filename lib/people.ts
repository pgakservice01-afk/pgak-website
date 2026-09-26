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
 * The founders' public records belong to their other companies — Ankur's to
 * Secured Engineers Pvt. Ltd. (MEPF and Solar EPC, founded 2011). On 2026-09-27
 * the owner asked that the other companies not appear on PGAK's own pages, so
 * Ankur's bio and credentials were removed rather than kept with that company
 * named. Whatever goes back must describe the person, still follow the truth
 * rule above, and never restate another company's work as PGAK's.
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
  /**
   * Headshot under /public/team. All three were treated the same way —
   * greyscale, edges falling to black — so three photographs taken in three
   * different rooms read as one set. The treatment is a crop and a vignette
   * done locally with sharp: no face was regenerated or retouched by a model,
   * because an AI-altered photograph of a real person is not that person, and
   * this is the page that asks a stranger to trust us.
   */
  photo?: string;
};

export const PEOPLE: Person[] = [
  {
    slug: "puneet-garg",
    name: "Puneet Garg",
    role: "Founder",
    founder: true,
    linkedin: "https://www.linkedin.com/in/puneetgarg-damsun/",
    photo: "/team/puneet-garg.webp",
    // Person-focused at the owner's request (2026-09-27): what he has built,
    // not the name of the company he built it at. Every figure is from his
    // public LinkedIn headline (the `source`); the project count is left out
    // because public copies of it disagree (10,261+ and 10,661+).
    bio: [
      "Puneet Garg founded and leads a manufacturing group in doors, windows, façades and outdoor furniture that now works across 28 Indian states and five countries, with four factories and more than 600 people.",
      "He brings PGAK the view of an owner who runs factories and large project sites every day — the kind of site PGAK's cameras and alerts are built for.",
    ],
    credentials: [
      "Founder & CMD of a manufacturing group",
      "28 states · 5 countries · 600+ people",
      "Published author",
    ],
    source: "https://www.linkedin.com/in/puneetgarg-damsun/",
  },
  {
    slug: "ankur-kaplesh",
    name: "Ankur Kaplesh",
    role: "Founder",
    founder: true,
    photo: "/team/ankur-kaplesh.webp",
    // Secured Engineers bio and credentials removed at the owner's request
    // (2026-09-27) — see "ONE COMPANY'S RECORD IS NOT ANOTHER'S" above.
    bio: [],
    credentials: [],
  },
  {
    slug: "aditya-mittal",
    name: "Aditya Mittal",
    role: "CEO",
    founder: false,
    linkedin: "https://www.linkedin.com/in/adityamittal-pgak/",
    photo: "/team/aditya-mittal.webp",
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
