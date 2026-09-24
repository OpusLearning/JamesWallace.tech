import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { BIO, SAFEGUARDING_ROLES, STATUTORY, TRAINING } from "../data/facts";
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

function renderFocusCard(icon, title, description) {
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
  usePageMeta({
    title: 'About James Wallace | Specialist SEND Educator | ND Services',
    description:
      'Thirteen years teaching in specialist provision, twelve of them in a specialist SEMH school, five years inside a local authority commissioning team, now delivering EOTAS for neurodiverse young people.',
    path: '/about',
  });

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
              <h1>Meet James Wallace</h1>
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
                ND Services is the specialist educational provision operated by James
                Wallace. I deliver structured alternative provision for neurodiverse
                learners who cannot access mainstream or special school settings, with
                a clear record of what was planned, delivered and reviewed.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3 mb-4">
                {[
                  BIO.degreeShort,
                  "MEd",
                  "QTS",
                  "Enhanced DBS",
                  SAFEGUARDING_ROLES.deputy.role,
                  "ASD Awareness",
                ].map((t) => (
                  <span key={t} className="jw-badge">
                    {t}
                  </span>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/contact?for=commissioner" className="jw-btn-primary">
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
          <h2 className="mb-4">One practitioner, accountable throughout</h2>
          <p>
            ND Services is operated by James Wallace, and in practice is James
            Wallace: one qualified teacher rather than a staffed agency, which is
            deliberate. Thirteen years teaching in specialist provision, twelve
            of them in a specialist SEMH school, and five inside a county
            council&#39;s children&#39;s commissioning team. James holds
            a {BIO.degree}, a Master of Education (MEd), Qualified
            Teacher Status since 2004, and an Enhanced DBS on the Update Service.
          </p>
          <p>
            The provision is deliberately small: one qualified teacher remains
            responsible for the teaching, safeguarding and records. I work directly
            with Local Authority SEND teams, EOTAS coordinators and EHCP caseworkers,
            sharing the evidence they need to review a placement.
          </p>
          <p>
            {SAFEGUARDING_ROLES.dsl.name} is the{" "}
            {SAFEGUARDING_ROLES.dsl.role} for the provision, and I am the{" "}
            {SAFEGUARDING_ROLES.deputy.role}. We have both completed{" "}
            {TRAINING.dsl.provider}'s {TRAINING.dsl.name} course, certificated{" "}
            {TRAINING.dsl.completed}. I hold current safeguarding and{" "}
            {STATUTORY.kcsie}, Prevent duty, child-on-child abuse, allergy
            awareness and lone working training, with the Whole School SEND
            Platinum award. Renewal dates are tracked with expiry alerts rather
            than left to lapse.
          </p>
          <p>{SAFEGUARDING_ROLES.dsl.intro}</p>
        </div>
      </section>

      {/* Provision specialisms */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-5">Where my experience is most useful</h2>
          <div className="row">
            {renderFocusCard(
              <FaBrain size={36} />,
              "Neurodivergent Learners",
              "ADHD, Autism, PDA profile, Dyslexia, and co-occurring presentations - structured sessions adapted to each learner's profile."
            )}
            {renderFocusCard(
              <FaShieldAlt size={36} />,
              "SEMH & Complex Needs",
              "Social, emotional, and mental health needs; EBSA; LAC; and learners with trauma-informed requirements."
            )}
            {renderFocusCard(
              <FaClipboardCheck size={36} />,
              "EHCP Delivery",
              "Provision aligned to EHCP outcomes with PLP criterion tracking updated after every session."
            )}
            {renderFocusCard(
              <FaUsers size={36} />,
              "LA Partnership",
              "Direct commissioning from Local Authorities, SEND teams, and virtual school heads with transparent monthly reporting."
            )}
          </div>
        </div>
      </section>

      {/* Provider Values */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-5">How I work</h2>
          <div className="row">
            {renderFocusCard(
              <FaHandsHelping size={36} />,
              "Learner-Centred",
              "Every placement is built around the individual - their interests, communication style, and learning environment."
            )}
            {renderFocusCard(
              <FaGraduationCap size={36} />,
              "Evidence-Based Practice",
              "Teaching informed by SEND training, with daily session evidence used to review and adjust the plan."
            )}
            {renderFocusCard(
              <FaCogs size={36} />,
              "Structured Provision",
              "Predictable session structure, weekly planning, and records from referral to case closure."
            )}
            {renderFocusCard(
              <FaRocket size={36} />,
              "Clear Reporting",
              "Portal access, safeguarding records, and evidence exports for placement reviews."
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Commission specialist provision</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            If you have a young person who needs structured, specialist
            alternative provision, get in touch. I respond to referral enquiries
            within 2 working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner" className="jw-btn-primary">
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
