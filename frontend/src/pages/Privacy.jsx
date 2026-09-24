import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LegalPage, LegalSection, LegalTable } from "../components/Legal";

const CONTACT_EMAIL = "hello@jameswallace.tech";
const CONTACT_PHONE = "07897 021077";

/**
 * The electronic route the DUAA 2025 data-protection complaints procedure requires. It reuses the
 * one endpoint the site already watches, /api/contact, carrying a hidden `topic` so the enquiry is
 * filed as a data-protection complaint rather than mixed in with ordinary enquiries.
 */
function DataProtectionComplaintForm() {
  const [answers, setAnswers] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  function update(field, value) {
    setAnswers((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (!answers.name.trim() || !answers.email.trim() || !answers.message.trim()) {
      setStatus("error");
      setError("Enter your name, email address and the details of your complaint.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) {
      setStatus("error");
      setError("Enter a valid email address, such as name@example.com.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          message: answers.message.trim(),
          subject: "Data-protection complaint",
          topic: "data-protection complaint",
          page: "/privacy#complaints",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || (data.ok !== true && data.success !== true)) throw new Error("not confirmed");
      setStatus("sent");
      setAnswers({ name: "", email: "", message: "" });
      window.setTimeout(() => resultRef.current?.focus(), 0);
    } catch {
      setStatus("error");
      setError(
        `We could not confirm your complaint was received. Please try again, or email ${CONTACT_EMAIL}.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="jw-card jw-form-feedback" ref={resultRef} tabIndex={-1} role="status">
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Complaint received</h3>
        <p style={{ margin: 0 }}>
          Thank you. We will acknowledge your data-protection complaint within 30 days and reply using
          the email address you gave.
        </p>
      </div>
    );
  }

  return (
    <form className="jw-card" onSubmit={handleSubmit} noValidate aria-label="Data-protection complaint form">
      {status === "error" && (
        <div ref={resultRef} className="jw-form-feedback alert alert-danger" tabIndex={-1} role="alert">
          <p className="mb-0">{error}</p>
        </div>
      )}
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="dp-name" className="form-label fw-semibold">Your name</label>
          <input
            id="dp-name"
            name="name"
            className="form-control"
            autoComplete="name"
            maxLength={254}
            value={answers.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="dp-email" className="form-label fw-semibold">Email address</label>
          <input
            id="dp-email"
            name="email"
            type="email"
            className="form-control"
            autoComplete="email"
            maxLength={254}
            value={answers.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="dp-message" className="form-label fw-semibold">Your complaint</label>
          <textarea
            id="dp-message"
            name="message"
            className="form-control"
            rows={5}
            maxLength={3000}
            value={answers.message}
            onChange={(event) => update("message", event.target.value)}
          />
        </div>
        <div className="col-12">
          <p className="small">
            We use your details only to handle this complaint. Read the <Link to="/privacy">privacy
            notice</Link>.
          </p>
          <button type="submit" className="jw-btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send complaint"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Notice"
      metaTitle="Privacy Notice | James Wallace, SEND & EOTAS Provision"
      description="How James Wallace Education handles personal data on this website: what we collect, why, who processes it, how long we keep it, and how to raise a data-protection complaint."
      path="/privacy"
      updated="Last updated: 25 September 2026"
    >
      <LegalSection heading="1. Who we are">
        <p>
          James Wallace Education Ltd is the controller of the personal data described in this notice.
          The company is registered in England and Wales, company number 17479328. Its registered
          office is 71–75 Shelton Street, Covent Garden, London WC2H 9JQ — that address is for
          correspondence only and is not a place of business.
        </p>
        <p>
          The data-protection contact is <strong>James Wallace</strong>, who can be reached at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or{" "}
          <a href="tel:07897021077">{CONTACT_PHONE}</a>. We have not appointed a Data Protection
          Officer; as a small provision we are not required to.
        </p>
      </LegalSection>

      <LegalSection heading="2. What this notice covers">
        <p>
          This notice covers this website: the contact form, the chat assistant, and the newsletter
          sign-up on our journal. Records kept about a young person during commissioned provision are a
          separate processing activity, governed by the agreement with the commissioning school or
          local authority and set out in the portal&apos;s own privacy notice at{" "}
          <a href="https://portal.jameswallace.tech/privacy" target="_blank" rel="noopener noreferrer">
            portal.jameswallace.tech/privacy
          </a>.
        </p>
        <p>
          <strong>Please do not send a child&apos;s name, a diagnosis, or any safeguarding detail through
          this website.</strong> Please keep a first message general. A secure route for documents is
          arranged once a referral is under way.
        </p>
      </LegalSection>

      <LegalSection heading="3. What we collect, why, and our lawful basis">
        <LegalTable
          caption="Purposes, data and lawful bases for processing"
          columns={["What you do", "What we collect", "Why", "Lawful basis"]}
          rows={[
            [
              "Send an enquiry through the contact form",
              "Your name, email address, the message, and the page you wrote from",
              "To respond to your enquiry",
              "Legitimate interests",
            ],
            [
              "Use the chat assistant",
              "The messages you send and the replies",
              "To answer your question and to see what people ask",
              "Legitimate interests",
            ],
            [
              "Sign up to the journal newsletter",
              "Your name and email address",
              "To send occasional emails about SEND and alternative provision",
              "Consent (you can withdraw at any time)",
            ],
          ]}
        />
        <p style={{ marginTop: "1rem" }}>
          We do not sell your personal data. We do not use it to make automated decisions about you,
          and we do not profile you.
        </p>
      </LegalSection>

      <LegalSection heading="4. Who processes it">
        <p>
          We use a small number of service providers. They process data on our behalf under contract:
        </p>
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li><strong style={{ color: "var(--text-primary)" }}>Hetzner</strong> — hosts this website and stores enquiries on our own server in Germany.</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Cloudflare</strong> — content delivery and security in front of the site.</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Postmark</strong> — delivers the notification email when you send an enquiry.</li>
          <li><strong style={{ color: "var(--text-primary)" }}>OpenAI</strong> — generates the chat assistant&apos;s replies; the conversation is stored on our server.</li>
          <li><strong style={{ color: "var(--text-primary)" }}>MailerLite</strong> — manages the newsletter list, in Lithuania (EU).</li>
        </ul>
        <p>
          For commissioned provision, the portal stores records on Neon (Frankfurt) and encrypted
          documents on Cloudflare R2 (Western Europe). That processing is described in the portal&apos;s
          own privacy notice.
        </p>
      </LegalSection>

      <LegalSection heading="5. International transfers">
        <p>
          Some of our providers are outside the UK. Where personal data is transferred, it is protected
          by the safeguard named below.
        </p>
        <LegalTable
          caption="International transfers and the safeguard for each"
          columns={["Provider", "Purpose", "Location", "Safeguard"]}
          rows={[
            ["Postmark", "Enquiry notification emails", "United States", "UK Extension to the EU–US Data Privacy Framework"],
            ["OpenAI", "Generating chat replies", "United States", "OpenAI data processing agreement with Standard Contractual Clauses and the UK Addendum"],
            ["Cloudflare", "Content delivery and security", "United States", "UK Extension to the EU–US Data Privacy Framework"],
            ["MailerLite", "Newsletter", "Lithuania (EU)", "No transfer outside the UK/EEA"],
            ["Hetzner", "Website hosting and enquiry storage", "Germany (EU)", "No transfer outside the UK/EEA"],
            ["Neon", "Portal database (commissioned provision)", "Frankfurt (EU)", "No transfer outside the UK/EEA"],
            ["Cloudflare R2", "Portal documents (commissioned provision)", "Western Europe (EU)", "No transfer outside the UK/EEA"],
          ]}
        />
      </LegalSection>

      <LegalSection heading="6. How long we keep it">
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li><strong style={{ color: "var(--text-primary)" }}>Enquiries</strong> — up to 2 years.</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Chat conversations</strong> — up to 12 months, then deleted automatically.</li>
          <li><strong style={{ color: "var(--text-primary)" }}>Newsletter</strong> — until you unsubscribe.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Your rights">
        <p>Under UK data protection law you have the right to:</p>
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li>access a copy of the personal data we hold about you;</li>
          <li>ask us to correct data that is inaccurate;</li>
          <li>ask us to delete your data;</li>
          <li>ask us to restrict or object to certain processing;</li>
          <li>receive your data in a portable, machine-readable format;</li>
          <li>withdraw consent at any time where processing is based on consent.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us using the details in section 1. You also have the
          right to complain to the{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            Information Commissioner&apos;s Office (ICO)
          </a>{" "}
          if you believe your data has been handled unlawfully.
        </p>
      </LegalSection>

      <LegalSection id="complaints" heading="8. Data-protection complaints">
        <p>
          If you are unhappy with how we have handled your personal data, you can make a data-protection
          complaint. We will acknowledge your complaint within 30 days. You can complain in either of
          two ways:
        </p>
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li>use the form below; or</li>
          <li>
            write to the registered office in section 1, or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </li>
        </ul>
        <p>
          You can also complain to the ICO at any time, but we would rather have the chance to put
          things right first.
        </p>
        <DataProtectionComplaintForm />
      </LegalSection>

      <LegalSection heading="9. Contact">
        <div className="jw-card" style={{ display: "inline-block" }}>
          <p style={{ margin: "0 0 0.4rem" }}><strong>James Wallace Education Ltd</strong></p>
          <p style={{ margin: "0 0 0.4rem" }}>
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brand)" }}>{CONTACT_EMAIL}</a>
          </p>
          <p style={{ margin: 0 }}>
            Phone:{" "}
            <a href="tel:07897021077" style={{ color: "var(--brand)" }}>{CONTACT_PHONE}</a>
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
