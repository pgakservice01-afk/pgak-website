/** Assessment scope is agreed after technical review. No invented value or SLA. */
export const AUDIT_ITEMS = [
  {
    t: "Camera and recorder inventory",
    tHi: "कैमरा और रिकॉर्डर विवरण",
    d: "Model, firmware, stream and placement requirements.",
    dHi: "मॉडल, फ़र्मवेयर और स्ट्रीम की जाँच।",
  },
  {
    t: "Use-case and site requirements",
    tHi: "साइट की आवश्यकताएँ",
    d: "Lighting, processing, network and operating conditions.",
    dHi: "रोशनी, प्रोसेसिंग और नेटवर्क।",
  },
  {
    t: "Pilot acceptance plan",
    tHi: "पायलट मूल्यांकन",
    d: "Define useful, false and missed events and response ownership.",
    dHi: "उपयोगी और छूटे हुए इवेंट की समीक्षा।",
  },
] as const;
export const CALLBACK_PROMISE = {
  en: "We will contact you to agree the next step.",
  hi: "अगला कदम तय करने के लिए हम संपर्क करेंगे।",
} as const;
