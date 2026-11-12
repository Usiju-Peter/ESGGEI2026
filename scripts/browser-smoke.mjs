import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import express from 'express';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
const routes = ['/', '/about', '/projects', '/gallery', '/blog', '/blog/from-purpose-to-action', '/team', '/partner'];
const app = express();
app.get(routes, (req, res) => {
  const file = req.path === '/' ? 'index.html' : req.path.slice(1) + '/index.html';
  res.sendFile(resolve('dist', file));
});
app.use(express.static('dist', { redirect: false }));
app.use((_req, res) => res.status(404).send('Not found'));
const server = await new Promise(resolve => {
  const instance = app.listen(4173, '127.0.0.1', () => resolve(instance));
});

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|hydrating|did not match|server rendered/i.test(message.text())) {
      errors.push(message.text());
    }
  });

  for (const route of routes) {
    const beforeErrors = errors.length;
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route + ' must return HTTP 200');
    assert.equal(await page.locator('main h1').count(), 1, route + ' must have exactly one main H1');
    assert.equal(await page.locator('#root[data-prerendered="true"]').count(), 1, route + ' should hydrate an SSR root');
    const expectedCanonical = 'https://www.esggei.org.ng' + route;
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), expectedCanonical, 'Wrong source HTML for ' + route);
    await page.waitForTimeout(150);
    console.log('Hydration diagnostics', route, errors.slice(beforeErrors));
  }

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Explore Our Work' }).first().click();
  await page.waitForURL('**/projects');
  assert.equal(await page.locator('main h1').count(), 1, 'Client-side navigation must render the destination');

  const missing = await page.goto(base + '/seo-smoke-test-unknown', { waitUntil: 'domcontentloaded' });
  assert.equal(missing.status(), 404, 'Unknown pages must return a real HTTP 404');

  assert.deepEqual(errors, [], 'No hydration or uncaught runtime errors allowed');
  console.log('Browser SEO smoke test passed on ' + routes.length + ' routes.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
