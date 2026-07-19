import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback for SPA routing in development, serving and transforming index.html
    app.get("*", async (req, res, next) => {
      // If the request points to a static file or has an extension, let it fall through
      if (req.path.includes(".")) {
        return next();
      }
      const url = req.originalUrl;
      try {
        // Try to find a physical index.html for the requested path first
        let templatePath = path.join(process.cwd(), req.path, "index.html");
        if (!fs.existsSync(templatePath)) {
          templatePath = path.resolve(process.cwd(), "index.html");
        }
        let template = fs.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Fallback for all other routes to index.html (SPA routing support)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
