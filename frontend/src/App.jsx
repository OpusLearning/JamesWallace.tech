import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Ensuring styles are applied
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Home = () => (
  <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative w-100">
    {/* Background Overlay */}
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{
        backgroundImage: "url('/topography.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        mixBlendMode: "overlay",
        opacity: "0.2", // Dialed down for subtle effect
      }}
    ></div>

    {/* Hero Content */}
    <div className="position-relative z-1 container px-4">
      <h1 className="display-4 fw-bold text-light mx-auto">
        Transform Your Local Business with AI
      </h1>
      <p
        className="lead text-light opacity-75 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        At <strong>JamesWallace.tech</strong>, we empower small and medium-sized
        enterprises (SMEs) with cutting-edge AI solutions that automate tasks,
        boost your online presence, and streamline operations.
      </p>
      <Link to="/get-started" className="btn btn-primary btn-lg mt-3 shadow-lg">
        Get Started
      </Link>
    </div>
  </div>
);

const About = () => (
  <div className="container text-center py-5">
    <h1 className="display-4 fw-bold about-text">About James Wallace</h1>
    <p className="lead about-text">
      Learn more about how we leverage AI to empower businesses with smart
      automation and data-driven insights.
    </p>
  </div>
);

const GetStarted = () => (
  <div className="container text-center py-5">
    <h1 className="display-4 fw-bold get-started-text">Get Started</h1>
    <p className="lead get-started-text">
      Ready to grow your business? Contact us today for AI-driven solutions.
    </p>
  </div>
);

const Footer = () => (
  <footer className="bg-dark text-white text-center py-4 mt-auto w-100">
    <p>&copy; 2025 James Wallace. All rights reserved.</p>
    <p>
      <Link to="/privacy" className="text-white text-decoration-none">
        Privacy Policy
      </Link>{" "}
      |{" "}
      <Link to="/contact" className="text-white text-decoration-none">
        Contact
      </Link>
    </p>

    {/* Social Media Icons */}
    <div className="footer-social d-flex justify-content-center gap-3 mt-3">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube />
      </a>
      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
        <FaTiktok />
      </a>
    </div>

    {/* Contact Info */}
    <div className="footer-contact mt-2">
      <p>
        <FaEnvelope /> Email:{" "}
        <a
          href="mailto:hello@jameswallace.tech"
          className="text-white text-decoration-none"
        >
          hello@jameswallace.tech
        </a>
      </p>
      <p>
        <FaPhone /> Phone:{" "}
        <a href="tel:05603683408" className="text-white text-decoration-none">
          056 0368 3408
        </a>
      </p>
    </div>
  </footer>
);

const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <header className="navbar navbar-dark bg-dark fixed-top w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h2 className="text-white fw-bold m-0">JamesWallace.tech</h2>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/get-started" className="nav-link text-white">
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow-1 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </main>

      <Footer />
    </div>
  </Router>
);

export default App;
