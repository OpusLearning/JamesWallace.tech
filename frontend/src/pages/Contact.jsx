export default function ContactForm() {
  return (
    <section className="jw-section jw-section-warm">
      <div className="jw-container">
        <div className="text-center mb-5">
          <h1>Get in Touch</h1>
          <p style={{ maxWidth: "480px", margin: "0 auto" }}>
            Fill out the form below and I'll get back to you as soon as
            possible.
          </p>
        </div>
        <div className="mx-auto" style={{ maxWidth: "700px" }}>
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
    </section>
  );
}
