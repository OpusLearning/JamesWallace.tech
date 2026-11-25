// Tuesday layout gate (DAILY-2026-11-20-layout-gate): the ten most-visible pages are checked at
// 1440 and 390 wide for two defects a reader sees but a status code cannot: an image cropped by
// more than a third inside its box, and two blocks of text drawn on top of each other.
//
// This replaces the throwaway crop/overlap script used for the Tuesday daily check. It renders
// the built site with puppeteer, so run `npm run build` first (the harness builds when `dist/` is
// missing). It exits 1 and prints every offender; it never skips silently.
//
// Crop: only `object-fit: cover` (and a background-size: cover image) can crop at all. For those,
// the fraction of the picture still visible is min(box aspect / natural aspect, natural / box),
// and the check fails when more than a third of the picture is hidden.
//
// Overlap: only leaf text blocks are compared — an element with its own direct non-empty text and
// a block-level display. One block inside another is not an overlap, and inline runs are skipped,
// so ordinary inline links and spans are not reported.
import puppeteer from "puppeteer";
import { withDistServer } from "./lib/serve-dist.mjs";

const PAGES = [
  "/",
  "/provision",
  "/for-las",
  "/tuition",
  "/platform",
  "/compliance",
  "/credentials",
  "/about",
  "/contact",
  "/sample-report",
];
const WIDTHS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
];
const CROP_LIMIT = 1 / 3;
const OVERLAP_LIMIT = 0.3; // share of the smaller block's area
const OVERLAP_MIN_AREA = 100; // px², so touching edges and hairline rules are not findings
const IMAGE_LOAD_TIMEOUT = 10000; // ms; one broken asset must not hang the gate
const SCROLL_TIMEOUT = 5000; // ms; a throttled requestAnimationFrame must not hang the gate either
const FRAME_TIMEOUT = 250; // ms; per scroll step, so one stuck frame cannot eat the whole budget

// A `loading="lazy"` image below the fold has naturalWidth 0 until the browser decides to fetch it,
// and the crop check would skip it silently (review LOW-1, 20 Nov 2026). Force every lazy image to
// eager, walk the page once so anything still deferred starts, then wait for load/error. A failed
// image keeps naturalWidth 0 and is skipped exactly as before; the timeout only caps the wait.
async function settleImages(page) {
  await page.evaluate(() => {
    for (const img of document.images) {
      if (img.loading === "lazy") img.loading = "eager";
    }
  });
  await page.evaluate(
    async ({ budget, frame }) => {
      const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
      const height = Math.max(
        document.body ? document.body.scrollHeight : 0,
        document.documentElement.scrollHeight
      );
      const deadline = performance.now() + budget;
      // One stuck frame (throttled or paused rAF) resolves after `frame` ms at most; the whole
      // walk stops at the budget, then scrolls back to the top (review LOW-3, 24 Nov 2026).
      const nextFrame = () =>
        new Promise((resolve) => {
          let timer;
          const done = () => {
            clearTimeout(timer);
            resolve();
          };
          timer = setTimeout(done, frame);
          requestAnimationFrame(done);
        });
      for (let y = 0; y <= height && performance.now() < deadline; y += step) {
        window.scrollTo(0, y);
        await nextFrame();
      }
      window.scrollTo(0, 0);
    },
    { budget: SCROLL_TIMEOUT, frame: FRAME_TIMEOUT }
  );
  await page.evaluate(
    (timeout) =>
      Promise.all(
        [...document.images].map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            let timer;
            const done = () => {
              clearTimeout(timer);
              resolve();
            };
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
            timer = setTimeout(done, timeout);
          });
        })
      ),
    IMAGE_LOAD_TIMEOUT
  );
}

