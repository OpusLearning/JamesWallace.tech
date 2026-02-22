import React from "react";
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

const card = {
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  borderRadius: "0.5rem",
  border: "1px solid rgba(255,255,255,0.08)",
};

const accent = "#00ffe5";

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
    desc: "Automated daily session reports capturing attendance, engagement, progress against targets, and any welfare notes — sent directly to your nominated coordinator.",
  },
  {
    icon: faUserCheck,
    title: "Student Allocation",
    desc: "Transparent allocation system matching young people to appropriately skilled tutors based on need, profile, and availability. Full audit trail maintained.",
  },
  {
    icon: faClipboardList,
    title: "Evidence & Outcomes",
    desc: "Termly progress reports, session logs, and outcome data compiled for SEND reviews, panel meetings, and statutory reporting — ready when you need them.",
  },
];

const youngPeopleTypes = [
  "Young people with EHCPs in alternative provision",
  "Students with SEMH (Social, Emotional & Mental Health) needs",
  "Persistent school absence — emotionally based (EBSA)",
  "Post-exclusion reintegration support",
  "Young people in care (LAC/CLA)",
  "SEND learners awaiting school placement",
  "Students requiring interim provision during transitions",
  "Young people with ADHD, autism, dyslexia, or PDA profiles",
];

const howItWorks = [
  {
    step: "1",
    title: "Initial Referral",
    desc: "Submit a referral via the portal or contact us directly. We'll respond within 2 working days to confirm capacity and suitability.",
  },
  {
    step: "2",
    title: "Needs Assessment",
    desc: "We review the young person's profile, EHCP (if applicable), and any existing reports to identify the right tutor and approach.",
  },
  {
    step: "3",
    title: "PLP Development",
    desc: "A Personal Learning Plan is drafted in collaboration with you, the school (if applicable), and the family within the first two sessions.",
  },
  {
    step: "4",
    title: "Ongoing Delivery & Reporting",
    desc: "Sessions begin with daily reports, weekly plans, and termly reviews all managed through the portal — keeping your team fully informed.",
  },
];

export default function LAPartnership() {
  return (
    <div className="container-fluid py-5 px-3 px-md-5">
      {/* Hero */}
      <section className="text-center mb-5 pb-3">
        <span
          className="badge mb-3 px-3 py-2"
          style={{
            background: "rgba(0,255,229,0.12)",
            color: accent,
            border: `1px solid ${accent}`,
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
          }}
        >
          LOCAL AUTHORITY PARTNERSHIPS
        </span>
        <h1 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Specialist Tutoring Built for<br />
          <span style={{ color: accent }}>Local Authority Compliance</span>
        </h1>
        <p
          className="mx-auto mb-4"
          style={{ color: "rgba(255,255,255,0.7)", maxWidth: "680px", fontSize: "1.1rem", lineHeight: 1.75 }}
        >
          A fully managed, evidenced tutoring service for LA-referred young people — with compliance, safeguarding,
          planning, and reporting built into every placement through our dedicated portal.
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <a
            href="https://portal.jameswallace.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="btn fw-semibold px-4 py-2"
            style={{ background: accent, color: "#0d1b2a", borderRadius: "8px" }}
          >
            Access the Portal <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
          </a>
          <a
            href="/calendly"
            className="btn fw-semibold px-4 py-2"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "8px",
            }}
          >
            Book a Conversation
          </a>
        </div>
      </section>

      {/* Platform overview */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#fff" }}>The Platform</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Everything your team needs to commission, monitor, and evidence specialist tutoring provision.
          </p>
        </div>
        <div className="row g-4">
          {features.map((f, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="h-100 p-4" style={card}>
                <div className="mb-3">
                  <FontAwesomeIcon icon={f.icon} style={{ color: accent, fontSize: "1.75rem" }} />
                </div>
                <h3 className="h5 fw-bold mb-2" style={{ color: "#fff" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we work with */}
      <section className="mb-5">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-5">
            <h2 className="fw-bold mb-3" style={{ color: "#fff" }}>
              Extensive Experience with<br />
              <span style={{ color: accent }}>Complex Young People</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
              We work with young people whose needs go beyond what a standard classroom setting can provide.
              Our tutors are specialist practitioners — not generalist supply staff — with direct experience
              of the profiles, pressures, and protections that LA placements require.
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
              Every placement is matched carefully. We do not take on young people we cannot properly serve.
            </p>
          </div>
          <div className="col-12 col-lg-7">
            <div className="p-4" style={card}>
              <ul className="list-unstyled mb-0">
                {youngPeopleTypes.map((item, i) => (
                  <li key={i} className="d-flex align-items-start gap-3 mb-3">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ color: accent, marginTop: "3px", flexShrink: 0 }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#fff" }}>How to Commission</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>A clear, low-friction process from referral to delivery.</p>
        </div>
        <div className="row g-4">
          {howItWorks.map((step, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3">
              <div className="h-100 p-4 text-center" style={card}>
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "rgba(0,255,229,0.15)",
                    color: accent,
                    fontSize: "1.25rem",
                    border: `1px solid ${accent}`,
                  }}
                >
                  {step.step}
                </div>
                <h3 className="h5 fw-bold mb-2" style={{ color: "#fff" }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance callout */}
      <section className="mb-5">
        <div
          className="p-4 p-md-5 text-center"
          style={{
            ...card,
            borderColor: `rgba(0,255,229,0.2)`,
            background: "rgba(0,255,229,0.05)",
          }}
        >
          <FontAwesomeIcon icon={faHandshake} style={{ color: accent, fontSize: "2.5rem", marginBottom: "1rem" }} />
          <h2 className="fw-bold mb-3" style={{ color: "#fff" }}>Ready to Meet Your Compliance Requirements</h2>
          <p
            className="mx-auto mb-4"
            style={{ color: "rgba(255,255,255,0.7)", maxWidth: "620px", lineHeight: 1.75 }}
          >
            The portal is designed specifically for LA procurement — with audit trails, safeguarding logs,
            signed-off PLPs, and reporting that satisfies OFSTED, SEND review panels, and internal QA processes.
            We can provide documentation packages on request.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a
              href="https://portal.jameswallace.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn fw-semibold px-4 py-2"
              style={{ background: accent, color: "#0d1b2a", borderRadius: "8px" }}
            >
              Visit the Portal <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </a>
            <a
              href="/contact"
              className="btn fw-semibold px-4 py-2"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
