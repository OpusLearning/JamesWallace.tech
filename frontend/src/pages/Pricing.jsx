import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversalAccess,
  faBrain,
  faWrench,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

// Set your primary colour as blue (#0d6efd)
const primaryColor = "#0d6efd";

// Helper: Multiply discounted price by 2 to compute regular price.
const getRegularPrice = (price) => {
  if (typeof price === "number") {
    return `£${(price * 2).toFixed(0)}`;
  } else {
    const match = price.match(/£([\d.]+)/);
    if (match) {
      const regular = parseFloat(match[1]) * 2;
      return `£${regular.toFixed(0)}/month`;
    }
    return price;
  }
};

const PricingCard = ({
  title,
  oneOffPrice,
  subscriptionPrice,
  features,
  icon,
  pricingMode,
  isDiscountActive,
}) => {
  const navigate = useNavigate();
  const discountedPrice =
    pricingMode === "subscription" ? subscriptionPrice : oneOffPrice;
  const regularPrice = getRegularPrice(discountedPrice);

  const goToCalendly = () => {
    navigate("/calendly");
  };

  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "0.5rem",
      }}
    >
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-center mb-3">
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            style={{ color: primaryColor }}
          />
        </div>
        <h3 className="h5 fw-bold text-center" style={{ color: "#fff" }}>
          {title}
        </h3>
        <div
          className="fs-4 fw-bold mb-3 text-center"
          style={{ color: primaryColor }}
        >
          {isDiscountActive ? (
            <>
              <span className="text-muted text-decoration-line-through me-2">
                {regularPrice}
              </span>
              <span>
                {typeof discountedPrice === "number"
                  ? `£${discountedPrice}`
                  : discountedPrice}
              </span>
            </>
          ) : (
            <span>{regularPrice}</span>
          )}
        </div>
        <ul className="list-unstyled mb-4">
          {features.map((feature, index) => (
            <li key={index} className="d-flex align-items-start mb-2">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-success me-2 mt-1"
              />
              <span style={{ color: "#fff" }}>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          className="btn mt-auto pulse-glow"
          onClick={goToCalendly}
          style={{
            backgroundColor: primaryColor,
            borderColor: primaryColor,
            color: "#fff",
          }}
        >
          Book a Free Consultation
        </button>
      </div>
    </div>
  );
};

const calculateTimeLeft = (expiry) => {
  const difference = expiry.getTime() - new Date().getTime();
  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownTimer = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiry));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiry));
    }, 1000);
    return () => clearInterval(timer);
  }, [expiry]);

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center mb-4">
        <p className="fs-5 text-white fw-bold">Offer expired</p>
      </div>
    );
  }

  return (
    <div className="text-center mb-4">
      <p className="fs-5 text-white fw-bold">
        Limited-Time Offer: 50% Discount until April 1, 2025!
      </p>
      <p className="display-6 fw-bold text-white">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </p>
    </div>
  );
};

