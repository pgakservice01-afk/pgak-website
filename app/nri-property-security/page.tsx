import type { Metadata } from "next";
import Link from "next/link";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GuardCostCompare from "@/components/sections/GuardCostCompare";
import NriTracking from "@/components/nri/NriTracking";
import NriWhatsApp from "@/components/nri/NriWhatsApp";
import NriFaq, { type NriQa } from "@/components/nri/NriFaq";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { pageMeta, BUSINESS } from "@/lib/seo";
import { HARDWARE_NOTE_LONG } from "@/lib/offer";

/**
 * /nri-property-security — one page for Punjabi families abroad who own
 * property here.
 *
 * ── Two places this page deliberately departs from the brief it was built
 *    from (PGAK Master Prompt: NRI Property Security Page, 1 Oct 2026) ──
 *
 * 1. NO PRICE. The brief specifies ₹1,000/camera/month in the meta
 *    description, a pricing section with a worked four-camera example, and an
 *    `offers` node in the Service schema. The owner's standing rule since
 *    31 Aug 2026 is that no PGAK rate appears on any public surface — that
 *    figure specifically was unpublished then — and the rule names structured
 *    data as a public surface. Confirmed with the owner on 1 Oct 2026: the
 *    standing rule wins. Section 7 is therefore "what decides your price"
 *    plus GuardCostCompare, which asks the visitor for the rate they were
 *    quoted rather than printing one. Do not add a figure here without the
 *    owner reversing that rule, and if it is ever reversed, /pricing and
 *    lib/faq.ts have to change in the same commit or the site contradicts
 *    itself.
 *
 * 2. NOT "NO NEW HARDWARE". The brief's product facts and its trust strip both
 *    say new hardware is never needed. lib/offer.ts exists because that is not
 *    reliably true — detection runs on an on-site processing unit — and it
 *    requires copy to say so. An absolute promise is worse here than anywhere
 *    else on the site: the buyer is 7,000 km away and cannot look at the
 *    cabinet, so the correction lands at install, after trust is spent. This
 *    page uses HARDWARE_NOTE_LONG and says "works with the cameras you already
 *    have", which is the substantiated version of the same selling point.
 *
 * ── Sections dropped from the brief, with reasons ──
 * Section 6 "Parents living alone" and the fall-detection keyword block: cut.
 * PGAK has no fall or no-movement detection (capability set: person/face
 * recognition, intrusion, loitering, false-alarm filtering, ANPR, attendance).
 * The brief's own instruction for a "no" on its [CONFIRM] #2 is to leave the
 * section out and cover the topic in a blog post. A parents' home remains in
 * Section 5 as a property type, described only in terms of what PGAK does.
 * Section 12 "Testimonials": cut. There are no NRI customers to quote, and the
 * brief forbids inventing them.
 *
 * ── Alerts are APP notifications, not WhatsApp messages ──
 * Owner's instruction, 1 Oct 2026. WhatsApp remains the enquiry and support
 * channel throughout — every CTA on this page still opens a WhatsApp thread —
 * but the product's alerts arrive in the PGAK app. Keep that split: it is the
 * difference between how a customer reaches us and how the cameras reach them.
 *
 * This also retires the brief's [CONFIRM] #3 ("do WhatsApp alerts work to +1,
 * +44, +61 numbers?"). An app notification does not route over a mobile
 * network, so the country of the SIM stops being a question — which for this
 * audience is a better answer than a yes would have been, and the page now
 * says so.
 *
 * ── Still unconfirmed (do not harden this copy until the owner answers) ──
 * [CONFIRM] #1, 4G/SIM cameras at village houses and farmhouses. Written as
 * "what the remote check establishes" rather than as a capability; the exact
 * lines are marked CONFIRM-1 below. If it comes back no, the honest version is
 * already what is on the page.
 *
 * Also unverified by this session: which app stores the PGAK app is actually
 * live on. The page says "the PGAK app" and never names iOS or Android, which
 * is true either way — but if an NRI on an iPhone cannot install it today,
 * that needs saying before this page is promoted.
 *
 * ── Ground support ──
 * Section 11 does not name a Doaba partner, because as of 1 Oct 2026 none of
 * the 15 registered dealers is in Doaba — the belt this page targets. The
 * owner's decision (1 Oct) is to publish for all of Doaba and recruit in
 * parallel, so the section describes the three ways physical work actually
 * gets done and invites the reader to ask what covers their district. Update
 * it, do not soften it, when a Doaba partner signs.
 */

const PATH = "/nri-property-security";

