import type { ImgHTMLAttributes } from "react";
/** Responsive derivatives (480/768-960/1200) for layouts and the lightbox; the original is only the no-srcset fallback. */
export default function DocumentaryImage({
  src,
  sizes = "(max-width: 767px) 100vw, 50vw",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const name = src.split("/").pop()?.replace(".webp", "");
  return (
    <picture className="documentary-picture">
      <source
        type="image/avif"
        srcSet={[480, 768, 1200]
          .map((w) => `/images/gallery/previews/${name}-${w}.avif ${w}w`)
          .join(", ")}
        sizes={sizes}
      />
      <img
        {...props}
        src={src}
        srcSet={[480, 960, 1200]
          .map((w) => `/images/gallery/previews/${name}-${w}.webp ${w}w`)
          .join(", ")}
        sizes={sizes}
      />
    </picture>
  );
}
