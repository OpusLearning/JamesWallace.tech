// Counting rules for the single-page app: page views, enquiry events and click events.
//
// GoatCounter's script is loaded from index.html with `no_onload: true`, so it does not
// count anything by itself: this module decides when a route is a page view and when a
// lead event (a sent enquiry, or a click on an email, phone or contact link) is counted.
// It is kept dependency-free and React-free so the rules are testable with Node's built-in
// runner (see analytics.test.js); the React hook in ../hooks/useAnalytics.js and the
// listener wired in ../App.jsx are just callers.
//
// Counting must never affect the page. If the script is blocked, still loading, or fails,
// the calls below quietly do nothing.

/** The path GoatCounter should record for a router location: pathname + query string. */
export function pageviewPath(location) {
  return `${location.pathname}${location.search || ""}`;
}

/**
 * Build a counter that fires `window.goatcounter.count({ path })` once per distinct route.
 *
 * - A consecutive repeat of the same path is ignored, so React StrictMode's double-invoked
 *   effect (and any re-render) is a single page view, while a real navigation A → B → A is
 *   three views.
 * - The script is `async`, so the first attempt may run before it has loaded; the counter
 *   retries up to `maxAttempts` times, `delayMs` apart, then stops.
 * - Every access to the counter is guarded: a blocked or throwing counter never breaks a page.
 *
 * `getGoatcounter` and `schedule` are injectable for tests; the defaults are the real ones.
 */
export function createPageviewCounter({
  getGoatcounter = () => (typeof window === "undefined" ? undefined : window.goatcounter),
  maxAttempts = 20,
  delayMs = 250,
  schedule = (fn, ms) => setTimeout(fn, ms),
} = {}) {
  let lastPath = null;

  function tryCount(path, attempt) {
    let goatcounter;
    try {
      goatcounter = getGoatcounter();
    } catch {
      goatcounter = undefined;
    }

    if (goatcounter && typeof goatcounter.count === "function") {
      try {
        goatcounter.count({ path });
      } catch {
        // A counter blocked by an extension or a policy must not break the page.
      }
      return;
    }

    if (attempt < maxAttempts) {
      schedule(() => tryCount(path, attempt + 1), delayMs);
    }
  }

  return {
    /** Count `path`, unless it is the same as the route just counted. Returns whether it did. */
    count(path) {
      if (path === lastPath) return false;
      lastPath = path;
      tryCount(path, 0);
      return true;
    },
  };
}

/** The app's single counter. Importing this module creates it but never counts by itself. */
export const pageviewCounter = createPageviewCounter();

/** Call `goatcounter.count(args)` once, guarded. Returns whether a call was made; never throws. */
function countOnce(getGoatcounter, args) {
  let goatcounter;
  try {
    goatcounter = getGoatcounter();
  } catch {
    return false;
  }
  if (!goatcounter || typeof goatcounter.count !== "function") return false;
  try {
    goatcounter.count(args);
    return true;
  } catch {
    // A counter blocked by an extension or a policy must not break the page.
    return false;
  }
}

// An audience value is a short lowercase label ("parent", "la"). Anything else — an empty value,
// free text, or something a future caller passes by mistake — is dropped rather than sent, so the
// statistics can never carry a value the visitor typed.
const AUDIENCE = /^[a-z][a-z-]{0,23}$/;

/** The GoatCounter event path for a confirmed enquiry: `enquiry-sent <audience>`, or bare. */
export function enquiryEventPath(audience) {
  const label = typeof audience === "string" ? audience.trim().toLowerCase() : "";
  return AUDIENCE.test(label) ? `enquiry-sent ${label}` : "enquiry-sent";
}

/**
 * Record one GoatCounter event when the server has confirmed an enquiry was sent.
 *
 * - `ok` mirrors `Response.ok`; `result` is the parsed reply body and counts as confirmation when
 *   either `result.ok` or `result.success` is `true` (the site's two accepted shapes). Both the
 *   transport and the body must agree, so a failed or unconfirmed send records nothing.
 * - `audience` is the contact form's own audience value (`parent` / `la`); `enquiryEventPath`
 *   reduces it to a safe label first. Nothing else from the form — name, email, message, subject
 *   or enquiry type — is ever included.
 * - The script is loaded by `index.html` and always present by the time a form is submitted, so
 *   unlike the page-view counter there is no retry: a missing or blocked counter is simply a no-op.
 * - Every access is guarded so a blocked, missing or throwing counter never breaks a page. Returns
 *   whether a count call was made.
 *
 * `getGoatcounter` is injectable for tests; the default reads the real `window.goatcounter`.
 */
