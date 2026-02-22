import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCheck,
  faClock,
  faClipboardList,
  faGraduationCap,
  faFileAlt,
  faVideo,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

function BookButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/calendly")}
      className="jw-btn-secondary"
      style={{ border: "none", cursor: "pointer" }}
    >
      Book a Free Call
    </button>
  );
}

function BuyButton({ tier, label = "Buy Now" }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again or contact us.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again or contact us.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="jw-btn-primary"
      style={{ border: "none", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}
    >
      {loading ? "Redirecting…" : label}
    </button>
  );
}

function OfferCard({ icon, title, price, subtitle, bullets, blurb, tier }) {
  return (
    <div className="jw-card h-100 d-flex flex-column">
      <div className="text-center mb-3" style={{ color: "var(--brand)" }}>
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, textAlign: "center", marginBottom: "0.35rem", color: "var(--text-primary)" }}>
        {title}
      </h3>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, textAlign: "center", color: "var(--action)", marginBottom: "0.2rem" }}>
        £{price}
      </div>
      {subtitle && (
        <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
          {subtitle}
        </div>
      )}
      {blurb && (
        <p style={{ textAlign: "center", fontSize: "0.875rem", marginBottom: "1rem" }}>{blurb}</p>
      )}
      <ul className="list-unstyled mb-4" style={{ fontSize: "0.875rem" }}>
        {bullets.map((line, i) => (
          <li key={i} className="d-flex align-items-start mb-2">
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "var(--action)", marginRight: "0.5rem", marginTop: "0.2rem", flexShrink: 0 }}
            />
            <span style={{ color: "var(--text-muted)" }}>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto d-flex flex-column gap-2 align-items-center">
        {tier && <BuyButton tier={tier} label={`Buy Now — £${price}`} />}
        <BookButton />
      </div>
    </div>
  );
}

/* Audit tier card — links to audit.jameswallace.tech */
function AuditCard({ icon, title, price, subtitle, bullets, badge, href }) {
  return (
    <div className="jw-card h-100 d-flex flex-column" style={{ border: badge ? "2px solid var(--brand)" : undefined }}>
      {badge && (
        <div className="text-center mb-2">
          <span className="jw-badge-brand jw-badge" style={{ fontSize: "0.72rem" }}>{badge}</span>
        </div>
      )}
      <div className="text-center mb-3" style={{ color: "var(--brand)" }}>
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, textAlign: "center", marginBottom: "0.35rem", color: "var(--text-primary)" }}>
        {title}
      </h3>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, textAlign: "center", color: "var(--action)", marginBottom: "0.2rem" }}>
        £{price}
      </div>
      <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
        {subtitle}
      </div>
      <ul className="list-unstyled mb-4" style={{ fontSize: "0.875rem" }}>
        {bullets.map((line, i) => (
          <li key={i} className="d-flex align-items-start mb-2">
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "var(--action)", marginRight: "0.5rem", marginTop: "0.2rem", flexShrink: 0 }}
            />
            <span style={{ color: "var(--text-muted)" }}>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto d-flex justify-content-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="jw-btn-primary"
          style={{ textDecoration: "none" }}
        >
          Get Started ↗
        </a>
      </div>
    </div>
  );
}

