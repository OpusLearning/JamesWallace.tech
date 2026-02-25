import { useState } from "react";

function LAForm() {
  const [formData, setFormData] = useState({
    organisation: "",
    contactName: "",
    email: "",
    phone: "",
    learnerAgeRange: "",
    currentProvision: "",
    indicativeHours: "",
    ehcp: "",
    preferredStart: "",
    notes: "",
  });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, subject: "LA / School Referral Enquiry" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { success } = await res.json();
      if (success) {
        setStatus("sent");
        setFormData({
          organisation: "",
          contactName: "",
          email: "",
          phone: "",
          learnerAgeRange: "",
          currentProvision: "",
          indicativeHours: "",
          ehcp: "",
          preferredStart: "",
          notes: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="jw-card text-center"
        style={{ maxWidth: "540px", margin: "0 auto", padding: "2.5rem" }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "var(--brand)",
          }}
        >
          &#10003;
        </div>
        <h3>Referral received</h3>
        <p>
          Thank you. We aim to respond to all referral enquiries within 2
          working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="jw-card mx-auto" style={{ maxWidth: "640px" }}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Organisation *</label>
          <input
            name="organisation"
            className="form-control"
            value={formData.organisation}
            onChange={handleChange}
            required
            placeholder="LA / School / Agency"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Contact name *</label>
          <input
            name="contactName"
            className="form-control"
            value={formData.contactName}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Email *</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@la.gov.uk"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Phone</label>
          <input
            name="phone"
            type="tel"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Learner age range *</label>
          <input
            name="learnerAgeRange"
            className="form-control"
            value={formData.learnerAgeRange}
            onChange={handleChange}
            required
            placeholder="e.g. 14-16"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">
            Indicative hours / week
          </label>
          <input
            name="indicativeHours"
            className="form-control"
            value={formData.indicativeHours}
            onChange={handleChange}
            placeholder="e.g. 10 hours"
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Current provision</label>
          <input
            name="currentProvision"
            className="form-control"
            value={formData.currentProvision}
            onChange={handleChange}
            placeholder="e.g. No current provision / Part-time AP"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">EHCP in place?</label>
          <select
            name="ehcp"
            className="form-control"
            value={formData.ehcp}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="in-progress">In progress</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Preferred start</label>
          <input
            name="preferredStart"
            type="date"
            className="form-control"
            value={formData.preferredStart}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Additional notes</label>
          <textarea
            name="notes"
            className="form-control"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any relevant context about the learner's needs, existing provision, or specific requirements."
          />
        </div>
        <div className="col-12">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <button
              type="submit"
              className="jw-btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Submit Referral"}
            </button>
            {status === "error" && (
              <small style={{ color: "#dc2626" }}>
                Something went wrong. Please try again or email directly.
              </small>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

function ParentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: "",
    needsDescription: "",
    howHeard: "",
  });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, subject: "Parent / Carer Enquiry" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { success } = await res.json();
      if (success) {
        setStatus("sent");
        setFormData({
          name: "",
          email: "",
          phone: "",
          childAge: "",
          needsDescription: "",
          howHeard: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="jw-card text-center"
        style={{ maxWidth: "540px", margin: "0 auto", padding: "2.5rem" }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "var(--brand)",
          }}
        >
          &#10003;
        </div>
        <h3>Enquiry received</h3>
        <p>Thank you. We'll be in touch as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="jw-card mx-auto" style={{ maxWidth: "640px" }}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Your name *</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Parent / carer name"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Email *</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Phone</label>
          <input
            name="phone"
            type="tel"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">Child's age *</label>
          <input
            name="childAge"
            className="form-control"
            value={formData.childAge}
            onChange={handleChange}
            required
            placeholder="e.g. 13"
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">
            Brief description of needs *
          </label>
          <textarea
            name="needsDescription"
            className="form-control"
            rows={4}
            value={formData.needsDescription}
            onChange={handleChange}
            required
            placeholder="Tell us a bit about your child and what support you're looking for."
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">
            How did you hear about us?
          </label>
          <input
            name="howHeard"
            className="form-control"
            value={formData.howHeard}
            onChange={handleChange}
            placeholder="e.g. Google, referral, social media"
          />
        </div>
        <div className="col-12">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <button
              type="submit"
              className="jw-btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Enquiry"}
            </button>
            {status === "error" && (
              <small style={{ color: "#dc2626" }}>
                Something went wrong. Please try again.
              </small>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState("la");

  return (
    <section className="jw-section jw-section-warm">
      <div className="jw-container">
        <div className="text-center mb-5">
          <h1>Get in Touch</h1>
          <p style={{ maxWidth: "520px", margin: "0 auto" }}>
            We work with Local Authority SEND teams, EOTAS coordinators, EHCP
            caseworkers, and families of neurodiverse learners.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="d-flex justify-content-center mb-5"
          style={{ gap: "0.5rem" }}
        >
          <button
            onClick={() => setActiveTab("la")}
            className={activeTab === "la" ? "jw-btn-primary" : "jw-btn-secondary"}
            style={{ borderRadius: "6px" }}
          >
            LA / School Referral
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={
              activeTab === "parent" ? "jw-btn-primary" : "jw-btn-secondary"
            }
            style={{ borderRadius: "6px" }}
          >
            Parent / Carer Enquiry
          </button>
        </div>

        {activeTab === "la" ? (
          <>
            <div className="text-center mb-4">
              <h2 style={{ fontSize: "1.4rem" }}>LA / School Referral</h2>
              <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                We aim to respond to all referral enquiries within 2 working
                days and begin placement assessments within 5 working days of
                receiving a commission.
              </p>
            </div>
            <LAForm />
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <h2 style={{ fontSize: "1.4rem" }}>Parent / Carer Enquiry</h2>
              <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                If your child is not in school and you're looking for specialist
                provision, we'd love to hear from you.
              </p>
            </div>
            <ParentForm />
          </>
        )}
      </div>
    </section>
  );
}
