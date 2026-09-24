"use client";

import { useRef, useState } from "react";

import { submitLead, mintRef, waFallbackHref, type LeadValues } from "@/lib/lead-client";
import {
  CAMERA_OPTIONS,
  HONEYPOT_FIELD,
  PROJECT_EXISTING,
  PROJECT_NEW,
  PROTECT_OPTIONS,
  normalisePhone,
} from "@/lib/leads";
import { BUSINESS } from "@/lib/seo";

/**
 * The homepage assessment request.
 *
 * ── Why every field the brief asked for is actually carried ──
 * The brief lists nine fields. The lead pipeline carried six of them, and the
 * three it did not — company, the customer's own requirement, and when they
 * want to be called — were the three most useful to the person who picks up
 * the phone. A form that asks "brief requirement" and then drops the answer on
 * the floor is worse than one that never asked: the customer has told you what
 * they need and you have thrown it away, and they find that out on the call.
 *
 * So lib/leads.ts, lib/leadRegister.ts and lib/lead-client.ts were extended to
 * carry all three, into the `company`, `requirement` and `message` columns that
 * the sales sheet already had sitting empty. Nothing in the Apps Script layout
 * had to change.
 *
 * ── Only the phone number is mandatory ──
 * Everything else is optional, and that is deliberate rather than lax. This
 * site's validation rule is that a phone number alone is a complete lead,
 * because the call collects the rest. Making eight fields required to request
 * a free assessment would lose the people who are on a phone at a gate.
 *
 * ── What it does not do ──
 * No claim of a response time, because nobody has committed to one. The
 * microcopy says we will review the requirement and get in touch, which is
 * what actually happens.
 */

const SITE_TYPES = PROTECT_OPTIONS;

const CONTACT_TIMES = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 8pm)",
  "Any time",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function AssessmentForm({
  cta = "home-assessment",
}: {
  cta?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState("");
  const [values, setValues] = useState<LeadValues | null>(null);
  // Minted once per form instance and reused on retries, so one person trying
  // twice is counted as one person — see the note in lib/lead-client.ts.
  const ref = useRef<string>(mintRef());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();

    const phone = get("phone");
    if (!normalisePhone(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number.");
      form.querySelector<HTMLInputElement>('input[name="phone"]')?.focus();
      return;
    }
    setPhoneError("");
    setStatus("sending");

    const payload: LeadValues = {
      phone,
      name: get("name"),
      company: get("company"),
      email: get("email"),
      location: get("city"),
      protecting: get("siteType"),
      project: get("project"),
      cameras: get("cameras"),
      requirement: get("requirement"),
      contactTime: get("contactTime"),
      honeypot: get(HONEYPOT_FIELD),
    };
    setValues(payload);

    const outcome = await submitLead(payload, {
      ref: ref.current,
      cta,
      formName: "home_assessment",
    });

    if (outcome.kind === "done") {
      setStatus("sent");
      return;
    }
    if (outcome.kind === "fieldErrors") {
      setStatus("idle");
      setPhoneError(
        outcome.fieldErrors.phone ??
          "Please check the details and try again.",
      );
      form.querySelector<HTMLInputElement>('input[name="phone"]')?.focus();
      return;
    }
    // "fallback": the request did not get through. Never silently swallow it —
    // hand the customer the two channels that do not depend on our server.
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div className="h-card" role="status" aria-live="polite">
        <h3>Thank you — we have your request.</h3>
        <p className="h-body">
          Our team will review what you have told us about the site and get in
          touch to discuss the practical next step. If it is urgent, call{" "}
          <a href={`tel:${BUSINESS.phoneE164}`} className="underline">
            {BUSINESS.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="assess-heading">
      <div className="h-form">
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Company name" name="company" autoComplete="organization" />

        <Field
          label="Mobile number"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          error={phoneError}
          placeholder="+91"
        />
        <Field label="Email address" name="email" type="email" autoComplete="email" />

        <Field label="City" name="city" autoComplete="address-level2" />

        <Select label="Site type" name="siteType" placeholder="Choose one">
          {SITE_TYPES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>

        <Select
          label="Existing CCTV or new installation?"
          name="project"
          placeholder="Choose one"
        >
          <option value={PROJECT_EXISTING}>{PROJECT_EXISTING}</option>
          <option value={PROJECT_NEW}>{PROJECT_NEW}</option>
        </Select>

        <Select label="Roughly how many cameras?" name="cameras" placeholder="Choose one">
          {CAMERA_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>

        <div className="h-field h-field--wide">
          <label htmlFor="assess-requirement">Brief requirement</label>
          <textarea
            id="assess-requirement"
            name="requirement"
            rows={4}
            placeholder="For example: 18 cameras across two gates and a stock room. Night coverage at the rear boundary is poor."
          />
        </div>

        <Select label="Preferred contact time" name="contactTime" placeholder="Any time">
          {CONTACT_TIMES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>

        {/* Hidden from people, reachable by bots. Not named "company" — that is
            a real field on this form now, and autofill would trip the trap on
            exactly the kind of buyer we want. See HONEYPOT_FIELD. */}
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />
      </div>

      <div className="h-actions">
        <button
          type="submit"
          className="h-btn h-btn--primary"
          data-cta={cta}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Request a free assessment"}
        </button>
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          className="h-btn h-btn--ghost"
          data-cta="home-assessment-call"
        >
          Call {BUSINESS.phone}
        </a>
      </div>

      {status === "error" && (
        <p className="h-note" role="alert">
          <strong style={{ color: "#a4341f" }}>
            That did not reach us.
          </strong>{" "}
          Nothing was lost — send the same details on{" "}
          <a
            href={values ? waFallbackHref(values) : BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            data-cta="home-assessment-wa-fallback"
          >
            WhatsApp
          </a>{" "}
          or call{" "}
          <a href={`tel:${BUSINESS.phoneE164}`} className="underline">
            {BUSINESS.phone}
          </a>
          .
        </p>
      )}

      <p className="h-note">
        Share the basics of your site. Our team will review your requirement and
        contact you to discuss the most practical next step. Only the mobile
        number is required — the rest helps us come prepared.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email";
  placeholder?: string;
}) {
  const id = `assess-${name}`;
  return (
    <div className="h-field">
      <label htmlFor={id}>
        {label}
        {required && (
          <>
            {" "}
            <span className="h-req" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${id}-error`} role="alert" className="h-note" style={{ color: "#a4341f" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function Select({
  label,
  name,
  placeholder,
  children,
}: {
  label: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}) {
  const id = `assess-${name}`;
  return (
    <div className="h-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} defaultValue="">
        <option value="">{placeholder}</option>
        {children}
      </select>
    </div>
  );
}
