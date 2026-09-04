import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy — PGAK",
  description:
    "How PGAK Innovations Pvt. Ltd. collects, uses and protects what you share, and how video from your cameras is handled.",
  path: "/privacy",
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

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 30 June 2026</p>

        <div className="mt-10 space-y-9 leading-relaxed text-ink-soft">
          <p>
            This Privacy Policy explains how{" "}
            <strong className="text-ink">PGAK Innovations Pvt. Ltd.</strong>{" "}
            (&ldquo;PGAK&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses,
            and protects your information when you visit{" "}
            <a className="text-accent underline" href="https://www.pgak.co.in">
              pgak.co.in
            </a>
            , contact us, or submit a form through our website or through our
            advertisements on Facebook and Instagram. PGAK provides AI-powered
            security software that works with a customer&rsquo;s existing CCTV
            cameras.
          </p>

          <Section title="Information we collect">
            <p>We collect only the information you choose to share with us, including:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Your name, phone number and (if provided) email address;</li>
              <li>Your city, locality or area, and your preferred time for a visit;</li>
              <li>
                Details you enter in our website enquiry form or in a lead form on
                Facebook / Instagram (for example, whether you already have CCTV);
              </li>
              <li>
                Basic, non-identifying usage data from our website (such as pages
                viewed) to help us improve it.
              </li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>To contact you about a demo, a free home or site visit, or your enquiry;</li>
              <li>To schedule and provide our AI-CCTV services and support;</li>
              <li>To connect you with a verified PGAK service partner near you;</li>
              <li>To improve our products, website and customer communication.</li>
            </ul>
          </Section>

          <Section title="How we share your information">
            <p>
              We do <strong className="text-ink">not</strong> sell your personal
              information. We share it only:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                with the verified PGAK dealer / service partner assigned to fulfil
                your request;
              </li>
              <li>
                with trusted service providers that help us operate (for example,
                secure hosting and our internal CRM), under appropriate safeguards;
              </li>
              <li>where required by applicable law.</li>
            </ul>
          </Section>

          <Section title="Advertising &amp; lead forms">
            <p>
              When you submit a lead form shown in our Facebook or Instagram ads,
              Meta shares the details you entered with us so we can respond. Your use
              of Facebook and Instagram is also governed by Meta&rsquo;s own privacy
              policy.
            </p>
          </Section>

          <Section title="Data security &amp; retention">
            <p>
              We use reasonable technical and organisational measures to protect your
              information and retain it only as long as needed to serve your request
              or as required by law.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              In line with India&rsquo;s Digital Personal Data Protection Act, you may
              ask us to access, correct or delete your personal information, or to stop
              contacting you, at any time. Just reach out using the details below.
            </p>
          </Section>

          <Section title="Contact us">
            <p>
              PGAK Innovations Pvt. Ltd.
              <br />
              Email:{" "}
              <a className="text-accent underline" href="mailto:Pgakinnovation@gmail.com">
                Pgakinnovation@gmail.com
              </a>
              <br />
              Website:{" "}
              <a className="text-accent underline" href="https://www.pgak.co.in">
                pgak.co.in
              </a>
            </p>
          </Section>

          <p className="text-sm text-ink-faint">
            We may update this Privacy Policy from time to time. The latest version
            will always be available on this page.
          </p>
        </div>
      </div>
    </main>
  );
}
