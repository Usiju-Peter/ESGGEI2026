import express from "express";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "./routes.mjs";
const app = express();
app.get(routes, (req, res) =>
  res.sendFile(
    resolve(
      "dist",
      req.path === "/" ? "index.html" : req.path.slice(1) + "/index.html",
    ),
  ),
);
app.use(express.static("dist"));
const server = app.listen(4183, "127.0.0.1");
const browser = await chromium.launch();
const out = process.env.PREMIUM_OUTPUT || "audit-results/premium";
mkdirSync(out, { recursive: true });
const results = [];
try {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4183/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    let height = await page.locator("body").evaluate((el) => el.scrollHeight);
    for (let y = 0; y < height; y += 650) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(250);
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await page.locator("main h1").count(), 1);
    const metric = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      heading: getComputedStyle(document.querySelector("h1")).fontFamily,
      images: [...document.querySelectorAll("main img")]
        .filter((x) => !x.complete || x.naturalWidth === 0)
        .map((x) => x.src),
    }));
    assert.ok(metric.scrollWidth <= width, `Overflow at ${width}`);
    assert.deepEqual(metric.images, []);
    assert.deepEqual(errors, []);
    assert.equal(
      await page.evaluate(() => document.getAnimations().length),
      0,
      "Reduced motion must disable entrance animations",
    );
    await page.screenshot({
      path: resolve(out, `home-${width}.png`),
      fullPage: true,
    });
    let violations = [];
    if ([390, 768, 1440].includes(width)) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      violations = axe.violations;
      writeFileSync(
        resolve(out, `axe-${width}.json`),
        JSON.stringify(axe, null, 2),
      );
    }
    results.push({ ...metric, violations });
    console.log(
      width,
      metric.height,
      "overflow",
      metric.scrollWidth - width,
      "axe",
      violations.map((x) => x.id),
    );
    if (width === 390) {
      const menu = page.getByRole("button", { name: "Toggle menu" });
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      await page.keyboard.press("Tab");
      assert.ok(
        await page.evaluate(
          () =>
            document.activeElement instanceof HTMLAnchorElement ||
            document.activeElement instanceof HTMLButtonElement,
        ),
      );
    }
    await context.close();
  }
  const motionPage = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  await motionPage.goto("http://127.0.0.1:4183/", { waitUntil: "networkidle" });
  await motionPage.locator(".p-about").scrollIntoViewIfNeeded();
  await motionPage.waitForTimeout(600);
  assert.equal(
    await motionPage
      .locator(".p-about")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  await motionPage
    .getByRole("link", { name: "Explore Our Work", exact: true })
    .focus();
  assert.notEqual(
    await motionPage
      .locator(".p-action")
      .first()
      .evaluate((el) => getComputedStyle(el).outlineStyle),
    "none",
  );
  await motionPage.close();
  writeFileSync(resolve(out, "results.json"), JSON.stringify(results, null, 2));
  assert.ok(
    results.every((x) => x.violations.length === 0),
    "Accessibility findings require review",
  );
} finally {
  await browser.close();
  server.close();
}
