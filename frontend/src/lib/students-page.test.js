// STUDENTS-1: the /students page for young people.
//
// Four things the brief requires a check for: that the route is registered so it builds and
// prerenders (router, prerender list and sitemap, like the local county pages); that the copy keeps
// the brief's forbidden things out (no prices, no tender/bid/framework, never "SEMH school", no
// form and no field inviting a child's details); that every outside link carries rel="noopener";
// and that the page actually prerenders when a build exists. Read from the source and the built
// output directly, so it runs under the same `npm test` as everything else, with no browser.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url)); // src/lib
const src = join(here, ".."); // src
const frontend = join(src, ".."); // frontend
const read = (p) => readFileSync(p, "utf8");

const ROUTE = "/students";
// A sentence only this page carries, so a passing build proves /students rendered and not the shell.
const MARKER = "not a counsellor or an emergency service";

test("the /students route is registered in the router, the prerender list and the sitemap", () => {
  const app = read(join(src, "App.jsx"));
  const prerender = read(join(frontend, "prerender.mjs"));
  const sitemap = read(join(frontend, "public", "sitemap.xml"));
  assert.match(app, new RegExp(`path="${ROUTE}"`), `${ROUTE} missing from App.jsx`);
  assert.ok(prerender.includes(`'${ROUTE}'`), `${ROUTE} missing from prerender.mjs ROUTES`);
  assert.ok(sitemap.includes(`https://jameswallace.tech${ROUTE}`), `${ROUTE} missing from sitemap.xml`);
});

test("the students copy keeps the brief's rules", () => {
  const file = join(src, "pages", "Students.jsx");
  assert.ok(existsSync(file), "Students.jsx is missing");
  const text = read(file);
  const forbidden = [
    { name: "a price", re: /£|\bper hour\b|\bper day\b/i },
    { name: "“tender”", re: /\btender\b/i },
    { name: "“framework”", re: /\bframework\b/i },
    { name: "“bid”", re: /\bbid\b/i },
    { name: "the phrase “SEMH school”", re: /SEMH school/i },
  ];
  const offenders = forbidden.filter(({ re }) => re.test(text)).map(({ name }) => name);
  assert.deepEqual(offenders, []);
  // No form and no field that invites a child's own details (the brief: link /contact instead).
  assert.ok(!/<form\b/i.test(text), "Students.jsx contains a <form>");
  assert.ok(!/<input\b/i.test(text), "Students.jsx contains an <input>");
});

test("every outside link on the page carries rel=\"noopener\"", () => {
  const text = read(join(src, "pages", "Students.jsx"));
  // The services are data-driven, so the link address is `{s.url}`; an outside link is one that
  // opens in a new tab. Every such anchor must carry rel="noopener".
  const newTab = text.match(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/g) || [];
  assert.ok(newTab.length > 0, "no outside links found in Students.jsx");
  for (const tag of newTab) {
    assert.ok(/rel=["'][^"']*noopener/.test(tag), `outside link without rel="noopener": ${tag}`);
  }
  // And the services point at https outside the site, never at a relative path.
  for (const url of text.match(/url:\s*"[^"]+"/g) || []) {
    assert.match(url, /url:\s*"https:\/\//, `a service URL is not an https outside link: ${url}`);
  }
});

test("the /students page prerenders with its own content", () => {
  const file = join(frontend, "dist", "students", "index.html");
  if (!existsSync(file)) return; // no build in this checkout; the registration test above still holds
  assert.ok(read(file).includes(MARKER), `/students prerendered HTML is missing "${MARKER}"`);
});
