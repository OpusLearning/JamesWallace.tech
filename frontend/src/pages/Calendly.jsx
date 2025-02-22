import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CalendlyPage = () => {
  const navigate = useNavigate();
  const calendlyContainerRef = useRef(null);

  // Initialize the Calendly inline widget
  const initCalendly = () => {
    if (window.Calendly && calendlyContainerRef.current) {
      console.log("Initializing Calendly inline widget...");
      // Clear previous content in case the widget was already loaded
      calendlyContainerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/jameswallacetech/30min?hide_gdpr_banner=1",
        parentElement: calendlyContainerRef.current,
      });
    }
  };

  useEffect(() => {
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        console.log("Calendly script loaded successfully.");
        initCalendly();
      };
      script.onerror = () => console.error("Error loading Calendly script.");
      document.body.appendChild(script);
    } else {
      // Script is already loaded, so initialize the widget directly.
      initCalendly();
    }
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <header className="py-3 px-4" style={{ backgroundColor: "#0d6efd" }}>
        <div className="container">
          <h1 className="text-center text-white mb-0">
            Schedule Your Consultation
          </h1>
        </div>
      </header>
      <div className="container py-4">
        <button
          className="btn mb-3"
          style={{
            backgroundColor: "#0d6efd",
            borderColor: "#0d6efd",
            color: "#fff",
          }}
          onClick={() => navigate(-1)}
        >
          &larr; Back to Pricing
        </button>
        {/* Calendly container without internal scrolling */}
        <div
          id="calendly-container"
          ref={calendlyContainerRef}
          style={{ minWidth: "320px", height: "700px", overflow: "hidden" }}
        />
      </div>
    </div>
  );
};

export default CalendlyPage;
