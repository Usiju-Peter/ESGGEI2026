import { BookOpen, MapPin, Sprout, Users } from "lucide-react";
import { Furrow } from "../components/Art";
import PageHero from "../components/PageHero";
import { ActionLink, CallToAction } from "../components/UI";
import { featuredProject, projectsData } from "../data";
import { useSEO } from "../lib/seo";

const icons = [BookOpen, Sprout, Users];
const sides = ["side side-em", "side side-ci", "side side-so"];
const short = ["Education", "Agriculture", "Gender advocacy"];

export default function Projects() {
  useSEO("/projects");
  return (
    <>
      <PageHero
        badge="Our work"
        title="Our programme priorities"
        subtitle="Education, livelihoods and inclusion guide the next stages of our work. Programme availability changes, so contact the team to confirm current activities."
      >
        <nav className="jump" aria-label="On this page">
          {projectsData.map((project, index) => (
            <a key={project.id} href={`#${project.id}`}>{short[index] ?? project.title}</a>
          ))}
          <a href="#latest-outreach">Latest outreach</a>
        </nav>
      </PageHero>

      <div className="site-container" style={{ paddingTop: 56 }}>
        {projectsData.map((project, index) => {
          const Icon = icons[index] ?? BookOpen;
          return (
            <article className="prog" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
              <div className={sides[index] ?? "side side-so"}>
                {index === 0 && <Furrow lines={14} lit={10} />}
                <span className="ico"><Icon aria-hidden="true" /></span>
                <h2 id={`${project.id}-title`}>{project.title}</h2>
              </div>
              <div className="main">
                <p className="desc">{project.description}</p>
                <h3>Key activities</h3>
                <ul className="ticks">
                  {project.keyActivities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
                <dl className="pair">
                  <div><dt>Who it supports</dt><dd>{project.supports}</dd></div>
                  <div><dt>Expected impact</dt><dd>{project.expectedImpact}</dd></div>
                </dl>
              </div>
            </article>
          );
        })}

        <section id="latest-outreach" style={{ paddingBlock: "80px 104px", scrollMarginTop: 24 }} aria-labelledby="outreach-title">
          <p className="label">See a programme in action</p>
          <article className="edge">
            <div className="datebadge"><b>27</b><span>June 2026</span></div>
            <div>
              <h2 id="outreach-title">{featuredProject.title}</h2>
              <p>Community members, volunteers and health workers came together in Guruku Gbayi for registration, health screening, care and support.</p>
              <span className="place"><MapPin aria-hidden="true" size={16} />{featuredProject.location}</span>
            </div>
            <div className="acts">
              <ActionLink to="/projects/guruku-gbayi-outreach">Read the report</ActionLink>
              <ActionLink to="/gallery" variant="secondary">See the photos</ActionLink>
            </div>
          </article>
        </section>
      </div>
      <CallToAction title="Want to support one of these programmes?" text="Funding, expertise or in-kind support: tell us what you can offer." showWays={false} />
    </>
  );
}
