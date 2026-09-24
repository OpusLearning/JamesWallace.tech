import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccessibilityWidget from "./components/AccessibilityWidget";
import SiteHelper from "./components/SiteHelper";
import Portfolio from "./components/Portfolio";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Accessibility from "./pages/Accessibility";
import Terms from "./pages/Terms";
import Complaints from "./pages/Complaints";
import Credentials from "./pages/Credentials";
import Provision from "./pages/Provision";
import Platform from "./pages/Platform";
import Compliance from "./pages/Compliance";
import ForLAs from "./pages/ForLAs";
import Tuition from "./pages/Tuition";
import Agencies from "./pages/Agencies";

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}

const App = () => {
  const [a11yOpen, setA11yOpen] = useState(false);

  return (
    <Router>
      <RouteEffects />
      <div className="d-flex flex-column min-vh-100">
        <Header onA11yClick={() => setA11yOpen(true)} />
        <main id="main-content" tabIndex="-1" className="flex-grow-1 jw-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/provision" element={<Provision />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/for-las" element={<ForLAs />} />
            <Route path="/tuition" element={<Tuition />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route
              path="*"
              element={<div className="text-center py-5"><h2>Page Not Found</h2></div>}
            />
          </Routes>
        </main>
        <Footer />
        <AccessibilityWidget
          open={a11yOpen}
          onClose={() => setA11yOpen(false)}
        />
        <SiteHelper />
      </div>
    </Router>
  );
};

export default App;
