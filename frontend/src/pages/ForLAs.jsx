import { Link } from "react-router-dom";

const commissionerQA = [
  {
    q: "How do I know sessions are actually happening?",
    a: "Every session has a timestamped daily report submitted within 24 hours — with engagement score, activity notes, and criteria progress. Supervisors can see the full picture in real time.",
  },
  {
    q: "What happens if an Education Specialist goes off sick?",
    a: "Case coverage is monitored continuously. Gaps trigger flags within 14 days. Allocation and planning tools show coverage vs. entitlement for every case.",
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
    a: "DBS, training, first aid, and right-to-work verification are tracked in real time with RAG status. All staff are checked before allocation to any learner.",
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
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <h1>For Local Authorities &amp; Schools</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                Commissioning EOTAS provision should be simple. ND Services
                gives commissioners and referrers real-time visibility of every
                active placement — from session evidence to safeguarding nil
                returns — with structured monthly deliverables and
                inspection-ready exports on demand.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact" className="jw-btn-primary">
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
          <h2 className="text-center mb-2">Referral Process</h2>
          <p
            className="text-center"
            style={{ maxWidth: "540px", margin: "0 auto 3rem" }}
          >
            We aim to respond to all referral enquiries within 2 working days
            and begin placement assessments within 5 working days of receiving
            a commission.
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
                desc: "We review the documentation and confirm a placement start date, Education Specialist allocation, and PLP scope.",
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
            Every active commission receives the following as standard each
            calendar month.
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
                ND Services maintains a full suite of 28 EOTAS-aligned policies
                — covering Safeguarding, Lone Working, Data Protection, Health
                &amp; Safety, Behaviour Support, and more. Each policy is
                version-controlled, review-dated, and available as a branded
                PDF.
              </p>
              <p>
                A full policy pack is available on request. Individual policies
                can also be requested for review prior to commissioning.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <Link to="/compliance" className="jw-btn-secondary">
                  Compliance details
                </Link>
                <Link to="/contact" className="jw-btn-secondary">
                  Request policy pack
                </Link>
              </div>
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

      {/* Commissioner Q&A */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Commissioner Questions</h2>
          <p
            className="text-center"
            style={{ maxWidth: "520px", margin: "0 auto 3rem" }}
          >
            The questions commissioners most commonly ask — answered directly.
          </p>
          <div className="row g-4">
            {commissionerQA.map((item, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    "{item.q}"
                  </p>
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
            Submit a referral or request an evidence pack. We respond within 2
            working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/contact" className="jw-btn-secondary">
              Request Evidence Pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
