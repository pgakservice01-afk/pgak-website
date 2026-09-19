import ReferenceFilm from "@/components/ReferenceFilm";
export type EvidenceRecord = {
  id: string;
  title: string;
  kind: "Customer deployment" | "Lab test" | "Illustration";
  date: string;
  functionShown: string;
  conditions: string;
  limitations: string;
  transcript: string;
  approvedMedia?: { file: string; permissionReference: string };
};
/** Approved media is opt-in. A text-only record remains useful and crawlable. */
export default function Evidence({ record: r }: { record: EvidenceRecord }) {
  return (
    <article className="buyer-notice">
      <div className="evidence-meta">
        <span>{r.kind}</span>
        <span>{r.date}</span>
      </div>
      <h3>{r.title}</h3>
      <p className="mt-4">{r.functionShown}</p>
      {r.approvedMedia?.permissionReference && (
        <figure className="mt-6">
          <ReferenceFilm
            file={r.approvedMedia.file}
            label={r.title}
            captionId={`${r.id}-caption`}
          />
          <figcaption id={`${r.id}-caption`}>
            {r.kind}. {r.conditions}
          </figcaption>
        </figure>
      )}
      <dl className="mt-6">
        <dt className="font-semibold">Conditions</dt>
        <dd className="mb-4">{r.conditions}</dd>
        <dt className="font-semibold">Limitations</dt>
        <dd className="mb-4">{r.limitations}</dd>
        <dt className="font-semibold">Text description / transcript</dt>
        <dd>{r.transcript}</dd>
      </dl>
    </article>
  );
}
