import QuickLead from "@/components/sections/QuickLead";
export default function DealerForm({
  variant = "default",
  cityHint = "",
}: {
  variant?: string;
  /** Passed by the city pages so the city field shows a local example. */
  cityHint?: string;
}) {
  return (
    <section id="dealer" className="buyer-wrap buyer-section">
      <h2 className="text-3xl font-semibold">Discuss your camera setup</h2>
      <p className="my-6 max-w-[65ch] text-ink-soft">
        Start with your phone number. Camera count is optional. We will clarify
        the intended use case and agree assessment scope and timing with you. Do
        not submit camera credentials or footage.
      </p>
      <QuickLead
        cta={`project-${variant}`}
        cityHint={cityHint}
        context={
          variant === "attendance"
            ? "Attendance evaluation requested; enrolment, privacy, retention and human correction require review."
            : "Technical camera assessment requested."
        }
      />
      <p className="text-sm mt-4">
        By submitting, you ask PGAK to contact you about this enquiry.{" "}
        <a href="/privacy" className="underline">
          Privacy notice
        </a>
        .
      </p>
    </section>
  );
}
