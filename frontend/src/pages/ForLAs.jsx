import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { TRAINING, PRODUCT, REPLY, POLICY_PACK, PRICES, DELIVERY, GUIDES_HUB } from "../data/facts";

const commissionerQA = [
  {
    q: "How will I know sessions are actually happening?",
    a: "Every session is built to carry a timestamped daily report, submitted within 24 hours - engagement score, activity notes and criteria progress - visible in the portal, not a summary written for you at the end of term.",
  },
  {
    q: "You are one person. What happens if you are ill?",
    a: "I tell you the same day and agree a catch-up plan, in writing. Missed hours are logged against entitlement and made up, not quietly lost, and the running total is visible to you throughout. A single specialist is the trade: one consistent adult for a child who has usually had far too many, and no cover pool to fall back on. Most of the young people I take on could not tolerate a rotating staff team anyway.",
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
    a: "Placements work to the placing authority's threshold guidance, not mine. Where the placing authority is Derby City or Derbyshire, Nottingham City, or Nottinghamshire County, that guidance is the Derby City and Derbyshire Threshold Document (December 2024), the Nottingham City Interim Continuum of Need, or the Nottinghamshire Framework for Support respectively. Each is a published council document, so I work to the current version held by the placing authority.",
  },
  {
    q: "Can records be produced for a monitoring visit?",
    a: "The platform is built to export case chronologies, PLP evidence, safeguarding logs and compliance records as PDFs. It is being tested end to end with synthetic data before the first live placement. Approved policies are available on request.",
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

// Structured data for the commissioned service, built like Tuition.jsx's Service node. The
// credentials are the set already published on /agencies, read from facts.js where a value lives
// there. No price, address or profile link is added; the service is described, not the business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Commissioned EOTAS and alternative provision",
  provider: {
    "@type": "Person",
    name: "James Wallace",
    hasCredential: [
      "Qualified Teacher Status (QTS), 2004",
      "MEd Education, The Open University, 2012",
      "Enhanced DBS on the Update Service",
      TRAINING.safeguarding.name,
    ],
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Derbyshire" },
    { "@type": "AdministrativeArea", name: "Nottinghamshire" },
    { "@type": "AdministrativeArea", name: "East Midlands" },
  ],
  audience: { "@type": "Audience", audienceType: "Local authorities and schools" },
};

export default function ForLAs() {
  usePageMeta({
    title: 'For Local Authorities | Commissioning EOTAS Placements | James Wallace Education',
    description:
      'How commissioning works: referral to first session, weekly plans, daily reports, safeguarding nil returns and inspection-ready exports for SEND panels.',
    path: '/for-las',
    jsonLd,
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
                inspection-ready exports on demand. In person across Derbyshire and
                Nottinghamshire. Online across the UK.
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
            I respond to referral enquiries {REPLY.within} and begin
              placement assessments within 5 working days of receiving a commission.
          </p>
          <div className="row g-4">
            {[
              {
                step: "1",
                title: "Initial Referral",
                desc: `Submit the referral form on this site or contact me directly. I'll respond ${REPLY.within} to discuss the placement.`,
              },
              {
                step: "2",
                title: "Documentation",
                desc: "I'll need the current EHCP or SEN support plan, LA commissioning letter or PO reference, risk assessment, and preferred hours per week.",
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
            commission.{" "}
            <Link to="/sample-report">See a sample report</Link>, shown with invented data.
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

      {/* Prices: the rates tendered to Derbyshire, Leicestershire and Nottingham, read from facts.js. */}
      <section className="jw-section jw-section-white" id="prices">
        <div className="jw-container" style={{ maxWidth: "860px" }}>
          <h2 className="text-center mb-2">What it costs</h2>
          <p className="text-center" style={{ maxWidth: "560px", margin: "0 auto 2.5rem" }}>
            One set of prices for each way of teaching, by the hour, half day or day, with the work around the session included.
          </p>
          <div className="row g-4">
            {[
              { rate: PRICES.commissionedInPerson, halfDay: PRICES.commissionedHalfDayInPerson, day: PRICES.commissionedDayInPerson, title: "In person", body: "One-to-one teaching in the home or a community setting, or a mix of in person and online." },
              { rate: PRICES.commissionedOnline, halfDay: PRICES.commissionedHalfDayOnline, day: PRICES.commissionedDayOnline, title: "Online", body: "One-to-one teaching by video, anywhere in the UK." },
            ].map((f) => (
              <div key={f.title} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--action)", lineHeight: 1 }}>{f.rate}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>per hour</span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                  <p style={{ marginBottom: "0.75rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>{f.body}</p>
                  <p style={{ marginBottom: 0, fontSize: "0.92rem" }}>
                    Half day, up to 3 hours: <strong>{f.halfDay}</strong>
                    <br />
                    Day, up to 5.5 hours: <strong>{f.day}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", margin: "1.5rem 0 0.4rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>Frameworks:</strong> where a council buys through a framework, the
            prices and units are the ones tendered to that framework. Some buy by the half day and day and not by the hour.
            A placement is {DELIVERY.hoursPerWeek} for each pupil.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", margin: "0 0 0.4rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>Included:</strong> planning and preparation, a report within 24 hours of
            every session, monthly reporting, safeguarding records and a monthly nil return, travel to the session, and
            attendance at reviews by agreement.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", margin: 0 }}>
            <strong style={{ color: "var(--text-primary)" }}>Not included:</strong> transport for the young person, and exam or
            accreditation fees, which are charged at cost where agreed in advance. James Wallace Education Ltd is not VAT
            registered, so no VAT is added. Billing is monthly in arrears, session by session.
          </p>
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
                &amp; Safety, Behaviour Support, and more. The suite was {POLICY_PACK.status}; policies are shared with
                commissioners on request.
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
                  Request approved policies
                </Link>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "1rem", marginBottom: 0 }}>
                Free parent guides I maintain: <a href={GUIDES_HUB.url}>{GUIDES_HUB.name}</a>.
              </p>
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
            Submit a referral or request an evidence pack. I respond {REPLY.within}.
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
