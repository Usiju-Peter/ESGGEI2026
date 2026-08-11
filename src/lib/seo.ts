import { useEffect } from 'react';

type SEOOptions = {
  path?: string;
  image?: string;
  type?: 'website' | 'article';
};

const siteUrl = 'https://www.esggei.org.ng';

const upsertMeta = (attribute: 'name' | 'property', key: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

export const useSEO = (title: string, description: string, options: SEOOptions = {}) => {
  useEffect(() => {
    document.title = `${title} | EarthSprings Global Grace Empowerment Initiative (ESGGEI)`;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', `${title} | EarthSprings Global Grace Empowerment Initiative (ESGGEI)`);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', options.type ?? 'website');

    const canonicalUrl = `${siteUrl}${options.path ?? window.location.pathname}`;
    upsertMeta('property', 'og:url', canonicalUrl);

    if (options.image) {
      upsertMeta('property', 'og:image', `${siteUrl}${options.image}`);
      upsertMeta('name', 'twitter:image', `${siteUrl}${options.image}`);
    }
    upsertMeta('name', 'twitter:title', `${title} | EarthSprings Global Grace Empowerment Initiative (ESGGEI)`);
    upsertMeta('name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, options.path, options.image, options.type]);
};
