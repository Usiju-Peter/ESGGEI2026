import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHero from "../components/PageHero";
import { galleryImages } from "../data";
import { useSEO } from "../lib/seo";

export default function Gallery() {
  useSEO("Gallery", "Explore moments from EarthSprings Global Grace Empowerment Initiative's outreach and community work.");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isLightboxOpen = activeIndex !== null;
  const featuredImage = galleryImages[0];

  const closeLightbox = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length
    );
  };
  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
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
        title="Gallery"
        subtitle="Moments from our work, outreach and community."
        image="/images/gallery/outreach-03.webp"
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-beige text-left shadow-sm transition-shadow duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/40"
            aria-label={`Open featured image: ${featuredImage.alt}`}
          >
            <img
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terra">Featured</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-forest">Recent Outreach</h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal/75">
              Guruku Gbayi Community, Karu LGA, Nasarawa State &middot; June 2026
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="columns-2 gap-5 md:gap-7 lg:columns-3 2xl:columns-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] bg-beige text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/40 md:mb-6"
                aria-label={`Open image ${index + 1}: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/10" />
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
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="relative flex h-full w-full max-w-6xl items-center justify-center" onMouseDown={(event) => event.stopPropagation()}>
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
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />
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
