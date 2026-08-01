"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import IndiaNetwork from "@/components/illustrations/IndiaNetwork";
import { fbTrack } from "@/lib/fbpixel";
import { trackLead } from "@/lib/analytics";

/**
 * Dealer / lead form — posts to the PGAK ERP leads webhook, exactly as the
 * original static site did. Configure these in `.env.local`:
 *
 *   NEXT_PUBLIC_ERP_ENDPOINT=https://erp.pgak.co.in/api/leads/inbound
 *   NEXT_PUBLIC_WEBHOOK_SECRET=your-secret
 *
 * Note: anything NEXT_PUBLIC_* is visible in the browser bundle — same as the
 * original inline script. Treat the webhook secret as low-sensitivity / rotate
 * it, or move lead submission behind a server route if you need it hidden.
 */
const ERP_ENDPOINT =
  process.env.NEXT_PUBLIC_ERP_ENDPOINT ?? "REPLACE_WITH_YOUR_ERP_URL/api/leads/inbound";
const WEBHOOK_SECRET =
  process.env.NEXT_PUBLIC_WEBHOOK_SECRET ?? "REPLACE_WITH_YOUR_WEBHOOK_SECRET";

const PROTECT_OPTIONS = [
  "Home / Apartment",
  "Shop / Retail",
  "Office",
  "Warehouse / Industrial",
  "Multiple sites",
];

type Status = "idle" | "sending" | "done" | "error";

export default function DealerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      district: String(data.get("location") ?? "").trim(),
      email: "", // form doesn't collect email — admin captures later
      message: `Protecting: ${data.get("protecting")} | Submitted: ${new Date().toISOString()}`,
      source: `Website (${typeof window !== "undefined" ? window.location.hostname : "pgak.co.in"})`,
    };

    try {
      const res = await fetch(ERP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": WEBHOOK_SECRET,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus("done");
      // Meta Pixel conversion — lets the ad engine optimise spend toward people
      // who actually request a dealer/demo.
      fbTrack("Lead", {
        content_name: "Dealer / Demo Request",
        currency: "INR",
      });
      // GA4 / GTM conversion. Fires only on a successful POST, so the metric
      // counts leads that reached the ERP rather than buttons that were clicked.
      trackLead("dealer_demo_request", {
        protecting: String(data.get("protecting") ?? ""),
        district: payload.district,
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
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
            <form onSubmit={submit} className="flex flex-col gap-3.5">
              <Field label="Your name">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="field-input"
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="+91"
                  className="field-input"
                />
              </Field>
              <Field label="City / PIN code">
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
              <button
                type="submit"
                data-cta="dealer-form-submit"
                disabled={status === "sending"}
                className="btn btn-primary mt-1.5 w-full disabled:opacity-60"
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "error"
                    ? "Try again"
                    : "Connect me with a dealer"}
              </button>
              {status === "error" && (
                <p className="text-center text-[0.82rem] text-danger">
                  Sorry, something went wrong — please call us or try again.
                  {error ? ` (${error})` : ""}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">
        {label}
      </span>
      {children}
    </label>
  );
}
