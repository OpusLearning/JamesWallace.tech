import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCertificate,
  faBriefcase,
  faQuoteLeft,
  faShieldAlt,
  faCheckCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const academicQuals = [
  {
    title: "BSc (Hons) Computer Science",
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
    title: "Safe and Supported",
    group: "safeguarding",
    provider: "Fresh Start in Education",
    issued: "22 August 2026",
    detail: "CPD Certified, The CPD Certification Service.",
    desc: "Safe working practice for one-to-one and small-group teaching away from a school site.",
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

const experience = [
  {
    role: "Specialist SEMH Teacher",
    org: "Foxwood Academy, Nottinghamshire",
    logo: "/badges/foxwood.png",
    dates: "Jan 2006 to Oct 2018",
    desc: "Twelve years delivering specialist teaching for young people with Social, Emotional and Mental Health needs. Developed inclusive curricula, wrote and implemented PLPs, and collaborated closely with SENCOs, educational psychologists, and family teams.",
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

const references = [
  {
    quote: "James is a gifted and effective teacher. He has a high degree of professionalism and is wholly committed to supporting young people to develop their skills and interests in order to reach their potential.",
    name: "Chris Humphreys",
    role: "Previous Manager, Foxwood Academy",
    ratings: { timekeeping: 5, flexibility: 4, honesty: 5, safeguarding: 5, communication: 5 },
  },
  {
    quote: "James brings a wealth of qualities that make him highly effective in working with children and young people. His patience, empathy, and dedication to fostering both academic and personal growth allowed him to build strong relationships with students, families, and colleagues.",
    name: "James Sinclair",
    role: "Public Health Analyst, Nottinghamshire County Council",
    ratings: { timekeeping: 5, flexibility: 5, honesty: 5, safeguarding: 5, communication: 5 },
  },
];

function Stars({ count }) {
  return (
    <div style={{ color: "#f59e0b", display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ opacity: i < count ? 1 : 0.2 }}
        />
      ))}
    </div>
  );
}

function RatingRow({ label, score }) {
  return (
    <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", minWidth: "100px" }}>{label}</span>
      <Stars count={score} />
    </div>
  );
}


// One certificate card, shared by every band.
function Cert({ c }) {
  return (
    <div className="col-12 col-md-6">
          <div className="jw-card h-100 d-flex gap-3">
            {/* Some of these are round badges and some are wide provider wordmarks. A fixed 72px square
                squeezed the wordmarks down to an illegible smudge, so wide marks get the width they need. */}
            {c.badge && (
              <img
                src={c.badge}
                alt={c.wide ? `${c.provider} logo` : `${c.title} badge`}
                style={{
                  width: c.wide ? "116px" : "72px",
                  height: c.wide ? "auto" : "72px",
                  maxHeight: "72px",
                  objectFit: "contain",
                  objectPosition: "top left",
                  flexShrink: 0,
                  alignSelf: "flex-start",
                }}
              />
            )}
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{c.title}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.2rem" }}>{c.provider}</p>
              {c.issued && (
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>Completed {c.issued}</p>
              )}
              {c.detail && (
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontStyle: "italic" }}>{c.detail}</p>
              )}
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>{c.desc}</p>
              {/* The certificate itself, so an agency or a parent can check it rather than take my word for it. */}
              {c.cert && (
                <p style={{ margin: "0.6rem 0 0" }}>
                  <a
                    href={c.cert}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--brand)", textDecoration: "none" }}
                  >
                    View certificate (PDF) &rarr;
                  </a>
                </p>
              )}
            </div>
          </div>
    </div>
  );
}

// 12 Sep 2026. A parent on a phone was scrolling fifteen screens of compliance certificates before reaching anything
// about James as a teacher. Everything an agency needs is still here and still one tap away; it just no longer stands
// between a worried parent and the human part of the page.
const BANDS = [
  { key: "qualification", label: "Qualified teacher", note: "The award everything else sits on top of.", fold: false },
  { key: "send", label: "SEND, autism, ADHD and mental health", note: "The training that decides whether I can actually help your child.", fold: false },
  { key: "safeguarding", label: "Safeguarding, statutory and agency training", note: "Current safeguarding, Prevent and KCSIE, plus the agency compliance a commissioner checks.", fold: true },
  { key: "tech", label: "Technology and project management", note: "Where the software side of the work comes from.", fold: true },
];

