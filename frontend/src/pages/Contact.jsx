import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { success } = await res.json();
      if (success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("ContactForm submission error:", err);
      setStatus("error");
    }
  }

  return (
    <section className="jw-section jw-section-warm">
      <div className="jw-container">
        <div className="text-center mb-5">
          <h1>Get in Touch</h1>
          <p style={{ maxWidth: "480px", margin: "0 auto" }}>
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="jw-card mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-4">
            <label className="form-label fw-semibold">Name *</label>
            <input
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="form-label fw-semibold">Message *</label>
            <textarea
              name="message"
              className="form-control"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="How can I help?"
            />
          </div>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <button
              type="submit"
              className="jw-btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
            </button>
            {status === "sent" && (
              <small style={{ color: "var(--action)" }}>Thanks  -  I'll be in touch soon!</small>
            )}
            {status === "error" && (
              <small style={{ color: "#dc2626" }}>Something went wrong. Please try again.</small>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