const Pricing = () => {
  const [pricingMode, setPricingMode] = useState("oneOff");

  // Set the offer expiry date (April 1, 2025)
  const offerExpiry = new Date("2025-04-01T00:00:00");
  const isDiscountActive = new Date() < offerExpiry;

  // Pricing packages with discounted prices.
  const pricingPackages = [
    {
      title: "Single Page (One-page site)",
      oneOffPrice: 99,
      subscriptionPrice: 10,
      icon: faUniversalAccess,
      features: [
        "Cost-effective one-page design",
        "Modern, responsive layout",
        "Perfect for establishing your online presence",
      ],
    },
    {
      title: "Basic (Starter site)",
      oneOffPrice: 199,
      subscriptionPrice: 20,
      icon: faUniversalAccess,
      features: [
        "3–5 page professional website",
        "Essential pages including a contact form",
        "Ideal for small businesses entering the digital world",
      ],
    },
    {
      title: "Silver (Standard site)",
      oneOffPrice: 299,
      subscriptionPrice: 30,
      icon: faUniversalAccess,
      features: [
        "Up to 5-page custom website",
        "Mobile-friendly and SEO optimised",
        "Showcases your brand identity",
      ],
    },
    {
      title: "Gold (Expanded site)",
      oneOffPrice: 429,
      subscriptionPrice: 40,
      icon: faUniversalAccess,
      features: [
        "Expanded website with 5–10 pages",
        "Enhanced customisation and functionality",
        "Supports your growing business needs",
      ],
    },
    {
      title: "Platinum (Premium site)",
      oneOffPrice: 825,
      subscriptionPrice: 60,
      icon: faUniversalAccess,
      features: [
        "Comprehensive, tailor-made website solution",
        "Includes professional branding, SEO fundamentals and training",
        "Elevates your online presence",
      ],
    },
    {
      title: "Shopping Cart (E-commerce)",
      oneOffPrice: 479,
      subscriptionPrice: 50,
      icon: faUniversalAccess,
      features: [
        "User-friendly online store setup",
        "Responsive design for a seamless shopping experience",
        "Ideal for small or boutique shops",
      ],
    },
    {
      title: "Basic Accessibility Website",
      oneOffPrice: 249,
      subscriptionPrice: 25,
      icon: faUniversalAccess,
      features: [
        "3-page fully accessible website",
        "Basic WCAG 2.1 compliance",
        "Mobile-responsive and SEO friendly",
      ],
    },
    {
      title: "Standard AI-Enhanced Website",
      oneOffPrice: 499,
      subscriptionPrice: 35,
      icon: faUniversalAccess,
      features: [
        "6-page website with AI-powered accessibility tools",
        "WCAG 2.1 AA compliant",
        "Custom branding and automated monitoring",
      ],
    },
    {
      title: "Starter AI Automation Package",
      oneOffPrice: 199,
      subscriptionPrice: 15,
      icon: faBrain,
      features: [
        "AI-powered workflow automation",
        "Efficient task scheduling",
        "Integrated chatbot for common queries",
      ],
    },
    {
      title: "Standard Maintenance",
      oneOffPrice: 49,
      subscriptionPrice: 49,
      icon: faWrench,
      features: [
        "Regular security updates",
        "Timely bug fixes",
        "Ongoing accessibility improvements",
      ],
    },
    {
      title: "Pro WCAG Compliance Support",
      oneOffPrice: 99,
      subscriptionPrice: 99,
      icon: faWrench,
      features: [
        "Monthly WCAG audits",
        "Accessibility bug fixes",
        "Automated compliance reports",
      ],
    },
  ];

  return (
    <div className="container py-4">
      <CountdownTimer expiry={offerExpiry} />
      <h1 className="text-center fw-bold mb-4" style={{ color: "#fff" }}>
        Pricing Plans
      </h1>
      <div className="d-flex justify-content-center mb-4">
        <button
          onClick={() => setPricingMode("oneOff")}
          className={`btn me-2 ${
            pricingMode === "oneOff" ? "btn-primary" : "btn-light"
          }`}
          style={{
            backgroundColor:
              pricingMode === "oneOff" ? primaryColor : undefined,
            borderColor: pricingMode === "oneOff" ? primaryColor : undefined,
          }}
        >
          One-Off Payment
        </button>
        <button
          onClick={() => setPricingMode("subscription")}
          className={`btn ${
            pricingMode === "subscription" ? "btn-primary" : "btn-light"
          }`}
          style={{
            backgroundColor:
              pricingMode === "subscription" ? primaryColor : undefined,
            borderColor:
              pricingMode === "subscription" ? primaryColor : undefined,
          }}
        >
          Subscription
        </button>
      </div>
      <div className="row">
        {pricingPackages.map((pkg, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <PricingCard
              pricingMode={pricingMode}
              isDiscountActive={isDiscountActive}
              {...pkg}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
