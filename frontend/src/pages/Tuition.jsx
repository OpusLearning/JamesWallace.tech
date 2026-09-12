import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Private tuition — the page for families.
 *
 * Every other page on this site speaks to local-authority commissioners about an organisation. A parent looking for a tutor for a
 * child who cannot manage school needs a different front door: who James is, what the first weeks actually look like, and how to
 * reach him. Every claim below is checked against the CV on /credentials and the compliance tracker dated 9 September 2026 —
 * nothing is stated here that could not be evidenced on request. Fees are deliberately absent until James sets them.
 */

const whoFor = [
  {
    title: "Not managing school",
    body: "Anxiety-based school avoidance, long absence, or a placement that has broken down. We start where your child actually is, not where the timetable says they should be.",
  },
  {
    title: "An EHCP that isn't being met",
    body: "Tuition built around the outcomes written into the plan, with the evidence of progress that annual reviews and local authorities ask to see.",
  },
  {
    title: "Autistic, ADHD or PDA learners",
    body: "Sessions shaped around demand avoidance, sensory needs and genuine interests. At home, in the community, or online.",
  },
  {
    title: "Catching up, or moving on",
    body: "Core subjects, computing and Functional Skills across KS2 to KS4, including a route back into school or college where that is the goal.",
  },
];

const howItStarts = [
  {
    step: "01",
    title: "A conversation, free",
    body: "Twenty minutes about your child and what has happened so far. If I am not the right person for them, I will say so and tell you who might be.",
  },
  {
    step: "02",
    title: "A first session",
    body: "No assessment battery on day one. I meet your child, find the ground they feel safe standing on, and we start from there.",
  },
  {
    step: "03",
    title: "A plan you can see",
    body: "A short personal learning plan tied to what you actually want for them, agreed with you rather than sent to you.",
  },
  {
    step: "04",
    title: "Evidence you can use",
    body: "Session notes and progress records you can hand to a school, a SENCO, a local authority or an annual review.",
  },
];

const quals = [
  { label: "QTS", sub: "Qualified Teacher Status, 2004" },
  { label: "MEd", sub: "Master of Education, 2012" },
  { label: "BSc", sub: "Computer Science" },
  { label: "DBS", sub: "Enhanced, Update Service" },
];

