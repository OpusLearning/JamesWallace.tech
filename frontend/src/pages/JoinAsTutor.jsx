import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faClipboardCheck,
  faCalendarAlt,
  faChartLine,
  faHandshake,
  faCheckCircle,
  faEnvelope,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const card = {
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  borderRadius: "0.5rem",
  border: "1px solid rgba(255,255,255,0.08)",
};

const accent = "#00ffe5";

const benefits = [
  {
    icon: faCalendarAlt,
    title: "Structured Allocation",
    desc: "We match students to you based on your expertise and availability. No cold calling, no chasing parents — students come to you.",
  },
  {
    icon: faClipboardCheck,
    title: "Compliance Handled",
    desc: "Safeguarding policies, DBS checks, reporting templates, and PLPs are all managed through the platform. Less admin, more teaching.",
  },
  {
    icon: faChartLine,
    title: "Daily & Weekly Planning Tools",
    desc: "Built-in session planning, daily reporting, and progress tracking — so your work is evidenced without the paperwork burden.",
  },
  {
    icon: faHandshake,
    title: "LA Contract Work",
    desc: "Access Local Authority-referred young people — often complex needs, but well-supported. Consistent, contracted hours rather than one-off sessions.",
  },
  {
    icon: faUserGraduate,
    title: "Specialist Community",
    desc: "Join a network of specialist practitioners. Peer support, CPD opportunities, and shared resources — not just a job list.",
  },
  {
    icon: faChartLine,
    title: "Fair Pay, On Time",
    desc: "Competitive rates for specialist work. Payments processed promptly — no chasing invoices.",
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

export default function JoinAsTutor() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", experience: "", message: "" });

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
          JOIN THE NETWORK
        </span>
        <h1 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Specialist Tutors —<br />
          <span style={{ color: accent }}>We Want to Work With You</span>
        </h1>
        <p
          className="mx-auto mb-4"
          style={{ color: "rgba(255,255,255,0.7)", maxWidth: "640px", fontSize: "1.1rem", lineHeight: 1.75 }}
        >
          We're building a network of specialist tutors to support Local Authority-referred young people.
          If you have experience with complex needs and want consistent, meaningful work — read on.
        </p>
        <a
          href="#apply"
          className="btn fw-semibold px-4 py-2"
          style={{ background: accent, color: "#0d1b2a", borderRadius: "8px" }}
        >
          Express Interest <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </a>
      </section>

      {/* What you get */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#fff" }}>What You Get</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            We built the platform to make specialist tutoring sustainable — for the young people and for you.
          </p>
        </div>
        <div className="row g-4">
          {benefits.map((b, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="h-100 p-4" style={card}>
                <FontAwesomeIcon icon={b.icon} style={{ color: accent, fontSize: "1.5rem", marginBottom: "0.75rem" }} />
                <h3 className="h5 fw-bold mb-2" style={{ color: "#fff" }}>{b.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="mb-5">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-lg-5">
            <h2 className="fw-bold mb-3" style={{ color: "#fff" }}>Who We're Looking For</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
              We're not looking for generalist tutors. The young people we support have often had difficult
              experiences with education. They need practitioners who understand them — not people reading
              from a textbook.
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
              If you have real experience with complex needs and a genuine commitment to this kind of work,
              we want to hear from you.
            </p>
          </div>
          <div className="col-12 col-lg-7">
            <div className="p-4" style={card}>
              <ul className="list-unstyled mb-0">
                {whoWeWant.map((item, i) => (
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
          <h2 className="fw-bold" style={{ color: "#fff" }}>How It Works</h2>
        </div>
        <div className="row g-4">
          {[
            { step: "1", title: "Express Interest", desc: "Fill in the short form below. We'll review your background and get back to you within 3 working days." },
            { step: "2", title: "Introductory Call", desc: "A 20-minute conversation to understand your experience, availability, and what kinds of students you work best with." },
            { step: "3", title: "Onboarding", desc: "DBS check (or update service confirmation), safeguarding induction, and portal access set up." },
            { step: "4", title: "First Allocation", desc: "We'll match you with a suitable student and brief you fully before the first session." },
          ].map((s, i) => (
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
                  {s.step}
                </div>
                <h3 className="h5 fw-bold mb-2" style={{ color: "#fff" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="p-4 p-md-5" style={{ ...card, borderColor: "rgba(0,255,229,0.2)" }}>
              <div className="text-center mb-4">
                <FontAwesomeIcon icon={faEnvelope} style={{ color: accent, fontSize: "2rem", marginBottom: "0.75rem" }} />
                <h2 className="fw-bold" style={{ color: "#fff" }}>Express Your Interest</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>
                  No commitment — just a starting point for a conversation.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-3">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: accent, fontSize: "2.5rem", marginBottom: "1rem" }} />
                  <p style={{ color: "#fff", fontSize: "1.1rem" }}>Thanks — your email client should have opened. We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                      Brief experience summary *
                    </label>
                    <textarea
                      name="experience"
                      required
                      rows={4}
                      value={form.experience}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        borderRadius: "8px",
                        resize: "vertical",
                      }}
                      placeholder="e.g. 5 years working with SEMH students in AP settings, specialist in autism and PDA profiles..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                      Anything else you'd like to add
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        borderRadius: "8px",
                        resize: "vertical",
                      }}
                      placeholder="Availability, subjects, DBS status, questions..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 fw-semibold py-2"
                    style={{ background: accent, color: "#0d1b2a", borderRadius: "8px", fontSize: "1rem" }}
                  >
                    Send Expression of Interest
                  </button>
                  <p className="text-center mt-3" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                    This opens your email client pre-filled. Your data is not stored by this form.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
