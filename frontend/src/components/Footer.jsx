import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="jw-footer">
      <div className="jw-footer-grid">
        <div className="jw-footer-brand"><p className="jw-brand-name">James Wallace</p><p className="jw-brand-subtitle">Specialist teaching for young people who need a different route through education.</p></div>
        <nav className="jw-footer-nav" aria-label="Footer navigation"><ul>
          <li><Link to="/credentials">Credentials</Link></li><li><Link to="/compliance">Compliance</Link></li><li><Link to="/privacy">Privacy</Link></li>
          <li><a href="https://blog.jameswallace.tech" target="_blank" rel="noopener noreferrer">Journal<span aria-hidden="true"> ↗</span></a></li>
          <li><a href="https://portal.jameswallace.tech" target="_blank" rel="noopener noreferrer">Portal<span aria-hidden="true"> ↗</span></a></li>
        </ul></nav>
      </div>
      <div className="jw-footer-bottom"><span>© 2026 James Wallace Education Ltd. Registered in England and Wales, company number 17479328. Registered office: 71–75 Shelton Street, Covent Garden, London WC2H 9JQ.</span><span><a href="mailto:hello@jameswallace.tech">hello@jameswallace.tech</a> · <a href="tel:07897021077">07897 021077</a></span></div>
    </footer>
  );
}
