import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="jw-footer">
      <div className="jw-container">
        <div className="jw-footer-grid">
          {/* Branding + social */}
          <div>
            <div className="jw-footer-logo-name">ND Services</div>
            <div className="jw-footer-logo-tagline">
              EOTAS &amp; Alternative Provision
            </div>

            <div className="jw-footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=61573496098584"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://x.com/WallaceJam6591"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/jameswallace.tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/james-wallace-979432352/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCQfo7QoY5ByWgk0F1_3hEdw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@james.wallace950"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <ul className="jw-footer-links">
              <li>
                <Link to="/provision">Our Provision</Link>
              </li>
              <li>
                <Link to="/for-las">For Local Authorities</Link>
              </li>
              <li>
                <Link to="/platform">Platform</Link>
              </li>
              <li>
                <Link to="/compliance">Compliance</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Make a Referral</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <a
                  href="https://blog.jameswallace.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog ↗
                </a>
              </li>
              <li>
                <a
                  href="https://audit.jameswallace.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ND Audit Tool ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="jw-footer-bottom">
          <span>© 2026 James Wallace. All rights reserved.</span>
          &ensp;·&ensp;
          <a href="mailto:hello@jameswallace.tech">hello@jameswallace.tech</a>
          &ensp;·&ensp;
          <a href="tel:05603683408">056 0368 3408</a>
        </div>
      </div>
    </footer>
  );
}
