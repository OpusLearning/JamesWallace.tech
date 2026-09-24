import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { PRODUCT } from "../data/facts";

const screenshots = [
  {
    file: "01-dashboard",
    title: "Supervisor Dashboard",
    bullets: [
      "Live overview of the full active portfolio",
      "Active case count, weekly session activity, engagement scores",
      "Outstanding actions and automated alerts for safeguarding, compliance, and policy health",
      "No chasing, no manual reports - the system flags what needs attention",
    ],
  },
  {
    file: "02-case-flags",
    title: "Case Flags & Early Warning System",
    bullets: [
      "Automated flags when a learner has had no session in 14+ days",
      "Flags when engagement scores drop across three or more consecutive sessions",
      "Alerts when a PLP is overdue or about to expire",
      "Attendance flags when delivery drops below 80% in the rolling 6-week window",
      "Flags appear on the case list, case detail, and supervisor dashboard",
    ],
  },
  {
    file: "03a-case-detail",
    title: "Case Management",
    bullets: [
      "Full learner profile: EHCP, risk assessment, carer contacts, medical information",
      "Referral details, commissioning letter, and placement history in one place",
      "Supervision records, case notes, and chronology",
      "All access and changes logged in a full audit trail",
    ],
  },
  {
    file: "03b-weekly-plan-tab",
    title: "Weekly Plan Workflow",
    bullets: [
      "Structured weekly plan - PLP criteria to target, planned activities per subject, session logistics",
      "Supervisor approval before delivery begins - creates the evidence baseline for the week",
      "Plan locked once approved; amendments require supervisor sign-off",
      "Plans linked directly to daily reports and PLP progress",
    ],
    note: "Portal capability. The approval step is built for providers with a supervisory team; as a sole practitioner James locks the plan before delivery begins, and where a commissioner wants sight of it first, their approval is recorded against the plan.",
  },
  {
    file: "04-daily-reports",
    title: "Daily Session Reports",
    bullets: [
      "Submitted within 24 hours of each session",
      "Attendance and engagement score (0-10)",
      "Per-subject activity notes linked to the approved weekly plan",
      "PLP success criteria automatically updated on submission",
      "Safeguarding observations and travel/expense logging",
    ],
  },
  {
    file: "05-plp-analytics",
    title: "PLP Analytics",
    bullets: [
      "Portfolio-wide view of PLP engagement and criterion completion rates",
      "Individual PLP with EHCP-aligned targets, teaching strategies, and measurable success criteria",
      "Progress tracked across the full placement - visible to supervisors and commissioners",
      "Stale or overdue plans flagged automatically",
    ],
  },
  {
    file: "06-safeguarding",
    title: "Safeguarding Management",
    bullets: [
      "All concerns logged immediately, stored encrypted, tracked through a structured lifecycle",
      "Queued → In Progress → Resolved / Escalated workflow",
      "Age badges flag concerns open for 7 or 14+ days without action",
      "Automated daily alerts to supervisor and DSL for stale concerns",
      "PIRFs auto-created when a practitioner flags a physical intervention - cannot be bypassed",
    ],
  },
  {
    file: "07-lone-working",
    title: "Lone Working Safety",
    note: "Portal capability. Built for multi-practitioner providers; as a sole practitioner James uses the check-in, check-out and audit trail, and the escalation route is agreed with the commissioner before teaching starts.",
    bullets: [
      "Check-in at session start; check-out at session end",
      "Live supervisor feed showing all active sessions, time elapsed, and check-in location",
      "Automatic alert and email to supervisory team if a session goes overdue",
      "Panic button in practitioner’s session view - immediate supervisor notification",
      "Lone working audit reports available for inspection",
    ],
  },
  {
    file: "08-compliance",
    title: "Compliance Dashboard",
    bullets: [
      "DBS, safeguarding, right-to-work and mandatory training tracked with RAG status and expiry alerts",
      "Team-wide compliance summary highlighting expiring or expired records",
      "Automated email reminders 60 days before DBS or training expiry",
      "Mandatory training requirements configured at organisation level and checked per member",
    ],
  },
  {
    file: "09-provision",
    title: "Provision Assurance",
    bullets: [
      "Live portfolio view of commissioned vs. delivered hours for every active case",
      "RAG status, variance percentage, and recovery projections",
      "Session cancellations logged with reason codes and LA notification tracking",
      "Weekly top-up hours calculated for cases below 90% delivery",
      "CSV exports available for LA reporting",
    ],
  },
  {
    file: "10-finance",
    title: "Finance & Billing",
    bullets: [
      "Every submitted session report automatically creates a billable record",
      "Hours, mileage, and expenses snapshotted and queued for review",
      "Supervisors lock sessions and group into LA invoices with funding stream tagging",
      "Monthly LA delivery reports auto-generated and emailed on the first of each month",
      "Payroll and expense CSV exports for payroll processing",
    ],
  },
  {
    file: "11-policies",
    title: "Policies & Procedures",
    bullets: [
      "28 EOTAS-aligned policies - Safeguarding, Lone Working, Data Protection, and more",
      "Each policy is version-controlled, review-dated, and available as a branded PDF",
      "Download Pack exports all active policies as a single ZIP",
      "Policy health - overdue for review, due within 30 days, still in draft - monitored on dashboard",
    ],
  },
  {
    file: "12-inspection-bundle",
    title: "Inspection-Ready Exports",
    bullets: [
      "Full Inspection Bundle PDF for any case: PLP, weekly plans, daily evidence, safeguarding timeline, lone working log",
      "Case chronologies, supervision records, compliance audit logs, and policy packs",
      "Available on demand - no preparation required for monitoring visits or Ofsted inspections",
      "Generated in minutes, not hours",
    ],
  },
];

