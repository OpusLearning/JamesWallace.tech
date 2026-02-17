import { Link } from "react-router-dom";
import {
  FaBrain,
  FaLaptopCode,
  FaCalculator,
  FaChalkboardTeacher,
  FaHandsHelping,
} from "react-icons/fa";
import servicesHero from "../assets/services_hero.png";

function ServiceCard({ icon, title, points }) {
  return (
    <div className="jw-card h-100 d-flex flex-column">
      <div className="d-flex align-items-center mb-3">
        <span style={{ color: "var(--brand)", marginRight: "0.75rem" }}>
          {icon}
        </span>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>
          {title}
        </h3>
      </div>
      <ul
        style={{
          paddingLeft: "1.25rem",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        {points.map((p, i) => (
          <li key={i} className="mb-1">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <img
                src={servicesHero}
                alt="Calm study desk with laptop and maths notes"
                style={{
                  width: "100%",
                  maxHeight: "420px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <h1>Subjects &amp; Specialist Services</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                Specialist tutoring for{" "}
                <strong>neurodiverse learners</strong> — ADHD, Autism and
                Dyslexia. Calm, predictable, confidence-building sessions.
              </p>
              <p>
                Subjects: <strong>GCSE &amp; A-Level Computer Science</strong>{" "}
                and <strong>Maths (KS2–KS3)</strong>. Methods are{" "}
                <em>structured, visual, and supportive</em> — reducing cognitive
                load while building lasting understanding and self-belief.
              </p>
              <div className="mt-4 d-flex flex-wrap gap-3">
                <Link to="/pricing" className="jw-btn-secondary">
                  See Pricing
                </Link>
                <Link to="/calendly" className="jw-btn-primary">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col d-flex">
              <ServiceCard
                icon={<FaBrain size={28} />}
                title="ADHD & ASD-Friendly Learning"
                points={[
                  "Short focus blocks and gentle transitions.",
                  "Predictable routines with visual schedules.",
                  "Worked examples to reduce cognitive load.",
                  "Dyslexia-aware materials (spacing, fonts, overlays).",
                ]}
              />
            </div>
            <div className="col d-flex">
              <ServiceCard
                icon={<FaLaptopCode size={28} />}
                title="Computer Science (GCSE & A-Level)"
                points={[
                  "Python, algorithms, logic, pseudocode/VB as needed.",
                  "NEA mentoring: planning, documentation, testing.",
                  "Step-by-step teaching that removes jargon.",
                  "Exam boards: OCR, AQA, Edexcel.",
                ]}
              />
            </div>
            <div className="col d-flex">
              <ServiceCard
                icon={<FaCalculator size={28} />}
                title="Maths (KS2–KS3)"
                points={[
                  "Secure number facts, fractions, ratio, algebra foundations.",
                  "Concrete → visual → abstract progression.",
                  "Scaffolded problem-solving and method fluency.",
                  "Dyscalculia-aware strategies (colour, pattern, repetition).",
                ]}
              />
            </div>
            <div className="col d-flex">
              <ServiceCard
                icon={<FaChalkboardTeacher size={28} />}
                title="Study Skills & Executive Function"
                points={[
                  "Time-management and task planning that sticks.",
                  "Revision systems: retrieval, spacing, cue cards.",
                  "Working-memory strategies and exam timing practice.",
                  "Weekly micro-goals to build momentum and confidence.",
                ]}
              />
            </div>
            <div className="col d-flex">
              <ServiceCard
                icon={<FaHandsHelping size={28} />}
                title="Parent Partnership & School Alignment"
                points={[
                  "Regular feedback and simple progress tracking.",
                  "Align with school targets and EHCP where applicable.",
                  "Clear expectations and shared strategies for home.",
                  "Flexible online or Derbyshire-based sessions.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
