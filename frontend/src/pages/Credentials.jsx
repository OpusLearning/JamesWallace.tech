import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { BIO, SAFEGUARDING_ROLES, STATUTORY, TRAINING, REVIEWED, PROJECT_SEARCH, REFERENCES as references } from "../data/facts";
import "./Credentials.css";

const academicQuals = [
  {
    title: BIO.degree,
    institution: "Manchester Metropolitan University",
    logo: "/badges/manchester-met.png",
    awarded: null,
    detail: "The computing degree behind the Computer Science and ICT teaching, up to A level.",
    modules: null,
  },
  {
    title: "PGCE: Secondary Education (Vocational: Applied ICT)",
    institution: "University of Derby",
    logo: "/badges/derby.png",
    awarded: "July 2004",
    detail: "The teaching qualification itself, and the route to Qualified Teacher Status. Secondary specialist in applied and vocational ICT.",
    modules: null,
  },
  {
    title: "Master of Education (MEd)",
    institution: "The Open University",
    logo: "/badges/open-university.png",
    awarded: "31 December 2012",
    detail: "A master\u2019s degree in education: advanced study of how learning works and how provision should be designed. 180 credits at Level 7, all passed.",
    modules: [
      "Educational enquiry (E891)",
      "Researching inclusive education (E848)",
      "Educational leadership (E856)",
    ],
  },
];

