import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCertificate,
  faBriefcase,
  faQuoteLeft,
  faShieldAlt,
  faCheckCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const academicQuals = [
  {
    title: "Bachelor of Education (BEd) — Level 7",
    institution: "Sheffield Hallam University",
    detail: "Professional Practice in Education — postgraduate-level study in specialist education practice.",
  },
  {
    title: "PGCE — Secondary Education (Vocational: Applied ICT)",
    institution: "Nottingham Trent University",
    detail: "Qualified Teacher Status (QTS). Secondary specialist in applied ICT and vocational education pathways.",
  },
];

const cpdCerts = [
  {
    title: "Understanding Autism",
    provider: "FutureLearn / University of Kent",
    desc: "Evidence-based understanding of autism spectrum conditions, communication differences, and sensory needs in educational settings.",
  },
  {
    title: "Language and Communication in Autism",
    provider: "FutureLearn",
    desc: "Specialist focus on language development, AAC, and communication strategies for autistic learners.",
  },
  {
    title: "Sensory Processing Aware — Level 1",
    provider: "Sensory Integration Education",
    desc: "Practical frameworks for identifying and supporting sensory processing differences in young people.",
  },
  {
    title: "Software Development Bootcamp — JavaScript",
    provider: "Northcoders",
    desc: "Full-stack JavaScript development. Informs direct use of technology tools in tutoring and platform work.",
  },
];

const experience = [
  {
    role: "Specialist SEMH Teacher",
    org: "Alternative Provision — Nottinghamshire",
    desc: "Delivered specialist 1:1 and small-group teaching for young people with Social, Emotional & Mental Health needs in LA-commissioned alternative provision. Wrote and implemented PLPs, produced daily and termly reports, worked closely with EPs, SENCOs, and family teams.",
  },
  {
    role: "Public Health Support Officer",
    org: "Nottinghamshire County Council — Children's & Young People's Commissioning Unit",
    desc: "Supported commissioning and quality assurance of provision for LAC and complex-needs young people. Involved in SEND panel processes, safeguarding reviews, and provider monitoring.",
  },
  {
    role: "Specialist Tutor (Independent)",
    org: "James Wallace Education",
    desc: "1:1 specialist tutoring for neurodiverse young people (ADHD, ASD, dyslexia, PDA profiles). Online and in-person delivery. Clients include LA-referred young people and privately commissioned families.",
  },
];

const whyItMatters = [
  {
    title: "Specialist — not generalist",
    desc: "Qualified and trained specifically in SEND, SEMH and neurodiverse learners. Not a gap-year graduate or mainstream supply teacher.",
  },
  {
    title: "LA-fluent",
    desc: "Direct experience inside a Local Authority commissioning team. I understand the process, the paperwork, and what panels need to see.",
  },
  {
    title: "Safeguarding built in",
    desc: "Enhanced DBS, KCSIE-aware, trained in safeguarding procedures. Every session logged, every concern documented.",
  },
  {
    title: "Evidence-led",
    desc: "PLPs, daily reports, termly reviews — not as box-ticking but as genuine planning and communication tools.",
  },
];

const references = [
  {
    quote: "James is a gifted and dedicated teacher who is wholly committed to supporting young people with additional needs. He builds trust quickly with the most disengaged students and produces clear, useful reports that make our panel work much easier.",
    name: "Sara Humphreys",
    role: "SENCO, Nottinghamshire",
    stars: 5,
  },
  {
    quote: "We commissioned James for a complex placement — a young person with severe SEMH needs who had refused all previous provision. His approach was calm, structured, and the progress over six weeks was remarkable. Documentation was exemplary.",
    name: "Karen Dodds",
    role: "Education Commissioning Officer, Local Authority",
    stars: 5,
  },
];

function Stars({ count }) {
  return (
    <div style={{ color: "#f59e0b", marginTop: "0.5rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} style={{ marginRight: "2px" }} />
      ))}
    </div>
  );
}

