import PageHero from "../components/PageHero";
import TeamGrid from "../components/TeamGrid";
import { ActionLink, CallToAction, SectionHeading } from "../components/UI";
import { useSEO } from "../lib/seo";
export default function About() {
  useSEO(
    "About Us",
    "Learn about EarthSprings Global Grace Empowerment Initiative (ESGGEI), our identity, story, vision, and mission to empower vulnerable communities through sustainable development.",
  );
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="We work with communities on education, sustainable livelihoods, literacy, advocacy and social support."
      />
      <div className="site-container">
        <nav className="section-nav" aria-label="On this page">
          {[
            ["Who We Are", "identity"],
            ["How We Work", "how-we-work"],
            ["Vision & Mission", "vision-mission"],
            ["Aims & Objectives", "aims-objectives"],
            ["Our Team", "our-team"],
          ].map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <section id="identity" className="section section-white">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="section-title">Who we are</h2>
            <p className="mt-4 text-muted">
              EarthSprings Global Grace Empowerment Initiative is a non-profit,
              non-governmental organisation committed to transforming lives
              through empowerment programmes for vulnerable and marginalised
              communities. Our work promotes access to education, sustainable
              farming, gender equity and social welfare in Nigeria and beyond.
            </p>
          </div>
          <div>
            <h2 className="section-title">Our story</h2>
            <p className="mt-4 text-muted">
              Across Nigeria’s rural communities, families face barriers
              including limited access to education, low agricultural
              productivity, economic instability, scarce resources and social
              exclusion. ESGGEI was created to respond through practical,
              compassionate and sustainable interventions.
            </p>
            <ActionLink
              to="/blog/from-purpose-to-action"
              variant="text"
              className="mt-3"
            >
              Read the story behind EarthSprings
            </ActionLink>
          </div>
        </div>
      </section>
      <section id="how-we-work" className="section">
        <div className="site-container">
          <SectionHeading
            eyebrow="Our approach"
            title="Practical change, shaped with communities."
          >
            <p>
              We listen first, work with local partners and adapt support to
              each community’s context.
            </p>
          </SectionHeading>
          <div className="card-grid">
            {[
              [
                "Community-led",
                "Local voices help define priorities, strengthen trust and guide the solutions we support.",
              ],
              [
                "Connected support",
                "Education, livelihoods, advocacy and social care work together because community needs rarely stand alone.",
              ],
              [
                "Built to last",
                "We focus on practical skills, shared ownership and approaches that can continue beyond a single intervention.",
              ],
            ].map(([title, text]) => (
              <div className="card" key={title}>
                <h3 className="card-title">{title}</h3>
                <p className="mt-3 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="vision-mission" className="section section-white">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="section-title">Our vision</h2>
            <p className="mt-4 text-lg text-muted">
              To build a society where every child learns, every woman thrives,
              and every vulnerable life is empowered to reach its full
              potential.
            </p>
          </div>
          <div>
            <h2 className="section-title">Our mission</h2>
            <p className="mt-4 text-lg text-muted">
              To empower individuals and communities through education,
              agriculture, literacy, advocacy, and social support, with a
              special focus on children, women, widows, and the aged.
            </p>
          </div>
        </div>
      </section>
      <section id="aims-objectives" className="section">
        <div className="site-container">
          <SectionHeading title="Our aims and objectives" />
          <div className="card-grid">
            {[
              [
                "Community and agriculture",
                "Empower vulnerable and marginalised groups through sustainable initiatives in education, agriculture and community development.",
              ],
              [
                "Literacy and gender equity",
                "Promote literacy, self-reliance and gender equity among disadvantaged populations.",
              ],
              [
                "Targeted social support",
                "Improve the wellbeing of out-of-school children, widows, the aged and the girl child through targeted interventions.",
              ],
            ].map(([title, text]) => (
              <div className="card" key={title}>
                <h3 className="card-title">{title}</h3>
                <p className="mt-3 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="our-team" className="section section-white">
        <div className="site-container">
          <SectionHeading title="The people behind the mission." />
          <TeamGrid />
          <ActionLink to="/team" variant="text" className="mt-4">
            Meet our team
          </ActionLink>
        </div>
      </section>
      <CallToAction title="Join us in restoring hope." />
    </>
  );
}
