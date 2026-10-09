// Tests for the SPA's counting rules (src/lib/analytics.js).
//
// Run with Node's built-in test runner: `npm test` (no new dependency). The module is
// dependency-free and React-free on purpose, so the counting rules can be tested without a
// browser or a renderer; the React hook is a one-line caller.
import test from "node:test";
import assert from "node:assert/strict";
import {
  createPageviewCounter,
  pageviewPath,
  recordEnquirySent,
  enquiryEventPath,
  clickEventName,
  clickEventPath,
  installClickEvents,
} from "./analytics.js";

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

/** A fake document that records delegated listeners and whether they captured. */
function fakeDocument() {
  const listeners = {};
  const capture = {};
  return {
    listeners,
    capture,
    addEventListener: (type, fn, isCapture) => {
      (listeners[type] ||= []).push(fn);
      (capture[type] ||= []).push(Boolean(isCapture));
    },
    removeEventListener: (type, fn) => {
      const i = (listeners[type] || []).indexOf(fn);
      if (i >= 0) {
        listeners[type].splice(i, 1);
        capture[type].splice(i, 1);
      }
    },
  };
}

/** The event.target for a click inside (or on) an anchor with `href`. */
function targetInsideAnchor(href) {
  return { closest: (selector) => (selector === "a[href]" ? { getAttribute: () => href } : null) };
}

// --- Page views (createPageviewCounter) ------------------------------------------------

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

// --- Enquiry events (recordEnquirySent / enquiryEventPath) ------------------------------

test("enquiryEventPath appends a sensible audience and falls back to the bare name", () => {
  assert.equal(enquiryEventPath("parent"), "enquiry-sent parent");
  assert.equal(enquiryEventPath("la"), "enquiry-sent la");
  assert.equal(enquiryEventPath("  Parent  "), "enquiry-sent parent");
  // Nothing that could carry a typed value or arbitrary text is ever sent.
  assert.equal(enquiryEventPath(undefined), "enquiry-sent");
  assert.equal(enquiryEventPath(""), "enquiry-sent");
  assert.equal(enquiryEventPath("   "), "enquiry-sent");
  assert.equal(enquiryEventPath("Jane Smith <jane@example.com>"), "enquiry-sent");
  assert.equal(enquiryEventPath("a".repeat(40)), "enquiry-sent");
  assert.equal(enquiryEventPath(42), "enquiry-sent");
});

test("records one enquiry event on a confirmed send, with the audience", () => {
  const gc = fakeGoatcounter();
  assert.equal(
    recordEnquirySent(true, { ok: true }, "parent", { getGoatcounter: () => gc.api }),
    true,
  );
  assert.deepEqual(gc.calls, [{ path: "enquiry-sent parent", title: "Enquiry sent", event: true }]);

  const gc2 = fakeGoatcounter();
  assert.equal(
    recordEnquirySent(true, { success: true }, "la", { getGoatcounter: () => gc2.api }),
    true,
  );
  assert.deepEqual(gc2.calls, [{ path: "enquiry-sent la", title: "Enquiry sent", event: true }]);

  // The chat form has no audience: the bare event is recorded.
  const gc3 = fakeGoatcounter();
  assert.equal(recordEnquirySent(true, { ok: true }, undefined, { getGoatcounter: () => gc3.api }), true);
  assert.deepEqual(gc3.calls, [{ path: "enquiry-sent", title: "Enquiry sent", event: true }]);
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
      recordEnquirySent(ok, result, "parent", { getGoatcounter: () => gc.api }),
      false,
    );
    assert.deepEqual(gc.calls, []);
  }
});

test("stays silent when the counting script is missing", () => {
  assert.equal(
    recordEnquirySent(true, { ok: true }, "parent", { getGoatcounter: () => undefined }),
    false,
  );
  // A goatcounter object that exists but has no count() is treated as missing.
  assert.equal(
    recordEnquirySent(true, { ok: true }, "parent", { getGoatcounter: () => ({}) }),
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
      recordEnquirySent(true, { ok: true }, "la", { getGoatcounter: () => api }),
      false,
    );
  });
  assert.doesNotThrow(() => {
    assert.equal(
      recordEnquirySent(true, { ok: true }, "la", {
        getGoatcounter: () => {
          throw new Error("window unavailable");
        },
      }),
      false,
    );
  });
});

// --- Click events (clickEventName / clickEventPath) -------------------------------------

