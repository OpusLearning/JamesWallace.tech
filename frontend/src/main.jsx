import "./styles/bootstrap.purged.css";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Every route is prerendered (prerender.mjs), so the HTML already holds the page. Hydrating it keeps those
// nodes; createRoot threw them away and drew the page a second time, which is what set mobile LCP at
// 3.3 to 3.6 s (site audit 18 Oct 2026, G1). The dev server's empty #root still renders from scratch.
const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

// prerender.mjs calls this after the page has rendered, and saves React's own server markup as the body.
// A browser snapshot cannot be hydrated (adjacent text nodes merge, effects have already run), so this
// gives hydrateRoot exactly the first render it expects. The import is a separate chunk that visitors
// never fetch.
window.__jwPrerender = async () => {
  const { renderToString } = await import("react-dom/server");
  return renderToString(app);
};
