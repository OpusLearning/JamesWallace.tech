import { Link } from "react-router-dom";

const serviceItems = [
  {
    title: "EOTAS Placements",
    description:
      "Education Other Than At School - 1:1 and small group sessions for learners who cannot access a mainstream or special school setting.",
  },
  {
    title: "EBSA Reintegration",
    description:
      "Graduated return-to-school planning for learners with emotionally-based school avoidance, with structured evidence at every stage.",
  },
  {
    title: "Alternative Provision",
    description:
      "AP packages for learners awaiting or alongside specialist placements, with daily session reports and PLP progress tracking.",
  },
  {
    title: "EHCP Top-Up Support",
    description:
      "Intensive targeted input aligned to Education, Health and Care Plan outcomes, with criterion-level progress visible in real time.",
  },
];

const differentiators = [
  {
    title: "Transparent, Inspection-Ready Provision",
    description:
      "Every session is planned, delivered, and evidenced in our case management portal. Commissioners receive real-time engagement data, attendance tracking, and safeguarding oversight - not a monthly PDF.",
  },
  {
    title: "Built Around the Individual",
    description:
      "Every learner gets a bespoke PLP written to their EHCP outcomes. Our Education Specialists work with the learner's interests, pace, and preferred environment - not a one-size curriculum.",
  },
  {
    title: "Compliance You Can Rely On",
    description:
      "All staff hold enhanced DBS, First Aid qualifications, and role-specific mandatory training tracked in our compliance system. Lone working is monitored in real time. Safeguarding concerns are logged, actioned, and auditable.",
  },
];

const commissionerQA = [
  {
    q: "How do I know sessions are actually happening?",
    a: "Every session has a timestamped daily report submitted within 24 hours - with engagement score, activity notes, and criteria progress. Supervisors can see the full picture in real time.",
  },
  {
    q: "How do you handle safeguarding?",
    a: "Every concern is logged, tracked, and escalated through a structured workflow. DSL is notified of any stale concerns automatically. PIRFs cannot be bypassed. Inspection bundles are available on demand.",
  },
  {
    q: "Are you inspection-ready?",
    a: "Yes. Case chronologies, PLP evidence, safeguarding logs, compliance records, and policy packs can be exported as PDFs for any monitoring visit.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <div className="jw-status-pill">Accepting referrals</div>
              <h1>
                Specialist EOTAS Provision - Built for the Learners the System
                Has Left Behind
              </h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                ND Services delivers expert, personalised education for young
                people unable to access mainstream or special school settings. We
                support learners across a growing portfolio of EOTAS, EBSA, and
                AP placements - backed by a purpose-built case management
                platform that gives commissioners real-time visibility at every
                stage.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact" className="jw-btn-primary">
                  Make a Referral &rarr;
                </Link>
                <Link to="/platform" className="jw-btn-secondary">
                  View the Platform &rarr;
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5 text-center">
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "2rem",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src="/portal/01-dashboard.webp"
                  alt="ND Portal supervisor dashboard"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginTop: "0.75rem",
                    marginBottom: 0,
                  }}
                >
                  ND Portal - live case management dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-2">What We Do</h2>
          <p
            className="text-center"
            style={{ maxWidth: "600px", margin: "0 auto 3rem" }}
          >
            ND Services provides education and support for young people whose
            needs cannot be met in a traditional school environment. We work
            directly with Local Authorities, SEND teams, and commissioning
            bodies.
          </p>
          <div className="row g-4">
            {serviceItems.map((item) => (
              <div key={item.title} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      color: "var(--brand)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-4" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Every learner has a Personal Learning Plan, weekly planned sessions,
            and a submitted daily session report - so commissioners and parents
            always have an accurate, up-to-date picture of progress.
          </p>
        </div>
      </section>

      {/* Three Differentiators */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Why ND Services</h2>
          <p
            className="text-center"
            style={{ maxWidth: "540px", margin: "0 auto 3rem" }}
          >
            Three things that set our provision apart.
          </p>
          <div className="row g-4">
            {differentiators.map((item, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="jw-card h-100">
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform teaser */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src="/portal/01-dashboard.webp"
                    alt="ND Portal dashboard"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
                <div className="col-6">
                  <img
                    src="/portal/07-lone-working.webp"
                    alt="ND Portal lone working"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--brand)",
                  marginBottom: "0.5rem",
                }}
              >
                Managed through ND Portal
              </p>
              <h2>Purpose-built for EOTAS delivery</h2>
              <ul
                style={{
                  paddingLeft: "1.25rem",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <li>Live supervisor dashboard across the full portfolio</li>
                <li>Automated safeguarding concern tracking and escalation</li>
                <li>Lone working check-in, overdue alerts, and panic button</li>
                <li>Weekly plans linked to PLP criteria - evidence chain intact</li>
                <li>
                  Inspection bundle PDF export - available on demand
                </li>
              </ul>
              <Link to="/platform" className="jw-btn-secondary mt-3 d-inline-block">
                See the platform &rarr;
              </Link>
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
            What commissioners typically ask - and how ND Services answers.
          </p>
          <div className="row g-4">
            {commissionerQA.map((item, i) => (
              <div key={i} className="col-12 col-lg-4">
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
          <div className="text-center mt-4">
            <Link to="/for-las" className="jw-btn-secondary">
              All commissioner information &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-3 text-center">
              <img
                src="/james-wallace.webp"
                alt="James Wallace - Education Specialist"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "top",
                  border: "3px solid var(--border)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              />
            </div>
            <div className="col-12 col-md-9">
              <h2 style={{ marginBottom: "0.75rem" }}>About James</h2>
              <p>
                James Wallace is an Education Specialist with a BSc in
                Computing, MEd, QTS, and Enhanced DBS. He works exclusively with
                neurodiverse learners, delivering specialist provision for young
                people with ADHD, Autism, SEMH, and complex needs through
                evidence-based, structured sessions.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {["BSc Computing", "MEd", "QTS", "Enhanced DBS", "DSL"].map(
                  (badge) => (
                    <span key={badge} className="jw-badge">
                      {badge}
                    </span>
                  )
                )}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/about" className="jw-btn-secondary">
                  About James
                </Link>
                <Link to="/credentials" className="jw-btn-secondary">
                  Credentials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral CTA */}
      <section
        className="jw-section"
        style={{
          background: "var(--surface-dark, #1a1a2e)",
          color: "#fff",
        }}
      >
        <div className="jw-container text-center">
          <h2 style={{ color: "#fff" }}>Ready to make a referral?</h2>
          <p
            style={{
              maxWidth: "520px",
              margin: "0 auto 2rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            We work with Local Authority SEND teams, EOTAS coordinators, EHCP
            caseworkers, and independent referrers. We aim to respond within 2
            working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link
              to="/contact"
              className="jw-btn-primary"
              style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
            >
              Make a Referral
            </Link>
            <Link
              to="/calendly"
              className="jw-btn-secondary"
              style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
