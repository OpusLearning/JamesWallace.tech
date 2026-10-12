import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { AREA, SESSIONS, PROFILES, BIO, REFERENCES } from "../data/facts";
import { councilRows } from "../lib/council-policies";
import PageHeader from "../components/PageHeader";

/**
 * Specialist SEND tuition in Derbyshire — a county landing page for a parent or professional
 * searching for a tutor here (LOCAL-2, 9 Oct 2026, the second attempt after the red team held
 * LOCAL-1 for near-duplicate pages).
 *
 * Most of the page is Derbyshire's own local material: the routes Derbyshire County Council and
 * Derby City Council each publish for a child who cannot attend school, by the council's own
 * title, with a link and the date the link was checked. The shared material — who James is and how
 * sessions work — is one short paragraph and links to /tuition and /for-las. Every fact is from
 * `sources/local-pages/README.md`, the checked council list copied into `src/data/`, and
 * `src/data/facts.js`; nothing here is a new claim about the business.
 */

const COUNCILS = [
  { name: "Derbyshire County Council", council: "Derbyshire" },
  { name: "Derby City Council", council: "Derby City" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "One-to-one SEND and EOTAS tuition",
  name: "Specialist SEND tuition in Derbyshire with James Wallace",
  provider: {
    "@type": "Person",
    name: "James Wallace",
    jobTitle: "Specialist EOTAS and SEND tutor",
    url: "https://jameswallace.tech/send-tuition-derbyshire",
    sameAs: PROFILES,
    hasCredential: [
      "Qualified Teacher Status (QTS)",
      "Master of Education (MEd)",
      BIO.degree,
      "Enhanced DBS on the Update Service",
    ],
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Derbyshire" },
    { "@type": "AdministrativeArea", name: "Derby" },
  ],
  audience: { "@type": "Audience", audienceType: "Parents and carers of children with SEND" },
  description:
    "One-to-one SEND tuition for children who cannot attend school in Derbyshire and Derby, and online. Council routes for Derbyshire County Council and Derby City Council.",
};

export default function SendTuitionDerbyshire() {
  usePageMeta({
    title: "Specialist SEND tuition in Derbyshire | James Wallace",
    description:
      "One-to-one SEND tuition for children who cannot attend school, in person in Derbyshire and online. Derbyshire County Council and Derby City Council routes for families.",
    path: "/send-tuition-derbyshire",
    jsonLd,
  });

  return (
    <>
      {/* Style B hero, no image (LOOK-SITE-1 item 5). */}
      <PageHeader
        eyebrow="For families in Derbyshire and Derby"
        title="Specialist SEND tuition in Derbyshire"
        lede="If your child is out of school in Derbyshire and you are looking for a one-to-one tutor, this page collects the routes Derbyshire County Council and Derby City Council publish for children who cannot attend school, and explains how I can teach here."
        actions={<>
          <Link to="/contact?for=parent" className="jw-btn-primary">Arrange a conversation</Link>
          <Link to="/tuition" className="jw-btn-secondary">How tuition works</Link>
        </>}
        noImage
      />

      {/* Where, in Derbyshire */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <h2 style={{ marginBottom: "1rem" }}>Where I can teach in Derbyshire</h2>
              <p style={{ marginBottom: 0 }}>
                In person, I can travel to Derby, Long Eaton, Ilkeston and Belper. Burton upon Trent, just over the
                border in Staffordshire, is also within reach. Elsewhere in Derbyshire, or if none of those
                is near you, sessions are by arrangement or online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The local routes — the bulk of the page */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row">
            <div className="col-12 col-lg-9">
              <h2 style={{ marginBottom: "0.75rem" }}>If your child cannot attend school in Derbyshire</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                Derbyshire County Council and Derby City Council publish their own guidance and signposting for
                children who cannot attend school. The links below are Derbyshire&#39;s and Derby&#39;s own pages,
                under the titles each council uses; where I could not find a page for one of these, this page says
                so. The Journal has a free <a href="https://blog.jameswallace.tech/eotas-guide/">parent guide to education when a child cannot attend school</a> and the same{" "}
                <a href="https://blog.jameswallace.tech/eotas-guide-council-policies/">list for thirty-nine councils</a>.
              </p>

              {COUNCILS.map((c) => (
                <div key={c.council} style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>{c.name}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {councilRows(c.council).map((row) => (
                      <li key={row.label} style={{ padding: "0.6rem 0", borderTop: "1px solid var(--border, #e5e0d8)" }}>
                        {row.found ? (
                          <>
                            {row.label}:{" "}
                            <a href={row.url} target="_blank" rel="noopener noreferrer">
                              {row.title}
                            </a>{" "}
                            <span className="jw-caption">
                              (checked {row.checked})
                            </span>
                          </>
                        ) : (
                          <>
                            {row.label}: none found{" "}
                            <span className="jw-caption">
                              (checked {row.checked})
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The one shared paragraph: who James is and how sessions work */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <h2 style={{ marginBottom: "1rem" }}>How I teach in Derbyshire</h2>
              <p className="jw-body" style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
                Thirteen years teaching in specialist provision, twelve of them in a special school, and in between
                five years in a commissioning team at Nottinghamshire County Council. {AREA.sentence}{" "}
                {SESSIONS.school} For sessions at the child&#39;s home or in a community setting, a responsible adult
                is present.
              </p>
              <p style={{ marginBottom: 0 }}>
                <Link to="/tuition">How tuition works</Link>{" · "}
                <Link to="/for-las">For schools and local authorities</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One written reference, held on file; the same words as /credentials. */}
      <section className="jw-reference-section" aria-label="Written reference">
        <div className="jw-container jw-reference-layout">
          <div className="jw-reference-label"><p className="jw-eyebrow">A written reference</p><span aria-hidden="true">“</span></div>
          <figure className="jw-reference">
            <blockquote>“{REFERENCES[0].quote}”</blockquote>
            <figcaption><div><strong>{REFERENCES[0].name}</strong><span>{REFERENCES[0].role}</span></div><Link to="/credentials" className="jw-text-link">Read the references in full</Link></figcaption>
          </figure>
        </div>
      </section>

      {/* Close */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2 style={{ marginBottom: "1.25rem" }}>Talk to me about tuition in Derbyshire</h2>
          <p className="jw-body jw-measure jw-measure--center">
            If your child cannot attend school in Derbyshire, the first step is a short conversation about them, with no
            commitment to book anything.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=parent" className="jw-btn-primary">
              Contact James
            </Link>
            <Link to="/for-las" className="jw-btn-secondary">
              For schools and local authorities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
