import express from "express";
import {
  existsSync,
  statSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { resolve, extname } from "node:path";
import { gzipSync } from "node:zlib";
import { spawn } from "node:child_process";
import { routes } from "./routes.mjs";
const output = process.env.LIGHTHOUSE_OUTPUT || "audit-results/lighthouse";
mkdirSync(output, { recursive: true });
const root = resolve("dist");
const app = express();
// Local measurements use compressed HTML/CSS/JS, like normal CDN delivery.
app.use((req, res, next) => {
  let file = resolve(root, "." + req.path);
  if (!file.startsWith(root + "/") && file !== root) return next();
  if (existsSync(file) && statSync(file).isDirectory())
    file = resolve(file, "index.html");
  if (
    existsSync(file) &&
    [".html", ".css", ".js", ".json", ".svg"].includes(extname(file)) &&
    req.headers["accept-encoding"]?.includes("gzip")
  ) {
    res.type(extname(file));
    res.set("Content-Encoding", "gzip");
    res.set("Vary", "Accept-Encoding");
    return res.send(gzipSync(readFileSync(file)));
  }
  next();
});
app.use(express.static(root));
const server = process.env.LIGHTHOUSE_BASE_URL
  ? null
  : app.listen(4195, "127.0.0.1");
const base = process.env.LIGHTHOUSE_BASE_URL || "http://127.0.0.1:4195";
const measuredRoutes = process.env.LIGHTHOUSE_ROUTES
  ? process.env.LIGHTHOUSE_ROUTES.split(",")
  : routes;
const binary =
  process.env.LIGHTHOUSE_BIN || resolve("node_modules/.bin/lighthouse");
const rows = [];
try {
  for (const route of measuredRoutes) {
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    const path = resolve(output, `${name}.json`);
    await new Promise((done, reject) => {
      const child = spawn(
        binary,
        [
          base + route,
          "--chrome-flags=--headless --no-sandbox",
          "--only-categories=performance,accessibility,best-practices,seo",
          "--output=json",
          `--output-path=${path}`,
          "--quiet",
        ],
        { stdio: "inherit", env: process.env },
      );
      child.on("error", reject);
      child.on("close", (code) =>
        code === 0
          ? done()
          : reject(new Error(`Lighthouse exited ${code} for ${route}`)),
      );
    });
    const d = JSON.parse(readFileSync(path, "utf8"));
    const row = {
      route,
      version: "optimized",
      lighthouseVersion: d.lighthouseVersion,
      fetchTime: d.fetchTime,
      testedUrl: d.finalUrl,
      scores: Object.fromEntries(
        Object.entries(d.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ]),
      ),
      lcp: d.audits["largest-contentful-paint"].numericValue,
      cls: d.audits["cumulative-layout-shift"].numericValue,
      tbt: d.audits["total-blocking-time"].numericValue,
      settings: d.configSettings,
      warnings: d.runWarnings,
    };
    rows.push(row);
    console.log(JSON.stringify(row));
    writeFileSync(
      resolve(output, "summary.json"),
      JSON.stringify(rows, null, 2),
    );
  }
} finally {
  server?.close();
}
