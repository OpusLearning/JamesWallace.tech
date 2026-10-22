// First-load JavaScript gate (DAILY-2026-10-22-main-bundle).
//
// The entry chunk is what every visitor downloads before anything renders. On 18 Oct 2026 SEO-SPEED split
// the 22 routes into their own chunks and the entry fell from 504 kB raw / 149 kB gzip to 273.85 kB raw /
// 89.16 kB gzip (measured 22 Oct 2026). What is left is the floor: react-dom, react-router and the shell
// (Header, Footer, the accessibility widget, SiteHelper). Nothing else can be deferred without changing
// what the first read shows, so this gate keeps the floor from creeping back.
//
// A dependency added to the shell — an animation library, a UI kit, an icon set — is the usual way it
// creeps. When that is deliberate, raise the budget in the same commit and say why; when it is not, this
// fails and the import goes back into a route chunk.
//
// Run directly (`node scripts/bundle-size-gate.mjs`) or as part of `npm test`. Reads `dist/`, so it builds
// first when there is no build. It exits 1 and never skips silently (main() is called unconditionally, for
// the symlink reason recorded in meta-gate.mjs).
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";
import { dist, ensureBuild } from "./lib/serve-dist.mjs";

const BUDGET_RAW_KB = 300;
const BUDGET_GZIP_KB = 100;

const kb = (bytes) => bytes / 1024;
const round = (n) => Math.round(n * 100) / 100;

function main() {
  ensureBuild();
  const html = readFileSync(join(dist, "index.html"), "utf8");

  // The entry is the module script in the built HTML; its name carries the content hash, so it is read
  // from the markup rather than guessed.
  const match = html.match(/<script[^>]*type="module"[^>]*src="([^"]+\.js)"/);
  if (!match) {
    console.error("bundle gate FAILED: no module entry script in dist/index.html");
    process.exit(1);
  }
  const entryUrl = match[1];
  const entryPath = join(dist, entryUrl.replace(/^\//, ""));
  const body = readFileSync(entryPath);
  const raw = kb(body.length);
  const gzip = kb(gzipSync(body, { level: 9 }).length);

  console.log(`entry ${entryUrl}`);
  console.log(`  raw  ${round(raw)} kB  (budget ${BUDGET_RAW_KB})`);
  console.log(`  gzip ${round(gzip)} kB  (budget ${BUDGET_GZIP_KB})`);

  const over = [];
  if (raw > BUDGET_RAW_KB) over.push(`raw ${round(raw)} kB over ${BUDGET_RAW_KB} kB`);
  if (gzip > BUDGET_GZIP_KB) over.push(`gzip ${round(gzip)} kB over ${BUDGET_GZIP_KB} kB`);

  if (over.length) {
    console.error(`\nbundle gate FAILED: ${over.join("; ")}`);
    console.error("Something that belongs to one route is in the shell. Move the import into that page,");
    console.error("or raise the budget here in the same commit and record why.");
    process.exit(1);
  }
  console.log("bundle gate PASSED");
}

main();
