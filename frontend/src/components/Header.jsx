import { Link } from "react-router-dom";

export default function Header() {
  return (
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
              <a
                className="nav-link"
                href="https://blog.jameswallace.tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
            </li>

            <li className="nav-item">
              <Link to="/pricing" className="nav-link text-white">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link text-white">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
