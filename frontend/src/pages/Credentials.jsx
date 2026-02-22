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
    title: "BSc (Hons) Computer Science",
    institution: "Manchester Metropolitan University",
    awarded: null,
    detail: "Undergraduate degree in Computer Science, providing the technical foundation underpinning specialist ICT and digital literacy teaching.",
    modules: null,
  },
  {
    title: "PGCE: Secondary Education (Vocational: Applied ICT)",
    institution: "University of Derby",
    awarded: "July 2004",
    detail: "Postgraduate Certificate in Education with Qualified Teacher Status (QTS). Secondary specialist in applied and vocational ICT.",
    modules: null,
  },
  {
    title: "Master of Education (MEd)",
    institution: "The Open University",
    awarded: "31 December 2012",
    detail: "Level 7 postgraduate qualification, distance learning. 180 credits across three modules, all passed.",
    modules: [
      "Educational enquiry (E891)",
      "Researching inclusive education (E848)",
      "Educational leadership (E856)",
    ],
  },
];

const cpdCerts = [
  {
    title: "Understanding Autism",
    provider: "The Open University / OpenLearn",
    issued: "17 June 2025",
    detail: "24 CPD hours. Badge quiz scores: 93% and 95%. Accredited by the CPD Standards Office.",
    desc: "8-week course covering autism spectrum conditions, diagnosis, communication, sensory differences, intervention approaches, and neurodiversity perspectives.",
    badge: "/understanding-autism-badge.png",
  },
  {
    title: "Language and Communication in Autism",
    provider: "Clearly Education",
    issued: "12 June 2025",
    detail: "CPD Certified, The CPD Certification Service. 1 CPD hour.",
    desc: "Specialist focus on language development and communication strategies for autistic learners in educational settings.",
    badge: null,
  },
  {
    title: "Sensory Processing Aware with GriffinOT, Level 1",
    provider: "GriffinOT (Kim Griffin, Occupational Therapist)",
    issued: "13 June 2025",
    detail: "Introduction to the eight senses and sensory processing, foundation for Levels 2 and 3.",
    desc: "Practical frameworks for identifying and supporting sensory processing differences in young people.",
    badge: null,
  },
  {
    title: "Software Development Bootcamp: JavaScript",
    provider: "Northcoders",
    issued: "14 July 2024",
    detail: "Full-stack JavaScript bootcamp, certified completion.",
    desc: "Full-stack JavaScript development. Informs direct use of technology tools and platform development in specialist tutoring work.",
    badge: null,
  },
];

const experience = [
  {
    role: "Specialist SEMH Teacher",
    org: "Foxwood Academy, Nottinghamshire",
    dates: "Jan 2006 to Oct 2018",
    desc: "12 years delivering specialist teaching for young people with Social, Emotional and Mental Health needs. Developed inclusive curricula, wrote and implemented PLPs, and collaborated closely with SENCOs, educational psychologists, and family teams.",
  },
  {
    role: "Public Health Support Officer",
    org: "Nottinghamshire County Council, Children's and Young People's Commissioning Hub",
    dates: "Oct 2018 to Apr 2024",
    desc: "Supported commissioning and quality assurance for LAC and complex-needs young people. Involved in Care, Education and Treatment Reviews (CETRs), SEND panel processes, safeguarding reviews, and public health initiatives including Small Steps, Healthy Families, and Community Paediatric Reviews.",
  },
  {
    role: "Specialist Tutor (Independent)",
    org: "James Wallace Education",
    dates: "Mar 2025 to present",
    desc: "1:1 specialist tutoring for neurodiverse young people (ADHD, ASD, dyslexia, PDA profiles). Online and in-person delivery. Clients include LA-referred young people and privately commissioned families.",
  },
];

const whyItMatters = [
  {
    title: "Specialist, not generalist",
    desc: "QTS, MEd, and 13+ years specialist SEND experience. Not a gap-year graduate or mainstream supply teacher.",
  },
  {
    title: "LA-fluent",
    desc: "Direct experience inside a Local Authority commissioning team. I understand the process, the paperwork, and what panels need to see.",
  },
  {
    title: "Safeguarding built in",
    desc: "Enhanced DBS on the Update Service, KCSIE-aware, trained in safeguarding procedures. Every session logged, every concern documented.",
  },
  {
    title: "Evidence-led",
    desc: "PLPs, daily reports, termly reviews: not box-ticking but genuine planning and communication tools.",
  },
];

