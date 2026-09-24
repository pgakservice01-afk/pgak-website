"use client";

import { useRef, useState } from "react";

import { BUSINESS_TYPES, MONTHLY_VOLUME, TERMS } from "@/lib/partners";
import { BUSINESS } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import { trackConversion } from "@/lib/analytics";
import { normalisePhone } from "@/lib/leads";

/**
 * The partner application.
 *
 * ── Why this does not POST to /api/leads ──
 * A dealer is not a customer lead, and the codebase already decided this: see
 * the comment in app/areas-we-serve/page.tsx ("Dealer applications go to their
 * own WhatsApp thread, never into the customer enquiry form below") and
 * `categoryOf()` in lib/leadRegister.ts. Routing an application through the
 * lead pipeline would drop a dealer into the CRM's call-them-within-the-hour
 * queue, assign them a dealer of their own, and — worst — report them to Meta
 * as a `Lead` conversion, so ad spend would learn to go looking for partners
 * while we were paying it to find customers.
 *
 * So this composes a WhatsApp message instead. One tap and the whole
 * application is already typed into the thread; the owner answers a person
 * rather than reading a CRM row. Email and phone sit beside it for anyone who
 * does not run their business on WhatsApp.
 *
 * ── The behaviour that matters ──
 * The inputs are uncontrolled and the form is never unmounted, so nothing an
 * applicant typed can vanish. WhatsApp is opened by the applicant's own click
 * on a real `<a href>` — never by `window.open()` after an await — because iOS
 * Safari blocks a programmatically opened window, and a blocked popup here is
 * indistinguishable from a broken form.
 */

type Values = {
  company: string;
  person: string;
  phone: string;
  city: string;
  type: string;
  volume: string;
};

const EMPTY: Values = { company: "", person: "", phone: "", city: "", type: "", volume: "" };

function readForm(form: HTMLFormElement): Values {
  const d = new FormData(form);
  const get = (k: string) => String(d.get(k) ?? "").trim();
  return {
    company: get("company"),
    person: get("person"),
    phone: get("phone"),
    city: get("city"),
    type: get("type"),
    volume: get("volume"),
  };
}

/** The message the applicant sends us. Readable in the thread, nothing lost. */
function applicationText(v: Values): string {
  return [
    "Hi PGAK, I'd like to apply for the PGAK Partner Program.",
    "",
    v.company ? `Company: ${v.company}` : "",
    v.person ? `Name: ${v.person}` : "",
    v.phone ? `Phone: ${v.phone}` : "",
    v.city ? `City / area: ${v.city}` : "",
    v.type ? `Business: ${v.type}` : "",
    v.volume ? `Cameras a month: ${v.volume}` : "",
  ]
    .filter((line, i) => line !== "" || i === 1)
    .join("\n");
}

