import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

import { imagetools } from 'vite-imagetools';

import { buildStructuredData } from './src/lib/structuredData';
import { absoluteImageUrl, brandName, pageMetadata, siteOrigin } from './src/lib/siteMetadata';
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
const structuredData = () => ({
  name: 'structured-data',
  transformIndexHtml: {
    order: 'pre' as const,
    handler(html: string, context: { path: string }) {
      const route = context.path.replace(/\\/g, '/').replace(/\/index\.html$/, '') || '/';
      const metadata = pageMetadata[route];
      if (!metadata) throw new Error('Missing page metadata for ' + route);
      const values: Record<string, string> = {
        description: metadata.description,
        'og:title': metadata.title, 'og:description': metadata.description,
        'og:url': siteOrigin + route, 'og:image': absoluteImageUrl(metadata.image), 'og:type': metadata.type,
        'twitter:title': metadata.title, 'twitter:description': metadata.description,
        'twitter:image': absoluteImageUrl(metadata.image),
      };
      const updated = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
        .replace(/<meta\s+(?:name|property)="([^"]+)"\s+content="[^"]*"\s*\/>/g,
          (tag, key: string) => values[key] === undefined ? tag : tag.replace(/content="[^"]*"/, `content="${escapeHtml(values[key])}"`));
      return { html: updated, tags: [
        { tag: 'meta', attrs: { property: 'og:site_name', content: brandName }, injectTo: 'head' as const },
        { tag: 'script', attrs: { type: 'application/ld+json', id: 'page-structured-data' }, children: JSON.stringify(buildStructuredData(route)).replace(/</g, '\\u003c'), injectTo: 'head' as const }
      ] };
    }
  }
});

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(), 
      imagetools(),
      structuredData()
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
          outreach: path.resolve(__dirname, 'projects/guruku-gbayi-outreach/index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
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
