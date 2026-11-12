import { ArrowRight } from "lucide-react";
import { projectsData } from "../data";
import { useSEO } from "../lib/seo";
import {
  ActionLink,
  CallToAction,
  ProgrammeCard,
  ProjectFeature,
  SectionHeading,
} from "../components/UI";

export default function Home() {
  useSEO(
    "Home",
    "Join EarthSprings Global Grace Empowerment Initiative (ESGGEI) as we transform lives in Nigeria through empowerment programs targeting education, sustainable farming, and social welfare.",
  );
  return (
    <>
      <section className="section home-hero">
        <div className="site-container grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow">Community empowerment in Nigeria</p>
            <h1 className="display-title">
              Empowering lives.
              <br />
              Restoring hope.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              EarthSprings Global Grace Empowerment Initiative supports
              vulnerable communities through education, sustainable agriculture,
              literacy, advocacy and social support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink to="/projects">
                Explore Our Work
                <ArrowRight size={18} aria-hidden="true" />
              </ActionLink>
              <ActionLink to="/partner" variant="secondary">
                Partner With Us
              </ActionLink>
            </div>
          </div>
          <figure>
            <picture>
              <source
                srcSet="/images/gallery/outreach-28-home.avif"
                type="image/avif"
              />
              <img
                src="/images/gallery/outreach-28-home.webp"
                alt="Community members gathered during an EarthSprings outreach"
                width="1200"
                height="900"
                loading="eager"
                fetchPriority="high"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </picture>
            <figcaption className="mt-2 text-sm text-muted">
              Working with communities in Guruku Gbayi, Nasarawa State.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="section section-white">
        <div className="site-container">
          <ProjectFeature />
        </div>
      </section>
      <section className="section">
        <div className="site-container">
          <SectionHeading
            eyebrow="Our programme priorities"
            title="Practical support, connected to community needs."
          >
            <p>
              Education, livelihoods and inclusion guide the next stages of our
              work.
            </p>
          </SectionHeading>
          <div className="card-grid">
            {projectsData.map((programme) => (
              <ProgrammeCard key={programme.id} programme={programme} />
            ))}
          </div>
          <ActionLink to="/projects" variant="text" className="mt-5">
            View all programme priorities
            <ArrowRight size={18} aria-hidden="true" />
          </ActionLink>
        </div>
      </section>
      <section className="section section-white">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-12">
          <SectionHeading
            eyebrow="About EarthSprings"
            title="Rooted in compassion. Shaped with communities."
          >
            <p>
              We listen to local priorities, resources and gaps, then work with
              communities on practical responses. Our approach connects
              education, sustainable livelihoods and social support.
            </p>
            <ActionLink to="/about" variant="text" className="mt-4">
              Learn About ESGGEI
              <ArrowRight size={18} aria-hidden="true" />
            </ActionLink>
          </SectionHeading>
          <div className="border-l-2 border-primary/25 pl-6">
            <h3 className="card-title">Our vision</h3>
            <p className="mt-3 text-muted">
              To build a society where every child learns, every woman thrives,
              and every vulnerable life is empowered to reach its full
              potential.
            </p>
            <h3 className="card-title mt-6">Our mission</h3>
            <p className="mt-3 text-muted">
              To empower individuals and communities through education,
              agriculture, literacy, advocacy, and social support, with a
              special focus on children, women, widows, and the aged.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container grid gap-6 md:grid-cols-[.8fr_1.2fr] md:gap-12">
          <SectionHeading
            eyebrow="Questions and answers"
            title="How you can take part."
          >
            <p>Find out about our work and ways to get involved.</p>
          </SectionHeading>
          <div className="faq-list">
            {[
              [
                "What does ESGGEI do?",
                "ESGGEI supports vulnerable communities through education, sustainable agriculture, literacy, advocacy, and social support.",
              ],
              [
                "How are programmes shaped for communities?",
                "We listen to local priorities, resources, and gaps, then shape practical programmes around the needs of the communities we serve.",
              ],
              [
                "How can I support ESGGEI?",
                "You can support ESGGEI by partnering, volunteering, sharing expertise, advocating for our work, or making a donation.",
              ],
              [
                "Where does ESGGEI work?",
                "ESGGEI works with vulnerable and marginalised communities in Nigeria through locally shaped education, livelihood, advocacy, and social support programmes.",
              ],
              [
                "Can organisations partner with ESGGEI?",
                "Yes. Organisations can partner through funding, technical expertise, volunteering, advocacy, or in-kind support aligned with community priorities.",
              ],
              [
                "How can I stay connected to ESGGEI?",
                "Follow our stories, outreach updates, and project news through the website, gallery, blog, and social channels.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
