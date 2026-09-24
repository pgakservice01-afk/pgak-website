import { NO_APPROVAL, publishable, type Approval } from "./consent.ts";

/**
 * PGAK's own work, as shown on the homepage.
 *
 * WHAT MAY GO IN HERE
 * Only material PGAK recorded on a real site, with the conditions it was
 * recorded under. No stock photography dressed as our project, no AI-generated
 * scene, no third-party reference footage, and no screenshot of someone else's
 * interface. The three records below are the site's existing original material,
 * already published elsewhere on www.pgak.co.in with the same wording.
 *
 * WHY EACH ENTRY CARRIES `limits`
 * A photograph without its circumstances proves more than it should. A plate
 * read at 1.5 metres in daylight says nothing about a plate at roof height at
 * night, and a counting line on a dock camera is not an inventory system. The
 * conditions and the limits travel with the asset so a card cannot be lifted
 * into a deck and quietly become a stronger claim than it is.
 *
 * `customer` is deliberately absent from all three. These show PGAK's own
 * equipment and configuration on client premises, published by the owner with
 * third-party identifiers blurred — they are not client endorsements and must
 * never be captioned with a client's name unless that client has approved it
 * through lib/proof/consent.ts like a testimonial would be.
 */

export type ProjectMedia =
  | { kind: "video"; src: string; poster: string; durationSeconds: number }
  | { kind: "image"; src: string; width: number; height: number };

export type Project = {
  id: string;
  /** What the work was, not what it achieved. */
  title: string;
  /** Sector, kept generic unless the client has approved being named. */
  category: string;
  /** City or region. "" when naming it would identify an unconsenting site. */
  place: string;
  scope: string;
  description: string;
  /** The conditions the material was captured under. Never optional. */
  conditions: string;
  /** What this does NOT prove. Never optional. */
  limits: string;
  media: ProjectMedia;
  /** Alt text. Describes what is visible, claims nothing extra. */
  alt: string;
  /** Where a reader can check the same material in more depth. */
  href: string;
  approval: Approval;
};

/**
 * Approval for material PGAK owns and has already published itself.
 *
 * This is a different thing from a customer testimonial and it is worth being
 * precise about which: the owner controls this footage and chose to publish it,
 * so the approver is the owner. It is NOT a statement that the site's operator
 * endorsed PGAK, and nothing rendered from these records may imply that.
 */
const OWNER_PUBLISHED = (page: string): Approval => ({
  status: "approved_for_publication",
  approvedOn: "2026-09-24",
  approverName: "Ankur Kaplesh (PGAK)",
  source: `Already published by PGAK at ${page} with the same conditions text; PGAK-owned material, third-party identifiers blurred.`,
  portraitPermission: false,
  logoPermission: false,
  sitePhotoPermission: true,
});

export const PROJECTS: Project[] = [
  {
    id: "ppe-assembly-line",
    title: "PPE check on an existing line camera",
    category: "Manufacturing — vehicle chassis line",
    place: "",
    scope: "Analytics configured on a camera already fitted above the line",
    description:
      "Bare hands are flagged on an assembly line. The box is drawn on the hand rather than the person, and the figure beside each label is the model's confidence — two workers are flagged here, at 0.75 and 0.27. The low one is left in deliberately: that is the sort of detection a supervisor should be checking, not one a system should act on by itself.",
    conditions:
      "Recorded 1 April 2025 on an existing overhead line camera. No camera was added for this.",
    limits:
      "Gloves are one PPE class. Which classes apply to a site is confirmed at the assessment before anything is quoted.",
    media: {
      kind: "video",
      src: "/proof/ppe-gloves.mp4",
      poster: "/proof/ppe-gloves-poster.webp",
      durationSeconds: 14,
    },
    alt: "Assembly line camera view with detection boxes drawn on workers' hands and a confidence figure beside each label",
    href: "/video-analytics-software",
    approval: OWNER_PUBLISHED("/ (homepage) and /video-analytics-software"),
  },
  {
    id: "dock-count",
    title: "Sacks counted across a line at a loading bay",
    category: "Warehouse — loading bay",
    place: "",
    scope: "One counting line configured on an existing dock camera",
    description:
      "An evening unload. Each sack crossing the line is detected, given a tracking number so the same one is not counted twice, and added to a running total — the count climbs from four to seven while you watch.",
    conditions:
      "Recorded 19 December 2022 on an existing dock camera with a single counting line. The transport company's name and telephone numbers are blurred throughout; they belong to a third party.",
    limits:
      "It counts a known item type across a line. It is not an inventory system and does not reconcile against a ledger.",
    media: {
      kind: "video",
      src: "/proof/dock-count.mp4",
      poster: "/proof/dock-count.webp",
      durationSeconds: 16,
    },
    alt: "Loading bay camera view at night with sacks being detected as they cross a counting line and a running total increasing",
    href: "/ai-cctv-for-warehouses",
    approval: OWNER_PUBLISHED("/ (homepage)"),
  },
  {
    id: "anpr-gate",
    title: "Plate reading fitted to an existing gate pillar",
    category: "Commercial site — vehicle gate",
    place: "",
    scope: "Camera mounted on the existing pillar; operator console at the gate",
    description:
      "The camera as actually fitted to a gate pillar, and the console the gate operator works from. Two photographs rather than a rendering, because where a plate camera ends up sitting is most of whether it reads anything.",
    conditions:
      "Photographed on site. Mounted at roughly 1.5 metres in daylight — a plate read at that height and that light says nothing about a plate at roof height at night.",
    limits:
      "Mounting height, approach angle and lighting decide plate accuracy far more than the software does. Both are checked at the assessment.",
    media: {
      kind: "image",
      src: "/proof/anpr-camera-mount.webp",
      width: 1600,
      height: 1000,
    },
    alt: "ANPR camera mounted on a gate pillar at a commercial site entrance",
    href: "/anpr-number-plate-recognition",
    approval: OWNER_PUBLISHED("/anpr-number-plate-recognition"),
  },
];

/** The only accessor the site may render from. */
export function publishedProjects(): Project[] {
  return publishable(PROJECTS);
}

/**
 * Whether the gallery may render.
 *
 * Brief: "If real project media is not available, hide the public gallery."
 * One real card is worth showing — unlike a testimonial, a single piece of our
 * own footage does not read as the only customer willing to speak.
 */
export function projectsReady(): boolean {
  return publishedProjects().length >= 1;
}

export { NO_APPROVAL };
