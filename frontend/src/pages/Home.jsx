import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";

const serviceItems = [
  {
    title: "EOTAS Placements",
    description:
      "Education Other Than At School - 1:1 and small group sessions for learners who cannot access a mainstream or special school setting.",
  },
  {
    title: "EBSA Reintegration",
    description:
      "Graduated return-to-school planning for learners with emotionally-based school avoidance, with structured evidence at every stage.",
  },
  {
    title: "Alternative Provision",
    description:
      "AP packages for learners awaiting or alongside specialist placements, with daily session reports and PLP progress tracking.",
  },
  {
    title: "EHCP Top-Up Support",
    description:
      "Intensive targeted input aligned to Education, Health and Care Plan outcomes, with criterion-level progress visible in real time.",
  },
];

const differentiators = [
  {
    title: "You can see what happened",
    description:
      "Every session is planned, delivered and evidenced in a portal I built myself. Parents can see what actually happened; commissioners get engagement, attendance and safeguarding in real time rather than a monthly PDF.",
  },
  {
    title: "Built around your child",
    description:
      "Every learner gets a plan written to their own outcomes. I work around their interests, their pace and the setting they can actually cope with, rather than a one-size curriculum.",
  },
  {
    title: "Checks you can verify",
    description:
      "Enhanced DBS on the Update Service, safeguarding and Prevent current, and the Whole School SEND Platinum award. Renewal dates are tracked rather than left to lapse, lone working is logged, and every safeguarding concern is actioned and auditable.",
  },
];

// One question from each of the three people who land here, rather than three from the commissioner.
const questions = [
  {
    who: "A parent asks",
    q: "How do I know this will be different?",
    a: "I will not promise you it will. What I can tell you is that we start where your child actually is rather than where a timetable says they should be, that the first conversation is free, and that if I am not the right person I will say so and tell you who might be.",
  },
  {
    who: "An agency asks",
    q: "How quickly can you be placed?",
    a: "Enhanced DBS on the Update Service, so it verifies the same day, and safeguarding, Prevent and allergy training all current to August 2027. Certificates and my policy pack go over the same day you ask.",
  },
  {
    who: "A commissioner asks",
    q: "How do I know sessions are actually happening?",
    a: "Every session has a timestamped report filed within 24 hours, with engagement, activity notes and progress against the criteria. Case chronologies, safeguarding logs and policy packs export as PDFs for any monitoring visit.",
  },
];