// Runs in the page. Async only because a background-size: cover image has to be loaded before its
// natural size is known.
async function collectLayout(limits) {
  const describe = (el) => {
    const tag = el.tagName.toLowerCase();
    const cls = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
    const text = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 50);
    return `${tag}${cls ? `.${cls}` : ""}${text ? ` | ${text}` : ""}`;
  };
  const visible = (el) => {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  const inFixedSticky = (el) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const p = getComputedStyle(n).position;
      if (p === "fixed" || p === "sticky") return true;
    }
    return false;
  };
  const inClosedDetails = (el) => !!(el.closest && el.closest("details:not([open])"));

  const out = {
    crops: [],
    overlaps: [],
    stats: { images: 0, cover: 0, backgrounds: 0, textBlocks: 0 },
  };

  // ---- crops ----
  const cropOf = (naturalWidth, naturalHeight, width, height) => {
    const boxAR = width / height;
    const natAR = naturalWidth / naturalHeight;
    const visibleFraction = Math.min(boxAR / natAR, natAR / boxAR, 1);
    return 1 - visibleFraction;
  };
  for (const img of document.images) {
    if (!visible(img)) continue;
    if (inFixedSticky(img) || inClosedDetails(img)) continue;
    out.stats.images += 1;
    const fit = getComputedStyle(img).objectFit;
    if (fit !== "cover") continue;
    out.stats.cover += 1;
    if (!img.naturalWidth || !img.naturalHeight) continue;
    const box = img.getBoundingClientRect();
    const hidden = cropOf(img.naturalWidth, img.naturalHeight, box.width, box.height);
    if (hidden > limits.crop) {
      out.crops.push({
        src: (img.currentSrc || img.src || "").split("/").slice(-2).join("/"),
        hidden: Math.round(hidden * 1000) / 10,
        box: `${Math.round(box.width)}x${Math.round(box.height)}`,
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        el: describe(img),
      });
    }
  }
  // Background images with background-size: cover.
  const bgSeen = new Set();
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (s.backgroundImage === "none" || !/cover/.test(s.backgroundSize)) continue;
    const m = s.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (!m || bgSeen.has(m[1])) continue;
    if (!visible(el) || inFixedSticky(el) || inClosedDetails(el)) continue;
    bgSeen.add(m[1]);
    out.stats.backgrounds += 1;
    const box = el.getBoundingClientRect();
    try {
      const loaded = await new Promise((resolve, reject) => {
        const probe = new Image();
        probe.onload = () => resolve(probe);
        probe.onerror = reject;
        probe.src = m[1];
      });
      const hidden = cropOf(loaded.naturalWidth, loaded.naturalHeight, box.width, box.height);
      if (hidden > limits.crop) {
        out.crops.push({
          src: m[1].split("/").slice(-2).join("/"),
          hidden: Math.round(hidden * 1000) / 10,
          box: `${Math.round(box.width)}x${Math.round(box.height)}`,
          natural: `${loaded.naturalWidth}x${loaded.naturalHeight}`,
          el: describe(el),
        });
      }
    } catch {
      // An unloadable background is a broken asset, not a crop; other checks cover it.
    }
  }

  // ---- text overlaps ----
  const blocks = [];
  for (const el of document.querySelectorAll("body *")) {
    if (!visible(el) || inFixedSticky(el) || inClosedDetails(el)) continue;
    if (el.getAttribute("aria-hidden") === "true") continue;
    let own = "";
    for (const node of el.childNodes) if (node.nodeType === 3) own += node.textContent;
    if (!own.trim()) continue;
    const display = getComputedStyle(el).display;
    if (display === "inline" || display === "contents") continue;
    const r = el.getBoundingClientRect();
    blocks.push({ el, r, area: r.width * r.height });
  }
  out.stats.textBlocks = blocks.length;
  for (let i = 0; i < blocks.length; i += 1) {
    for (let j = i + 1; j < blocks.length; j += 1) {
      const a = blocks[i];
      const b = blocks[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const left = Math.max(a.r.left, b.r.left);
      const right = Math.min(a.r.right, b.r.right);
      const top = Math.max(a.r.top, b.r.top);
      const bottom = Math.min(a.r.bottom, b.r.bottom);
      if (right <= left || bottom <= top) continue;
      const area = (right - left) * (bottom - top);
      const smaller = Math.min(a.area, b.area);
      if (area <= limits.minArea || area <= smaller * limits.overlap) continue;
      out.overlaps.push({
        share: Math.round((area / smaller) * 100),
        a: describe(a.el),
        b: describe(b.el),
      });
    }
  }
  return out;
}

