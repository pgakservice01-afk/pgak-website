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
        Share your phone number, city and camera count. We will clarify the
        intended use case and agree assessment scope and timing with you. Do not
        submit camera credentials or footage.
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
      {/* The consent line lives inside QuickLead, under its button. A second
          copy here printed the same sentence twice. */}
    </section>
  );
}
