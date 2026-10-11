import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { BIO, SAFEGUARDING_ROLES, STATUTORY, TRAINING } from "../data/facts";
import PageHeader from "../components/PageHeader";

// LOOK-SITE-1 item 2: the icon cards are gone. Both "where my experience is most useful" and
// "how I work" are now plain ruled rows, in the same left-aligned style as Home and Credentials.
const specialisms = [
  {
    title: "Neurodivergent learners",
    description: "ADHD, Autism, PDA profile, Dyslexia, and co-occurring presentations - structured sessions adapted to each learner's profile.",
  },
  {
    title: "SEMH & complex needs",
    description: "Social, emotional, and mental health needs; EBSA; LAC; and learners with trauma-informed requirements.",
  },
  {
    title: "EHCP delivery",
    description: "Provision aligned to EHCP outcomes with PLP criterion tracking updated after every session.",
  },
  {
    title: "LA partnership",
    description: "Built for local authority, SEND team and virtual school head commissioning, with reporting arrangements agreed in the commission.",
  },
];

const workingPrinciples = [
  {
    title: "Learner-centred",
    description: "Every placement is built around the individual - their interests, communication style, and learning environment.",
  },
  {
    title: "Evidence-based practice",
    description: "Teaching informed by SEND training, with daily session evidence used to review and adjust the plan.",
  },
  {
    title: "Structured provision",
    description: "Predictable session structure, weekly planning, and records from referral to case closure.",
  },
  {
    title: "Clear reporting",
    description: "Portal access, safeguarding records, and evidence exports for placement reviews.",
  },
];

export default function About() {
  usePageMeta({
    title: 'About James Wallace | Specialist SEND Educator | James Wallace Education',
    description:
      'Thirteen years teaching in specialist provision, twelve of them in a special school, five years inside a local authority commissioning team, now delivering EOTAS for neurodiverse young people.',
    path: '/about',
  });

  return (
    <>
      {/* Style B hero (LOOK-SITE-1 item 5). */}
      <PageHeader
        eyebrow="Education Specialist & EOTAS Provider"
        title="Meet James Wallace"
        lede="James Wallace Education is the specialist educational provision operated by James Wallace. I deliver structured alternative provision for neurodiverse learners who cannot access mainstream or special school settings, with a clear record of what was planned, delivered and reviewed."
        body={<>
          <p className="jw-caption">Formerly trading as ND Services.</p>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {[
              BIO.degreeShort,
              "MEd",
              "QTS",
              "Enhanced DBS",
              SAFEGUARDING_ROLES.deputy.role,
              "Understanding Autism",
            ].map((t) => (
              <span key={t} className="jw-badge">
                {t}
              </span>
            ))}
          </div>
        </>}
        actions={<>
          <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">Make a Referral</Link>
          <Link to="/credentials" className="jw-btn-secondary">Full Credentials</Link>
        </>}
        image={{
          className: "jw-page-header-portrait",
          src: "/james-wallace.webp",
          width: 1024,
          height: 1536,
          fetchPriority: "high",
          alt: "James Wallace - Education Specialist and EOTAS Provider",
        }}
      />

      {/* Bio */}
      <section className="jw-section jw-section-white">
        <div className="jw-container jw-measure">
          <h2>One practitioner, accountable throughout</h2>
          <p className="jw-body">
            James Wallace Education is operated by James Wallace, and in practice is James
            Wallace: one qualified teacher rather than a staffed agency, which is
            deliberate. Thirteen years teaching in specialist provision, twelve
            of them in a special school, and five inside a county
            council&#39;s children&#39;s commissioning team. James holds
            a {BIO.degree}, a Master of Education (MEd), Qualified
            Teacher Status since 2004, and an Enhanced DBS on the Update Service.
          </p>
          <p className="jw-body">
            The provision is deliberately small: one qualified teacher remains
            responsible for the teaching and records, with safeguarding led by the
            Designated Safeguarding Lead. I work with Local Authority SEND teams, EOTAS coordinators and EHCP caseworkers,
            at present on placements that come through agencies, sharing the evidence they need
            to review a placement.
          </p>
          <p className="jw-body">
            {SAFEGUARDING_ROLES.dsl.name} is the{" "}
            {SAFEGUARDING_ROLES.dsl.role} for the provision, and I am the{" "}
            {SAFEGUARDING_ROLES.deputy.role}. We have both completed{" "}
            {TRAINING.dsl.provider}&apos;s {TRAINING.dsl.name} course, certificated{" "}
            {TRAINING.dsl.completed}. I hold current safeguarding and{" "}
            {STATUTORY.kcsie}, Prevent duty, child-on-child abuse and allergy
            awareness training, and have completed {TRAINING.safeAndSupported.provider}&apos;s{" "}
            <Link to="/credentials#training">{TRAINING.safeAndSupported.name}</Link> course, which covers
            lone working and personal safety. I also hold the
            Whole School SEND Platinum award. Renewal dates are tracked with
            expiry alerts rather than left to lapse.
          </p>
          <p className="jw-body">{SAFEGUARDING_ROLES.dsl.intro}</p>
        </div>
      </section>

      {/* Provision specialisms */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2>Where my experience is most useful</h2>
          <ul className="jw-row-list">
            {specialisms.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Provider values */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2>How I work</h2>
          <ul className="jw-row-list">
            {workingPrinciples.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2>Commission specialist provision</h2>
          <p className="jw-body jw-measure jw-measure--center">
            If you have a young person who needs structured, specialist
            alternative provision, get in touch. I respond to referral enquiries
            within 2 working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/contact?for=commissioner&topic=referral" className="jw-btn-primary">
              Make a Referral
            </Link>
            <Link to="/for-las" className="jw-btn-secondary">
              For Local Authorities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
