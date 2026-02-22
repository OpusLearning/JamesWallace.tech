import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faClipboardList,
  faChartBar,
  faUserCheck,
  faCalendarAlt,
  faFileAlt,
  faHandshake,
  faCheckCircle,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faShieldAlt,
    title: "Compliance & Safeguarding",
    desc: "Full safeguarding documentation, DBS-verified tutors, KCSIE-aligned policies, and incident reporting built into every placement. Every session is recorded and auditable.",
  },
  {
    icon: faFileAlt,
    title: "Personal Learning Plans (PLPs)",
    desc: "Each young person receives a tailored PLP developed collaboratively with the LA, school, and family. Targets are reviewed regularly and evidenced against progress.",
  },
  {
    icon: faCalendarAlt,
    title: "Weekly Planning",
    desc: "Structured weekly session plans submitted in advance. LAs and coordinators can review planned content, targets, and adaptations before sessions begin.",
  },
  {
    icon: faChartBar,
    title: "Daily Reporting",
    desc: "Automated daily session reports capturing attendance, engagement, progress against targets, and any welfare notes  -  sent directly to your nominated coordinator.",
  },
  {
    icon: faUserCheck,
    title: "Student Allocation",
    desc: "Transparent allocation system matching young people to appropriately skilled tutors based on need, profile, and availability. Full audit trail maintained.",
  },
  {
    icon: faClipboardList,
    title: "Evidence & Outcomes",
    desc: "Termly progress reports, session logs, and outcome data compiled for SEND reviews, panel meetings, and statutory reporting  -  ready when you need them.",
  },
];

const youngPeopleTypes = [
  "Young people with EHCPs in alternative provision",
  "Students with SEMH (Social, Emotional & Mental Health) needs",
  "Persistent school absence  -  emotionally based (EBSA)",
  "Post-exclusion reintegration support",
  "Young people in care (LAC/CLA)",
  "SEND learners awaiting school placement",
  "Students requiring interim provision during transitions",
  "Young people with ADHD, autism, dyslexia, or PDA profiles",
];

const howItWorks = [
  { step: "1", title: "Initial Referral", desc: "Submit a referral via the portal or contact us directly. We'll respond within 2 working days to confirm capacity and suitability." },
  { step: "2", title: "Needs Assessment", desc: "We review the young person's profile, EHCP (if applicable), and any existing reports to identify the right tutor and approach." },
  { step: "3", title: "PLP Development", desc: "A Personal Learning Plan is drafted in collaboration with you, the school (if applicable), and the family within the first two sessions." },
  { step: "4", title: "Ongoing Delivery & Reporting", desc: "Sessions begin with daily reports, weekly plans, and termly reviews all managed through the portal  -  keeping your team fully informed." },
];

export default function LAPartnership() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <span className="jw-badge jw-badge-brand mb-3" style={{ display: "inline-block" }}>
            Local Authority Partnerships
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Specialist Tutoring Built for<br />
            <span style={{ color: "var(--action)" }}>LA Compliance</span>
          </h1>
          <p style={{ maxWidth: "640px", margin: "0 auto 2rem", fontSize: "1.05rem" }}>
            A fully managed, evidenced tutoring service for LA-referred young people  -  with
            compliance, safeguarding, planning, and reporting built into every placement
            through our dedicated portal.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a
              href="https://portal.jameswallace.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="jw-btn-primary"
            >
              Access the Portal <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </a>
            <Link to="/calendly" className="jw-btn-secondary">
              Book a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>The Platform</h2>
            <p style={{ maxWidth: "520px", margin: "0 auto" }}>
              Everything your team needs to commission, monitor, and evidence specialist tutoring provision.
            </p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="jw-card h-100">
                  <div className="mb-3" style={{ color: "var(--brand)" }}>
                    <FontAwesomeIcon icon={f.icon} size="2x" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.9375rem" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-5">
              <h2>Extensive Experience with<br /><span style={{ color: "var(--action)" }}>Complex Young People</span></h2>
              <p>
                We work with young people whose needs go beyond what a standard classroom setting
                can provide. Our tutors are specialist practitioners  -  not generalist supply staff
                 -  with direct experience of the profiles, pressures, and protections that LA
                placements require.
              </p>
              <p style={{ marginBottom: 0 }}>
                Every placement is matched carefully. We do not take on young people we cannot
                properly serve.
              </p>
            </div>
            <div className="col-12 col-lg-7">
              <div className="jw-card">
                <ul className="list-unstyled mb-0">
                  {youngPeopleTypes.map((item, i) => (
                    <li key={i} className="d-flex align-items-start gap-3 mb-3">
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", marginTop: "3px", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.9375rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to commission */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>How to Commission</h2>
            <p>A clear, low-friction process from referral to delivery.</p>
          </div>
          <div className="row g-4">
            {howItWorks.map((s, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100 text-center">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: "2.75rem", height: "2.75rem", borderRadius: "50%",
                      background: "var(--brand-light)", color: "var(--brand)",
                      fontSize: "1.1rem", border: "1px solid #b8dce8",
                    }}
                  >
                    {s.step}
                  </div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div
            className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-4 p-4 p-md-5"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "12px" }}
          >
            <div style={{ maxWidth: "620px" }}>
              <FontAwesomeIcon icon={faHandshake} style={{ color: "var(--action)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Ready to Meet Your Compliance Requirements</h2>
              <p style={{ margin: 0 }}>
                The portal is designed specifically for LA procurement  -  with audit trails,
                safeguarding logs, signed-off PLPs, and reporting that satisfies OFSTED, SEND
                review panels, and internal QA. Documentation packages available on request.
              </p>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <a
                href="https://portal.jameswallace.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="jw-btn-primary"
              >
                Visit the Portal ↗
              </a>
              <Link to="/contact" className="jw-btn-secondary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