const cpdCerts = [
  {
    title: "Qualified Teacher Status",
    group: "qualification",
    provider: "Department for Education",
    issued: "1 August 2004",
    detail: "Teacher reference number redacted on the published copy. Any employer can confirm the award at gov.uk/guidance/check-a-teachers-record.",
    desc: "QTS for maintained schools and non-maintained special schools in England, awarded by the Department for Education.",
    badge: "/badges/dfe.png",
    wide: true,
    cert: "/certificates/cert_tra_qualified-teacher-status_redacted.pdf",
  },
  {
    title: "Whole School SEND — Platinum",
    group: "send",
    provider: "Whole School SEND (nasen)",
    issued: "11 September 2026",
    detail: "The top tier of the national Whole School SEND CPD framework. Bronze, Silver and Gold earned on the way to it.",
    desc: "Twenty units covering resilience, memory for learning, reading and comprehension, mathematics, person-centred working, promoting independence and transitions.",
    badge: "/badges/whole-school-send.png",
    wide: true,
    cert: "/certificates/cert_whole-school-send_platinum_2026-09-11.pdf",
  },
  {
    title: "Understanding ADHD",
    group: "send",
    provider: "The Open University / OpenLearn",
    issued: "11 September 2026",
    detail: "Statement of Participation achieved.",
    desc: "ADHD across the lifespan: attention, executive function, emotional regulation and the practical adjustments that help a learner rather than label them.",
    badge: "/badges/openlearn.png",
    wide: true,
    cert: "/certificates/cert_openlearn_understanding-adhd_statement_2026-09-11.pdf",
  },
  {
    title: "Supporting Children's Mental Health and Wellbeing",
    group: "send",
    provider: "The Open University / OpenLearn",
    issued: "11 September 2026",
    detail: "Statement of Participation and digital badge achieved.",
    desc: "How mental health develops in childhood, what protects it, and how the adults around a child respond when it is under strain.",
    badge: "/badges/openlearn-childrens-mental-health.png",
    cert: "/certificates/cert_openlearn_childrens-mental-health_statement_2026-09-11.pdf",
  },
  {
    title: "Foundations of Trauma-Informed, Relationship-Based Practice",
    group: "send",
    provider: "The Open University / OpenLearn Create",
    issued: "11 September 2026",
    detail: "Digital badge awarded. The provider issues no certificate for this course.",
    desc: "Trauma-informed and relationship-based approaches for young people whose behaviour is a response to what has happened to them, rather than a discipline problem.",
    badge: "/badges/trauma-informed-badge.png",
  },
  {
    title: "Suicide Awareness Training",
    group: "send",
    provider: "Zero Suicide Alliance",
    issued: "11 September 2026",
    detail: "Completed.",
    desc: "Recognising and responding to suicidal distress. Directly relevant to work with young people in crisis and out of education.",
    badge: "/badges/zsa.png",
    cert: "/certificates/cert_zsa_suicide-awareness_2026-09-11.pdf",
  },
  {
    title: "Suicide Awareness Training: Supporting Autistic People",
    group: "send",
    provider: "Zero Suicide Alliance",
    issued: "11 September 2026",
    detail: "Completed.",
    desc: "How suicide risk presents differently in autistic people, and how to have the conversation in a way that works for them.",
    badge: "/badges/zsa.png",
    cert: "/certificates/cert_zsa_autism-suicide-awareness_2026-09-11.pdf",
  },
  {
    title: "Understanding Autism",
    group: "send",
    provider: "The Open University / OpenLearn",
    issued: "17 June 2025",
    detail: "24 CPD hours. Badge quiz scores: 93% and 95%. Accredited by the CPD Standards Office.",
    desc: "8-week course covering autism spectrum conditions, diagnosis, communication, sensory differences, intervention approaches, and neurodiversity perspectives.",
    badge: "/badges/openlearn-understanding-autism.png",
    cert: "/certificates/cert_openlearn_understanding-autism_statement_2025-06-17.pdf",
  },
  {
    title: "Language and Communication in Autism",
    group: "send",
    provider: "Clearly Education",
    issued: "12 June 2025",
    detail: "CPD Certified, The CPD Certification Service. 1 CPD hour.",
    desc: "Specialist focus on language development and communication strategies for autistic learners in educational settings.",
    badge: "/badges/clearly-education.png",
    wide: true,
  },
  {
    title: "Sensory Processing Aware with GriffinOT, Level 1",
    group: "send",
    provider: "GriffinOT (Kim Griffin, Occupational Therapist)",
    issued: "13 June 2025",
    detail: "Introduction to the eight senses and sensory processing, foundation for Levels 2 and 3.",
    desc: "Practical frameworks for identifying and supporting sensory processing differences in young people.",
    badge: "/badges/griffinot.png",
    wide: true,
  },
  {
    title: TRAINING.dsl.name,
    group: "safeguarding",
    provider: TRAINING.dsl.provider,
    issued: TRAINING.dsl.completed,
    detail: `Certificate number T-5346277-6416245. City & Guilds Assured and CPD Certified. Recommended renewal ${TRAINING.dsl.renewal}. Verify at highspeedtraining.co.uk/verify.`,
    desc: `Level 3 training for the ${SAFEGUARDING_ROLES.dsl.role} role, completed by both the DSL and the ${SAFEGUARDING_ROLES.deputy.role}.`,
    wide: true,
    cert: "/certificates/cert_hst_designated-safeguarding-lead-l3_2026-09-24.pdf",
  },
  {
    title: "Safeguarding Young People (Level 2)",
    group: "safeguarding",
    provider: "Fresh Start in Education",
    issued: "9 September 2026",
    detail: "CPD Certified, The CPD Certification Service.",
    desc: "Level 2 safeguarding for staff working directly with young people in alternative provision.",
    badge: "/badges/fresh-start.png",
    cert: "/certificates/cert_freshstart_safeguarding-young-people-l2_2026-09-09.pdf",
  },
  {
    title: TRAINING.safeAndSupported.name,
    group: "safeguarding",
    provider: TRAINING.safeAndSupported.provider,
    issued: TRAINING.safeAndSupported.completed,
    detail: `CPD Certified, The CPD Certification Service. ${TRAINING.safeAndSupported.score}`,
    desc: TRAINING.safeAndSupported.modules,
    badge: "/badges/fresh-start.png",
    cert: "/certificates/cert_freshstart_safe-and-supported_2026-08-22.pdf",
  },
  {
    title: "Safeguarding Training for Teachers and School Staff, KCSIE 2026 Update",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "The 2026 update to Keeping Children Safe in Education, and what changed for staff working with children.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_safeguarding-kcsie-2026_2026-09-09.pdf",
  },
  {
    title: "Prevent Duty Training for Educators",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "The statutory Prevent duty in practice, and the referral route when a concern arises.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_prevent-duty_2026-09-09.pdf",
  },
  {
    title: "Benedict's Law: Allergy and Anaphylaxis Safety",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "Allergy safety in schools, including recognising anaphylaxis and responding to it.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_benedicts-law-allergy_2026-09-09.pdf",
  },
  {
    title: "Recognising and Responding to FGM",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "Female genital mutilation: the indicators, the mandatory reporting duty, and how to respond.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_fgm-recognise-respond_2026-09-09.pdf",
  },
  {
    title: "Pastoral Roles in Schools",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "How pastoral support is structured across the phases of education, and where each role sits.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_pastoral-roles_2026-09-09.pdf",
  },
  {
    title: "Social Media Guidance for Educators",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "Professional boundaries online when working with children and young people.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_social-media-for-educators_2026-09-09.pdf",
  },
  {
    title: "Teaching Reading as a Behaviour, Not a Subject",
    group: "safeguarding",
    provider: "My-Progression",
    issued: "9 September 2026",
    detail: "Module passed.",
    desc: "Reading as something a learner does rather than a subject taught, and what that changes in practice.",
    badge: "/badges/my-progression.png",
    wide: true,
    cert: "/certificates/cert_my-progression_teaching-reading-as-behaviour_2026-09-09.pdf",
  },
  {
    title: "Safeguarding Young People",
    group: "safeguarding",
    provider: "Tes",
    issued: "28 March 2025",
    detail: "4 CPD credits. CPD Certified.",
    desc: "Recognising and acting on safeguarding concerns, and the referral routes that follow.",
    badge: "/badges/tes.png",
    wide: true,
    cert: "/certificates/cert_tes_safeguarding-young-people_2025-03-28.pdf",
  },
  {
    title: "The Prevent Duty",
    group: "safeguarding",
    provider: "Tes",
    issued: "28 March 2025",
    detail: "2 CPD credits. CPD Certified.",
    desc: "The statutory Prevent duty and what it asks of anyone teaching children and young people.",
    badge: "/badges/tes.png",
    wide: true,
    cert: "/certificates/cert_tes_prevent-duty_2025-03-28.pdf",
  },
  {
    title: "Advanced Safeguarding, Child Protection and Prevent",
    group: "safeguarding",
    provider: "Connex Education Academy",
    issued: "16 April 2025",
    detail: "2 credits. CPD Accredited, The CPD Standards Office.",
    desc: "Advanced safeguarding and child protection, including the Prevent duty, at the level expected of staff in specialist settings.",
    badge: "/badges/connex-education.png",
    wide: true,
    cert: "/certificates/cert_connex_advanced-safeguarding-cp-prevent_2025-04-16.pdf",
  },
  {
    title: "SEND Code of Practice",
    group: "safeguarding",
    provider: "Connex Education Academy",
    issued: "16 April 2025",
    detail: "2 credits. CPD Accredited, The CPD Standards Office.",
    desc: "The statutory framework behind EHCPs, SEN support and the duties a local authority and a setting each carry.",
    badge: "/badges/connex-education.png",
    wide: true,
    cert: "/certificates/cert_connex_send-code-of-practice_2025-04-16.pdf",
  },
  {
    title: "Effective Cover Supervision",
    group: "safeguarding",
    provider: "Connex Education Academy",
    issued: "16 April 2025",
    detail: "1 credit. CPD Accredited, The CPD Standards Office.",
    desc: "Managing learning and behaviour with a class you do not normally teach.",
    badge: "/badges/connex-education.png",
    wide: true,
    cert: "/certificates/cert_connex_effective-cover-supervision_2025-04-16.pdf",
  },
  {
    title: "Advanced Safeguarding, Child Protection and Prevent 2026/27",
    group: "safeguarding",
    provider: "Academize",
    issued: "9 September 2026",
    detail: "2 credits. CPD Accredited.",
    desc: "The current year's advanced safeguarding and child protection training, including the Prevent duty.",
    badge: "/badges/academize.png",
    wide: true,
    cert: "/certificates/cert_academize_advanced-safeguarding-cp-prevent_2026-09-09.pdf",
  },
  {
    title: "Allergy Awareness and Anaphylaxis",
    group: "safeguarding",
    provider: "Academize",
    issued: "24 August 2026",
    detail: "CPD Accredited.",
    desc: "Recognising an allergic reaction and responding to anaphylaxis, which matters when teaching in a family home.",
    badge: "/badges/academize.png",
    wide: true,
    cert: "/certificates/cert_academize_allergy-anaphylaxis_2026-08-24.pdf",
  },
  {
    title: "Professional Standards in Education",
    group: "safeguarding",
    provider: "Academize",
    issued: "25 August 2026",
    detail: "CPD Accredited.",
    desc: "The professional standards expected of staff placed in schools through an agency.",
    badge: "/badges/academize.png",
    wide: true,
    cert: "/certificates/cert_academize_professional-standards_2026-08-25.pdf",
  },
  {
    title: "Pre-Deployment Briefing",
    group: "safeguarding",
    provider: "Academize",
    issued: "10 September 2026",
    detail: "CPD Accredited.",
    desc: "Conduct, safeguarding expectations and reporting lines, completed before going into a setting.",
    badge: "/badges/academize.png",
    wide: true,
    cert: "/certificates/cert_academize_pre-deployment-briefing_2026-09-10.pdf",
  },
  {
    title: "Tuition Educator Onboarding 2025-26",
    group: "safeguarding",
    provider: "CPD Academy, for TP Tutors",
    issued: "22 August 2026",
    detail: "Valid to 22 August 2027.",
    desc: "Child-on-child abuse, mandatory reading, the Prevent duty and KCSIE 2025 Part One. Renewed annually for agency work.",
    badge: "/badges/cpd-academy.png",
    wide: true,
    cert: "/certificates/cert_tp-tutors_educator-onboarding_2026-08-22_expires-2027-08-22.pdf",
  },
  {
    title: "Allergy Awareness 2026",
    group: "safeguarding",
    provider: "CPD Academy / SEG, for TP Tutors",
    issued: "22 August 2026",
    detail: "Valid to 22 August 2027.",
    desc: "Recognising and responding to allergic reactions, including anaphylaxis, when teaching in a family home.",
    badge: "/badges/cpd-academy.png",
    wide: true,
    cert: "/certificates/cert_tp-tutors_allergy-awareness_2026-08-22_expires-2027-08-22.pdf",
  },
  {
    title: "PRINCE2 Foundation in Project Management",
    provider: "PeopleCert",
    group: "tech",
    issued: "12 March 2023",
    detail: "PRINCE2 6th edition. Renewal lapsed March 2026, so this is held rather than current.",
    desc: "The structured project management method, which is what running a commissioned package to plan, budget and review actually is.",
    badge: "/badges/peoplecert.png",
    wide: true,
    cert: "/certificates/cert_peoplecert_prince2-foundation_2023-03-12.pdf",
  },
  {
    title: "Software Development Bootcamp: JavaScript",
    group: "tech",
    provider: "Northcoders",
    issued: "15 July 2024",
    detail: "Full-stack JavaScript bootcamp, certified completion.",
    desc: "Full-stack JavaScript development. Informs direct use of technology tools and platform development in specialist provision.",
    badge: "/badges/northcoders.png",
    wide: true,
    cert: "/certificates/cert_northcoders_js-bootcamp_2024-07-15.pdf",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    group: "tech",
    provider: "Google, via Coursera",
    issued: "25 December 2023",
    detail: "Eight courses. Badge issued through Credly.",
    badge: "/badges/google-cybersecurity.png",
    desc: "Security foundations, network security, Linux and SQL, assets and vulnerabilities, detection and response, and automating security tasks in Python.",
  },
];

