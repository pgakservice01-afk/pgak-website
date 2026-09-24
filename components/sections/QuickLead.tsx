"use client";

import LeadDetails from "@/components/b2b/LeadDetails";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { CAMERA_OPTIONS, HONEYPOT_FIELD, normalisePhone } from "@/lib/leads";
import { CALLBACK_PROMISE } from "@/lib/audit";
import {
  PHONE_DISPLAY,
  TEL_HREF,
  mintRef,
  submitLead,
  waContinueHref,
  waFallbackHref,
  type LeadValues,
} from "@/lib/lead-client";

/**
 * The two-field ask: WhatsApp number and camera count, one button.
 *
 * Why so little: the full form at #dealer asked five things and sat eighteen
 * sections down the homepage. For an Indian SMB buyer on a phone, two fields
 * in the first screen convert several times better — and camera count is the
 * one number the quote needs anyway. Name and city come on the call.
 *
 * Three offers share the component so every page asks for the same two
 * things but promises the right one:
 *   - audit     → the free camera audit (hero, /free-audit)
 *   - quote     → a per-camera number on the call (/pricing)
 *   - checklist → the printable buying checklist, delivered on the spot
 *                 (guides). Camera count is optional here: it is a lighter ask.
 *
 * Same invariants as the full form: inputs are uncontrolled and the form
 * stays mounted through every failure, so nothing typed is ever lost; one
 * `ref` per instance so retries cannot create a second CRM row.
 */
const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL ?? "").trim();
export const CHECKLIST_PATH = "/cctv-buying-checklist";

export type QuickOffer = "audit" | "quote" | "checklist" | "demo";

type Status = "idle" | "sending" | "done" | "fallback";

/**
 * `spotlight` wraps the form in a lit, accent-bordered card with a badge and
 * a one-line promise above the fields. On the dark hero the bare inputs read
 * as part of the background; the card makes the ask the brightest object in
 * the first screen. Purely presentational — same fields, same submit path.
 */
