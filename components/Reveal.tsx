import type { ReactNode } from "react";
/** Content is visible in the initial HTML, including with JavaScript disabled. */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  return <Tag className={className}>{children}</Tag>;
}
