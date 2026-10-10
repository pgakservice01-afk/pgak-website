import type { VisualRecord } from "@/lib/visuals";
import styles from "./WorkflowDiagram.module.css";

/**
 * An explanatory workflow, drawn as an ordered list so every step is real,
 * readable text. Arrows are CSS decoration; on a phone the steps stack
 * vertically instead of shrinking. The visible caption always says it is an
 * illustrative workflow, not a product screen or a result.
 */
export default function WorkflowDiagram({
  visual,
  showMeta = true,
  showCta = true,
}: {
  visual: VisualRecord;
  showMeta?: boolean;
  showCta?: boolean;
}) {
  const steps = visual.steps ?? [];
  const captionId = `${visual.id}-caption`;
  return (
    <figure className={styles.figure} aria-labelledby={captionId} data-visual={visual.id}>
      <ol className={styles.steps} aria-label={visual.alt}>
        {steps.map((s) => (
          <li key={s} className={styles.step}>
            {s}
          </li>
        ))}
      </ol>
      <figcaption id={captionId} className={styles.caption}>
        <span className={styles.label}>Diagram</span>
        {visual.caption}
      </figcaption>
      {showMeta && (visual.benefit || visual.limit) && (
        <p className={styles.meta}>
          {visual.benefit} {visual.limit && <span>Limit: {visual.limit}</span>}
        </p>
      )}
      {showCta && (
        <a href={visual.cta.href} className={styles.cta} data-cta={`diagram-${visual.id}`}>
          {visual.cta.label} →
        </a>
      )}
    </figure>
  );
}
