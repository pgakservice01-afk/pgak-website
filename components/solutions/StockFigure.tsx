import type { StockPhoto } from "@/lib/solutions";

/**
 * A stock photograph with its credit and a plain statement of what it is not.
 *
 * Every stock picture on a solution page goes through here so the caption
 * cannot be forgotten: a photograph of a factory floor beside "PPE kit
 * detection" reads as a customer unless the page says otherwise, and this site
 * has had to take down pictures that implied exactly that.
 */
export default function StockFigure({
  photo,
  sizes,
  priority = false,
  className = "",
}: {
  photo: StockPhoto;
  sizes: string;
  /** The hero photo is the LCP candidate; section photos load lazily. */
  priority?: boolean;
  className?: string;
}) {
  const [small, large] = photo.widths;
  const src = (w: number) => `/stock/${photo.file}-${w}.webp`;

  return (
    <figure className={className}>
      {/* Pre-sized WebP files with srcSet rather than next/image: no runtime
          image transformations to count against the hosting plan. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src(large)}
        srcSet={`${src(small)} ${small}w, ${src(large)} ${large}w`}
        sizes={sizes}
        width={large}
        height={Math.round((large * 2) / 3)}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="aspect-[3/2] w-full rounded-[18px] border border-line object-cover"
      />
      <figcaption className="mt-2 text-[0.78rem] leading-snug text-ink-soft">
        Stock photo:{" "}
        <a
          href={photo.sourceUrl}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="underline decoration-line underline-offset-2 hover:text-accent"
        >
          {photo.credit} / Pexels
        </a>
        . Illustrative — not a PGAK site or customer.
      </figcaption>
    </figure>
  );
}
