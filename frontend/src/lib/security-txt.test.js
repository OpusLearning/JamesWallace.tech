// RFC 9116 security.txt: the file must survive the build and be served as itself, not as the SPA
// shell. The SPA returns 200 for every route, so the check is on the body, never the status alone.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { withDistServer, frontend } from "../../scripts/lib/serve-dist.mjs";

const SOURCE = join(frontend, "public", ".well-known", "security.txt");

test("the build serves /.well-known/security.txt as a real file", async () => {
  const expected = readFileSync(SOURCE, "utf8");
  await withDistServer(async (origin) => {
    const res = await fetch(`${origin}/.well-known/security.txt`);
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.equal(body, expected, "the SPA shell was served instead of security.txt");
    assert.match(res.headers.get("content-type") || "", /^text\/plain/);
  });
});

test("security.txt carries the RFC 9116 required fields", () => {
  const body = readFileSync(SOURCE, "utf8");
  assert.match(body, /^Contact: mailto:hello@jameswallace\.tech$/m);
  const expires = body.match(/^Expires: (.+)$/m);
  assert.ok(expires, "missing Expires");
  const when = new Date(expires[1]);
  assert.equal(Number.isNaN(when.getTime()), false, "Expires is not an RFC 3339 date");
  assert.ok(when > new Date(), "Expires must be in the future");
  assert.match(body, /^Preferred-Languages: en$/m);
  assert.match(body, /^Canonical: https:\/\/jameswallace\.tech\/\.well-known\/security\.txt$/m);
});
