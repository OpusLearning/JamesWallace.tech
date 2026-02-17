import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccessibilityWidget from "./components/AccessibilityWidget";
import Portfolio from "./components/Portfolio";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import CalendlyPage from "./pages/Calendly";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";

const App = () => {
  const [a11yOpen, setA11yOpen] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header onA11yClick={() => setA11yOpen(true)} />
        <main className="flex-grow-1 jw-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/calendly" element={<CalendlyPage />} />
          </Routes>
        </main>
        <Footer />
        <AccessibilityWidget
          open={a11yOpen}
          onClose={() => setA11yOpen(false)}
        />
      </div>
    </Router>
  );
};

export default App;
