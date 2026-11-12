import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const base = 'https://www.esggei.org.ng';
import { routes } from './routes.mjs';
const pages = routes.map(route => [route, route === '/' ? 'index.html' : route.slice(1) + '/index.html']);

const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const robots = readFileSync('public/robots.txt', 'utf8');
assert.match(robots, /Sitemap:\s*https:\/\/www\.esggei\.org\.ng\/sitemap\.xml/i);
const entries = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(entries.length, pages.length, 'Sitemap should contain every public route exactly once');
assert.equal(new Set(entries).size, entries.length, 'Sitemap URLs must be unique');

for (const [urlPath, filePath] of pages) {
  const canonical = base + urlPath;
  assert.ok(entries.includes(canonical), 'Sitemap missing ' + canonical);
  assert.ok(existsSync(filePath), 'No page entrypoint found for ' + urlPath);
  const html = readFileSync(join(process.cwd(), filePath), 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/i, 'Missing page title in ' + filePath);
  assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/i, 'Missing description in ' + filePath);
  assert.ok(html.includes('rel="canonical" href="' + canonical + '"'), 'Wrong canonical for ' + filePath);
  assert.ok(html.includes('property="og:title"'), 'Missing OG title in ' + filePath);
  assert.ok(html.includes('name="twitter:card"'), 'Missing Twitter card in ' + filePath);
}
console.log('SEO static checks passed for ' + pages.length + ' routes.');
