import DocumentaryImage from "./DocumentaryImage";
import { Link, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { featuredProject } from "../data";

export function ActionLink({
  variant = "primary",
  className = "",
  ...props
}: LinkProps & { variant?: "primary" | "secondary" | "light" | "text" }) {
  return (
    <Link {...props} className={`button button-${variant} ${className}`} />
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {children && <div className="section-description">{children}</div>}
    </div>
  );
}
export function CallToAction({
  title = "Help shape the next chapter.",
  text = "Bring your time, expertise or support to work that responds to community priorities.",
  label = "Partner With Us",
}: {
  title?: string;
  text?: string;
  label?: string;
}) {
  return (
    <section className="section cta-section">
      <div className="site-container cta-layout">
        <div>
          <h2 className="section-title">{title}</h2>
          <p>{text}</p>
        </div>
        <ActionLink to="/partner" variant="light">
          {label}
          <ArrowRight aria-hidden="true" size={18} />
        </ActionLink>
      </div>
    </section>
  );
}
export function ProjectFeature() {
  return (
    <article className="project-feature">
      <figure>
        <DocumentaryImage
          src="/images/gallery/outreach-25.webp"
          alt="EarthSprings team and community leaders gathered at the Guruku Gbayi outreach"
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
        <figcaption>Guruku Gbayi Community · Nasarawa State</figcaption>
      </figure>
      <div className="project-feature-copy">
        <p className="eyebrow">
          Documented outreach ·{" "}
          <time dateTime="2026-06-27">{featuredProject.date}</time>
        </p>
        <h2 className="section-title">{featuredProject.title}</h2>
        <p>
          A gathering of community members, volunteers and health workers for
          registration, screening, care and support.
        </p>
        <p className="text-sm text-muted">{featuredProject.location}</p>
        <ActionLink to="/projects/guruku-gbayi-outreach" variant="text">
          Read the outreach report
          <ArrowRight aria-hidden="true" size={18} />
        </ActionLink>
      </div>
    </article>
  );
}
