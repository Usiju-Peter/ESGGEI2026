import { Link } from "react-router-dom";
import { BookOpen, Eye, Mail, MapPin, Phone, Sprout, Target, Users } from "lucide-react";
import { Furrow, SproutHero, SproutSmall } from "../components/Art";
import { ActionLink, CallToAction } from "../components/UI";
import { projectsData, featuredProject } from "../data";
import { blogPosts, formatPublishedDate } from "../blogData";
import { useSEO } from "../lib/seo";

const programmeIcons = [BookOpen, Sprout, Users];
const programmeTone = ["card card-em", "card card-ci", "card"];

export default function Home() {
  useSEO("/");
  const post = blogPosts[0];
  return (
    <div className="home">
      <section className="home-hero on-dark">
        <Furrow lines={26} lit={17} />
        <div className="site-container home-hero-inner">
          <div>
            <h1>
              Empowering lives.
              <br />
              Restoring hope.
            </h1>
            <p className="lead">
              EarthSprings Global Grace Empowerment Initiative connects education, sustainable agriculture, literacy,
              advocacy and social support for vulnerable communities in Nigeria.
            </p>
            <div className="acts">
              <ActionLink to="/projects" variant="light">
                See our work
              </ActionLink>
              <Link className="button btn-ghost-light" to="/partner">
                Partner with us
              </Link>
            </div>
          </div>
          <SproutHero />
        </div>
      </section>

      <div className="site-container">
        <section className="sec who" aria-labelledby="who-title">
          <div className="body">
            <p className="label">Who we are</p>
            <h2 id="who-title">Progress begins with people.</h2>
            <p>
              We listen to local priorities, resources and gaps, then work with communities on practical responses.
              Because education, livelihoods and inclusion are connected, our support is connected too.
            </p>
            <p className="pull">Every child learns. Every woman thrives. Every life has possibility.</p>
            <div className="vm">
              <div className="vmc">
                <span className="ico"><Eye aria-hidden="true" /></span>
                <h3>Our vision</h3>
                <p>A society where every child learns, every woman thrives, and every vulnerable life reaches its full potential.</p>
              </div>
              <div className="vmc">
                <span className="ico"><Target aria-hidden="true" /></span>
                <h3>Our mission</h3>
                <p>To empower individuals and communities through education, agriculture, literacy, advocacy and social support.</p>
              </div>
            </div>
            <p style={{ marginTop: 24 }}>
              <ActionLink to="/about" variant="text">Meet EarthSprings</ActionLink>
            </p>
          </div>
          <div className="orb">
            <div className="circles" />
            <SproutSmall />
            <dl className="minis">
              <div className="mini"><dt>3</dt><dd>Programme priorities</dd></div>
              <div className="mini"><dt>29</dt><dd>Outreach photographs</dd></div>
              <div className="mini"><dt>20+</dt><dd>Years of founder experience</dd></div>
            </dl>
          </div>
        </section>

        <section style={{ paddingBottom: 104 }} aria-labelledby="work-title">
          <p className="label">Our work</p>
          <div className="head2">
            <h2 id="work-title">Different pathways, one shared purpose</h2>
            <p>Education, livelihoods and inclusion guide the next stages of our work. Contact the team to confirm current activities.</p>
          </div>
          <div className="cards">
            {projectsData.map((project, index) => {
              const Icon = programmeIcons[index] ?? BookOpen;
              return (
                <article className={programmeTone[index] ?? "card"} key={project.id}>
                  {index === 0 && <Furrow lines={14} lit={11} />}
                  <span className="ico"><Icon aria-hidden="true" /></span>
                  <h3>{project.title}</h3>
                  <p className="grow">{project.shortDescription}</p>
                  <Link className="text-link" to={project.href} aria-label={`Learn more about ${project.title}`}>
                    Learn more
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section style={{ paddingBottom: 104 }} aria-labelledby="outreach-title">
          <p className="label">Latest outreach</p>
          <article className="edge">
            <div className="datebadge">
              <b>27</b>
              <span>June 2026</span>
            </div>
            <div>
              <h2 id="outreach-title">Integrated agriculture and medical outreach</h2>
              <p>
                Community members, volunteers and health workers came together in Guruku Gbayi for registration, health
                screening, care and support.
              </p>
              <span className="place">
                <MapPin aria-hidden="true" size={16} />
                {featuredProject.location}
              </span>
            </div>
            <div className="acts">
              <ActionLink to="/projects/guruku-gbayi-outreach">Read the report</ActionLink>
              <ActionLink to="/gallery" variant="secondary">See the photos</ActionLink>
            </div>
          </article>
        </section>

        <section style={{ paddingBottom: 104 }} aria-labelledby="journal-title">
          <p className="label">From our journal</p>
          <article className="post">
            <Link className="cover" to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              <Furrow lines={14} lit={3} />
              <b>From purpose to action</b>
            </Link>
            <div className="txt">
              <p className="meta">
                {post.category}, <time dateTime={post.publishedDate}>{formatPublishedDate(post.publishedDate)}</time>
              </p>
              <h2 id="journal-title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <ActionLink to={`/blog/${post.slug}`} variant="text">Read the story</ActionLink>
            </div>
          </article>
        </section>
      </div>

      <CallToAction />

      <div className="site-container">
        <div className="reach">
          <a href="mailto:esggei@gmail.com">
            <span className="ico"><Mail aria-hidden="true" /></span>
            <span><small>Email us</small><span className="v">esggei@gmail.com</span></span>
          </a>
          <a href="tel:+2348064676210">
            <span className="ico"><Phone aria-hidden="true" /></span>
            <span><small>Call us</small><span className="v">0806 467 6210</span></span>
          </a>
          <div>
            <span className="ico"><MapPin aria-hidden="true" /></span>
            <span><small>Visit us</small><span className="v">NAF Valley Estate, Asokoro, Abuja</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
