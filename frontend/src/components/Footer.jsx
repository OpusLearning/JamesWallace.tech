import { Link } from "react-router-dom";
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

export default function Footer() {
  return (
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
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
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
}
