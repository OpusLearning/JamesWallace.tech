import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { BIO, AVAILABILITY, STATUTORY, TRAINING } from "../data/facts";

/**
 * For agencies and schools — the fastest-paying door, and the one the site never had.
 *
 * A compliance officer decides in about a minute whether a tutor is worth the onboarding effort. This page is built for that
 * minute: what is held, what is verifiable today, and what still needs doing, stated plainly. Everything here is checked against
 * the compliance tracker of 9 September 2026 and the CV on /credentials. Nothing is claimed that could not be evidenced on
 * request, and where something is outstanding it says so — an agency finds out anyway, and finding out from you is better.
 */

const compliance = [
  { item: "Enhanced DBS", detail: "On the Update Service — details available for employer checks", state: "held" },
  { item: "Qualified Teacher Status", detail: "PGCE Secondary, University of Derby, July 2004", state: "held" },
  { item: "Safeguarding & child protection", detail: `${STATUTORY.kcsie} update, completed ${TRAINING.safeguarding.completed}`, state: "held" },
  { item: "Prevent duty", detail: `Completed ${TRAINING.prevent.completed}`, state: "held" },
  { item: TRAINING.dsl.name, detail: `${TRAINING.dsl.provider}, completed ${TRAINING.dsl.completed}, renewal ${TRAINING.dsl.renewal}`, state: "held" },
  { item: "Child-on-child abuse", detail: "Completed 22 Aug 2026", state: "held" },
  { item: TRAINING.allergy.name, detail: `Academize, completed ${TRAINING.allergy.completed}`, state: "held" },
  { item: "Whole School SEND, Platinum", detail: "The top tier of the national SEND CPD framework, September 2026", state: "held" },
  { item: "Suicide awareness", detail: "Zero Suicide Alliance, September 2026", state: "held" },
  { item: "SEND Code of Practice", detail: "Certified", state: "held" },
  { item: "Understanding Autism", detail: "Open University, 24 CPD hours, 2025", state: "held" },
  { item: "Right to work", detail: "British passport, in person or certified copy", state: "held" },
  { item: "References", detail: "Two professional referees, both former line managers", state: "held" },
];

const covers = [
  { label: "Key stages", value: "KS2 to KS4, and post-16 Functional Skills" },
  { label: "Subjects", value: "English, maths, science, computing and ICT" },
  { label: "Specialisms", value: "SEMH, autism, ADHD, PDA profiles, EBSA, EHCP-aligned provision" },
  { label: "Settings", value: "Home tuition, community settings, AP and specialist settings, online" },
  { label: "Areas", value: "Derbyshire, Nottinghamshire and the wider East Midlands; online anywhere" },
];

