import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { GUIDES_HUB } from "../data/facts";

// LOOK-SITE-1 item 6: at most seven things in the desktop bar, all at least 15px. Four direct
// links, one "Resources" disclosure, the conversation button and the accessibility icon. Portal
// moved to the footer.
const links = [
  { to: "/tuition", label: "Families" },
  { to: "/agencies", label: "Agencies" },
  { to: "/for-las", label: "Local authorities" },
  { to: "/about", label: "About" },
];

const resources = [
  { href: "https://blog.jameswallace.tech", label: "Journal" },
  { href: GUIDES_HUB.url, label: "Parent guides" },
  { href: "https://blog.jameswallace.tech/councils/", label: "Council policies" },
  { href: "https://blog.jameswallace.tech/councils/assistant/", label: "Council assistant" },
  { href: "https://blog.jameswallace.tech/tutors/", label: "Tutor Handbook" },
];

export default function Header({ onA11yClick }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const menuToggle = useRef(null);
  const resourcesToggle = useRef(null);
  const resourcesMenu = useRef(null);
  const isActive = (path) => path === "/" ? pathname === "/" : pathname.startsWith(path);

  useEffect(() => { setMenuOpen(false); setResourcesOpen(false); }, [pathname]);

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

  // The Resources disclosure: Escape closes and returns focus; a click or tap outside closes it.
  useEffect(() => {
    if (!resourcesOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        resourcesToggle.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (resourcesMenu.current?.contains(event.target) || resourcesToggle.current?.contains(event.target)) return;
      setResourcesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [resourcesOpen]);

  const resourceItems = () => (resourcesMenu.current ? [...resourcesMenu.current.querySelectorAll("a")] : []);

  const onResourcesKeyDown = (event) => {
    const items = resourceItems();
    const inMenu = resourcesMenu.current?.contains(document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!resourcesOpen) {
        setResourcesOpen(true);
        requestAnimationFrame(() => resourceItems()[0]?.focus());
      } else {
        const i = items.indexOf(document.activeElement);
        (items[i + 1] || items[0])?.focus();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!resourcesOpen) {
        setResourcesOpen(true);
        requestAnimationFrame(() => { const next = resourceItems(); next[next.length - 1]?.focus(); });
      } else {
        const i = items.indexOf(document.activeElement);
        (items[i - 1] || items[items.length - 1])?.focus();
      }
    } else if (event.key === "Home" && inMenu) {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End" && inMenu) {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

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
              <li className="jw-nav-resources" onKeyDown={onResourcesKeyDown}>
                <button
                  ref={resourcesToggle}
                  type="button"
                  className="jw-nav-link"
                  aria-expanded={resourcesOpen}
                  aria-controls="resources-menu"
                  aria-haspopup="true"
                  onClick={() => setResourcesOpen((open) => !open)}
                >
                  Resources
                  <svg className="jw-nav-caret" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <ul ref={resourcesMenu} id="resources-menu" className={`jw-nav-submenu${resourcesOpen ? " is-open" : ""}`} aria-label="Resources">
                  <li className="jw-nav-subhead" aria-hidden="true">Resources</li>
                  {resources.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="jw-nav-sublink">{label}<span aria-hidden="true"> ↗</span></a>
                    </li>
                  ))}
                </ul>
              </li>
              <li><Link to="/contact" className="jw-nav-link jw-nav-action">Start a conversation</Link></li>
              {onA11yClick && (
                <li>
                  <button type="button" className="jw-nav-link jw-nav-a11y" onClick={onA11yClick} aria-label="Accessibility preferences">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="5" r="1.7" /><path d="M5 8.5h14M12 8.5v5m0 0-3 6m3-6 3 6" /></svg>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

Header.propTypes = { onA11yClick: PropTypes.func };
