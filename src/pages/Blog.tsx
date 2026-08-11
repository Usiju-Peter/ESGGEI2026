import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts, getReadingTime } from "../blogData";
import { useSEO } from "../lib/seo";

export default function Blog() {
  const featuredPost = blogPosts[0];
  const readingTime = getReadingTime(featuredPost);

  useSEO("Blog", "Stories, ideas and reflections from EarthSprings Global Grace Empowerment Initiative and the communities we serve.", {
    path: "/blog",
    image: featuredPost.heroImage,
  });

  return (
    <div className="bg-cream">
      <section className="border-b border-primary/10 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">EarthSprings Journal</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-primary md:text-6xl">Blog</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/70 md:text-xl">
            Stories, ideas and reflections from our work and the communities we serve.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Featured Story</p>
          <article className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_18px_45px_rgba(18,53,36,0.08)] lg:grid-cols-[1.2fr_0.8fr]">
            <Link to={`/blog/${featuredPost.slug}`} className="group block min-h-[320px] overflow-hidden bg-beige lg:min-h-full" aria-label={`Read ${featuredPost.title}`}>
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.heroAlt}
                width={featuredPost.heroWidth}
                height={featuredPost.heroHeight}
                className="h-full w-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-light">{featuredPost.category}</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">
                <Link to={`/blog/${featuredPost.slug}`} className="transition-colors hover:text-primary-light">
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-charcoal/70 md:text-lg">{featuredPost.excerpt}</p>
              <p className="mt-6 text-sm text-charcoal/55">{readingTime} min read</p>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group mt-8 inline-flex w-max items-center text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:text-primary-light"
              >
                Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-primary/10 bg-white py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-primary">This is only the beginning.</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/70">More stories from our work and communities will be shared here.</p>
        </div>
      </section>
    </div>
  );
}
