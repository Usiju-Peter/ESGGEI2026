import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import express from 'express';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
import { routes } from './routes.mjs';
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

  await page.goto(base + '/projects/guruku-gbayi-outreach', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Discuss a partnership' }).click();
  await page.waitForURL('**/partner');
  await page.waitForTimeout(200);
  const schema = JSON.parse(await page.locator('#page-structured-data').textContent());
  assert.ok(schema['@graph'].some(node => node['@id'] === 'https://www.esggei.org.ng/partner#webpage'), 'Schema must update after SPA navigation');
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole('button', { name: 'Toggle menu' });
  await menu.click();
  assert.equal(await menu.getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('aria-expanded'), 'false');
  assert.equal(await menu.evaluate(el => el === document.activeElement), true);

  // Exercise the contact flow without sending data or email to a real service.
  let reply = { success: true };
  await page.route('https://formsubmit.co/**', route => route.fulfill({ json: reply }));
  const fillEnquiry = async () => {
    await page.getByLabel('Full Name', { exact: true }).fill('QA Example');
    await page.getByLabel('Email Address', { exact: true }).fill('qa@example.com');
    await page.getByLabel('Subject', { exact: true }).fill('Website test');
    await page.getByLabel('Message', { exact: true }).fill('Mocked submission, no email is sent.');
  };
  await fillEnquiry();
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  await page.getByRole('status').waitFor();
  assert.equal(await page.getByRole('status').evaluate(el => el === document.activeElement), true);
  await page.getByRole('button', { name: 'Send Another Message' }).click();
  reply = { success: false };
  await fillEnquiry();
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  await page.getByRole('alert').waitFor();
  reply = {};
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  await page.getByRole('alert').waitFor();
  assert.equal(await page.getByRole('status').count(), 0, 'Ambiguous service response must not claim success');
  console.log('Mobile navigation, schema updates and mocked contact success/failure checks passed.');

  await page.goto(base + '/partner', { waitUntil: 'networkidle' });
  await page.locator('summary').first().focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('details').first().getAttribute('open'), '');
  await page.goto(base + '/gallery', { waitUntil: 'networkidle' });
  const imageTrigger = page.getByRole('button', { name: /Open featured image/ });
  await imageTrigger.click();
  await page.getByRole('dialog').waitFor();
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: 'Close image viewer' }).focus();
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.getByRole('button', { name: 'Next image', exact: true }).evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Tab');
  assert.equal(await page.getByRole('button', { name: 'Close image viewer' }).evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'detached' });
  assert.equal(await imageTrigger.evaluate(el => el === document.activeElement), true);
  await page.goto(base + '/privacy', { waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('link', { name: 'Contact ESGGEI', exact: true }).count(), 1);
  console.log('FAQ keyboard and gallery focus wrapping, Escape and restoration passed.');

  const missing = await page.goto(base + '/seo-smoke-test-unknown', { waitUntil: 'domcontentloaded' });
  assert.equal(missing.status(), 404, 'Unknown pages must return a real HTTP 404');

  assert.deepEqual(errors, [], 'No hydration or uncaught runtime errors allowed');
  console.log('Browser SEO smoke test passed on ' + routes.length + ' routes.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