// The Designated Safeguarding Lead's certificate. Published with her consent (name, role and
// certificate only — no contact details, photo or biography). Source:
// sources/training/dsl-level3-2026/README.md (James, 24 Sep 2026).
const safeguardingLeadCertificate = {
  title: TRAINING.dsl.name,
  provider: TRAINING.dsl.provider,
  issued: TRAINING.dsl.completed,
  detail: `Certificate number T-5346253-6416216. City & Guilds Assured and CPD Certified. Recommended renewal ${TRAINING.dsl.renewal}. Verify at highspeedtraining.co.uk/verify.`,
  desc: `Certificate held by ${SAFEGUARDING_ROLES.dsl.name}, ${SAFEGUARDING_ROLES.dsl.role}.`,
  cert: "/certificates/cert_hst_designated-safeguarding-lead-l3_asmaa-ahmed_2026-09-24.pdf",
};

const experience = [
  {
    role: "Specialist SEMH Teacher",
    org: "Foxwood Academy, Nottinghamshire",
    logo: "/badges/foxwood.png",
    dates: "Jan 2006 to Oct 2018",
    desc: "Twelve years delivering specialist teaching for young people with Social, Emotional and Mental Health needs. Developed inclusive curricula, wrote and implemented PLPs, and collaborated closely with SENCOs, educational psychologists, and family teams.",
    // Concurrent with the Foxwood teaching, not a separate job (sources/people/james-project-search.md),
    // so it sits inside this timeline entry rather than reading as a second employer.
    projects: [
      {
        title: PROJECT_SEARCH.title,
        dates: `${PROJECT_SEARCH.dates}, ${PROJECT_SEARCH.concurrency}`,
        summary: PROJECT_SEARCH.summary,
        desc: PROJECT_SEARCH.description,
      },
    ],
  },
  {
    role: "Public Health Support Officer",
    org: "Nottinghamshire County Council, Children's and Young People's Commissioning Hub",
    logo: "/badges/nottinghamshire-cc.png",
    dates: "Oct 2018 to Apr 2024",
    desc: "Supported commissioning and quality assurance for LAC and complex-needs young people. Involved in Care, Education and Treatment Reviews (CETRs), SEND panel processes, safeguarding reviews, and public health initiatives including Small Steps, Healthy Families, and Community Paediatric Reviews.",
  },
  {
    role: "Education Specialist (EOTAS)",
    org: "Fresh Start Education",
    logo: "/badges/fresh-start.png",
    dates: "April 2025 to present",
    desc: "One-to-one EOTAS provision commissioned by local authorities, for pupils with ASD, ADHD, PDA, SEMH needs and anxiety-based school avoidance, delivered at home, in the community and online. Re-engaging learners with long gaps in attendance, writing personalised programmes to EHCP outcomes, and producing the session reports, attendance evidence and progress updates commissioners and annual reviews need.",
  },
];

