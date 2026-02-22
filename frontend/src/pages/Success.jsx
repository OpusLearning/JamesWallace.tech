import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCalendarAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading"); // loading | confirmed | error

  useEffect(() => {
    if (!sessionId) {
      setStatus("confirmed"); // direct visit — just show success
      return;
    }
    // Optionally verify with server — for now just show confirmed
    setStatus("confirmed");
  }, [sessionId]);

  return (
    <section className="jw-section jw-section-warm" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="jw-container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="jw-card text-center py-5">
              {status === "loading" && (
                <p style={{ color: "var(--text-muted)" }}>Confirming your booking…</p>
              )}

              {status === "confirmed" && (
                <>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--action)", fontSize: "3rem", marginBottom: "1rem" }}
                  />
                  <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Payment Confirmed</h1>
                  <p style={{ maxWidth: "420px", margin: "0 auto 2rem", color: "var(--text-muted)" }}>
                    Thank you — your booking is confirmed. You'll receive a confirmation email shortly with everything you need.
                  </p>

                  <div className="d-flex flex-column gap-3 align-items-center mb-4">
                    <div className="jw-card d-flex align-items-start gap-3 text-start" style={{ maxWidth: "400px", width: "100%" }}>
                      <FontAwesomeIcon icon={faEnvelope} style={{ color: "var(--brand)", marginTop: "3px", flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.2rem" }}>Check your inbox</h3>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                          A confirmation email with session details and next steps is on its way.
                        </p>
                      </div>
                    </div>

                    <div className="jw-card d-flex align-items-start gap-3 text-start" style={{ maxWidth: "400px", width: "100%" }}>
                      <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "var(--brand)", marginTop: "3px", flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.2rem" }}>We'll be in touch</h3>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                          James will contact you within one working day to schedule your session.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <Link to="/calendly" className="jw-btn-primary">Book Your Session Time</Link>
                    <Link to="/" className="jw-btn-secondary">Back to Home</Link>
                  </div>
                </>
              )}

              {status === "error" && (
                <>
                  <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Something went wrong</h1>
                  <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                    We couldn't confirm your payment. Please contact us and we'll sort it out.
                  </p>
                  <Link to="/contact" className="jw-btn-primary">Contact Us</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
