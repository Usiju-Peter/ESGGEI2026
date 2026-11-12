import PageHero from "../components/PageHero";
import TeamGrid from "../components/TeamGrid";
import { CallToAction } from "../components/UI";
import { useSEO } from "../lib/seo";
export default function Team() {
  useSEO(
    "Our Team",
    "Meet the dedicated team behind EarthSprings Global Grace Empowerment Initiative (ESGGEI) working to restore dignity and sustainable livelihood in communities.",
  );
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Meet the people guiding ESGGEI’s work in education, livelihoods and community development."
      />
      <section className="section section-white">
        <div className="site-container">
          <h2 className="sr-only">Our core leadership team</h2>
          <TeamGrid />
        </div>
      </section>
      <CallToAction
        title="Work with our team."
        text="Connect with our leaders and volunteers to discuss community projects, education and sustainable development."
      />
    </>
  );
}
