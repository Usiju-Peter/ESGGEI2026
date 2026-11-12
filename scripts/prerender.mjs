import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

const routes = ['/', '/about', '/projects', '/gallery', '/blog', '/blog/from-purpose-to-action', '/team', '/partner'];
const server = await createServer({
  configFile: false,
  plugins: [react()],
  optimizeDeps: { noDiscovery: true, include: [], entries: [] },
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error'
});

try {
  const { renderPage } = await server.ssrLoadModule('/scripts/prerender-entry.tsx');
  for (const route of routes) {
    const filename = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
    const original = readFileSync(filename, 'utf8');
    assert.ok(original.includes('<div id="root"></div>'), 'Cannot find empty root in ' + filename);
    const rendered = await renderPage(route);
    assert.ok(/<h1(?:\s|>)/.test(rendered), 'Prerendered page lacks an H1: ' + route);
    assert.ok(rendered.length > 500, 'Prerendered HTML unexpectedly small: ' + route);
    const updated = original.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${rendered}</div>`);
    writeFileSync(filename, updated);
    console.log('Prerendered', route, rendered.length, 'bytes');
  }
} catch (error) {
  console.error('SSR_PRERENDER_FAILED:', error);
  process.exitCode = 1;
} finally {
  await server.close();
}
