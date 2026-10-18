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
// A deploy replaces the chunk files, so a tab opened before it can ask for a page chunk that has gone. Reload
// once (at most every 10 s) to pick up the new build instead of leaving a blank page (red team, 18 Oct 2026).
const page = (load) => lazy(() => load().catch((error) => {
  try {
    const last = Number(sessionStorage.getItem("jw-chunk-reload")) || 0;
    if (Date.now() - last > 10000) {
      sessionStorage.setItem("jw-chunk-reload", String(Date.now()));
      window.location.reload();
      return new Promise(() => {});
    }
  } catch {
    // Without storage there is no guard against a reload loop, so don't reload.
  }
  throw error;
}));
const Portfolio = page(() => import("./components/Portfolio"));
const Home = page(() => import("./pages/Home"));
const About = page(() => import("./pages/About"));
const Contact = page(() => import("./pages/Contact"));
const PrivacyPolicy = page(() => import("./pages/Privacy"));
const Cookies = page(() => import("./pages/Cookies"));
const Accessibility = page(() => import("./pages/Accessibility"));
const Terms = page(() => import("./pages/Terms"));
const Complaints = page(() => import("./pages/Complaints"));
const Credentials = page(() => import("./pages/Credentials"));
const Provision = page(() => import("./pages/Provision"));
const Platform = page(() => import("./pages/Platform"));
const Compliance = page(() => import("./pages/Compliance"));
const ForLAs = page(() => import("./pages/ForLAs"));
const SampleReport = page(() => import("./pages/SampleReport"));
const Tuition = page(() => import("./pages/Tuition"));
const SendTuitionDerbyshire = page(() => import("./pages/SendTuitionDerbyshire"));
const SendTuitionNottinghamshire = page(() => import("./pages/SendTuitionNottinghamshire"));
const Agencies = page(() => import("./pages/Agencies"));
const Students = page(() => import("./pages/Students"));
const AllergyPolicy = page(() => import("./pages/AllergyPolicy"));
const NotFound = page(() => import("./pages/NotFound"));

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
