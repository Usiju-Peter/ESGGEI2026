import { Link } from 'react-router-dom';
import { featuredProject, galleryImages } from '../data';
import { useSEO } from '../lib/seo';
export default function Outreach() {
  useSEO('Guruku Gbayi Agriculture & Medical Outreach', 'ESGGEI’s integrated agriculture and medical outreach in Guruku Gbayi, Karu LGA, Nasarawa State, on 27 June 2026. Explore activities and outreach photographs.', { image: featuredProject.image });
  return <article className="bg-cream px-6 py-14 md:py-20"><div className="mx-auto max-w-5xl">
    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Community outreach · Nasarawa State</p>
    <h1 className="font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">Integrated Agriculture &amp; Medical Outreach in Guruku Gbayi</h1>
    <dl className="my-8 grid gap-5 sm:grid-cols-2"><div><dt className="font-semibold">Outreach date</dt><dd><time dateTime="2026-06-27">{featuredProject.date}</time></dd></div><div><dt className="font-semibold">Location</dt><dd>{featuredProject.location}</dd></div></dl>
    <p className="text-lg leading-relaxed">EarthSprings Global Grace Empowerment Initiative brought community members, volunteers and health workers together in Guruku Gbayi for an integrated agriculture and medical outreach. Registration, health screening, care and support formed part of the community gathering.</p>
    <figure className="my-10"><img src={featuredProject.image} alt={featuredProject.imageAlt} width="1200" height="1600" fetchPriority="high" decoding="async" className="w-full rounded-2xl" /><figcaption className="mt-3 text-sm text-charcoal/80">The banner for ESGGEI’s Integrated Agriculture &amp; Medical Outreach.</figcaption></figure>
    <h2 className="mt-12 text-3xl font-semibold">Activities documented in the outreach gallery</h2>
    <p className="mt-5 leading-relaxed">The photographs show registration and consultation, blood-pressure checks, preparation of health supplies, and meetings between the outreach team and community representatives. They provide a visual record of participation and activities.</p>
    <div className="my-8 grid gap-8 sm:grid-cols-2">{[galleryImages[9], galleryImages[10], galleryImages[12], galleryImages[24]].map(image => <figure key={image.src}><img {...image} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover" /><figcaption className="mt-3 text-sm text-charcoal/80">{image.alt}</figcaption></figure>)}</div>
    <h2 className="mt-12 text-3xl font-semibold">Connecting community needs and practical support</h2>
    <p className="mt-5 leading-relaxed">The outreach brings together two parts of ESGGEI’s work: sustainable livelihoods and community support. Explore the organisation’s programme priorities to understand how education, agriculture and gender advocacy connect to its wider mission.</p>
    <p className="mt-5 leading-relaxed">For questions about this outreach, current activities or opportunities to collaborate, contact the ESGGEI team. Programme availability and partnership arrangements should be confirmed directly.</p>
    <div className="mt-8 flex flex-wrap gap-5"><Link className="font-semibold text-primary underline underline-offset-4" to="/gallery">View the full outreach gallery</Link><Link className="font-semibold text-primary underline underline-offset-4" to="/projects">Explore programme priorities</Link><Link className="font-semibold text-primary underline underline-offset-4" to="/partner">Discuss a partnership</Link></div>
    <p className="mt-12 text-sm text-charcoal/80">Published by EarthSprings Global Grace Empowerment Initiative.</p>
  </div></article>;
}
