// frontend/src/pages/Services.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaBrain,
  FaLaptopCode,
  FaCalculator,
  FaChalkboardTeacher,
  FaHandsHelping,
} from "react-icons/fa";

import servicesHero from "../assets/services_hero.png"; // copy: ~/Desktop/services.png -> src/assets/services_hero.png

function ServiceCard({ icon, title, points }) {
  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        background:
          "linear-gradient(145deg, rgba(20,30,60,0.75), rgba(10,15,30,0.6))",
        backdropFilter: "blur(10px)",
        borderRadius: "0.75rem",
      }}
    >
      <div className="card-body d-flex flex-column">
        <div
          className="d-flex align-items-center mb-3"
          style={{ color: "#fff" }}
        >
          <span className="me-3">{icon}</span>
          <h3 className="h5 m-0 text-white fw-semibold">{title}</h3>
        </div>
        <ul
          className="mb-0"
          style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}
        >
          {points.map((p, i) => (
            <li key={i} className="mb-2">
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div
      className="container"
      style={{ paddingTop: "120px", paddingBottom: "60px" }}
    >
      {/* Hero: image + copy (no text-on-image clash) */}
      <div className="row align-items-center g-4 mb-5">
        <div className="col-12 col-lg-6">
          <div
            className="rounded-3 shadow-lg overflow-hidden"
            style={{
              background: "#0b1226",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={servicesHero}
              alt="Calm study desk with laptop and maths notes"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div className="col-12 col-lg-6 text-center text-lg-start">
          <h1 className="fw-bold mb-3 text-white">
            Subjects & Specialist Services
          </h1>

          <p
            className="lead mb-3"
            style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}
          >
            Specialist tutoring for <strong>neurodiverse learners</strong> —
            ADHD, Autism and Dyslexia. Calm, predictable, confidence-building
            sessions.
          </p>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "1.05rem",
              lineHeight: "1.7",
              textShadow: "0 1px 4px rgba(0,0,0,0.35)",
            }}
          >
            Subjects: <strong>GCSE & A-Level Computer Science</strong> and{" "}
            <strong>Maths (KS2–KS3)</strong>. Methods are{" "}
            <em>structured, visual, and supportive</em> — reducing cognitive
            load while building lasting understanding and self-belief.
          </p>

          <div className="mt-4">
            <Link to="/pricing" className="btn btn-secondary me-2">
              See Pricing
            </Link>
            <Link to="/calendly" className="btn btn-primary">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Aligned grid: equal-height cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col d-flex">
          <ServiceCard
            icon={<FaBrain size={36} />}
            title="ADHD & ASD-Friendly Learning"
            points={[
              "Short focus blocks and gentle transitions.",
              "Predictable routines with visual schedules.",
              "Worked examples to reduce cognitive load.",
              "Dyslexia-aware materials (spacing, fonts, overlays).",
            ]}
          />
        </div>

        <div className="col d-flex">
          <ServiceCard
            icon={<FaLaptopCode size={36} />}
            title="Computer Science (GCSE & A-Level)"
            points={[
              "Python, algorithms, logic, pseudocode/VB as needed.",
              "NEA mentoring: planning, documentation, testing.",
              "Step-by-step teaching that removes jargon.",
              "Exam boards: OCR, AQA, Edexcel.",
            ]}
          />
        </div>

        <div className="col d-flex">
          <ServiceCard
            icon={<FaCalculator size={36} />}
            title="Maths (KS2–KS3)"
            points={[
              "Secure number facts, fractions, ratio, algebra foundations.",
              "Concrete → visual → abstract progression.",
              "Scaffolded problem-solving and method fluency.",
              "Dyscalculia-aware strategies (colour, pattern, repetition).",
            ]}
          />
        </div>

        <div className="col d-flex">
          <ServiceCard
            icon={<FaChalkboardTeacher size={36} />}
            title="Study Skills & Executive Function"
            points={[
              "Time-management and task planning that sticks.",
              "Revision systems: retrieval, spacing, cue cards.",
              "Working-memory strategies and exam timing practice.",
              "Weekly micro-goals to build momentum and confidence.",
            ]}
          />
        </div>

        <div className="col d-flex">
          <ServiceCard
            icon={<FaHandsHelping size={36} />}
            title="Parent Partnership & School Alignment"
            points={[
              "Regular feedback and simple progress tracking.",
              "Align with school targets and EHCP where applicable.",
              "Clear expectations and shared strategies for home.",
              "Flexible online or Derbyshire-based sessions.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
