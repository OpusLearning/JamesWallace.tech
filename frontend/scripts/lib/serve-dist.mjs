// Shared harness for the browser-based checks (the item 1 font-size gate and the item 4 helper
// overlap test). Serves the built site from `dist/` on an ephemeral loopback port and hands the
// caller its origin, so a check can drive the real prerendered pages with puppeteer.
//
// It builds first only when there is no `dist/index.html`; when a build already exists it is used
// as-is, which keeps `npm test` fast. A stale build is the caller's problem to avoid by running
// `npm run build` — a check must never quietly pass against old output, so callers rebuild in CI.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, normalize } from "node:path";

const here = dirname(fileURLToPath(import.meta.url)); // frontend/scripts/lib
export const frontend = join(here, "..", ".."); // frontend
export const dist = join(frontend, "dist");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

export function ensureBuild() {
  if (existsSync(join(dist, "index.html"))) return;
  execFileSync("npm", ["run", "build"], { cwd: frontend, stdio: "inherit" });
}

async function resolveFile(pathname) {
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let file = join(dist, safe);
  const candidates = [file, join(file, "index.html"), `${file}.html`, join(dist, "index.html")];
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // try the next candidate; the SPA shell is the last resort
    }
  }
  return join(dist, "index.html");
}

/** Run `fn(origin)` with the built site served; the server is always closed afterwards. */
export async function withDistServer(fn) {
  ensureBuild();
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      const file = await resolveFile(decodeURIComponent(url.pathname));
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(String(error));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  try {
    return await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

/** The routes the build prerenders, read from prerender.mjs so the two cannot drift. */
export function prerenderedRoutes() {
  const source = readFileSync(join(frontend, "prerender.mjs"), "utf8");
  const match = source.match(/const ROUTES\s*=\s*\[([\s\S]*?)\]/);
  if (!match) throw new Error("could not read ROUTES from prerender.mjs");
  return [...match[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
}
