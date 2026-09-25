import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import usePageMeta from "../hooks/usePageMeta";

const ENQUIRIES = {
  parent: {
    title: "Parent or carer enquiry",
    subject: "Parent / Carer Enquiry",
    intro: "Tell me what you are looking for. You do not need to have a plan worked out before getting in touch.",
    fields: [
      { name: "name", label: "Your name", required: true, autoComplete: "name" },
      { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
      { name: "childAge", label: "Young person’s age", options: ["Under 11", "11 to 16", "16 to 25", "Prefer not to say"] },
      { name: "needsDescription", label: "What support are you looking for?", required: true, multiline: true, placeholder: "For example, subjects, approximate hours, and in-person or online tuition." },
      { name: "howHeard", label: "How did you hear about me?", wide: true },
    ],
  },
  la: {
    title: "School, agency or local authority enquiry",
    subject: "LA / School Referral Enquiry",
    intro: "Outline the provision you are looking for. We can discuss suitability, availability and the next steps from there.",
    fields: [
      { name: "organisation", label: "Organisation", required: true, autoComplete: "organization" },
      { name: "contactName", label: "Your name", required: true, autoComplete: "name" },
      { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
      { name: "learnerAgeRange", label: "Learner age range", required: true, placeholder: "For example, 14–16" },
      { name: "indicativeHours", label: "Approximate hours per week", placeholder: "For example, 10" },
      { name: "currentProvision", label: "Current provision, in general terms", wide: true, placeholder: "For example, part-time alternative provision" },
      { name: "preferredStart", label: "Preferred start date", type: "date" },
      { name: "notes", label: "What would you like to discuss?", multiline: true, placeholder: "Subjects, location and the broad provision you are looking for." },
    ],
  },
};

function emptyAnswers(audience) {
  const answers = Object.fromEntries(ENQUIRIES[audience].fields.map(({ name }) => [name, ""]));
  // Preserve the legacy field without requesting sensitive plan information at first contact.
  return audience === "la" ? { ...answers, ehcp: "" } : answers;
}

function fieldError(field, value) {
  if (field.required && !value.trim()) return `Enter ${field.label.toLowerCase()}.`;
  if (field.type === "email" && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Enter a valid email address, such as name@example.com.";
  }
  return "";
}

function EnquiryForm({ audience, topic }) {
  const enquiry = ENQUIRIES[audience];
  const [answers, setAnswers] = useState(() => emptyAnswers(audience));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [attempt, setAttempt] = useState(0);
  const resultRef = useRef(null);
  const requestRef = useRef(null);
  const id = (name) => `${audience}-${name}`;

  useEffect(() => {
    if (["invalid", "error", "sent"].includes(status)) resultRef.current?.focus();
  }, [status, attempt]);

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
  }, []);

  function handleChange(field, value) {
    setAnswers((current) => ({ ...current, [field.name]: value }));
    if (errors[field.name]) {
      setErrors((current) => ({ ...current, [field.name]: fieldError(field, value) }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (requestRef.current) return;
    const nextErrors = Object.fromEntries(enquiry.fields
      .map((field) => [field.name, fieldError(field, answers[field.name])])
      .filter(([, error]) => error));
    setErrors(nextErrors);
    setAttempt((current) => current + 1);
    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      return;
    }

    const values = Object.fromEntries(Object.entries(answers).map(([key, value]) => [key, value.trim()]));
    const message = [enquiry.subject, ...enquiry.fields
      .filter(({ name }) => values[name])
      .map(({ name, label }) => `${label}: ${values[name]}`)].join("\n");
    const controller = new AbortController();
    requestRef.current = controller;
    setStatus("sending");
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          ...values,
          subject: enquiry.subject,
          name: values.name || values.contactName,
          message,
          // The `?topic=` on the link that brought the enquirer here, so the enquiry records its
          // own source (e.g. a referral vs an evidence-pack request). Absent for ordinary visits.
          topic: topic || undefined,
          page: `/contact?for=${audience === "parent" ? "parent" : "commissioner"}${topic ? `&topic=${encodeURIComponent(topic)}` : ""}`,
        }),
      });
      if (!response.ok) throw new Error("Enquiry not confirmed");
      const result = await response.json();
      if (result.ok !== true && result.success !== true) throw new Error("Enquiry not confirmed");
      if (requestRef.current === controller) {
        setStatus("sent");
        setAnswers(emptyAnswers(audience));
      }
    } catch {
      if (requestRef.current === controller) setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  if (status === "sent") {
    return (
      <div className="jw-card jw-form-feedback" ref={resultRef} tabIndex={-1} role="status">
        <p className="jw-eyebrow">Message received</p>
        <h2>Thank you for getting in touch.</h2>
        <p>Your enquiry has been received. I will reply using the contact details you provided.</p>
        <p>There is no need to send it again. Please keep any learner documents for an agreed secure route.</p>
        <Link className="jw-btn-secondary" to={audience === "parent" ? "/tuition" : "/provision"}>
          {audience === "parent" ? "Explore tuition" : "Explore the provision"}
        </Link>
      </div>
    );
  }

  const invalidFields = enquiry.fields.filter(({ name }) => errors[name]);
  return (
    <form className="jw-card jw-contact-form" onSubmit={handleSubmit} noValidate aria-labelledby={id("heading")} aria-busy={status === "sending"}>
      <h2 id={id("heading")}>{enquiry.title}</h2>
      <p>{enquiry.intro}</p>
      <p id={id("privacy")} className="jw-contact-privacy">
        Please keep this first message general. Do not include a young person’s name, diagnosis, clinical details or safeguarding information. We can agree a secure way to share documents later.
      </p>
      <p id={id("required")} className="small">Fields marked <span aria-hidden="true">*</span><span className="visually-hidden">with an asterisk</span> are required. Everything else is optional.</p>
      {status === "invalid" && invalidFields.length > 0 && (
        <div ref={resultRef} className="jw-form-feedback alert alert-danger" tabIndex={-1} role="alert">
          <h3 className="h5">Check your answers</h3>
          <ul className="mb-0">
            {invalidFields.map((field) => (
              <li key={field.name}>
                <a href={`#${id(field.name)}`} onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(id(field.name))?.focus();
                }}>{errors[field.name]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {status === "error" && (
        <div ref={resultRef} className="jw-form-feedback alert alert-danger" tabIndex={-1} role="alert">
          <h3 className="h5">I couldn’t confirm your enquiry was received.</h3>
          <p className="mb-0">Your answers are still here. Please try again, or email <a href="mailto:hello@jameswallace.tech">hello@jameswallace.tech</a> if you would prefer to check directly.</p>
        </div>
      )}
      <fieldset disabled={status === "sending"} aria-describedby={`${id("required")} ${id("privacy")}`}>
        <legend className="visually-hidden">Your enquiry details</legend>
        <div className="row g-3">
          {enquiry.fields.map((field) => {
            const attributes = {
              id: id(field.name), name: field.name,
              className: `form-control${errors[field.name] ? " is-invalid" : ""}`,
              value: answers[field.name],
              onChange: (event) => handleChange(field, event.target.value),
              required: field.required, autoComplete: field.autoComplete || "off",
              "aria-invalid": Boolean(errors[field.name]),
              "aria-describedby": [errors[field.name] ? id(`${field.name}-error`) : "", field.multiline ? id("privacy") : ""].filter(Boolean).join(" ") || undefined,
            };
            return (
              <div className={field.multiline || field.wide ? "col-12" : "col-12 col-md-6"} key={field.name}>
                <label htmlFor={id(field.name)} className="form-label fw-semibold">
                  {field.label}{field.required && <span aria-hidden="true"> *</span>}
                </label>
                {field.options
                  ? <select {...attributes}>
                      <option value="">Select an age band</option>
                      {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  : field.multiline
                    ? <textarea {...attributes} placeholder={field.placeholder} maxLength={3000} rows={4} />
                    : <input {...attributes} type={field.type || "text"} placeholder={field.placeholder} maxLength={254} />}
                {errors[field.name] && <p id={id(`${field.name}-error`)} className="invalid-feedback">{errors[field.name]}</p>}
              </div>
            );
          })}
          <div className="col-12">
            <p className="small">Your details will be used to respond to this enquiry. Read the <Link to="/privacy">privacy notice</Link>.</p>
            <button type="submit" className="jw-btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending your enquiry…" : "Send enquiry"}
            </button>
          </div>
        </div>
      </fieldset>
      <p className="visually-hidden" role="status">{status === "sending" ? "Sending your enquiry. Please wait." : ""}</p>
    </form>
  );
}

EnquiryForm.propTypes = { audience: PropTypes.oneOf(["parent", "la"]).isRequired, topic: PropTypes.string };

export default function Contact() {
  usePageMeta({
    title: "Contact James Wallace | Tuition & referrals",
    description: "Ask James Wallace about specialist tuition, EOTAS provision and availability across Derbyshire, Nottinghamshire and online.",
    path: "/contact",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  // The enquiry source carried on the link (`?topic=referral`, `?topic=evidence-pack`). Capped to
  // the length the server accepts, so a hand-edited URL cannot store anything unbounded.
  const topic = (searchParams.get("topic") || "").trim().slice(0, 120);
  const activeAudience = ["commissioner", "la", "agency", "school"].includes(searchParams.get("for")) ? "la" : "parent";

  function selectAudience(audience) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set("for", audience === "parent" ? "parent" : "commissioner");
      // A topic describes the enquiry the link pointed at; don't carry it across an audience switch.
      next.delete("topic");
      return next;
    }, { replace: true, preventScrollReset: true });
  }

  return (
    <section className="jw-section jw-section-warm">
      <div className="jw-container">
        <div className="jw-contact-layout row g-5 align-items-start">
          <div className="jw-contact-intro col-12 col-lg-4">
            <p className="jw-eyebrow">A conversation is a good place to start</p>
            <h1>Let’s find a way forward.</h1>
            <p className="lead">For families looking for tuition, and professionals planning a young person’s provision.</p>
            <p>Tell me a little about what you need. I can help you understand whether my teaching is a suitable fit and what to consider next.</p>
            <div className="mt-4">
              <h2 className="h5">Prefer to contact me directly?</h2>
              <p><a href="mailto:hello@jameswallace.tech">hello@jameswallace.tech</a><br /><a href="tel:07897021077">07897 021077</a></p>
              <p className="small">Based in Nottingham. Working across Nottinghamshire, Derbyshire and online.</p>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <fieldset className="mb-4 jw-contact-options">
              <legend className="h5">Which best describes your enquiry?</legend>
              <div className="d-flex flex-wrap gap-2" role="group" aria-label="Enquiry type">
                {[["parent", "Parent or carer"], ["la", "School, agency or local authority"]].map(([audience, label]) => (
                  <button key={audience} type="button" aria-pressed={activeAudience === audience} aria-controls={`contact-panel-${audience}`} onClick={() => selectAudience(audience)} className={activeAudience === audience ? "jw-btn-primary" : "jw-btn-secondary"}>
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            {Object.keys(ENQUIRIES).map((audience) => (
              <div key={audience} id={`contact-panel-${audience}`} hidden={activeAudience !== audience}>
                <EnquiryForm audience={audience} topic={topic} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
