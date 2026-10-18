import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/bootstrap.purged.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccessibilityWidget from "./components/AccessibilityWidget";
import SiteHelper from "./components/SiteHelper";
import useAnalytics from "./hooks/useAnalytics";
import { installClickEvents } from "./lib/analytics";

// Each page is its own chunk, so the first visit loads one page's text, not all 22 (site audit 18 Oct 2026,
// G1). The prerendered head keeps Vite's modulepreload for the route's chunk, and hydration waits for it under
// Suspense.
const Portfolio = lazy(() => import("./components/Portfolio"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Terms = lazy(() => import("./pages/Terms"));
const Complaints = lazy(() => import("./pages/Complaints"));
const Credentials = lazy(() => import("./pages/Credentials"));
const Provision = lazy(() => import("./pages/Provision"));
const Platform = lazy(() => import("./pages/Platform"));
const Compliance = lazy(() => import("./pages/Compliance"));
const ForLAs = lazy(() => import("./pages/ForLAs"));
const SampleReport = lazy(() => import("./pages/SampleReport"));
const Tuition = lazy(() => import("./pages/Tuition"));
const SendTuitionDerbyshire = lazy(() => import("./pages/SendTuitionDerbyshire"));
const SendTuitionNottinghamshire = lazy(() => import("./pages/SendTuitionNottinghamshire"));
const Agencies = lazy(() => import("./pages/Agencies"));
const Students = lazy(() => import("./pages/Students"));
const AllergyPolicy = lazy(() => import("./pages/AllergyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}

// One place counts every route, including the first, from the router's own location.
function RouteAnalytics() {
  useAnalytics(useLocation());
  return null;
}

// One delegated listener counts clicks on email, phone and /contact links (TRACK-1). Mounted once.
function ClickEvents() {
  useEffect(() => installClickEvents(), []);
  return null;
}

const App = () => {
  const [a11yOpen, setA11yOpen] = useState(false);

  return (
    <Router>
      <RouteEffects />
      <RouteAnalytics />
      <ClickEvents />
      <div className="d-flex flex-column min-vh-100">
        <Header onA11yClick={() => setA11yOpen(true)} />
        <main id="main-content" tabIndex="-1" className="flex-grow-1 jw-page">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/provision" element={<Provision />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/for-las" element={<ForLAs />} />
              <Route path="/sample-report" element={<SampleReport />} />
              <Route path="/tuition" element={<Tuition />} />
              <Route path="/send-tuition-derbyshire" element={<SendTuitionDerbyshire />} />
              <Route path="/send-tuition-nottinghamshire" element={<SendTuitionNottinghamshire />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/students" element={<Students />} />
              <Route path="/allergy-policy" element={<AllergyPolicy />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
