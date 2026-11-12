import { useEffect } from 'react';

type SEOOptions = {
  path?: string;
  image?: string;
  type?: 'website' | 'article';
};

const siteUrl = 'https://www.esggei.org.ng';
const siteName = 'EarthSprings Global Grace Empowerment Initiative (ESGGEI)';
const defaultImage = '/images/logo.png';

const upsertMeta = (attribute: 'name' | 'property', key: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

/** Keeps metadata correct when visitors navigate client-side without reloading. */
export const useSEO = (title: string, description: string, options: SEOOptions = {}) => {
  useEffect(() => {
    const fullTitle = title === 'Home' ? siteName : `${title} | ${siteName}`;
    document.title = fullTitle;

    const requestedPath = options.path ?? window.location.pathname;
    const normalizedPath = requestedPath === '/' ? '/' : requestedPath.replace(/\/+$/, '');
    const canonicalUrl = `${siteUrl}${normalizedPath}`;
    const rawImage = options.image || defaultImage;
    const absoluteImage = /^https?:\/\//i.test(rawImage) ? rawImage : `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', options.type ?? 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', absoluteImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, options.path, options.image, options.type]);
};
