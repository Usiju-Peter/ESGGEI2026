import { useEffect } from 'react';
import { buildStructuredData } from './structuredData';
import { absoluteImageUrl, brandName, pageMetadata, siteOrigin } from './siteMetadata';

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
export const useSEO = (path: string) => {
  useEffect(() => {
    const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
    const metadata = pageMetadata[normalizedPath];
    if (!metadata) return;
    const { title: fullTitle, description } = metadata;
    document.title = fullTitle;

    const canonicalUrl = `${siteOrigin}${normalizedPath}`;
    const absoluteImage = absoluteImageUrl(metadata.image);

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:site_name', brandName);
    upsertMeta('property', 'og:type', metadata.type);
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
    let schema = document.getElementById('page-structured-data');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'page-structured-data';
      schema.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(buildStructuredData(normalizedPath)).replace(/</g, '\\u003c');
  }, [path]);
};
