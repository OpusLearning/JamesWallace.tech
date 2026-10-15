import usePageMeta from "../hooks/usePageMeta";
import PhotoBanner from "../components/PhotoBanner";
import { Link } from "react-router-dom";
import { COMMISSIONED_PRICES_PUBLIC, TRAINING, PRODUCT, REPLY, POLICY_PACK, PRICES, DELIVERY, GUIDES_HUB, AREA, SESSIONS, PROFILES, PLATFORM_STATUS, REFERENCES } from "../data/facts";
import SafeguardingLead from "../components/SafeguardingLead";

const commissionerQA = [
  {
    q: "How will I know sessions are actually happening?",
    a: "Every session is built to carry a timestamped daily report, submitted within 24 hours - engagement score, activity notes and criteria progress - visible in the portal, not a summary written for you at the end of term.",
  },
  {
    q: "You are one person. What happens if you are ill?",
    a: "I tell you before the session's start time where I know in advance, and otherwise within 30 minutes of it, and agree a catch-up plan in writing. Missed hours are logged against entitlement and made up, not quietly lost, and the running total is visible to you throughout. A single specialist is the trade: one consistent adult for a child who has usually had far too many, and no cover pool to fall back on. Most of the young people I take on could not tolerate a rotating staff team anyway.",
  },
  {
    q: "How do you handle safeguarding?",
    a: "Every concern is logged, tracked, and escalated through a structured workflow. DSL is notified of any stale concerns automatically. PIRFs cannot be bypassed. Inspection bundles are available on demand.",
  },
  {
    q: "Can I see progress against the EHCP?",
    a: "The PLP is built directly from EHCP outcomes. Criterion progress is updated with each session report and visible in the analytics view.",
  },
  {
    q: "What does your compliance look like?",
    a: `Enhanced DBS on the Update Service. Safeguarding training completed ${TRAINING.safeguarding.completed}; Prevent duty completed ${TRAINING.prevent.completed}; allergy awareness and anaphylaxis training completed ${TRAINING.allergy.completed}; ${TRAINING.dsl.name} completed ${TRAINING.dsl.completed} (recommended renewal ${TRAINING.dsl.renewal}). Right to work evidence and course-specific renewal dates are available for review before a placement.`,
  },
  {
    q: "Which local thresholds do you work to?",
    a: "Placements work to the placing authority's threshold guidance, not mine. Where the placing authority is Derby City or Derbyshire, Nottingham City, or Nottinghamshire County, that guidance is the Derby City and Derbyshire Threshold Document (December 2024), the Nottingham City Interim Continuum of Need, or the Nottinghamshire Framework for Support respectively. Each is a published council document, so I work to the current version held by the placing authority.",
  },
  {
    q: "Can records be produced for a monitoring visit?",
    a: `The platform is built to export case chronologies, PLP evidence, safeguarding logs and compliance records as PDFs. ${PLATFORM_STATUS.follow} Approved policies are available on request.`,
  },
];

const monthlyDeliverables = [
  { item: "Attendance record", detail: "Session-level attendance for every active case" },
  { item: "Engagement report", detail: "Engagement scores across all sessions in the period" },
  { item: "Progress summary", detail: "PLP criterion completion rates since placement start" },
  { item: "Safeguarding nil return", detail: "Signed nil return or summary of concerns raised" },
  { item: "Provision assurance", detail: "Commissioned vs. delivered hours with variance" },
  { item: "Invoice", detail: "Session-level billing with funding stream tagging" },
];

const referralSteps = [
  {
    step: "1",
    title: "Initial referral",
    desc: `Submit the referral form on this site or contact me directly. Please do not put a young person's name or any identifying details in that first message. I'll respond ${REPLY.within} to discuss the placement.`,
  },
  {
    step: "2",
    title: "Documentation",
    desc: "I'll need the current EHCP or SEN support plan, LA commissioning letter or PO reference, risk assessment, and preferred hours per week.",
  },
  {
    step: "3",
    title: "Placement assessment",
    desc: "I review the documentation and confirm a placement start date, available hours, and PLP scope.",
  },
  {
    step: "4",
    title: "Delivery begins",
    desc: "Sessions commence. Weekly plans submitted and approved. Daily reports filed within 24 hours. Safeguarding and lone working active from day one.",
  },
];