export function recordEnquirySent(
  ok,
  result,
  audience,
  { getGoatcounter = () => (typeof window === "undefined" ? undefined : window.goatcounter) } = {},
) {
  if (!ok || !result || (result.ok !== true && result.success !== true)) return false;
  return countOnce(getGoatcounter, {
    path: enquiryEventPath(audience),
    title: "Enquiry sent",
    event: true,
  });
}

// --- Click events ----------------------------------------------------------------------

// Every page on this site is served from this host; a link to `/contact` on another host is not
// our contact page. Resolution uses this fixed base so the rule is testable without a browser.
const SITE_HOST = "jameswallace.tech";

/**
 * Which delegated click event an anchor's `href` should record, or `null` for an ordinary link:
 *
 * - a `mailto:` link → `enquiry-email-click`;
 * - a `tel:` link → `enquiry-phone-click`;
 * - a link to this site's `/contact` (with or without a query string or fragment) →
 *   `contact-cta-click`.
 *
 * The return value never contains the `href`, so no email address, phone number or URL is sent.
 */
export function clickEventName(href) {
  if (typeof href !== "string") return null;
  const value = href.trim();
  if (!value) return null;
  if (/^mailto:\S/i.test(value)) return "enquiry-email-click";
  if (/^tel:\S/i.test(value)) return "enquiry-phone-click";
  let url;
  try {
    url = new URL(value, `https://${SITE_HOST}`);
  } catch {
    return null;
  }
  if (url.hostname === SITE_HOST && url.pathname === "/contact") return "contact-cta-click";
  return null;
}

/**
 * The GoatCounter event path for a click. The contact CTA carries the page it was clicked on
 * ("contact-cta-click /tuition"); the email and phone events are sent bare.
 */
export function clickEventPath(name, pagePath) {
  if (name !== "contact-cta-click") return name;
  const path = typeof pagePath === "string" ? pagePath.trim() : "";
  return path ? `${name} ${path}` : name;
}

/**
 * Install one delegated `click` listener that records the email, phone and contact-page clicks.
 *
 * - A single listener on the document handles every anchor, present or future, so it is wired once.
 * - It runs in the capture phase: the router's own handler would otherwise update `location` before
 *   the listener ran, so a `/contact` click would report the destination instead of the page clicked.
 * - It reads only the clicked anchor's `href`; nothing the visitor typed is involved.
 * - Safe when GoatCounter is blocked or absent: one guarded attempt, no retry, and it never throws
 *   into the page's own click handling.
 * - `getGoatcounter`, `getDocument` and `getLocation` are injectable for tests; the defaults are
 *   the real browser globals. Returns a cleanup that removes the listener.
 */
export function installClickEvents({
  getGoatcounter = () => (typeof window === "undefined" ? undefined : window.goatcounter),
  getDocument = () => (typeof document === "undefined" ? undefined : document),
  getLocation = () => (typeof window === "undefined" ? undefined : window.location),
} = {}) {
  const doc = getDocument();
  if (!doc || typeof doc.addEventListener !== "function") return () => {};

  function onClick(event) {
    const target = event ? event.target : undefined;
    const anchor = target && typeof target.closest === "function" ? target.closest("a[href]") : null;
    if (!anchor || typeof anchor.getAttribute !== "function") return;
    const name = clickEventName(anchor.getAttribute("href"));
    if (!name) return;

    let pagePath = "";
    try {
      const location = getLocation();
      pagePath = location ? location.pathname : "";
    } catch {
      pagePath = "";
    }

    countOnce(getGoatcounter, { path: clickEventPath(name, pagePath), event: true });
  }

  doc.addEventListener("click", onClick, true);
  return () => doc.removeEventListener("click", onClick, true);
}
