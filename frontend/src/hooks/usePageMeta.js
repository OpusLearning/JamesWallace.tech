import { useEffect } from "react";

/**
 * Per-page title, description and canonical for a single-page app.
 *
 * The site shipped one <title> and one description in index.html for every route, so every page competed for the same search result
 * and shared the same social preview. This sets them per page without adding a dependency, and cleans up any JSON-LD it injected so
 * two pages can never both claim to be the same thing.
 */
export default function usePageMeta({ title, description, path, jsonLd, noindex }) {
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
    for (const [name, content] of [["twitter:title", title], ["twitter:description", description]]) {
      setMeta(`meta[name="${name}"]`, "content", content, () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", name);
        return meta;
      });
    }

    let canonical = null;
    if (path) {
      canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `https://jameswallace.tech${path}`);
      setMeta('meta[property="og:url"]', "content", `https://jameswallace.tech${path}`, () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:url");
        return meta;
      });
    }

    // Pages that must not be indexed (the not-found page, /portfolio) get a robots noindex and must
    // not point a canonical at another page. Clear any canonical or og:url a previously visited
    // page left behind, and remove the noindex again when the next page does not ask for it.
    let robots = document.head.querySelector('meta[name="robots"][data-jw-noindex]');
    if (noindex) {
      // No path is passed for the not-found page, so `canonical` is null even though the served
      // shell (the home page) left a canonical in the head. Remove any canonical outright.
      document.head.querySelector('link[rel="canonical"]')?.remove();
      canonical = null;
      document.head.querySelector('meta[property="og:url"]')?.remove();
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        robots.dataset.jwNoindex = "true";
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex");
    } else if (robots) {
      robots.remove();
      robots = null;
    }

    // A prerendered route bakes its JSON-LD into the served HTML, and every route is served the
    // home page's HTML as its shell, so the baked Organization node arrives on every page. Clear
    // every node this hook owns — the baked one included — before adding this page's own, so a
    // page with no jsonLd ends with none and two pages can never both claim to be the same thing.
    for (const stale of document.head.querySelectorAll('script[data-page-meta]')) stale.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageMeta = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      for (const el of document.head.querySelectorAll('script[data-page-meta]')) el.remove();
      document.head.querySelector('meta[name="robots"][data-jw-noindex]')?.remove();
    };
  }, [title, description, path, jsonLd, noindex]);
}
