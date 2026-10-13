import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { PRODUCT, POLICY_PACK, HOSTING, PLATFORM_STATUS } from "../data/facts";
import PageHeader from "../components/PageHeader";

const screenshots = [
  {
    file: "01-dashboard",
    title: "Supervisor dashboard",
    bullets: [
      "Live overview of the full active portfolio",
      "Active case count, weekly session activity, engagement scores",
      "Outstanding actions and automated alerts for safeguarding, compliance, and policy health",
      "No chasing, no manual reports - the system flags what needs attention",
    ],
  },
  {
    file: "02-case-flags",
    title: "Case flags & early warning system",
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
    title: "Case management",
    bullets: [
      "Full learner profile: EHCP, risk assessment, carer contacts, medical information",
      "Referral details, commissioning letter, and placement history in one place",
      "Supervision records, case notes, and chronology",
      "All access and changes logged in a full audit trail",
    ],
  },
  {
    file: "03b-weekly-plan-tab",
    title: "Weekly plan workflow",
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
    title: "Daily session reports",
    bullets: [
      "Submitted within 24 hours of each session",
      "Attendance and engagement score (0 to 5)",
      "Per-subject activity notes linked to the approved weekly plan",
      "PLP success criteria automatically updated on submission",
      "Safeguarding observations and travel/expense logging",
    ],
  },
  {
    file: "05-plp-analytics",
    title: "PLP analytics",
    bullets: [
      "Portfolio-wide view of PLP engagement and criterion completion rates",
      "Individual PLP with EHCP-aligned targets, teaching strategies, and measurable success criteria",
      "Progress tracked across the full placement - visible to supervisors and commissioners",
      "Stale or overdue plans flagged automatically",
    ],
  },
  {
    file: "06-safeguarding",
    title: "Safeguarding management",
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
    title: "Lone working safety",
    note: "Portal capability. Built for multi-practitioner providers; as a sole practitioner James uses the check-in, check-out and audit trail, with a named monitor who checks he has arrived and left; the written escalation steps are shared with the commissioner before teaching starts.",
    bullets: [
      "Check-in at session start; check-out at session end",
      "Live supervisor feed showing all active sessions, time elapsed, and check-in location",
      "Automatic alert and email if a session goes overdue (to the supervisory team, for providers that have one)",
      "Panic button in practitioner’s session view - immediate supervisor notification",
      "Lone working audit reports available for inspection",
    ],
  },
  {
    file: "08-compliance",
    title: "Compliance dashboard",
    bullets: [
      "DBS, safeguarding, right-to-work and mandatory training tracked with RAG status and expiry alerts",
      "Team-wide compliance summary highlighting expiring or expired records",
      "Automated email reminders 60 days before DBS or training expiry",
      "Mandatory training requirements configured at organisation level and checked per member",
    ],
  },
  {
    file: "09-provision",
    title: "Provision assurance",
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
    title: "Finance & billing",
    note: "Portal capability. The platform is built to turn session records into delivery reports and invoices; what a commission actually receives each month is agreed in the commission.",
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
    title: "Policies & procedures",
    note: `Portal capability. The policy suite was ${POLICY_PACK.status}; policies are shared with commissioners on request.`,
    bullets: [
      "EOTAS-aligned policy library - Safeguarding, Lone Working, Data Protection, and more",
      "Each policy is version-controlled, review-dated, and available as a branded PDF",
      "Download Pack exports the approved policies as a single ZIP",
      "Policy health - overdue for review, due within 30 days, still in draft - monitored on dashboard",
    ],
  },
  {
    file: "12-inspection-bundle",
    title: "Inspection-ready exports",
    bullets: [
      "Full Inspection Bundle PDF for any case: PLP, weekly plans, daily evidence, safeguarding timeline, lone working log",
      "Case chronologies, supervision records, compliance audit logs and approved policies",
      "Available on demand - no preparation required for monitoring visits or Ofsted inspections",
      "Generated in minutes, not hours",
    ],
  },
];

