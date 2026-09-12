import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { STATUTORY, DELIVERY } from "../data/facts";

const learnerProfiles = [
  { label: "EOTAS", description: "Education Other Than At School - full-time or part-time alternative to school placement" },
  { label: "EBSA", description: "Emotionally-Based School Avoidance - graduated reintegration or maintained AP" },
  { label: "AP", description: "Alternative Provision alongside or instead of a specialist school placement" },
  { label: "EHCP", description: "Learners with an Education, Health and Care Plan requiring specialist delivery" },
  { label: "LAC", description: "Looked After Children with SEND or SEMH needs, including virtual school commissioned placements" },
  { label: "PDA Profile", description: "Pathological Demand Avoidance - sessions adapted to demand avoidance and autonomy" },
];

export default function Provision() {
  usePageMeta({
    title: 'Provision | EOTAS, EBSA and Alternative Provision | James Wallace',
    description:
      'One-to-one and small-group provision for learners with autism, ADHD, PDA and anxiety-based school avoidance. Personal learning plans, daily evidence, termly review.',
    path: '/provision',
  });

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <h1>EOTAS &amp; Alternative Provision</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                Structured, specialist teaching for young people who cannot
                access a mainstream or special school. I work across EOTAS,
                EBSA, alternative provision and EHCP placements, with evidence
                filed after every session and an unbroken record from first
                contact to case closure.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact?for=commissioner" className="jw-btn-primary">
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
                Weekly plan workflow - ND Portal
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
                  Typically {DELIVERY.hoursPerWeek} of taught sessions,
                  depending on the commission. Sessions are planned weekly,
                  with individual daily reports submitted within 24 hours.
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
                  available UK-wide. Ask me about anywhere else.
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
          <h2 className="text-center mb-2">Who I work with</h2>
          <p
            className="text-center"
            style={{ maxWidth: "560px", margin: "0 auto 3rem" }}
          >
            Referrals come from families, agencies and local authorities,
            across a range of SEND, SEMH and placement categories.
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
                {/* These two steps used to read "approved by supervisor" and "panic button available throughout". Both are
                    real ND Portal features, but they are multi-practitioner features, and I am a sole practitioner. The
                    platform and compliance pages already say so; this page now says the same thing. */}
                {[
                  { step: "Plan", desc: "Weekly session plan submitted in ND Portal - PLP criteria, planned activities, session logistics. The plan is locked before delivery begins, so the week has an evidence baseline. Where a commissioner wants sight of it first, approval is recorded against the plan." },
                  { step: "Deliver", desc: "I deliver the session, with a lone working check-in at the start and check-out at the end, timestamped. The portal's panic alert and live supervisor feed are built for providers with a supervisory team; as a sole practitioner, my escalation route is agreed in writing with the commissioner before teaching begins." },
                  { step: "Evidence", desc: "Daily report submitted within 24 hours - attendance, engagement (0-10), per-subject activity notes, PLP criterion progress, safeguarding observations." },
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
                Safeguarding is built into every stage of delivery - not added
                after the fact. I work in line with {STATUTORY.kcsie} and{" "}
                {STATUTORY.workingTogether}.
              </p>
              <ul style={{ fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>I am the Designated Safeguarding Lead for every placement I take</li>
                <li>All concerns logged immediately in an encrypted, audit-trailed system</li>
                <li>Physical Intervention Recording Forms (PIRFs) completed before caseload can proceed</li>
                <li>Timestamped lone working check-in and check-out for every solo session, with the escalation route agreed in writing with the commissioner</li>
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
            provision, get in touch. I come back within two working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/contact?for=commissioner" className="jw-btn-secondary">
              Request an example evidence pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
