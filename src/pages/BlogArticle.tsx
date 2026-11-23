import ArticleShare from "../components/ArticleShare";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatPublishedDate, getBlogPost, getReadingTime } from "../blogData";
import PageHero from "../components/PageHero";
import { useSEO } from "../lib/seo";
import { ActionLink } from "../components/UI";

export default function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);
  useSEO(post ? `/blog/${post.slug}` : "/blog");
  if (!post) return <Navigate to="/blog" replace />;
  return (
    <article className="editorial-article journal-article">
      <PageHero
        lit={4}
        crumb={<><Link to="/blog">Blog</Link> / {post.category}</>}
        title={post.title}
        subtitle={post.excerpt}
      >
        <p className="intro-summary" style={{ fontSize: 16, marginTop: 18 }}>
          {getReadingTime(post)} min read, published{" "}
          <time dateTime={post.publishedDate}>{formatPublishedDate(post.publishedDate)}</time>
        </p>
      </PageHero>
      <div className="site-container section">
        <div className="reading-width">
          <nav className="article-contents" aria-label="In this story">
            <p>In this story</p>
            {post.content.map((block, index) =>
              block.type === "heading" ? (
                <a key={index} href={`#story-section-${index}`}>
                  {block.text}
                </a>
              ) : null,
            )}
          </nav>
          <div className="reading-copy">
            {post.content.map((block, index) =>
              block.type === "heading" ? (
                <h2 id={`story-section-${index}`} key={index}>
                  {block.text}
                </h2>
              ) : block.type === "image" ? null : (
                <p key={index}>{block.text}</p>
              ),
            )}
          </div>
          <section className="article-cta">
            <h2>Explore the work behind our purpose.</h2>
            <p>Learn more about the programmes guiding EarthSprings’ work with communities.</p>
            <div className="acts">
              <ActionLink to="/projects">Explore our projects</ActionLink>
              <ActionLink to="/partner" variant="secondary">Contact the team</ActionLink>
            </div>
          </section>
          <ArticleShare title={post.title} path={`/blog/${post.slug}`} />
          <p style={{ marginTop: 20 }}>
            <Link className="button-text" to="/blog">Back to the blog</Link>
          </p>
        </div>
      </div>
    </article>
  );
}
