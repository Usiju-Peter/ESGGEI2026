import DocumentaryImage from "../components/DocumentaryImage";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHero from "../components/PageHero";
import { galleryImages } from "../data";
import { useSEO } from "../lib/seo";

export default function Gallery() {
  useSEO(
    "Gallery",
    "Explore moments from EarthSprings Global Grace Empowerment Initiative's outreach and community work.",
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isLightboxOpen = activeIndex !== null;
  const featuredIndex = 24;
  const featuredImage = galleryImages[featuredIndex];

  const closeLightbox = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };
  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length,
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const controls = document.querySelectorAll<HTMLButtonElement>(
          '[role="dialog"] button',
        );
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isLightboxOpen]);

  const activeImage = activeIndex === null ? null : galleryImages[activeIndex];

  return (
    <>
      <PageHero
        badge="03 / A visual record"
        title="Gallery"
        subtitle="Moments from our work, outreach and community."
      />

      <section className="section section-white gallery-feature">
        <div className="site-container grid items-center gap-6 md:grid-cols-2 md:gap-10">
          <button
            type="button"
            onClick={() => setActiveIndex(featuredIndex)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-beige text-left transition-shadow duration-150 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/40"
            aria-label={`Open featured image: ${featuredImage.alt}`}
          >
            <DocumentaryImage
              fetchPriority="high"
              src={featuredImage.src}
              alt={featuredImage.alt}
              width={featuredImage.width}
              height={featuredImage.height}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </button>
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="section-title">Recent Outreach</h2>
            <p className="mt-4 text-muted">
              Guruku Gbayi Community, Karu LGA, Nasarawa State &middot; June
              2026
            </p>
            <Link
              className="button button-text mt-3"
              to="/projects/guruku-gbayi-outreach"
            >
              Read the outreach report
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="documentary-grid">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group gallery-tile"
                aria-labelledby={`gallery-label-${index}`}
              >
                <DocumentaryImage
                  sizes={
                    index % 7 === 0
                      ? "(max-width: 767px) calc(100vw - 40px), (max-width: 1099px) 66vw, 50vw"
                      : "(max-width: 767px) calc((100vw - 56px) / 2), (max-width: 1099px) 33vw, 25vw"
                  }
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span
                  id={`gallery-label-${index}`}
                  className="gallery-tile-caption"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{image.alt}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          aria-describedby="gallery-caption"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div
            className="relative flex h-full w-full max-w-6xl items-center justify-center"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="absolute right-0 top-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-charcoal shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/70"
              aria-label="Close image viewer"
            >
              <X aria-hidden="true" size={22} />
            </button>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-charcoal shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/70 md:left-3"
              aria-label="Previous image"
            >
              <ChevronLeft aria-hidden="true" size={25} />
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              className="max-h-[calc(100%_-_5rem)] max-w-full rounded-xl object-contain"
            />
            <p
              id="gallery-caption"
              className="absolute bottom-0 max-w-3xl rounded-lg bg-charcoal/90 px-4 py-2 text-center text-sm text-white"
            >
              {activeImage.alt}
            </p>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-charcoal shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/70 md:right-3"
              aria-label="Next image"
            >
              <ChevronRight aria-hidden="true" size={25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
