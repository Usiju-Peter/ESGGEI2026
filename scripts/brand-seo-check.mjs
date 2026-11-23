import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import express from 'express';
import { chromium } from 'playwright';
import { routes } from './routes.mjs';

const origin = 'https://www.esggei.org.ng';
const title = 'ESGGEI | EarthSprings Global Grace Empowerment Initiative';
const description = 'ESGGEI (EarthSprings Global Grace Empowerment Initiative) is an Abuja-based NGO supporting education, farming livelihoods and girl-child protection in Nigeria.';
const fullName = 'EarthSprings Global Grace Empowerment Initiative';
const socials = [
  'https://www.instagram.com/esggei/',
  'https://www.linkedin.com/in/earthsprings-global-grace-empowerment-initiative-esggei-aa132537b/',
  'https://x.com/esggei',
];
const app = express();
app.get(routes, (req, res) => res.sendFile(resolve('dist', req.path === '/' ? 'index.html' : req.path.slice(1) + '/index.html')));
app.use(express.static('dist', { redirect: false }));
app.use((_req, res) => res.status(404).send('Not found'));
const server = await new Promise(resolve => {
  const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
});
const base = `http://127.0.0.1:${server.address().port}`;
const output = process.env.BRAND_SEO_OUTPUT || 'audit-results/brand-seo';
mkdirSync(output, { recursive: true });
let browser;
const reports = [];

async function head(page) {
  return page.evaluate(() => ({
    title: document.title,
    canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
    meta: [...document.querySelectorAll('meta[name], meta[property]')].map(el => [el.getAttribute('name') || el.getAttribute('property'), el.content]).sort(([a], [b]) => a.localeCompare(b)),
    schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)),
  }));
}

function validate(metadata, route) {
  assert.deepEqual(metadata.canonical, [origin + route], route + ': canonical');
  const entries = metadata.meta;
  const get = key => {
    const matches = entries.filter(([name]) => name === key);
    assert.equal(matches.length, 1, route + ': one ' + key);
    return matches[0][1];
  };
  assert.equal(get('og:site_name'), 'ESGGEI');
  assert.equal(get('og:title'), metadata.title);
  assert.equal(get('twitter:title'), metadata.title);
  assert.equal(get('og:description'), get('description'));
  assert.equal(get('twitter:description'), get('description'));
  assert.equal(get('og:url'), origin + route);
  assert.equal(get('twitter:image'), get('og:image'));
  assert.equal(get('twitter:card'), 'summary_large_image');
  assert.ok(!entries.some(([key, value]) => /^(robots|googlebot)$/i.test(key) && /noindex/i.test(value)));
  if (route === '/') {
    assert.equal(metadata.title, title);
    assert.equal(get('description'), description);
  }
  assert.equal(metadata.schema.length, 1, route + ': one JSON-LD graph');
  const graph = metadata.schema[0]['@graph'];
  const organization = graph.filter(node => [node['@type']].flat().includes('Organization'));
  assert.equal(organization.length, 1);
  assert.ok(organization[0]['@type'].includes('NGO'));
  const website = graph.filter(node => node['@type'] === 'WebSite');
  assert.equal(website.length, 1);
  for (const node of [organization[0], website[0]]) {
    assert.equal(node.name, 'ESGGEI');
    assert.equal(node.alternateName, fullName);
    assert.equal(node.url, origin + '/');
  }
  assert.equal(organization[0]['@id'], origin + '/#organization');
  assert.equal(website[0]['@id'], origin + '/#website');
  assert.deepEqual(organization[0].sameAs, socials);
  assert.equal(organization[0].logo, origin + '/images/logo.png');
  assert.ok(graph.some(node => node['@id'] === origin + route + '#webpage'));
}

try {
  browser = await chromium.launch({ headless: true });
  const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const interactive = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const sourcePage = await plain.newPage();
  const page = await interactive.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|hydrating|did not match|server rendered/i.test(message.text())) errors.push(message.text());
  });
  const titles = [], descriptions = [];
  for (const route of routes) {
    const response = await sourcePage.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await sourcePage.locator('main h1').count(), 1, route + ': crawlable H1');
    assert.equal(await sourcePage.locator('main h1').isVisible(), true, route + ': visible without JavaScript');
    assert.equal(await sourcePage.locator('#root[data-prerendered="true"]').count(), 1);
    const source = await head(sourcePage);
    validate(source, route);
    if (['/', '/gallery', '/blog/from-purpose-to-action'].includes(route)) {
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await sourcePage.screenshot({ path: `${output}/${name}-390-no-js.png`, fullPage: true });
    }
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const hydrated = await head(page);
    assert.deepEqual(hydrated, source, route + ': metadata must survive hydration unchanged');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, route + ': mobile overflow');
    titles.push(source.title);
    descriptions.push(source.meta.find(([key]) => key === 'description')[1]);
    reports.push({ route, source, hydrationMatches: true });
    console.log('Brand metadata, schema and hydration passed:', route);
  }
  assert.equal(new Set(titles).size, routes.length, 'Unique page titles');
  assert.equal(new Set(descriptions).size, routes.length, 'Unique descriptions');

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 1440, height: 900 });
  assert.ok((await page.locator('main').innerText()).includes(fullName + ' (ESGGEI)'));
  for (const href of socials) assert.equal(await page.locator(`footer a[href="${href}"]`).count(), 1);
  assert.equal(await page.getByAltText('ESGGEI logo', { exact: true }).count(), 2);
  await page.evaluate(() => { window.__brandNavigationMarker = true; });
  await page.locator('header a[href="/about"]').first().click();
  await page.waitForFunction(() => document.querySelector('link[rel="canonical"]').href.endsWith('/about'));
  validate(await head(page), '/about');
  await page.getByRole('link', { name: 'ESGGEI home', exact: true }).first().click();
  await page.waitForFunction(expected => document.title === expected, title);
  validate(await head(page), '/');
  assert.equal(await page.evaluate(() => window.__brandNavigationMarker), true, 'Check actual client navigation, without reloading');

  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(async () => { await document.fonts.ready; });
    for (let y = 0; y < await page.locator('body').evaluate(el => el.scrollHeight); y += 800) {
      await page.evaluate(y => window.scrollTo(0, y), y);
      await page.waitForTimeout(60);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, width + ': homepage overflow');
    await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: true });
  }
  assert.deepEqual(errors, [], 'No runtime/hydration errors');
  writeFileSync(`${output}/metadata.json`, JSON.stringify(reports, null, 2));
  console.log('Passed: 10 routes, JavaScript off/on metadata parity, client navigation, and homepage screenshots at 8 widths.');
  await plain.close();
  await interactive.close();
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