export default function QuickLead({
  cta = "hero-quick",
  offer = "audit",
  spotlight = false,
  context = "",
  initialCameras = "",
  cityHint = "",
}: {
  cta?: string;
  offer?: QuickOffer;
  spotlight?: boolean;
  context?: string;
  initialCameras?: string;
  /** Shown as an example in the city placeholder, never as a prefilled value:
   *  a city page tells us where the reader is looking, not where their site
   *  is, and a value they did not choose would be recorded as if they had. */
  cityHint?: string;
}) {
  const { t } = useLang();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [status, setStatus] = useState<Status>("idle");
  const [receiptToken, setReceiptToken] = useState<string>();
  const [error, setError] = useState("");
  const [retryable, setRetryable] = useState(true);
  const typed = useRef<LeadValues>({ phone: "", cameras: "" });

  const refRef = useRef<string | null>(null);
  if (refRef.current === null) refRef.current = mintRef();

  const camerasRequired = false;
  const pending = useRef(false);

  const copy = {
    demo: {
      button: t("Request my demo →", "डेमो का अनुरोध करें →"),
      micro: t(
        "We will contact you to arrange a demo. No obligation.",
        "डेमो का समय तय करने के लिए हम आपसे संपर्क करेंगे।",
      ),
      doneTitle: t("Demo request received ✓", "डेमो का अनुरोध प्राप्त हुआ ✓"),
      doneBody: t(
        "Our team will contact you to agree a suitable time and understand your camera setup.",
        "हमारी टीम समय और कैमरा सेटअप के लिए आपसे संपर्क करेगी।",
      ),
      formName: "demo_request",
      badge: "Demo",
      head: "See PGAK for your site",
      sub: "Two fields to get started",
    },
    audit: {
      button: t("Request a camera check →", "मुफ़्त कैमरा ऑडिट पाएँ →"),
      micro: t(
        `Request a camera assessment. Timing and scope agreed on the call.`,
        `मुफ़्त कैमरा आकलन · एक कार्य-घंटे के भीतर कॉल · कैमरा संगतता की जाँच`,
      ),
      doneTitle: t("Got it ✓", "मिल गया ✓"),
      doneBody: t(
        `Your enquiry has been received. Our team will contact you to agree the next step.`,
        CALLBACK_PROMISE.hi,
      ),
      formName: "quick_audit_request",
      badge: t("Free", "मुफ़्त"),
      head: t(`Camera readiness assessment`, `कैमरा रेडीनेस आकलन`),
      sub: t(
        `Phone required · camera count optional`,
        `फ़ोन आवश्यक · कैमरा संख्या वैकल्पिक`,
      ),
    },
    quote: {
      button: t("Get my quote →", "मेरा कोटेशन पाएँ →"),
      micro: t(
        "Request a written scope covering software, hardware, setup, support and terms.",
        "आपके अपने कैमरों पर प्रति कैमरा प्रति माह · एक कार्य-घंटे के भीतर कॉल पर आपका आँकड़ा",
      ),
      doneTitle: t("Got it ✓", "मिल गया ✓"),
      doneBody: t(
        `Your quote request has been received. We will confirm requirements before preparing a written scope.`,
        CALLBACK_PROMISE.hi,
      ),
      formName: "quick_quote_request",
      badge: t("Quote", "कोटेशन"),
      head: t("Your site-specific quote", "आपका प्रति-कैमरा आँकड़ा, उसी दिन"),
      sub: t("2 fields, 20 seconds", "2 फ़ील्ड, 20 सेकंड"),
    },
    checklist: {
      button: t("Send me the checklist →", "मुझे चेकलिस्ट भेजें →"),
      micro: t(
        "Free printable checklist · no spam · one WhatsApp message to ask if it helped",
        "मुफ़्त प्रिंट करने योग्य चेकलिस्ट · कोई स्पैम नहीं · बस एक WhatsApp मैसेज यह पूछने के लिए कि मदद मिली या नहीं",
      ),
      doneTitle: t("Here is your checklist ✓", "यह रही आपकी चेकलिस्ट ✓"),
      doneBody: t(
        "Open it below and save it as a PDF from the page. We will also send it on WhatsApp.",
        "नीचे खोलें और पेज से PDF सेव करें। हम इसे WhatsApp पर भी भेजेंगे।",
      ),
      formName: "checklist_request",
      badge: t("Free", "मुफ़्त"),
      head: t(
        "Printable CCTV buying checklist",
        "प्रिंट करने योग्य CCTV ख़रीद चेकलिस्ट",
      ),
      sub: t("Delivered on the spot", "तुरंत मिलती है"),
    },
  }[offer];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending.current) return;
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const cameras = String(data.get("cameras") ?? "");
    const location = String(data.get("location") ?? "").trim();
    typed.current = {
      phone,
      cameras,
      location,
      context,
      honeypot: String(data.get(HONEYPOT_FIELD) ?? ""),
      protecting: offer === "demo" ? "Product demo requested" : undefined,
    };

    if (!normalisePhone(phone)) {
      setError(
        t(
          "Please enter a valid 10-digit Indian phone number.",
          "कृपया सही 10 अंकों का भारतीय फ़ोन नंबर लिखें।",
        ),
      );
      return;
    }
    if (camerasRequired && !cameras) {
      setError(
        t(
          "Roughly how many cameras do you have?",
          "आपके पास लगभग कितने कैमरे हैं?",
        ),
      );
      return;
    }

    setError("");
    pending.current = true;
    setStatus("sending");
    const out = await submitLead(typed.current, {
      ref: refRef.current!,
      cta,
      formName: copy.formName,
    });

    pending.current = false;
    if (out.kind === "done") {
      setReceiptToken(out.receiptToken);
      setStatus("done");
      return;
    }
    if (out.kind === "fieldErrors") {
      setError(
        out.fieldErrors.phone ??
          out.fieldErrors.cameras ??
          t(
            "Please check the number and try again.",
            "कृपया नंबर जाँचें और फिर कोशिश करें।",
          ),
      );
      setStatus("idle");
      return;
    }
    setRetryable(out.retryable);
    setStatus("fallback");
  }

  const wrap = (node: React.ReactNode) =>
    spotlight ? (
      <div className="lead-spotlight" data-spotlight={cta}>
        <div className="lead-spotlight-head">
          <span className="lead-spotlight-badge">{copy.badge}</span>
          <span className="lead-spotlight-title">{copy.head}</span>
          <span className="lead-spotlight-sub">{copy.sub}</span>
        </div>
        {node}
      </div>
    ) : (
      node
    );

  if (status === "done") {
    return wrap(
      <div
        role="status"
        className="rounded-[12px] border border-accent/30 bg-accent/[0.07] p-5"
      >
        <div className="font-display text-[1.35rem] text-accent">
          {copy.doneTitle}
        </div>
        <p className="mt-1.5 text-[0.95rem] text-ink-soft">{copy.doneBody}</p>
        {receiptToken && (
          <LeadDetails receiptRef={refRef.current!} token={receiptToken} />
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {offer === "checklist" && (
            <a
              href={CHECKLIST_PATH}
              data-cta={`${cta}-open-checklist`}
              className="btn btn-primary"
            >
              {t("Open the checklist", "चेकलिस्ट खोलें")}
            </a>
          )}
          <a
            href={waContinueHref(typed.current, refRef.current!)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`${cta}-whatsapp-continue`}
            className={
              offer === "checklist" ? "btn btn-ghost" : "btn btn-primary"
            }
          >
            {t("Message us on WhatsApp now", "अभी WhatsApp पर मैसेज करें")}
          </a>
          {BOOKING_URL && offer !== "checklist" && (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`${cta}-book-slot`}
              className="btn btn-ghost"
            >
              {t("Pick a 15-minute slot", "15 मिनट का स्लॉट चुनें")}
            </a>
          )}
        </div>
      </div>,
    );
  }

  return wrap(
    <form
      method="post"
      action="/api/leads"
      data-lead-form={copy.formName}
      onSubmit={onSubmit}
      noValidate
      aria-label={
        offer === "demo"
          ? t("Request a demo", "डेमो का अनुरोध करें")
          : offer === "checklist"
            ? t("Request the buying checklist", "ख़रीद चेकलिस्ट का अनुरोध")
            : offer === "quote"
              ? t("Request a quote", "कोटेशन का अनुरोध")
              : t("Request a free camera audit", "मुफ़्त कैमरा ऑडिट का अनुरोध")
      }
    >
      <noscript>
        <p>
          To arrange this enquiry without JavaScript,{" "}
          <a href="tel:+916283993600">call +91 62839 93600</a> or{" "}
          <a href="https://wa.me/916283993600">contact PGAK on WhatsApp</a>.
        </p>
      </noscript>
      {/* minmax(0, …) so the inputs can shrink below their placeholder width
          and the button column keeps its full label instead of clipping. */}
      <div className="quick-fields">
        <label htmlFor={`${cta}-phone`}>
          {t("Phone / WhatsApp number", "फ़ोन / WhatsApp नंबर")}
          <input
            id={`${cta}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${cta}-error` : undefined}
            placeholder={t("Phone / WhatsApp number", "फ़ोन / WhatsApp नंबर")}
            className="field-input"
          />
        </label>
        {/* Optional, and last of the three, because the b2b form's whole
            argument is that a phone number is enough to start. But the city
            is what routes the enquiry to a dealer, and asking costs one
            field: without it routing has to guess from the page, which is
            wrong for every visitor who is not enquiring about where they
            happen to be reading. */}
        <label htmlFor={`${cta}-location`}>
          {t("City (optional)", "शहर (वैकल्पिक)")}
          <input
            id={`${cta}-location`}
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder={
              cityHint
                ? t(`City — e.g. ${cityHint}`, `शहर — जैसे ${cityHint}`)
                : t("City (optional)", "शहर (वैकल्पिक)")
            }
            className="field-input"
          />
        </label>
        <label htmlFor={`${cta}-cameras`}>
          {t("How many cameras?", "कितने कैमरे?")}
          <select
            id={`${cta}-cameras`}
            name="cameras"
            required={camerasRequired}
            key={initialCameras}
            defaultValue={initialCameras}
            className="field-input"
          >
            <option value="" disabled={camerasRequired}>
              {camerasRequired
                ? t("How many cameras?", "कितने कैमरे?")
                : t("How many cameras? (optional)", "कितने कैमरे? (वैकल्पिक)")}
            </option>
            {CAMERA_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o === "Not sure"
                  ? t("Not sure yet", "अभी पक्का नहीं")
                  : `${o} ${t("cameras", "कैमरे")}`}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          data-cta={`${cta}-submit`}
          disabled={!hydrated || status === "sending"}
          className="btn btn-primary whitespace-nowrap disabled:opacity-60"
        >
          {status === "sending"
            ? t("Sending…", "भेज रहे हैं…")
            : status === "fallback"
              ? t("Try again", "फिर कोशिश करें")
              : copy.button}
        </button>
      </div>

      {/* Honeypot — see HONEYPOT_FIELD in lib/leads.ts. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {error && (
        <p
          id={`${cta}-error`}
          role="alert"
          className="mt-2 text-[0.84rem] text-danger"
        >
          {error}
        </p>
      )}

      {status === "fallback" ? (
        <div className="mt-3 rounded-[10px] border border-danger/30 bg-danger/[0.06] p-3.5 text-[0.88rem]">
          <p className="font-semibold text-ink">
            {t("We couldn't send that just now.", "अभी यह भेजा नहीं जा सका।")}
          </p>
          <p className="mt-0.5 text-ink-soft">
            {retryable
              ? t(
                  "Your number is still here — tap “Try again”, or reach us directly:",
                  "आपका नंबर यहीं है — “फिर कोशिश करें” दबाएँ, या सीधे संपर्क करें:",
                )
              : t("Reach us directly:", "सीधे संपर्क करें:")}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <a
              href={waFallbackHref(typed.current)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`${cta}-whatsapp-fallback`}
              className="btn btn-primary !min-h-0 !px-4 !py-2 !text-[0.85rem]"
            >
              {t("Send on WhatsApp", "WhatsApp पर भेजें")}
            </a>
            <a
              href={TEL_HREF}
              data-cta={`${cta}-call-fallback`}
              className="btn btn-ghost !min-h-0 !px-4 !py-2 !text-[0.85rem]"
            >
              {t("Call", "कॉल करें")} {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      ) : (
        <p className="mt-2.5 text-[0.8rem] text-ink-faint">
          {copy.micro} By submitting, you ask PGAK to contact you about this
          enquiry.{" "}
          <a href="/privacy" className="underline">
            Privacy notice
          </a>
          .
        </p>
      )}
    </form>,
  );
}
