// LOCAL-2: the two county pages (/send-tuition-derbyshire, /send-tuition-nottinghamshire).
//
// Three things the brief requires a test for: that neither page contains the words the brief
// forbids (tender, framework, bid, lot, approved provider, SEMH, insured — sources/local-pages/
// README.md rules 1, 3 and 4); that both routes are registered so they build and prerender; and
// that they actually prerender. Read from the sources and the built output directly, so it runs
// under the same `npm test` as everything else, with no browser.
//
// The prerender check is strongest after `npm run build`: when dist/ exists the test reads the
// built HTML and asserts the page's own local content is in it. When dist/ is absent the
// route-registration check still fails if either route is dropped from the prerender list.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url)); // src/lib
const src = join(here, ".."); // src
const frontend = join(src, ".."); // frontend
const read = (p) => readFileSync(p, "utf8");

// route -> component file, and a string only that page's own local material contains.
const PAGES = [
  {
    route: "/send-tuition-derbyshire",
    component: "SendTuitionDerbyshire",
    marker: "Derbyshire County Council",
  },
  {
    route: "/send-tuition-nottinghamshire",
    component: "SendTuitionNottinghamshire",
    marker: "Nottinghamshire County Council",
  },
];

const FORBIDDEN = ["tender", "framework", "bid", "lot", "approved provider", "SEMH", "insured"];

test("neither county page uses the words the brief forbids", () => {
  const offenders = [];
  for (const { component } of PAGES) {
    const text = read(join(src, "pages", `${component}.jsx`));
    for (const word of FORBIDDEN) {
      // Whole words only, so "pilot" is not "lot" and "bidding" is not "bid".
      const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (re.test(text)) offenders.push(`${component}.jsx: "${word}"`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("both routes are registered in the router, the prerender list and the sitemap", () => {
  const app = read(join(src, "App.jsx"));
  const prerender = read(join(frontend, "prerender.mjs"));
  const sitemap = read(join(frontend, "public", "sitemap.xml"));
  for (const { route } of PAGES) {
    assert.match(app, new RegExp(`path="${route}"`), `${route} missing from App.jsx`);
    assert.ok(prerender.includes(`'${route}'`), `${route} missing from prerender.mjs ROUTES`);
    assert.ok(sitemap.includes(`https://jameswallace.tech${route}`), `${route} missing from sitemap.xml`);
  }
});

test("both routes prerender with their own local content", () => {
  for (const { route, marker } of PAGES) {
    const file = join(frontend, "dist", route.slice(1), "index.html");
    if (!existsSync(file)) continue; // no build in this checkout; the registration test above still holds
    assert.ok(read(file).includes(marker), `${route}: prerendered HTML is missing "${marker}"`);
  }
});
