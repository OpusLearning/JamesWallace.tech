// src/components/ContactForm.jsx

import React, { useState } from "react";

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
    <div className="container py-5">
      <h1 className="text-center futuristic-text mb-4">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="futuristic-card mx-auto"
        style={{ maxWidth: 600 }}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label text-white">Name *</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label text-white">Email *</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Message */}
        <div className="mb-3">
          <label className="form-label text-white">Message *</label>
          <textarea
            name="message"
            className="form-control"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit */}
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="futuristic-button"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending…"
              : status === "sent"
              ? "Sent ✅"
              : status === "error"
              ? "Error ❌"
              : "Submit"}
          </button>
          {status === "sent" && (
            <small className="text-muted">
              Thanks, we’ve received your message!
            </small>
          )}
          {status === "error" && (
            <small className="text-danger">Oops! Something went wrong.</small>
          )}
        </div>
      </form>
    </div>
  );
}