/* Held certificates, checked 9 September 2026. Renewal dates are tracked; nothing here is expired. */
const training = [
  { name: "Safeguarding and child protection, KCSIE 2026 update", when: "current, renews Aug 2027" },
  { name: "Prevent duty and child-on-child abuse", when: "current, renews Aug 2027" },
  { name: "Allergy awareness", when: "current, renews Aug 2027" },
  { name: "Whole School SEND, Platinum award", when: "September 2026" },
  { name: "Suicide awareness, Zero Suicide Alliance", when: "September 2026" },
  { name: "SEND Code of Practice", when: "certified" },
  { name: "Understanding Autism, Open University", when: "24 CPD hours, 2025" },
  { name: "Language and communication in autism", when: "CPD certified, 2025" },
  { name: "Sensory processing, GriffinOT Level 1", when: "2025" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Private SEND and EOTAS tuition",
  name: "Private one-to-one SEND tuition with James Wallace",
  provider: {
    "@type": "Person",
    name: "James Wallace",
    jobTitle: "Specialist EOTAS and SEND tutor",
    url: "https://jameswallace.tech/tuition",
    hasCredential: [
      "Qualified Teacher Status (QTS)",
      "Master of Education (MEd)",
      "BSc (Hons) Computer Science",
      "Enhanced DBS on the Update Service",
    ],
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Derbyshire" },
    { "@type": "AdministrativeArea", name: "Nottinghamshire" },
    { "@type": "AdministrativeArea", name: "East Midlands" },
  ],
  audience: { "@type": "Audience", audienceType: "Parents and carers of children with SEND" },
  description:
    "One-to-one tuition for children who cannot access mainstream school, including autistic, ADHD and PDA learners. EHCP-aligned and evidenced. Derbyshire, Nottinghamshire and online.",
};

export default function Tuition() {
  usePageMeta({
    title: "Private SEND & EOTAS Tuition, Derbyshire and Notts | James Wallace",
    description:
      "One-to-one tuition for children who cannot manage school. QTS, MEd, thirteen years in specialist provision and five inside a local authority. Derbyshire, Nottinghamshire and online.",
    path: "/tuition",
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
                For families
              </span>
              <h1 style={{ marginBottom: "1.25rem" }}>
                One-to-one tuition for children
                <br />
                <span style={{ color: "var(--action)" }}>who cannot manage school</span>
              </h1>
              <p style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>
                I am James Wallace. I taught for twelve years in a specialist school for young people with social, emotional and
                mental health needs, then spent five years inside Nottinghamshire County Council's children's commissioning team.
                Since 2025 I have delivered education otherwise than at school for autistic, ADHD and PDA learners, commissioned by
                local authorities.
              </p>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.75rem" }}>
                I now take a small number of private students alongside that work. In person across Derbyshire and Nottinghamshire,
                or online anywhere.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/contact?for=parent" className="jw-btn-primary">
                  Arrange a conversation
                </Link>
                <Link to="/credentials" className="jw-btn-secondary">
                  See my full background
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="row g-3">
                {quals.map((q) => (
                  <div key={q.label} className="col-6">
                    <div className="jw-card h-100" style={{ padding: "1.1rem 1.25rem" }}>
                      <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--action)", lineHeight: 1.1 }}>{q.label}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>{q.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who I work with */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <h2 style={{ marginBottom: "0.5rem" }}>Who I work with</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "620px", marginBottom: "2rem" }}>
            Most of the young people I teach have been out of school for months, not weeks. That is the situation I know best.
          </p>
          <div className="row g-4">
            {whoFor.map((w) => (
              <div key={w.title} className="col-12 col-md-6">
                <div className="jw-card h-100">
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{w.title}</h3>
                  <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it starts — numbered rail, not another card grid */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <h2 style={{ marginBottom: "2rem" }}>How it starts</h2>
          <div className="row">
            <div className="col-12 col-lg-9">
              {howItStarts.map((h, i) => (
                <div
                  key={h.step}
                  className="d-flex gap-4 align-items-start"
                  style={{
                    paddingBottom: i === howItStarts.length - 1 ? 0 : "1.75rem",
                    marginBottom: i === howItStarts.length - 1 ? 0 : "1.75rem",
                    borderBottom: i === howItStarts.length - 1 ? "none" : "1px solid var(--border, #e5e0d8)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "var(--action)",
                      minWidth: "3rem",
                      lineHeight: 1,
                      opacity: 0.85,
                    }}
                  >
                    {h.step}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.35rem" }}>{h.title}</h3>
                    <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checks and practicalities */}
      <section className="jw-section jw-section-white">
        <div className="jw-container">
          <div className="row g-5 align-items-start">
            <div className="col-12 col-lg-7">
              <h2 style={{ marginBottom: "1rem" }}>Checks and training</h2>
              <p style={{ color: "var(--text-muted)" }}>
                Enhanced DBS on the Update Service, so any agency or parent can verify it the same day. Safeguarding and specialist
                training kept current, with renewal dates tracked rather than left to lapse.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "1.25rem 0 1rem" }}>
                {training.map((t) => (
                  <li
                    key={t.name}
                    className="d-flex justify-content-between align-items-baseline gap-3"
                    style={{ padding: "0.55rem 0", borderBottom: "1px solid var(--border, #e5e0d8)" }}
                  >
                    <span>{t.name}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{t.when}</span>
                  </li>
                ))}
              </ul>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 0 }}>
                Certificates available to any parent or agency who asks. I also hold my own safeguarding, e-safety, risk assessment
                and lone-working policies, which I am happy to share before we begin.
              </p>
            </div>

            <div className="col-12 col-lg-5">
              <div className="jw-card">
                <h3 style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>Practical things</h3>
                {[
                  ["Where", "Your home, a library or community setting, or online."],
                  ["Ages", "KS2 to KS4 and post-16, including Functional Skills."],
                  ["Subjects", "English, maths, science, computing and ICT."],
                  ["Funding", "Privately, or through an EHCP personal budget where your local authority agrees it."],
                ].map(([k, v]) => (
                  <p key={k} style={{ marginBottom: "0.65rem", color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--text, inherit)" }}>{k}:</strong> {v}
                  </p>
                ))}
                <Link to="/contact?for=parent" className="jw-btn-primary" style={{ marginTop: "0.5rem", display: "inline-block" }}>
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container">
          <h2 style={{ marginBottom: "0.5rem" }}>What it costs</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "640px", marginBottom: "2rem" }}>
            Stated plainly, because you should not have to email to find out whether you can afford it. No registration fee, no
            minimum term, and the first conversation is free.
          </p>
          <div className="row g-4">
            {[
              {
                rate: "£45",
                unit: "per hour",
                title: "One-to-one tuition",
                body: "Online or in your home, KS2 to KS4 and post-16. Session notes after every session. This is the rate most families pay.",
              },
              {
                rate: "£50",
                unit: "per hour",
                title: "EHCP-aligned work",
                body: "Where the tuition is written to the outcomes in a plan and you need the evidence for reviews: a personal learning plan, progress against criteria, and reports you can hand to school or the local authority.",
              },
              {
                rate: "£250",
                unit: "per day",
                title: "EOTAS packages",
                body: "Commissioned by a local authority or paid from a personal budget, typically 5 to 25 hours a week. Includes planning, daily evidence, safeguarding records and attendance at reviews.",
              },
            ].map((f) => (
              <div key={f.title} className="col-12 col-md-4">
                <div className="jw-card h-100">
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--action)", lineHeight: 1 }}>{f.rate}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{f.unit}</span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                  <p style={{ marginBottom: 0, color: "var(--text-muted)", fontSize: "0.95rem" }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "1.25rem", marginBottom: 0 }}>
            Travel is included within about 30 minutes of Derby. Further than that, let us talk about it rather than assume.
            If money is the obstacle and your child needs the help, say so when we speak — I would rather have that conversation
            than lose a child who needs teaching.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="jw-section jw-section-warm">
        <div className="jw-container text-center">
          <h2 style={{ marginBottom: "1rem" }}>Start with a conversation</h2>
          <p style={{ maxWidth: "560px", margin: "0 auto 1.5rem", color: "var(--text-muted)" }}>
            Tell me about your child and what has happened so far. No commitment, and no pressure to book anything at the end of it.
          </p>
          <Link to="/contact?for=parent" className="jw-btn-primary">
            Contact James
          </Link>
        </div>
      </section>
    </>
  );
}
