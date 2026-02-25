import { Link, useLocation } from "react-router-dom";

export default function Header({ onA11yClick }) {
  const { pathname } = useLocation();
  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="jw-nav">
      <div className="jw-nav-inner">
        {/* Logo */}
        <Link to="/" className="jw-nav-logo">
          <span className="jw-nav-logo-primary">ND Services</span>
          <span className="jw-nav-logo-sub">EOTAS &amp; Alternative Provision</span>
        </Link>

        {/* Nav links */}
        <nav className="jw-nav-links">
          <Link to="/" className={"jw-nav-link" + (isActive("/") ? " active" : "")}>
            Home
          </Link>
          <Link to="/provision" className={"jw-nav-link" + (isActive("/provision") ? " active" : "")}>
            Provision
          </Link>
          <Link to="/for-las" className={"jw-nav-link" + (isActive("/for-las") ? " active" : "")}>
            For LAs
          </Link>
          <Link to="/platform" className={"jw-nav-link" + (isActive("/platform") ? " active" : "")}>
            Platform
          </Link>
          <Link to="/compliance" className={"jw-nav-link" + (isActive("/compliance") ? " active" : "")}>
            Compliance
          </Link>
          <Link to="/about" className={"jw-nav-link" + (isActive("/about") ? " active" : "")}>
            About
          </Link>
          <a
            href="https://blog.jameswallace.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="jw-nav-link external"
          >
            Blog ↗
          </a>
          <a
            href="https://portal.jameswallace.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="jw-nav-link external"
            style={{ color: "var(--action)", fontWeight: 600 }}
          >
            Portal ↗
          </a>

          {/* Accessibility toggle */}
          <button
            className="jw-a11y-btn"
            aria-label="Accessibility options"
            onClick={onA11yClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="5" r="1.5" />
              <path d="M5 8h14M12 8v5m-4 3 4-3 4 3M8 21l2-5M16 21l-2-5" />
            </svg>
          </button>

          {/* CTA */}
          <Link to="/contact" className="jw-nav-cta">
            Make a Referral
          </Link>
        </nav>
      </div>
    </header>
  );
}
