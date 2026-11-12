import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const routes = ['/', '/about', '/projects', '/gallery', '/blog', '/blog/from-purpose-to-action', '/team', '/partner'];
for (const route of routes) {
  const filename = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  const html = readFileSync(filename, 'utf8');
  assert.match(html, /<div id="root" data-prerendered="true">/, 'Missing prerendered root: ' + route);
  assert.match(html, /<h1(?:\s|>)/, 'Missing prerendered H1: ' + route);
  assert.match(html, /<main(?:\s|>)/, 'Missing prerendered main: ' + route);
  assert.ok(html.includes('rel="canonical" href="https://www.esggei.org.ng' + route + '"'), 'Canonical mismatch: ' + route);
}
console.log('Production HTML prerender checks passed for ' + routes.length + ' routes.');
