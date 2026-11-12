import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
const routes = ['/', '/about', '/projects', '/gallery', '/blog', '/blog/from-purpose-to-action', '/team', '/partner'];
const child = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'inherit' });

const ready = async () => {
  for (let i = 0; i < 60; i++) {
    try { const response = await fetch(base); if (response.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Vite preview failed to start');
};

let browser;
try {
  await ready();
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
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route + ' must return HTTP 200');
    assert.equal(await page.locator('main h1').count(), 1, route + ' must have exactly one main H1');
    assert.equal(await page.locator('#root[data-prerendered="true"]').count(), 1, route + ' should hydrate an SSR root');
    await page.waitForTimeout(150);
  }

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Explore Our Work' }).first().click();
  await page.waitForURL('**/projects');
  assert.equal(await page.locator('main h1').count(), 1, 'Client-side navigation must render the destination');


  assert.deepEqual(errors, [], 'No hydration or uncaught runtime errors allowed');
  console.log('Browser SEO smoke test passed on ' + routes.length + ' routes.');
} finally {
  await browser?.close();
  child.kill();
}
