import { Link } from "react-router-dom";

const learnerProfiles = [
  { label: "EOTAS", description: "Education Other Than At School — full-time or part-time alternative to school placement" },
  { label: "EBSA", description: "Emotionally-Based School Avoidance — graduated reintegration or maintained AP" },
  { label: "AP", description: "Alternative Provision alongside or instead of a specialist school placement" },
  { label: "EHCP", description: "Learners with an Education, Health and Care Plan requiring specialist delivery" },
  { label: "LAC", description: "Looked After Children with SEND or SEMH needs, including virtual school commissioned placements" },
  { label: "PDA Profile", description: "Pathological Demand Avoidance — sessions adapted to demand avoidance and autonomy" },
];

export default function Provision() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <h1>EOTAS &amp; Alternative Provision</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                ND Services delivers structured, specialist provision for young
                people who cannot access mainstream or special school settings.
                We support learners across EOTAS, EBSA, AP, and EHCP
                placements — with daily evidence, real-time safeguarding, and
                an unbroken chain from referral to case closure.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact" className="jw-btn-primary">
                  Make a Referral &rarr;
                </Link>
                <Link to="/platform" className="jw-btn-secondary">
                  See the Platform
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5 text-center">
              <img
                src="/portal/03b-weekly-plan-tab.webp"
                alt="Weekly plan workflow in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                Weekly plan workflow — ND Portal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-2">Delivery Model</h2>
          <p
            className="text-center"
            style={{ maxWidth: "560px", margin: "0 auto 3rem" }}
          >
            Flexible, structured provision built around each learner's needs,
            location, and commissioning arrangement.
          </p>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="jw-card h-100 text-center">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--brand)", marginBottom: "0.5rem" }}>
                  In-Person
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>
                  Sessions delivered at a community venue, learner's home (with
                  appropriate risk assessment), or agreed location. East
                  Midlands-based with wider coverage by arrangement.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="jw-card h-100 text-center">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--brand)", marginBottom: "0.5rem" }}>
                  Remote
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>
                  Online sessions via a secure video platform, suitable for
                  learners with EBSA, phobia, or significant sensory needs.
                  Full daily session reporting applies.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="jw-card h-100 text-center">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--brand)", marginBottom: "0.5rem" }}>
                  Mixed / Blended
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>
                  A combination of in-person and remote delivery, often used in
                  EBSA reintegration programmes or where session days vary.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 mt-2">
            <div className="col-12 col-md-4">
              <div className="jw-card h-100 text-center">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Session Cadence
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>
                  Typically 3-15 hours per week depending on the commission.
                  Sessions are planned weekly, with individual daily reports
                  submitted within 24 hours.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="jw-card h-100 text-center">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Coverage
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>
                  East Midlands for in-person delivery. Remote delivery
                  available UK-wide. Contact us to discuss specific areas.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="jw-card h-100 text-center">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Subject Coverage
                </h3>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>
                  Maths, English, Computer Science, Science, and functional
                  skills. Wider curriculum by agreement. PLP outcomes determine
                  subject focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learner Profiles */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Who We Support</h2>
          <p
            className="text-center"
            style={{ maxWidth: "560px", margin: "0 auto 3rem" }}
          >
            We accept referrals for learners across a range of SEND, SEMH, and
            placement categories.
          </p>
          <div className="row g-4">
            {learnerProfiles.map((profile) => (
              <div key={profile.label} className="col-12 col-md-6 col-lg-4">
                <div className="jw-card h-100" style={{ display: "flex", gap: "0.75rem" }}>
                  <div
                    style={{
                      minWidth: "36px",
                      height: "36px",
                      borderRadius: "6px",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  >
                    {profile.label}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>{profile.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Chain */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>The Evidence Chain</h2>
              <p>
                Every placement follows a structured, auditable evidence
                workflow from first session to case closure.
              </p>
              <div className="d-flex flex-column gap-3 mt-4">
                {[
                  { step: "Plan", desc: "Weekly session plan submitted in ND Portal — PLP criteria, planned activities, session logistics. Approved by supervisor before delivery begins." },
                  { step: "Deliver", desc: "Education Specialist delivers the session. Lone working check-in at start. Panic button available throughout." },
                  { step: "Evidence", desc: "Daily report submitted within 24 hours — attendance, engagement (0-10), per-subject activity notes, PLP criterion progress, safeguarding observations." },
                ].map((item) => (
                  <div key={item.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        minWidth: "80px",
                        background: "var(--brand)",
                        color: "#fff",
                        borderRadius: "6px",
                        padding: "0.4rem 0.75rem",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textAlign: "center",
                      }}
                    >
                      {item.step}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <img
                src="/portal/03b-weekly-plan-tab.webp"
                alt="Weekly plan workflow in ND Portal"
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

      {/* Safeguarding summary */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-8">
              <h2>Safeguarding</h2>
              <p>
                Safeguarding is built into every stage of delivery — not added
                after the fact. ND Services operates in full compliance with
                KCSIE 2024 and Working Together 2023.
              </p>
              <ul style={{ fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>Designated Safeguarding Lead (DSL) accessible to all practitioners</li>
                <li>All concerns logged immediately in an encrypted, audit-trailed system</li>
                <li>Physical Intervention Recording Forms (PIRFs) completed before caseload can proceed</li>
                <li>Lone working check-in/check-out with overdue escalation and panic alert</li>
                <li>Automated daily alerts for stale or unactioned safeguarding concerns</li>
              </ul>
              <Link to="/compliance" className="jw-btn-secondary mt-3 d-inline-block">
                Full compliance details &rarr;
              </Link>
            </div>
            <div className="col-12 col-lg-4">
              <img
                src="/portal/06-safeguarding.webp"
                alt="Safeguarding management in ND Portal"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Make a referral</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            If you have a young person who needs structured, specialist
            alternative provision, get in touch. We respond to all referral
            enquiries within 2 working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/contact" className="jw-btn-secondary">
              Download Example Evidence Pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
