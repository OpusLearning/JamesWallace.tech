// server/test/api.test.js
//
// Drives the real Express apps on ephemeral loopback ports with a throwaway SQLite database.
// Nothing here touches the live enquiry database or any external service.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tempDir = mkdtempSync(join(tmpdir(), "jw-site-sec1-"));
process.env.DB_PATH = join(tempDir, "test-orders.db");

const { app, healthDetailApp } = await import("../app.js");

let publicServer;
let publicPort;
let detailServer;
let detailPort;

function listen(serverApp) {
  return new Promise((resolve, reject) => {
    const server = serverApp.listen(0, "127.0.0.1", () => resolve(server));
    server.once("error", reject);
  });
}

before(async () => {
  publicServer = await listen(app);
  publicPort = publicServer.address().port;
  detailServer = await listen(healthDetailApp);
  detailPort = detailServer.address().port;
});

after(async () => {
  await new Promise((resolve) => publicServer.close(resolve));
  await new Promise((resolve) => detailServer.close(resolve));
  rmSync(tempDir, { recursive: true, force: true });
});

function request(port, pathname, { host = "jameswallace.tech", method = "GET", headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "127.0.0.1", port, path: pathname, method, headers: { host, ...headers } },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => { body += chunk; });
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

test("public /api/health returns only {ok:true}", async () => {
  const res = await request(publicPort, "/api/health", { host: "jameswallace.tech" });
  assert.equal(res.status, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(res.headers["x-powered-by"], undefined);
});

test("a public health response carries no storage, counts or email detail", async () => {
  const res = await request(publicPort, "/api/health", { host: "jameswallace.tech" });
  const body = JSON.parse(res.body);
  assert.deepEqual(Object.keys(body), ["ok"]);
  assert.doesNotMatch(res.body, /enquiries|unseen|writable|storage|email/i);
});

test("a client-chosen loopback Host cannot unlock detail on the public listener", async () => {
  for (const host of ["localhost", "127.0.0.1:443", `[::1]:${publicPort}`]) {
    const res = await request(publicPort, "/api/health", { host });
    assert.equal(res.status, 200, `Host ${host}`);
    assert.deepEqual(JSON.parse(res.body), { ok: true }, `Host ${host}`);
  }
});

test("a proxied public request with a loopback Host and X-Forwarded-For gets {ok} only", async () => {
  const res = await request(publicPort, "/api/health", {
    host: "localhost",
    headers: { "x-forwarded-for": "203.0.113.9" },
  });
  assert.equal(res.status, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
});

test("the loopback detail listener keeps the detail the monitor needs", async () => {
  const res = await request(detailPort, "/api/health", { host: "localhost" });
  assert.equal(res.status, 200);
  assert.equal(res.headers["x-powered-by"], undefined);
  const body = JSON.parse(res.body);
  assert.equal(body.ok, true);
  assert.equal(body.storage.writable, true);
  assert.equal(typeof body.storage.enquiries, "number");
  assert.equal(typeof body.storage.unseen, "number");
  assert.equal(typeof body.email, "boolean");
});

test("unknown /api routes return a JSON 404, not Express's HTML page", async () => {
  for (const method of ["GET", "POST"]) {
    const res = await request(publicPort, "/api/does-not-exist", { method });
    assert.equal(res.status, 404);
    assert.equal((res.headers["content-type"] || "").split(";")[0], "application/json");
    assert.deepEqual(JSON.parse(res.body), { error: "not found" });
    assert.doesNotMatch(res.body, /Cannot (GET|POST)/);
    assert.equal(res.headers["x-powered-by"], undefined);
  }
});
