import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { routes } from './routes.mjs';
const base = 'https://www.esggei.org.ng';
const htmlFor = route => route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
let links = 0, assets = 0;
for (const route of routes) {
  const html = readFileSync(htmlFor(route), 'utf8');
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const graph = schemas.flatMap(s => s['@graph'] ?? [s]);
  assert.equal(graph.filter(s => s['@type'] === 'NGO').length, 1, route + ' needs one organisation identity');
  assert.ok(graph.some(s => s['@id'] === base + route + '#webpage'), route + ' schema URL mismatch');
  assert.equal(graph.filter(s => s['@type'] === 'BreadcrumbList').length, 1);
  for (const [,raw] of html.matchAll(/\bhref="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll('&amp;', '&'), base + route);
    if (url.origin !== base) continue;
    if (routes.includes(url.pathname)) {
      links++;
      if (url.hash) {
        const target = readFileSync(htmlFor(url.pathname), 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(target.includes(`id="${id}"`), `${route}: missing anchor ${url.pathname}${url.hash}`);
      }
    } else {
      const file = resolve('dist', '.' + url.pathname);
      assert.ok(file.startsWith(resolve('dist') + '/') && existsSync(file) && statSync(file).isFile(), `${route}: broken local link ${raw}`);
    }
  }
  for (const [,src] of html.matchAll(/\bsrc="(\/[^\"]+)"/g)) {
    assert.ok(existsSync(join('dist', decodeURIComponent(src))), `${route}: missing asset ${src}`); assets++;
  }
}
console.log(`Site quality passed: ${routes.length} route schemas, ${links} internal links, ${assets} local asset references.`);
