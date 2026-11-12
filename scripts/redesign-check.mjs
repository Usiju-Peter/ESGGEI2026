import assert from "node:assert/strict";
import express from "express";
import { resolve } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "./routes.mjs";

const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];
const selectedRoutes = process.env.REDESIGN_ROUTES
  ? process.env.REDESIGN_ROUTES.split(",")
  : routes;
assert.ok(
  selectedRoutes.every((route) => routes.includes(route)),
  "Unknown route selection",
);
const output = process.env.REDESIGN_OUTPUT || "audit-results/redesign";
mkdirSync(output, { recursive: true });
const app = express();
app.use(express.static(resolve("dist")));
const server = app.listen(4188, "127.0.0.1");
const browser = await chromium.launch();
const results = [];
try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const route of selectedRoutes) {
      const errors = [];
      const onError = (error) => errors.push(error.message);
      page.on("pageerror", onError);
      const response = await page.goto("http://127.0.0.1:4188" + route, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      const height = await page
        .locator("body")
        .evaluate((el) => el.scrollHeight);
      for (let y = 0; y < height; y += 800) {
        await page.evaluate((y) => scrollTo(0, y), y);
        await page.waitForTimeout(40);
      }
      await page.waitForFunction(
        () =>
          [...document.querySelectorAll("main img")].every(
            (img) => img.complete,
          ),
        { timeout: 15000 },
      );
      await page.locator("main img").evaluateAll(async (imgs) => {
        await Promise.all(
          imgs.map(async (img) => {
            img.loading = "eager";
            await img.decode();
          }),
        );
      });
      await page.evaluate(() => scrollTo(0, 0));
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        h1: document.querySelectorAll("main h1").length,
        brokenImages: [...document.querySelectorAll("main img")]
          .filter((img) => !img.naturalWidth)
          .map((img) => img.src),
        emptyLinks: [...document.querySelectorAll("a")]
          .filter(
            (a) => !a.getAttribute("href") || a.getAttribute("href") === "#",
          )
          .map((a) => a.textContent),
      }));
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      // Expand the capture viewport so Chromium paints decoded offscreen gallery images.
      await page.setViewportSize({ width, height: Math.ceil(metrics.height) });
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator("main img").evaluateAll(async (imgs) => {
        await Promise.all(imgs.map((img) => img.decode()));
      });
      await page.waitForTimeout(250);
      await page.screenshot({
        path: resolve(output, `${name}-${width}.png`),
        fullPage: true,
      });
      await page.setViewportSize({ width, height: 1000 });
      let violations = [];
      if ([390, 768, 1440].includes(width)) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        violations = axe.violations;
        writeFileSync(
          resolve(output, `axe-${name}-${width}.json`),
          JSON.stringify({ violations, incomplete: axe.incomplete }, null, 2),
        );
      }
      const row = {
        route,
        width,
        status: response.status(),
        ...metrics,
        errors,
        violations,
      };
      results.push(row);
      console.log(
        width,
        route,
        "height",
        metrics.height,
        "overflow",
        metrics.scrollWidth - width,
        "axe",
        violations.map((v) => v.id),
        "images",
        metrics.brokenImages.length,
      );
      // Text spacing and zoom/reflow equivalents must preserve content at narrow widths.
      if (width === 320) {
        const style = await page.addStyleTag({
          content:
            "main * {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} main p {margin-bottom:2em!important}",
        });
        row.textSpacingOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        await style.evaluate((el) => el.remove());
      }
      page.off("pageerror", onError);
    }
    await context.close();
  }
} finally {
  writeFileSync(
    resolve(output, "results.json"),
    JSON.stringify(results, null, 2),
  );
  await browser.close();
  server.close();
}
const failures = results.filter(
  (x) =>
    x.status !== 200 ||
    x.scrollWidth > x.width ||
    x.h1 !== 1 ||
    x.brokenImages.length ||
    x.emptyLinks.length ||
    x.errors.length ||
    x.violations.length ||
    x.textSpacingOverflow,
);
assert.deepEqual(
  failures,
  [],
  "Responsive/accessibility findings need correction",
);
console.log(`${results.length} rendered route/width combinations passed.`);
