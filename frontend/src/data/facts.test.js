// Source-consistency test for the five facts James confirmed on 9 Oct 2026 (QUEUE SITEFIX-3).
//
// Each fact is stated once in src/data/facts.js and imported wherever the site states it. This
// test reads the page and component sources directly (no bundler, no browser) and fails if an old
// area phrase is hard-coded on a page again, or the "D2N2" abbreviation appears, or one of the new
// facts is missing from facts.js. Run with `npm test` (Node's built-in test runner).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url)); // src/data
const src = join(here, ".."); // src

function sourceFiles(dir) {
  return readdirSync(join(src, dir))
    .filter((name) => name.endsWith(".jsx"))
    .map((name) => ({ file: `src/${dir}/${name}`, text: readFileSync(join(src, dir, name), "utf8") }));
}

const pageAndComponentFiles = [...sourceFiles("pages"), ...sourceFiles("components")];

// Phrases that must live nowhere but facts.js, and after this job must not live there either.
const FORBIDDEN = [
  "Derbyshire and Nottinghamshire, and online", // named in the brief
  "wider East Midlands", // named in the brief
  "Derbyshire and Nottinghamshire", // any remaining short form
  "Derbyshire, Nottinghamshire", // the comma variant
  "D2N2", // the brief: never write the abbreviation
];

test("no page or component hard-codes an old area phrase", () => {
  const offenders = [];
  for (const { file, text } of pageAndComponentFiles) {
    for (const phrase of FORBIDDEN) {
      if (text.includes(phrase)) offenders.push(`${file}: "${phrase}"`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("the new facts are defined once in facts.js", async () => {
  const facts = await import("./facts.js");
  assert.equal(
    facts.AREA.sentence,
    "In person across the East Midlands, mainly Derby, Derbyshire, Nottingham and Nottinghamshire, and online.",
  );
  assert.equal(
    facts.AREA.label,
    "East Midlands (mainly Derby, Derbyshire, Nottingham and Nottinghamshire); online anywhere",
  );
  assert.deepEqual(facts.AREA.jsonLd, [
    { "@type": "AdministrativeArea", name: "Derby" },
    { "@type": "AdministrativeArea", name: "Derbyshire" },
    { "@type": "AdministrativeArea", name: "Nottingham" },
    { "@type": "AdministrativeArea", name: "Nottinghamshire" },
    { "@type": "AdministrativeArea", name: "East Midlands" },
  ]);
  assert.equal(
    facts.SESSIONS.school,
    "Sessions can take place in a school where that suits the child, but most are at home, in an agreed community setting or online.",
  );
  assert.equal(
    facts.PLATFORM_STATUS.sentence,
    "The platform is built and has been tested end to end with made-up data. It goes into live use with the first commissioned placement.",
  );
  assert.equal(facts.SAFEGUARDING_CONTACT.email, "safeguarding@jameswallace.tech");
  assert.deepEqual(facts.PROFILES, [
    "https://www.linkedin.com/in/jameswallace-education",
    "https://www.youtube.com/@JamesWallaceEducation",
  ]);
});
