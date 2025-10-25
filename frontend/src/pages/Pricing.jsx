import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCheck,
  faClock,
  faClipboardList,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const primaryColor = "#2563eb";

/* ---------- Reusable CTA ---------- */
function BookButton({ className = "" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/calendly")}
      className={"btn fw-semibold text-white border-0 " + className}
      style={{
        backgroundColor: primaryColor,
        borderRadius: "9999px",
        minWidth: "14rem",
        boxShadow: "0 16px 32px rgba(37,99,235,.4)",
      }}
    >
      Book a Free 20-Minute Call
    </button>
  );
}

/* ---------- Offer Card ---------- */
function OfferCard({ icon, title, price, subtitle, bullets, blurb }) {
  return (
    <div
      className="card h-100 border-0 shadow-lg d-flex flex-column"
      style={{
        background:
          "linear-gradient(145deg, rgba(15,15,20,0.9), rgba(30,30,40,0.4))",
        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
      }}
    >
      <div className="card-body d-flex flex-column text-white">
        <div className="d-flex justify-content-center mb-3">
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            style={{ color: primaryColor }}
          />
        </div>
        <h3 className="h5 fw-bold text-center mb-2">{title}</h3>
        <div
          className="fs-4 fw-bold text-center mb-1"
          style={{ color: primaryColor }}
        >
          £{price}
        </div>
        {subtitle && (
          <div className="text-center text-white-50 mb-3">{subtitle}</div>
        )}
        {blurb && (
          <p
            className="text-white-50 text-center mb-3"
            style={{ fontSize: ".95rem", lineHeight: 1.5 }}
          >
            {blurb}
          </p>
        )}
        <ul
          className="list-unstyled mb-4 text-white-50 text-start"
          style={{ fontSize: ".95rem", lineHeight: 1.5 }}
        >
          {bullets.map((line, i) => (
            <li key={i} className="d-flex align-items-start mb-2">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-success me-2 mt-1"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto d-flex justify-content-center">
          <BookButton />
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Pricing() {
  const offers = [
    {
      title: "Starter Session",
      price: "45",
      subtitle: "60 mins",
      icon: faClipboardList,
      blurb:
        "A first working session to see what’s going on and what will actually help.",
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
      blurb:
        "Ongoing 1:1 support to build calm routines, confidence and steady progress.",
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
      blurb:
        "Rapid setup of a working homework routine so evenings stop being a fight.",
      bullets: [
        "Two 60-min sessions",
        "‘Now-Next-Done’ board setup",
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
      blurb:
        "Focused GCSE / A-level prep with structure, timing practice and calm exam habits.",
      bullets: [
        "Six 60-min sessions over 3–6 weeks",
        "Retrieval practice + assistive tech setup",
        "Time-boxing + test-day routine",
        "Progress snapshot at end",
      ],
    },
  ];

  return (
    <div className="text-light" style={{ backgroundColor: "#000" }}>
      {/* HERO (single column, no image) */}
      <div className="container py-5 text-center">
        <h1 className="display-5 fw-bold mb-3 text-white">Working Together</h1>
        <p className="lead text-white-50 mb-4">
          Calm, structured tutoring for neurodiverse learners. Clear rates,
          simple bundles, and no surprises.
        </p>
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
          {[
            "✅ Enhanced DBS",
            "🇬🇧 UK-based",
            "💻 Online 1:1",
            "📚 Evidence-based",
          ].map((tag) => (
            <span
              key={tag}
              className="badge rounded-pill"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                fontWeight: 500,
                padding: ".5rem .8rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <BookButton />
      </div>

      {/* OFFERS */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-white">Support Options</h2>
        <div className="row">
          {offers.map((offer, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3 mb-4 d-flex">
              <OfferCard {...offer} />
            </div>
          ))}
        </div>
      </div>

      {/* INCLUDED */}
      <div className="container pb-4">
        <div
          className="rounded-4 p-4 mb-4"
          style={{ backgroundColor: "#111827", border: "1px solid #374151" }}
        >
          <h3 className="h5 fw-bold text-white mb-3">
            What’s included (all plans)
          </h3>
          <ul
            className="list-unstyled text-white-50 mb-0"
            style={{ fontSize: ".95rem", lineHeight: 1.5 }}
          >
            {[
              "Personalised structure for the learner’s profile",
              "Templates your child actually uses (not theory)",
              "Simple metrics: what worked / where stuck",
              "Email support between sessions (fair use)",
            ].map((item, idx) => (
              <li key={idx} className="d-flex align-items-start mb-2">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-success me-2 mt-1"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="container pb-5">
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
              <div
                className="h-100 rounded-4 p-3"
                style={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #1f2937",
                }}
              >
                <h4 className="h6 fw-bold text-white mb-2">{box.h}</h4>
                <p
                  className="text-white-50 mb-0"
                  style={{ fontSize: ".95rem" }}
                  dangerouslySetInnerHTML={{ __html: box.p }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="container pb-5">
        <div
          className="rounded-4 p-4 d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3"
          style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
        >
          <div>
            <h2 className="h5 fw-bold text-white mb-2">Next step</h2>
            <p className="text-white-50 m-0" style={{ fontSize: ".95rem" }}>
              We’ll talk calmly about what’s going on, map next steps, and
              you’ll leave with a plan — even if you don’t book.
            </p>
          </div>
          <BookButton />
        </div>
      </div>
    </div>
  );
}
