import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service — PGAK",
  description:
    "The terms that govern PGAK's AI CCTV service: subscription, cancellation, acceptable use, video data handling, and liability.",
  path: "/terms",
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.6rem)] text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="text-[0.85rem] text-ink-faint underline underline-offset-4 hover:text-ink"
        >
          ← Back to pgak.co.in
        </Link>

        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3rem)] leading-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 21 August 2026</p>

        <div className="mt-10 space-y-9 leading-relaxed text-ink-soft">
          <Section title="1. Who we are">
            <p>
              These terms govern the use of the services provided by{" "}
              <strong className="text-ink">{BUSINESS.legalName}</strong>{" "}
              (&ldquo;PGAK&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) — AI video
              analytics that runs on your existing CCTV cameras, together with
              the mobile application, alerts and related support. By subscribing
              to or using the service you agree to these terms.
            </p>
          </Section>

          <Section title="2. The service">
            <p>
              PGAK adds detection intelligence (such as intruder alerts, face
              recognition, attendance and false-alarm filtering) to cameras and
              recorders you own. We do not supply or warrant the cameras,
              recorders, network or power at your site; the service depends on
              them working. Detection is probabilistic: it is designed to reduce
              risk and false alarms, not to guarantee that every event is
              detected. The service is an aid to your security arrangements, not
              a replacement for them or for insurance.
            </p>
          </Section>

          <Section title="3. Subscription, billing and cancellation">
            <p>
              The service is billed per camera per month at the rate shown on
              our <Link href="/pricing" className="text-accent underline underline-offset-4">pricing page</Link>{" "}
              or as agreed in your order. There is no lock-in: you may cancel
              with effect from the end of the current billing period, and the
              service simply stops. Fees already paid for a running period are
              not refunded. We may revise pricing with at least 30 days&rsquo;
              notice; a revision never applies retroactively.
            </p>
          </Section>

          <Section title="4. Your responsibilities">
            <p>
              You confirm that you are entitled to install monitoring on the
              premises concerned, and that you will comply with applicable law —
              including informing employees, residents or visitors about camera
              monitoring and, where face-recognition attendance is used,
              obtaining the consents your law and policies require. You are
              responsible for keeping your account credentials safe and for the
              accuracy of the camera and site details you provide.
            </p>
          </Section>

          <Section title="5. Video and data handling">
            <p>
              Video is processed on equipment at your premises wherever the
              deployment allows; face-recognition data is stored as mathematical
              templates rather than photographs. Details of what we collect and
              how it is protected are in the{" "}
              <Link href="/privacy" className="text-accent underline underline-offset-4">
                Privacy Policy
              </Link>
              , which forms part of these terms.
            </p>
          </Section>

          <Section title="6. Acceptable use">
            <p>
              The service may not be used to monitor spaces where the people
              observed have a reasonable expectation of privacy contrary to law,
              to harass or unlawfully surveil any person, or to attempt to
              reverse-engineer, resell or interfere with the service. We may
              suspend service for misuse after notifying you.
            </p>
          </Section>

          <Section title="7. Liability">
            <p>
              To the maximum extent permitted by law, PGAK&rsquo;s aggregate
              liability arising out of the service in any 12-month period is
              limited to the fees you paid for the service in that period, and
              we are not liable for indirect or consequential loss — including
              loss caused by events the system did not detect, or by failures of
              cameras, recorders, power or connectivity that we do not supply.
              Nothing in these terms limits liability that cannot be limited
              under applicable law.
            </p>
          </Section>

          <Section title="8. Governing law">
            <p>
              These terms are governed by the laws of India, and the courts at
              Ludhiana, Punjab have exclusive jurisdiction, subject to any
              mandatory consumer-protection rights you hold.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              {BUSINESS.legalName}
              <br />
              {BUSINESS.address.street}, {BUSINESS.address.area},{" "}
              {BUSINESS.address.locality}, {BUSINESS.address.region}{" "}
              {BUSINESS.address.postalCode}
              <br />
              Phone / WhatsApp: {BUSINESS.phone}
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
