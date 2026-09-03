"use client";

import { useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { CAMERA_OPTIONS, HONEYPOT_FIELD, normalisePhone } from "@/lib/leads";
import { AUDIT_TOTAL_VALUE, CALLBACK_PROMISE } from "@/lib/audit";
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

export type QuickOffer = "audit" | "quote" | "checklist";

type Status = "idle" | "sending" | "done" | "fallback";

export default function QuickLead({
  cta = "hero-quick",
  offer = "audit",
}: {
  cta?: string;
  offer?: QuickOffer;
}) {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [retryable, setRetryable] = useState(true);
  const typed = useRef<LeadValues>({ phone: "", cameras: "" });

  const refRef = useRef<string | null>(null);
  if (refRef.current === null) refRef.current = mintRef();

  const camerasRequired = offer !== "checklist";

  const copy = {
    audit: {
      button: t("Get a free camera audit →", "मुफ़्त कैमरा ऑडिट पाएँ →"),
      micro: t(
        `Free audit worth ${AUDIT_TOTAL_VALUE} · we call within one working hour · no new hardware`,
        `${AUDIT_TOTAL_VALUE} मूल्य का मुफ़्त ऑडिट · एक कार्य-घंटे के भीतर कॉल · कोई नया हार्डवेयर नहीं`,
      ),
      doneTitle: t("Got it ✓", "मिल गया ✓"),
      doneBody: t(
        `${CALLBACK_PROMISE.en} Outside those hours, first thing next morning.`,
        `${CALLBACK_PROMISE.hi} उसके बाद अगली सुबह सबसे पहले।`,
      ),
      formName: "quick_audit_request",
    },
    quote: {
      button: t("Get my quote →", "मेरा कोटेशन पाएँ →"),
      micro: t(
        "Per camera per month on the cameras you own · your number on the call within one working hour",
        "आपके अपने कैमरों पर प्रति कैमरा प्रति माह · एक कार्य-घंटे के भीतर कॉल पर आपका आँकड़ा",
      ),
      doneTitle: t("Got it ✓", "मिल गया ✓"),
      doneBody: t(
        `${CALLBACK_PROMISE.en} You will have your per-camera number on that call. Want it sooner? Message us now.`,
        `${CALLBACK_PROMISE.hi} उसी कॉल पर आपको प्रति-कैमरा आँकड़ा मिलेगा। जल्दी चाहिए? अभी मैसेज करें।`,
      ),
      formName: "quick_quote_request",
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
    },
  }[offer];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const cameras = String(data.get("cameras") ?? "");
    typed.current = {
      phone,
      cameras,
      honeypot: String(data.get(HONEYPOT_FIELD) ?? ""),
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
        t("Roughly how many cameras do you have?", "आपके पास लगभग कितने कैमरे हैं?"),
      );
      return;
    }

    setError("");
    setStatus("sending");
    const out = await submitLead(typed.current, {
      ref: refRef.current!,
      cta,
      formName: copy.formName,
    });

    if (out.kind === "done") {
      setStatus("done");
      return;
    }
    if (out.kind === "fieldErrors") {
      setError(
        out.fieldErrors.phone ??
          out.fieldErrors.cameras ??
          t("Please check the number and try again.", "कृपया नंबर जाँचें और फिर कोशिश करें।"),
      );
      setStatus("idle");
      return;
    }
    setRetryable(out.retryable);
    setStatus("fallback");
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-[12px] border border-accent/30 bg-accent/[0.07] p-5"
      >
        <div className="font-display text-[1.35rem] text-accent">{copy.doneTitle}</div>
        <p className="mt-1.5 text-[0.95rem] text-ink-soft">{copy.doneBody}</p>
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
            className={offer === "checklist" ? "btn btn-ghost" : "btn btn-primary"}
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
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={
        offer === "checklist"
          ? t("Request the buying checklist", "ख़रीद चेकलिस्ट का अनुरोध")
          : offer === "quote"
            ? t("Request a quote", "कोटेशन का अनुरोध")
            : t("Request a free camera audit", "मुफ़्त कैमरा ऑडिट का अनुरोध")
      }
    >
      {/* minmax(0, …) so the inputs can shrink below their placeholder width
          and the button column keeps its full label instead of clipping. */}
      <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
        <label className="sr-only" htmlFor={`${cta}-phone`}>
          {t("Phone / WhatsApp number", "फ़ोन / WhatsApp नंबर")}
        </label>
        <input
          id={`${cta}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder={t("Phone / WhatsApp number", "फ़ोन / WhatsApp नंबर")}
          className="field-input"
        />
        <label className="sr-only" htmlFor={`${cta}-cameras`}>
          {t("How many cameras?", "कितने कैमरे?")}
        </label>
        <select
          id={`${cta}-cameras`}
          name="cameras"
          required={camerasRequired}
          defaultValue=""
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
        <button
          type="submit"
          data-cta={`${cta}-submit`}
          disabled={status === "sending"}
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
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-[0.84rem] text-danger">
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
        <p className="mt-2.5 text-[0.8rem] text-ink-faint">{copy.micro}</p>
      )}
    </form>
  );
}
