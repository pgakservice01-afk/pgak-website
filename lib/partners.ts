/**
 * The PGAK Partner Program offer — every number, claim and promise the
 * /partners page makes, in one file.
 *
 * ── Why the copy lives here and not in the page ──
 * This page makes *commercial commitments to other businesses*: margin,
 * territory, payout dates, a refund promise. Those are the owner's decisions,
 * not a copywriter's, and they change. Keeping them in one typed object means
 * the owner can change "25%" or "90 days" in one place and every mention on
 * the page follows, instead of four numbers drifting apart across 600 lines of
 * JSX until the page promises one thing and the contract says another.
 *
 * ⚠️ Every value in `TERMS` below is a commercial commitment made in public to
 * people who will hold us to it. The owner confirmed the whole set on
 * 2026-09-24 (margin set to 20%, all other terms as written). Anything changed
 * here changes a promise on a live page — re-confirm before editing.
 *
 * ── Why a dealer application is not a lead ──
 * A dealer is not a customer, and lib/leadRegister.ts says so explicitly: a
 * dealer application "never reaches this endpoint (it goes to WhatsApp)". That
 * rule is kept here. The application form on this page opens a WhatsApp thread
 * with the answers pre-written; it does not POST to /api/leads, so a partner
 * enquiry can never be counted as a customer lead, assigned to a dealer, or
 * optimised against as a Meta conversion.
 */

/**
 * The commercial terms. Owner-confirmed 2026-09-24.
 *
 * The page reads every figure from here, so a term the owner has not agreed
 * cannot appear in one section and not another.
 */
export const TERMS = {
  /** Share of the recurring software fee paid to the partner, every month.
   *  Confirmed by the owner on 2026-09-24. */
  recurringMarginPct: 20,
  /** Day of the month partner payouts are released. */
  payoutDay: 7,
  /** How long a registered deal stays locked to the partner who registered it. */
  dealProtectionDays: 90,
  /** Hours from approval to a working demo account on the partner's phone. */
  demoReadyHours: 48,
  /** Partners appointed per pincode belt. The whole basis of the territory promise. */
  partnersPerBelt: 1,
  /** One-time cost to join. Zero is the offer; if this ever stops being zero, the page must stop saying it. */
  joiningFee: "₹0",
  /** Minimum stock or order commitment. */
  minimumOrder: "None",
  /** Tuning window after go-live, during which the refund promise applies. */
  tuningDays: 14,
} as const;

/**
 * The problem, in the dealer's own words.
 *
 * Deliberately not written as benefits-in-disguise. A CCTV dealer in Ludhiana
 * or Ghaziabad does not need to be told their margins are thin; they need to
 * see that we already know, because that is the only thing that buys the next
 * thirty seconds of attention.
 */
export const PAIN = [
  {
    h: "You get beaten on price by ₹200 a camera",
    d: "The customer is checking your quote against a marketplace listing while you are still explaining the difference. The one who wins the order is the one who blinked first on margin.",
  },
  {
    h: "Hardware margin keeps shrinking",
    d: "The same brand, the same model, the same box — and four other people in your city quoting it. Nothing about the product is yours, so nothing about the price is either.",
  },
  {
    h: "You install once and earn once",
    d: "After handover, the next call from that customer is a complaint, not an order. A site worth ₹3 lakh becomes worth ₹0 a month later.",
  },
  {
    h: "You are asked for things you cannot sell",
    d: "“Can it tell me when someone comes in at night?” “Can it mark attendance at the gate?” “Can I see all four factories on one screen?” Today you say no, or you lose the enquiry to someone who says yes.",
  },
] as const;

/**
 * The value stack.
 *
 * Each line is something the partner receives, with what it would cost them to
 * buy or build alone. The rupee figures are honest replacement costs — what a
 * dealer would actually pay a freelancer, an agency or a distributor for the
 * same thing — not inflated numbers, because the audience is people who buy
 * these services for a living and will price-check every line.
 *
 * ⚠️ The `worth` figures are shown to the public as our estimate of value and
 * must stay defensible if a partner asks how we arrived at them.
 * Owner-confirmed 2026-09-24.
 */