export default function Credentials() {
  usePageMeta({
    title: 'Qualifications & Experience | James Wallace, QTS MEd',
    description:
      'QTS, MEd, BSc Computer Science, enhanced DBS on the Update Service, and current safeguarding, Prevent, autism and sensory processing training.',
    path: '/credentials',
  });

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <span className="jw-badge jw-badge-brand mb-3" style={{ display: "inline-block" }}>
            Qualifications &amp; Experience
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Who You're<br />
            <span style={{ color: "var(--action)" }}>Working With</span>
          </h1>
          <p style={{ maxWidth: "580px", margin: "0 auto 2rem", fontSize: "1.05rem" }}>
            QTS since 2004 and a Master of Education. Thirteen years teaching in specialist
            provision, and five inside a county council's children's commissioning team, which is
            the part most tutors cannot offer.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {[
              { label: "MEd", sub: "Master of Education" },
              { label: "BSc", sub: "Computer Science" },
              { label: "PGCE", sub: "Qualified Teacher" },
              { label: "DBS", sub: "Enhanced, Updated" },
            ].map((s) => (
              <div
                key={s.label}
                className="jw-card text-center"
                style={{ minWidth: "110px", padding: "1rem 1.25rem" }}
              >
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--action)" }}>{s.label}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="jw-section jw-section-white" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
        <div className="jw-container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {[
              ["Qualified teacher", "QTS since 2004"],
              ["Enhanced DBS", "Update Service registered"],
              ["Safeguarding current", "updated September 2026"],
              ["KCSIE 2026", "refresher completed"],
              ["Prevent", "current"],
              ["Thirteen years teaching", "specialist provision"],
            ].map(([label, sub]) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "baseline", gap: "0.4rem", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.4rem 0.85rem", background: "var(--card-bg)", fontSize: "0.85rem" }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", fontSize: "0.8rem" }} />
                <strong style={{ color: "var(--text-primary)" }}>{label}</strong>
                <span style={{ color: "var(--text-muted)" }}>{sub}</span>
              </span>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem", margin: "1rem auto 0", maxWidth: "640px" }}>
            Teacher, then local authority children&rsquo;s commissioning, then software engineering, now specialist SEND and
            EOTAS teaching. The middle two are why I can write to an EHCP outcome and build the tools that evidence it.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div
                className="jw-card"
                style={{ borderLeft: "4px solid var(--action)", paddingLeft: "1.75rem" }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "var(--action)", fontSize: "1.5rem", marginBottom: "0.75rem" }} />
                <p style={{ fontSize: "1.05rem", fontStyle: "italic", marginBottom: "0.75rem" }}>
                  "I am a specialist educator with genuine commitment to the young people I work with,
                  bringing deep knowledge of SEND, SEMH, and neurodiverse learners together with
                  the professional rigour that LA placements require."
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>James Wallace, MEd, BSc, PGCE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Qualifications */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faGraduationCap} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
            <h2>Academic Qualifications</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {academicQuals.map((q, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="jw-card h-100">
                  {q.logo && (
                    <img
                      src={q.logo}
                      alt={`${q.institution} logo`}
                      style={{ height: "44px", width: "auto", maxWidth: "160px", objectFit: "contain", objectPosition: "left", marginBottom: "0.7rem", display: "block" }}
                    />
                  )}
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{q.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.25rem" }}>{q.institution}</p>
                  {q.awarded && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Awarded {q.awarded}</p>
                  )}
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: q.modules ? "0.75rem" : 0 }}>{q.detail}</p>
                  {q.modules && (
                    <ul className="list-unstyled mb-0" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {q.modules.map((m, j) => (
                        <li key={j} className="d-flex align-items-start gap-2 mb-1">
                          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", marginTop: "2px", flexShrink: 0, fontSize: "0.7rem" }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faBriefcase} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
            <h2>Professional Experience</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {experience.map((e, i) => (
              <div key={i} className="col-12 col-lg-10">
                <div className="jw-card">
                  {e.logo && (
                    <img
                      src={e.logo}
                      alt={`${e.org} logo`}
                      style={{ height: "48px", width: "auto", maxWidth: "180px", objectFit: "contain", objectPosition: "left", marginBottom: "0.6rem", display: "block" }}
                    />
                  )}
                  <div className="d-flex flex-wrap align-items-start justify-content-between gap-2 mb-1">
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>{e.role}</h3>
                    <span className="jw-badge" style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>{e.dates}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--brand)", fontWeight: 600, marginBottom: "0.5rem" }}>{e.org}</p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPD */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <FontAwesomeIcon icon={faCertificate} style={{ color: "var(--brand)", fontSize: "1.75rem", marginBottom: "0.75rem" }} />
            <h2>Training &amp; Certification</h2>
            <p style={{ maxWidth: "560px", margin: "0 auto" }}>
              Every certificate below is the provider's original and opens as a PDF. Dates are completion dates, not
              enrolment dates.
            </p>
          </div>
          {BANDS.map((band) => {
            const items = cpdCerts.filter((c) => c.group === band.key);
            if (!items.length) return null;
            const grid = (
              <div className="row g-4">
                {items.map((c, i) => (
                  <Cert key={i} c={c} />
                ))}
              </div>
            );
            if (!band.fold) {
              return (
                <div key={band.key} style={{ marginBottom: "2.5rem" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.35rem" }}>{band.label}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>{band.note}</p>
                  {grid}
                </div>
              );
            }
            return (
              <details key={band.key} style={{ marginBottom: "1.25rem", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--page-bg)" }}>
                <summary style={{ cursor: "pointer", padding: "1rem 1.25rem", fontWeight: 700, fontSize: "1.02rem", listStyle: "revert" }}>
                  {band.label}
                  <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    {" — "}{items.length} certificates, all dated and downloadable
                  </span>
                </summary>
                <div style={{ padding: "0 1.25rem 1.25rem" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>{band.note}</p>
                  {grid}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>Why This Matters</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              Whether you are a parent, an agency or a local authority, this is what you are getting.
            </p>
          </div>
          <div className="row g-4">
            {whyItMatters.map((w, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="jw-card h-100 text-center">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--action)", fontSize: "1.5rem", marginBottom: "0.75rem" }} />
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{w.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <div className="text-center mb-5">
            <h2>Professional References</h2>
            <p style={{ maxWidth: "480px", margin: "0 auto" }}>
              Verified references from previous employers. Full documentation available on request.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {references.map((r, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="jw-card h-100" style={{ borderLeft: "3px solid var(--action)" }}>
                  <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "var(--action)", marginBottom: "0.75rem" }} />
                  <p style={{ fontSize: "0.9375rem", fontStyle: "italic", marginBottom: "1rem" }}>"{r.quote}"</p>
                  <p style={{ margin: "0 0 0.25rem", fontWeight: 600, fontSize: "0.875rem" }}>{r.name}</p>
                  <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>{r.role}</p>
                  <RatingRow label="Time keeping" score={r.ratings.timekeeping} />
                  <RatingRow label="Flexibility" score={r.ratings.flexibility} />
                  <RatingRow label="Honesty &amp; integrity" score={r.ratings.honesty} />
                  <RatingRow label="Safeguarding" score={r.ratings.safeguarding} />
                  <RatingRow label="Communication" score={r.ratings.communication} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DBS */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="jw-card d-flex align-items-start gap-3">
                <FontAwesomeIcon icon={faShieldAlt} style={{ color: "var(--action)", fontSize: "1.75rem", flexShrink: 0, marginTop: "3px" }} />
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.35rem" }}>Enhanced DBS Certificate</h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Enhanced DBS registered with the Update Service, checked annually and verifiable on request.
                    All placements are covered by safeguarding policies aligned to KCSIE. Documentation packages
                    available to parents, agencies and local authority teams alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2 style={{ marginBottom: "0.75rem" }}>Discuss a learner</h2>
          <p style={{ maxWidth: "480px", margin: "0 auto 2rem", color: "var(--text-muted)" }}>
            Certificates, DBS details and references go over the same day you ask.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/contact" className="jw-btn-primary">Get in touch</Link>
            <Link to="/tuition" className="jw-btn-secondary">For families</Link>
            <Link to="/agencies" className="jw-btn-secondary">For agencies</Link>
            <Link to="/for-las" className="jw-btn-secondary">For local authorities</Link>
          </div>
        </div>
      </section>
    </>
  );
}