export default function Pricing() {
  const tutoringOffers = [
    {
      title: "Starter Session",
      price: "45",
      subtitle: "60 mins",
      icon: faClipboardList,
      tier: "starter",
      blurb: "A first working session to see what's going on and what will actually help.",
      bullets: [
        "Diagnostic chat with parent (10–15 mins)",
        "45-min focused session with your child",
        "Mini plan: 3 quick wins + next steps",
        "One-off; ideal to assess fit",
      ],
    },
    {
      title: "Weekly Tutoring",
      price: "38",
      subtitle: "per 60-min session",
      icon: faBrain,
      tier: null,
      blurb: "Ongoing 1:1 support to build calm routines, confidence and steady progress.",
      bullets: [
        "Same weekly slot, online",
        "Custom plan (ADHD / Dyslexia / ASD-aware)",
        "Parent recap (bullet points in email)",
        "Resource share (templates / tools)",
      ],
    },
    {
      title: "Homework System Sprint",
      price: "199",
      subtitle: "2-week intensive",
      icon: faClock,
      tier: "sprint",
      blurb: "Rapid setup of a working homework routine so evenings stop being a fight.",
      bullets: [
        "Two 60-min sessions",
        "'Now-Next-Done' board setup",
        "Printable weekly plan + friction audit",
        "Parent coaching call (20 mins)",
        "Great for chaos → structure fast",
      ],
    },
    {
      title: "Exam Support Block",
      price: "349",
      subtitle: "6 × 60-min sessions",
      icon: faGraduationCap,
      tier: "exam",
      blurb: "Focused GCSE / A-level prep with structure, timing practice and calm exam habits.",
      bullets: [
        "Six 60-min sessions over 3–6 weeks",
        "Retrieval practice + assistive tech setup",
        "Time-boxing + test-day routine",
        "Progress snapshot at end",
      ],
    },
  ];

  const auditOffers = [
    {
      title: "ND Learning Systems Audit",
      price: "197",
      subtitle: "one-time payment",
      icon: faFileAlt,
      badge: null,
      href: "https://audit.jameswallace.tech/pricing",
      bullets: [
        "Detailed intake questionnaire",
        "Personalised audit report (2,500+ words)",
        "Current setup analysis",
        "Tool & app recommendations with setup steps",
        "Home learning environment review",
        "Quick wins + longer-term strategy",
        "School collaboration guidance",
      ],
    },
    {
      title: "Audit + Live Consult",
      price: "347",
      subtitle: "one-time payment",
      icon: faVideo,
      badge: "Most Popular",
      href: "https://audit.jameswallace.tech/pricing",
      bullets: [
        "Everything in the Audit tier",
        "45-minute video consultation",
        "Walk through your report together",
        "Ask questions & get live advice",
        "Priority scheduling",
        "Recording of the session",
      ],
    },
    {
      title: "Audit + Implementation Plan",
      price: "447",
      subtitle: "one-time payment",
      icon: faRocket,
      badge: null,
      href: "https://audit.jameswallace.tech/pricing",
      bullets: [
        "Everything in the Consult tier",
        "4-week structured implementation plan",
        "Week-by-week action steps",
        "Check-in email support",
        "Template letters for school",
        "Progress tracking framework",
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h1>Working Together</h1>
          <p style={{ maxWidth: "540px", margin: "0 auto 2rem", fontSize: "1.05rem" }}>
            Calm, structured tutoring for neurodiverse learners. Clear rates,
            simple bundles, and no surprises.
          </p>
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            {["✅ Enhanced DBS", "🇬🇧 UK-based", "💻 Online 1:1", "📚 Evidence-based"].map((tag) => (
              <span key={tag} className="jw-badge">{tag}</span>
            ))}
          </div>
          <BookButton />
        </div>
      </section>

      {/* Tutoring offers */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-2">Tutoring Options</h2>
          <p className="text-center" style={{ maxWidth: "480px", margin: "0 auto 3rem" }}>
            One-to-one sessions tailored to your child's needs, learning profile, and goals.
          </p>
          <div className="row">
            {tutoringOffers.map((offer, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3 mb-4 d-flex">
                <OfferCard {...offer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <h2 className="mb-4">What's included (all tutoring plans)</h2>
              <ul className="list-unstyled">
                {[
                  "Personalised structure for the learner's profile",
                  "Templates your child actually uses (not theory)",
                  "Simple metrics: what worked / where stuck",
                  "Email support between sessions (fair use)",
                ].map((item, idx) => (
                  <li key={idx} className="d-flex align-items-start mb-3">
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "var(--action)", marginRight: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}
                    />
                    <span style={{ color: "var(--text-muted)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ND Audit section */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <span className="jw-badge-brand jw-badge mb-3" style={{ display: "inline-block" }}>
              Sister service — audit.jameswallace.tech
            </span>
            <h2>ND Learning Systems Audit</h2>
            <p style={{ maxWidth: "580px", margin: "0 auto" }}>
              Not sure where to start? Before or alongside tutoring, a full ND audit gives you a
              personalised, evidence-based plan — mapping your child's learning profile, tools,
              environment, and school interface into clear, actionable steps.
            </p>
          </div>
          <div className="row justify-content-center">
            {auditOffers.map((offer, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
                <AuditCard {...offer} />
              </div>
            ))}
          </div>
          <p className="text-center mt-3" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Audit reports delivered within 3 working days.{" "}
            <a href="https://audit.jameswallace.tech/sample-report" target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)" }}>
              See a sample report ↗
            </a>
          </p>
        </div>
      </section>

      {/* Info grid */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row g-3">
            {[
              { h: "Availability & location", p: "Online (UK). Weekdays early evening; Saturday mornings in some cases." },
              { h: "DBS & safeguarding", p: "Enhanced DBS (updated). Parents welcome to sit in / observe sessions." },
              { h: "Payment & invoicing", p: "Invoice monthly via bank transfer. No hidden fees, no marketplace mark-up." },
              { h: "Cancellation", p: "24-hour notice → no charge. Under 24 hours → session charged (we re-book wherever possible)." },
            ].map((box, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100">
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                    {box.h}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.875rem" }} dangerouslySetInnerHTML={{ __html: box.p }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div
            className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3 p-4"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "12px" }}
          >
            <div>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Next step</h2>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                We'll talk calmly about what's going on, map next steps, and you'll leave with a
                plan — even if you don't book.
              </p>
            </div>
            <BookButton />
          </div>
        </div>
      </section>
    </>
  );
}
