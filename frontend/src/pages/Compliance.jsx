import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { STATUTORY, TRAINING } from "../data/facts";

const staffComplianceRows = [
  { requirement: "Enhanced DBS (Update Service or renewed)", tracked: "RAG status, expiry alert" },
  { requirement: `Safeguarding / ${STATUTORY.kcsie} update`, tracked: `Completed ${TRAINING.safeguarding.completed}` },
  { requirement: TRAINING.prevent.name, tracked: `Completed ${TRAINING.prevent.completed}` },
  { requirement: TRAINING.dsl.name, tracked: `Completed ${TRAINING.dsl.completed}, renewal ${TRAINING.dsl.renewal}` },
  { requirement: "Child-on-child abuse (agency onboarding)", tracked: "Valid to 22 August 2027" },
  { requirement: "Lone Working Safety", tracked: "Completion date recorded" },
  { requirement: "Health & Safety Awareness", tracked: "Completion date recorded" },
  { requirement: "Data Protection / UK GDPR", tracked: "Completion date recorded" },
  { requirement: "Right to Work verification", tracked: "Provider + reference date" },
];

export default function Compliance() {
  usePageMeta({
    title: 'Safeguarding & Compliance | James Wallace, Specialist SEND & EOTAS Tutor',
    description:
      'Safeguarding framework aligned to KCSIE and Working Together to Safeguard Children, with 28 EOTAS policies, DBS and training tracked in real time.',
    path: '/compliance',
  });

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h1>Safeguarding you can inspect</h1>
          <p
            style={{
              fontSize: "1.05rem",
              maxWidth: "620px",
              margin: "1rem auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Every safeguard, compliance check and policy is part of day-to-day
            delivery, with records available for the commissioner to review.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/contact?for=commissioner" className="jw-btn-primary">
              Request Policy Pack
            </Link>
            <Link to="/platform" className="jw-btn-secondary">
              See the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Safeguarding framework */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>Safeguarding Framework</h2>
              <p>
                I work in line with{" "}
                <em>{STATUTORY.kcsieLong}</em> and{" "}
                <em>{STATUTORY.workingTogether}</em>. I complete
                safeguarding training annually and hold an enhanced DBS on the
                Update Service, with details available for the checks required before a placement.
              </p>
              <ul style={{ fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>
                  All concerns logged immediately in an encrypted,
                  audit-trailed system
                </li>
                <li>
                  PIRFs completed for every physical intervention before
                  caseload can proceed
                </li>
                <li>
                  Concern lifecycle: Queued &rarr; In Progress &rarr; Resolved
                  / Escalated
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/06-safeguarding.webp"
                alt="Safeguarding management in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lone working */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-12 col-lg-6">
              <h2>Lone Working</h2>
              <p>
                I check in through the portal at the start of every solo session
                and check out at the end, so there is a timestamped record of where
                I was and for how long. The portal supports a live supervisor feed
                and overdue-session alerting for multi-practitioner providers; as a
                sole practitioner the escalation route is agreed in writing with the
                commissioning school or local authority before teaching begins.
              </p>
              <ul style={{ fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>
                  Lone working audit reports available for inspection
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/07-lone-working.webp"
                alt="Lone working safety in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff compliance table */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-start g-5">
            <div className="col-12 col-lg-6">
              <h2>Compliance record</h2>
              <p>
                Everything below is current before I take a placement, and
                renewal dates are tracked with expiry alerts rather than left
                to lapse.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.875rem",
                  }}
                >
                  <thead>
                    <tr style={{ background: "var(--brand)", color: "#fff" }}>
                      <th
                        style={{
                          padding: "0.6rem 1rem",
                          textAlign: "left",
                          fontWeight: 600,
                        }}
                      >
                        Requirement
                      </th>
                      <th
                        style={{
                          padding: "0.6rem 1rem",
                          textAlign: "left",
                          fontWeight: 600,
                        }}
                      >
                        Portal tracking
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffComplianceRows.map((row, i) => (
                      <tr
                        key={row.requirement}
                        style={{
                          background:
                            i % 2 === 0 ? "var(--surface)" : "transparent",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <td style={{ padding: "0.6rem 1rem" }}>
                          {row.requirement}
                        </td>
                        <td
                          style={{
                            padding: "0.6rem 1rem",
                            color: "var(--brand)",
                            fontWeight: 500,
                          }}
                        >
                          {row.tracked}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/08-compliance.webp"
                alt="Compliance dashboard in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Data protection */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          {/* Scope boundary. Nothing on the site said what this provision is not, and on pages that touch EHCPs,
              diagnosis and mental health that omission is a risk to James as much as to a reader. */}
          <div className="jw-card" style={{ marginBottom: "2.5rem", borderLeft: "3px solid var(--brand)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Scope of this provision</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-muted)" }}>
              This is specialist teaching. It does not replace clinical assessment, medical advice, psychological
              therapy or legal advice, and nothing here should be read as any of those. Where a learner needs a
              diagnosis, therapeutic input or representation at tribunal, I will say so and point you to the right
              service rather than work outside what a qualified teacher should be doing.
            </p>
          </div>

          <h2 className="text-center mb-4">Data Protection</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                title: "AES-256-GCM encryption",
                desc: "All personally identifiable data - learner names, diagnoses, carer contacts, medical information, session notes - encrypted at rest.",
              },
              {
                title: "Full audit trail",
                desc: "Every access and change to learner data is logged and timestamped - available for inspection or SAR response.",
              },
              {
                title: "EU-region infrastructure",
                desc: "Data hosted on Neon PostgreSQL, Frankfurt (EU). Data processor agreement available on request.",
              },
              {
                title: "SAR process",
                desc: "Subject Access Requests handled within statutory timescales. Data export available from portal for any learner record.",
              },
            ].map((item) => (
              <div key={item.title} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100 text-center">
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--brand)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>Policies &amp; Procedures</h2>
              <p>
                James Wallace Education, the provision operated by James Wallace, maintains 28 EOTAS-aligned policies - Safeguarding,
                Lone Working, Data Protection, Health &amp; Safety, Behaviour
                Support, and more. Each is version-controlled, review-dated, and
                available as a branded PDF.
              </p>
              <p>
                A Download Pack exports all active policies as a single ZIP.
                Policy health - overdue for review, due within 30 days, still in
                draft - is monitored on the supervisor dashboard.
              </p>
              <Link
                to="/contact?for=commissioner"
                className="jw-btn-secondary mt-2 d-inline-block"
              >
                Request policy pack
              </Link>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/11-policies.webp"
                alt="Policy library in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inspection readiness */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-12 col-lg-6">
              <h2>Inspection Readiness</h2>
              <p>
                For LA monitoring visits or Ofsted inspections, the platform
                generates a full Inspection Bundle PDF for any case: PLP with
                criteria, weekly plans, daily evidence, safeguarding timeline,
                and lone working log - all in one document, on demand.
              </p>
              <p>
                You can also export case chronologies, supervision
                records, compliance audit logs, and policy packs to support
                the commissioner&#39;s review.
              </p>
              <Link
                to="/contact?for=commissioner"
                className="jw-btn-secondary mt-2 d-inline-block"
              >
                Request inspection bundle example
              </Link>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/12-inspection-bundle.webp"
                alt="Inspection bundle export in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Need to verify any of this?</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            Ask for the policy pack, an example evidence bundle, or my DBS
            details. Parents, agencies and local authorities all get the same
            answer.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner" className="jw-btn-primary">
              Request Policy Pack
            </Link>
            <Link to="/contact?for=commissioner" className="jw-btn-secondary">
              Request Inspection Bundle Example
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
