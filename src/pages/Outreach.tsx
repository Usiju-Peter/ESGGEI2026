import { Link } from "react-router-dom";
import { featuredProject, galleryImages } from "../data";
import { useSEO } from "../lib/seo";
export default function Outreach() {
  useSEO(
    "Guruku Gbayi Agriculture & Medical Outreach",
    "ESGGEI’s integrated agriculture and medical outreach in Guruku Gbayi, Karu LGA, Nasarawa State, on 27 June 2026. Explore activities and outreach photographs.",
    { image: featuredProject.image },
  );
  return (
    <article className="section section-white">
      <div className="site-container">
        <p className="reading-width eyebrow">
          Community outreach · Nasarawa State
        </p>
        <h1 className="page-title reading-width">
          Integrated Agriculture &amp; Medical Outreach in Guruku Gbayi
        </h1>
        <dl className="reading-width my-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Outreach date</dt>
            <dd>
              <time dateTime="2026-06-27">{featuredProject.date}</time>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Location</dt>
            <dd>{featuredProject.location}</dd>
          </div>
        </dl>
        <p className="reading-width text-lg leading-relaxed">
          EarthSprings Global Grace Empowerment Initiative brought community
          members, volunteers and health workers together in Guruku Gbayi for an
          integrated agriculture and medical outreach. Registration, health
          screening, care and support formed part of the community gathering.
        </p>
        <figure className="reading-width my-8">
          <img
            src={featuredProject.image}
            alt={featuredProject.imageAlt}
            width="1200"
            height="1600"
            fetchPriority="high"
            decoding="async"
            className="article-photo"
          />
          <figcaption className="mt-3 text-sm text-charcoal/80">
            The banner for ESGGEI’s Integrated Agriculture &amp; Medical
            Outreach.
          </figcaption>
        </figure>
        <h2 className="reading-width section-title mt-8">
          Activities documented in the outreach gallery
        </h2>
        <p className="reading-width mt-4 leading-relaxed">
          The photographs show registration and consultation, blood-pressure
          checks, preparation of health supplies, and meetings between the
          outreach team and community representatives. They provide a visual
          record of participation and activities.
        </p>
        <div className="reading-width my-8 grid gap-6 sm:grid-cols-2">
          {[
            galleryImages[9],
            galleryImages[10],
            galleryImages[12],
            galleryImages[24],
          ].map((image) => (
            <figure key={image.src}>
              <img
                {...image}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <figcaption className="mt-3 text-sm text-charcoal/80">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
        <h2 className="reading-width section-title mt-8">
          Connecting community needs and practical support
        </h2>
        <p className="reading-width mt-4 leading-relaxed">
          The outreach brings together two parts of ESGGEI’s work: sustainable
          livelihoods and community support. Explore the organisation’s
          programme priorities to understand how education, agriculture and
          gender advocacy connect to its wider mission.
        </p>
        <p className="reading-width mt-4 leading-relaxed">
          For questions about this outreach, current activities or opportunities
          to collaborate, contact the ESGGEI team. Programme availability and
          partnership arrangements should be confirmed directly.
        </p>
        <div className="reading-width mt-6 flex flex-wrap gap-4">
          <Link
            className="font-semibold text-primary underline underline-offset-4"
            to="/gallery"
          >
            View the full outreach gallery
          </Link>
          <Link
            className="font-semibold text-primary underline underline-offset-4"
            to="/projects"
          >
            Explore programme priorities
          </Link>
          <Link
            className="font-semibold text-primary underline underline-offset-4"
            to="/partner"
          >
            Discuss a partnership
          </Link>
        </div>
        <p className="reading-width mt-8 text-sm text-muted">
          Published by EarthSprings Global Grace Empowerment Initiative.
        </p>
      </div>
    </article>
  );
}
