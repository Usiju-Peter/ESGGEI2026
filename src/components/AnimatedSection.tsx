import { ReactNode } from "react";

export default function AnimatedSection({
  children,
  placeholderHeight = "150px"
}: {
  children: ReactNode;
  placeholderHeight?: string;
  key?: string | number;
}) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
