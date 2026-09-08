/**
 * The free AI readiness audit — the one offer every button on the site sells.
 *
 * One list, rendered by the homepage section (components/sections/FreeAudit)
 * and the dedicated landing page (app/free-audit). The rupee figures price the
 * giveaway, not the product: they are the value of each deliverable, which is
 * why they may appear while PGAK's own rate may not (see the no-published-
 * pricing rule in lib/schema.ts / DEPLOY.md).
 */
export const AUDIT_ITEMS = [
  {
    t: "Per-camera placement & feed-quality score (0–100)",
    tHi: "प्रति-कैमरा प्लेसमेंट और फ़ीड-क्वालिटी स्कोर (0–100)",
    d: "Height, angle, lighting and stream health — camera by camera.",
    dHi: "ऊँचाई, कोण, रोशनी और स्ट्रीम की सेहत — हर कैमरे की।",
    v: "₹4,999",
  },
  {
    t: "Face-recognition readiness report",
    tHi: "फ़ेस-रिकग्निशन रेडीनेस रिपोर्ट",
    d: "Which cameras can actually identify a person — and what to change.",
    dHi: "कौन-से कैमरे वाक़ई किसी व्यक्ति को पहचान सकते हैं — और क्या बदलना है।",
    v: "₹2,999",
  },
  {
    t: "Blind-spot & coverage map of your site",
    tHi: "आपकी साइट का ब्लाइंड-स्पॉट और कवरेज मैप",
    d: "Where an intruder could walk through unseen today.",
    dHi: "आज कोई घुसपैठिया कहाँ से बिना दिखे गुज़र सकता है।",
    v: "₹3,499",
  },
  {
    t: "False-alarm analysis",
    tHi: "झूठे अलार्म का विश्लेषण",
    d: "Why your current system cries wolf — and what the AI would filter.",
    dHi: "आपका मौजूदा सिस्टम बेवजह क्यों चिल्लाता है — और एआई क्या फ़िल्टर करेगा।",
    v: "₹1,999",
  },
  {
    t: "CCTV-based attendance feasibility check",
    tHi: "सीसीटीवी-आधारित अटेंडेंस संभाव्यता जाँच",
    d: "Can your gate cameras replace biometric machines? We'll tell you.",
    dHi: "क्या आपके गेट कैमरे बायोमेट्रिक मशीनों की जगह ले सकते हैं? हम बताएँगे।",
    v: "₹2,499",
  },
] as const;

/** Sum of the five deliverables above — keep in step if the list changes. */
export const AUDIT_TOTAL_VALUE = "₹15,995";

/** The promise printed on the site. Change here and everywhere follows. */
export const AUDIT_TURNAROUND_HOURS = 48;
export const CALLBACK_PROMISE = {
  en: "We call within one working hour, 9 am to 7 pm, Monday to Saturday.",
  hi: "हम एक कार्य-घंटे के भीतर कॉल करते हैं — सुबह 9 से शाम 7, सोमवार से शनिवार।",
} as const;
