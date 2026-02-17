import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCheck,
  faClock,
  faClipboardList,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

function BookButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/calendly")}
      className="jw-btn-primary"
      style={{ border: "none", cursor: "pointer" }}
    >
      Book a Free 20-Minute Call
    </button>
  );
}

function OfferCard({ icon, title, price, subtitle, bullets, blurb }) {
  return (
    <div className="jw-card h-100 d-flex flex-column">
      <div className="text-center mb-3" style={{ color: "var(--brand)" }}>
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "0.35rem",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          textAlign: "center",
          color: "var(--action)",
          marginBottom: "0.2rem",
        }}
      >
        £{price}
      </div>
      {subtitle && (
        <div
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.82rem",
            marginBottom: "0.75rem",
          }}
        >
          {subtitle}
        </div>
      )}
      {blurb && (
        <p
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          {blurb}
        </p>
      )}
      <ul className="list-unstyled mb-4" style={{ fontSize: "0.875rem" }}>
        {bullets.map((line, i) => (
          <li key={i} className="d-flex align-items-start mb-2">
            <FontAwesomeIcon
              icon={faCheck}
              style={{
                color: "var(--action)",
                marginRight: "0.5rem",
                marginTop: "0.2rem",
                flexShrink: 0,
              }}
            />
            <span style={{ color: "var(--text-muted)" }}>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto d-flex justify-content-center">
        <BookButton />
      </div>
    </div>
  );
}

export default function Pricing() {
  const offers = [
    {
      title: "Starter Session",
      price: "45",
      subtitle: "60 mins",
      icon: faClipboardList,
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
      blurb: "Focused GCSE / A-level prep with structure, timing practice and calm exam habits.",
      bullets: [
        "Six 60-min sessions over 3–6 weeks",
        "Retrieval practice + assistive tech setup",
        "Time-boxing + test-day routine",
        "Progress snapshot at end",
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
            {[
              "✅ Enhanced DBS",
              "🇬🇧 UK-based",
              "💻 Online 1:1",
              "📚 Evidence-based",
            ].map((tag) => (
              <span key={tag} className="jw-badge">
                {tag}
              </span>
            ))}
          </div>
          <BookButton />
        </div>
      </section>

      {/* Offer cards */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-5">Support Options</h2>
          <div className="row">
            {offers.map((offer, i) => (
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
              <h2 className="mb-4">What's included (all plans)</h2>
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
                      style={{
                        color: "var(--action)",
                        marginRight: "0.75rem",
                        marginTop: "0.2rem",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "var(--text-muted)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row g-3">
            {[
              {
                h: "Availability & location",
                p: "Online (UK). Weekdays early evening; Saturday mornings in some cases.",
              },
              {
                h: "DBS & safeguarding",
                p: "Enhanced DBS (updated). Parents welcome to sit in / observe sessions.",
              },
              {
                h: "Payment & invoicing",
                p: "Invoice monthly via bank transfer. No hidden fees, no marketplace mark-up.",
              },
              {
                h: "Cancellation",
                p: "24-hour notice → no charge. Under 24 hours → session charged (we re-book wherever possible).",
              },
            ].map((box, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100">
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {box.h}
                  </h4>
                  <p
                    style={{ margin: 0, fontSize: "0.875rem" }}
                    dangerouslySetInnerHTML={{ __html: box.p }}
                  />
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
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                Next step
              </h2>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                We'll talk calmly about what's going on, map next steps, and
                you'll leave with a plan — even if you don't book.
              </p>
            </div>
            <BookButton />
          </div>
        </div>
      </section>
    </>
  );
}
