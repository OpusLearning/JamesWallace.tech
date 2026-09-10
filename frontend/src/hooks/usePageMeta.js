import { useEffect } from "react";

/**
 * Per-page title, description and canonical for a single-page app.
 *
 * The site shipped one <title> and one description in index.html for every route, so every page competed for the same search result
 * and shared the same social preview. This sets them per page without adding a dependency, and cleans up any JSON-LD it injected so
 * two pages can never both claim to be the same thing.
 */
export default function usePageMeta({ title, description, path, jsonLd }) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const setMeta = (selector, attr, value, create) => {
      if (!value) return null;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    };

    setMeta('meta[name="description"]', "content", description, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    setMeta('meta[property="og:title"]', "content", title, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    });
    setMeta('meta[property="og:description"]', "content", description, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    });

    let canonical = null;
    if (path) {
      canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `https://jameswallace.tech${path}`);
    }

    let script = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageMeta = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      if (script) script.remove();
    };
  }, [title, description, path, jsonLd]);
}
