"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { fbTrack } from "@/lib/fbpixel";

/**
 * PGAK assistant — a free, guided chatbot (no AI backend, no API keys).
 * Visitors tap quick-reply chips; answers come from the site's real content
 * (pricing, compatibility, audit, demo) and anything deeper hands off to
 * WhatsApp — the channel Indian buyers actually convert on.
 *
 * Bilingual via useLang, theme-aware via the colour tokens, and positioned
 * bottom-left so it never collides with the WhatsApp button (desktop,
 * bottom-right) or the mobile action bar (bottom edge).
 *
 * To upgrade to a real AI brain later: replace answerFor() with a fetch to a
 * server route — the widget UI stays exactly the same.
 */
const WA_HREF = `https://wa.me/916283993600?text=${encodeURIComponent(
  "Hi PGAK! I have a question about making my cameras intelligent."
)}`;

type TopicId = "pricing" | "how" | "cameras" | "audit" | "demo" | "privacy";

type Topic = {
  id: TopicId;
  q: string;
  qHi: string;
  a: string;
  aHi: string;
  link?: { href: string; label: string; labelHi: string };
};

const TOPICS: Topic[] = [
  {
    id: "pricing",
    q: "💰 What does it cost?",
    qHi: "💰 कीमत क्या है?",
    a: "Billing is per camera per month, and we give you the exact rate on a call or WhatsApp once we know your camera count. It runs on the cameras you already own, so there's no new hardware to buy and no hidden fees.",
    aHi: "बिलिंग प्रति कैमरा प्रति माह होती है, और सही दर हम कॉल या WhatsApp पर बताते हैं — जब हमें आपके कैमरों की संख्या पता हो। यह आपके मौजूदा कैमरों पर चलता है, इसलिए कोई नया हार्डवेयर नहीं और कोई छिपी फ़ीस नहीं।",
    link: {
      href: "/pricing",
      label: "How pricing works →",
      labelHi: "मूल्य कैसे तय होता है →",
    },
  },
  {
    id: "how",
    q: "⚙️ How does it work?",
    qHi: "⚙️ यह कैसे काम करता है?",
    a: "Four steps: we connect your existing cameras to PGAK's AI layer, the AI learns your normal routine, detects unknown faces and unusual activity in under 3 seconds, and alerts your phone instantly with a snapshot.",
    aHi: "चार चरण: हम आपके मौजूदा कैमरों को PGAK की एआई लेयर से जोड़ते हैं, एआई आपकी दिनचर्या सीखता है, 3 सेकंड से कम में अनजान चेहरों और असामान्य गतिविधि की पहचान करता है, और स्नैपशॉट के साथ तुरंत आपके फ़ोन पर अलर्ट भेजता है।",
    link: { href: "/#how", label: "See the steps →", labelHi: "चरण देखें →" },
  },
  {
    id: "cameras",
    q: "📷 Will my cameras work?",
    qHi: "📷 क्या मेरे कैमरे चलेंगे?",
    a: "Almost certainly yes. PGAK works with CCTV, IP cameras and most DVR/NVR systems — no rip-and-replace. The free audit tells you exactly what your setup can do.",
    aHi: "लगभग निश्चित रूप से हाँ। PGAK सीसीटीवी, आईपी कैमरों और ज़्यादातर DVR/NVR सिस्टम के साथ काम करता है — कुछ भी बदलने की ज़रूरत नहीं। मुफ़्त ऑडिट बताता है कि आपका सेटअप क्या कर सकता है।",
    link: { href: "/free-audit", label: "Get the free audit →", labelHi: "मुफ़्त ऑडिट पाएँ →" },
  },
  {
    id: "audit",
    q: "🎁 What's the free audit?",
    qHi: "🎁 मुफ़्त ऑडिट क्या है?",
    a: "A ₹15,995-value AI readiness audit — free. We analyse your camera feeds remotely and send a clear report within 48 hours: placement scores, face-recognition readiness, blind spots and false-alarm analysis. Zero pressure to buy.",
    aHi: "₹15,995 मूल्य का एआई-रेडीनेस ऑडिट — बिल्कुल मुफ़्त। हम आपकी कैमरा फ़ीड का रिमोट विश्लेषण करते हैं और 48 घंटों में स्पष्ट रिपोर्ट भेजते हैं: प्लेसमेंट स्कोर, फ़ेस-रिकग्निशन रेडीनेस, ब्लाइंड स्पॉट और झूठे अलार्म का विश्लेषण। ख़रीदने का कोई दबाव नहीं।",
    link: { href: "/free-audit", label: "Claim it →", labelHi: "अभी पाएँ →" },
  },
  {
    id: "demo",
    q: "📞 Request a call back",
    qHi: "📞 कॉल-बैक का अनुरोध करें",
    a: "Leave your WhatsApp number and how many cameras you have. We call within one working hour (9 am–7 pm, Mon–Sat) and start with a free audit of your existing cameras — report within 48 hours.",
    aHi: "अपना WhatsApp नंबर और कैमरों की संख्या बताएँ। हम एक कार्य-घंटे के भीतर कॉल करते हैं (सुबह 9–शाम 7, सोम–शनि) और आपके मौजूदा कैमरों के मुफ़्त ऑडिट से शुरुआत करते हैं — रिपोर्ट 48 घंटों में।",
    link: { href: "/#dealer", label: "Request a call back →", labelHi: "कॉल-बैक का अनुरोध करें →" },
  },
  {
    id: "privacy",
    q: "🔒 Is my footage private?",
    qHi: "🔒 क्या मेरी फ़ुटेज निजी है?",
    a: "Yes. Your footage is protected with end-to-end encryption and stays fully under your control. Privacy is part of the design, not an afterthought.",
    aHi: "हाँ। आपकी फ़ुटेज एंड-टू-एंड एन्क्रिप्शन से सुरक्षित है और पूरी तरह आपके नियंत्रण में रहती है। निजता डिज़ाइन का हिस्सा है, बाद का ख़याल नहीं।",
  },
];

