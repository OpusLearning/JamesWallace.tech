import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const links = [
  { to: "/tuition", label: "Families / Tuition" },
  { to: "/agencies", label: "Agencies" },
  { to: "/for-las", label: "Local authorities" },
  { to: "/about", label: "About" },
];

export default function Header({ onA11yClick }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef(null);
  const isActive = (path) => path === "/" ? pathname === "/" : pathname.startsWith(path);
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape" || event.target.closest("dialog[open]")) return;
      setMenuOpen(false);
      menuToggle.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <>
      <a className="jw-skip-link" href="#main-content">Skip to main content</a>
      <header className="jw-header">
        <div className="jw-header-inner">
          <Link to="/" className="jw-brand" aria-label="James Wallace, home"><span className="jw-brand-name">James Wallace</span><span className="jw-brand-subtitle">Specialist teaching</span></Link>
          <button ref={menuToggle} type="button" className="jw-menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="jw-menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
          <nav id="primary-navigation" className={`jw-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
            <ul className="jw-nav-list">
              {links.map(({ to, label }) => <li key={to}><Link to={to} className={`jw-nav-link${isActive(to) ? " is-active" : ""}`} aria-current={isActive(to) ? "page" : undefined}>{label}</Link></li>)}
              <li><a href="https://blog.jameswallace.tech" target="_blank" rel="noopener noreferrer" className="jw-nav-link">Journal<span aria-hidden="true"> ↗</span></a></li>
              <li><Link to="/contact" className="jw-nav-link jw-nav-action">Start a conversation</Link></li>
              <li><a href="https://portal.jameswallace.tech" target="_blank" rel="noopener noreferrer" className="jw-nav-link jw-nav-portal">Portal<span aria-hidden="true"> ↗</span></a></li>
              {onA11yClick && <li><button type="button" className="jw-nav-link jw-nav-a11y" onClick={onA11yClick}>Accessibility</button></li>}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

Header.propTypes = { onA11yClick: PropTypes.func };
