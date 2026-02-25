import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccessibilityWidget from "./components/AccessibilityWidget";
import VoiceChat from "./components/VoiceChat";
import VisualizerDemo from "./pages/VisualizerDemo";
import Portfolio from "./components/Portfolio";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import Credentials from "./pages/Credentials";
import Provision from "./pages/Provision";
import Platform from "./pages/Platform";
import Compliance from "./pages/Compliance";
import ForLAs from "./pages/ForLAs";

const App = () => {
  const [a11yOpen, setA11yOpen] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header onA11yClick={() => setA11yOpen(true)} />
        <main className="flex-grow-1 jw-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/provision" element={<Provision />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/for-las" element={<ForLAs />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/chat" element={<VoiceChat />} />
            <Route path="/visualizer" element={<VisualizerDemo />} />
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
      </div>
    </Router>
  );
};

export default App;
