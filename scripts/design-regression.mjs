import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import express from "express";
import { chromium } from "playwright";
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
app.use(express.static("dist", { redirect: false }));
const server = app.listen(4180, "127.0.0.1");
const browser = await chromium.launch();
const results = [];
const output = process.env.DESIGN_AUDIT_DIR || "audit-results/design";
mkdirSync(output, { recursive: true });
const luminance = (rgb) =>
  rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (values[1] + 0.05) / (values[0] + 0.05);
};
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto("http://127.0.0.1:4180" + route, {
        waitUntil: "domcontentloaded",
      });
      await page.locator("main h1").waitFor();
      const metric = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        footerHeight: document.querySelector("footer").getBoundingClientRect()
          .height,
        introHeight:
          document.querySelector(".page-intro")?.getBoundingClientRect()
            .height ?? null,
        h1Size: getComputedStyle(document.querySelector("main h1")).fontSize,
        featureTop:
          document.querySelector(".project-feature")?.getBoundingClientRect()
            .top ?? null,
        emailTop:
          document
            .querySelector('main a[href="mailto:esgeei@gmail.com"]')
            ?.getBoundingClientRect().top ?? null,
      }));
      if (route === '/projects/guruku-gbayi-outreach' && width === 1440) {
        const alignment = await page.evaluate(() => ({
          heading: document.querySelector('main h1').getBoundingClientRect().left,
          prose: document.querySelector('main article .reading-width > p:not(.eyebrow)').getBoundingClientRect().left
        }));
        assert.ok(Math.abs(alignment.heading - alignment.prose) <= 1, 'Outreach headings and prose must share a reading column');
      }
      results.push({ route, ...metric });
      assert.ok(
        metric.scrollWidth <= width,
        `${route} overflows ${width}px (${metric.scrollWidth})`,
      );
      if (metric.introHeight !== null)
        assert.ok(
          metric.introHeight <= 360,
          `${route} introduction is too tall at ${width}`,
        );
      if (width === 390) {
        assert.ok(
          metric.footerHeight < 850,
          "Mobile footer should remain compact",
        );
        if (route === "/")
          assert.ok(
            metric.height < 6500,
            "Home should not regain the audited excessive length",
          );
        if (route === "/partner")
          assert.ok(
            metric.emailTop < 600,
            "Direct contact must be available near the top",
          );
      }
      if (width === 390) {
        const spacing = await page.addStyleTag({ content: 'main * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } main p { margin-bottom: 2em !important; }' });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} must reflow with increased text spacing`);
        await spacing.evaluate(el => el.remove());
      }
      if (
        process.env.DESIGN_SCREENSHOTS === "1" &&
        [390, 1440].includes(width)
      ) {
        for (let y = 0; y < metric.height; y += 700) {
          await page.evaluate((y) => scrollTo(0, y), y);
          await page.waitForTimeout(70);
        }
        await page.waitForTimeout(300);
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path: resolve(
            output,
            `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}.png`,
          ),
          fullPage: true,
        });
      }
    }
    if (width === 1440) {
      await page.goto("http://127.0.0.1:4180/", {
        waitUntil: "domcontentloaded",
      });
      const action = page.getByRole("link", {
        name: "Explore Our Work",
        exact: true,
      });
      for (const state of ["default", "hover", "focus"]) {
        if (state === "hover") {
          await action.hover();
          await page.waitForTimeout(180);
        }
        if (state === "focus") await action.focus();
        const colors = await action.evaluate((el) => {
          const s = getComputedStyle(el);
          return { fg: s.color, bg: s.backgroundColor };
        });
        const ratio = contrast(
          colors.fg
            .match(/[\d.]+/g)
            .slice(0, 3)
            .map(Number),
          colors.bg
            .match(/[\d.]+/g)
            .slice(0, 3)
            .map(Number),
        );
        assert.ok(
          ratio >= 4.5,
          `Primary action ${state} contrast must be 4.5:1 (${ratio})`,
        );
        console.log(`Primary action ${state}: ${ratio.toFixed(2)}:1`);
      }
    }
    await context.close();
    console.log(
      `Responsive layout passed at ${width}px across ${routes.length} routes.`,
    );
  }
} finally {
  writeFileSync(
    resolve(output, "measurements.json"),
    JSON.stringify(results, null, 2),
  );
  await browser.close();
  server.close();
}