const whyItMatters = [
  {
    title: "Specialist, not generalist",
    desc: "QTS since 2004, an MEd, thirteen years teaching in specialist provision and five inside a county council's commissioning team, so the plan, the evidence and the teaching come from the same person.",
  },
  {
    title: "LA-fluent",
    desc: "Direct experience inside a Local Authority commissioning team. I understand the process, the paperwork, and what panels need to see.",
  },
  {
    title: "Safeguarding built in",
    desc: "Enhanced DBS on the Update Service, KCSIE-aware, trained in safeguarding procedures. Every session logged, every concern documented.",
  },
  {
    title: "Evidence-led",
    desc: "PLPs, daily reports, termly reviews: not box-ticking but genuine planning and communication tools.",
  },
];

const BANDS = [
  { key: "qualification", label: "Qualified teacher", note: "The award everything else sits on top of.", fold: false },
  { key: "send", label: "SEND, autism, ADHD and mental health", note: "The training that decides whether I can actually help your child.", fold: false },
  { key: "safeguarding", label: "Safeguarding, statutory and agency training", note: "Current safeguarding, Prevent and KCSIE, plus the agency compliance a commissioner checks.", fold: true },
  { key: "tech", label: "Technology and project management", note: "Where the software side of the work comes from.", fold: true },
];

