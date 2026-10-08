import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

/**
 * The not-found page for an unknown path.
 *
 * Before this existed, every unknown URL was served the home page's HTML with a 200 status: the
 * title, description and canonical all claimed to be the home page, and "Page Not Found" appeared
 * underneath. This page has its own title, no canonical (it must never point a crawler at another
 * page), a robots noindex, and a short list of the places people are usually looking for.
 */
export default function NotFound() {
  usePageMeta({
    title: "Page not found | James Wallace",
    description:
      "That page does not exist. Start from the home page, or find private tuition, local-authority commissioning and contact details.",
    noindex: true,
  });

  return (
    <section className="jw-section jw-section-warm">
      <div className="jw-container">
        <p className="jw-eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p style={{ maxWidth: "560px", color: "var(--text-muted)", marginBottom: "2rem" }}>
          The page you asked for does not exist, or it has moved. These are the places most people
          are looking for:
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "560px" }}>
          <li style={{ padding: "0.75rem 0", borderTop: "1px solid var(--border)" }}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ padding: "0.75rem 0", borderTop: "1px solid var(--border)" }}>
            <Link to="/tuition">Private tuition for families</Link>
          </li>
          <li style={{ padding: "0.75rem 0", borderTop: "1px solid var(--border)" }}>
            <Link to="/for-las">Commissioning for local authorities</Link>
          </li>
          <li style={{ padding: "0.75rem 0", borderTop: "1px solid var(--border)" }}>
            <Link to="/contact">Contact James</Link>
          </li>
          <li style={{ padding: "0.75rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <a href="https://blog.jameswallace.tech/guides/">Parent guides on the journal</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