// Offline proof that the checks still catch real defects and ignore the benign shapes. The fixture
// holds one cover crop over a third, one contain image (cannot crop), two overlapping text blocks,
// two ordinary paragraphs, and a parent and child block that overlap only because they nest.
const FIXTURE = `<!doctype html><html><head><style>
 body { margin: 0; font: 16px sans-serif; }
 img { display: block; }
 .crop, .contain { width: 100px; height: 100px; }
 .crop { object-fit: cover; }
 .contain { object-fit: contain; }
 .box { position: absolute; width: 120px; height: 40px; }
 .one { top: 600px; left: 50px; }
 .two { top: 610px; left: 60px; }
 .normal { margin-top: 80px; }
</style></head><body>
 <img class="crop" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23888'/%3E%3C/svg%3E">
 <img class="contain" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23888'/%3E%3C/svg%3E">
 <div class="box one">First block of text</div>
 <div class="box two">Second block of text</div>
 <p class="normal">Ordinary paragraph one.</p>
 <p>Ordinary paragraph two.</p>
 <div>Parent direct text <span>inline run</span><p>Child block text.</p></div>
</body></html>`;

// Lazy-loading fixture: the cover image sits below a 6000px spacer, so it is out of view at 1440x900
// and well beyond Chrome's lazy-load distance thresholds (a 2500px spacer could auto-load on some
// profiles and flake the "starts unloaded" check — review LOW-2, 24 Nov 2026). Without settleImages
// the browser leaves it unloaded and the crop check skips it; with settling it loads and its 50% crop
// is reported. This is the regression the self-test must catch.
const LAZY_FIXTURE = `<!doctype html><html><head><style>
 body { margin: 0; font: 16px sans-serif; }
 .spacer { height: 6000px; }
 .crop { width: 100px; height: 100px; object-fit: cover; }
</style></head><body>
 <div class="spacer"></div>
 <img id="lazy" class="crop" loading="lazy" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23888'/%3E%3C/svg%3E">
</body></html>`;

