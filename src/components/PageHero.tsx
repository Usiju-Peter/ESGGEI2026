import type { ReactNode } from "react";
import { Furrow } from "./Art";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  /** Optional breadcrumb line shown above the title. */
  crumb?: ReactNode;
  /** Shown to the right of the title on wide screens (for example a large date). */
  aside?: ReactNode;
  children?: ReactNode;
  lit?: number;
}
/** Emerald page introduction with furrow lines; the floating header sits on top of it. */
export default function PageHero({ badge, title, subtitle, crumb, aside, children, lit = 12 }: PageHeroProps) {
  return (
    <section className="page-hero on-dark">
      <Furrow lines={22} lit={lit} />
      <div className="site-container page-hero-inner">
        <div className="hero-row">
          <div>
            {crumb && <p className="crumb">{crumb}</p>}
            {badge && <p className="label">{badge}</p>}
            <h1>{title}</h1>
            {subtitle && <p className="intro-summary">{subtitle}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}
