// Page-metadata and structured-data gate (DAILY-2026-10-16-structured-data).
//
// Checks what a crawler, a link preview or an AI assistant sees in each page before any JavaScript
// runs: exactly one non-empty <title> and meta description, a canonical that matches the route (and
// none at all on a noindex page), a matching og:url, and JSON-LD that parses and puts each property
// on a type schema.org defines it for. It never looks at, or changes, visible text.
//
// Added after the 16 Oct audit found `areaServed` on a Person (/agencies) and a ContactPage
// (/contact) — a point the 9 Oct red team had already flagged and nothing had fixed. It reads the
// prerendered output, so run `npm run build` first (the harness builds if `dist/` is missing).
//
// Run directly (`node scripts/meta-gate.mjs`) or as part of `npm test`. It exits 1 and prints every
// offender; it never skips silently.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { dist, ensureBuild, prerenderedRoutes } from "./lib/serve-dist.mjs";

const ORIGIN = "https://jameswallace.tech";

// The property => types rules the audit needed. A property key absent here is not checked, so this
// stays a small, honest rule set rather than a re-implementation of schema.org. `areaServed` is
// defined for these types and not for Person or ContactPage, which is what the two 16 Oct fixes
// removed.
const PROPERTY_DOMAINS = {
  areaServed: [
    "Organization",
    "EducationalOrganization",
    "LocalBusiness",
    "Service",
    "Product",
    "Offer",
    "Place",
    "ContactPoint",
  ],
};

function routeFile(route) {
  return route === "/" ? join(dist, "index.html") : join(dist, route.replace(/^\//, ""), "index.html");
}

function firstTag(haystack, re) {
  const m = haystack.match(re);
  return m ? m[0] : null;
}

function attr(tag, name) {
  if (!tag) return null;
  const m = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
}

// Every object in a parsed JSON-LD block, at any depth, so a nested node is checked too.
function walk(value, visit) {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
  } else if (value && typeof value === "object") {
    visit(value);
    for (const item of Object.values(value)) walk(item, visit);
  }
}

export function checkRoute(route, html) {
  const problems = [];

  const titles = html.match(/<title[^>]*>[\s\S]*?<\/title>/gi) || [];
  if (titles.length !== 1) problems.push(`expected exactly one <title>, found ${titles.length}`);
  const titleText = titles[0] ? titles[0].replace(/<[^>]*>/g, "").trim() : "";
  if (!titleText) problems.push("empty <title>");

  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  const descriptions = metas.filter((t) => (attr(t, "name") || "").toLowerCase() === "description");
  if (descriptions.length !== 1) problems.push(`expected exactly one meta description, found ${descriptions.length}`);
  if (descriptions[0] && !(attr(descriptions[0], "content") || "").trim()) problems.push("empty meta description");

  const robots = metas.find((t) => (attr(t, "name") || "").toLowerCase() === "robots");
  const noindex = /noindex/i.test(attr(robots, "content") || "");

  const canonicalTag = firstTag(html, /<link\b[^>]*\brel=["']canonical["'][^>]*>/i);
  const canonical = attr(canonicalTag, "href");
  const ogUrlTag = metas.find((t) => (attr(t, "property") || "").toLowerCase() === "og:url");
  const ogUrl = attr(ogUrlTag, "content");

  if (noindex) {
    if (canonical) problems.push(`noindex page carries a canonical (${canonical})`);
    if (ogUrl) problems.push(`noindex page carries og:url (${ogUrl})`);
  } else {
    const expected = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`;
    if (canonical !== expected) problems.push(`canonical is ${canonical || "missing"}, expected ${expected}`);
    if (ogUrl !== expected) problems.push(`og:url is ${ogUrl || "missing"}, expected ${expected}`);
  }

  const blocks = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const block of blocks) {
    const inner = block.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "");
    let parsed;
    try {
      parsed = JSON.parse(inner);
    } catch (error) {
      problems.push(`JSON-LD does not parse: ${String(error.message).slice(0, 60)}`);
      continue;
    }
    walk(parsed, (node) => {
      const types = [].concat(node["@type"] || []);
      for (const [key, domain] of Object.entries(PROPERTY_DOMAINS)) {
        if (!(key in node)) continue;
        const placeable = types.some((type) => domain.includes(type));
        if (!placeable) {
          problems.push(`JSON-LD: "${key}" is not defined for @type ${types.join("/") || "(none)"}`);
        }
      }
    });
  }

  return problems;
}

function main() {
  ensureBuild();
  const routes = prerenderedRoutes();
  let failures = 0;
  for (const route of routes) {
    const file = routeFile(route);
    if (!existsSync(file)) {
      failures += 1;
      console.log(`FAIL ${route} — no prerendered file at ${file.replace(dist, "dist")}`);
      continue;
    }
    const problems = checkRoute(route, readFileSync(file, "utf8"));
    if (problems.length) {
      failures += problems.length;
      console.log(`FAIL ${route}`);
      for (const problem of problems) console.log(`   ${problem}`);
    } else {
      console.log(`ok   ${route}`);
    }
  }
  console.log(`\nmeta gate: ${routes.length} routes checked, ${failures} problems`);
  if (failures) {
    console.error(`meta gate FAILED: ${failures} problems`);
    process.exit(1);
  }
  console.log("meta gate PASSED");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
