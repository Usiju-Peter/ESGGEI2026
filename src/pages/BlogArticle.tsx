import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatPublishedDate, getBlogPost, getReadingTime } from "../blogData";
import { useSEO } from "../lib/seo";

export default function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  useSEO(
    post?.title ?? "Blog",
    post?.description ?? "Stories, ideas and reflections from EarthSprings Global Grace Empowerment Initiative.",
    post
      ? { path: `/blog/${post.slug}`, image: post.heroImage, type: "article" }
      : { path: "/blog" }
  );

  if (!post) return <Navigate to="/blog" replace />;

  const readingTime = getReadingTime(post);

  return (
    <article className="bg-cream pb-20 md:pb-28">
      <header className="border-b border-primary/10 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-primary-light transition-colors hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to Blog
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Blog / {post.category}</p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-charcoal/70 md:text-2xl">{post.excerpt}</p>
            <p className="mt-6 text-sm text-charcoal/55">{readingTime} min read · Published {formatPublishedDate(post.publishedDate)}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">
        <img
          src={post.heroImage}
          alt={post.heroAlt}
          width={post.heroWidth}
          height={post.heroHeight}
          className="max-h-[680px] w-full rounded-3xl object-cover shadow-[0_18px_45px_rgba(18,53,36,0.12)]"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="pt-12 text-[1.05rem] leading-8 text-charcoal/80 md:pt-16 md:text-lg md:leading-9">
          {post.content.map((block, index) => {
            if (block.type === "heading") {
              return <h2 key={`${block.type}-${index}`} className="mt-14 font-serif text-3xl font-semibold leading-tight text-primary md:text-4xl">{block.text}</h2>;
            }
            if (block.type === "image") {
              return (
                <figure key={`${block.type}-${index}`} className="my-12 overflow-hidden rounded-2xl bg-beige shadow-sm md:my-16">
                  <img src={block.src} alt={block.alt} width={block.width} height={block.height} className="h-auto w-full" loading="lazy" decoding="async" />
                </figure>
              );
            }
            return <p key={`${block.type}-${index}`} className="mt-7 first:mt-0">{block.text}</p>;
          })}
        </div>

        <section className="mt-16 rounded-3xl border border-primary/10 bg-white p-8 shadow-sm md:mt-20 md:p-12">
          <h2 className="font-serif text-3xl font-semibold text-primary">Explore the work behind our purpose.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal/70">Learn more about the programmes that guide EarthSprings' work with communities.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/projects" className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
              Explore Our Projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/partner" className="inline-flex items-center justify-center rounded-full border border-primary/20 px-7 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white">
              Contact Us
            </Link>
          </div>
        </section>

        <Link to="/blog" className="mt-12 inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:text-primary-light">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to Blog
        </Link>
      </div>
    </article>
  );
}
