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
    a: "PGAK is designed to reuse compatible CCTV and DVR/NVR streams. Camera placement, stream access and processing hardware must be checked before confirming what can be retained.",
    aHi: "PGAK संगत CCTV और DVR/NVR स्ट्रीम का उपयोग करता है। कैमरे, स्ट्रीम एक्सेस और प्रोसेसिंग हार्डवेयर की जाँच के बाद ही तय होगा कि क्या रखा जा सकता है।",
  },
  {
    q: "How fast does it detect a threat?",
    qHi: "यह ख़तरे का पता कितनी जल्दी लगाता है?",
    a: "PGAK sends alerts for configured detection events. End-to-end speed depends on the camera stream, processing device and network; measure it during your site assessment.",
    aHi: "PGAK चुनी गई घटनाओं के अलर्ट भेजता है। गति कैमरा स्ट्रीम, प्रोसेसिंग डिवाइस और नेटवर्क पर निर्भर करती है; साइट परीक्षण में इसे मापें।",
  },
  {
    q: "What about all the false alarms I get today?",
    qHi: "आज मुझे जो इतने झूठे अलार्म मिलते हैं, उनका क्या?",
    a: "That's exactly what the AI is designed to fix. It classifies every moving object before deciding to alert you, filtering out wind, shadows, pets and headlights — so the alerts you receive are the ones that genuinely matter. Review the change in false alerts during a pilot; no fixed reduction is guaranteed.",
    aHi: "एआई इसे ठीक करने के लिए ही बना है। यह आपकी सामान्य दिनचर्या सीखता है और हवा, परछाइयों, पालतू जानवरों और अन्य शोर को फ़िल्टर कर देता है, ताकि आपको मिलने वाले अलर्ट वही हों जो वाक़ई मायने रखते हैं।",
  },
  {
    q: "Can PGAK tell my own people apart from a stranger?",
    qHi: "क्या PGAK मेरे अपने लोगों और किसी अजनबी में फ़र्क़ कर सकता है?",
    a: "Yes. You enrol the faces of family, staff or regular visitors once, and PGAK recognises them silently after that. Alerts fire only when someone unknown enters a restricted zone — so you hear about the stranger at the back gate, not about your own team arriving for their shift.",
    aHi: "हाँ। आप परिवार, स्टाफ़ या नियमित आने-जाने वालों के चेहरे एक बार दर्ज कर देते हैं, और उसके बाद PGAK उन्हें चुपचाप पहचान लेता है। अलर्ट तभी आता है जब कोई अनजान व्यक्ति प्रतिबंधित क्षेत्र में आए — यानी आपको पिछले गेट पर खड़े अजनबी की ख़बर मिलती है, अपनी ही टीम के आने की नहीं।",
  },
  {
    q: "Is my footage private and secure?",
    qHi: "क्या मेरी फ़ुटेज निजी और सुरक्षित है?",
    a: "PGAK supports on-site edge processing. Confirm where video, snapshots and attendance records are stored, who can access them, encryption and retention settings in your deployment review.",
    aHi: "PGAK साइट पर एज प्रोसेसिंग का समर्थन करता है। वीडियो, स्नैपशॉट और अटेंडेंस रिकॉर्ड का स्थान, एक्सेस, एन्क्रिप्शन और संग्रह अवधि अपने डिप्लॉयमेंट में जाँचें।",
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
    a: "Billing is per camera per month, and we quote your exact rate on a call or WhatsApp once we know your camera count and how many sites you're covering. Confirm processing hardware, setup, support, taxes and contract terms in the written quote.",
    aHi: "बिलिंग प्रति कैमरा प्रति माह होती है। कैमरों और साइटों की संख्या के आधार पर दर पूछें। प्रोसेसिंग हार्डवेयर, सेटअप, सहायता, कर और अनुबंध की शर्तें लिखित कोटेशन में जाँचें।",
  },
  {
    q: "How long does installation take?",
    qHi: "इंस्टॉलेशन में कितना समय लगता है?",
    a: "Installation timing depends on stream access, network readiness and processing hardware. Agree a rollout schedule after assessment, with time to tune zones and test alerts on your own footage.",
    aHi: "इंस्टॉलेशन का समय स्ट्रीम एक्सेस, नेटवर्क और प्रोसेसिंग हार्डवेयर पर निर्भर करता है। आकलन के बाद समय तय करें और अपनी फ़ुटेज पर ज़ोन तथा अलर्ट का परीक्षण करें।",
  },
  {
    q: "Which cameras and DVRs are compatible?",
    qHi: "कौन से कैमरे और DVR संगत हैं?",
    a: "An accessible, compatible RTSP stream is a useful starting point. The assessment checks the recorder model, codec, stream access, resolution and camera view; a phone viewing app alone does not establish compatibility.",
    aHi: "संगत RTSP स्ट्रीम एक शुरुआती आवश्यकता है। आकलन में रिकॉर्डर मॉडल, कोडेक, स्ट्रीम एक्सेस, रिज़ॉल्यूशन और कैमरे का दृश्य जाँचते हैं; फ़ोन ऐप अकेले संगतता का प्रमाण नहीं है।",
  },
  {
    q: "Does it work at night and in poor light?",
    qHi: "क्या यह रात में और कम रोशनी में काम करता है?",
    a: "Low-light suitability depends on usable footage, illumination, camera angle and the detection task. Include day and night footage in the pilot before accepting performance.",
    aHi: "कम रोशनी में परिणाम फ़ुटेज, रोशनी, कैमरा कोण और कार्य पर निर्भर करते हैं। परिणाम स्वीकार करने से पहले दिन और रात की फ़ुटेज पर परीक्षण करें।",
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
    a: "Camera-based attendance may suit your site after testing recognition, missed entries and exception handling. Run a pilot alongside your current records before replacing an existing attendance system.",
    aHi: "कैमरा अटेंडेंस अपनाने से पहले पहचान, छूटी एंट्री और अपवादों का परीक्षण करें। मौजूदा अटेंडेंस सिस्टम बदलने से पहले दोनों के रिकॉर्ड साथ मिलाकर जाँचें।",
  },
  {
    q: "How do I get started?",
    qHi: "मैं शुरुआत कैसे करूँ?",
    a: "Book a free demo or connect with a PGAK dealer near you. We'll assess your existing setup and recommend the right fit — and if your cameras aren't suitable, we'll tell you that too. No obligation.",
    aHi: "एक मुफ़्त डेमो बुक करें या अपने नज़दीकी PGAK डीलर से जुड़ें। हम आपके मौजूदा सेटअप का आकलन करेंगे और सही विकल्प सुझाएँगे — बिना किसी बाध्यता के।",
  },
];
