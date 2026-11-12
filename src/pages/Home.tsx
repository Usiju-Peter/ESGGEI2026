import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sprout,
  BookOpen,
  Users,
} from "lucide-react";
import { projectsData } from "../data";
import { blogPosts, formatPublishedDate } from "../blogData";
import { useSEO } from "../lib/seo";
import "./premium-home.css";

function Action({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`p-action ${secondary ? "p-action-secondary" : ""}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}
export default function Home() {
  useSEO(
    "Home",
    "Join EarthSprings Global Grace Empowerment Initiative (ESGGEI) as we transform lives in Nigeria through empowerment programs targeting education, sustainable farming, and social welfare.",
  );
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.animate(
              [
                { opacity: 0.35, transform: "translateY(16px)" },
                { opacity: 1, transform: "none" },
              ],
              { duration: 480, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    root.current
      ?.querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const post = blogPosts[0];
  return (
    <div className="premium-home" ref={root}>
      <section className="p-hero p-wrap">
        <div className="p-hero-copy">
          <p className="p-kicker">
            <span /> EarthSprings · Community empowerment in Nigeria
          </p>
          <h1>
            Empowering lives.
            <br />
            <span>Restoring hope.</span>
          </h1>
          <p className="p-lead">
            Practical support. Shared possibilities. A future shaped with
            communities.
          </p>
          <p className="p-intro">
            EarthSprings Global Grace Empowerment Initiative connects education,
            sustainable agriculture, literacy, advocacy and social support for
            vulnerable communities.
          </p>
          <div className="p-actions">
            <Action to="/projects">Explore Our Work</Action>
            <Action to="/partner" secondary>
              Partner With Us
            </Action>
          </div>
          <div className="p-hero-note">
            <span>People first.</span>
            <span>Purpose in action.</span>
          </div>
        </div>
        <figure className="p-hero-photo">
          <picture>
            <source
              srcSet="/images/gallery/outreach-28-home.avif"
              type="image/avif"
            />
            <img
              src="/images/gallery/outreach-28-home.webp"
              width="1200"
              height="900"
              alt="Community members gathered during an EarthSprings outreach"
              fetchPriority="high"
            />
          </picture>
          <figcaption>
            <span>In community. Together.</span>
            <Link to="/gallery">
              Guruku Gbayi, Nasarawa State{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </section>
      <section className="p-proof">
        <div className="p-wrap">
          <p>A connected approach to community development</p>
          <ul>
            <li>Education & literacy</li>
            <li>Sustainable livelihoods</li>
            <li>Gender equity</li>
            <li>Community support</li>
          </ul>
        </div>
      </section>
      <section className="p-section p-wrap p-about" data-reveal>
        <p className="p-kicker">01 / Who we are</p>
        <div>
          <h2>
            Progress begins
            <br />
            with <em>people.</em>
          </h2>
          <p>
            We listen to local priorities, resources and gaps, then work with
            communities on practical responses. Because education, livelihoods
            and inclusion are connected, our support is connected too.
          </p>
          <Link className="p-link" to="/about">
            Meet EarthSprings <ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <figure>
          <img
            src="/images/gallery/outreach-24.webp"
            width="1200"
            height="900"
            alt="Community members gathered beneath the outreach canopy"
            loading="lazy"
          />
          <figcaption>Local voices. Shared priorities.</figcaption>
        </figure>
      </section>
      <section className="p-focus p-section">
        <div className="p-wrap">
          <div className="p-section-heading" data-reveal>
            <p className="p-kicker">02 / Our programme priorities</p>
            <h2>
              Different pathways.
              <br />
              <em>One shared purpose.</em>
            </h2>
            <p>
              Education, livelihoods and inclusion guide the next stages of our
              work. Contact the team to confirm current activities.
            </p>
          </div>
          <div className="p-programmes">
            {projectsData.map((p, i) => {
              const Icon = [BookOpen, Sprout, Users][i];
              return (
                <article className="p-programme" key={p.id} data-reveal>
                  <span className="p-number">0{i + 1}</span>
                  <Icon size={30} aria-hidden="true" />
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.shortDescription}</p>
                  </div>
                  <Link to={p.href} aria-label={`Explore ${p.title}`}>
                    <ArrowUpRight size={26} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="p-section p-wrap p-story" data-reveal>
        <div className="p-story-photo">
          <img
            src="/images/gallery/outreach-25.webp"
            width="1200"
            height="900"
            alt="EarthSprings team and community leaders at the Guruku Gbayi outreach"
            loading="lazy"
          />
          <span>Purpose, made practical.</span>
        </div>
        <div className="p-story-copy">
          <p className="p-kicker">03 / A documented outreach</p>
          <p className="p-date">
            <time dateTime="2026-06-27">27 June 2026</time> · Nasarawa State
          </p>
          <h2>
            Showing up.
            <br />
            <em>Working together.</em>
          </h2>
          <h3>Integrated Agriculture & Medical Outreach</h3>
          <p>
            Community members, volunteers and health workers came together in
            Guruku Gbayi for registration, screening, care and support.
          </p>
          <p className="p-place">
            Guruku Gbayi Community, Karu LGA, Nasarawa State
          </p>
          <Action to="/projects/guruku-gbayi-outreach">
            Read the outreach report
          </Action>
          <Link className="p-link" to="/gallery">
            See the moments behind the work{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="p-belief p-section">
        <div className="p-wrap" data-reveal>
          <p className="p-kicker">What we work towards</p>
          <h2>
            Every child learns.
            <br />
            Every woman thrives.
            <br />
            <span>Every life has possibility.</span>
          </h2>
          <p>
            Our vision is a society where every child learns, every woman
            thrives, and every vulnerable life is empowered to reach its full
            potential.
          </p>
          <Link className="p-link" to="/about#vision-mission">
            Our mission and vision <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="p-section p-wrap p-journal" data-reveal>
        <div>
          <p className="p-kicker">04 / From EarthSprings</p>
          <h2>
            The purpose
            <br />
            behind <em>the work.</em>
          </h2>
          <Link className="p-link" to="/blog">
            Explore our journal <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <article>
          <Link
            className="p-journal-image"
            to={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
          >
            <img
              src={post.heroImage}
              width={post.heroWidth}
              height={post.heroHeight}
              alt={post.heroAlt}
              loading="lazy"
            />
          </Link>
          <p className="p-date">
            {post.category} ·{" "}
            <time dateTime={post.publishedDate}>
              {formatPublishedDate(post.publishedDate)}
            </time>
          </p>
          <h3>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p>{post.excerpt}</p>
          <Link className="p-link" to={`/blog/${post.slug}`}>
            Read the story <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </article>
      </section>
      <section className="p-involve p-section">
        <div className="p-wrap" data-reveal>
          <p className="p-kicker">The next chapter needs people.</p>
          <h2>
            Bring your purpose.
            <br />
            <em>Build possibility.</em>
          </h2>
          <p>
            Your time, expertise or support can be part of the conversation.
          </p>
          <div className="p-involve-links">
            {[
              [
                "Discuss a partnership",
                "Funding, expertise or in-kind support.",
              ],
              [
                "Enquire about volunteering",
                "Share your skills, location and availability.",
              ],
              [
                "Support our work",
                "Talk with the team about practical support.",
              ],
            ].map(([title, text]) => (
              <Link key={title} to="/partner">
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
