import { graph } from "@/lib/schema";

/**
 * Renders structured data as a single @graph block. Server component — the
 * JSON is in the initial HTML, so crawlers that don't execute JS still see it.
 */
export default function JsonLd({
  nodes,
  id,
}: {
  nodes: Record<string, unknown>[];
  id?: string;
}) {
  return (
    <script
      type="application/ld+json"
      {...(id ? { id } : {})}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph(nodes)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
