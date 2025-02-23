import React from "react";
import { Link } from "react-router-dom";
import { FaStore, FaChartLine, FaRobot, FaMobileAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import backgroundImage from "../assets/homepage.webp"; // Ensure the path is correct

// FeatureCard component: renders an individual feature card with frosted dark grey background.
function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="card h-100 text-center border-0"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "0.5rem",
      }}
    >
      <div className="card-body d-flex flex-column">
        <div className="mb-3" style={{ color: "#fff" }}>
          {icon}
        </div>
        <h5 className="card-title text-white">{title}</h5>
        <p className="card-text text-white flex-grow-1">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="position-relative text-light"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image with Dark Overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
          zIndex: -10,
        }}
      ></div>

      {/* Main Content Container */}
      <div className="container" style={{ paddingTop: "120px" }}>
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4">AI Solutions for Small Businesses</h1>
          <p className="lead">
            Struggling with marketing, customer management, or online sales? Our{" "}
            <strong>
              AI-driven solutions automate tasks, boost visibility, and
              streamline operations
            </strong>{" "}
            let you focus on growing your business.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/calendly" className="btn btn-primary btn-lg pulse-glow">
              Get a Free Consultation
            </Link>
            <Link to="/portfolio" className="btn btn-secondary btn-lg">
              See My Work
            </Link>
          </div>
        </div>

        {/* Feature Section */}
        <h2 className="text-center mb-4">How I Help Local Businesses</h2>
        <div className="row">
          <div className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
            <FeatureCard
              icon={<FaStore size={40} />}
              title="Boost Sales"
              description="Improve online and in-store sales with AI-powered marketing and customer engagement."
            />
          </div>
          <div className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
            <FeatureCard
              icon={<FaChartLine size={40} />}
              title="Smarter Decisions"
              description="Use AI-driven analytics to understand customer behaviour and predict trends."
            />
          </div>
          <div className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
            <FeatureCard
              icon={<FaRobot size={40} />}
              title="Automate Tasks"
              description="Save hours by letting AI handle scheduling, invoicing, and customer follow-ups."
            />
          </div>
          <div className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
            <FeatureCard
              icon={<MdSupportAgent size={40} />}
              title="Better Customer Support"
              description="AI chatbots provide instant responses to customer enquiries, boosting satisfaction."
            />
          </div>
          <div className="col-12 col-md-4 mb-4 d-flex align-items-stretch">
            <FeatureCard
              icon={<FaMobileAlt size={40} />}
              title="Mobile-Friendly"
              description="Our solutions ensure your business looks great on any device, reaching more customers."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
