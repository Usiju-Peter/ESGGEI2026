interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}
/** Shared editorial introduction; each page's content supplies its own composition. */
export default function PageHero({
  badge = "EarthSprings / ESGGEI",
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="page-intro">
      <div className="site-container intro-layout">
        <div>
          <p className="eyebrow">{badge}</p>
          <h1 className="page-title">{title}</h1>
        </div>
        <p className="intro-summary">{subtitle}</p>
      </div>
    </section>
  );
}
