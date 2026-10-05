// Page-view counting for the single-page app.
//
// GoatCounter's script is loaded from index.html with `no_onload: true`, so it does not
// count anything by itself: this module decides when a route is a page view. It is kept
// dependency-free and React-free so the rules are testable with Node's built-in runner
// (see analytics.test.js); the React hook in ../hooks/useAnalytics.js is just a caller.
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
