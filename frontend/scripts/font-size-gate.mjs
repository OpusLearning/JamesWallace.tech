// ITEM 1 gate (LOOK-SITE-1): nothing readable may compute below 14px, at 1440 or at 390 wide.
//
// It renders every prerendered route with puppeteer and walks the real laid-out text nodes,
// reading each one's computed font-size. The only allowed exception is the footer's one-line legal
// small print, which may be 13px: that element (or an ancestor) carries `data-legal-small`.
//
// Run directly (`node scripts/font-size-gate.mjs`) or as part of `npm test`. It exits 1 and prints
// every offender, grouped by route and width, when anything is too small — it never skips silently.
import puppeteer from "puppeteer";
import { withDistServer, prerenderedRoutes } from "./lib/serve-dist.mjs";

const MIN_PX = 14;
const WIDTHS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];

// Runs in the page. Returns one record per distinct too-small element, plus a count of every
// visible text node seen so the summary is honest about how much was actually checked.
function collectBelowMin(minPx) {
  const describe = (el) => {
    const cls = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 3).join(".");
    return `${el.tagName.toLowerCase()}${cls ? `.${cls}` : ""}`;
  };
  const offenders = [];
  const seen = new Set();
  let visible = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = (node.nodeValue || "").trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el) continue;
    if (el.closest("[data-legal-small]")) continue;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) continue;
    const box = el.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) continue;
    visible += 1;
    const size = parseFloat(style.fontSize);
    if (size < minPx) {
      const key = `${describe(el)}|${text.slice(0, 40)}`;
      if (!seen.has(key)) {
        seen.add(key);
        offenders.push({ selector: describe(el), size, text: text.slice(0, 72) });
      }
    }
  }
  return { visible, offenders };
}

async function main() {
  const routes = prerenderedRoutes();
  let failures = 0;
  let checked = 0;
  await withDistServer(async (origin) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    try {
      for (const viewport of WIDTHS) {
        const page = await browser.newPage();
        await page.setViewport(viewport);
        for (const route of routes) {
          await page.goto(`${origin}${route}`, { waitUntil: "networkidle0" });
          const { visible, offenders } = await page.evaluate(collectBelowMin, MIN_PX);
          checked += visible;
          if (offenders.length) {
            failures += offenders.length;
            console.log(`FAIL ${route} @ ${viewport.width}px — ${offenders.length} below ${MIN_PX}px (of ${visible} text nodes)`);
            for (const o of offenders) {
              console.log(`   ${o.size}px  ${o.selector}  “${o.text}”`);
            }
          } else {
            console.log(`ok   ${route} @ ${viewport.width}px — ${visible} text nodes all >= ${MIN_PX}px`);
          }
        }
        await page.close();
      }
    } finally {
      await browser.close();
    }
  });
  console.log(`\nfont-size gate: ${routes.length} routes x ${WIDTHS.length} widths, ${checked} visible text nodes checked, ${failures} below ${MIN_PX}px`);
  if (failures) {
    console.error(`font-size gate FAILED: ${failures} elements below ${MIN_PX}px`);
    process.exit(1);
  }
  console.log("font-size gate PASSED");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
