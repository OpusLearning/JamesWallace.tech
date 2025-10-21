import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaChalkboardTeacher,
  FaChild,
  FaGraduationCap,
  FaHandsHelping,
  FaLaptopCode,
  FaCogs,
  FaRocket,
} from "react-icons/fa";

import tutorImage from "../assets/tutor.webp";
import specialistHero from "../assets/specialist.png";
import backgroundImage from "../assets/homepage.webp";

export default function About() {
  return (
    <div
      className="position-relative text-light"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle page background */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
          zIndex: -2,
        }}
      />

      <div
        className="container"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >
        {/* ===== Hero section ===== */}
        <div className="row align-items-center g-4 mb-5">
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3 shadow-lg overflow-hidden"
              style={{
                background: "#0b1226",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={specialistHero}
                alt="Calm tutoring environment with student at a laptop"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "420px",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </div>

          <div className="col-12 col-lg-6 text-center text-lg-start">
            <motion.h1
              className="display-5 fw-bold mb-3 text-white"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Calm, Structured, Confident Learning
            </motion.h1>

            <p
              className="lead mb-3"
              style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}
            >
              Specialist tutoring for <strong>neurodiverse learners</strong> —
              ADHD, Autism and Dyslexia. GCSE & A-Level{" "}
              <strong>Computer Science</strong> and{" "}
              <strong>KS2–KS3 Maths</strong>, taught with clarity and care.
            </p>

            {/* Slim credential badges */}
            <div className="d-flex flex-wrap gap-2 mt-3 mb-2">
              {[
                "BSc Computing",
                "MEd",
                "QTS",
                "Enhanced DBS",
                "ASD Awareness",
              ].map((t) => (
                <span
                  key={t}
                  className="badge rounded-pill"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "#fff",
                    fontWeight: 500,
                    padding: "0.5rem .8rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: "1.05rem",
                lineHeight: "1.7",
                textShadow: "0 1px 4px rgba(0,0,0,0.35)",
              }}
            >
              Parents get clear communication and practical strategies that work
              at home. Students feel seen, supported, and capable — and the
              grades follow.
            </p>
          </div>
        </div>

        {/* ===== Optional portrait ===== */}
        {tutorImage && (
          <div className="text-center mb-5">
            <img
              src={tutorImage}
              alt="James Wallace — Specialist Tutor"
              className="rounded-circle shadow"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                border: "3px solid rgba(255,255,255,.85)",
              }}
            />
          </div>
        )}

        {/* ===== Teaching Focus ===== */}
        <div className="text-center mb-4">
          <h3 className="h4 fw-bold text-white">My Teaching Focus</h3>
        </div>
        <div className="row">
          <FocusCard
            icon={<FaLaptopCode size={40} />}
            title="Computer Science (GCSE & A-Level)"
            description="Python, algorithms, logic, and NEA mentoring — clear, step-by-step teaching that builds mastery."
          />
          <FocusCard
            icon={<FaChalkboardTeacher size={40} />}
            title="Maths (KS2–KS3)"
            description="Concrete → visual → abstract progression for secure number facts and method fluency."
          />
          <FocusCard
            icon={<FaBrain size={40} />}
            title="ADHD & ASD Support"
            description="Short focus blocks, visual cues, and routine — supporting attention and working memory."
          />
          <FocusCard
            icon={<FaChild size={40} />}
            title="Individualised Learning"
            description="Teaching adapted to each learner’s pace, interests, and goals — with simple, actionable next steps."
          />
        </div>

        {/* ===== Core Values ===== */}
        <div className="text-center mt-5 mb-4">
          <h3 className="h4 fw-bold text-white">Core Values</h3>
        </div>
        <div className="row">
          <FocusCard
            icon={<FaHandsHelping size={40} />}
            title="Empathy & Partnership"
            description="Regular parent updates; alignment with school targets and EHCP where relevant."
          />
          <FocusCard
            icon={<FaGraduationCap size={40} />}
            title="Evidence-Based Practice"
            description="Grounded in cognitive science and proven SEN strategies that actually stick."
          />
          <FocusCard
            icon={<FaCogs size={40} />}
            title="Structure & Clarity"
            description="Predictable lesson flow and visual frameworks to reduce overwhelm."
          />
          <FocusCard
            icon={<FaRocket size={40} />}
            title="Growth & Confidence"
            description="Small wins compound into momentum; students learn to trust their process."
          />
        </div>
      </div>
    </div>
  );
}

function FocusCard({ icon, title, description }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <motion.div
        className="card h-100 text-center"
        whileHover={{ scale: 1.05 }}
        style={{
          background:
            "linear-gradient(145deg, rgba(20,30,60,0.75), rgba(10,15,30,0.6))",
          backdropFilter: "blur(10px)",
          borderRadius: "0.75rem",
          border: "none",
        }}
      >
        <div className="card-body d-flex flex-column">
          <div className="mb-3 text-white">{icon}</div>
          <h5 className="card-title text-white fw-semibold">{title}</h5>
          <p
            className="card-text text-white flex-grow-1"
            style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}
          >
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