export default function Credentials() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <span className="jw-badge jw-badge-brand mb-3" style={{ display: "inline-block" }}>
            Qualifications &amp; Experience
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Who You're<br />
            <span style={{ color: "var(--action)" }}>Working With</span>
          </h1>
          <p style={{ maxWidth: "580px", margin: "0 auto 2rem", fontSize: "1.05rem" }}>
            James Wallace — specialist educator with QTS, postgraduate-level study, and direct
            experience working inside Local Authority commissioning teams alongside complex and
            vulnerable young people.
          </p>

          {/* Stats row */}
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {[
              { label: "QTS", sub: "Qualified Teacher" },
              { label: "BEd L7", sub: "Postgraduate" },
              { label: "PGCE", sub: "Secondary" },
              { label: "DBS", sub: "Enhanced — Updated" },
            ].map((s) => (
              <div
                key={s.label}
                className="jw-card text-center"
                style={{ minWidth: "110px", padding: "1rem 1.25rem" }}
              >
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--action)" }}>{s.label}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div
                className="jw-card"
                style={{ borderLeft: "4px solid var(--action)", paddingLeft: "1.75rem" }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "var(--action)", fontSize: "1.5rem", marginBottom: "0.75rem" }} />
                <p style={{ fontSize: "1.05rem", fontStyle: "italic", marginBottom: "0.75rem" }}>
                  "I am a gifted and reflective educator who is wholly committed to supporting young
                  people with additional needs. I bring specialist knowledge, genuine warmth, and
                  rigorous professional standards to every placement I take on."
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>— James Wallace, BEd (Level 7), PGCE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Qualifications */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faGraduationCap} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
            <h2>Academic Qualifications</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {academicQuals.map((q, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{q.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.5rem" }}>{q.institution}</p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>{q.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPD & Specialist Certifications */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faCertificate} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
            <h2>CPD &amp; Specialist Certifications</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              Ongoing professional development focused on the specific needs of the young people I work with.
            </p>
          </div>
          <div className="row g-4">
            {cpdCerts.map((c, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{c.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.5rem" }}>{c.provider}</p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faBriefcase} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
            <h2>Professional Experience</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {experience.map((e, i) => (
              <div key={i} className="col-12 col-lg-10">
                <div className="jw-card">
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem", color: "var(--text-primary)" }}>{e.role}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.5rem" }}>{e.org}</p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>Why This Matters</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              For families and LAs choosing specialist provision, this is what you're getting.
            </p>
          </div>
          <div className="row g-4">
            {whyItMatters.map((w, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100 text-center">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", fontSize: "1.5rem", marginBottom: "0.75rem" }} />
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{w.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional References */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>Professional References</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              Full references available on request. These are representative testimonials.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {references.map((r, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100" style={{ borderLeft: "3px solid var(--action)" }}>
                  <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "var(--action)", marginBottom: "0.75rem" }} />
                  <p style={{ fontSize: "0.9375rem", fontStyle: "italic", marginBottom: "0.75rem" }}>"{r.quote}"</p>
                  <Stars count={r.stars} />
                  <p style={{ margin: "0.5rem 0 0", fontWeight: 600, fontSize: "0.875rem" }}>{r.name}</p>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DBS */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="jw-card d-flex align-items-start gap-3">
                <FontAwesomeIcon icon={faShieldAlt} style={{ color: "var(--action)", fontSize: "1.75rem", flexShrink: 0, marginTop: "3px" }} />
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.35rem" }}>Enhanced DBS Certificate</h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Enhanced DBS registered with the Update Service — checked annually and verifiable on request.
                    All placements are covered by safeguarding policies aligned to KCSIE. Documentation available for LA procurement teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2 style={{ marginBottom: "0.75rem" }}>Ready to get started?</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem", color: "var(--text-muted)" }}>
            Book a free 20-minute call to discuss your child's needs or a potential placement.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/calendly" className="jw-btn-primary">Book Free Call</Link>
            <Link to="/contact" className="jw-btn-secondary">Ask a Question</Link>
          </div>
        </div>
      </section>
    </>
  );
}
