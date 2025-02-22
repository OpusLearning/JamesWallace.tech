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
              <Link to="/portfolio" className="nav-link text-white">
                Portfolio
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
  );
}
