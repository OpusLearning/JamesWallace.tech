import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faClipboardCheck,
  faCalendarAlt,
  faChartLine,
  faHandshake,
  faCheckCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    icon: faCalendarAlt,
    title: "Structured Allocation",
    desc: "We match students to you based on your expertise and availability. No cold calling, no chasing parents  -  students come to you.",
  },
  {
    icon: faClipboardCheck,
    title: "Compliance Handled",
    desc: "Safeguarding policies, DBS checks, reporting templates, and PLPs are all managed through the platform. Less admin, more teaching.",
  },
  {
    icon: faChartLine,
    title: "Daily & Weekly Planning Tools",
    desc: "Built-in session planning, daily reporting, and progress tracking  -  so your work is evidenced without the paperwork burden.",
  },
  {
    icon: faHandshake,
    title: "LA Contract Work",
    desc: "Access Local Authority-referred young people  -  often complex needs, but well-supported. Consistent, contracted hours rather than one-off sessions.",
  },
  {
    icon: faUserGraduate,
    title: "Specialist Community",
    desc: "Join a network of specialist practitioners. Peer support, CPD opportunities, and shared resources  -  not just a job list.",
  },
  {
    icon: faChartLine,
    title: "Fair Pay, On Time",
    desc: "Competitive rates for specialist work. Payments processed promptly  -  no chasing invoices.",
  },
];

const whoWeWant = [
  "Specialist experience with SEND, SEMH, ADHD, autism, or dyslexia",
  "Enhanced DBS (on the update service preferred)",
  "Experience with LA-referred or alternative provision students",
  "Ability to write PLPs and session reports",
  "Commitment to safeguarding and professional standards",
  "A genuine interest in working with complex or disengaged young people",
];

const steps = [
  { step: "1", title: "Express Interest", desc: "Fill in the short form below. We'll review your background and get back to you within 3 working days." },
  { step: "2", title: "Introductory Call", desc: "A 20-minute conversation to understand your experience, availability, and the kinds of students you work best with." },
  { step: "3", title: "Onboarding", desc: "DBS check (or update service confirmation), safeguarding induction, and portal access set up." },
  { step: "4", title: "First Allocation", desc: "We'll match you with a suitable student and brief you fully before the first session." },
];

export default function JoinAsTutor() {
  const [form, setForm] = useState({ name: "", email: "", experience: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Tutor Application – ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nExperience summary:\n${form.experience}\n\nAnything else:\n${form.message}`
    );
    window.location.href = `mailto:hello@jameswallace.tech?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <span className="jw-badge jw-badge-brand mb-3" style={{ display: "inline-block" }}>
            Join the Network
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Specialist Tutors  - <br />
            <span style={{ color: "var(--action)" }}>We Want to Work With You</span>
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem", fontSize: "1.05rem" }}>
            We're building a network of specialist tutors to support Local Authority-referred
            young people. If you have experience with complex needs and want consistent,
            meaningful work  -  read on.
          </p>
          <a href="#apply" className="jw-btn-primary">Express Interest ↓</a>
        </div>
      </section>

      {/* What you get */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>What You Get</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              We built the platform to make specialist tutoring sustainable  -  for the young people and for you.
            </p>
          </div>
          <div className="row g-4">
            {benefits.map((b, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="jw-card h-100">
                  <div className="mb-3" style={{ color: "var(--brand)" }}>
                    <FontAwesomeIcon icon={b.icon} size="2x" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.9375rem" }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-5">
              <h2>Who We're Looking For</h2>
              <p>
                We're not looking for generalist tutors. The young people we support have often
                had difficult experiences with education. They need practitioners who understand
                them  -  not people reading from a textbook.
              </p>
              <p style={{ marginBottom: 0 }}>
                If you have real experience with complex needs and a genuine commitment to this
                kind of work, we want to hear from you.
              </p>
            </div>
            <div className="col-12 col-lg-7">
              <div className="jw-card">
                <ul className="list-unstyled mb-0">
                  {whoWeWant.map((item, i) => (
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

      {/* How it works */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>How It Works</h2>
          </div>
          <div className="row g-4">
            {steps.map((s, i) => (
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

      {/* Application form */}
      <section id="apply" className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <div className="jw-card">
                <div className="text-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
                  <h2 style={{ fontSize: "1.35rem" }}>Express Your Interest</h2>
                  <p style={{ margin: 0 }}>No commitment  -  just a starting point for a conversation.</p>
                </div>

                {submitted ? (
                  <div className="text-center py-3">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", fontSize: "2rem", marginBottom: "0.75rem" }} />
                    <p style={{ margin: 0 }}>Thanks  -  your email client should have opened. We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Your Name *</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        className="form-control" placeholder="Jane Smith"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email Address *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        className="form-control" placeholder="jane@example.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Brief experience summary *</label>
                      <textarea
                        name="experience" required rows={4} value={form.experience} onChange={handleChange}
                        className="form-control" style={{ resize: "vertical" }}
                        placeholder="e.g. 5 years working with SEMH students in AP settings, specialist in autism and PDA profiles..."
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Anything else you'd like to add</label>
                      <textarea
                        name="message" rows={3} value={form.message} onChange={handleChange}
                        className="form-control" style={{ resize: "vertical" }}
                        placeholder="Availability, subjects, DBS status, questions..."
                      />
                    </div>
                    <button type="submit" className="jw-btn-primary w-100" style={{ border: "none", cursor: "pointer" }}>
                      Send Expression of Interest
                    </button>
                    <p className="text-center mt-3" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      This opens your email client pre-filled. Your data is not stored by this form.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
