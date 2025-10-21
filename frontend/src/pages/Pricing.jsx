import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faCheck } from "@fortawesome/free-solid-svg-icons";
import pricingHero from "../assets/pricing.webp"; // <-- make sure this exists

const primaryColor = "#0d6efd";

/* ---------------- Countdown ---------------- */
const calculateTimeLeft = (expiry) => {
  const diff = expiry.getTime() - new Date().getTime();
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownTimer = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiry));
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calculateTimeLeft(expiry)), 1000);
    return () => clearInterval(t);
  }, [expiry]);

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center mb-4">
        <p className="fs-5 text-white fw-bold mb-1">Offer period ended</p>
        <p className="text-white-50 m-0">Next promotion expected Summer 2025</p>
      </div>
    );
  }

  return (
    <div className="text-center mb-4">
      <p className="fs-5 fw-bold text-white mb-1">
        Introductory Offer – valid until{" "}
        <span className="text-info">1 April 2025</span>
      </p>
      <p className="display-6 fw-bold text-white m-0">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </p>
    </div>
  );
};

/* ---------------- Card ---------------- */
const PricingCard = ({
  title,
  hourlyRate,
  blockPrice,
  subRate,
  features,
  icon,
  pricingMode,
}) => {
  const navigate = useNavigate();
  const price = pricingMode === "subscription" ? subRate : blockPrice;

  return (
    <div
      className="card h-100 border-0 shadow-lg"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.2)",
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
          className="fs-4 fw-bold mb-3 text-center"
          style={{ color: primaryColor }}
        >
          £{price}
          <span className="fs-6 text-white-50 ms-1">
            {pricingMode === "subscription" ? "/month" : " / block"}
          </span>
        </div>

        <ul className="list-unstyled mb-4 text-white-50 text-start">
          {features.map((f, i) => (
            <li key={i} className="d-flex align-items-start mb-2">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-success me-2 mt-1"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/calendly")}
          className="btn btn-primary mt-auto fw-semibold"
        >
          Book a Free Consultation
        </button>
      </div>
    </div>
  );
};

/* ---------------- Page ---------------- */
export default function Pricing() {
  const [pricingMode, setPricingMode] = useState("oneOff");
  const offerExpiry = new Date("2025-04-01T00:00:00");

  // Subscription deliberately cheaper than block.
  const packages = [
    {
      title: "Foundation Plan",
      hourlyRate: 40,
      blockPrice: 160,
      subRate: 140,
      icon: faBrain,
      features: [
        "£40/hr or £160 per 4-hour block (1 hr × 4 sessions)",
        "Core tuition – Computer Science or Maths (KS2–GCSE)",
        "Structured lessons focused on mastery & confidence",
        "Best for building foundations or steady catch-up",
      ],
    },
    {
      title: "Focus Plan",
      hourlyRate: 55,
      blockPrice: 220,
      subRate: 190,
      icon: faBrain,
      features: [
        "£55/hr or £220 per 4-hour block (1 hr × 4 sessions)",
        "ADHD/ASD/Dyslexia-friendly resources & scaffolds",
        "Weekly progress summaries for parents",
        "Aligned with AQA, OCR, or Edexcel",
      ],
    },
    {
      title: "Performance Plan",
      hourlyRate: 70,
      blockPrice: 280,
      subRate: 240,
      icon: faBrain,
      features: [
        "£70/hr or £280 per 4-hour block (1 hr × 4 sessions)",
        "Full exam strategy, timed practice, & revision",
        "Parent reviews with next-step planning",
        "Ideal for GCSE/A-Level exam preparation",
      ],
    },
  ];

  return (
    <div className="text-light">
      {/* ---------- INLINE HERO (no cropping) ---------- */}
      <div
        className="container"
        style={{ paddingTop: "90px", paddingBottom: "10px" }}
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6">
            <div
              className="rounded-4 shadow-lg overflow-hidden"
              style={{
                background: "#0b1226",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <img
                src={pricingHero}
                alt="Calm student at laptop"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/10",
                  objectFit: "contain",
                  objectPosition: "center",
                  backgroundColor: "rgba(0,0,0,0.05)", // soft fill behind image
                }}
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h1 className="display-5 fw-bold mb-3">
              Fair, Simple, Transparent Pricing
            </h1>
            <p className="lead text-white-50 mb-3">
              Flexible options to suit your goals: buy a 4-hour block or save
              with a monthly subscription. Clear, predictable costs — no
              surprises.
            </p>

            {/* small neutral pills to echo Home */}
            <div className="d-flex flex-wrap gap-2 mb-2">
              {[
                "Block or Monthly",
                "Cancel any time",
                "Online or Derbyshire",
              ].map((t) => (
                <span
                  key={t}
                  className="badge rounded-pill"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "#fff",
                    fontWeight: 500,
                    padding: ".5rem .8rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Plans ---------- */}
      <div className="container py-5" style={{ filter: "brightness(1.06)" }}>
        <CountdownTimer expiry={offerExpiry} />

        <h2 className="text-center fw-bold mb-4 text-white">Tutoring Plans</h2>

        <div className="d-flex justify-content-center mb-4">
          <button
            onClick={() => setPricingMode("oneOff")}
            className={`btn me-2 fw-semibold ${
              pricingMode === "oneOff" ? "btn-primary" : "btn-outline-light"
            }`}
          >
            One-Off Block
          </button>
          <button
            onClick={() => setPricingMode("subscription")}
            className={`btn fw-semibold ${
              pricingMode === "subscription"
                ? "btn-primary"
                : "btn-outline-light"
            }`}
          >
            Monthly Subscription
          </button>
        </div>

        <div className="row">
          {packages.map((pkg, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4 mb-4">
              <PricingCard {...pkg} pricingMode={pricingMode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
