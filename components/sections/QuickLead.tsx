"use client";

import { useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { CAMERA_OPTIONS, HONEYPOT_FIELD, normalisePhone } from "@/lib/leads";
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
 * The two-field ask that sits in the first screen: WhatsApp number and camera
 * count, one button.
 *
 * Why so little: the full form at #dealer asked five things and sat eighteen
 * sections down the homepage. For an Indian SMB buyer on a phone, two fields
 * in the first screen convert several times better — and camera count is the
 * one number the quote needs anyway. Name and city come on the call.
 *
 * Same invariants as the full form: inputs are uncontrolled and the form
 * stays mounted through every failure, so nothing typed is ever lost; one
 * `ref` per instance so retries cannot create a second CRM row.
 */
const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL ?? "").trim();

type Status = "idle" | "sending" | "done" | "fallback";

export default function QuickLead({ cta = "hero-quick" }: { cta?: string }) {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [retryable, setRetryable] = useState(true);
  const typed = useRef<LeadValues>({ phone: "", cameras: "" });

  const refRef = useRef<string | null>(null);
  if (refRef.current === null) refRef.current = mintRef();

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
    if (!cameras) {
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
      formName: "quick_audit_request",
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
        <div className="font-display text-[1.35rem] text-accent">
          {t("Got it ✓", "मिल गया ✓")}
        </div>
        <p className="mt-1.5 text-[0.95rem] text-ink-soft">
          {t(
            "We call within one working hour, 9 am to 7 pm, Monday to Saturday. Outside those hours, first thing next morning.",
            "हम एक कार्य-घंटे के भीतर कॉल करते हैं — सुबह 9 से शाम 7, सोमवार से शनिवार। उसके बाद अगली सुबह सबसे पहले।",
          )}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href={waContinueHref(typed.current, refRef.current!)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`${cta}-whatsapp-continue`}
            className="btn btn-primary"
          >
            {t("Message us on WhatsApp now", "अभी WhatsApp पर मैसेज करें")}
          </a>
          {BOOKING_URL && (
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
      aria-label={t("Request a free camera audit", "मुफ़्त कैमरा ऑडिट का अनुरोध")}
    >
      {/* minmax(0, …) so the inputs can shrink below their placeholder width
          and the button column keeps its full label instead of clipping. */}
      <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
        <label className="sr-only" htmlFor="ql-phone">
          {t("Phone / WhatsApp number", "फ़ोन / WhatsApp नंबर")}
        </label>
        <input
          id="ql-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder={t("Phone / WhatsApp number", "फ़ोन / WhatsApp नंबर")}
          className="field-input"
        />
        <label className="sr-only" htmlFor="ql-cameras">
          {t("How many cameras?", "कितने कैमरे?")}
        </label>
        <select
          id="ql-cameras"
          name="cameras"
          required
          defaultValue=""
          className="field-input"
        >
          <option value="" disabled>
            {t("How many cameras?", "कितने कैमरे?")}
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
              : t("Get a free camera audit →", "मुफ़्त कैमरा ऑडिट पाएँ →")}
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
        <p className="mt-2.5 text-[0.8rem] text-ink-faint">
          {t(
            "Free audit worth ₹15,995 · we call within one working hour · no new hardware",
            "₹15,995 मूल्य का मुफ़्त ऑडिट · एक कार्य-घंटे के भीतर कॉल · कोई नया हार्डवेयर नहीं",
          )}
        </p>
      )}
    </form>
  );
}
