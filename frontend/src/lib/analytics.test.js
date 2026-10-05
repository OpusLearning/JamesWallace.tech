// Tests for the SPA's page-view counting rules (src/lib/analytics.js).
//
// Run with Node's built-in test runner: `npm test` (no new dependency). The module is
// dependency-free and React-free on purpose, so the counting rules can be tested without a
// browser or a renderer; the React hook is a one-line caller.
import test from "node:test";
import assert from "node:assert/strict";
import { createPageviewCounter, pageviewPath, recordEnquirySent } from "./analytics.js";

/** A fake window.goatcounter that records every count() call. */
function fakeGoatcounter() {
  const calls = [];
  return {
    calls,
    api: { count: (args) => calls.push(args) },
  };
}

/** A fake scheduler whose callbacks run only when flush() is called. */
function fakeScheduler() {
  const queue = [];
  return {
    schedule: (fn) => {
      queue.push(fn);
      return queue.length;
    },
    flush() {
      let guard = 0;
      while (queue.length && guard++ < 1000) queue.shift()();
    },
    size: () => queue.length,
  };
}

test("pageviewPath combines pathname and search", () => {
  assert.equal(pageviewPath({ pathname: "/contact", search: "?for=la" }), "/contact?for=la");
  assert.equal(pageviewPath({ pathname: "/" }), "/");
  assert.equal(pageviewPath({ pathname: "/cookies", search: "" }), "/cookies");
});

test("counts immediately when the script is already ready", () => {
  const gc = fakeGoatcounter();
  const s = fakeScheduler();
  const counter = createPageviewCounter({ getGoatcounter: () => gc.api, schedule: s.schedule });

  assert.equal(counter.count("/"), true);
  assert.deepEqual(gc.calls, [{ path: "/" }]);
  assert.equal(s.size(), 0); // nothing left pending
});

test("retries until the async script loads, then counts once", () => {
  const gc = fakeGoatcounter();
  const s = fakeScheduler();
  let reads = 0;
  // Not ready for the first two reads, then ready — like an async script still loading.
  const getGoatcounter = () => (++reads > 2 ? gc.api : undefined);
  const counter = createPageviewCounter({ getGoatcounter, schedule: s.schedule });

  counter.count("/privacy");
  assert.deepEqual(gc.calls, []); // nothing yet
  s.flush();
  assert.deepEqual(gc.calls, [{ path: "/privacy" }]); // exactly one
  assert.equal(s.size(), 0);
});

test("gives up quietly when the script never loads", () => {
  const gc = fakeGoatcounter();
  const s = fakeScheduler();
  const counter = createPageviewCounter({
    getGoatcounter: () => undefined,
    maxAttempts: 3,
    schedule: s.schedule,
  });

  assert.doesNotThrow(() => {
    counter.count("/");
    s.flush();
  });
  assert.deepEqual(gc.calls, []);
  assert.equal(s.size(), 0); // no endless retry loop
});

test("a consecutive repeat of the same path is one count (StrictMode / re-render)", () => {
  const gc = fakeGoatcounter();
  const s = fakeScheduler();
  const counter = createPageviewCounter({ getGoatcounter: () => gc.api, schedule: s.schedule });

  assert.equal(counter.count("/about"), true);
  assert.equal(counter.count("/about"), false);
  assert.equal(gc.calls.length, 1);
});

test("distinct navigations each count, including a return (A, B, A)", () => {
  const gc = fakeGoatcounter();
  const s = fakeScheduler();
  const counter = createPageviewCounter({ getGoatcounter: () => gc.api, schedule: s.schedule });

  counter.count("/");
  counter.count("/privacy");
  counter.count("/");
  assert.deepEqual(gc.calls, [{ path: "/" }, { path: "/privacy" }, { path: "/" }]);
});

test("a throwing count() never propagates", () => {
  const s = fakeScheduler();
  const api = {
    count: () => {
      throw new Error("blocked by an extension");
    },
  };
  const counter = createPageviewCounter({ getGoatcounter: () => api, schedule: s.schedule });

  assert.doesNotThrow(() => counter.count("/"));
});

test("a throwing getGoatcounter() never propagates", () => {
  const s = fakeScheduler();
  const counter = createPageviewCounter({
    getGoatcounter: () => {
      throw new Error("window unavailable");
    },
    maxAttempts: 1,
    schedule: s.schedule,
  });

  assert.doesNotThrow(() => {
    counter.count("/");
    s.flush();
  });
});

// --- Enquiry events (recordEnquirySent) ------------------------------------------------

test("records one enquiry event on a confirmed send", () => {
  const gc = fakeGoatcounter();
  assert.equal(
    recordEnquirySent(true, { ok: true }, "/contact", { getGoatcounter: () => gc.api }),
    true,
  );
  assert.deepEqual(gc.calls, [{ path: "enquiry-sent /contact", title: "Enquiry sent", event: true }]);

  const gc2 = fakeGoatcounter();
  assert.equal(
    recordEnquirySent(true, { success: true }, "/tuition", { getGoatcounter: () => gc2.api }),
    true,
  );
  assert.deepEqual(gc2.calls, [{ path: "enquiry-sent /tuition", title: "Enquiry sent", event: true }]);
});

test("does not record an enquiry event when the send was not confirmed", () => {
  const cases = [
    [false, { ok: true }], // server said no
    [true, null], // no body
    [true, {}], // unconfirmed body
    [true, { ok: false }],
    [true, { success: false }],
    [true, { ok: false, success: false }],
  ];
  for (const [ok, result] of cases) {
    const gc = fakeGoatcounter();
    assert.equal(
      recordEnquirySent(ok, result, "/contact", { getGoatcounter: () => gc.api }),
      false,
    );
    assert.deepEqual(gc.calls, []);
  }
});

test("stays silent when the counting script is missing", () => {
  assert.equal(
    recordEnquirySent(true, { ok: true }, "/contact", { getGoatcounter: () => undefined }),
    false,
  );
  // A goatcounter object that exists but has no count() is treated as missing.
  assert.equal(
    recordEnquirySent(true, { ok: true }, "/contact", { getGoatcounter: () => ({}) }),
    false,
  );
});

test("a throwing counter or window never propagates from an enquiry event", () => {
  const api = {
    count: () => {
      throw new Error("blocked by an extension");
    },
  };
  assert.doesNotThrow(() => {
    assert.equal(
      recordEnquirySent(true, { ok: true }, "/contact", { getGoatcounter: () => api }),
      false,
    );
  });
  assert.doesNotThrow(() => {
    assert.equal(
      recordEnquirySent(true, { ok: true }, "/contact", {
        getGoatcounter: () => {
          throw new Error("window unavailable");
        },
      }),
      false,
    );
  });
});
