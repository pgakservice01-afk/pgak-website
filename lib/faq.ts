/**
 * Homepage FAQ content.
 *
 * Lives here rather than inside the component so the same list feeds both the
 * rendered accordion and the FAQPage JSON-LD on the homepage — one source, so
 * the structured data can never describe answers the page doesn't show.
 */

export type Faq = { q: string; a: string; qHi: string; aHi: string };

export const FAQS: Faq[] = [
  {
    q: "Do I need to buy new cameras?",
    qHi: "क्या मुझे नए कैमरे ख़रीदने होंगे?",
    a: "No. PGAK is built to work with the cameras you already own — CCTV, IP cameras and most DVR/NVR systems. The intelligence is added as a layer on top, so there's no rip-and-replace.",
    aHi: "नहीं। PGAK आपके पहले से मौजूद कैमरों — सीसीटीवी, आईपी कैमरे और ज़्यादातर DVR/NVR सिस्टम — के साथ काम करने के लिए बनाया गया है। इंटेलिजेंस को ऊपर एक लेयर के रूप में जोड़ा जाता है, इसलिए कुछ भी बदलने की ज़रूरत नहीं।",
  },
  {
    q: "How fast does it detect a threat?",
    qHi: "यह ख़तरे का पता कितनी जल्दी लगाता है?",
    a: "PGAK flags unknown people, intrusions and unusual activity in under three seconds, sending you an alert with a snapshot so you can act before a situation escalates.",
    aHi: "PGAK अनजान लोगों, घुसपैठ और असामान्य गतिविधि को तीन सेकंड से भी कम में पहचान लेता है, और आपको स्नैपशॉट के साथ अलर्ट भेजता है ताकि स्थिति बिगड़ने से पहले आप कार्रवाई कर सकें।",
  },
  {
    q: "What about all the false alarms I get today?",
    qHi: "आज मुझे जो इतने झूठे अलार्म मिलते हैं, उनका क्या?",
    a: "That's exactly what the AI is designed to fix. It classifies every moving object before deciding to alert you, filtering out wind, shadows, pets and headlights — so the alerts you receive are the ones that genuinely matter. Most sites see false alerts drop by over 90% after the first fortnight of tuning.",
    aHi: "एआई इसे ठीक करने के लिए ही बना है। यह आपकी सामान्य दिनचर्या सीखता है और हवा, परछाइयों, पालतू जानवरों और अन्य शोर को फ़िल्टर कर देता है, ताकि आपको मिलने वाले अलर्ट वही हों जो वाक़ई मायने रखते हैं।",
  },
  {
    q: "Is my footage private and secure?",
    qHi: "क्या मेरी फ़ुटेज निजी और सुरक्षित है?",
    a: "Yes. Video is processed on an edge device at your own site, so footage stays on your premises by default and never needs to reach an external cloud. What does leave is encrypted, and access is role-controlled. Privacy is a core part of the design, not an afterthought.",
    aHi: "हाँ। आपका डेटा एंड-टू-एंड एन्क्रिप्शन से सुरक्षित रहता है और आपके नियंत्रण में रहता है। निजता डिज़ाइन का मूल हिस्सा है, बाद का ख़याल नहीं।",
  },
  {
    q: "Can I monitor multiple locations?",
    qHi: "क्या मैं कई जगहों की निगरानी कर सकता हूँ?",
    a: "Absolutely. PGAK supports multiple cameras and sites from a single dashboard, with multi-user access and roles — so a head office sees every branch while a branch manager sees only their own.",
    aHi: "बिल्कुल। PGAK एक ही डैशबोर्ड से कई कैमरों और साइटों को सपोर्ट करता है, मल्टी-यूज़र एक्सेस और रोल्स के साथ।",
  },
  {
    q: "How much does PGAK cost?",
    qHi: "PGAK की क़ीमत कितनी है?",
    a: "₹1,000 per camera per month, with no hidden fees, no separate licence cost and no charge for the software updates that arrive along the way. Pricing does not change by city or by industry.",
    aHi: "₹1,000 प्रति कैमरा प्रति माह — कोई छिपा हुआ शुल्क नहीं, अलग से लाइसेंस लागत नहीं, और सॉफ़्टवेयर अपडेट के लिए कोई शुल्क नहीं। क़ीमत शहर या उद्योग के अनुसार नहीं बदलती।",
  },
  {
    q: "How long does installation take?",
    qHi: "इंस्टॉलेशन में कितना समय लगता है?",
    a: "Most sites are live within a day, because there is no cabling to run — we connect to your existing DVR or NVR streams. The part that takes longer is tuning zones, schedules and thresholds against your real footage, which we do over the following fortnight.",
    aHi: "ज़्यादातर साइटें एक दिन में चालू हो जाती हैं, क्योंकि कोई नई केबलिंग नहीं करनी होती — हम आपके मौजूदा DVR या NVR स्ट्रीम से जुड़ते हैं। ज़्यादा समय ज़ोन और शेड्यूल की ट्यूनिंग में लगता है, जो हम अगले दो हफ़्तों में करते हैं।",
  },
  {
    q: "Which cameras and DVRs are compatible?",
    qHi: "कौन से कैमरे और DVR संगत हैं?",
    a: "Anything that exposes an RTSP stream, which covers virtually every DVR and NVR installed in the last decade — Hikvision, Dahua, CP Plus and the rest. If your DVR shows footage in a phone app today, it almost certainly works. The free camera audit confirms it before you spend anything.",
    aHi: "कोई भी सिस्टम जो RTSP स्ट्रीम देता है — पिछले एक दशक में लगे लगभग हर DVR और NVR सहित। अगर आपका DVR आज फ़ोन ऐप पर फ़ुटेज दिखाता है, तो यह लगभग निश्चित रूप से काम करेगा।",
  },
  {
    q: "Does it work at night and in poor light?",
    qHi: "क्या यह रात में और कम रोशनी में काम करता है?",
    a: "Yes — the models are trained on infrared and low-light footage, which is when most intrusions happen. Night performance depends on your cameras having usable IR illumination, and that is one of the things the free audit checks.",
    aHi: "हाँ — मॉडल इन्फ़्रारेड और कम रोशनी की फ़ुटेज पर प्रशिक्षित हैं, और अधिकांश घुसपैठ तभी होती है। रात का प्रदर्शन आपके कैमरों की IR रोशनी पर निर्भर करता है, जिसे मुफ़्त ऑडिट में जाँचा जाता है।",
  },
  {
    q: "What happens if my internet goes down?",
    qHi: "अगर मेरा इंटरनेट बंद हो जाए तो क्या होगा?",
    a: "Detection keeps running, because it happens on an edge device at your site rather than in a cloud. Local responses like sirens still fire; phone notifications and the dashboard catch up once the connection returns.",
    aHi: "पहचान चलती रहती है, क्योंकि यह क्लाउड के बजाय आपकी साइट पर एज डिवाइस पर होती है। सायरन जैसी स्थानीय प्रतिक्रियाएँ चलती रहती हैं; कनेक्शन लौटने पर नोटिफ़िकेशन और डैशबोर्ड अपडेट हो जाते हैं।",
  },
  {
    q: "Can it replace our biometric attendance machine?",
    qHi: "क्या यह हमारी बायोमेट्रिक अटेंडेंस मशीन की जगह ले सकता है?",
    a: "For most sites, yes. Face recognition at the gate produces the same attendance record with no contact, no queue and no failures on dusty or damaged fingers. Sites typically run both for a fortnight and then retire the machine.",
    aHi: "ज़्यादातर साइटों के लिए, हाँ। गेट पर फ़ेस रिकग्निशन वही अटेंडेंस रिकॉर्ड बनाता है — बिना संपर्क, बिना क़तार, और धूल भरे या कटे-फटे उँगलियों पर विफलता के बिना।",
  },
  {
    q: "How do I get started?",
    qHi: "मैं शुरुआत कैसे करूँ?",
    a: "Book a free demo or connect with a PGAK dealer near you. We'll assess your existing setup and recommend the right fit — and if your cameras aren't suitable, we'll tell you that too. No obligation.",
    aHi: "एक मुफ़्त डेमो बुक करें या अपने नज़दीकी PGAK डीलर से जुड़ें। हम आपके मौजूदा सेटअप का आकलन करेंगे और सही विकल्प सुझाएँगे — बिना किसी बाध्यता के।",
  },
];
