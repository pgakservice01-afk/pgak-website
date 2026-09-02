"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";
import {
  CAMERA_OPTIONS,
  HONEYPOT_FIELD,
  PROTECT_OPTIONS,
  normalisePhone,
  type FieldErrors,
} from "@/lib/leads";
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
 * The full lead form, embedded at `#dealer` on every commercial page.
 *
 * Since 2026-09-03 it sells ONE thing, the same thing every button on the site
 * promises: a free audit of the cameras the visitor already has. It used to
 * say "Find a dealer" under buttons that said "free demo" and "free audit" —
 * the visitor asked for one thing and was offered another.
 *
 * Fields: phone and camera band are all it needs; segment, name and city are
 * optional and the call collects what is missing. The segment is a set of
 * chips with NO default — the old pre-selected dropdown filed 24 of 33 leads
 * as "Home / Apartment".
 *
 * Posts through lib/lead-client.ts → `/api/leads` → ERP, with attribution.
 *
 * ── The behaviour that matters ──
 * A lead here is worth thousands of rupees, so **nothing in this component may
 * destroy one**. Concretely:
 *
 *   - The inputs are UNCONTROLLED and the <form> stays mounted through every
 *     failure, so whatever the customer typed is still on screen. Only a
 *     confirmed success swaps it for the thank-you panel.
 *   - Any non-success offers WhatsApp and phone, prefilled with what they
 *     typed, so a customer facing an outage is one tap from reaching a human.
 *   - `ref` is minted once per form instance and reused on retry, so pressing
 *     "Try again" cannot create a second CRM row and a second dealer call.
 *   - Conversions fire ONCE, only on a server-confirmed CRM row (in
 *     lib/lead-client.ts). Meta optimises ad spend on these.
 */
const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL ?? "").trim();

type Status = "idle" | "sending" | "done" | "fallback";

