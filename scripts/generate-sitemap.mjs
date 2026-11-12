import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const domain = 'https://www.esggei.org.ng';
const basePages = ['/', '/about', '/projects', '/gallery', '/blog', '/team', '/partner'];
const source = readFileSync('src/blogData.ts', 'utf8');
const slugs = [...source.matchAll(/^\s*slug:\s*["']([a-z0-9-]+)["']/gm)].map(m => m[1]);
assert.equal(new Set(slugs).size, slugs.length, 'Duplicate blog slugs');
const pages = [...basePages, ...slugs.map(slug => `/blog/${slug}`)];
assert.equal(new Set(pages).size, pages.length, 'Duplicate public routes');
for (const route of pages) {
  const entry = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
  assert.ok(existsSync(entry), `SEO route has no HTML entrypoint: ${entry}`);
}
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map(route => `  <url><loc>${escapeXml(domain + route)}</loc></url>`).join('\n') +
  '\n</urlset>\n';
const path = 'public/sitemap.xml';
if (process.argv.includes('--check')) {
  assert.equal(readFileSync(path, 'utf8'), xml, 'Sitemap is stale: run npm run seo:sitemap');
  console.log(`Sitemap is current (${pages.length} URLs).`);
} else {
  writeFileSync(path, xml);
  console.log(`Generated sitemap with ${pages.length} URLs.`);
}
