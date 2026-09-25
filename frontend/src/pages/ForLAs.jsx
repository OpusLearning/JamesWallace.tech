import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { TRAINING, PRODUCT } from "../data/facts";

const commissionerQA = [
  {
    q: "How will I know sessions are actually happening?",
    a: "Every session is built to carry a timestamped daily report, submitted within 24 hours - engagement score, activity notes and criteria progress - visible in the portal, not a summary written for you at the end of term.",
  },
  {
    q: "You are one person. What happens if you are ill?",
    a: "I tell you the same day and we agree a catch-up plan, in writing. Missed hours are logged against entitlement and made up, not quietly lost, and the running total is visible to you throughout. A single specialist is the trade: one consistent adult for a child who has usually had far too many, and no cover pool to fall back on. Most of the young people I take on could not tolerate a rotating staff team anyway.",
  },
  {
    q: "How do you handle safeguarding?",
    a: "Every concern is logged, tracked, and escalated through a structured workflow. DSL is notified of any stale concerns automatically. PIRFs cannot be bypassed. Inspection bundles are available on demand.",
  },
  {
    q: "Can I see progress against the EHCP?",
    a: "The PLP is built directly from EHCP outcomes. Criterion progress is updated with each session report and visible in the analytics view.",
  },
  {
    q: "What does your compliance look like?",
    a: `Enhanced DBS on the Update Service. Safeguarding training completed ${TRAINING.safeguarding.completed}; Prevent duty completed ${TRAINING.prevent.completed}; allergy awareness and anaphylaxis training completed ${TRAINING.allergy.completed}; ${TRAINING.dsl.name} completed ${TRAINING.dsl.completed} (recommended renewal ${TRAINING.dsl.renewal}). Right to work evidence and course-specific renewal dates are available for review before a placement.`,
  },
  {
    q: "Which local thresholds do you work to?",
    a: "Placements work to the placing authority's threshold guidance, not ours. Where the placing authority is Derby City or Derbyshire, Nottingham City, or Nottinghamshire County, that guidance is the Derby City and Derbyshire Threshold Document (December 2024), the Nottingham City Interim Continuum of Need, or the Nottinghamshire Framework for Support respectively. Each is a published council document, so we work to the current version held by the placing authority.",
  },
  {
    q: "Are you inspection-ready?",
    a: "Yes. Case chronologies, PLP evidence, safeguarding logs, compliance records, and policy packs can be exported as PDFs for any monitoring visit.",
  },
];

const monthlyDeliverables = [
  { item: "Attendance record", detail: "Session-level attendance for every active case" },
  { item: "Engagement report", detail: "Engagement scores across all sessions in the period" },
  { item: "Progress summary", detail: "PLP criterion completion rates since placement start" },
  { item: "Safeguarding nil return", detail: "Signed nil return or summary of concerns raised" },
  { item: "Provision assurance", detail: "Commissioned vs. delivered hours with variance" },
  { item: "Invoice", detail: "Session-level billing with funding stream tagging" },
];

export default function ForLAs() {
  usePageMeta({
    title: 'For Local Authorities | Commissioning EOTAS Placements | James Wallace Education',
    description:
      'How commissioning works: referral to first session, weekly plans, daily reports, safeguarding nil returns and inspection-ready exports for SEND panels.',
    path: '/for-las',
  });

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <h1>For Local Authorities &amp; Schools</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                Commissioning EOTAS provision should be clear. James Wallace Education, the provision operated by James Wallace,
                is built to give commissioners and referrers visibility of a
                placement - from session evidence to safeguarding nil
                returns - with monthly deliverables and
                inspection-ready exports on demand.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
                  Make a Referral &rarr;
                </Link>
                <Link to="/compliance" className="jw-btn-secondary">
                  Compliance Details
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src="/portal/09-provision.webp"
                    alt="Provision assurance view"
                    style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--border)" }}
                  />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem", marginBottom: 0 }}>
                    Provision assurance
                  </p>
                </div>
                <div className="col-6">
                  <img
                    src="/portal/10-finance.webp"
                    alt="Finance and billing view"
                    style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--border)" }}
                  />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem", marginBottom: 0 }}>
                    Finance &amp; billing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral process */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-2">A clear route from referral to review</h2>
          <p
            className="text-center"
            style={{ maxWidth: "540px", margin: "0 auto 3rem" }}
          >
            I respond to referral enquiries within 2 working days and begin
              placement assessments within 5 working days of receiving a commission.
          </p>
          <div className="row g-4">
            {[
              {
                step: "1",
                title: "Initial Referral",
                desc: "Submit the referral form on this site or contact us directly. We'll respond within 2 working days to discuss the placement.",
              },
              {
                step: "2",
                title: "Documentation",
                desc: "We'll need the current EHCP or SEN support plan, LA commissioning letter or PO reference, risk assessment, and preferred hours per week.",
              },
              {
                step: "3",
                title: "Placement Assessment",
                desc: "I review the documentation and confirm a placement start date, available hours, and PLP scope.",
              },
              {
                step: "4",
                title: "Delivery Begins",
                desc: "Sessions commence. Weekly plans submitted and approved. Daily reports filed within 24 hours. Safeguarding and lone working active from day one.",
              },
            ].map((item) => (
              <div key={item.step} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly deliverables */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Monthly Deliverables</h2>
          <p
            className="text-center"
            style={{ maxWidth: "520px", margin: "0 auto 3rem" }}
          >
            The platform is built to produce the following each calendar
            month. What a placement actually receives is agreed in the
            commission.
          </p>
          <div className="jw-card mx-auto" style={{ maxWidth: "700px", padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "var(--brand)", color: "#fff" }}>
                  <th style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontWeight: 600 }}>
                    Deliverable
                  </th>
                  <th style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontWeight: 600 }}>
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyDeliverables.map((row, i) => (
                  <tr
                    key={row.item}
                    style={{
                      background: i % 2 === 0 ? "var(--surface)" : "transparent",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td style={{ padding: "0.75rem 1.25rem", fontWeight: 600 }}>
                      {row.item}
                    </td>
                    <td style={{ padding: "0.75rem 1.25rem", color: "var(--text-muted)" }}>
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Policies statement */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>Policies &amp; Procedures</h2>
              <p>
                James Wallace Education keeps an EOTAS-aligned policy suite
                covering Safeguarding, Lone Working, Data Protection, Health
                &amp; Safety, Behaviour Support, and more. The suite is under
                review, and approved policies are shared with commissioners on
                request.
              </p>
              <p>
                Ask for the current approved policies, or a specific policy for
                review before commissioning.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <Link to="/compliance" className="jw-btn-secondary">
                  Compliance details
                </Link>
                <Link to="/contact?for=commissioner" className="jw-btn-secondary">
                  Request policy pack
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/11-policies.webp"
                alt={`Policy library in ${PRODUCT.name}, grouped by category with status and version`}
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

      {/* Commissioner Q&A */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Commissioner Questions</h2>
          <p
            className="text-center"
            style={{ maxWidth: "520px", margin: "0 auto 3rem" }}
          >
            The questions commissioners most commonly ask - answered directly.
          </p>
          <div className="row g-4">
            {commissionerQA.map((item, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    &quot;{item.q}&quot;
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Ready to commission?</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            Submit a referral or request an evidence pack. I respond within 2 working
            days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/contact?for=commissioner&topic=evidence-pack" className="jw-btn-secondary">
              Request Evidence Pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
