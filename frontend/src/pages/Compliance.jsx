import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { STATUTORY, TRAINING, PRODUCT, SAFEGUARDING_ROLES, ARMED_FORCES, POLICY_PACK, CARE_LEAVERS, HOSTING, PLATFORM_STATUS } from "../data/facts";
import SafeguardingLead from "../components/SafeguardingLead";
import PageHeader from "../components/PageHeader";

const staffComplianceRows = [
  { requirement: "Enhanced DBS (Update Service or renewed)", tracked: "RAG status, expiry alert" },
  { requirement: `Safeguarding / ${STATUTORY.kcsie} update`, tracked: `Completed ${TRAINING.safeguarding.completed}` },
  { requirement: TRAINING.prevent.name, tracked: `Completed ${TRAINING.prevent.completed}` },
  { requirement: TRAINING.dsl.name, tracked: `Completed ${TRAINING.dsl.completed}, renewal ${TRAINING.dsl.renewal}` },
  { requirement: "Child-on-child abuse (agency onboarding)", tracked: "Valid to 22 August 2027" },
  { requirement: "Lone working and personal safety", tracked: `Covered in ${TRAINING.safeAndSupported.name} (${TRAINING.safeAndSupported.provider}), completed ${TRAINING.safeAndSupported.completed}` },
  { requirement: "Health & Safety Awareness", tracked: "Completion date recorded" },
  { requirement: "Data Protection / UK GDPR", tracked: "Completion date recorded" },
  { requirement: "Right to Work verification", tracked: "Provider + reference date" },
];

const dataProtectionPoints = [
  {
    title: "AES-256-GCM encryption",
    desc: "All personally identifiable data - learner names, diagnoses, carer contacts, medical information, session notes - encrypted at rest.",
  },
  {
    title: "Full audit trail",
    desc: "Every access and change to learner data is logged and timestamped - available for inspection or SAR response.",
  },
  {
    title: "EU hosting, moving to the UK",
    desc: `Data is hosted on Neon PostgreSQL, ${HOSTING.now}. ${HOSTING.planned} Data processor agreement available on request.`,
  },
  {
    title: "SAR process",
    desc: "Subject Access Requests handled within statutory timescales. Data export available from portal for any learner record.",
  },
];

