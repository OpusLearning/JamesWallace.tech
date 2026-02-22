import { Link } from "react-router-dom";
import {
  FaBrain,
  FaChalkboardTeacher,
  FaChild,
  FaGraduationCap,
  FaHandsHelping,
  FaLaptopCode,
  FaCogs,
  FaRocket,
} from "react-icons/fa";
import tutorImage from "../assets/tutor.webp";
import specialistHero from "../assets/specialist.webp";

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
            <div className="col-12 col-lg-6">
              <img
                src={specialistHero}
                alt="Calm tutoring environment with student at a laptop"
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
              <h1>Calm, Structured, Confident Learning</h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                Specialist tutoring for{" "}
                <strong>neurodiverse learners</strong>  -  ADHD, Autism and
                Dyslexia. GCSE &amp; A-Level{" "}
                <strong>Computer Science</strong> and{" "}
                <strong>KS2–KS3 Maths</strong>, taught with clarity and care.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3 mb-4">
                {[
                  "BSc Computing",
                  "MEd",
                  "QTS",
                  "Enhanced DBS",
                  "ASD Awareness",
                ].map((t) => (
                  <span key={t} className="jw-badge">
                    {t}
                  </span>
                ))}
              </div>
              <p>
                Parents get clear communication and practical strategies that
                work at home. Students feel seen, supported, and capable  -  and
                the grades follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portrait + bio */}
      <section className="jw-section jw-section-white">
        <div
          className="jw-container text-center"
          style={{ maxWidth: "680px" }}
        >
          <img
            src={tutorImage}
            alt="James Wallace  -  Specialist Tutor"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid var(--border)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              marginBottom: "1.5rem",
            }}
          />
          <h2>James Wallace</h2>
          <p>
            I've spent years working alongside neurodiverse learners and their
            families. My approach combines evidence-based teaching strategies
            with genuine empathy  -  creating a calm, predictable space where
            students can build real confidence and lasting skills.
          </p>
          <p>
            Whether it's untangling a tricky algorithm, building number fluency,
            or simply finding a homework routine that doesn't cause meltdowns, I
            work with you and your child to find what actually works.
          </p>
        </div>
      </section>

      {/* Teaching Focus */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-5">My Teaching Focus</h2>
          <div className="row">
            <FocusCard
              icon={<FaLaptopCode size={36} />}
              title="Computer Science (GCSE & A-Level)"
              description="Python, algorithms, logic, and NEA mentoring  -  clear, step-by-step teaching that builds mastery."
            />
            <FocusCard
              icon={<FaChalkboardTeacher size={36} />}
              title="Maths (KS2–KS3)"
              description="Concrete → visual → abstract progression for secure number facts and method fluency."
            />
            <FocusCard
              icon={<FaBrain size={36} />}
              title="ADHD & ASD Support"
              description="Short focus blocks, visual cues, and routine  -  supporting attention and working memory."
            />
            <FocusCard
              icon={<FaChild size={36} />}
              title="Individualised Learning"
              description="Teaching adapted to each learner's pace, interests, and goals  -  with simple, actionable next steps."
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-5">Core Values</h2>
          <div className="row">
            <FocusCard
              icon={<FaHandsHelping size={36} />}
              title="Empathy & Partnership"
              description="Regular parent updates; alignment with school targets and EHCP where relevant."
            />
            <FocusCard
              icon={<FaGraduationCap size={36} />}
              title="Evidence-Based Practice"
              description="Grounded in cognitive science and proven SEN strategies that actually stick."
            />
            <FocusCard
              icon={<FaCogs size={36} />}
              title="Structure & Clarity"
              description="Predictable lesson flow and visual frameworks to reduce overwhelm."
            />
            <FocusCard
              icon={<FaRocket size={36} />}
              title="Growth & Confidence"
              description="Small wins compound into momentum; students learn to trust their process."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Start the conversation</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            Book a free 20-minute call to talk through how I can support your
            child.
          </p>
          <Link to="/calendly" className="jw-btn-primary">
            Book Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
