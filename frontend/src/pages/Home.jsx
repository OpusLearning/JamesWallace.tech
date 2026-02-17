import { Link } from "react-router-dom";
import {
  FaBrain,
  FaLaptopCode,
  FaCalculator,
  FaHandsHelping,
  FaChalkboardTeacher,
} from "react-icons/fa";
import heroImage from "../assets/home.webp";
import tutorImage from "../assets/tutor.webp";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
      <div className="jw-card d-flex flex-column w-100">
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
        <p style={{ margin: 0, fontSize: "0.9rem" }}>{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <div className="jw-status-pill">Accepting new clients</div>
              <h1>Calm, Structured, Confident Learning</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                Specialist one-to-one tuition for{" "}
                <strong>neurodiverse learners</strong> — supporting{" "}
                <strong>ADHD, Autism, and Dyslexia</strong> with evidence-based
                teaching. GCSE &amp; A-Level{" "}
                <strong>Computer Science</strong> and{" "}
                <strong>KS2–KS4 Maths</strong> taught with clarity and care.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/calendly" className="jw-btn-primary">
                  Book a Free Consultation
                </Link>
                <Link to="/services" className="jw-btn-secondary">
                  Explore Subjects
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-6 text-center">
              <img
                src={heroImage}
                alt="Calm learning environment"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-2">How I Help Students Thrive</h2>
          <p
            className="text-center"
            style={{ maxWidth: "540px", margin: "0 auto 3rem" }}
          >
            Every session is structured, calm, and tailored to the way your
            child actually learns.
          </p>
          <div className="row">
            <FeatureCard
              icon={<FaLaptopCode size={32} />}
              title="Computer Science Mastery"
              description="Step-by-step teaching of algorithms, logic, and Python projects for GCSE & A-Level success."
            />
            <FeatureCard
              icon={<FaCalculator size={32} />}
              title="Maths Confidence"
              description="Visual and structured learning that builds fluency, problem-solving, and lasting understanding."
            />
            <FeatureCard
              icon={<FaBrain size={32} />}
              title="ADHD & ASD-Friendly Learning"
              description="Low-pressure sessions using focus blocks, visual cues, and repetition to support memory and focus."
            />
            <FeatureCard
              icon={<FaChalkboardTeacher size={32} />}
              title="Exam Technique & Study Skills"
              description="Predictable routines, scaffolding, and active recall strategies for confident performance."
            />
            <FeatureCard
              icon={<FaHandsHelping size={32} />}
              title="Parent Partnership"
              description="Regular communication, progress tracking, and shared goals to reinforce success at home."
            />
          </div>
        </div>
      </section>

      {/* About / tutor strip */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-3 text-center">
              <img
                src={tutorImage}
                alt="James Wallace — Specialist Tutor"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--border)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              />
            </div>
            <div className="col-12 col-md-9">
              <h2 style={{ marginBottom: "0.75rem" }}>About James</h2>
              <p>
                I'm a specialist tutor with a BSc in Computing, MEd, QTS, and
                Enhanced DBS. I work exclusively with neurodiverse learners —
                supporting ADHD, Autism, and Dyslexia through calm, structured,
                evidence-based sessions that build real confidence.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {[
                  "BSc Computing",
                  "MEd",
                  "QTS",
                  "Enhanced DBS",
                  "ASD Awareness",
                ].map((badge) => (
                  <span key={badge} className="jw-badge">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/about" className="jw-btn-secondary">
                  Read More
                </Link>
                <a
                  href="https://audit.jameswallace.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jw-btn-secondary"
                >
                  ND Audit Tool ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Ready to get started?</h2>
          <p style={{ maxWidth: "500px", margin: "0 auto 2rem" }}>
            Book a free 20-minute consultation call. We'll talk through your
            child's needs and map out a clear plan — no obligation.
          </p>
          <Link
            to="/calendly"
            className="jw-btn-primary"
            style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
          >
            Book Free Call
          </Link>
        </div>
      </section>
    </>
  );
}
