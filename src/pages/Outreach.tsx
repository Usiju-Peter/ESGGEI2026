import { Link } from "react-router-dom";
import { Activity, BriefcaseMedical, ClipboardList, Users } from "lucide-react";
import ArticleShare from "../components/ArticleShare";
import { Furrow } from "../components/Art";
import PageHero from "../components/PageHero";
import { ActionLink } from "../components/UI";
import { featuredProject, galleryImages } from "../data";
import { useSEO } from "../lib/seo";

const day = [
  [ClipboardList, "Registration and consultation under the community canopy"],
  [Activity, "Health screening, including blood-pressure checks and finger-prick tests"],
  [BriefcaseMedical, "Preparation and distribution of medicines and health supplies"],
  [Users, "Meetings between the outreach team and community representatives"],
] as const;

export default function Outreach() {
  useSEO("/projects/guruku-gbayi-outreach");
  return (
    <article>
      <PageHero
        lit={6}
        crumb={<><Link to="/projects">Projects</Link> / Outreach report</>}
        title="Integrated agriculture and medical outreach in Guruku Gbayi"
        aside={
          <p className="bigdate">
            <b>27</b>
            <time dateTime="2026-06-27"><span>June 2026</span></time>
          </p>
        }
      />
      <div className="site-container report">
        <div className="body">
          <p>
            EarthSprings Global Grace Empowerment Initiative brought community members, volunteers and health workers
            together in Guruku Gbayi for an integrated agriculture and medical outreach. Registration, health screening,
            care and support formed part of the community gathering.
          </p>

          <h2>What the day included</h2>
          <ul className="did">
            {day.map(([Icon, text]) => (
              <li key={text}>
                <span className="ico"><Icon aria-hidden="true" /></span>
                {text}
              </li>
            ))}
          </ul>

          <div className="photos">
            <Furrow lines={12} lit={4} />
            <div>
              <h3>{galleryImages.length} photographs from the day</h3>
              <p>The full visual record of the outreach is in the gallery.</p>
            </div>
            <ActionLink to="/gallery" variant="light">See the photos</ActionLink>
          </div>

          <h2>Connecting community needs and practical support</h2>
          <p>
            The outreach brings together two parts of ESGGEI’s work: sustainable livelihoods and community support. Our{" "}
            <Link to="/projects">programme priorities</Link> show how education, agriculture and gender advocacy connect
            to the wider mission.
          </p>
          <p>For questions about this outreach, current activities or ways to collaborate, contact the ESGGEI team.</p>
          <ArticleShare title={featuredProject.title} path="/projects/guruku-gbayi-outreach" />
        </div>
        <aside className="aside" aria-label="Outreach details">
          <div className="box">
            <dl>
              <div><dt>Date</dt><dd><time dateTime="2026-06-27">{featuredProject.date}</time></dd></div>
              <div><dt>Place</dt><dd>{featuredProject.location}</dd></div>
              <div><dt>Programmes</dt><dd>Agriculture and community health support</dd></div>
              <div><dt>Record</dt><dd>Written report and {galleryImages.length} photographs</dd></div>
            </dl>
          </div>
          <div className="box box-ci">
            <h3>Want to support the next outreach?</h3>
            <ActionLink to="/partner">Discuss a partnership</ActionLink>
          </div>
        </aside>
      </div>
    </article>
  );
}
