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
    a: "The quote depends on the cameras, analytics, site conditions and deployment scope. Ask for software or subscription, processing hardware, installation, pilot, support and taxes to be itemised, with exclusions stated. Share your use case and camera count to start the assessment.",
    aHi: "कोटेशन कैमरों, एनालिटिक्स, साइट की परिस्थितियों और काम के दायरे पर निर्भर करता है। सॉफ़्टवेयर या सब्सक्रिप्शन, प्रोसेसिंग हार्डवेयर, इंस्टॉलेशन, पायलट, सपोर्ट और टैक्स का अलग विवरण तथा शामिल न होने वाली चीज़ें लिखित में लें। आकलन शुरू करने के लिए अपनी ज़रूरत और कैमरों की संख्या बताएँ।",
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
    a: "Start with one event and the person who will review it. PGAK checks camera and stream suitability, agrees the processing setup, and evaluates detection and alert delivery on your site. The pilot records useful alerts, false alerts, missed events and delivery time before rollout.",
    aHi: "एक घटना और उसकी समीक्षा करने वाले व्यक्ति से शुरुआत करें। PGAK कैमरे और स्ट्रीम की उपयुक्तता जाँचता है, प्रोसेसिंग सेटअप तय करता है और आपकी साइट पर पहचान तथा अलर्ट पहुँचने का परीक्षण करता है। रोलआउट से पहले पायलट में उपयोगी अलर्ट, गलत अलर्ट, छूटी घटनाएँ और अलर्ट पहुँचने का समय दर्ज किया जाता है।",
    link: {
      href: "/platform/deployment",
      label: "Plan the setup →",
      labelHi: "सेटअप की योजना देखें →",
    },
  },
  {
    id: "cameras",
    q: "📷 Will my cameras work?",
    qHi: "📷 क्या मेरे कैमरे चलेंगे?",
    a: "We need to check your exact camera or recorder model, firmware, authorised stream and view. A readable stream alone does not establish suitability for the intended event. The assessment identifies which equipment can be reused and what changes or processing hardware may be needed. Do not send camera passwords here.",
    aHi: "आपके कैमरे या रिकॉर्डर का सही मॉडल, फ़र्मवेयर, अधिकृत स्ट्रीम और कैमरे का दृश्य जाँचना ज़रूरी है। केवल स्ट्रीम पढ़ पाने से वह आपकी ज़रूरत के लिए उपयुक्त साबित नहीं होती। आकलन में तय होगा कि कौन से उपकरण दोबारा इस्तेमाल हो सकते हैं और किन बदलावों या प्रोसेसिंग हार्डवेयर की ज़रूरत है। यहाँ कैमरे के पासवर्ड न भेजें।",
    link: {
      href: "/platform/compatibility",
      label: "Check compatibility requirements →",
      labelHi: "अनुकूलता की ज़रूरतें देखें →",
    },
  },
  {
    id: "audit",
    q: "🎁 What's the free audit?",
    qHi: "🎁 मुफ़्त ऑडिट क्या है?",
    a: "Start with a camera-readiness assessment. We discuss your intended use case, camera setup and site conditions, then agree what needs checking and the assessment timing. No obligation to buy.",
    aHi: "कैमरा रेडीनेस आकलन से शुरू करें। हम आपकी ज़रूरत, कैमरा सेटअप और साइट की परिस्थितियों पर चर्चा करके जाँच का दायरा और समय तय करेंगे। ख़रीदने की कोई बाध्यता नहीं है।",
    link: { href: "/free-audit", label: "Claim it →", labelHi: "अभी पाएँ →" },
  },
  {
    id: "demo",
    q: "📞 Request a call back",
    qHi: "📞 कॉल-बैक का अनुरोध करें",
    a: "Share your phone number, city and camera count through the enquiry form. Our team will contact you to clarify the use case and agree the next step, assessment scope and timing.",
    aHi: "पूछताछ फ़ॉर्म में अपना फ़ोन नंबर, शहर और कैमरों की संख्या बताएँ। हमारी टीम आपकी ज़रूरत समझकर अगला कदम और आकलन का दायरा व समय तय करने के लिए संपर्क करेगी।",
    link: { href: "/#dealer", label: "Request a call back →", labelHi: "कॉल-बैक का अनुरोध करें →" },
  },
  {
    id: "privacy",
    q: "🔒 Is my footage private?",
    qHi: "🔒 क्या मेरी फ़ुटेज निजी है?",
    a: "Before any footage is shared, agree who may access it, where it is processed, what leaves the site and how long records are retained. Ask for the security controls for your proposed deployment in writing. Do not send passwords or footage in this chat.",
    aHi: "फ़ुटेज साझा करने से पहले तय करें कि उसे कौन देख सकता है, उसकी प्रोसेसिंग कहाँ होगी, कौन सी जानकारी साइट से बाहर जाएगी और रिकॉर्ड कितने समय तक रखे जाएँगे। अपने प्रस्तावित सेटअप के सुरक्षा नियंत्रण लिखित में माँगें। इस चैट में पासवर्ड या फ़ुटेज न भेजें।",
    link: {
      href: "/platform/deployment",
      label: "Review deployment responsibilities →",
      labelHi: "सेटअप की ज़िम्मेदारियाँ देखें →",
    },
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
