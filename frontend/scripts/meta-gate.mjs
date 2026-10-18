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

  problems.push(...checkGraph(route, blocks), ...checkHead(route, html));
  return problems;
}

// Audit follow-ups, 18 Oct 2026 (QUEUE SEO-2). The company and James are one node each, joined by @id,
// so every page that names James points at the same person and the home page says who runs the company
// (site audit E1, E3).
const ORG_ID = `${ORIGIN}/#org`;
const PERSON_ID = `${ORIGIN}/#james`;

function nodesOf(blocks) {
  const nodes = [];
  for (const block of blocks) {
    try {
      walk(JSON.parse(block.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "")), (node) => nodes.push(node));
    } catch {
      // A block that does not parse is already reported above.
    }
  }
  return nodes;
}

export function checkGraph(route, blocks) {
  const problems = [];
  const nodes = nodesOf(blocks);
  const typed = (type) => nodes.filter((n) => [].concat(n["@type"] || []).includes(type));
  for (const person of typed("Person")) {
    if (person.name === "James Wallace" && person["@id"] !== PERSON_ID) {
      problems.push(`JSON-LD: a Person node for James Wallace has no "@id": "${PERSON_ID}"`);
    }
  }
  if (route === "/") {
    const org = typed("Organization").find((n) => n["@id"] === ORG_ID);
    if (!org) problems.push(`JSON-LD: no Organization with "@id": "${ORG_ID}"`);
    else {
      if (!JSON.stringify(org.identifier || "").includes("17479328")) problems.push("JSON-LD: Organization has no company number");
      if (org.founder?.["@id"] !== PERSON_ID) problems.push("JSON-LD: Organization founder does not point at James");
      if (!org.legalName) problems.push("JSON-LD: Organization has no legalName");
      if (![].concat(org.sameAs || []).some((u) => u.startsWith("https://maps.app.goo.gl/"))) {
        problems.push("JSON-LD: Organization sameAs has no Google Business Profile");
      }
    }
  }
  if (["/", "/about", "/credentials"].includes(route)) {
    const person = typed("Person").find((n) => n["@id"] === PERSON_ID && n.hasCredential);
    if (!person) problems.push(`JSON-LD: no full Person node "${PERSON_ID}" with credentials`);
    else if (person.worksFor?.["@id"] !== ORG_ID) problems.push("JSON-LD: Person worksFor does not point at the company");
  }
  return problems;
}

// Speed (site audit G1): the main stylesheet is inlined so it no longer blocks the first paint, and the
// image marked fetchpriority="high" is preloaded from the head, the phone file for phones and the srcset
// for wider screens, so the browser does not wait for the body to find it.
export function checkHead(route, html) {
  const problems = [];
  const head = html.slice(0, html.indexOf("</head>"));
  if (/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']\/assets\//i.test(head)) {
    problems.push("render-blocking stylesheet: /assets/*.css is linked, not inlined");
  }
  const body = html.slice(html.indexOf("</head>"));
  const hero = body.match(/<picture\b[^>]*>(?:(?!<\/picture>)[\s\S])*?fetchpriority="high"[\s\S]*?<\/picture>/i);
  if (hero) {
    const phone = hero[0].match(/<source\b[^>]*media="([^"]+)"[^>]*srcset="([^"]+)"/i);
    const preloads = head.match(/<link\b[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*>/gi) || [];
    if (phone && !preloads.some((l) => l.includes(`href="${phone[2]}"`) && l.includes(`media="${phone[1]}"`))) {
      problems.push(`hero not preloaded for phones (${phone[2]})`);
    }
    if (!preloads.some((l) => /imagesrcset=/i.test(l))) problems.push("hero not preloaded for wider screens");
  }
  return problems;
}

// llms.txt (site audit Q3): it exists, is plain text, and every link on this site goes to a real page or file.
export function checkLlms(text, exists) {
  const problems = [];
  if (!/^# /m.test(text)) problems.push("llms.txt has no '# ' title line");
  for (const [, url] of text.matchAll(/\((https:\/\/jameswallace\.tech[^)\s]*)\)/g)) {
    if (!exists(new URL(url).pathname)) problems.push(`llms.txt links to ${url}, which is not in dist`);
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
  const llms = join(dist, "llms.txt");
  const inDist = (path) => {
    const clean = path.replace(/\/$/, "");
    return routes.includes(clean || "/") || existsSync(join(dist, clean));
  };
  const llmsProblems = existsSync(llms) ? checkLlms(readFileSync(llms, "utf8"), inDist) : ["dist/llms.txt is missing"];
  for (const problem of llmsProblems) console.log(`FAIL llms.txt   ${problem}`);
  failures += llmsProblems.length;
  console.log(`\nmeta gate: ${routes.length} routes checked, ${failures} problems`);
  if (failures) {
    console.error(`meta gate FAILED: ${failures} problems`);
    process.exit(1);
  }
  console.log("meta gate PASSED");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
