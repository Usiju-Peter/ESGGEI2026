import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { compression } from 'vite-plugin-compression2';

import { imagetools } from 'vite-imagetools';

const siteUrl = 'https://www.esggei.org.ng';

const pageSchemas: Record<string, { name: string; description: string; type: string }> = {
  '/': {
    name: 'EarthSprings Global Grace Empowerment Initiative (ESGGEI)',
    description: 'EarthSprings empowers vulnerable communities through education, sustainable agriculture, literacy, advocacy, and social support.',
    type: 'WebPage',
  },
  '/about': { name: 'About Us', description: 'Learn about ESGGEI, its vision, mission, and objectives.', type: 'AboutPage' },
  '/projects': { name: 'Our Projects', description: 'Explore ESGGEI programmes and community outreach projects.', type: 'CollectionPage' },
  '/gallery': { name: 'Gallery', description: 'View moments from ESGGEI outreach and community work.', type: 'CollectionPage' },
  '/blog': { name: 'Blog', description: 'Stories and reflections from ESGGEI and the communities it serves.', type: 'CollectionPage' },
  '/blog/from-purpose-to-action': { name: 'From Purpose to Action: The Story Behind EarthSprings', description: 'How ESGGEI connects education, sustainable agriculture, literacy, advocacy, and social support.', type: 'WebPage' },
  '/team': { name: 'Our Team', description: 'Meet the people guiding ESGGEI’s work.', type: 'CollectionPage' },
  '/partner': { name: 'Contact Us & Partners', description: 'Contact ESGGEI to partner, volunteer, donate, or learn more.', type: 'ContactPage' },
};

const getRouteFromPath = (pagePath: string) => {
  const route = pagePath.replace(/\\\\/g, '/').replace(/\/index\.html$/, '').replace(/\.html$/, '');
  return route === '' ? '/' : route.startsWith('/') ? route : `/${route}`;
};

const breadcrumbSchema = (route: string, pageName: string) => {
  const items = [{ name: 'Home', item: `${siteUrl}/` }];
  if (route !== '/') items.push({ name: pageName, item: `${siteUrl}${route}` });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}${route}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
};

const structuredData = () => ({
  name: 'structured-data',
  transformIndexHtml: {
    order: 'pre' as const,
    handler(_html: string, context: { path: string }) {
      const route = getRouteFromPath(context.path);
      const page = pageSchemas[route] ?? pageSchemas['/'];
      const url = `${siteUrl}${route === '/' ? '/' : route}`;
      const pageSchema = {
        '@type': page.type,
        '@id': `${url}#webpage`,
        url,
        name: page.name,
        description: page.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      };
      const graph: Record<string, unknown>[] = [pageSchema, breadcrumbSchema(route, page.name)];

      if (route === '/') {
        graph.unshift({
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: 'EarthSprings Global Grace Empowerment Initiative',
          alternateName: 'ESGGEI',
          publisher: { '@id': `${siteUrl}/#organization` },
        });
        graph.push({
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What does ESGGEI do?',
              acceptedAnswer: { '@type': 'Answer', text: 'ESGGEI supports vulnerable communities through education, sustainable agriculture, literacy, advocacy, and social support.' },
            },
            {
              '@type': 'Question',
              name: 'How are ESGGEI programmes shaped for communities?',
              acceptedAnswer: { '@type': 'Answer', text: 'We listen to local priorities, resources, and gaps, then shape practical programmes around the needs of the communities we serve.' },
            },
            {
              '@type': 'Question',
              name: 'How can I support ESGGEI?',
              acceptedAnswer: { '@type': 'Answer', text: 'You can support ESGGEI by partnering, volunteering, sharing expertise, advocating for our work, or making a donation.' },
            },
          ],
        });
      }

      if (route === '/blog/from-purpose-to-action') {
        graph.push({
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          headline: page.name,
          description: page.description,
          datePublished: '2026-08-14',
          mainEntityOfPage: { '@id': `${url}#webpage` },
          image: `${siteUrl}/images/gallery/outreach-25.webp`,
          author: { '@id': `${siteUrl}/#organization` },
          publisher: { '@id': `${siteUrl}/#organization` },
        });
      }

      return [{ tag: 'script', attrs: { type: 'application/ld+json', id: 'page-structured-data' }, children: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'), injectTo: 'head' as const }];
    },
  },
});

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(), 
      imagetools(),
      structuredData(),
      compression({ algorithms: ['gzip', 'brotliCompress'] })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          projects: path.resolve(__dirname, 'projects/index.html'),
          gallery: path.resolve(__dirname, 'gallery/index.html'),
          blog: path.resolve(__dirname, 'blog/index.html'),
          blogArticle: path.resolve(__dirname, 'blog/from-purpose-to-action/index.html'),
          team: path.resolve(__dirname, 'team/index.html'),
          partner: path.resolve(__dirname, 'partner/index.html'),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['motion'],
            lucide: ['lucide-react']
          }
        }
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