export default function Home() {
  usePageMeta({
    title: 'James Wallace | One-to-one teaching for children who cannot manage school',
    description:
      'Specialist SEND and EOTAS teaching in Derbyshire, Nottinghamshire and online. QTS, MEd, enhanced DBS. For families, agencies and local authorities.',
    path: '/',
  });

  return (
    <>
      {/* Hero */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--brand)",
                  marginBottom: "0.75rem",
                }}
              >
                Derbyshire, Nottinghamshire and online
              </p>
              <h1>
                One-to-one teaching for children
                who cannot manage school
              </h1>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                I am James Wallace. I taught for twelve years in a specialist school for young people with social, emotional
                and mental health needs, then spent five years inside Nottinghamshire County Council's children's commissioning
                team. I now teach children who cannot access school &mdash; privately for families, through agencies and
                schools, and on placements commissioned by local authorities.
              </p>
              <div
                className="d-flex flex-wrap gap-3 mt-3 mb-4 justify-content-center justify-content-lg-start"
                style={{ fontSize: "0.88rem" }}
              >
                {[
                  "QTS since 2004, MEd",
                  "Enhanced DBS on the Update Service",
                  "Every session evidenced",
                ].map((item) => (
                  <span
                    key={item}
                    className="d-flex align-items-center gap-1"
                  >
                    <span style={{ color: "var(--brand)", fontWeight: 700 }}>
                      &#10003;
                    </span>{" "}
                    {item}
                  </span>
                ))}
              </div>
              {/* Three doors. Ordered by how quickly each one pays, which is also the order most visitors arrive in. */}
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/tuition" className="jw-btn-primary">
                  For families &rarr;
                </Link>
                <Link to="/agencies" className="jw-btn-secondary">
                  For agencies &amp; schools &rarr;
                </Link>
                <Link to="/for-las" className="jw-btn-secondary">
                  For local authorities &rarr;
                </Link>
              </div>
              <p
                className="mt-3 d-flex align-items-center gap-2 justify-content-center justify-content-lg-start"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginBottom: 0,
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--brand)",
                    display: "inline-block",
                  }}
                />
                Taking new students and placements now
              </p>
            </div>
            {/* The hero image was a screenshot of the supervisor dashboard, badged "Live ND Portal Dashboard" — the most
                commissioner-facing thing on the site, and the first picture a parent saw. Someone deciding whether to trust
                you with their child wants to see the person, not the software. */}
            <div className="col-12 col-lg-5 text-center">
              <figure style={{ margin: 0 }}>
                <img
                  src="/james-wallace.webp"
                  alt="James Wallace"
                  style={{
                    width: "100%",
                    maxWidth: "340px",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    // A 2:3 portrait cropped square from the centre cuts the top of his head off. The About photo
                    // further down already uses "top" for the same image, so use what is known to work.
                    objectPosition: "top",
                    borderRadius: "50%",
                    display: "block",
                    margin: "0 auto",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  }}
                />
                <figcaption
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ color: "var(--text)" }}>James Wallace</strong>
                  <br />
                  QTS, MEd. Thirteen years teaching, five commissioning.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 className="text-center mb-2">What I do</h2>
          <p
            className="text-center"
            style={{ maxWidth: "600px", margin: "0 auto 3rem" }}
          >
            I teach young people whose needs cannot be met in an ordinary school.
            I work privately with families, through agencies and schools, and on
            placements commissioned by local authorities. The teaching is the same
            in every case; only who pays for it changes.
          </p>
          <div className="row g-4">
            {serviceItems.map((item) => (
              <div key={item.title} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      color: "var(--brand)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-4" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Every learner has a Personal Learning Plan, weekly planned sessions,
            and a submitted daily session report - so commissioners and parents
            always have an accurate, up-to-date picture of progress.
          </p>
        </div>
      </section>

      {/* Three Differentiators */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Why me</h2>
          <p
            className="text-center"
            style={{ maxWidth: "540px", margin: "0 auto 3rem" }}
          >
            Three things that are genuinely hard to find elsewhere.
          </p>
          <div className="row g-4">
            {differentiators.map((item, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="jw-card h-100">
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform teaser */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src="/portal/03b-weekly-plan-tab.webp"
                    alt="A week's plan, written before the week starts"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
                <div className="col-6">
                  <img
                    src="/portal/04-daily-reports.webp"
                    alt="A session report, filed within 24 hours"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--brand)",
                  marginBottom: "0.5rem",
                }}
              >
                How you see the work
              </p>
              <h2>Every session, written down</h2>
              <ul
                style={{
                  paddingLeft: "1.25rem",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <li>A plan before the week starts, and a report within 24 hours of each session</li>
                <li>Safeguarding concerns logged, actioned and escalated, never left in a notebook</li>
                <li>Lone-working check-in and overdue alerts, because I work in homes</li>
                <li>Progress tied to the outcomes in the plan, not to a tick sheet</li>
                <li>
                  Everything exportable as a PDF for a review, a panel or a monitoring visit
                </li>
              </ul>
              <Link to="/platform" className="jw-btn-secondary mt-3 d-inline-block">
                See the platform &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commissioner Q&A */}
      <section className="jw-section jw-section-surface">
        <div className="jw-container">
          <h2 className="text-center mb-2">Questions I get asked</h2>
          <p
            className="text-center"
            style={{ maxWidth: "520px", margin: "0 auto 3rem" }}
          >
            One from each of the three people who usually land on this page.
          </p>
          <div className="row g-4">
            {questions.map((item, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="jw-card h-100">
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    "{item.q}"
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/for-las" className="jw-btn-secondary">
              For local authorities &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-3 text-center">
              <img
                src="/james-wallace.webp"
                alt="James Wallace - Education Specialist"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "top",
                  border: "3px solid var(--border)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              />
            </div>
            <div className="col-12 col-md-9">
              <h2 style={{ marginBottom: "0.75rem" }}>About James</h2>
              <p>
                James Wallace is an Education Specialist with a BSc in
                Computing, MEd, QTS, and Enhanced DBS. He works exclusively with
                neurodiverse learners, delivering specialist provision for young
                people with ADHD, Autism, SEMH, and complex needs through
                evidence-based, structured sessions.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {["BSc Computing", "MEd", "QTS", "Enhanced DBS", "DSL"].map(
                  (badge) => (
                    <span key={badge} className="jw-badge">
                      {badge}
                    </span>
                  )
                )}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/about" className="jw-btn-secondary">
                  About James
                </Link>
                <Link to="/credentials" className="jw-btn-secondary">
                  Credentials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral CTA */}
      <section
        className="jw-section"
        style={{
          background: "var(--surface-dark, #1a1a2e)",
          color: "#fff",
        }}
      >
        <div className="jw-container text-center">
          <h2 style={{ color: "#fff" }}>Start with a conversation</h2>
          <p
            style={{
              maxWidth: "520px",
              margin: "0 auto 2rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Whether you are a parent, an agency or a local authority, the first
            step is the same: tell me about the young person and what has happened
            so far. I come back within two working days.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link
              to="/contact"
              className="jw-btn-primary"
              style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
            >
              Get in touch
            </Link>
            <Link
              to="/contact"
              className="jw-btn-secondary"
              style={{ fontSize: "1rem", padding: "0.75rem 2rem", color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
