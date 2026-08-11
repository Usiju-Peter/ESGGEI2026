import { ReactNode, useEffect, useRef, useState } from "react";

export default function AnimatedSection({
  children,
  placeholderHeight = "150px"
}: {
  children: ReactNode;
  placeholderHeight?: string;
  key?: string | number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full">
      {isVisible ? children : <div aria-hidden="true" style={{ minHeight: placeholderHeight }} />}
    </div>
  );
}