const references = [
  {
    quote: "James is a gifted and effective teacher. He has a high degree of professionalism and is wholly committed to supporting young people to develop their skills and interests in order to reach their potential.",
    name: "Chris Humphreys",
    role: "Previous Manager, Foxwood Academy",
    ratings: { timekeeping: 5, flexibility: 4, honesty: 5, safeguarding: 5, communication: 5 },
  },
  {
    quote: "James brings a wealth of qualities that make him highly effective in working with children and young people. His patience, empathy, and dedication to fostering both academic and personal growth allowed him to build strong relationships with students, families, and colleagues.",
    name: "James Sinclair",
    role: "Public Health Analyst, Nottinghamshire County Council",
    ratings: { timekeeping: 5, flexibility: 5, honesty: 5, safeguarding: 5, communication: 5 },
  },
];

function Stars({ count }) {
  return (
    <div style={{ color: "#f59e0b", display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ opacity: i < count ? 1 : 0.2 }}
        />
      ))}
    </div>
  );
}

function RatingRow({ label, score }) {
  return (
    <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", minWidth: "100px" }}>{label}</span>
      <Stars count={score} />
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
            James Wallace, specialist educator with QTS, a Master of Education, and direct
            experience working inside Local Authority commissioning teams alongside complex and
            vulnerable young people.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {[
              { label: "MEd", sub: "Master of Education" },
              { label: "BSc", sub: "Computer Science" },
              { label: "PGCE", sub: "Qualified Teacher" },
              { label: "DBS", sub: "Enhanced, Updated" },
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
                  "I am a specialist educator with genuine commitment to the young people I work with,
                  bringing deep knowledge of SEND, SEMH, and neurodiverse learners together with
                  the professional rigour that LA placements require."
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>James Wallace, MEd, BSc, PGCE</p>
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
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="jw-card h-100">
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{q.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.25rem" }}>{q.institution}</p>
                  {q.awarded && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Awarded {q.awarded}</p>
                  )}
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: q.modules ? "0.75rem" : 0 }}>{q.detail}</p>
                  {q.modules && (
                    <ul className="list-unstyled mb-0" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {q.modules.map((m, j) => (
                        <li key={j} className="d-flex align-items-start gap-2 mb-1">
                          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", marginTop: "2px", flexShrink: 0, fontSize: "0.7rem" }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPD */}
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
                <div className="jw-card h-100 d-flex gap-3">
                  {c.badge && (
                    <img
                      src={c.badge}
                      alt={`${c.title} badge`}
                      style={{ width: "72px", height: "72px", objectFit: "contain", flexShrink: 0 }}
                    />
                  )}
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{c.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.2rem" }}>{c.provider}</p>
                    {c.issued && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>Completed {c.issued}</p>
                    )}
                    {c.detail && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontStyle: "italic" }}>{c.detail}</p>
                    )}
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>{c.desc}</p>
                  </div>
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
                  <div className="d-flex flex-wrap align-items-start justify-content-between gap-2 mb-1">
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>{e.role}</h3>
                    <span className="jw-badge" style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>{e.dates}</span>
                  </div>
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

      {/* References */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>Professional References</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              Verified references from previous employers. Full documentation available on request.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {references.map((r, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100" style={{ borderLeft: "3px solid var(--action)" }}>
                  <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "var(--action)", marginBottom: "0.75rem" }} />
                  <p style={{ fontSize: "0.9375rem", fontStyle: "italic", marginBottom: "1rem" }}>"{r.quote}"</p>
                  <p style={{ margin: "0 0 0.25rem", fontWeight: 600, fontSize: "0.875rem" }}>{r.name}</p>
                  <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>{r.role}</p>
                  <RatingRow label="Time keeping" score={r.ratings.timekeeping} />
                  <RatingRow label="Flexibility" score={r.ratings.flexibility} />
                  <RatingRow label="Honesty &amp; integrity" score={r.ratings.honesty} />
                  <RatingRow label="Safeguarding" score={r.ratings.safeguarding} />
                  <RatingRow label="Communication" score={r.ratings.communication} />
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
                    Enhanced DBS registered with the Update Service, checked annually and verifiable on request.
                    All placements are covered by safeguarding policies aligned to KCSIE. Documentation packages
                    available for LA procurement teams.
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
