import React from "react";
import { Link } from "react-router-dom";
import {
  FaBrain,
  FaLaptopCode,
  FaCalculator,
  FaHandsHelping,
  FaChalkboardTeacher,
} from "react-icons/fa";

import heroImage from "../assets/home.webp"; // new calm hero image
import backgroundImage from "../assets/homepage.webp"; // subtle background fallback
import tutorImage from "../assets/tutor.webp"; // your tutor portrait

// Shared card component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
      <div
        className="card h-100 text-center border-0 shadow-lg"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          backdropFilter: "blur(10px)",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div className="card-body d-flex flex-column text-white">
          <div className="mb-3">{icon}</div>
          <h5 className="fw-bold mb-2">{title}</h5>
          <p className="flex-grow-1" style={{ color: "rgba(255,255,255,0.9)" }}>
            {description}
          </p>
        </div>
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
      {/* Fallback background gradient */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.25)",
          zIndex: -10,
        }}
      />

      {/* Hero section */}
      <div className="container" style={{ paddingTop: "90px" }}>
        <div className="row align-items-center mb-5 g-4">
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h1 className="display-5 fw-bold mb-3 text-white">
              Calm, Structured, Confident Learning
            </h1>
            <p className="lead" style={{ color: "rgba(255,255,255,0.85)" }}>
              Specialist one-to-one tuition for{" "}
              <strong>neurodiverse learners</strong> — supporting{" "}
              <strong>ADHD, Autism, and Dyslexia</strong> with evidence-based
              teaching. GCSE & A-Level <strong>Computer Science</strong> and{" "}
              <strong>KS2–KS4 Maths</strong> taught with clarity and care.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
              <Link
                to="/calendly"
                className="btn btn-primary btn-lg fw-semibold pulse-glow"
              >
                Book a Free Consultation
              </Link>
              <Link
                to="/services"
                className="btn btn-outline-light btn-lg fw-semibold"
              >
                Explore Subjects
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center">
            <img
              src={heroImage}
              alt="Calm learning environment"
              className="rounded-4 shadow-lg"
              style={{
                width: "100%",
                maxWidth: "540px",
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
        </div>

        {/* Divider line */}
        <hr
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            margin: "3rem 0 2rem 0",
          }}
        />

        {/* Tutor portrait */}
        <div className="text-center mb-4">
          <img
            src={tutorImage}
            alt="James Wallace — Specialist Tutor"
            className="rounded-circle shadow-lg"
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
              border: "3px solid rgba(255,255,255,0.85)",
            }}
          />
          <p
            className="mt-3 mb-0 text-white fw-semibold"
            style={{ fontSize: "0.95rem", opacity: 0.9 }}
          >
            <small>
              <strong>BSc Computing | MEd | QTS | Enhanced DBS</strong>
            </small>
          </p>
          <p
            className="text-white-50 mt-2"
            style={{ fontSize: "1.05rem", fontStyle: "italic" }}
          >
            Helping neurodiverse learners unlock calm, confident understanding.
          </p>
        </div>

        {/* Feature section */}
        <h2 className="text-center fw-bold mb-5 text-white">
          How I Help Students Thrive
        </h2>
        <div className="row">
          <FeatureCard
            icon={<FaLaptopCode size={36} />}
            title="Computer Science Mastery"
            description="Step-by-step teaching of algorithms, logic, and Python projects for GCSE & A-Level success."
          />
          <FeatureCard
            icon={<FaCalculator size={36} />}
            title="Maths Confidence"
            description="Visual and structured learning that builds fluency, problem-solving, and lasting understanding."
          />
          <FeatureCard
            icon={<FaBrain size={36} />}
            title="ADHD & ASD-Friendly Learning"
            description="Low-pressure sessions using focus blocks, visual cues, and repetition to support memory and focus."
          />
          <FeatureCard
            icon={<FaChalkboardTeacher size={36} />}
            title="Exam Technique & Study Skills"
            description="Predictable routines, scaffolding, and active recall strategies for confident performance."
          />
          <FeatureCard
            icon={<FaHandsHelping size={36} />}
            title="Parent Partnership"
            description="Regular communication, progress tracking, and shared goals to reinforce success at home."
          />
        </div>
      </div>
    </div>
  );
}
