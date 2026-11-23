import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

import { routes } from './routes.mjs';
const server = await createServer({
  configFile: false,
  plugins: [react()],
  resolve: { alias: { 'react-router-dom': 'react-router' } },
  ssr: { noExternal: ['react-router'] },
  optimizeDeps: { noDiscovery: true, include: [], entries: [] },
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error'
});

try {
  const { renderPage } = await server.ssrLoadModule('/scripts/prerender-entry.tsx');
  const homeTemplate = readFileSync('dist/index.html', 'utf8');
  for (const route of routes) {
    const filename = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
    const original = readFileSync(filename, 'utf8');
    assert.ok(original.includes('<div id="root"></div>'), 'Cannot find empty root in ' + filename);
    const rendered = await renderPage(route);
    assert.ok(/<h1(?:\s|>)/.test(rendered), 'Prerendered page lacks an H1: ' + route);
    assert.ok(rendered.length > 500, 'Prerendered HTML unexpectedly small: ' + route);
    assert.doesNotMatch(rendered, /id="[BS]:|<!--\$[?!]-->/, 'Static HTML must not require a React reveal script: ' + route);
    const updated = original.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${rendered}</div>`);
    writeFileSync(filename, updated);
    console.log('Prerendered', route, rendered.length, 'bytes');
  }

  // dist/404.html: Vercel serves it with a 404 status for unknown URLs. Not indexed,
  // no canonical or structured data, and rendered fresh on the client (no hydration),
  // because the visitor's URL differs from the one rendered here.
  const notFound = await renderPage('/404');
  assert.match(notFound, /Page not found/, '404 page did not render the NotFound route');
  const notFoundHtml = homeTemplate
    .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | ESGGEI</title>\n    <meta name="robots" content="noindex" />')
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace(/\s*<link rel="preload" href="\/images\/gallery\/[^>]*>/g, '')
    .replace(/\s*<meta (?:property|name)="(?:og|twitter):[^"]+" content="[^"]*"\s*\/?>/g, '')
    .replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/, '')
    .replace('<div id="root"></div>', `<div id="root">${notFound}</div>`);
  assert.ok(notFoundHtml.includes(notFound), 'Cannot find empty root in dist/index.html for 404.html');
  writeFileSync('dist/404.html', notFoundHtml);
  console.log('Prerendered 404.html', notFound.length, 'bytes');
} catch (error) {
  console.error('SSR_PRERENDER_FAILED:', error);
  process.exitCode = 1;
} finally {
  await server.close();
}