export const STACK = [
  {
    t: "A protected territory",
    worth: "₹50,000",
    d: `We appoint ${TERMS.partnersPerBelt === 1 ? "one partner" : `${TERMS.partnersPerBelt} partners`} per pincode belt. Not "preferred", not "authorised" alongside four others — named, and yours while you are active. Any enquiry that reaches us from your belt is routed to you.`,
  },
  {
    t: "The free camera audit, in your name",
    worth: "₹12,000 per site",
    d: "Send us any customer's existing feeds. Our team returns a written report — camera-by-camera placement scores, blind-spot map, false-alarm analysis, what their setup can and cannot do — co-branded with your company. It is the reason to phone every customer you installed for in the last five years.",
  },
  {
    t: "Recurring margin, paid monthly",
    worth: `${TERMS.recurringMarginPct}% of every subscription`,
    d: `You earn on the software for as long as the customer stays on it, not once at handover. Released by the ${TERMS.payoutDay}th of each month with a statement showing every site.`,
  },
  {
    t: "An engineer on your customer calls",
    worth: "₹8,000 per call",
    d: "When the questions get technical, you are not alone on the call. Our engineer joins your meeting, your demo or your site visit — as your technical team, introduced as such. You stay the one holding the relationship.",
  },
  {
    t: `A live demo on your phone in ${TERMS.demoReadyHours} hours`,
    worth: "₹25,000",
    d: "A working account with real analytics running on real footage, so you can show a prospect what it actually does instead of showing them a brochure. No kit to buy, no server to set up.",
  },
  {
    t: "Deal registration that actually protects you",
    worth: "Priceless in this trade",
    d: `Register a prospect and that account is locked to you for ${TERMS.dealProtectionDays} days. If the same customer comes to us directly, or through another partner, the deal and the margin still come back to you.`,
  },
  {
    t: "Quotes, decks and WhatsApp creatives in your branding",
    worth: "₹40,000",
    d: "Quotation templates, a customer-facing deck, comparison sheets against the usual objections, and a set of WhatsApp-ready creatives — all carrying your company name, not ours.",
  },
  {
    t: "Training, and a WhatsApp group with humans in it",
    worth: "₹30,000",
    d: "A structured onboarding session for you and your technicians, plus a partner group where a question at 9pm on a Saturday gets an answer from someone who knows the answer.",
  },
  {
    t: "Installation and tuning backup",
    worth: "₹20,000 per deployment",
    d: `Our Ludhiana team stands behind your deployment, including the ${TERMS.tuningDays} days of tuning against the customer's real footage — the part that decides whether the customer keeps the alerts switched on or mutes them.`,
  },
] as const;

/** What the whole stack would cost a dealer to assemble alone. Owner-confirmed 2026-09-24. */
export const STACK_TOTAL = "₹1,85,000+";

/**
 * Risk reversal.
 *
 * The objection this page has to beat is not "is it good?" — it is "what does
 * this cost me if it goes wrong?", because a dealer's real currency is the
 * customer relationship, and a bad deployment costs them the customer, not us.
 * So the guarantees are written against that specific fear.
 *
 * ⚠️ Each of these is a promise we will be held to. Owner-confirmed 2026-09-24.
 */
export const GUARANTEES = [
  {
    t: "Nothing to lose on the way in",
    d: `${TERMS.joiningFee} joining fee. No stock to buy. ${TERMS.minimumOrder === "None" ? "No minimum order" : `Minimum order: ${TERMS.minimumOrder}`}. No deposit for territory, no annual renewal, and no targets in your first year. You can stop at any time and owe us nothing.`,
  },
  {
    t: "We tell your customer the truth before you quote",
    d: "The audit comes first, always. If a customer's cameras genuinely cannot run what we would be selling, the report says so and the deal does not happen. You never get pushed into a sale that will rebound on you in three months.",
  },
  {
    t: "If it does not do what the audit said, they get their money back",
    d: `If, after the ${TERMS.tuningDays}-day tuning window, the software does not do what the audit report said it would on those cameras, we refund the customer's software fee in full — and you keep your hardware and installation revenue. The risk of our claim being wrong is ours, not yours.`,
  },
] as const;

/** The first thirty days, so "what happens after I apply" is never a guess. */
export const STEPS = [
  {
    h: "You apply — two minutes",
    d: "Company, city, what you sell today, roughly how many cameras a month. Five fields. It reaches us on WhatsApp.",
  },
  {
    h: "We talk for twenty minutes",
    d: "Not a pitch. We check whether your belt is open, what you already sell, and whether this is worth either of our time. If it is not a fit we say so on that call.",
  },
  {
    h: `Approved, and demo-ready in ${TERMS.demoReadyHours} hours`,
    d: "Territory confirmed in writing, demo account live on your phone, onboarding session booked, branding pack in your inbox.",
  },
  {
    h: "Your first audit — on a customer you already have",
    d: "Pick one existing customer. Send us their feeds. We return the co-branded report and, if you want, join the call where you present it. That is usually where the first deal comes from.",
  },
] as const;

