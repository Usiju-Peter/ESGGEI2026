import assert from "node:assert/strict";
import express from "express";
import { resolve } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
const app = express();
app.use(express.static(resolve("dist")));
const server = app.listen(4196, "127.0.0.1");
const browser = await chromium.launch();
const findings = [];
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const base = "http://127.0.0.1:4196";
async function checkState(name) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  findings.push({ name, violations: result.violations });
  assert.equal(result.violations.length, 0, name);
}
try {
  await page.goto(base + "/");
  await page.keyboard.press("Tab");
  assert.equal(
    await page
      .getByRole("link", { name: "Skip to main content" })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.keyboard.press("Enter");
  assert.equal(
    await page.locator("main").evaluate((el) => el === document.activeElement),
    true,
  );
  await page.goto(base + "/team", { waitUntil: "networkidle" });
  const biographies = page.getByRole("button", { name: /Read biography of/ });
  for (let i = 0; i < (await biographies.count()); i++) {
    const trigger = biographies.nth(i);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.getByRole("dialog").waitFor();
    await checkState("biography-" + i);
    const close = page.getByRole("button", { name: "Close biography" });
    await page.keyboard.press("Tab");
    assert.equal(
      await close.evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "detached" });
    assert.equal(
      await trigger.evaluate((el) => el === document.activeElement),
      true,
    );
  }
  await page.goto(base + "/gallery", { waitUntil: "networkidle" });
  const photo = page.getByRole("button", { name: /Open featured image/ });
  await photo.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("dialog").waitFor();
  await checkState("gallery-dialog");
  const original = await page.locator("#gallery-caption").textContent();
  await page.keyboard.press("ArrowRight");
  assert.notEqual(
    await page.locator("#gallery-caption").textContent(),
    original,
  );
  await page.keyboard.press("ArrowLeft");
  assert.equal(await page.locator("#gallery-caption").textContent(), original);
  await page.keyboard.press("Escape");
  assert.equal(
    await photo.evaluate((el) => el === document.activeElement),
    true,
  );
  await page.goto(base + "/partner", { waitUntil: "networkidle" });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  await page.getByRole("button", { name: "Copy Account Details", exact: true }).click();
  await page.getByRole("button", { name: "Copied Account Number!", exact: true }).waitFor();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), "5601549746");
  assert.equal(
    await page.locator("form").evaluate((form) => form.checkValidity()),
    false,
  );
  let release;
  const gate = new Promise((resolve) => (release = resolve));
  await page.route("https://formsubmit.co/**", async (route) => {
    await gate;
    await route.fulfill({ json: { success: false } });
  });
  for (const [label, value] of [
    ["Full Name", "QA Example"],
    ["Email Address", "qa@example.com"],
    ["Subject", "Mock QA"],
    ["Message", "Mocked test only"],
  ])
    await page.getByLabel(label, { exact: true }).fill(value);
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  assert.equal(
    await page.getByRole("button", { name: "Sending Message..." }).isDisabled(),
    true,
  );
  release();
  await page.getByRole("alert").waitFor();
  await checkState("contact-error");
  await page.unroute("https://formsubmit.co/**");
  await page.route("https://formsubmit.co/**", (route) =>
    route.fulfill({ json: { success: true } }),
  );
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await page.getByRole("status").waitFor();
  await checkState("contact-success");
  console.log(
    "Keyboard skip link, three biography focus loops, gallery keys, required form validation, loading, error and success states passed.",
  );
} finally {
  mkdirSync("audit-results", { recursive: true });
  writeFileSync(
    "audit-results/interactive-states.json",
    JSON.stringify(findings, null, 2),
  );
  await browser.close();
  server.close();
}
