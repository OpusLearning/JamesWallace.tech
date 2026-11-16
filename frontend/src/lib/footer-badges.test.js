// BADGE-WEIGHT (backlog, 16 Nov 2026): the seven footer marks must stay the same images, at the same
// boxes, with a much smaller transfer weight. This test reads the facts registry, then drives the built
// site in a browser at the two widths the brief names and checks:
//   - every referenced file resolves and the seven total is under the weight ceiling;
//   - the five raster marks are served as WebP (the two SVGs stay vector);
//   - every image loads, its intrinsic size matches the declared width/height (no layout-shift
//     mismatch), and its rendered height is the CSS target for its mark at that width;
//   - screenshots are written for the 04 handoff.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { REGISTRATIONS } from "../data/facts.js";
import { withDistServer } from "../../scripts/lib/serve-dist.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "../../public");
const images = REGISTRATIONS.filter((r) => r.image);

// The weight ceilings are deliberately below today's 198,420 B; they are the guard-rail that stops
// the strip creeping back. A file over 40 kB or a strip over 100 kB is a failed job, not a warning.
const PER_FILE_MAX = 40_000;
const TOTAL_MAX = 100_000;
const RASTER_KEYS = ["ico", "nasen", "disability-confident", "google-cyber", "armed-forces-covenant"];

test("footer badges resolve and stay within the weight budget", () => {
  let total = 0;
  for (const r of images) {
    const file = path.join(publicDir, r.image.replace(/^\//, ""));
    assert.ok(fs.existsSync(file), `${r.key}: ${r.image} is missing from public/`);
    const bytes = fs.statSync(file).size;
    total += bytes;
    assert.ok(bytes <= PER_FILE_MAX, `${r.key}: ${r.image} is ${bytes} B, over the ${PER_FILE_MAX} B ceiling`);
  }
  for (const key of RASTER_KEYS) {
    const r = images.find((x) => x.key === key);
    assert.ok(r, `${key} is still in REGISTRATIONS`);
    assert.match(r.image, /\.webp$/, `${key} should be served as WebP, got ${r.image}`);
  }
  assert.ok(total <= TOTAL_MAX, `the seven footer badges total ${total} B, over the ${TOTAL_MAX} B ceiling`);
});

test("footer badges render at the declared size at 1280 and 390", async () => {
  const shotDir = path.join(os.tmpdir(), "jw-badge-weight");
  fs.mkdirSync(shotDir, { recursive: true });
  const failures = [];
  const shots = [];

  await withDistServer(async (origin) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    try {
      for (const width of [1280, 390]) {
        const page = await browser.newPage();
        await page.setViewport({ width, height: width === 390 ? 844 : 900 });
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
        for (const route of ["/", "/credentials"]) {
          await page.goto(`${origin}${route}`, { waitUntil: "networkidle0" });
          // The marks are loading="lazy" and sit below the fold. Force them eager, bring the footer
          // into view and wait for decode, or every file reads as 0x0 and the test proves nothing.
          await page.evaluate(async () => {
            const imgs = [...document.querySelectorAll("img.jw-badge-logo")];
            for (const img of imgs) img.loading = "eager";
            window.scrollTo(0, document.body.scrollHeight);
            await Promise.all(
              imgs.map((img) =>
                img.complete
                  ? img.decode().catch(() => {})
                  : new Promise((resolve) => {
                      img.addEventListener("load", resolve, { once: true });
                      img.addEventListener("error", resolve, { once: true });
                    }),
              ),
            );
          });
          const found = await page.evaluate(() => {
            const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const expectedRem = (src) => {
              const wide = innerWidth >= 1000;
              if (src.endsWith("nasen.webp")) return wide ? 2.6 : 2.5;
              if (src.endsWith("skills-training-group.svg")) return wide ? 2.6 : 2.4;
              if (src.endsWith("armed-forces-covenant.webp")) return wide ? 4 : 3.6;
              return wide ? 3.2 : 3;
            };
            return [...document.querySelectorAll("img.jw-badge-logo")].map((img) => {
              const rect = img.getBoundingClientRect();
              const cs = getComputedStyle(img);
              // Compare the content box: the Armed Forces Covenant mark carries vertical padding for
              // its white ground, so the border box is legitimately taller than the CSS height.
              const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
              return {
                src: img.getAttribute("src"),
                alt: img.getAttribute("alt"),
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                attrWidth: Number(img.getAttribute("width")),
                attrHeight: Number(img.getAttribute("height")),
                renderedHeight: rect.height - paddingY,
                expectedHeight: expectedRem(img.getAttribute("src") || "") * rootPx,
              };
            });
          });
          if (found.length !== images.length) {
            failures.push(`${route} @ ${width}px: ${found.length} badge images rendered, expected ${images.length}`);
          }
          for (const img of found) {
            const label = `${route} @ ${width}px ${img.src}`;
            if (!img.complete || img.naturalWidth < 1) failures.push(`${label}: image did not load`);
            if (img.naturalWidth !== img.attrWidth || img.naturalHeight !== img.attrHeight) {
              failures.push(`${label}: intrinsic ${img.naturalWidth}x${img.naturalHeight} does not match declared ${img.attrWidth}x${img.attrHeight}`);
            }
            if (Math.abs(img.renderedHeight - img.expectedHeight) > 1) {
              failures.push(`${label}: rendered ${img.renderedHeight.toFixed(1)}px, expected ${img.expectedHeight.toFixed(1)}px`);
            }
            if (!img.alt) failures.push(`${label}: empty alt`);
          }
          const shot = path.join(shotDir, `${route === "/" ? "home" : "credentials"}-${width}.png`);
          await page.screenshot({ path: shot, fullPage: true });
          shots.push(shot);
        }
        await page.close();
      }
    } finally {
      await browser.close();
    }
  });

  assert.deepEqual(failures, [], `footer badge failures:\n${failures.join("\n")}`);
  console.log(`\nfooter badge shots (whole page): ${shots.join(", ")}`);
});