const placement = [
  {
    title: "Session evidence within 24 hours",
    body: "Timestamped daily reports with engagement, activity notes and next steps — the paperwork your contract manager needs, filed without being chased.",
  },
  {
    title: "A personal learning plan",
    body: "Written to the EHCP outcomes or the school's targets, with criterion-level progress you can put in front of a panel or an annual review.",
  },
  {
    title: "Safeguarding records and escalation",
    body: "Concerns logged and escalated the same day, through your route and mine. Lone-working procedure in place before the first session.",
  },
  {
    title: "Commissioning experience",
    body: "Five years inside a county council's children's commissioning team. I know what a monitoring visit asks for, because I used to be the one asking.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "James Wallace",
  jobTitle: "Specialist SEND and EOTAS Tutor",
  url: "https://jameswallace.tech/agencies",
  hasCredential: [
    "Qualified Teacher Status (QTS), 2004",
    "MEd Education, The Open University, 2012",
    BIO.degree,
    "Enhanced DBS on the Update Service",
    TRAINING.safeguarding.name,
  ],
  knowsAbout: ["SEMH", "Autism", "ADHD", "PDA", "EBSA", "EHCP", "Alternative provision", "EOTAS"],
  areaServed: ["Derbyshire", "Nottinghamshire", "East Midlands"],
};

export default function Agencies() {
  usePageMeta({
    title: "For Agencies & Schools | James Wallace, QTS — SEND & EOTAS Tutor",
    description:
      "Compliance-ready specialist SEND tutor. QTS, MEd, enhanced DBS on the Update Service, safeguarding current. Derbyshire, Nottinghamshire and online. Compliance pack on request.",
    path: "/agencies",
    jsonLd,
  });

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <span className="jw-badge jw-badge-brand mb-3" style={{ display: "inline-block" }}>
                For agencies &amp; schools
              </span>
              <h1 style={{ marginBottom: "1.25rem" }}>
                Specialist SEND teaching
                <br />
                <span style={{ color: "var(--action)" }}>with evidence ready to review</span>
              </h1>
              <p style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>
                QTS since 2004, a Master of Education, thirteen years teaching in specialist provision — twelve of them in a
                specialist SEMH school — and five years inside Nottinghamshire County Council&#39;s children&#39;s commissioning team.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                Enhanced DBS on the Update Service, with safeguarding and Prevent training records available to review.
              </p>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.75rem" }}>
                I am already registered with four UK education agencies. Names and compliance evidence are available on request.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/contact?for=agency" className="jw-btn-primary">
                  Request my compliance pack
                </Link>
                <Link to="/credentials" className="jw-btn-secondary">
                  Full CV and references
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="jw-card">
                <h2 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>Availability</h2>
                {/* Dated, so a booker can tell this is live rather than something written last term. */}
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  Reviewed {AVAILABILITY.reviewed}
                </p>
                <p style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  {AVAILABILITY.statusPlacements}, in person across Derbyshire and Nottinghamshire or online anywhere in the UK.
                </p>
                <p style={{ color: "var(--text-muted)", marginBottom: 0 }}>
                  Tell me the learner, the key stage and the hours, and I will confirm days by return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance — the minute that decides it */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 style={{ marginBottom: "0.5rem" }}>Compliance, at a glance</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "640px", marginBottom: "1.75rem" }}>
            Completion dates are listed below, with certificates available for review. Renewal dates are tracked for each
            course; the August 2027 expiry applies to the separate agency onboarding and allergy certificates shown on the credentials page.
          </p>
          <div className="jw-card" style={{ padding: 0, overflow: "hidden" }}>
            {compliance.map((c, i) => (
              <div
                key={c.item}
                className="d-flex flex-wrap align-items-baseline gap-3"
                style={{
                  padding: "0.85rem 1.25rem",
                  borderTop: i === 0 ? "none" : "1px solid var(--border, #e5e0d8)",
                }}
              >
                <span style={{ color: "var(--action)", fontWeight: 700, minWidth: "1.5rem" }} aria-hidden="true">
                  ✓
                </span>
                <span style={{ fontWeight: 600, minWidth: "230px", flex: "0 1 auto" }}>{c.item}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.92rem", flex: "1 1 260px" }}>{c.detail}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "1rem", marginBottom: 0 }}>
            I also hold my own safeguarding, e-safety, lone-working, risk assessment and behaviour policies, which I am happy to
            share before a first placement.
          </p>
        </div>
      </section>

      {/* What I cover */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <h2 style={{ marginBottom: "1.5rem" }}>What I cover</h2>
          <div className="row g-3">
            {covers.map((c) => (
              <div key={c.label} className="col-12">
                <div
                  className="d-flex flex-wrap gap-3"
                  style={{ paddingBottom: "0.85rem", borderBottom: "1px solid var(--border, #e5e0d8)" }}
                >
                  <span style={{ fontWeight: 600, minWidth: "170px" }}>{c.label}</span>
                  <span style={{ color: "var(--text-muted)", flex: "1 1 300px" }}>{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why place me */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 style={{ marginBottom: "0.5rem" }}>What you get on placement</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "640px", marginBottom: "2rem" }}>
            The reason to place a specialist rather than fill the slot is what comes back to you afterwards.
          </p>
          <div className="row g-4">
            {placement.map((p) => (
              <div key={p.title} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3 style={{ fontSize: "1.08rem", marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2 style={{ marginBottom: "1rem" }}>Compliance pack on request</h2>
          <p style={{ maxWidth: "580px", margin: "0 auto 1.5rem", color: "var(--text-muted)" }}>
            Certificates, DBS details, references and my policy pack are available on request. Tell me what your onboarding needs and I
            will send it in the format you use.
          </p>
          <Link to="/contact?for=agency" className="jw-btn-primary">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