export const metadata: Metadata = pageMeta({
  title: "NRI Property Security Punjab | Watch Your Kothi From Abroad",
  description:
    "Empty kothi, farmhouse or plot in Punjab? PGAK turns the CCTV you already have into an AI guard that alerts your phone, wherever in the world you live.",
  path: PATH,
  // Its own card rather than the sitewide one: this page is shared into
  // Punjabi family WhatsApp groups and Facebook groups in Brampton and
  // Southall, where the preview image is most of the click decision.
  // Rendered at exactly 1200x630 — see docs/nri-property-security.md.
  image: "/og-nri-property-security.webp",
  keywords: [
    "nri property protection in india",
    "nri property monitoring india",
    "nri property security",
    "nri property care",
    "nri house caretaker",
    "empty house security",
    "vacant house security",
    "how to protect nri property in india",
    "nri services punjab",
    "cctv camera jalandhar",
    "cctv camera hoshiarpur",
    "cctv camera kapurthala",
    "cctv camera phagwara",
    "cctv camera nawanshahr",
    "farmhouse cctv camera",
    "cctv camera for plot",
    "4g cctv camera with sim card",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "NRI property security", path: PATH },
];

/** The one message every WhatsApp CTA on this page opens with. */
const WA_MESSAGE =
  "Hi PGAK, I'm an NRI and want to secure my property in Punjab.";

/* ── Section 2: the problem ───────────────────────────────────────────────── */
const PROBLEMS = [
  {
    title: "A locked kothi is a known address",
    body: "A house that is dark every night, with no car in the gate and no lights on a festival, is readable from the street. The camera on the wall records whoever works that out. Nobody is watching it at 3am.",
  },
  {
    title: "Possession and encroachment",
    body: "A boundary wall moved, a shed built on a corner of the plot, a tenant who stops leaving. These do not happen in one night — they happen slowly, and they are cheapest to deal with in the first week, not the first year.",
  },
  {
    title: "Caretakers you cannot check on",
    body: "Most caretakers are honest. The problem is not dishonesty, it is verification: you are relying on a photo sent when someone chose to send it, and you have no way to know who came to the gate on a day nobody mentioned.",
  },
  {
    title: "Cameras that record but nobody watches",
    body: "This is the real gap. The footage usually exists. It gets looked at after a neighbour phones — days later, when the only thing left to do is file a report. The recording was never the missing piece. Knowing in time was.",
  },
];

/* ── Section 3: how it works ──────────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Connect the cameras already on the wall",
    body: "PGAK is analytics software on a processing unit at the property. It reads the streams from the DVR or NVR at your property over its internet connection, so the work starts with what is already installed rather than with a purchase.",
  },
  {
    n: "02",
    title: "Say what should count as unusual",
    body: "A person at the gate after 10pm. Someone at the back door at all. A vehicle in the driveway when the house is meant to be empty. Your family and your caretaker are enrolled once, so the system stops reporting them and reports everyone else.",
  },
  {
    n: "03",
    title: "Get an alert on your phone, with a photo",
    body: "The alert arrives in the PGAK app: the snapshot, which camera it came from and the time, so you can decide in ten seconds whether to call your cousin in the village or ignore it. Because it is an app notification rather than an SMS or a call, it reaches you the same way in Brampton as it would in Jalandhar — it does not depend on you keeping an Indian number alive.",
  },
];

/* ── Section 5: property types ────────────────────────────────────────────── */
const PROPERTIES = [
  {
    title: "The empty kothi",
    body: "Months of nobody there, then three weeks of a full house. The rules can follow that: strict while the house is shut, relaxed when the family lands.",
  },
  {
    title: "Farmhouse and tubewell",
    body: "Motors, cable, panels and pipe, usually out of sight of any neighbour. Theft here is quiet and repeat — the same place gets visited twice because the first visit went unnoticed.",
  },
  {
    title: "Plot or agricultural land",
    body: "Nothing to steal, everything to lose. What matters on a vacant plot is a record of who came, what was unloaded and when a wall started moving.",
  },
  {
    title: "A rented house",
    body: "Common areas, the gate and the boundary — so you know the property is being lived in as agreed. Cameras inside a tenant's home are not something we will help you set up; the law and the tenancy both say that space is theirs.",
  },
  {
    title: "Your parents' home",
    body: "Here the point is usually the gate, not the people inside. Who rang the bell, which delivery actually arrived, whether the maid came on the day she said. Enrolled faces mean you are not pinged every time your own mother walks to the gate.",
  },
];

/* ── Section 8: comparison ────────────────────────────────────────────────── */
const COMPARISON: { q: string; normal: string; pgak: string }[] = [
  {
    q: "Who watches the footage",
    normal: "Nobody, in practice. The recorder fills up and overwrites itself.",
    pgak: "Software checks every frame on every camera and only involves you when a rule you set is broken.",
  },
  {
    q: "When you find out",
    normal: "After someone tells you — a neighbour, a caretaker, or the damage itself.",
    pgak: "While it is happening, as an alert on your phone with a snapshot attached.",
  },
  {
    q: "False alarms",
    normal: "Motion alerts on wind, shadows, cats and headlights. Most people switch them off within a week.",
    pgak: "Moving objects are classified before anything is sent, and your own family and staff are enrolled so they stop being reported.",
  },
  {
    q: "What you can do about it",
    normal: "Export a clip and file a complaint.",
    pgak: "Make a phone call while the person is still at the gate, with a photo you can forward to whoever goes to look.",
  },
];

/* ── Section 9: Punjab coverage ───────────────────────────────────────────── */
/**
 * Doaba first — Jalandhar, Hoshiarpur, Kapurthala, Phagwara and Nawanshahr are
 * where NRI-owned property is concentrated, which is why the page exists.
 * `href` only where a city page genuinely exists: a link to a page we have not
 * built is a 404 in the one section a reader checks for their own district.
 * Kapurthala, Phagwara and Nawanshahr have no page yet (see the handover note
 * in docs/nri-property-security.md).
 */
const PUNJAB_AREAS: { name: string; href?: string; note: string }[] = [
  { name: "Jalandhar", href: "/ai-cctv-jalandhar", note: "Doaba" },
  { name: "Hoshiarpur", href: "/ai-cctv-hoshiarpur", note: "Doaba" },
  { name: "Kapurthala", note: "Doaba" },
  { name: "Phagwara", note: "Doaba" },
  { name: "Nawanshahr (SBS Nagar)", note: "Doaba" },
  { name: "Moga", href: "/ai-cctv-moga", note: "Malwa" },
  { name: "Ludhiana", href: "/ai-cctv-ludhiana", note: "Malwa" },
  { name: "Amritsar", href: "/ai-cctv-amritsar", note: "Majha" },
  { name: "Patiala", href: "/ai-cctv-patiala", note: "Malwa" },
  { name: "Bathinda", href: "/ai-cctv-bathinda", note: "Malwa" },
  { name: "Mohali", href: "/ai-cctv-chandigarh-mohali", note: "Malwa" },
];

/* ── Section 10: where the families are ───────────────────────────────────── */
const ABROAD = [
  { country: "Canada", places: "Brampton, Surrey, Calgary" },
  { country: "United Kingdom", places: "Southall, Birmingham, Wolverhampton" },
  { country: "United States", places: "California, New York, New Jersey" },
  { country: "Australia", places: "Melbourne, Sydney" },
  { country: "New Zealand", places: "Auckland" },
  { country: "Italy", places: "Reggio Emilia, Brescia" },
];

/* ── Section 13: FAQ. One array feeds the accordion and the FAQPage JSON-LD ── */
const FAQS: NriQa[] = [
  {
    q: "How do I protect my NRI property in India?",
    a: "Start with what is already there. Most NRI-owned houses in Punjab already have CCTV; what they do not have is anyone watching it. PGAK connects to the cameras and recorder you already own and turns them into something that contacts you — an alert on your phone, with a photo, when a person is at the gate at an hour you said was unusual. Alongside that, the ordinary things still matter: papers in order, mutation records current, a trusted person who visits, and a boundary you can show was in one place on a particular date.",
  },
  {
    q: "Can I watch my Punjab house CCTV from Canada or the UK on my mobile?",
    a: "Yes. You get live view in the PGAK app on your phone, the same as you would standing in the house. But the part that actually matters is the other direction: instead of you remembering to open an app and look, the app contacts you when something you told it to care about happens. Most people check live view constantly in the first month and almost never after that, which is exactly why the alert matters more than the access. Because it arrives as an app notification, it reaches you on your Canadian, British or Australian number just as it would on an Indian one.",
  },
  {
    q: "Can CCTV work without Wi-Fi at my village house or farmhouse?",
    // CONFIRM-1 — 4G/SIM at village houses and farmhouses is not yet confirmed
    // by the owner. This answer states the requirement (a working uplink with
    // enough upload headroom) and routes the specific case to the free remote
    // check, which is true whatever the answer turns out to be. Harden it only
    // once the owner confirms a tested 4G configuration.
    a: "The cameras need some way to reach the internet, and at a village house or farmhouse that is usually a 4G router or a SIM camera rather than a fixed broadband line. Whether a particular setup carries enough upload speed, steadily enough, is the part that decides it — and it depends on the signal at that spot, the number of cameras and how the recorder is configured. That is precisely what the free remote security check is for: send us a photo of the recorder and tell us where the property is, and we will tell you whether your connection is enough before you spend anything.",
  },
  {
    q: "How much does CCTV monitoring cost?",
    a: "Billing is per camera per month, and we quote your exact rate on a call or on WhatsApp once we know how many cameras you want covered and whether it is one property or several. We do not print a rate on the website, because the honest number depends on your camera count and what the site needs — and a figure on a page is the one thing nobody can give you a straight answer about later. Setup, any on-site processing hardware, support and taxes are itemised in writing before you commit.",
  },
  {
    q: "What is AI CCTV, and how is it different from normal CCTV?",
    a: "Normal CCTV records. If something happens, the footage is there to look at afterwards. AI CCTV also looks at the footage as it arrives, and decides whether what it is seeing is a person, a vehicle or just wind in a tree. That one difference changes what the system is for: a recorder is evidence after the event, and alerts are a chance to do something during it. It is the same cameras either way — what changes is whether anything is paying attention between your visits.",
  },
  {
    q: "Who installs or repairs cameras if I am not in India?",
    a: "Connecting PGAK does not usually need anyone at the property, because it is software reading streams from the recorder that is already installed. Physical work is different, and we will not pretend otherwise: a camera that needs re-aiming or a power supply that has died needs a person standing in front of it. In practice that is the installer who originally fitted your system, a PGAK partner where one covers your district, or a family member or caretaker working through it with us on a video call. We are adding partners across Doaba — ask us what covers your district today and we will tell you plainly, including when the answer is nobody yet.",
  },
  {
    q: "Will I get false alarms from animals or wind?",
    a: "Far fewer than with the motion alerts built into most recorders, because moving objects are classified before anything is sent to you — a dog crossing the yard and a person climbing the gate are not the same event. You also enrol the faces of family, staff and your caretaker once, after which they stop being reported. No system is perfect, and the right way to find out what yours will do is to watch it on your own footage for a couple of weeks and tune the zones and hours before you rely on it.",
  },
  {
    q: "Is CCTV monitoring legal in India?",
    a: "Recording your own property is lawful, and so is being alerted about it. The limits are about other people. Cameras covering the inside of a tenant's home, or a space a caretaker would reasonably treat as private, are not something we will help you set up. Tell the people who live and work at the property that cameras are there and what they cover — it is both the decent thing and what India's Digital Personal Data Protection Act points towards, since the footage is personal data about identifiable people. This is a general explanation, not legal advice; for a dispute over possession or a Power of Attorney, use a property lawyer in the district.",
  },
];

export default function NriPropertySecurityPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "NRI property security in Punjab",
            description:
              "Turn the CCTV already installed at your Punjab property into an AI guard that sends an alert with a snapshot to your phone, wherever in the world you live.",
          }),
          serviceSchema({
            name: "NRI Property Security",
            description:
              "AI alerts on a non-resident owner's existing CCTV at an empty kothi, farmhouse, plot or parents' home in Punjab, delivered to the owner's phone with a snapshot.",
            path: PATH,
            serviceType: "Property monitoring and AI video surveillance",
            audience: "Non-resident Indians (NRIs) who own property in Punjab",
            // Districts, not one run-on string — see serviceSchema in lib/schema.ts.
            // No `offers` node: PGAK publishes no rate on any public surface.
            areaServed: [
              "Jalandhar, Punjab, India",
              "Hoshiarpur, Punjab, India",
              "Kapurthala, Punjab, India",
              "Shaheed Bhagat Singh Nagar, Punjab, India",
              "Moga, Punjab, India",
              "Ludhiana, Punjab, India",
              "Amritsar, Punjab, India",
              "Patiala, Punjab, India",
              "Bathinda, Punjab, India",
              "Sahibzada Ajit Singh Nagar, Punjab, India",
            ],
          }),
          breadcrumbSchema(TRAIL),
          faqSchema(FAQS),
        ]}
      />

      <Nav />
      <NriTracking />

      <main id="main-content" className="pt-[74px]">
        {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
        <section className="sec pb-28 md:pb-12">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">For Punjabi families living abroad</p>
            <h1 className="display mt-4 max-w-[20ch] text-[clamp(2rem,4.8vw,3.3rem)]">
              Your home in Punjab, protected while you&rsquo;re abroad
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.15rem] font-medium leading-relaxed text-ink">
              Your CCTV records the theft. PGAK tells you while it&rsquo;s
              happening.
            </p>
            <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-ink-soft">
              An empty kothi, a farmhouse, a plot, or parents managing on their
              own. The cameras are already on the wall. PGAK is the part that
              watches them and sends an alert with a photo to your phone when
              someone is at your gate.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NriWhatsApp
                message={WA_MESSAGE}
                placement="hero"
                className="btn btn-primary"
              >
                Chat on WhatsApp →
              </NriWhatsApp>
              <Link
                href="#remote-check"
                data-cta="nri-audit-hero"
                data-nri="hero"
                data-nri-audit="1"
                data-intent="assessment"
                className="btn btn-ghost"
              >
                Free remote security check
              </Link>
            </div>

            {/* Trust strip. Note what it does NOT say: the brief's version
                promised "no new hardware" and printed a rate. Both are
                deliberately absent — see the file header. */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-ink-faint">
              <li>Works with the cameras you already have</li>
              <li aria-hidden="true">·</li>
              <li>Alerts on your phone, with a snapshot</li>
              <li aria-hidden="true">·</li>
              <li>Your rate quoted for your property, not printed here</li>
            </ul>
          </div>
        </section>

        {/* ── 2. The problem ───────────────────────────────────────────────── */}
        <section className="sec sec-band">
          <div className="wrap">
            <p className="eyebrow">What families actually deal with</p>
            <h2 className="display mt-4 max-w-[26ch] text-[clamp(1.6rem,3.2vw,2.3rem)]">
              The distance is not the problem. Not knowing is.
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PROBLEMS.map((p) => (
                <article key={p.title} className="card">
                  <h3 className="text-[1.05rem] font-medium text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                </article>
              ))}
            </div>

            {/*
              News links, cited factually and nothing more.
              ⚠️ Standing rule (lib/… news-jacking guidance, and the owner's
              instruction): never write or imply that PGAK would have prevented
              a specific reported incident. We cannot know that, the families
              involved are real, and the claim is both unprovable and crass.
              What these reports establish is narrower and sufficient: that the
              risk is current and ordinary, not imagined. Keep it at that.
            */}
            <div className="mt-10 max-w-[72ch] rounded-[14px] border border-line bg-panel p-6">
              <p className="text-[0.82rem] uppercase tracking-[0.14em] text-ink-faint">
                Reported in Punjab, 2026
              </p>
              <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                <li>
                  Shots were fired at an NRI&rsquo;s locked house in Heran
                  village, Ludhiana district, on 30 September 2026 —{" "}
                  <a
                    href="https://www.amarujala.com/punjab/ludhiana/crime/firing-at-nri-locked-house-in-heraan-village-ludhiana-2026-09-30"
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="text-accent underline underline-offset-2"
                  >
                    Amar Ujala
                  </a>
                  .
                </li>
                <li>
                  A locked NRI-owned house in Lakhan Ke Padda, Kapurthala
                  district, was burgled in August 2026 —{" "}
                  <a
                    href="https://www.amarujala.com/video/punjab/chandigarh-punjab/crime/video-theft-at-an-nris-locked-house-in-lakhan-ke-padda-village-kapurthala-2026-08-31"
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="text-accent underline underline-offset-2"
                  >
                    Amar Ujala
                  </a>
                  .
                </li>
                <li>
                  The Punjab and Haryana High Court has said cases of NRI
                  property fraud cannot be treated lightly —{" "}
                  <a
                    href="https://www.tribuneindia.com/news/punjab/nri-property-fraud-cases-cant-be-treated-lightly-punjab-and-haryana-high-court/"
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="text-accent underline underline-offset-2"
                  >
                    The Tribune
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-4 text-[0.85rem] text-ink-faint">
                We link these because they are current and documented, not to
                suggest any system would have changed what happened in them.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. How it works ──────────────────────────────────────────────── */}
        <section className="sec">
          <div className="wrap">
            <p className="eyebrow">How it works</p>
            <h2 className="display mt-4 max-w-[30ch] text-[clamp(1.6rem,3.2vw,2.3rem)]">
              How to protect NRI property in India from abroad
            </h2>
            <p className="mt-5 max-w-[62ch] leading-relaxed text-ink-soft">
              Three steps, and the first one is usually already done.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {STEPS.map((s) => (
                <article key={s.n} className="card">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.8rem] text-accent"
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-[1.05rem] font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Compatibility ─────────────────────────────────────────────── */}
        <section className="sec sec-band">
          <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow">Compatibility</p>
              <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)]">
                Works with the CCTV you already have
              </h2>
              <p className="mt-5 max-w-[56ch] leading-relaxed text-ink-soft">
                PGAK reads the streams from the recorder at your property, so
                the brand on the box matters less than whether the stream can be
                reached and what the camera can actually see. Hikvision, CP
                Plus, Dahua and most ONVIF or RTSP recorders are the common
                cases.
              </p>
              <p className="mt-4 max-w-[56ch] text-[0.92rem] leading-relaxed text-ink-faint">
                {HARDWARE_NOTE_LONG}
              </p>
              <p className="mt-5">
                <Link
                  href="/platform/compatibility"
                  className="text-accent underline underline-offset-4"
                >
                  Check what your recorder needs to support →
                </Link>
              </p>
            </div>

            {/* CONFIRM-1 — see the FAQ note. Written as a requirement plus a
                free check, not as a claim that 4G is supported. */}
            <div className="rounded-[18px] border border-line bg-panel p-6 sm:p-7">
              <h3 className="text-[1.05rem] font-medium text-ink">
                No Wi-Fi at the village house?
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Then the question is what the cameras use instead. At a kothi
                standing empty or a farmhouse out by the tubewell, that is
                usually a 4G router or a SIM camera rather than a broadband
                line.
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                What decides it is whether that connection has enough upload
                speed, steadily enough, for the number of cameras you want
                covered. It depends on the signal at that exact spot. We would
                rather establish it before you spend anything than guess on a
                web page.
              </p>
              <p className="mt-4 text-[0.88rem] text-ink-faint">
                Send a photo of your recorder and the village name on WhatsApp.
                That is normally enough for us to tell you where you stand.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. Property types ────────────────────────────────────────────── */}
        <section className="sec">
          <div className="wrap">
            <p className="eyebrow">Whatever you own there</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)]">
              For every type of property
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROPERTIES.map((p) => (
                <article key={p.title} className="card">
                  <h3 className="text-[1.05rem] font-medium text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                </article>
              ))}
            </div>
            {/*
              Section 6 of the brief, "Parents living alone", is deliberately
              absent. PGAK has no fall or no-movement detection, and a page
              aimed at people worried about an elderly parent is the very last
              place to imply otherwise. The brief's own rule for a "no" here was
              to drop the section and cover it in a blog post.
            */}
            <p className="mt-8 max-w-[68ch] text-[0.9rem] leading-relaxed text-ink-faint">
              One thing PGAK does not do: it is not a medical or fall-detection
              system, and it will not tell you that someone indoors has had a
              fall. It watches gates, doors, yards and boundaries. If what
              worries you is a parent&rsquo;s health rather than their gate, say
              so on WhatsApp and we will tell you honestly that this is not the
              product for it.
            </p>
          </div>
        </section>

        {/* ── 7. Price ─────────────────────────────────────────────────────── */}
        <section id="pricing" className="sec sec-band" data-money-page>
          <div className="wrap">
            <p className="eyebrow">Money</p>
            <h2 className="display mt-4 max-w-[28ch] text-[clamp(1.6rem,3.2vw,2.3rem)]">
              What decides your price
            </h2>
            <p className="mt-5 max-w-[64ch] leading-relaxed text-ink-soft">
              Billing is per camera per month. We quote your rate on a call or
              on WhatsApp once we know the camera count — not because it is a
              secret, but because the number that would fit on this page would
              be wrong for most of the people reading it. Three things move it:
            </p>
            <ul className="mt-6 grid max-w-[64ch] gap-3 text-ink-soft">
              <li className="rounded-[12px] border border-line bg-panel px-5 py-4">
                <strong className="text-ink">How many cameras</strong> you want
                watched — not how many are installed. Most people start with the
                gate, the main door and the boundary, and leave the indoor ones
                recording as they are.
              </li>
              <li className="rounded-[12px] border border-line bg-panel px-5 py-4">
                <strong className="text-ink">
                  Whether the site needs a processing unit
                </strong>{" "}
                on-site, and whether your recorder and connection can carry what
                you want. Confirmed at the check, itemised in the quote.
              </li>
              <li className="rounded-[12px] border border-line bg-panel px-5 py-4">
                <strong className="text-ink">One property or several</strong> —
                a kothi and a farmhouse on the same account are not priced as
                two unrelated jobs.
              </li>
            </ul>
            <p className="mt-6 max-w-[64ch] text-[0.92rem] leading-relaxed text-ink-faint">
              Setup, support, taxes and the contract term are written down
              before you commit, and you will have them in front of you in your
              own time zone rather than on a phone call you had to take at 6am.
            </p>
            <p className="mt-5">
              <Link
                href="/pricing"
                className="text-accent underline underline-offset-4"
              >
                How we scope and quote a site →
              </Link>
            </p>
          </div>
        </section>

        {/* The comparison the brief asks for, done the site's way: the visitor
            enters the rate they were quoted, and nothing is printed for them.
            Already built, already honest — reused rather than reimplemented. */}
        <GuardCostCompare />

        {/* ── 8. Normal CCTV vs PGAK ───────────────────────────────────────── */}
        <section className="sec">
          <div className="wrap">
            <p className="eyebrow">The difference</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)]">
              Normal CCTV and AI CCTV, side by side
            </h2>
            <div className="mt-8 overflow-x-auto rounded-[14px] border border-line">
              <table className="w-full min-w-[640px] text-[0.95rem]">
                <caption className="sr-only">
                  A comparison of ordinary CCTV and PGAK&rsquo;s AI alerts on
                  four points: who watches the footage, when you find out,
                  false alarms, and what you can do about it.
                </caption>
                <thead>
                  <tr className="text-left text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                    <th scope="col" className="px-4 py-3 font-medium" />
                    <th scope="col" className="px-4 py-3 font-medium">
                      CCTV on its own
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      The same cameras, with PGAK
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-4 [&_th]:border-t [&_th]:border-line [&_th]:px-4 [&_th]:py-4">
                  {COMPARISON.map((r) => (
                    <tr key={r.q}>
                      <th
                        scope="row"
                        className="text-left font-medium text-ink"
                      >
                        {r.q}
                      </th>
                      <td className="text-ink-soft">{r.normal}</td>
                      <td className="text-ink">{r.pgak}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 9. Punjab coverage ───────────────────────────────────────────── */}
        <section className="sec sec-band">
          <div className="wrap">
            <p className="eyebrow">On the ground</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)]">
              Areas we cover in Punjab
            </h2>
            <p className="mt-5 max-w-[64ch] leading-relaxed text-ink-soft">
              Doaba first — Jalandhar, Hoshiarpur, Kapurthala, Phagwara and
              Nawanshahr — because that is where most NRI-owned property in
              Punjab sits. Because PGAK connects to a recorder over the
              internet, the district matters far less for setting it up than it
              does for physical work on a camera.
            </p>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PUNJAB_AREAS.map((a) => (
                <li
                  key={a.name}
                  className="flex items-baseline justify-between gap-3 rounded-[12px] border border-line bg-panel px-5 py-4"
                >
                  {a.href ? (
                    <Link
                      href={a.href}
                      className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                    >
                      {a.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink">{a.name}</span>
                  )}
                  <span className="shrink-0 text-[0.78rem] uppercase tracking-wide text-ink-faint">
                    {a.note}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-[64ch] text-[0.9rem] leading-relaxed text-ink-faint">
              Underlined districts have a page of their own with local detail.
              Somewhere else in Punjab? Ask — most of the state is reachable
              through our dealer network, and{" "}
              <Link
                href="/areas-we-serve"
                className="text-accent underline underline-offset-2"
              >
                every city we cover is listed here
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── 10. Families abroad ──────────────────────────────────────────── */}
        <section className="sec">
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow">Where you are</p>
              <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)]">
                Families we serve abroad
              </h2>
              <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft">
                Most enquiries come from the same handful of places, which is
                also why we do not expect you to be awake at Indian office
                hours.
              </p>
              {/* Alerts are app notifications, not messages to a phone number
                  (owner's instruction, 1 Oct 2026), which is what retires the
                  old [CONFIRM] #3 about delivery to +1/+44/+61 numbers: an app
                  notification does not route through a mobile network at all,
                  so the country of the SIM stops being a question. Still worth
                  confirming WHICH app stores the app is live on before this
                  page is promoted — see docs/nri-property-security.md. */}
              <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">
                Alerts come through the PGAK app, so they reach you the same way
                wherever you are — nothing depends on you keeping an Indian
                number running, and there is no international SMS to pay for or
                miss. More than one person can be on the same property, which is
                how most families use it: you, your brother, and whoever is
                closest to the house.
              </p>
              <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">
                For talking to us rather than to the cameras, WhatsApp works
                across time zones. Write when it suits you and a reply will be
                waiting.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ABROAD.map((a) => (
                <li
                  key={a.country}
                  className="rounded-[12px] border border-line bg-panel px-5 py-4"
                >
                  <p className="font-medium text-ink">{a.country}</p>
                  <p className="mt-1 text-[0.9rem] text-ink-faint">
                    {a.places}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 11. Ground support ───────────────────────────────────────────── */}
        <section className="sec sec-band">
          <div className="wrap">
            <p className="eyebrow">Being straight with you</p>
            <h2 className="display mt-4 max-w-[28ch] text-[clamp(1.6rem,3.2vw,2.3rem)]">
              Who does the work at the property
            </h2>
            <div className="mt-6 max-w-[68ch] space-y-4 leading-relaxed text-ink-soft">
              <p>
                Most of what PGAK needs happens without anybody going to your
                house. It is software: it connects to the recorder already
                installed, over the connection already there, and the rules are
                set with you on a call.
              </p>
              <p>
                Physical work is a different thing, and we would rather tell you
                now than at the point it matters. If a camera needs re-aiming,
                a cable replacing or a power supply changing, somebody has to
                stand in front of it. That happens one of three ways:
              </p>
              <ul className="grid gap-3">
                <li className="rounded-[12px] border border-line bg-panel px-5 py-4">
                  <strong className="text-ink">
                    The installer who fitted your system.
                  </strong>{" "}
                  Usually the cheapest and quickest, because they know the
                  cabling. We can talk to them directly about what we need.
                </li>
                <li className="rounded-[12px] border border-line bg-panel px-5 py-4">
                  <strong className="text-ink">
                    A PGAK partner, where one covers your district.
                  </strong>{" "}
                  Our dealer network is growing across Punjab, and we are
                  signing partners in Doaba now. Ask what covers your district
                  today — if the answer is nobody yet, we will say so.
                </li>
                <li className="rounded-[12px] border border-line bg-panel px-5 py-4">
                  <strong className="text-ink">
                    Family or your caretaker, guided by us.
                  </strong>{" "}
                  More of this is possible than people expect. Re-pointing a
                  camera or restarting a recorder is usually a video call, not a
                  technician.
                </li>
              </ul>
              <p className="text-[0.92rem] text-ink-faint">
                What we will not do is tell you someone is standing by in your
                village when they are not. If getting a person to the property
                is the hard part of your situation, say that first and we will
                be honest about what we can and cannot arrange.
              </p>
            </div>
          </div>
        </section>

        {/* ── 13. FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="sec">
          <div className="wrap">
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)]">
              What NRI families ask us
            </h2>
            <NriFaq faqs={FAQS} />
          </div>
        </section>

        {/* ── 14. Punjabi and Hindi ────────────────────────────────────────── */}
        <section className="sec sec-band" aria-label="ਪੰਜਾਬੀ ਅਤੇ हिन्दी">
          <div className="wrap">
            <div className="max-w-[64ch] rounded-[18px] border border-line bg-panel p-7 sm:p-9">
              <p lang="pa" className="text-[1.15rem] leading-loose text-ink">
                ਤੁਹਾਡਾ ਘਰ ਪੰਜਾਬ ਵਿੱਚ, ਤੇ ਤੁਸੀਂ ਵਿਦੇਸ਼ ਵਿੱਚ।
                <br />
                PGAK ਤੁਹਾਡੇ ਪੁਰਾਣੇ CCTV ਨੂੰ ਹੀ ਸਮਝਦਾਰ ਬਣਾ ਦਿੰਦਾ ਹੈ — ਨਵੇਂ ਕੈਮਰੇ
                ਲਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ।
                <br />
                ਜੇ ਗੇਟ &rsquo;ਤੇ ਕੋਈ ਅਜਨਬੀ ਆਵੇ, ਤਾਂ ਤੁਹਾਡੇ ਫ਼ੋਨ &rsquo;ਤੇ ਐਪ
                ਵਿੱਚ ਫ਼ੋਟੋ ਸਮੇਤ ਉਸੇ ਵੇਲੇ ਪਤਾ ਲੱਗ ਜਾਂਦਾ ਹੈ — ਤੁਸੀਂ ਦੁਨੀਆਂ ਵਿੱਚ
                ਕਿਤੇ ਵੀ ਹੋਵੋ।
              </p>
              <p
                lang="hi"
                className="mt-6 border-t border-line pt-6 text-[1.05rem] leading-loose text-ink-soft"
              >
                आपका घर पंजाब में, आप विदेश में — गेट पर कोई अजनबी आए तो आपके
                फ़ोन पर ऐप में फ़ोटो के साथ उसी समय पता चल जाता है।
              </p>
              <div className="mt-7">
                <NriWhatsApp
                  message={WA_MESSAGE}
                  placement="punjabi"
                  className="btn btn-primary"
                >
                  ਵਟਸਐਪ &rsquo;ਤੇ ਗੱਲ ਕਰੋ →
                </NriWhatsApp>
              </div>
            </div>
          </div>
        </section>

        {/* ── 15. Final CTA ────────────────────────────────────────────────── */}
        <section id="remote-check" className="sec">
          <div className="wrap">
            <div className="rounded-[22px] border border-line bg-panel p-7 sm:p-10">
              <p className="eyebrow">Free remote security check</p>
              <h2 className="display mt-4 max-w-[26ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">
                Find out what your cameras could already be telling you
              </h2>
              <p className="mt-5 max-w-[62ch] leading-relaxed text-ink-soft">
                No visit, no cost, and nobody has to be at the property. Send us
                a photo of your DVR or NVR, the village or town, and roughly how
                many cameras there are. We will tell you which of them PGAK
                could watch, whether the connection can carry it, and what it
                would cost for your property — and if the answer is that your
                setup is not suitable, we will tell you that instead of selling
                you something.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <NriWhatsApp
                  message={WA_MESSAGE}
                  placement="final"
                  className="btn btn-primary"
                >
                  Chat on WhatsApp →
                </NriWhatsApp>
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  data-nri="final"
                  className="btn btn-ghost"
                >
                  Call {BUSINESS.phone}
                </a>
              </div>
              <p className="mt-6 text-[0.88rem] text-ink-faint">
                Write in English, Punjabi or Hindi — whichever is easier. If you
                would rather someone in the family in Punjab handled the call,
                send us their number and tell us when suits them.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