test("clickEventName names email, phone and /contact clicks and nothing else", () => {
  assert.equal(clickEventName("mailto:someone@example.com"), "enquiry-email-click");
  assert.equal(clickEventName("MAILTO:someone@example.com"), "enquiry-email-click");
  assert.equal(clickEventName("tel:+441234567890"), "enquiry-phone-click");
  assert.equal(clickEventName("TEL:+441234567890"), "enquiry-phone-click");

  assert.equal(clickEventName("/contact"), "contact-cta-click");
  assert.equal(clickEventName("/contact?for=parent"), "contact-cta-click");
  assert.equal(clickEventName("/contact#main-content"), "contact-cta-click");
  assert.equal(clickEventName("https://jameswallace.tech/contact?topic=referral"), "contact-cta-click");
  assert.equal(clickEventName("  /contact  "), "contact-cta-click");
});

test("clickEventName ignores everything that is not a lead link", () => {
  for (const href of [
    "/",
    "/tuition",
    "/contact-us",
    "/contact/thanks",
    "#main-content",
    "https://example.com/contact",
    "//example.com/contact",
    "mailto:",
    "",
    "   ",
    null,
    undefined,
    42,
  ]) {
    assert.equal(clickEventName(href), null, `expected null for ${JSON.stringify(href)}`);
  }
});

test("clickEventPath adds the page path only to the contact CTA", () => {
  assert.equal(clickEventPath("contact-cta-click", "/tuition"), "contact-cta-click /tuition");
  assert.equal(clickEventPath("contact-cta-click", ""), "contact-cta-click");
  assert.equal(clickEventPath("contact-cta-click", undefined), "contact-cta-click");
  // The email and phone events are the bare event name: the destination is never sent.
  assert.equal(clickEventPath("enquiry-email-click", "/tuition"), "enquiry-email-click");
  assert.equal(clickEventPath("enquiry-phone-click", "/tuition"), "enquiry-phone-click");
});

// --- Click events (installClickEvents) --------------------------------------------------

test("records contact-cta-click with the page it was clicked on", () => {
  const gc = fakeGoatcounter();
  const doc = fakeDocument();
  const cleanup = installClickEvents({
    getGoatcounter: () => gc.api,
    getDocument: () => doc,
    getLocation: () => ({ pathname: "/tuition" }),
  });
  assert.equal(doc.listeners.click.length, 1);
  // Capture phase: the page path must be read before the router navigates away from it.
  assert.equal(doc.capture.click[0], true);

  doc.listeners.click[0]({ target: targetInsideAnchor("/contact?for=parent") });
  assert.deepEqual(gc.calls, [{ path: "contact-cta-click /tuition", event: true }]);

  cleanup();
  assert.equal(doc.listeners.click.length, 0);
});

test("records the email and phone events without the href or the page", () => {
  const gc = fakeGoatcounter();
  const doc = fakeDocument();
  installClickEvents({
    getGoatcounter: () => gc.api,
    getDocument: () => doc,
    getLocation: () => ({ pathname: "/contact" }),
  });
  const onClick = doc.listeners.click[0];

  onClick({ target: targetInsideAnchor("mailto:someone@example.com") });
  onClick({ target: targetInsideAnchor("tel:+441234567890") });
  assert.deepEqual(gc.calls, [
    { path: "enquiry-email-click", event: true },
    { path: "enquiry-phone-click", event: true },
  ]);
});

test("a click with no matching anchor records nothing and never throws", () => {
  const gc = fakeGoatcounter();
  const doc = fakeDocument();
  installClickEvents({
    getGoatcounter: () => gc.api,
    getDocument: () => doc,
    getLocation: () => ({ pathname: "/about" }),
  });
  const onClick = doc.listeners.click[0];

  assert.doesNotThrow(() => {
    onClick({ target: { closest: () => null } }); // clicked plain text
    onClick({ target: targetInsideAnchor("/about") }); // an ordinary link
    onClick({}); // no target at all
    onClick({ target: { closest: () => ({ getAttribute: () => null }) } });
  });
  assert.deepEqual(gc.calls, []);
});

test("a blocked, missing or throwing counter is a silent no-op (no retries)", () => {
  const doc = fakeDocument();
  const noCounter = installClickEvents({
    getGoatcounter: () => undefined,
    getDocument: () => doc,
    getLocation: () => ({ pathname: "/" }),
  });
  const throwing = installClickEvents({
    getGoatcounter: () => ({ count: () => { throw new Error("blocked"); } }),
    getDocument: () => doc,
    getLocation: () => ({ pathname: "/" }),
  });
  assert.equal(doc.listeners.click.length, 2); // both installed; neither retries
  assert.doesNotThrow(() => {
    doc.listeners.click[0]({ target: targetInsideAnchor("/contact") });
    doc.listeners.click[1]({ target: targetInsideAnchor("/contact") });
  });
  noCounter();
  throwing();
});

test("installing without a document is a safe no-op", () => {
  const cleanup = installClickEvents({ getDocument: () => undefined });
  assert.equal(typeof cleanup, "function");
  assert.doesNotThrow(() => cleanup());
});
