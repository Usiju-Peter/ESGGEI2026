import type { ImgHTMLAttributes } from "react";
/** Responsive derivatives for page layouts; the complete original remains available. */
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
        srcSet={`/images/gallery/previews/${name}-480.webp 480w, /images/gallery/previews/${name}-960.webp 960w, ${src} ${props.width || 1200}w`}
        sizes={sizes}
      />
    </picture>
  );
}