export default function PartnerApply({ id = "apply" }: { id?: string }) {
  const [sent, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const applyRef = useRef<HTMLAnchorElement>(null);
  // Only read for the confirmation panel's retry links, which render after a
  // successful apply — the live href is always built at click time instead.
  const lastValues = useRef<Values>(EMPTY);

  /**
   * The click that opens WhatsApp. Everything happens synchronously inside the
   * gesture: validate, rewrite the href, then let the browser navigate.
   */
  function apply(e: React.MouseEvent<HTMLAnchorElement>) {
    const form = formRef.current;
    if (!form) return;
    const v = readForm(form);
    lastValues.current = v;

    // Only the phone is enforced, and only for shape: it is the one field
    // without which we cannot answer the application at all. Everything else
    // is asked because it saves a round trip, not because it gates entry.
    if (!normalisePhone(v.phone)) {
      e.preventDefault();
      setPhoneError("Please enter a valid 10-digit Indian phone number.");
      form.querySelector<HTMLInputElement>('input[name="phone"]')?.focus();
      return;
    }

    e.currentTarget.href = waHref(applicationText(v));
    setPhoneError("");
    setSent(true);
    trackConversion("partner_application", {
      form_name: "partner_application",
      cta: "partner-apply-whatsapp",
      business_type: v.type || "not given",
      monthly_volume: v.volume || "not given",
    });
  }

  return (
    <section id={id} className="sec">
      <div className="wrap">
        <div className="grid items-start gap-10 rounded-[22px] border border-accent/25 bg-panel p-8 sm:p-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow mb-4">Applications are read by a human</span>
            <h2 className="display mt-4 text-[clamp(1.8rem,3.5vw,2.5rem)]">
              Apply for your territory.
            </h2>
            <p className="mt-3.5 text-ink-soft">
              Five fields, about two minutes. It opens a WhatsApp message with
              your answers already written — press send and we reply with
              whether your belt is open. If it is not, we tell you that instead
              of stringing you along for a month.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {[
                `${TERMS.joiningFee} to join — no fee, no stock, no deposit`,
                `${TERMS.partnersPerBelt === 1 ? "One partner" : `${TERMS.partnersPerBelt} partners`} per pincode belt`,
                `A live demo account on your phone within ${TERMS.demoReadyHours} hours of approval`,
                "You keep selling whatever hardware you sell today",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-[0.95rem] text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/[0.08] text-[0.7rem] text-accent"
                  >
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3.5">
            <form
              ref={formRef}
              data-partner-form="partner_application"
              aria-label="Apply for the PGAK Partner Program"
              // Enter inside a field routes to the same anchor, so the keyboard
              // path and the tap path cannot diverge.
              onSubmit={(e) => {
                e.preventDefault();
                applyRef.current?.click();
              }}
              noValidate
              className="flex flex-col gap-3.5"
            >
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Company name">
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="e.g. Sharma Security Systems"
                    className="field-input"
                  />
                </Field>
                <Field label="Your name">
                  <input
                    type="text"
                    name="person"
                    autoComplete="name"
                    placeholder="Full name"
                    className="field-input"
                  />
                </Field>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Phone / WhatsApp" error={phoneError}>
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
                <Field label="City / area you cover">
                  <input
                    type="text"
                    name="city"
                    autoComplete="address-level2"
                    placeholder="e.g. Ludhiana / 141003"
                    className="field-input"
                  />
                </Field>
              </div>

              <Field label="What is your business today?">
                <select name="type" defaultValue="" className="field-input">
                  <option value="">Choose one</option>
                  {BUSINESS_TYPES.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Cameras you install in a month">
                <select name="volume" defaultValue="" className="field-input">
                  <option value="">Roughly how many?</option>
                  {MONTHLY_VOLUME.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <a
                ref={applyRef}
                // Placeholder href only: `apply()` rewrites it from the live
                // form before the browser follows it.
                href={waHref("Hi PGAK, I'd like to apply for the PGAK Partner Program.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={apply}
                data-cta="partner-apply-whatsapp"
                className="btn btn-primary btn-wrap mt-1.5 w-full"
              >
                Apply for my territory →
              </a>
              <p className="text-center text-[0.78rem] text-ink-faint">
                Your application comes straight to us. It is not added to any
                customer enquiry list, and we do not sell or share it.
              </p>
            </form>

            {sent && (
              <div
                role="status"
                className="rounded-[12px] border border-accent/30 bg-accent/[0.06] p-4 text-center"
              >
                <p className="text-[0.92rem] font-semibold text-ink">
                  WhatsApp should have opened with your application ✓
                </p>
                <p className="mt-1 text-[0.85rem] text-ink-soft">
                  Press send in that thread and we will come back to you about
                  your belt. If nothing opened, reach us directly:
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <a
                    href={waHref(applicationText(lastValues.current))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="partner-apply-whatsapp-retry"
                    className="btn btn-primary"
                  >
                    Open WhatsApp again
                  </a>
                  <a
                    href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(
                      "PGAK Partner Program application",
                    )}&body=${encodeURIComponent(applicationText(lastValues.current))}`}
                    data-cta="partner-apply-email"
                    className="btn btn-ghost"
                  >
                    Email it instead
                  </a>
                </div>
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  data-cta="partner-apply-call"
                  className="mt-3 inline-block text-[0.85rem] text-accent underline underline-offset-4"
                >
                  Or call {BUSINESS.phone}
                </a>
              </div>
            )}
          </div>
        </div>
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
      <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">{label}</span>
      {children}
      {error && (
        <span role="alert" className="text-[0.78rem] text-danger">
          {error}
        </span>
      )}
    </label>
  );
}