/** Qualification. Saying who this is *not* for is what makes it worth applying. */
export const FIT = {
  yes: [
    "CCTV dealers, installers and system integrators already selling and installing camera systems",
    "IT resellers, networking and ELV contractors with an installed base of business customers",
    "Electrical and automation contractors who finish projects at factories, warehouses and offices",
    "Security agencies who want to sell their clients something better than more guards",
    "Anyone with an existing book of customers they can phone tomorrow",
  ],
  no: [
    "Anyone looking to buy a franchise, a territory or a lead list — none of those are for sale here",
    "Pure online resellers with no ability to reach a site when something needs a person",
    "Anyone who wants to sell this without understanding it — the training is not optional",
    "Anyone expecting us to hand them customers on day one. We route enquiries from your belt to you, but the first deals come from your own book",
  ],
} as const;

export const FAQS = [
  {
    q: "What does it cost to become a PGAK partner?",
    a: `${TERMS.joiningFee}. There is no joining fee, no franchise fee, no territory deposit, no stock purchase and no minimum order. We make money when your customer pays for the software, which means we only make money after you do. If anyone quotes you a fee to become a PGAK partner, it did not come from us.`,
  },
  {
    q: "Do I have to buy cameras or hardware from you?",
    a: "No, and this is the part most dealers do not believe on the first call. PGAK is software that runs on the cameras a customer already owns — including the brands you already sell. You keep buying hardware from whoever you buy it from today, at whatever margin you get today. We are not competing for your hardware business.",
  },
  {
    q: "How much can I actually earn?",
    a: `You earn ${TERMS.recurringMarginPct}% of the software subscription, every month, for as long as that customer stays on it. The number that matters is not the first month — it is what your fiftieth site is paying you in year three while you are out selling the fifty-first. That is the difference between this and a hardware sale, and it is the entire reason the programme exists.`,
  },
  {
    q: "Will you sell direct to my customer and cut me out?",
    a: `No, and it is protected in writing rather than in sentiment. A registered deal is locked to you for ${TERMS.dealProtectionDays} days, and if that customer approaches us directly — or through another partner — the deal is routed back to you with your margin intact. Enquiries that reach us from your belt are sent to you as well.`,
  },
  {
    q: "I already sell another brand's AI or a rival platform. Is that a problem?",
    a: "No. We are not asking for exclusivity from you, only offering it to you in your belt. Most of our partners sell several things. If PGAK is the right answer for a particular customer you will sell it, and if it is not you should not.",
  },
  {
    q: "What if my customer's existing cameras are not good enough?",
    a: "Then the audit says so before anyone quotes anything, and that is a feature. Low cameras, backlit gates and unusable night feeds are common. Finding out at the audit costs a conversation; finding out after installation costs you the customer.",
  },
  {
    q: "How much technical work do I have to do?",
    a: `As much or as little as you want. Some partners run the whole deployment themselves after training; others sell it and hand the technical side to our team. The ${TERMS.tuningDays}-day tuning window is backed by our engineers either way.`,
  },
  {
    q: "How many partners are you appointing in my city?",
    a: `${TERMS.partnersPerBelt === 1 ? "One per pincode belt" : `${TERMS.partnersPerBelt} per pincode belt`}. That is the whole point of a protected territory, and it is also why we cannot approve everyone who applies. Belts where we already have an active partner are closed until that changes.`,
  },
  {
    q: "What happens if I want to stop?",
    a: "You stop. There is no lock-in, no notice period and no penalty. Your existing customers keep their service, and you keep earning on the sites you sold for as long as they stay on the platform.",
  },
  {
    q: "Where does PGAK actually operate from?",
    a: "Ludhiana, Punjab. In Ludhiana our own team does the survey, installation and tuning. Everywhere else in India that work runs through partners like you, with our team behind you on the platform. We do not claim offices we do not have.",
  },
] as const;

/** Application form options. Kept short: every extra field costs applications. */
export const BUSINESS_TYPES = [
  "CCTV dealer / installer",
  "System integrator",
  "IT / networking reseller",
  "Electrical or ELV contractor",
  "Security agency",
  "Other",
] as const;

export const MONTHLY_VOLUME = [
  "Under 25 cameras",
  "25–100 cameras",
  "100–500 cameras",
  "500+ cameras",
  "Just starting out",
] as const;
