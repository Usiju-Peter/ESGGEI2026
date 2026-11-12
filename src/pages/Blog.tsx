import { Link } from "react-router-dom";
import { blogPosts, formatPublishedDate, getReadingTime } from "../blogData";
import PageHero from "../components/PageHero";
import { ActionLink } from "../components/UI";
import { useSEO } from "../lib/seo";
export default function Blog() {
  const post = blogPosts[0];
  useSEO(
    "Blog",
    "Stories, ideas and reflections from EarthSprings Global Grace Empowerment Initiative and the communities we serve.",
    { path: "/blog", image: post.heroImage },
  );
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Stories and reflections from our work and the communities we serve."
      />
      <section className="section section-white">
        <div className="site-container">
          <article className="project-feature">
            <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              <img
                src={post.heroImage}
                alt={post.heroAlt}
                width={post.heroWidth}
                height={post.heroHeight}
                loading="eager"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </Link>
            <div className="project-feature-copy">
              <p className="eyebrow">{post.category}</p>
              <h2 className="section-title">
                <Link to={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p>{post.excerpt}</p>
              <p className="text-sm">
                {getReadingTime(post)} min read · Published{" "}
                <time dateTime={post.publishedDate}>
                  {formatPublishedDate(post.publishedDate)}
                </time>
              </p>
              <ActionLink to={`/blog/${post.slug}`} variant="text">
                Read article
              </ActionLink>
            </div>
          </article>
          <p className="mt-8 border-t border-primary/20 pt-5 text-muted">
            More stories from our work and communities will be shared here.
          </p>
        </div>
      </section>
    </>
  );
}
