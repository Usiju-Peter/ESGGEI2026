import { blogPosts } from '../blogData';

export const siteOrigin = 'https://www.esggei.org.ng';
export const brandName = 'ESGGEI';
export const organizationName = 'EarthSprings Global Grace Empowerment Initiative';
export const homeTitle = `${brandName} | ${organizationName}`;
export const homeDescription = 'Discover ESGGEI (EarthSprings Global Grace Empowerment Initiative), a Nigerian nonprofit organisation committed to empowerment, sustainable development and positive community impact.';

export type PageMetadata = {
  title: string;
  description: string;
  image: string;
  type: 'website' | 'article';
};

/** Shared by Vite's HTML output and client navigation; keep public URLs unchanged. */
export const pageMetadata: Record<string, PageMetadata> = {
  '/': { title: homeTitle, description: homeDescription, image: '/images/logo.png', type: 'website' },
  "/about": {
    "title": "About - EarthSprings Global Grace Empowerment Initiative (ESGGEI)",
    "description": "Learn about EarthSprings Global Grace Empowerment Initiative, our mission, vision and community-led approach to education, sustainable agriculture and social support.",
    "image": "/images/logo.png",
    "type": "website"
  },
  "/projects": {
    "title": "Projects - EarthSprings Global Grace Empowerment Initiative (ESGGEI)",
    "description": "Explore ESGGEI's community programmes supporting education, sustainable agriculture, women's empowerment, literacy and social welfare in Nigeria.",
    "image": "/images/logo.png",
    "type": "website"
  },
  "/projects/guruku-gbayi-outreach": {
    "title": "Guruku Gbayi Agriculture & Medical Outreach | ESGGEI",
    "description": "ESGGEI’s integrated agriculture and medical outreach in Guruku Gbayi, Karu LGA, Nasarawa State, on 27 June 2026. Explore activities and outreach photographs.",
    "image": "/images/gallery/outreach-01.webp",
    "type": "website"
  },
  "/gallery": {
    "title": "Gallery - EarthSprings Global Grace Empowerment Initiative (ESGGEI)",
    "description": "See photographs and moments from EarthSprings Global Grace Empowerment Initiative's outreach and community projects in Nigeria.",
    "image": "/images/gallery/outreach-01.webp",
    "type": "website"
  },
  "/blog": {
    "title": "Blog - EarthSprings Global Grace Empowerment Initiative (ESGGEI)",
    "description": "Stories, ideas and reflections from EarthSprings Global Grace Empowerment Initiative and the communities we serve.",
    "image": "/images/gallery/outreach-25.webp",
    "type": "website"
  },
  "/team": {
    "title": "Team - EarthSprings Global Grace Empowerment Initiative (ESGGEI)",
    "description": "Meet the people leading EarthSprings Global Grace Empowerment Initiative and their commitment to education, livelihoods, dignity and community development.",
    "image": "/images/logo.png",
    "type": "website"
  },
  "/partner": {
    "title": "Partner - EarthSprings Global Grace Empowerment Initiative (ESGGEI)",
    "description": "Partner with EarthSprings Global Grace Empowerment Initiative. Learn how to support community programmes through collaboration, volunteering and donations.",
    "image": "/images/logo.png",
    "type": "website"
  },
  "/privacy": {
    "title": "Website Privacy Notice | ESGGEI",
    "description": "How ESGGEI’s website handles enquiries, optional analytics and your privacy choices.",
    "image": "/images/logo.png",
    "type": "website"
  },
  ...Object.fromEntries(blogPosts.map(post => [`/blog/${post.slug}`, {
    title: `${post.title} | ${brandName}`,
    description: post.description,
    image: post.heroImage,
    type: 'article' as const,
  }])),
};

export function absoluteImageUrl(image: string) {
  return new URL(image, siteOrigin).href;
}