export default function DealerForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [retryable, setRetryable] = useState(true);
  const typed = useRef<LeadValues>({ phone: "", cameras: "" });

  // Stable for the component's lifetime, so a retry reuses it and the ERP can
  // collapse the duplicate rather than assigning two dealers to one customer.
  const refRef = useRef<string | null>(null);
  if (refRef.current === null) refRef.current = mintRef();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const values: LeadValues = {
      phone: String(data.get("phone") ?? "").trim(),
      cameras: String(data.get("cameras") ?? ""),
      protecting: String(data.get("protecting") ?? ""),
      name: String(data.get("name") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      honeypot: String(data.get(HONEYPOT_FIELD) ?? ""),
    };
    typed.current = values;

    // Validate in the browser BEFORE any network trip, with the same
    // `normalisePhone` the server uses — one rulebook, two checkpoints. The
    // server still re-validates (a curl can skip this file entirely); this
    // check exists so a customer with a typo hears about it instantly instead
    // of after a round trip, and so junk never even leaves the device.
    const clientErrors: FieldErrors = {};
    if (!normalisePhone(values.phone)) {
      clientErrors.phone = t(
        "Please enter a valid 10-digit Indian phone number.",
        "कृपया सही 10 अंकों का भारतीय फ़ोन नंबर लिखें।",
      );
    }
    if (!values.cameras) {
      clientErrors.cameras = t(
        "Roughly how many cameras do you have?",
        "आपके पास लगभग कितने कैमरे हैं?",
      );
    }
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("idle");
      return;
    }

    setStatus("sending");
    setFieldErrors({});

    const out = await submitLead(values, {
      ref: refRef.current!,
      cta: "dealer-form",
      formName: "dealer_demo_request",
    });

    if (out.kind === "done") {
      setStatus("done");
      return;
    }
    if (out.kind === "fieldErrors") {
      // Recoverable and the customer's to fix — not a failure state.
      setFieldErrors(out.fieldErrors);
      setStatus("idle");
      return;
    }
    setRetryable(out.retryable);
    setStatus("fallback");
  }

  return (
    <section id="dealer" className="sec">
      <div className="wrap">
        <Reveal className="grid items-center gap-10 rounded-[22px] border border-line bg-panel p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow mb-4">
              {t("Free — no obligation", "मुफ़्त — कोई बाध्यता नहीं")}
            </span>
            <h2 className="display mt-4 text-[clamp(1.8rem,3.5vw,2.5rem)]">
              {t("Get your free camera audit.", "अपने कैमरों का मुफ़्त ऑडिट पाएँ।")}
            </h2>
            <p className="mt-3.5 text-ink-soft">
              {t(
                "Tell us your WhatsApp number and how many cameras you have. We call within one working hour, 9 am to 7 pm Monday to Saturday, and send your audit report within 48 hours — on the cameras you already own.",
                "अपना WhatsApp नंबर और कैमरों की संख्या बताएँ। हम एक कार्य-घंटे के भीतर कॉल करते हैं (सुबह 9 से शाम 7, सोमवार से शनिवार) और 48 घंटों में ऑडिट रिपोर्ट भेजते हैं — आपके मौजूदा कैमरों पर।",
              )}
            </p>

            {/* Desktop only: on a phone this block pushed the first field a
                whole screen below the heading. */}
            <div className="mt-8 hidden gap-8 lg:flex">
              <div>
                <div className="font-display text-[2rem] leading-none">₹15,995</div>
                <div className="mt-1.5 text-[0.82rem] tracking-wide text-ink-faint">
                  {t("Audit value — yours free", "ऑडिट मूल्य — आपके लिए मुफ़्त")}
                </div>
              </div>
              <div>
                <div className="font-display text-[2rem] leading-none">1 hr</div>
                <div className="mt-1.5 text-[0.82rem] tracking-wide text-ink-faint">
                  {t("Call-back, working hours", "कॉल-बैक, कार्य-घंटों में")}
                </div>
              </div>
              <div>
                <div className="font-display text-[2rem] leading-none">48 h</div>
                <div className="mt-1.5 text-[0.82rem] tracking-wide text-ink-faint">
                  {t("Report in your hands", "रिपोर्ट आपके हाथ में")}
                </div>
              </div>
            </div>
          </div>

          {status === "done" ? (
            <div role="status" className="py-6 text-center">
              <div className="mb-2 font-display text-2xl text-accent">
                {t("Got it ✓", "मिल गया ✓")}
              </div>
              <p className="mx-auto max-w-[40ch] text-ink-soft">
                {t(
                  "We call within one working hour, 9 am to 7 pm, Monday to Saturday. Outside those hours, first thing next morning.",
                  "हम एक कार्य-घंटे के भीतर कॉल करते हैं — सुबह 9 से शाम 7, सोमवार से शनिवार। उसके बाद अगली सुबह सबसे पहले।",
                )}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <a
                  href={waContinueHref(typed.current, refRef.current!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="dealer-form-whatsapp-continue"
                  className="btn btn-primary"
                >
                  {t("Message us on WhatsApp now", "अभी WhatsApp पर मैसेज करें")}
                </a>
                {BOOKING_URL && (
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="dealer-form-book-slot"
                    className="btn btn-ghost"
                  >
                    {t("Pick a 15-minute slot", "15 मिनट का स्लॉट चुनें")}
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {/* The form is never unmounted on failure — everything typed
                  stays exactly where the customer left it. */}
              <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
                <Field label="Phone / WhatsApp" error={fieldErrors.phone}>
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91"
                    className="field-input"
                  />
                </Field>
                <Field label={t("How many cameras?", "कितने कैमरे?")} error={fieldErrors.cameras}>
                  <select name="cameras" required defaultValue="" className="field-input">
                    <option value="" disabled>
                      {t("Choose a range", "एक रेंज चुनें")}
                    </option>
                    {CAMERA_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o === "Not sure"
                          ? t("Not sure yet", "अभी पक्का नहीं")
                          : `${o} ${t("cameras", "कैमरे")}`}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Segment chips. No default: a blank is recorded as
                    "Not specified", never as an answer the customer did not give. */}
                <fieldset className="flex flex-col gap-1.5">
                  <legend className="text-[0.78rem] uppercase tracking-wide text-ink-faint">
                    {t("What are you protecting?", "आप क्या सुरक्षित कर रहे हैं?")}{" "}
                    <span className="normal-case tracking-normal">
                      ({t("optional", "वैकल्पिक")})
                    </span>
                  </legend>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {PROTECT_OPTIONS.map((o) => (
                      <label key={o}>
                        <input
                          type="radio"
                          name="protecting"
                          value={o}
                          className="chip-input sr-only"
                        />
                        <span className="chip-choice">{o}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field label={`${t("Your name", "आपका नाम")} (${t("optional", "वैकल्पिक")})`}>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder={t("Full name", "पूरा नाम")}
                      className="field-input"
                    />
                  </Field>
                  <Field label={`${t("City / PIN code", "शहर / पिन कोड")} (${t("optional", "वैकल्पिक")})`}>
                    <input
                      type="text"
                      name="location"
                      autoComplete="address-level2"
                      placeholder="e.g. Ludhiana / 141001"
                      className="field-input"
                    />
                  </Field>
                </div>

                {/* Honeypot. Hidden from people and assistive tech, reachable
                    by naive bots. Named so no password manager autofills it —
                    see HONEYPOT_FIELD. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
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

                <button
                  type="submit"
                  data-cta="dealer-form-submit"
                  disabled={status === "sending"}
                  className="btn btn-primary mt-1.5 w-full disabled:opacity-60"
                >
                  {status === "sending"
                    ? t("Sending…", "भेज रहे हैं…")
                    : status === "fallback"
                      ? t("Try again", "फिर कोशिश करें")
                      : t("Get my free audit →", "मेरा मुफ़्त ऑडिट पाएँ →")}
                </button>
                <p className="text-center text-[0.78rem] text-ink-faint">
                  {t(
                    "No spam, no new hardware, no pressure to buy anything.",
                    "कोई स्पैम नहीं, कोई नया हार्डवेयर नहीं, कुछ ख़रीदने का कोई दबाव नहीं।",
                  )}
                </p>
              </form>

              {status === "fallback" && (
                <div className="rounded-[10px] border border-danger/30 bg-danger/[0.06] p-4 text-center">
                  <p className="text-[0.9rem] font-semibold text-ink">
                    {t("We couldn't submit that just now.", "अभी यह भेजा नहीं जा सका।")}
                  </p>
                  <p className="mt-1 text-[0.82rem] text-ink-soft">
                    {retryable
                      ? t(
                          "Your details are still here — tap “Try again”, or reach us directly:",
                          "आपकी जानकारी यहीं है — “फिर कोशिश करें” दबाएँ, या सीधे संपर्क करें:",
                        )
                      : t("Your details are still here — reach us directly:", "आपकी जानकारी यहीं है — सीधे संपर्क करें:")}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <a
                      href={waFallbackHref(typed.current)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="dealer-form-whatsapp-fallback"
                      className="btn btn-primary"
                    >
                      {t("Send on WhatsApp", "WhatsApp पर भेजें")}
                    </a>
                    <a
                      href={TEL_HREF}
                      data-cta="dealer-form-call-fallback"
                      className="btn btn-ghost"
                    >
                      {t("Call", "कॉल करें")} {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">
        {label}
      </span>
      {children}
      {error && (
        <span role="alert" className="text-[0.78rem] text-danger">
          {error}
        </span>
      )}
    </label>
  );
}