// Structured data for the commissioned service, built like Tuition.jsx's Service node. The
// credentials are the set already published on /agencies, read from facts.js where a value lives
// there. No price, address or profile link is added; the service is described, not the business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Commissioned EOTAS and alternative provision",
  provider: {
    "@type": "Person",
    name: "James Wallace",
    sameAs: PROFILES,
    hasCredential: [
      "Qualified Teacher Status (QTS), 2004",
      "MEd Education, The Open University, 2012",
      "Enhanced DBS on the Update Service",
      TRAINING.safeguarding.name,
    ],
  },
  areaServed: AREA.jsonLd,
  audience: { "@type": "Audience", audienceType: "Local authorities and schools" },
};

export default function ForLAs() {
  usePageMeta({
    title: 'For Local Authorities | Commissioning EOTAS Placements | James Wallace Education',
    description:
      'How commissioning works: referral to first session, weekly plans, daily reports, safeguarding nil returns and inspection-ready exports for SEND panels.',
    path: '/for-las',
    jsonLd,
  });

  return (
    <>
      <PhotoBanner
        name="la"
        eyebrow="Commissioned provision"
        alt="A teenager in a mustard jumper writing at a table, smiling, with a tutor beside her."
      >
        For Local Authorities &amp; Schools
      </PhotoBanner>

      {/* Hero. LOOK-SITE-1 item 3: the two unreadable thumbnails are replaced by one readable image. */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <p className="jw-lede">
                Commissioning EOTAS provision should be clear. James Wallace Education, the provision operated by James Wallace,
                is built to give commissioners and referrers visibility of a
                placement - from session evidence to safeguarding nil
                returns - with monthly deliverables and
                inspection-ready exports on demand. {AREA.sentence} {SESSIONS.school}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
                  Make a Referral &rarr;
                </Link>
                <Link to="/compliance" className="jw-btn-secondary">
                  Compliance Details
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <figure className="jw-shot">
                <img
                  src="/portal/10-finance.webp?v=1013"
                  width="1600"
                  height="1000"
                  alt={`Finance and billing view in ${PRODUCT.name}`}
                  loading="lazy"
                />
                <figcaption>
                  Finance &amp; billing in {PRODUCT.name}.{" "}
                  <a className="jw-shot-open" href="/portal/10-finance.webp?v=1013" target="_blank" rel="noopener noreferrer">
                    Open full size<span aria-hidden="true"> ↗</span>
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Pictures of the work (supplied by James, 11 Oct 2026; illustrative). */}
      <section className="jw-section jw-section--media jw-section-white">
        <div className="jw-container">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-7">
              <figure className="jw-media-figure">
                <img
                  src="/hero/evidence-1400.webp"
                  srcSet="/hero/evidence-700.webp 700w, /hero/evidence-1400.webp 1400w"
                  sizes="(max-width: 991px) 100vw, 46rem"
                  width="1400"
                  height="788"
                  loading="lazy"
                  alt="A laptop showing charts beside a printed report on a desk."
                />
              </figure>
            </div>
            <div className="col-12 col-lg-5">
              <figure className="jw-media-figure">
                <img
                  src="/hero/professionals-1100.webp"
                  srcSet="/hero/professionals-600.webp 600w, /hero/professionals-1100.webp 1100w"
                  sizes="(max-width: 991px) 100vw, 32rem"
                  width="1100"
                  height="1100"
                  loading="lazy"
                  alt="Three professionals talking over a folder at a round table."
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Written references: the two held on file, the same words as /credentials. */}
      {REFERENCES.map((r, i) => (
        <section className="jw-reference-section" aria-label={`Written reference from ${r.name}`} key={r.name}>
          <div className="jw-container jw-reference-layout">
            <div className="jw-reference-label"><p className="jw-eyebrow">{i === 0 ? "Written references" : "A second reference"}</p><span aria-hidden="true">“</span></div>
            <figure className="jw-reference">
              <blockquote>“{r.quote}”</blockquote>
              <figcaption><div><strong>{r.name}</strong><span>{r.role}</span></div>{i === REFERENCES.length - 1 && <Link to="/credentials" className="jw-text-link">Read the references in full</Link>}</figcaption>
            </figure>
          </div>
        </section>
      ))}

      {/* Referral process — ruled rows, no numbered circles */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2>A clear route from referral to review</h2>
          <p className="jw-body jw-measure">
            I respond to referral enquiries {REPLY.within} and begin
              placement assessments within 5 working days of receiving a commission.
          </p>
          <ul className="jw-row-list">
            {referralSteps.map((item) => (
              <li key={item.step}>
                <h3>{item.step}. {item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Monthly deliverables */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2>Monthly deliverables</h2>
          <p className="jw-body jw-measure">
            The platform is built to produce the following each calendar
            month. What a placement actually receives is agreed in the
            commission.{" "}
            <Link to="/sample-report">See a sample report</Link>, shown with invented data.
          </p>
          <ul className="jw-row-list">
            {monthlyDeliverables.map((row) => (
              <li key={row.item}>
                <h3>{row.item}</h3>
                <p>{row.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prices. The rates come from facts.js and are unchanged. */}
      {COMMISSIONED_PRICES_PUBLIC ? (
      <section className="jw-section jw-section-white" id="prices">
        <div className="jw-container">
          <h2>What it costs</h2>
          <p className="jw-body jw-measure">
            One set of prices for each way of teaching, by the hour, half day or day, with the work around the session included.
          </p>
          <div className="row g-4">
            {[
              { rate: PRICES.commissionedInPerson, halfDay: PRICES.commissionedHalfDayInPerson, day: PRICES.commissionedDayInPerson, title: "In person", body: "One-to-one teaching in the home or a community setting, or a mix of in person and online." },
              { rate: PRICES.commissionedOnline, halfDay: PRICES.commissionedHalfDayOnline, day: PRICES.commissionedDayOnline, title: "Online", body: "One-to-one teaching by video, anywhere in the UK." },
            ].map((f) => (
              <div key={f.title} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <div className="jw-rate">
                    <strong>{f.rate}</strong>
                    <span className="jw-caption">per hour</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p className="jw-body" style={{ color: "var(--text-muted)" }}>{f.body}</p>
                  <p className="jw-body">
                    Half day, up to 3 hours: <strong>{f.halfDay}</strong>
                    <br />
                    Day, up to 5.5 hours: <strong>{f.day}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="jw-caption">
            <strong>Frameworks:</strong> where a council buys through a framework, the
            prices and units are the ones tendered to that framework. Some buy by the half day and day and not by the hour.
            A placement is {DELIVERY.hoursPerWeek} for each pupil.
          </p>
          <p className="jw-caption">
            <strong>Included:</strong> planning and preparation, a report within 24 hours of
            every session, monthly reporting, safeguarding records and a monthly nil return, travel to the session, and
            attendance at reviews by agreement.
          </p>
          <p className="jw-caption">
            <strong>Not included:</strong> transport for the young person, and exam or
            accreditation fees, which are charged at cost where agreed in advance. James Wallace Education Ltd is not VAT
            registered, so no VAT is added. Billing is monthly in arrears, session by session, unless the commission or a framework sets a different period.
          </p>
        </div>
      </section>
      ) : (
      <section className="jw-section jw-section-white" id="prices">
        <div className="jw-container">
          <h2>What it costs</h2>
          <p className="jw-body jw-measure">
            Prices for commissioned placements are by the hour, half day or day, with planning, a report within
            24 hours of every session, safeguarding records and travel included. I send the current prices
            the same day on request.
          </p>
          <Link to="/contact?for=commissioner" className="jw-btn-secondary">Ask for prices</Link>
        </div>
      </section>
      )}

      {/* Policies statement */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>Policies &amp; procedures</h2>
              <p className="jw-body">
                James Wallace Education keeps an EOTAS-aligned policy suite
                covering Safeguarding, Lone Working, Data Protection, Health
                &amp; Safety, Behaviour Support, and more. The suite was {POLICY_PACK.status}; policies are shared with
                commissioners on request.
              </p>
              <p className="jw-body">
                Ask for the current approved policies, or a specific policy for
                review before commissioning.
              </p>
              <SafeguardingLead />
              <div className="d-flex flex-wrap gap-3 mt-3">
                <Link to="/compliance" className="jw-btn-secondary">
                  Compliance details
                </Link>
                <Link to="/contact?for=commissioner" className="jw-btn-secondary">
                  Request approved policies
                </Link>
              </div>
              <p className="jw-caption">
                Free parent guides I maintain: <a href={GUIDES_HUB.url}>{GUIDES_HUB.name}</a>.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot jw-shot--sm">
                <img
                  src="/portal/11-policies.webp?v=1013"
                  width="1600"
                  height="1000"
                  alt={`Policy library in ${PRODUCT.name}, grouped by category with status and version`}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Commissioner Q&A — ruled rows */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2>Commissioner questions</h2>
          <p className="jw-body jw-measure">
            The questions commissioners most commonly ask - answered directly.
          </p>
          <ul className="jw-row-list">
            {commissionerQA.map((item) => (
              <li key={item.q}>
                <h3>&quot;{item.q}&quot;</h3>
                <p>{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Ready to commission?</h2>
          <p className="jw-body jw-measure jw-measure--center">
            Submit a referral or request an evidence pack. I respond {REPLY.within}.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/contact?for=commissioner&topic=evidence-pack" className="jw-btn-secondary">
              Request Evidence Pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
