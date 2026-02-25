import { Link } from "react-router-dom";
import {
  FaBrain,
  FaGraduationCap,
  FaHandsHelping,
  FaCogs,
  FaRocket,
  FaShieldAlt,
  FaClipboardCheck,
  FaUsers,
} from "react-icons/fa";

function FocusCard({ icon, title, description }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4 d-flex">
      <div className="jw-card text-center w-100">
        <div style={{ color: "var(--brand)", marginBottom: "0.75rem" }}>
          {icon}
        </div>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "0.4rem",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>{description}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-5 text-center">
              <img
                src="/james-wallace.webp"
                alt="James Wallace - Education Specialist and EOTAS Provider"
                style={{
                  width: "260px",
                  maxWidth: "100%",
                  borderRadius: "12px",
                  objectFit: "cover",
                  objectPosition: "top",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <h1>James Wallace</h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "var(--brand)",
                  marginBottom: "1rem",
                }}
              >
                Education Specialist &amp; EOTAS Provider
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                ND Services is a specialist micro-provider delivering structured
                alternative provision for neurodiverse learners who cannot access
                mainstream or special school settings. Every placement is
                underpinned by a purpose-built case management platform and
                inspection-ready evidence framework.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3 mb-4">
                {[
                  "BSc Computing",
                  "MEd",
                  "QTS",
                  "Enhanced DBS",
                  "DSL",
                  "ASD Awareness",
                ].map((t) => (
                  <span key={t} className="jw-badge">
                    {t}
                  </span>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/contact" className="jw-btn-primary">
                  Make a Referral
                </Link>
                <Link to="/credentials" className="jw-btn-secondary">
                  Full Credentials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="jw-section jw-section-white">
        <div className="jw-container" style={{ maxWidth: "760px" }}>
          <h2 className="mb-4">About the Provider</h2>
          <p>
            ND Services was founded by James Wallace, an Education
            Specialist with over a decade of experience working with
            neurodiverse learners and their families. James holds a BSc in
            Computing, a Master of Education (MEd), Qualified Teacher Status
            (QTS), and an Enhanced DBS on the Update Service.
          </p>
          <p>
            The provision operates as a commissioner-grade micro-provider with
            structured delivery, real-time safeguarding, and a purpose-built
            case management portal. We work directly with Local Authority SEND
            teams, EOTAS coordinators, and EHCP caseworkers to deliver placement
            programmes that are evidence-based, inspection-ready, and genuinely
            built around each learner.
          </p>
          <p>
            James is the Designated Safeguarding Lead (DSL) for all active
            cases, and holds current Safeguarding Level 2, Prevent Awareness,
            Lone Working, and First Aid at Work qualifications - all tracked and
            verified in the ND Portal compliance system.
          </p>
        </div>
      </section>

      {/* Provision specialisms */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-5">Provision Specialisms</h2>
          <div className="row">
            <FocusCard
              icon={<FaBrain size={36} />}
              title="Neurodivergent Learners"
              description="ADHD, Autism, PDA profile, Dyslexia, and co-occurring presentations - structured sessions adapted to each learner's profile."
            />
            <FocusCard
              icon={<FaShieldAlt size={36} />}
              title="SEMH & Complex Needs"
              description="Social, emotional, and mental health needs; EBSA; LAC; and learners with trauma-informed requirements."
            />
            <FocusCard
              icon={<FaClipboardCheck size={36} />}
              title="EHCP Delivery"
              description="Provision aligned to EHCP outcomes with PLP criterion tracking updated after every session."
            />
            <FocusCard
              icon={<FaUsers size={36} />}
              title="LA Partnership"
              description="Direct commissioning from Local Authorities, SEND teams, and virtual school heads with transparent monthly reporting."
            />
          </div>
        </div>
      </section>

      {/* Provider Values */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-5">Provider Values</h2>
          <div className="row">
            <FocusCard
              icon={<FaHandsHelping size={36} />}
              title="Learner-Centred"
              description="Every placement is built around the individual - their interests, communication style, and learning environment."
            />
            <FocusCard
              icon={<FaGraduationCap size={36} />}
              title="Evidence-Based Practice"
              description="Grounded in cognitive science and proven SEN strategies, with daily session evidence as standard."
            />
            <FocusCard
              icon={<FaCogs size={36} />}
              title="Structured Provision"
              description="Predictable session structure, weekly planning, and an unbroken evidence chain from referral to case closure."
            />
            <FocusCard
              icon={<FaRocket size={36} />}
              title="Commissioner Confidence"
              description="Real-time portal access, automated safeguarding alerts, and on-demand inspection exports - built in, not bolted on."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Commission specialist provision</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            If you have a young person who needs structured, specialist
            alternative provision, get in touch. We respond to all referral
            enquiries within 2 working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/for-las" className="jw-btn-secondary">
              For Local Authorities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
