import React from "react";

export default function ContactForm() {
  return (
    <div className="container py-5" style={{ background: "transparent" }}>
      <h1 className="text-center text-white mb-4">Contact Us</h1>
      <p className="text-center text-white mb-4">
        If you have any questions or need further assistance, please fill out
        the form below. We will get back to you as soon as possible.
      </p>
      <div className="mx-auto" style={{ width: "100%" }}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScAFWKTVZkNzBcfDWQA1DKUp6ahtjJJxMC51to7HdDuJP9_qQ/viewform?embedded=true"
          width="100%"
          height="850"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
