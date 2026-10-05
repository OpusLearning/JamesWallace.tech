import { useEffect } from "react";
import { pageviewCounter, pageviewPath } from "../lib/analytics";

/**
 * Count one page view per router navigation, including the first one.
 *
 * Keyed on the location, so a query-string change (`/contact?for=la`) counts as its own view,
 * the way GoatCounter records full paths. The counter itself ignores a consecutive repeat of the
 * same path, which is what keeps React StrictMode's double-invoked effect to a single count.
 * The counting rules live in ../lib/analytics.js so they can be unit-tested without a renderer.
 */
export default function useAnalytics(location) {
  const path = pageviewPath(location);
  useEffect(() => {
    pageviewCounter.count(path);
  }, [path]);
}
