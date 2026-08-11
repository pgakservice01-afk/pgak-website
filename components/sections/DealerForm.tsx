"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import IndiaNetwork from "@/components/illustrations/IndiaNetwork";
import { fbTrack } from "@/lib/fbpixel";
import { trackLead } from "@/lib/analytics";
import { HONEYPOT_FIELD, PROTECT_OPTIONS, type FieldErrors } from "@/lib/leads";

/**
 * Dealer / lead form.
 *
 * Posts to our own `/api/leads`, which relays to the ERP server-side. It used
 * to POST to the ERP directly from the browser carrying the webhook secret —
 * `NEXT_PUBLIC_*` is inlined at build time, so that secret was readable in the
 * public bundle. See app/api/leads/route.ts.
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
 *     For Indian SMB buyers that is where the conversation was heading anyway.
 *   - `ref` is minted once per form instance and reused on retry, so pressing
 *     "Try again" cannot create a second CRM row and a second dealer call.
 *   - Conversions fire ONCE, only on a server-confirmed CRM row. Meta optimises
 *     ad spend on these, so counting a failed or fake lead spends real money
 *     chasing people who do not exist.
 */

/** Prefilled human fallback, used whenever the automated path did not deliver. */
function whatsappHref(v: {
  name: string;
  phone: string;
  location: string;
  protecting: string;
}) {
  const text =
    `Hi PGAK, I tried the website form but it didn't go through.\n\n` +
    `Name: ${v.name}\nPhone: ${v.phone}\nCity: ${v.location}\n` +
    `Protecting: ${v.protecting}`;
  return `https://wa.me/916283993600?text=${encodeURIComponent(text)}`;
}

type Status = "idle" | "sending" | "done" | "fallback";

export default function DealerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [retryable, setRetryable] = useState(true);
  const [typed, setTyped] = useState({
    name: "",
    phone: "",
    location: "",
    protecting: PROTECT_OPTIONS[0] as string,
  });

  // Stable for the component's lifetime, so a retry reuses it and the ERP can
  // collapse the duplicate rather than assigning two dealers to one customer.
  const refRef = useRef<string | null>(null);
  if (refRef.current === null) {
    refRef.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Math.random()).slice(2);
  }
  const converted = useRef(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      protecting: String(data.get("protecting") ?? PROTECT_OPTIONS[0]),
    };
    setTyped(values);
    setStatus("sending");
    setFieldErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ""),
          ref: refRef.current,
        }),
        // Lets the request finish even if the customer navigates away the
        // instant after tapping — a real behaviour on slow mobile connections.
        keepalive: true,
      });

      const body = (await res.json().catch(() => ({}))) as {
        delivered?: boolean;
        fieldErrors?: FieldErrors;
        retryable?: boolean;
      };

      if (body.fieldErrors && Object.keys(body.fieldErrors).length > 0) {
        // Recoverable and the customer's to fix — not a failure state.
        setFieldErrors(body.fieldErrors);
        setStatus("idle");
        return;
      }

      if (res.ok && body.delivered) {
        setStatus("done");
        if (!converted.current) {
          converted.current = true;
          fbTrack("Lead", { content_name: "Dealer / Demo Request", currency: "INR" });
          trackLead("dealer_demo_request", {
            protecting: values.protecting,
            district: values.location,
          });
        }
        return;
      }

      setRetryable(body.retryable !== false);
      setStatus("fallback");
    } catch {
      // Network died before we got any answer. The lead may or may not have
      // landed; either way the customer keeps their data and a way through.
      setRetryable(true);
      setStatus("fallback");
    }
  }

  return (
    <section id="dealer" className="sec">
      <div className="wrap">
        <Reveal className="grid items-center gap-10 rounded-[22px] border border-line bg-panel p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow mb-4">Find a dealer</span>
            <h2 className="display mt-4 text-[clamp(1.8rem,3.5vw,2.5rem)]">
              Talk to a PGAK partner near you.
            </h2>
            <p className="mt-3.5 text-ink-soft">
              PGAK works through a trusted network of dealers across India. Tell
              us where you are and what you&rsquo;d like to protect — we&rsquo;ll
              connect you with a verified partner who can set everything up.
            </p>
            <div className="mt-7 flex items-center gap-7">
              <IndiaNetwork className="h-44 w-auto shrink-0" />
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-display text-[2.1rem] leading-none">PAN</div>
                  <div className="mt-1 text-[0.82rem] tracking-wide text-ink-faint">
                    India coverage
                  </div>
                </div>
                <div>
                  <div className="font-display text-[2.1rem] leading-none">Verified</div>
                  <div className="mt-1 text-[0.82rem] tracking-wide text-ink-faint">
                    Dealer network
                  </div>
                </div>
              </div>
            </div>
          </div>

          {status === "done" ? (
            <div className="py-8 text-center">
              <div className="mb-2 font-display text-2xl text-accent">
                Thank you ✓
              </div>
              <p className="text-ink-soft">
                A verified PGAK dealer will reach out shortly.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {/* The form is never unmounted on failure — everything typed
                  stays exactly where the customer left it. */}
              <form onSubmit={submit} className="flex flex-col gap-3.5">
                <Field label="Your name" error={fieldErrors.name}>
                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Full name"
                    className="field-input"
                  />
                </Field>
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
                <Field label="City / PIN code" error={fieldErrors.location}>
                  <input
                    required
                    type="text"
                    name="location"
                    placeholder="e.g. Ludhiana / 141001"
                    className="field-input"
                  />
                </Field>
                <Field label="What are you protecting?">
                  <select name="protecting" className="field-input">
                    {PROTECT_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>

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
                    ? "Sending…"
                    : status === "fallback"
                      ? "Try again"
                      : "Connect me with a dealer"}
                </button>
              </form>

              {status === "fallback" && (
                <div className="rounded-xl border border-danger/30 bg-danger/[0.06] p-4 text-center">
                  <p className="text-[0.9rem] font-semibold text-ink">
                    We couldn&rsquo;t submit that just now.
                  </p>
                  <p className="mt-1 text-[0.82rem] text-ink-soft">
                    Your details are still here
                    {retryable ? " — tap “Try again”, or reach us directly:" : " — reach us directly:"}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <a
                      href={whatsappHref(typed)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="dealer-form-whatsapp-fallback"
                      className="btn btn-primary"
                    >
                      Send on WhatsApp
                    </a>
                    <a
                      href="tel:+916283993600"
                      data-cta="dealer-form-call-fallback"
                      className="btn btn-ghost"
                    >
                      Call +91 62839 93600
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
      {error && <span className="text-[0.78rem] text-danger">{error}</span>}
    </label>
  );
}
