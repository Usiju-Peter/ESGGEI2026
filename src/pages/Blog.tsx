import { Link } from "react-router-dom";
import { blogPosts, formatPublishedDate, getReadingTime } from "../blogData";
import { Furrow } from "../components/Art";
import PageHero from "../components/PageHero";
import { ActionLink } from "../components/UI";
import { useSEO } from "../lib/seo";

export default function Blog() {
  useSEO("/blog");
  return (
    <>
      <PageHero
        badge="The EarthSprings journal"
        title="Blog"
        subtitle="Stories and reflections from our work and the communities we serve."
      />
      <section className="section section-white">
        <div className="site-container">
          {blogPosts.map((post) => (
            <article className="post" key={post.slug}>
              <Link className="cover" to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                <Furrow lines={14} lit={3} />
                <b>{post.title.split(":")[0]}</b>
              </Link>
              <div className="txt">
                <p className="meta">
                  {post.category}, {getReadingTime(post)} min read, published{" "}
                  <time dateTime={post.publishedDate}>{formatPublishedDate(post.publishedDate)}</time>
                </p>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <ActionLink to={`/blog/${post.slug}`} variant="text">Read the story</ActionLink>
              </div>
            </article>
          ))}
          <p className="text-muted" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            More stories from our work and communities will be shared here.
          </p>
        </div>
      </section>
    </>
  );
}
