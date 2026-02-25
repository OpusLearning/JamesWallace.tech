import { Link } from "react-router-dom";

const staffComplianceRows = [
  { requirement: "Enhanced DBS (Update Service or renewed)", tracked: "RAG status, expiry alert" },
  { requirement: "Safeguarding Level 2 (annual)", tracked: "Renewal tracked" },
  { requirement: "Prevent Awareness", tracked: "Completion date recorded" },
  { requirement: "Lone Working Safety", tracked: "Completion date recorded" },
  { requirement: "First Aid at Work", tracked: "3-year renewal alert" },
  { requirement: "Health & Safety Awareness", tracked: "Completion date recorded" },
  { requirement: "Data Protection / UK GDPR", tracked: "Completion date recorded" },
  { requirement: "Right to Work verification", tracked: "Provider + reference date" },
];

export default function Compliance() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h1>Safeguarding &amp; Compliance</h1>
          <p
            style={{
              fontSize: "1.05rem",
              maxWidth: "620px",
              margin: "1rem auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Built in, not bolted on. Every safeguard, compliance check, and
            policy is embedded in our day-to-day delivery workflow - not
            reviewed once a year and filed away.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/contact" className="jw-btn-primary">
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
                ND Services operates in full compliance with{" "}
                <em>Keeping Children Safe in Education</em> (KCSIE 2024) and{" "}
                <em>Working Together to Safeguard Children</em> (2023). All
                staff complete safeguarding training annually and are subject to
                enhanced DBS checks renewed on a rolling basis.
              </p>
              <ul style={{ fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>
                  Designated Safeguarding Lead (DSL) accessible to all
                  practitioners
                </li>
                <li>
                  All concerns logged immediately in an encrypted,
                  audit-trailed system
                </li>
                <li>
                  PIRFs completed for every physical intervention before
                  caseload can proceed
                </li>
                <li>
                  Safeguarding lead notified automatically of concerns
                  unactioned for 7+ days
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
                Every Education Specialist delivering a solo session checks in
                via the portal at the start of the session and checks out at
                the end. The supervisor live feed shows all active sessions,
                time elapsed, and check-in location.
              </p>
              <ul style={{ fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>
                  Automatic alert and email to supervisory team if a session
                  goes overdue
                </li>
                <li>
                  Panic button in the practitioner's session view - triggers
                  immediate supervisor notification
                </li>
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
              <h2>Staff Compliance</h2>
              <p>
                All Education Specialists must maintain current status across
                the following before being allocated to a learner. Compliance
                is tracked in ND Portal with RAG status and automated expiry
                alerts.
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
                desc: "Data hosted on Neon PostgreSQL, Frankfurt (EU). UK GDPR compliant. Data processor agreement available on request.",
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
                ND Services maintains 28 EOTAS-aligned policies - Safeguarding,
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
                to="/contact"
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
                and lone working log - all in one branded document, on demand.
              </p>
              <p>
                Supervisors can also export case chronologies, supervision
                records, compliance audit logs, and policy packs. Everything
                needed to walk into an inspection with confidence.
              </p>
              <Link
                to="/contact"
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
          <h2>Need to verify our compliance?</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            Request a policy pack, an example inspection bundle, or get in
            touch to discuss any specific compliance requirements before
            commissioning.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact" className="jw-btn-primary">
              Request Policy Pack
            </Link>
            <Link to="/contact" className="jw-btn-secondary">
              Request Inspection Bundle Example
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
