import PropTypes from "prop-types";
import usePageMeta from "../hooks/usePageMeta";

/**
 * The furniture the legal and information pages share.
 *
 * /privacy already had a shape worth keeping — a warm heading band with the page name and the
 * "last updated" line, then a white reading column capped at 780px — and the cookie, accessibility,
 * terms and complaints pages have to look like the same site. Rather than copy that markup four more
 * times and let the spacing drift, the shell, the section heading and the table live here.
 *
 * Words for these pages come only from sources/legal/README.md. This module adds no copy of its own.
 */

export function LegalPage({ title, metaTitle, description, path, updated, intro, children }) {
  usePageMeta({ title: metaTitle, description, path });

  return (
    <>
      <section className="jw-section jw-section-warm">
        <div className="jw-container" style={{ maxWidth: "780px" }}>
          <h1>{title}</h1>
          {intro && (
            <p style={{ fontSize: "1.05rem", maxWidth: "620px", marginBottom: "1rem" }}>{intro}</p>
          )}
          {updated && (
            <p style={{ color: "var(--text-muted)", marginBottom: 0 }}>{updated}</p>
          )}
        </div>
      </section>

      <section className="jw-section jw-section-white">
        <div className="jw-container" style={{ maxWidth: "780px" }}>{children}</div>
      </section>
    </>
  );
}

LegalPage.propTypes = {
  title: PropTypes.string.isRequired,
  metaTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  updated: PropTypes.string,
  intro: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function LegalSection({ id, heading, children }) {
  return (
    <section id={id} style={{ marginBottom: "2.5rem" }} aria-labelledby={id && `${id}-heading`}>
      <h2 id={id && `${id}-heading`} style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
        {heading}
      </h2>
      {children}
    </section>
  );
}

LegalSection.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/** The Compliance page's table treatment: brand header, zebra rows, an accessible caption. */
export function LegalTable({ caption, columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr style={{ background: "var(--brand)", color: "#fff" }}>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                style={{ padding: "0.6rem 1rem", textAlign: "left", fontWeight: 600 }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row[0]}
              style={{
                background: rowIndex % 2 === 0 ? "var(--surface)" : "transparent",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={columns[cellIndex]} style={{ padding: "0.6rem 1rem", verticalAlign: "top" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LegalTable.propTypes = {
  caption: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
};