// LOOK-SITE-1 item 2: the emoji that sat on these three tiles are gone; they are a plain ruled list.
const proofTiles = [
  { stat: "Minutes", label: "Inspection bundle generated" },
  { stat: "Real-time", label: "Lone working escalation" },
  { stat: "On request", label: "Approved policies" },
];

const securityPoints = [
  { label: "AES-256-GCM encryption", desc: "Database encrypted at rest and in transit; health, safeguarding and session-note fields encrypted again by the portal; documents encrypted before upload" },
  { label: "Role-based access control", desc: "Practitioners, supervisors, and finance staff see only what they need" },
  { label: "Full audit trail", desc: "Every access, change, and export is logged and timestamped" },
  { label: "EU hosting, moving to the UK", desc: `Neon PostgreSQL, ${HOSTING.now}. ${HOSTING.planned} Data protection information available on request.` },
];

export default function Platform() {
  usePageMeta({
    title: `${PRODUCT.name} | Evidence and Reporting Platform | James Wallace Education`,
    description:
      'The portal built for EOTAS placements: session evidence, safeguarding alerts, compliance tracking and on-demand PDF exports for monitoring visits.',
    path: '/platform',
  });

  return (
    <>
      {/* Style B hero (LOOK-SITE-1 item 5) — the cleanest of the portal screenshots. */}
      <PageHeader
        title={PRODUCT.name}
        lede="Purpose-built for EOTAS providers. Not adapted from a school MIS."
        body={
          <p className="jw-body">
            The provision runs on a case management platform I built
            specifically for EOTAS and alternative provision delivery. It is built
            to track every aspect of a learner’s placement from first referral
            through to case closure, so a parent, an agency or a commissioner
            can see what happened without having to ask. {PLATFORM_STATUS.sentence}
          </p>
        }
        actions={<>
          <Link to="/contact?for=commissioner" className="jw-btn-primary">Request a Demo</Link>
          <a
            href="https://portal.jameswallace.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="jw-btn-secondary"
          >
            Open Portal ↗
          </a>
        </>}
        image={{
          src: "/portal/05-plp-analytics.webp?v=1013",
          alt: `PLP analytics in ${PRODUCT.name}`,
          fetchPriority: "high",
        }}
      />

      {/* Screenshot sections. Each one is full content width, captioned, and opens full size on click
          (LOOK-SITE-1 item 3). */}
      {screenshots.map((s, i) => (
        <section
          key={s.file}
          className={`jw-section ${i % 2 === 0 ? "jw-section-white" : "jw-section-surface"}`}
        >
          <div className="jw-container">
            <div className="row">
              <div className="col-12 col-lg-7">
                <h2>{s.title}</h2>
                {s.note && (
                  <p className="jw-caption jw-italic">{s.note}</p>
                )}
                <ul className="jw-list">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <figure className="jw-shot">
              <a
                href={`/portal/${s.file}.webp?v=1013`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${s.title} screenshot full size`}
              >
                <img
                  src={`/portal/${s.file}.webp?v=1013`}
                  alt={`${s.title} in ${PRODUCT.name}`}
                  loading="lazy"
                />
              </a>
              <figcaption>
                {s.title} in {PRODUCT.name}.{" "}
                <a
                  className="jw-shot-open"
                  href={`/portal/${s.file}.webp?v=1013`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full size<span aria-hidden="true"> ↗</span>
                </a>
              </figcaption>
            </figure>
          </div>
        </section>
      ))}

      {/* Security strip */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2>Security &amp; data protection</h2>
          <ul className="jw-row-list">
            {securityPoints.map((item) => (
              <li key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof tiles */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <ul className="jw-row-list">
            {proofTiles.map((tile) => (
              <li key={tile.label}>
                <h3>{tile.stat}</h3>
                <p>{tile.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Request a demo</h2>
          <p className="jw-body jw-measure jw-measure--center">
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
