import DocumentaryImage from "../components/DocumentaryImage";
import ArticleShare from "../components/ArticleShare";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatPublishedDate, getBlogPost, getReadingTime } from "../blogData";
import { useSEO } from "../lib/seo";
import { ActionLink } from "../components/UI";
export default function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);
  useSEO(
    post?.title ?? "Blog",
    post?.description ??
      "Stories, ideas and reflections from EarthSprings Global Grace Empowerment Initiative.",
    post
      ? { path: `/blog/${post.slug}`, image: post.heroImage, type: "article" }
      : { path: "/blog" },
  );
  if (!post) return <Navigate to="/blog" replace />;
  return (
    <article className="section section-white editorial-article journal-article">
      <div className="site-container">
        <div className="reading-width">
          <p className="eyebrow">{post.category}</p>
          <h1 className="page-title">{post.title}</h1>
          <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
          <p className="mt-4 text-sm text-muted">
            {getReadingTime(post)} min read · Published{" "}
            <time dateTime={post.publishedDate}>
              {formatPublishedDate(post.publishedDate)}
            </time>
          </p>
          <figure className="my-8">
            <DocumentaryImage
              src={post.heroImage}
              alt={post.heroAlt}
              width={post.heroWidth}
              height={post.heroHeight}
              fetchPriority="high"
              className="w-full rounded-2xl"
            />
            <figcaption className="mt-2 text-sm text-muted">
              {post.heroAlt}
            </figcaption>
          </figure>
          <nav className="article-contents" aria-label="In this story">
            <p className="eyebrow">In this story</p>
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
              ) : block.type === "image" ? (
                <figure className="my-8" key={index}>
                  <DocumentaryImage
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    loading="lazy"
                    decoding="async"
                    className="article-photo"
                  />
                  <figcaption className="mt-2 text-sm text-muted">
                    {block.alt}
                  </figcaption>
                </figure>
              ) : (
                <p key={index}>{block.text}</p>
              ),
            )}
          </div>
          <section className="card mt-8">
            <h2 className="card-title">Explore the work behind our purpose.</h2>
            <p className="mt-3 text-muted">
              Learn more about the programmes guiding EarthSprings’ work with
              communities.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ActionLink to="/projects">Explore Our Projects</ActionLink>
              <ActionLink to="/partner" variant="secondary">
                Contact Us
              </ActionLink>
            </div>
          </section>
          <ArticleShare title={post.title} path={`/blog/${post.slug}`} />
          <Link className="button button-text mt-4" to="/blog">
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