export default function Compliance() {
  usePageMeta({
    title: 'Safeguarding & Compliance | James Wallace, Specialist SEND & EOTAS Tutor',
    description:
      'Safeguarding framework aligned to KCSIE and Working Together to Safeguard Children, with an approved EOTAS policy suite and DBS and training tracked in the portal.',
    path: '/compliance',
  });

  return (
    <>
      {/* Style B hero (LOOK-SITE-1 item 5). */}
      <PageHeader
        title={<>Safeguarding you <em>can inspect</em></>}
        lede="Every safeguard and compliance check is part of day-to-day delivery, with records available for the commissioner to review."
        actions={<>
          <Link to="/contact?for=commissioner" className="jw-btn-primary">Request Approved Policies</Link>
          <Link to="/platform" className="jw-btn-secondary">See the Platform</Link>
        </>}
        image={{
          src: "/hero/compliance-1100.webp",
          srcSet: "/hero/compliance-600.webp 600w, /hero/compliance-1100.webp 1100w",
          sizes: "(max-width: 991px) 100vw, 30rem",
          width: 1100,
          height: 1100,
          fetchPriority: "high",
          alt: "Neat stacks of printed records and folders on a desk beside a laptop.",
        }}
      />

      {/* Safeguarding framework */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>Safeguarding framework</h2>
              <p className="jw-body">
                I work in line with{" "}
                <em>{STATUTORY.kcsieLong}</em> and{" "}
                <em>{STATUTORY.workingTogether}</em>. I complete
                safeguarding training annually and hold an enhanced DBS on the
                Update Service, with details available for the checks required before a placement.
              </p>
              <p className="jw-body">{SAFEGUARDING_ROLES.leads}</p>
              <SafeguardingLead />
              <ul className="jw-list">
                <li>
                  All concerns logged immediately in an encrypted,
                  audit-trailed system
                </li>
                <li>
                  PIRFs completed for every physical intervention before
                  caseload can proceed
                </li>
                <li>
                  Concern lifecycle: Queued &rarr; In Progress &rarr; Resolved
                  / Escalated
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot">
                <img
                  src="/portal/06-safeguarding.webp"
                  alt={`Safeguarding concerns and the raise-a-concern button in ${PRODUCT.name}`}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Lone working */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-12 col-lg-6">
              <h2>Lone working</h2>
              <p className="jw-body">
                On a placement commissioned directly from James Wallace Education, every solo session
                is checked in through the portal at the start and checked out at the end, so there is
                a timestamped record of where I was and for how long. {PLATFORM_STATUS.follow} The portal supports a live supervisor feed
                and overdue-session alerting for multi-practitioner providers; as a
                sole practitioner the escalation route is agreed in writing with the
                commissioning school or local authority before teaching begins.
              </p>
              <ul className="jw-list">
                <li>
                  Lone working audit reports can be produced for inspection
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot">
                <img
                  src="/portal/07-lone-working.webp"
                  alt={`Live lone working sessions view in ${PRODUCT.name}`}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Staff compliance record — a ruled list, not a boxed table */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-start g-5">
            <div className="col-12 col-lg-6">
              <h2>Compliance record</h2>
              <p className="jw-body">
                Everything below is current before I take a placement, and
                renewal dates are tracked with expiry alerts rather than left
                to lapse.
              </p>
              <ul className="jw-row-list">
                {staffComplianceRows.map((row) => (
                  <li key={row.requirement}>
                    <h3>{row.requirement}</h3>
                    <p>{row.tracked}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot">
                <img
                  src="/portal/08-compliance.webp"
                  alt={`Compliance record and emergency procedure in ${PRODUCT.name}`}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Data protection and scope */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          {/* Scope boundary. Nothing on the site said what this provision is not, and on pages that touch EHCPs,
              diagnosis and mental health that omission is a risk to James as much as to a reader. */}
          <div className="jw-callout">
            <h3>Scope of this provision</h3>
            <p>
              This is specialist teaching. It does not replace clinical assessment, medical advice, psychological
              therapy or legal advice, and nothing here should be read as any of those. Where a learner needs a
              diagnosis, therapeutic input or representation at tribunal, I will say so and point you to the right
              service rather than work outside what a qualified teacher should be doing.
            </p>
          </div>

          {/* Care leavers. The offer and status come from facts.js; no Covenant logo until confirmed. */}
          <div className="jw-callout">
            <h3>Care leavers</h3>
            <p>
              Leaving care often means sitting exams without the help most young people can count on at home.{" "}
              {CARE_LEAVERS.offer} {CARE_LEAVERS.how}
            </p>
            <p className="jw-caption">
              {CARE_LEAVERS.statement}{" "}
              <a href={CARE_LEAVERS.covenantUrl} target="_blank" rel="noopener noreferrer">
                About the Covenant<span aria-hidden="true"> ↗</span>
              </a>
            </p>
          </div>

          {/* Armed Forces families. Status wording comes from facts.js and says "submitted" until the
              certificate is signed; no Covenant logo before then. */}
          <div className="jw-callout">
            <h3>Armed Forces families</h3>
            <p>
              Children in Forces families can change schools often and spend long stretches with a parent away.
              I take that into account in how teaching begins, the pace it moves at and what happens when a
              family is posted, so that a young person is not set back by their family&apos;s service. Where a
              family needs help beyond teaching, I will point them to the support available to the Armed
              Forces community.
            </p>
            <p className="jw-caption">
              {ARMED_FORCES.statement}{" "}
              <a href={ARMED_FORCES.covenantUrl} target="_blank" rel="noopener noreferrer">
                About the Covenant<span aria-hidden="true"> ↗</span>
              </a>
            </p>
          </div>

          <h2>Data protection</h2>
          <ul className="jw-row-list">
            {dataProtectionPoints.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Policies */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>Policies &amp; procedures</h2>
              <p className="jw-body">
                James Wallace Education, the provision operated by James Wallace, keeps an EOTAS-aligned policy suite - Safeguarding,
                Lone Working, Data Protection, Health &amp; Safety, Behaviour
                Support, and more. The suite was {POLICY_PACK.status}; policies
                are shared with commissioners on request.
              </p>
              <p className="jw-body">
                The portal is built to version-control policies with review
                dates, track policy health (overdue for review, due within 30
                days, still in draft), and export approved policies.
              </p>
              <Link
                to="/contact?for=commissioner"
                className="jw-btn-secondary mt-2 d-inline-block"
              >
                Request approved policies
              </Link>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot">
                <img
                  src="/portal/11-policies.webp"
                  alt={`Policy library in ${PRODUCT.name}, grouped by category with status and version`}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection readiness */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-12 col-lg-6">
              <h2>Inspection readiness</h2>
              <p className="jw-body">
                For LA monitoring visits or Ofsted inspections, the platform
                is built to generate a full Inspection Bundle PDF for any case:
                PLP with criteria, weekly plans, daily evidence, safeguarding
                timeline, and lone working log - all in one document, on demand.{" "}
                {PLATFORM_STATUS.follow}
              </p>
              <p className="jw-body">
                You can also export case chronologies, supervision
                records, compliance audit logs and approved policies to support
                the commissioner&#39;s review.
              </p>
              <Link
                to="/contact?for=commissioner"
                className="jw-btn-secondary mt-2 d-inline-block"
              >
                Request inspection bundle example
              </Link>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot">
                <img
                  src="/portal/12-inspection-bundle.webp"
                  alt={`Case view in ${PRODUCT.name} with the weekly plan, daily reports and exports tabs`}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Need to verify any of this?</h2>
          <p className="jw-body jw-measure jw-measure--center">
            Ask for approved policies, an example evidence bundle, or my DBS
            details. Parents, agencies and local authorities all get the same
            answer.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner" className="jw-btn-primary">
              Request Approved Policies
            </Link>
            <Link to="/contact?for=commissioner" className="jw-btn-secondary">
              Request Inspection Bundle Example
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
