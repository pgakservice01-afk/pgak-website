import Icon, { type IconName } from "@/components/Icon";

/**
 * Blog post cover — shows the post's image when one is set in frontmatter
 * (image: "/insights/my-post.jpg" with the file in /public/insights/), or a
 * clean on-brand placeholder otherwise. Server component (no JS needed).
 */
const CATEGORY_ICON: Record<string, IconName> = {
  "camera setup": "camera",
  attendance: "face",
  "security basics": "shield-lock",
};

export default function PostCover({
  image,
  category,
  title,
  className,
}: {
  image?: string;
  category: string;
  title?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative aspect-[16/9] overflow-hidden ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title ?? ""}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  const ic = CATEGORY_ICON[category.toLowerCase()] ?? "radar";
  return (
    <div
      className={`relative grid aspect-[16/9] place-items-center overflow-hidden ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, rgba(62,216,224,0.16), transparent 60%)," +
          "linear-gradient(160deg,#12242c,#0a1014)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(159,180,182,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(159,180,182,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_12px_30px_-12px_#7cf5c4] transition-transform duration-300 group-hover:scale-105">
        <Icon name={ic} size={22} strokeWidth={1.7} />
      </span>
    </div>
  );
}
