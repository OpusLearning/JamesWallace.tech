// SERVE-DIST-404 (backlog, Claude 20 Nov 2026): the loopback server the browser gates use
// (`scripts/lib/serve-dist.mjs`) used to answer 200 with the SPA shell for every path that was not
// a file in `dist/`. A gate could then check a status code and read it as "page exists" for a route
// that was never built. The server must now answer 404 for a path the build does not contain, and
// serve the built 404 page so the response is still a real page rather than the shell.
//
// Both assertions fail on the old fallback: `/not-a-real-route` returned 200 with `dist/index.html`,
// and a missing asset was answered with HTML under a 200.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { withDistServer, dist } from "../../scripts/lib/serve-dist.mjs";

test("a built route and a static file are served with 200", async () => {
  await withDistServer(async (origin) => {
    for (const route of ["/", "/about", "/about/", "/robots.txt"]) {
      const res = await fetch(`${origin}${route}`);
      assert.equal(res.status, 200, `${route} should be served from dist`);
      assert.match(res.headers.get("content-type") || "", /text\/(html|plain)/, `${route} content type`);
      await res.text();
    }
  });
});

test("a path the build does not contain returns 404, not the SPA shell", async () => {
  const home = readFileSync(join(dist, "index.html"), "utf8");
  const notFound = readFileSync(join(dist, "404.html"), "utf8");
  await withDistServer(async (origin) => {
    for (const route of ["/not-a-real-route", "/assets/does-not-exist.js"]) {
      const res = await fetch(`${origin}${route}`);
      assert.equal(res.status, 404, `${route} is not in the build and must be 404`);
      assert.match(res.headers.get("content-type") || "", /^text\/html/, `${route} should serve the 404 page`);
      const body = await res.text();
      assert.notEqual(body, home, `${route} was answered with the SPA shell`);
      assert.equal(body, notFound, `${route} should serve the built 404 page`);
    }
  });
});