const ratingLabels = [
  ["timekeeping", "Time keeping"],
  ["flexibility", "Flexibility"],
  ["honesty", "Honesty & integrity"],
  ["safeguarding", "Safeguarding"],
  ["communication", "Communication"],
];

function renderCertificate(certificate) {
  return (
    <article key={`${certificate.title}-${certificate.issued}`} className="credential-record">
      <div className="credential-record-content">
        <h3>{certificate.title}</h3>
        <p className="credential-provider">{certificate.provider}</p>
        {certificate.issued && <p className="credential-date">Completed {certificate.issued}</p>}
        {certificate.detail && <p className="credential-detail">{certificate.detail}</p>}
        {certificate.desc && <p>{certificate.desc}</p>}
        {certificate.cert && <a className="jw-text-link" href={certificate.cert} target="_blank" rel="noopener noreferrer">View certificate <span className="credential-filetype">PDF <span aria-hidden="true">↗</span></span></a>}
      </div>
      {certificate.badge && <img className={`credential-provider-mark${certificate.wide ? " is-wide" : ""}`} src={certificate.badge} alt={certificate.wide ? `${certificate.provider} logo` : `${certificate.title} badge`} loading="lazy" />}
    </article>
  );
}

export default function Credentials() {
  usePageMeta({
    title: "Qualifications & Experience | James Wallace, QTS MEd",
    description: `QTS, MEd, ${BIO.degreeShort}, enhanced DBS on the Update Service, and current safeguarding, Prevent, autism and sensory processing training.`,
    path: "/credentials",
  });

  return (
    <div className="credentials-page">
      <section className="credentials-hero jw-section" aria-labelledby="credentials-heading">
        <div className="jw-container credentials-hero-grid">
          <div>
            <p className="jw-eyebrow">Qualifications &amp; experience</p>
            <h1 id="credentials-heading">The experience <br /><em>behind the teaching.</em></h1>
            <p className="credentials-lead">A qualified teacher, a specialist background, and a clear record of the work behind both.</p>
            <p className="credentials-introduction">Here you can read my qualifications and experience, hear from previous colleagues, and inspect the training certificates. The detail is here for families and professionals alike.</p>
            <a href="#qualifications" className="jw-text-link">Explore the evidence <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="credentials-summary" aria-label="Professional background at a glance">
            <p className="jw-eyebrow">James Wallace · QTS, MEd</p>
            <dl>
              <div><dt>Teaching</dt><dd>Thirteen years in specialist provision.<span>Twelve of them at Foxwood Academy.</span></dd></div>
              <div><dt>Commissioning</dt><dd>Five years in a local authority.<span>Nottinghamshire County Council’s children’s commissioning team.</span></dd></div>
              <div><dt>Professional checks</dt><dd>Enhanced DBS.<span>Registered with the Update Service.</span></dd></div>
            </dl>
            <Link to="/compliance" className="jw-text-link">Compliance and safeguarding <span aria-hidden="true">↗</span></Link>
          </aside>
        </div>
      </section>

      <nav className="credentials-index" aria-label="On this credentials page">
        <div className="jw-container"><span>On this page</span><ul><li><a href="#qualifications">Qualifications</a></li><li><a href="#experience">Experience</a></li><li><a href="#references">References</a></li><li><a href="#training">Training &amp; certificates</a></li><li><a href="#professional-checks">Professional checks</a></li></ul></div>
      </nav>

      <section id="qualifications" className="jw-section credentials-academics" aria-labelledby="qualifications-heading">
        <div className="jw-container credentials-section-grid">
          <div className="credentials-section-intro"><p className="jw-eyebrow">01 / Qualifications</p><h2 id="qualifications-heading">A foundation<br />in <em>education.</em></h2><p>Qualified Teacher Status since 2004, alongside a teaching qualification, a computing degree and a Master of Education.</p><a className="jw-text-link" href={cpdCerts[0].cert} target="_blank" rel="noopener noreferrer">View QTS certificate <span className="credential-filetype">PDF ↗</span></a></div>
          <div className="credentials-academic-list">
            {academicQuals.map((qualification) => <article key={qualification.title} className="credential-academic">
              <div className="credential-academic-heading"><h3>{qualification.title}</h3>{qualification.logo && <img src={qualification.logo} alt={`${qualification.institution} logo`} loading="lazy" />}</div>
              <p className="credential-provider">{qualification.institution}</p>
              {qualification.awarded && <p className="credential-date">Awarded {qualification.awarded}</p>}
              <p>{qualification.detail}</p>
              {qualification.modules && <details className="credential-modules"><summary>Master’s degree modules <span aria-hidden="true">+</span></summary><ul>{qualification.modules.map((module) => <li key={module}>{module}</li>)}</ul></details>}
            </article>)}
          </div>
        </div>
      </section>

      <section id="experience" className="jw-section credentials-experience" aria-labelledby="experience-heading">
        <div className="jw-container credentials-section-grid">
          <div className="credentials-section-intro"><p className="jw-eyebrow">02 / Experience</p><h2 id="experience-heading">Teaching.<br />Commissioning.<br /><em>Perspective.</em></h2><p>Specialist classroom practice, local authority work and one-to-one provision inform the teaching I offer today.</p><Link to="/about" className="jw-text-link">More about James <span aria-hidden="true">→</span></Link></div>
          <div>
            <ol className="credentials-timeline">{experience.map((position) => <li key={position.role}>
              <p className="credential-date">{position.dates}</p><h3>{position.role}</h3><p className="credential-provider">{position.org}</p><p>{position.desc}</p>
              {position.projects && <div style={{ marginTop: "0.9rem", paddingLeft: "0.9rem", borderLeft: "2px solid var(--border)" }}>{position.projects.map((project) => <div key={project.title}>
                <p className="credential-date">{project.dates}</p><h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0.35rem 0 0.35rem" }}>{project.title}</h4><p style={{ marginBottom: "0.35rem" }}>{project.summary}</p><p>{project.desc}</p>
              </div>)}</div>}
              {position.logo && <img src={position.logo} alt={`${position.org} logo`} loading="lazy" />}
            </li>)}</ol>
            <details className="credentials-context"><summary>How this experience informs the work <span aria-hidden="true">+</span></summary><div>{whyItMatters.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></details>
          </div>
        </div>
      </section>

      <section id="references" className="jw-section credentials-references" aria-labelledby="references-heading">
        <div className="jw-container">
          <div className="credentials-reference-heading"><div><p className="jw-eyebrow">03 / Professional references</p><h2 id="references-heading">In colleagues’<br /><em>own words.</em></h2></div><p>Written references from previous employers, held on file. Full documentation is available on request.</p></div>
          <div className="credentials-reference-list">{references.map((reference) => <article key={reference.name} className="credential-reference">
            <div className="credential-referee"><h3>{reference.name}</h3><p>{reference.role}</p><span className="credential-reference-type">Professional reference</span></div>
            <div><blockquote>“{reference.quote}”</blockquote><details className="credential-ratings"><summary>View scores from this reference form <span aria-hidden="true">+</span></summary><table><caption>Scores recorded by {reference.name} on the professional reference form. Each score is out of 5.</caption><thead><tr><th scope="col">Area</th><th scope="col">Recorded score</th></tr></thead><tbody>{ratingLabels.map(([key, label]) => <tr key={key}><th scope="row">{label}</th><td>{reference.ratings[key]} / 5</td></tr>)}</tbody></table></details></div>
          </article>)}</div>
        </div>
      </section>

      <section id="training" className="jw-section credentials-training" aria-labelledby="training-heading">
        <div className="jw-container credentials-section-grid">
          <div className="credentials-section-intro"><p className="jw-eyebrow">04 / Training &amp; certificates</p><h2 id="training-heading">The records,<br /><em>open to view.</em></h2><p>Choose an area to see the training, provider and completion date. Certificate links open a PDF; other evidence can be requested.</p><p className="credentials-training-note">Completion dates and any recorded renewal status appear with each course. A certificate records the training completed at that time.</p></div>
          <div className="credentials-training-bands">
            {BANDS.map((band) => {
              const records = cpdCerts.filter((certificate) => certificate.group === band.key);
              if (!records.length) return null;
              return <details className="credential-band" key={band.key} open={band.key === "qualification"}>
                <summary><span><span className="credential-band-title">{band.label}</span><span className="credential-band-count">{records.length} {records.length === 1 ? "record" : "records"}</span></span><span className="credential-disclosure" aria-hidden="true">+</span></summary>
                <div className="credential-band-body"><p className="credential-band-note">{band.key === "send" ? "Training relevant to supporting SEND, autistic and ADHD learners, and young people’s mental health." : band.note}</p>{records.map(renderCertificate)}</div>
              </details>;
            })}
            <div className="credential-dsl-holder" style={{ marginTop: "2.5rem" }}>
            <h3>{SAFEGUARDING_ROLES.dsl.name}, {SAFEGUARDING_ROLES.dsl.role}</h3>
            <p>{SAFEGUARDING_ROLES.dsl.intro}</p>
            <p>
              {SAFEGUARDING_ROLES.dsl.name} is the {SAFEGUARDING_ROLES.dsl.role}; {SAFEGUARDING_ROLES.deputy.name} is the{" "}
              {SAFEGUARDING_ROLES.deputy.role}. Both have completed {TRAINING.dsl.provider}&apos;s {TRAINING.dsl.name} course.
            </p>
            {renderCertificate(safeguardingLeadCertificate)}
            </div>
          </div>
        </div>
      </section>

      <section id="professional-checks" className="jw-section credentials-checks" aria-labelledby="checks-heading">
        <div className="jw-container credentials-checks-grid"><div><p className="jw-eyebrow">05 / Professional checks</p><h2 id="checks-heading">Know who is<br /><em>working with you.</em></h2></div><div><h3>Enhanced DBS on the Update Service</h3><p>Enhanced DBS registered with the Update Service, checked annually and verifiable on request. All placements are covered by safeguarding policies aligned to {STATUTORY.kcsie}.</p><p>Documentation packages are available to parents, agencies and local authority teams. Certificates, DBS details and professional references are available on request.</p><p className="credential-date">Information reviewed {REVIEWED}.</p><div className="credentials-checks-actions"><Link to="/contact" className="jw-btn-primary">Request documentation <span aria-hidden="true">→</span></Link><Link to="/compliance" className="jw-text-link">View compliance details <span aria-hidden="true">→</span></Link></div></div></div>
      </section>
    </div>
  );
}
