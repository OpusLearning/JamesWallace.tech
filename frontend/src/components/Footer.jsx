import { Link } from "react-router-dom";
import { GUIDES_HUB, ICO, REGISTRATIONS } from "../data/facts";

// The site's own icons for the registrations strip. They are deliberately not the bodies' logos.
const BADGE_ICONS = {
  shield: (
    <>
      <path d="M12 2.8 19 5.6v5.2c0 4.5-2.9 8.3-7 10.4-4.1-2.1-7-5.9-7-10.4V5.6l7-2.8Z" />
      <rect x="9" y="11" width="6" height="4.6" rx="1" />
      <path d="M10.2 11V9.6a1.8 1.8 0 0 1 3.6 0V11" />
    </>
  ),
  book: (
    <>
      <path d="M12 7.2C10 5.8 7.3 5.2 4.5 5.2v12.4c2.8 0 5.5.6 7.5 2 2-1.4 4.7-2 7.5-2V5.2c-2.8 0-5.5.6-7.5 2Z" />
      <path d="M12 7.2v12.4" />
    </>
  ),
  cross: <path d="M9.8 4.5h4.4v5.3h5.3v4.4h-5.3v5.3H9.8v-5.3H4.5V9.8h5.3Z" />,
};

function badgeIcon(name) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {BADGE_ICONS[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="jw-footer">
      <div className="jw-footer-grid">
        <div className="jw-footer-brand"><p className="jw-brand-name">James Wallace</p><p className="jw-brand-subtitle">Specialist teaching for young people who need a different route through education.</p></div>
        <nav className="jw-footer-nav" aria-label="Footer navigation"><ul>
          <li><Link to="/credentials">Credentials</Link></li><li><Link to="/compliance">Compliance</Link></li><li><Link to="/privacy">Privacy</Link></li>
          <li><a href="https://blog.jameswallace.tech" target="_blank" rel="noopener noreferrer">Journal<span aria-hidden="true"> ↗</span></a></li>
          <li><a href={GUIDES_HUB.url}>Parent guides</a></li>
          <li><a href="https://blog.jameswallace.tech/councils/">Find your council&apos;s policies</a></li>
          <li><a href="https://blog.jameswallace.tech/councils/assistant/">Council policy assistant</a></li>
          <li><a href="https://portal.jameswallace.tech" target="_blank" rel="noopener noreferrer">Portal<span aria-hidden="true"> ↗</span></a></li>
        </ul></nav>
      </div>
      <ul className="jw-footer-badges" aria-label="Registrations and training">
        {REGISTRATIONS.map((r) => (
          <li key={r.key} className={r.held ? "jw-badge" : "jw-badge jw-badge-pending"}>
            {r.image
              ? <img className="jw-badge-logo" src={r.image} alt={r.imageAlt} width={r.imageSize[0]} height={r.imageSize[1]} loading="lazy" />
              : <span className="jw-badge-mark" aria-hidden="true">{badgeIcon(r.icon)}</span>}
            <span className="jw-badge-text">
              <span className="jw-badge-name">{r.name}{r.held ? "" : <span className="jw-badge-chip">Pending</span>}</span>
              <span className="jw-badge-detail">{r.href ? <a href={r.href} target="_blank" rel="noopener noreferrer">{r.detail}<span aria-hidden="true"> ↗</span></a> : r.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="jw-footer-bottom">
        <span>© 2026 James Wallace Education Ltd. Registered in England and Wales, company number 17479328. ICO registration number {ICO.registrationNumber}. Registered office: 71–75 Shelton Street, Covent Garden, London WC2H 9JQ.</span>
        <span className="jw-footer-legal">
          <Link to="/privacy">Privacy</Link> · <Link to="/cookies">Cookies</Link> ·{" "}
          <Link to="/accessibility">Accessibility</Link> · <Link to="/terms">Terms</Link> ·{" "}
          <Link to="/complaints">Complaints</Link>
        </span>
        <span><a href="mailto:hello@jameswallace.tech">hello@jameswallace.tech</a> · <a href="tel:07897021077">07897 021077</a></span>
      </div>
    </footer>
  );
}
