import { Eye, HeartHandshake, Layers, Leaf, Sprout, Target, Users } from "lucide-react";
import { Furrow } from "../components/Art";
import PageHero from "../components/PageHero";
import TeamGrid from "../components/TeamGrid";
import { ActionLink, CallToAction, SectionHeading } from "../components/UI";
import { useSEO } from "../lib/seo";

const approach = [
  [Users, "Community-led", "Local voices help define priorities, strengthen trust and guide the solutions we support."],
  [Layers, "Connected support", "Education, livelihoods, advocacy and social care work together because community needs rarely stand alone."],
  [Sprout, "Built to last", "We focus on practical skills, shared ownership and approaches that can continue beyond a single intervention."],
] as const;
const aims = [
  [Leaf, "Community and agriculture", "Empower vulnerable and marginalised groups through sustainable initiatives in education, agriculture and community development."],
  [Target, "Literacy and gender equity", "Promote literacy, self-reliance and gender equity among disadvantaged populations."],
  [HeartHandshake, "Targeted social support", "Improve the wellbeing of out-of-school children, widows, the aged and the girl child through targeted interventions."],
] as const;
const tones = ["card card-em", "card card-ci", "card"];

export default function About() {
  useSEO("/about");
  return (
    <>
      <PageHero
        badge="Who we are"
        title="About EarthSprings"
        subtitle="We work with communities on education, sustainable livelihoods, literacy, advocacy and social support."
      >
        <nav className="jump" aria-label="On this page">
          {[
            ["Who we are", "identity"],
            ["How we work", "how-we-work"],
            ["Vision and mission", "vision-mission"],
            ["Aims", "aims-objectives"],
            ["Our team", "our-team"],
          ].map(([label, id]) => (
            <a href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>
      </PageHero>

      <div className="site-container">
        <section id="identity" className="sec who" style={{ paddingBottom: 104 }}>
          <div className="body">
            <p className="label">Who we are</p>
            <h2>A non-profit working with vulnerable communities.</h2>
            <p>
              EarthSprings Global Grace Empowerment Initiative is a non-profit, non-governmental organisation committed to
              transforming lives through empowerment programmes for vulnerable and marginalised communities. Our work
              promotes access to education, sustainable farming, gender equity and social welfare in Nigeria and beyond.
            </p>
          </div>
          <div className="card" style={{ background: "var(--soft)", borderColor: "var(--soft)" }}>
            <h3>Our story</h3>
            <p className="grow">
              Across Nigeria’s rural communities, families face barriers including limited access to education, low
              agricultural productivity, economic instability, scarce resources and social exclusion. ESGGEI was created to
              respond through practical, compassionate and sustainable interventions.
            </p>
            <ActionLink to="/blog/from-purpose-to-action" variant="text">Read the story behind EarthSprings</ActionLink>
          </div>
        </section>

        <section id="how-we-work" style={{ paddingBottom: 104, scrollMarginTop: 24 }}>
          <SectionHeading eyebrow="Our approach" title="Practical change, shaped with communities.">
            <p>We listen first, work with local partners and adapt support to each community’s context.</p>
          </SectionHeading>
          <div className="cards">
            {approach.map(([Icon, title, text], index) => (
              <article className={tones[index]} key={title}>
                {index === 0 && <Furrow lines={14} lit={11} />}
                <span className="ico"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section id="vision-mission" className="closing on-dark" style={{ position: "relative", overflow: "hidden", scrollMarginTop: 24 }}>
        <Furrow lines={20} lit={14} />
        <div className="site-container closing-inner" style={{ position: "relative" }}>
          <h2>Every child learns. Every woman thrives.</h2>
          <ul className="ways3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <li>
              <h3><Eye aria-hidden="true" size={20} style={{ verticalAlign: "-3px", marginRight: 8 }} />Our vision</h3>
              To build a society where every child learns, every woman thrives, and every vulnerable life is empowered to
              reach its full potential.
            </li>
            <li>
              <h3><Target aria-hidden="true" size={20} style={{ verticalAlign: "-3px", marginRight: 8 }} />Our mission</h3>
              To empower individuals and communities through education, agriculture, literacy, advocacy, and social
              support, with a special focus on children, women, widows, and the aged.
            </li>
          </ul>
        </div>
      </section>

      <div className="site-container">
        <section id="aims-objectives" className="sec" style={{ scrollMarginTop: 24 }}>
          <SectionHeading eyebrow="What we aim for" title="Our aims and objectives" />
          <div className="cards">
            {aims.map(([Icon, title, text]) => (
              <article className="card" key={title} style={{ borderTop: "4px solid var(--emerald)" }}>
                <span className="ico"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="our-team" style={{ paddingBottom: 104, scrollMarginTop: 24 }}>
          <SectionHeading eyebrow="Our team" title="The people behind the mission." />
          <TeamGrid />
          <p style={{ marginTop: 28 }}>
            <ActionLink to="/team" variant="text">Meet our team</ActionLink>
          </p>
        </section>
      </div>
      <CallToAction title="Join us in restoring hope." />
    </>
  );
}