type Msg = { from: "bot" | "user"; text: string; link?: Topic["link"] };

/** Friendly robot mascot — headphones, glowing eyes, smile — in brand colours. */
function RobotFace({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* head */}
      <rect x="10" y="13" width="28" height="25" rx="9" fill="#04201a" />
      {/* headphone band */}
      <path
        d="M11 21a13 13 0 0 1 26 0"
        stroke="#04201a"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* ear cups */}
      <rect x="5.5" y="19" width="6" height="11" rx="3" fill="#04201a" />
      <rect x="36.5" y="19" width="6" height="11" rx="3" fill="#04201a" />
      <rect x="7" y="21" width="3" height="7" rx="1.5" fill="#7CF5C4" opacity="0.55" />
      <rect x="38" y="21" width="3" height="7" rx="1.5" fill="#7CF5C4" opacity="0.55" />
      {/* glowing eyes */}
      <circle cx="18.5" cy="24.5" r="4.4" fill="#7CF5C4" opacity="0.25" />
      <circle cx="29.5" cy="24.5" r="4.4" fill="#7CF5C4" opacity="0.25" />
      <circle cx="18.5" cy="24.5" r="2.9" fill="#7CF5C4" />
      <circle cx="29.5" cy="24.5" r="2.9" fill="#7CF5C4" />
      {/* smile */}
      <path
        d="M19.5 31c2.8 2.6 6.2 2.6 9 0"
        stroke="#7CF5C4"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* mic boom */}
      <path
        d="M37 30c1.5 2.5.5 5-2.5 6"
        stroke="#04201a"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="33.5" cy="36.5" r="2" fill="#04201a" />
    </svg>
  );
}

export default function ChatBot() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Greet once, the first time the panel opens.
  useEffect(() => {
    if (!open || seeded) return;
    setSeeded(true);
    setMessages([
      {
        from: "bot",
        text: t(
          "Namaste! 👋 I'm the PGAK assistant. What would you like to know?",
          "नमस्ते! 👋 मैं PGAK असिस्टेंट हूँ। आप क्या जानना चाहेंगे?",
        ),
      },
    ]);
  }, [open, seeded, t]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const ask = (topic: Topic) => {
    setMessages((m) => [...m, { from: "user", text: t(topic.q, topic.qHi) }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { from: "bot", text: t(topic.a, topic.aHi), link: topic.link },
      ]);
    }, 500);
  };

  return (
    <>
      {/* launcher bubble — bottom-left, clear of WhatsApp + mobile action bar */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("Chat with PGAK assistant", "PGAK असिस्टेंट से चैट करें")}
        aria-expanded={open}
        className="fixed bottom-20 left-4 z-[96] grid h-[52px] w-[52px] place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_12px_34px_-10px_rgb(var(--c-accent)/0.8)] transition-transform hover:scale-105 md:bottom-6 md:left-6"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <RobotFace size={32} />
        )}
        {!open && (
          <span className="absolute right-0 top-0 h-3 w-3 animate-pulseDot rounded-full bg-accent ring-2 ring-bg" />
        )}
      </button>

      {/* chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label={t("PGAK assistant", "PGAK असिस्टेंट")}
          className="pgak-fade fixed bottom-36 left-4 right-4 z-[96] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_40px_90px_-30px_#000] sm:right-auto sm:w-[360px] md:bottom-24 md:left-6"
        >
          {/* header */}
          <div className="flex items-center gap-3 border-b border-line bg-bg-2 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2">
              <RobotFace size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[0.92rem] font-semibold text-ink">
                {t("PGAK Assistant", "PGAK असिस्टेंट")}
              </div>
              <div className="flex items-center gap-1.5 text-[0.72rem] text-ink-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t("Online · replies instantly", "ऑनलाइन · तुरंत जवाब")}
              </div>
            </div>
          </div>

          {/* messages */}
          <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex"}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.88rem] leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-accent text-[#04201a]"
                      : "rounded-bl-md border border-line bg-bg-2 text-ink-soft"
                  }`}
                >
                  {m.text}
                  {m.link && (
                    <a
                      href={m.link.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 block font-semibold text-accent"
                    >
                      {t(m.link.label, m.link.labelHi)}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-bg-2 px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-ink-faint" />
                  <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-ink-faint [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-ink-faint [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* quick replies */}
          <div className="border-t border-line bg-bg-2 px-3 py-3">
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => ask(topic)}
                  className="rounded-full border border-line bg-panel px-3 py-1.5 text-[0.78rem] font-medium text-ink-soft transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {t(topic.q, topic.qHi)}
                </button>
              ))}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  fbTrack("Contact", { content_name: "Chatbot WhatsApp" })
                }
                className="rounded-full bg-[#25D366] px-3 py-1.5 text-[0.78rem] font-semibold text-[#062b1a]"
              >
                {t("💬 Talk to a human", "💬 इंसान से बात करें")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