async function selfTest() {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(FIXTURE)}`, { waitUntil: "load" });
    const result = await page.evaluate(collectLayout, {
      crop: CROP_LIMIT,
      overlap: OVERLAP_LIMIT,
      minArea: OVERLAP_MIN_AREA,
    });

    const lazyPage = await browser.newPage();
    await lazyPage.setViewport({ width: 1440, height: 900 });
    await lazyPage.goto(`data:text/html;charset=utf-8,${encodeURIComponent(LAZY_FIXTURE)}`, { waitUntil: "load" });
    const lazyLimits = { crop: CROP_LIMIT, overlap: OVERLAP_LIMIT, minArea: OVERLAP_MIN_AREA };
    const lazyState = () =>
      lazyPage.evaluate(() => {
        const img = document.getElementById("lazy");
        const box = img.getBoundingClientRect();
        return { loading: img.loading, complete: img.complete, naturalWidth: img.naturalWidth, top: box.top };
      });
    const lazyBefore = await lazyState();
    const resultBefore = await lazyPage.evaluate(collectLayout, lazyLimits);
    await settleImages(lazyPage);
    const lazyAfter = await lazyState();
    const resultAfter = await lazyPage.evaluate(collectLayout, lazyLimits);
    await lazyPage.close();

    const checks = [
      ["one cover crop over a third is reported", result.crops.length === 1],
      ["the cover crop is 50% hidden", result.crops[0] && Math.round(result.crops[0].hidden) === 50],
      ["an object-fit: contain image is not a crop", !result.crops.some((c) => c.el.includes("contain"))],
      ["one pair of overlapping text blocks is reported", result.overlaps.length === 1],
      [
        "the overlapping pair is the two absolute blocks",
        result.overlaps[0] && result.overlaps[0].a.includes("First block") && result.overlaps[0].b.includes("Second block"),
      ],
      [
        "ordinary paragraphs are not an overlap",
        !result.overlaps.some((o) => o.a.includes("Ordinary paragraph") || o.b.includes("Ordinary paragraph")),
      ],
      [
        "a parent and child block are not an overlap",
        !result.overlaps.some((o) => o.a.includes("Parent direct text") || o.b.includes("Child block text")),
      ],
      ["the lazy cover starts unloaded below the fold", lazyBefore.naturalWidth === 0 && lazyBefore.top > 900],
      ["without settling, the lazy cover is skipped", resultBefore.crops.length === 0],
      [
        "settling makes the lazy cover eager and loaded",
        lazyAfter.loading === "eager" && lazyAfter.complete && lazyAfter.naturalWidth > 0,
      ],
      [
        "after settling, the lazy 50% crop is reported",
        resultAfter.crops.length === 1 && Math.round(resultAfter.crops[0].hidden) === 50,
      ],
    ];
    let failed = 0;
    for (const [name, ok] of checks) {
      console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
      if (!ok) failed += 1;
    }
    console.log(`\nlayout gate self-test: ${checks.length - failed}/${checks.length} checks passed`);
    if (failed) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

async function main() {
  let failures = 0;
  const totals = { images: 0, cover: 0, backgrounds: 0, textBlocks: 0, runs: 0 };
  await withDistServer(async (origin) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    try {
      for (const viewport of WIDTHS) {
        const page = await browser.newPage();
        await page.setViewport(viewport);
        for (const route of PAGES) {
          const response = await page.goto(`${origin}${route}`, { waitUntil: "networkidle0" });
          const status = response ? response.status() : null;
          await settleImages(page);
          const result = await page.evaluate(collectLayout, {
            crop: CROP_LIMIT,
            overlap: OVERLAP_LIMIT,
            minArea: OVERLAP_MIN_AREA,
          });
          totals.runs += 1;
          for (const key of ["images", "cover", "backgrounds", "textBlocks"]) totals[key] += result.stats[key];
          if (status !== 200) {
            failures += 1;
            console.log(`FAIL ${route} @ ${viewport.width}px — HTTP ${status}`);
            continue;
          }
          if (result.crops.length || result.overlaps.length) {
            failures += result.crops.length + result.overlaps.length;
            console.log(
              `FAIL ${route} @ ${viewport.width}px — ${result.crops.length} crop(s), ${result.overlaps.length} overlap(s)`
            );
            for (const c of result.crops) {
              console.log(`   crop ${c.hidden}% hidden  ${c.src}  ${c.natural} in ${c.box}  ${c.el}`);
            }
            for (const o of result.overlaps) {
              console.log(`   overlap ${o.share}%  ${o.a} <> ${o.b}`);
            }
          } else {
            console.log(
              `ok   ${route} @ ${viewport.width}px — ${result.stats.textBlocks} text blocks, ` +
                `${result.stats.cover} cover image(s), ${result.stats.backgrounds} cover background(s)`
            );
          }
        }
        await page.close();
      }
    } finally {
      await browser.close();
    }
  });
  console.log(
    `\nlayout gate: ${totals.runs} runs, ${totals.textBlocks} text blocks, ${totals.images} images ` +
      `(${totals.cover} cover, ${totals.backgrounds} cover backgrounds), ${failures} problem(s)`
  );
  if (failures) {
    console.error(`layout gate FAILED: ${failures} crop/overlap problem(s)`);
    process.exit(1);
  }
  console.log("layout gate PASSED");
}

if (process.argv.includes("--self-test")) {
  selfTest().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
