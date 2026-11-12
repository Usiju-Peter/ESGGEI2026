import PageHero from "../components/PageHero";
import {
  ActionLink,
  CallToAction,
  ProjectFeature,
  SectionHeading,
} from "../components/UI";
import { projectsData } from "../data";
import { useSEO } from "../lib/seo";
export default function Projects() {
  useSEO(
    "Our Projects",
    "Discover the practical initiatives of EarthSprings Global Grace Empowerment Initiative (ESGGEI) aimed at empowering communities and restoring hope through sustainable development projects in Nigeria.",
  );
  return (
    <>
      <PageHero
        badge="02 / Programmes & documented work"
        title="Our Projects"
        subtitle="Explore a documented outreach and the programme priorities guiding our work with communities."
      />
      <section className="section section-white projects-feature-section">
        <div className="site-container">
          <ProjectFeature />
        </div>
      </section>
      <section className="section programme-directory">
        <div className="site-container">
          <SectionHeading eyebrow="Areas of focus" title="Programme priorities">
            <p>
              These areas guide the next stages of our work. Contact the team to
              ask about current activities or discuss a partnership.
            </p>
          </SectionHeading>
          <nav className="section-nav" aria-label="Programme priorities">
            {projectsData.map((p) => (
              <a key={p.id} href={`#${p.id}`}>
                {p.id === "education"
                  ? "Education"
                  : p.id === "agriculture"
                    ? "Agriculture"
                    : "Gender equity"}
              </a>
            ))}
          </nav>
          <div className="programme-entries">
            {projectsData.map((programme, index) => {
              const Icon = programme.icon;
              return (
                <article
                  id={programme.id}
                  key={programme.id}
                  className="programme-detail"
                >
                  <div>
                    <p className="eyebrow">Programme priority / 0{index + 1}</p>
                    <Icon
                      size={28}
                      className="programme-icon mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="card-title">{programme.title}</h3>
                    <p className="mt-3 text-muted">{programme.description}</p>
                    <ActionLink to="/partner" variant="text" className="mt-3">
                      Support this programme
                    </ActionLink>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-semibold">
                      Key activities
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                      {programme.keyActivities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-semibold text-primary">
                          Who it supports
                        </dt>
                        <dd className="mt-1 text-sm text-muted">
                          {programme.supports}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold text-primary">
                          Desired impact
                        </dt>
                        <dd className="mt-1 text-sm text-muted">
                          {programme.expectedImpact}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CallToAction title="Support practical community programmes." />
    </>
  );
}
