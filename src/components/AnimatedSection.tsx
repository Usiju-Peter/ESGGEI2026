import type { ReactNode } from "react";

/**
 * Keep all meaningful content in the initial DOM and in prerendered HTML.
 * Motion effects can still be applied within children. Lazy-mounting entire
 * sections behind an IntersectionObserver made them invisible to SSR and
 * could delay both accessibility and search indexing.
 */
export default function AnimatedSection({
  children
}: {
  children: ReactNode;
  placeholderHeight?: string;
  key?: string | number;
}) {
  return <div className="w-full">{children}</div>;
}
