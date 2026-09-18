import Link from "next/link";
export default function NumbersStrip() {
  return <section className="sec sec-band"><div className="wrap">
    <h2 className="display text-[clamp(1.9rem,3.6vw,2.7rem)]">Measure performance on your own cameras</h2>
    <p className="mt-4 max-w-[70ch] text-ink-soft">Detection quality and alert speed depend on your scene, network and processing hardware. A site assessment should establish a baseline before you commit.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-3">{[
      ["Alert usefulness", "Review genuine events, missed detections and nuisance alerts against agreed zones and hours."],
      ["Attendance exceptions", "Check lighting, face visibility and missed entries; keep a review process for disputed records."],
      ["Deployment requirements", "Confirm compatible streams, processing hardware, connectivity and the total quoted cost."],
    ].map(([title,body])=><article key={title} className="card p-6"><h3 className="font-semibold">{title}</h3><p className="mt-3 text-ink-soft">{body}</p></article>)}</div>
    <Link href="/free-audit" data-cta="assessment-evidence" className="btn btn-primary mt-7">Get an AI CCTV assessment →</Link>
  </div></section>;
}
