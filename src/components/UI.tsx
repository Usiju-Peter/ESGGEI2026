import { Link, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";

export function ActionLink({
  variant = "primary",
  className = "",
  ...props
}: LinkProps & { variant?: "primary" | "secondary" | "light" | "text" }) {
  const base = variant === "text" ? "button-text" : `button button-${variant}`;
  return <Link {...props} className={`${base} ${className}`.trim()} />;
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
      {eyebrow && <p className="label">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {children && <div className="section-description">{children}</div>}
    </div>
  );
}

export const ways = [
  ["Partnership", "Funding, expertise or in-kind support."],
  ["Volunteering", "Share your skills, location and availability."],
  ["Support our work", "Talk with the team about practical support."],
] as const;

/** The emerald closing section used across pages. */
export function CallToAction({
  title = "Bring your purpose. Build possibility.",
  text,
  showWays = true,
}: {
  title?: string;
  text?: string;
  showWays?: boolean;
}) {
  return (
    <section className="closing on-dark">
      <div className="site-container closing-inner">
        <h2>{title}</h2>
        {text && <p className="lead">{text}</p>}
        {showWays && (
          <ul className="ways3">
            {ways.map(([heading, body]) => (
              <li key={heading}>
                <h3>{heading}</h3>
                {body}
              </li>
            ))}
          </ul>
        )}
        <div className="acts">
          <ActionLink to="/partner" variant="light">
            Contact the team
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
