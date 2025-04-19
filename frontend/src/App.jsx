// frontend/src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import VoiceChat from "./components/VoiceChat"; // your chat UI
import VisualizerDemo from "./pages/VisualizerDemo"; // the page that uses VisualizerCanvas
import Portfolio from "./components/Portfolio";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import CalendlyPage from "./pages/Calendly";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";

const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1" style={{ paddingTop: "120px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/calendly" element={<CalendlyPage />} />

          {/* ← Your new pages: */}
          <Route path="/chat" element={<VoiceChat />} />
          <Route path="/visualizer" element={<VisualizerDemo />} />

          {/* 404 fallback (optional) */}
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2>Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  </Router>
);

export default App;
