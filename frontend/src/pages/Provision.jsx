import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { SAFEGUARDING_ROLES, STATUTORY, DELIVERY, TRAINING, PRODUCT, AREA, PLATFORM_STATUS } from "../data/facts";
import SafeguardingLead from "../components/SafeguardingLead";
import PhotoBanner from "../components/PhotoBanner";

const learnerProfiles = [
  { label: "EOTAS", description: "Education Other Than At School - full-time or part-time alternative to school placement" },
  { label: "EBSA", description: "Emotionally-Based School Avoidance - graduated reintegration or maintained AP" },
  { label: "AP", description: "Alternative Provision alongside or instead of a specialist school placement" },
  { label: "EHCP", description: "Learners with an Education, Health and Care Plan requiring specialist delivery" },
  { label: "LAC", description: "Looked After Children with SEND or SEMH needs, including virtual school commissioned placements" },
  { label: "PDA profile", description: "Pathological Demand Avoidance - sessions adapted to demand avoidance and autonomy" },
];

const deliveryModels = [
  {
    title: "In-Person",
    desc: <>Sessions delivered at a community venue, learner&#39;s home (with appropriate risk assessment), or agreed location. {AREA.sentence}</>,
  },
  {
    title: "Remote",
    desc: "Online sessions via a secure video platform, suitable for learners with EBSA, phobia, or significant sensory needs. Full daily session reporting applies.",
  },
  {
    title: "Mixed / blended",
    desc: "A combination of in-person and remote delivery, often used in EBSA reintegration programmes or where session days vary.",
  },
  {
    title: "Session cadence",
    desc: <>Typically {DELIVERY.hoursPerWeek} of taught sessions, depending on the commission. Sessions are planned weekly, with individual daily reports submitted within 24 hours.</>,
  },
  {
    title: "Coverage",
    desc: <>{AREA.label}. Ask me about anywhere else.</>,
  },
  {
    title: "Subject coverage",
    desc: "Maths, English, Computer Science, Science, and functional skills. Wider curriculum by agreement. PLP outcomes determine subject focus.",
  },
];

