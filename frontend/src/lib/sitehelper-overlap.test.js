// ITEM 4 test (LOOK-SITE-1): the "Ask a question" launcher must never sit over text or a control.
//
// The brief names four widths (1440, 1280, 390, 360) and four pages (/, /credentials, /contact,
// /students). On each, at the top of the page and at three scroll positions, this drives the real
// built site in a browser and checks that the launcher's box does not intersect any link, button,
// input, select, textarea or label that is in the viewport. The launcher is expected to carry
// `data-sitehelper-launcher` and, whenever it is visible, an accessible name.
//
// It runs under `npm test` alongside the source-reading suites. It is deliberately a browser test:
// layout, not source text, is what the brief is about, and this must be able to fail honestly.
import test from "node:test";
import assert from "node:assert/strict";
import puppeteer from "puppeteer";
import { withDistServer } from "../../scripts/lib/serve-dist.mjs";

const LAUNCHER = "[data-sitehelper-launcher]";
const ROUTES = ["/", "/credentials", "/contact", "/students"];
const WIDTHS = [
  { width: 1440, height: 900 },
  { width: 1280, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 780 },
];
// The top of the page and three scroll positions, as fractions of the scrollable height.
const SCROLLS = [0, 0.33, 0.66, 1];

// Runs in the page: is the launcher visible, what is its accessible name, and what (if anything) in
// the viewport does it cover?
function inspectLauncher(selector) {
  const describe = (el) => {
    const cls = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
    return `${el.tagName.toLowerCase()}${cls ? `.${cls}` : ""}`;
  };
  const launcher = document.querySelector(selector);
  if (!launcher) return { found: false };
  const style = getComputedStyle(launcher);
  const box = launcher.getBoundingClientRect();
  const visible =
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    Number(style.opacity) > 0.01 &&
    box.width > 0 &&
    box.height > 0;
  const name = (launcher.getAttribute("aria-label") || launcher.textContent || "").trim();
  const hits = [];
  if (visible) {
    for (const el of document.querySelectorAll("a, button, input, select, textarea, label")) {
      if (el === launcher || launcher.contains(el) || el.contains(launcher)) continue;
      if (el.closest(".visually-hidden, .jw-skip-link")) continue;
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) === 0) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth) continue;
      const overlap = !(box.right <= r.left || box.left >= r.right || box.bottom <= r.top || box.top >= r.bottom);
      if (overlap) {
        hits.push({ selector: describe(el), text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 48) });
      }
    }
  }
  return { found: true, visible, name, hits };
}

test("the helper launcher never covers a control or link at the four widths", async () => {
  const failures = [];
  let found = 0;
  let visibleChecks = 0;
  await withDistServer(async (origin) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    try {
      for (const viewport of WIDTHS) {
        const page = await browser.newPage();
        await page.setViewport(viewport);
        // The stylesheet sets `transition-duration: .001ms` under reduced motion (index.css), so the
        // launcher's 0.2s fade cannot leave it caught mid-transition when the box is measured.
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
        for (const route of ROUTES) {
          await page.goto(`${origin}${route}`, { waitUntil: "networkidle0" });
          for (const fraction of SCROLLS) {
            await page.evaluate((f) => {
              // `html { scroll-behavior: smooth }` would leave the page mid-animation and the check
              // would only ever see the top. Jump instantly, then put the stylesheet back.
              const root = document.documentElement;
              const previous = root.style.scrollBehavior;
              root.style.scrollBehavior = "auto";
              const max = Math.max(0, root.scrollHeight - window.innerHeight);
              window.scrollTo({ top: Math.round(max * f), left: 0, behavior: "instant" });
              root.style.scrollBehavior = previous;
            }, fraction);
            // Let any scroll-driven visibility effect settle.
            await new Promise((r) => setTimeout(r, 120));
            const result = await page.evaluate(inspectLauncher, LAUNCHER);
            if (!result.found) {
              failures.push(`${route} @ ${viewport.width}px: no ${LAUNCHER} element found`);
              break;
            }
            found += 1;
            if (result.visible) {
              visibleChecks += 1;
              if (!result.name) failures.push(`${route} @ ${viewport.width}px scroll ${fraction}: launcher visible but has no accessible name`);
              for (const hit of result.hits) {
                failures.push(`${route} @ ${viewport.width}px scroll ${fraction}: launcher covers ${hit.selector} “${hit.text}”`);
              }
            }
          }
          if (failures.some((f) => f.startsWith(`${route} @ ${viewport.width}px: no `))) continue;
        }
        await page.close();
      }
    } finally {
      await browser.close();
    }
  });
  assert.ok(found > 0, "the launcher was never found — it must carry data-sitehelper-launcher");
  assert.deepEqual(failures, [], `launcher overlaps:\n${failures.join("\n")}`);
  console.log(`\nsitehelper overlap: ${found} positions checked across ${ROUTES.length} routes x ${WIDTHS.length} widths; launcher visible at ${visibleChecks}`);
});
