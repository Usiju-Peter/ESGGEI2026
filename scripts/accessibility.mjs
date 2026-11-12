import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import express from 'express';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/about', '/projects', '/gallery', '/blog', '/blog/from-purpose-to-action', '/team', '/partner'];
const app = express();
app.use(express.static(resolve('dist')));
const server = app.listen(4174, '127.0.0.1');
const browser = await chromium.launch({ headless: true });
const reports = [];
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto((process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4174') + route, { waitUntil: 'networkidle' });
      for (let y = 0; y < await page.locator('body').evaluate(el => el.scrollHeight); y += 650) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(100); }
      await page.waitForTimeout(800);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      reports.push({ route, viewport, violations: result.violations, incomplete: result.incomplete });
      console.log(viewport.width, route, result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
      if (route === '/team' || route === '/about') {
        const trigger = route === '/team' ? page.getByRole('button', { name: /Read biography/ }).first() : page.getByRole('button', { name: /Read bio/i }).first();
        await trigger.focus(); await page.keyboard.press('Enter');
        await page.getByRole('dialog').waitFor();
        await page.waitForTimeout(600);
        assert.equal(await page.getByRole('button', { name: 'Close biography' }).evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Tab');
        assert.equal(await page.getByRole('button', { name: 'Close biography' }).evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Escape');
        await page.getByRole('dialog').waitFor({ state: 'detached' });
        assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
      }
    }
    await context.close();
  }
  mkdirSync('audit-results', { recursive: true });
  writeFileSync('audit-results/accessibility.json', JSON.stringify(reports, null, 2));
  assert.equal(reports.reduce((n, r) => n + r.violations.length, 0), 0, 'Accessibility violations found');
} finally { await browser.close(); server.close(); }