const proofTiles = [
  { stat: "Minutes", label: "Inspection bundle generated", icon: "⚡" },
  { stat: "Real-time", label: "Lone working escalation", icon: "🛡" },
  { stat: "28 policies", label: "Tracked and downloadable", icon: "📋" },
];

export default function Platform() {
  usePageMeta({
    title: `${PRODUCT.name} | Evidence and Reporting Platform | James Wallace Education`,
    description:
      'The portal behind every placement: session evidence, safeguarding alerts, compliance tracking and on-demand PDF exports for monitoring visits.',
    path: '/platform',
  });

  return (
    <>
      {/* Intro */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h1>{PRODUCT.name}</h1>
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "660px",
              margin: "1rem auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Purpose-built for EOTAS providers. Not adapted from a school MIS.
          </p>
          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto 2rem",
              fontSize: "0.95rem",
            }}
          >
            The provision runs on a case management platform I built
            specifically for EOTAS and alternative provision delivery. Every
            aspect of a learner’s placement is tracked from first referral
            through to case closure, so a parent, an agency or a commissioner
            can see what happened without having to ask.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/contact?for=commissioner" className="jw-btn-primary">
              Request a Demo
            </Link>
            <a
              href="https://portal.jameswallace.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="jw-btn-secondary"
            >
              Open Portal ↗
            </a>
          </div>
        </div>
      </section>

      {/* Screenshot sections */}
      {screenshots.map((s, i) => (
        <section
          key={s.file}
          className={`jw-section ${i % 2 === 0 ? "jw-section-white" : "jw-section-surface"}`}
        >
          <div className="jw-container">
            <div
              className={`row align-items-center g-5 ${
                i % 2 === 1 ? "flex-lg-row-reverse" : ""
              }`}
            >
              <div className="col-12 col-lg-6">
                <img
                  src={`/portal/${s.file}.webp`}
                  alt={`${s.title} in ${PRODUCT.name}`}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
              <div className="col-12 col-lg-6">
                <h2>{s.title}</h2>
                {s.note && (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "0.75rem" }}>
                    {s.note}
                  </p>
                )}
                <ul
                  style={{
                    paddingLeft: "1.25rem",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Security strip */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-4">Security & Data Protection</h2>
          <div className="row g-4 justify-content-center">
            {[
              { label: "AES-256-GCM encryption", desc: "All PII encrypted at rest - learner names, diagnoses, carer contacts, session notes" },
              { label: "Role-based access control", desc: "Practitioners, supervisors, and finance staff see only what they need" },
              { label: "Full audit trail", desc: "Every access, change, and export is logged and timestamped" },
              { label: "EU hosting", desc: "Neon PostgreSQL on Frankfurt infrastructure. Data protection information available on request." },
            ].map((item) => (
              <div key={item.label} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100 text-center">
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--brand)", marginBottom: "0.5rem" }}>
                    {item.label}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof tiles */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row g-4 justify-content-center">
            {proofTiles.map((tile) => (
              <div key={tile.label} className="col-12 col-md-4">
                <div className="jw-card text-center h-100">
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{tile.icon}</div>
                  <div
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "var(--brand)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {tile.stat}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>{tile.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Request a demo</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
            If you are commissioning EOTAS provision and want to see the
            platform, get in touch. I will walk you through the portal and answer any
            questions.
          </p>
          <Link to="/contact?for=commissioner" className="jw-btn-primary">
            Request a Demo
          </Link>
        </div>
      </section>
    </>
  );
}
