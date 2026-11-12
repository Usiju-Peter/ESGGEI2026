interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
}
/** Compact page introduction. Documentary images belong beside their content. */
export default function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="page-intro">
      <div className="site-container">
        {badge && <p className="eyebrow">{badge}</p>}
        <h1 className="page-title">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