export default function Provision() {
  usePageMeta({
    title: 'Provision | EOTAS, EBSA and Alternative Provision | James Wallace',
    description:
      'One-to-one and small-group provision for learners with autism, ADHD, PDA and anxiety-based school avoidance. Personal learning plans, daily evidence, termly review.',
    path: '/provision',
  });

  return (
    <>
      <PhotoBanner
        name="provision"
        eyebrow="The provision"
        alt="A teenager and a tutor working together at a table in a library, both smiling."
      >
        Teaching that makes
        <br />
        <em>the next step possible</em>
      </PhotoBanner>

      {/* Introduction */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <p className="jw-lede">
                Structured, specialist teaching for young people who cannot
                access a mainstream or special school. I work across EOTAS,
                EBSA, alternative provision and EHCP placements, with evidence
                filed after every session and an unbroken record from first
                contact to case closure.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
                  Make a Referral &rarr;
                </Link>
                <Link to="/platform" className="jw-btn-secondary">
                  See the Platform
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <figure className="jw-media-figure">
                <img
                  className="jw-photo-43 jw-photo-43--left"
                  src="/hero/with-tutor-clean-1942.webp"
                  srcSet="/hero/with-tutor-clean-1000.webp 1000w, /hero/with-tutor-clean-1942.webp 1942w"
                  sizes="(max-width: 991px) 100vw, 34rem"
                  loading="lazy"
                  alt="A teenager and a teacher working side by side at a table, both smiling."
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Learner profiles — ruled rows, no coloured chips */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2>Who I work with</h2>
          <p className="jw-body jw-measure">
            Referrals come from families, agencies and local authorities,
            across a range of SEND, SEMH and placement categories.
          </p>
          <ul className="jw-row-list">
            {learnerProfiles.map((profile) => (
              <li key={profile.label}>
                <h3>{profile.label}</h3>
                <p>{profile.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery model */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>How it is delivered</h2>
              <p className="jw-lede">
                Flexible, structured provision built around each learner&#39;s needs,
                location, and commissioning arrangement.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-media-figure">
                <img
                  className="jw-photo-43"
                  src="/hero/student-working-1600.webp"
                  srcSet="/hero/student-working-800.webp 800w, /hero/student-working-1600.webp 1600w"
                  sizes="(max-width: 991px) 100vw, 34rem"
                  loading="lazy"
                  alt="A teenager writing in a notebook beside a laptop, smiling."
                />
              </figure>
            </div>
          </div>
          <ul className="jw-row-list">
            {deliveryModels.map((model) => (
              <li key={model.title}>
                <h3>{model.title}</h3>
                <p>{model.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Evidence chain */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2>The evidence you receive</h2>
              <p className="jw-body">
                Every placement is designed to follow a structured, auditable evidence
                workflow from first session to case closure. {PLATFORM_STATUS.sentence}
              </p>
              {/* These two steps used to read "approved by supervisor" and "panic button available throughout". Both are
                  real JWE Portal features, but they are multi-practitioner features, and I am a sole practitioner. The
                  platform and compliance pages already say so; this page now says the same thing. */}
              <ul className="jw-row-list">
                {[
                  { step: "Plan", desc: `Weekly session plan submitted in ${PRODUCT.name} - PLP criteria, planned activities, session logistics. The plan is locked before delivery begins, so the week has an evidence baseline. Where a commissioner wants sight of it first, approval is recorded against the plan.` },
                  { step: "Deliver", desc: "I deliver the session, with a lone working check-in at the start and check-out at the end, timestamped. The portal's panic alert and live supervisor feed are built for providers with a supervisory team; as a sole practitioner, my escalation route is agreed in writing with the commissioner before teaching begins." },
                  { step: "Evidence", desc: "Daily report submitted within 24 hours - attendance, engagement (0 to 5), per-subject activity notes, PLP criterion progress, safeguarding observations." },
                ].map((item) => (
                  <li key={item.step}>
                    <h3>{item.step}</h3>
                    <p>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="jw-shot">
                <img
                  src="/portal/03b-weekly-plan-tab.webp"
                  alt={`Case view in ${PRODUCT.name} showing the Weekly Plan tab`}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguarding summary */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-8">
              <h2>Safeguarding</h2>
              <p className="jw-body">
                Safeguarding is built into every stage of delivery - not added
                after the fact. I work in line with {STATUTORY.kcsie} and{" "}
                {STATUTORY.workingTogether}.
              </p>
              <ul className="jw-list">
                <li>{SAFEGUARDING_ROLES.dsl.name} is the {SAFEGUARDING_ROLES.dsl.role}, and I am the {SAFEGUARDING_ROLES.deputy.role}; we have both completed {TRAINING.dsl.provider}&apos;s {TRAINING.dsl.name} course, certificated {TRAINING.dsl.completed}</li>
                <li>All concerns logged immediately in an encrypted, audit-trailed system</li>
                <li>Physical Intervention Recording Forms (PIRFs) completed before caseload can proceed</li>
                <li>Timestamped lone working check-in and check-out for every solo session, with the escalation route agreed in writing with the commissioner</li>
                <li>Automated daily alerts for stale or unactioned safeguarding concerns</li>
              </ul>
              <p className="jw-body">{SAFEGUARDING_ROLES.dsl.intro}</p>
              <SafeguardingLead />
              <Link to="/compliance" className="jw-btn-secondary mt-3 d-inline-block">
                Full compliance details &rarr;
              </Link>
            </div>
            <div className="col-12 col-lg-4">
              <figure className="jw-shot">
                <img
                  src="/portal/06-safeguarding.webp"
                  alt={`Safeguarding concerns and the raise-a-concern button in ${PRODUCT.name}`}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Make a referral</h2>
          <p className="jw-body jw-measure jw-measure--center">
            If you have a young person who needs structured, specialist
            provision, get in touch. I come back within two working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/contact?for=commissioner&topic=evidence-pack" className="jw-btn-secondary">
              Request an example evidence pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
