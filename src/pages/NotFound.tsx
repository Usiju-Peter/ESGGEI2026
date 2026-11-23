import { useEffect } from "react";
import PageHero from "../components/PageHero";
import { ActionLink } from "../components/UI";
import { brandName } from "../lib/siteMetadata";

/** Shown for unknown URLs; Vercel serves the prerendered copy as dist/404.html with a 404 status. */
export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found | ${brandName}`;
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex";
    return () => robots?.remove();
  }, []);

  return (
    <>
      <PageHero
        badge="404 / Page not found"
        title="We can’t find that page"
        subtitle="The link may be old or mistyped. Everything on the ESGGEI website is a click away from here."
      />
      <section className="section section-white">
        <div className="site-container flex flex-wrap gap-4">
          <ActionLink to="/">Go to the home page</ActionLink>
          <ActionLink to="/projects" variant="secondary">
            See our projects
          </ActionLink>
          <ActionLink to="/partner" variant="secondary">
            Contact us
          </ActionLink>
        </div>
      </section>
    </>
  );
}
