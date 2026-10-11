import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { SAFEGUARDING_ROLES } from "../data/facts";
import PageHeader from "../components/PageHeader";

/**
 * For students — the page written to the young person, not about them.
 *
 * Every other page here is written for the adult choosing the teaching. This one is for the person
 * the teaching is for: plain words, short lines, reading age about eleven, no sales language and no
 * jargon. It says what happens, what a session is like, what gets written down, and who to talk to.
 *
 * Rules it holds to (prompts/2026-10-11-students-page-and-hero.md): no pupil stories, quotes, cases
 * or testimonials; no prices; nothing about procurement or buying routes; no form and nothing that
 * invites a child to send their own details — the last section asks them to get a parent or carer to
 * use /contact. Facts about James come from ../data/facts.js. The support services below were each
 * confirmed on the service's own site on 11 October 2026; anything that could not be confirmed was
 * dropped, per the brief. Restoring one is a single entry in SERVICES.
 *
 * LOOK-SITE-1: the hero is the shared PageHeader (Style B), body text is the larger student size,
 * and every section uses the tighter spacing so the page has less empty air between sections.
 */

// Confirmed on their own sites, 11 October 2026. Numbers and wording are only those seen there.
// NSPCC and Kidscape could not be confirmed and are deliberately absent. Childline was confirmed
// by Claude in a browser on 11 October 2026 (childline.org.uk/get-support/contacting-childline/).
const SERVICES = [
  {
    key: "childline",
    name: "Childline",
    line: "Free and confidential, open any time, day or night. Call 0800 1111 or chat online.",
    url: "https://www.childline.org.uk/",
  },
  {
    key: "shout",
    name: "Shout",
    line: "Free, private support by text, any time. Text 85258.",
    url: "https://giveusashout.org/",
  },
  {
    key: "ceop",
    name: "CEOP",
    line: "If something is happening online that worries you, you can report it here, or read advice about it.",
    url: "https://www.ceop.police.uk/",
  },
  {
    key: "frank",
    name: "Talk to Frank",
    line: "Honest information about drugs, and someone to talk to. Call 0300 123 6600, or text 82111.",
    url: "https://www.talktofrank.com/",
  },
  {
    key: "youngminds",
    name: "YoungMinds",
    line: "Advice and information about looking after your mental health.",
    url: "https://www.youngminds.org.uk/",
  },
];

const sessionPoints = [
  "One teacher and one young person. That is you.",
  "Where suits you: at home, somewhere local, or online.",
  "No uniform.",
  "You get breaks when you need them.",
  "We start from what you can already do.",
];

export default function Students() {
  usePageMeta({
    title: "For students | What working with James is like | James Wallace",
    description:
      "A page for young people: what happens when you start, what a session is like, what gets written down, and who you can talk to if you need someone.",
    path: "/students",
  });

  return (
    <>
      {/* 1. Style B hero — the heading and the two-line welcome. */}
      <PageHeader
        eyebrow="For students"
        title="This page is for you"
        lede="School does not work for everyone all the time."
        body={<p className="jw-body jw-body--students">This page says what working with James is like.</p>}
        image={{
          src: "/hero/student-1200.webp",
          srcSet: "/hero/student-600.webp 600w, /hero/student-1200.webp 1200w",
          sizes: "(max-width: 991px) 100vw, 30rem",
          width: 1200,
          height: 1200,
          fetchPriority: "high",
          alt: "A teenager in a grey hoodie sitting at a table, smiling.",
        }}
      />

      {/* 2. What happens first */}
      <section className="jw-section jw-section--tight jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-5">
              <img
                src="/hero/parent1-1100.webp"
                srcSet="/hero/parent1-600.webp 600w, /hero/parent1-1100.webp 1100w"
                sizes="(max-width: 991px) 100vw, 30rem"
                width="1100"
                height="1100"
                loading="lazy"
                alt="A teenager and his mother sitting together at a table in a first meeting, both smiling."
                style={{ display: "block", width: "100%", height: "auto", borderRadius: "14px" }}
              />
            </div>
            <div className="col-12 col-lg-7">
              <h2 style={{ marginBottom: "1.25rem" }}>What happens first</h2>
              <p className="jw-body jw-body--students">You meet James with your parent or carer. This is the first meeting.</p>
              <p className="jw-body jw-body--students">You say what you like, what you find hard, and what you want to get out of it.</p>
              <p className="jw-body jw-body--students" style={{ marginBottom: 0 }}>
                <strong>Nothing is decided without you.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What a session is like */}
      <section className="jw-section jw-section--tight jw-section-surface">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2 style={{ marginBottom: "1.25rem" }}>What a session is like</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {sessionPoints.map((point, i) => (
                  <li
                    key={point}
                    className="jw-body jw-body--students"
                    style={{
                      padding: "0.75rem 0",
                      borderTop: i === 0 ? "none" : "1px solid var(--border, #e5e0d8)",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <figure style={{ margin: 0 }}>
                <img
                  src="/hero/student-working-1600.webp"
                  srcSet="/hero/student-working-800.webp 800w, /hero/student-working-1600.webp 1600w"
                  sizes="(max-width: 991px) 100vw, 40rem"
                  width="1600"
                  height="883"
                  loading="lazy"
                  alt="A teenager writing in a notebook beside a laptop, smiling."
                  style={{ display: "block", width: "100%", borderRadius: "10px", border: "1px solid var(--border)" }}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 4. On a bad day */}
      <section className="jw-section jw-section--tight jw-section-white">
        <div className="jw-container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <img
                src="/hero/younger-1254.webp"
                srcSet="/hero/younger-700.webp 700w, /hero/younger-1254.webp 1254w"
                sizes="(max-width: 991px) 100vw, 38rem"
                width="1254"
                height="1000"
                loading="lazy"
                alt="A girl at a desk at home with a notebook and a laptop, resting her chin on her hand and smiling."
                style={{ display: "block", width: "100%", height: "auto", borderRadius: "14px" }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <h2 style={{ marginBottom: "1.25rem" }}>On a bad day</h2>
              <p className="jw-body jw-body--students">You can say so. That is allowed.</p>
              <p className="jw-body jw-body--students" style={{ marginBottom: 0 }}>We change the plan. A hard day does not get you into trouble.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Who James is */}
      <section className="jw-section jw-section--tight jw-section-warm">
        <div className="jw-container" style={{ maxWidth: "46rem" }}>
          <h2 style={{ marginBottom: "1.25rem" }}>Who James is</h2>
          <p className="jw-body jw-body--students">James is a qualified teacher.</p>
          <p className="jw-body jw-body--students">
            He has taught for thirteen years in specialist provision. Twelve of those years were in a
            special school.
          </p>
          <p className="jw-body jw-body--students">He works with one young person at a time.</p>
          <Link to="/about" className="jw-text-link">
            More about James
          </Link>
        </div>
      </section>

      {/* 6. What gets written down */}
      <section className="jw-section jw-section--tight jw-section-white">
        <div className="jw-container" style={{ maxWidth: "46rem" }}>
          <h2 style={{ marginBottom: "1.25rem" }}>What gets written down</h2>
          <p className="jw-body jw-body--students">After each session, James writes a short note about what you did.</p>
          <p className="jw-body jw-body--students">The note goes to the adults who are responsible for your education.</p>
          <p className="jw-body jw-body--students" style={{ marginBottom: 0 }}>You can ask to see it.</p>
        </div>
      </section>

      {/* 7. Keeping you safe */}
      <section className="jw-section jw-section--tight jw-section-surface">
        <div className="jw-container" style={{ maxWidth: "46rem" }}>
          <h2 style={{ marginBottom: "1.25rem" }}>Keeping you safe</h2>
          <p className="jw-body jw-body--students">
            If you tell James something that means you or someone else might be at risk, he has to pass
            it on. He does this to keep you safe.
          </p>
          <p className="jw-body jw-body--students">He will tell you first, where he can.</p>
          <p className="jw-body jw-body--students">
            {SAFEGUARDING_ROLES.dsl.name} is the {SAFEGUARDING_ROLES.dsl.role} at James&#39;s work.
          </p>
          <Link to="/compliance" className="jw-text-link">
            How James keeps people safe
          </Link>
        </div>
      </section>

      {/* 8. Need someone to talk to? */}
      <section className="jw-section jw-section--tight jw-section-warm">
        <div className="jw-container" style={{ maxWidth: "46rem" }}>
          <h2 style={{ marginBottom: "1.25rem" }}>Need someone to talk to?</h2>
          <p className="jw-body jw-body--students">
            <strong>
              James is a teacher, not a counsellor or an emergency service. If you are in danger now,
              call 999.
            </strong>
          </p>
          <p className="jw-body jw-body--students" style={{ marginBottom: "1.5rem" }}>
            These services are not part of James&#39;s work. They are free, and they are there for
            people your age.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SERVICES.map((s) => (
              <li
                key={s.key}
                style={{
                  padding: "0.85rem 0",
                  borderTop: "1px solid var(--border, #e5e0d8)",
                }}
              >
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                  {s.name}
                </a>
                <p className="jw-caption" style={{ margin: "0.2rem 0 0" }}>{s.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. A question for James? */}
      <section className="jw-section jw-section--tight jw-section-white">
        <div className="jw-container" style={{ maxWidth: "46rem" }}>
          <h2 style={{ marginBottom: "1.25rem" }}>A question for James?</h2>
          <p className="jw-body jw-body--students">Ask your parent or carer to get in touch.</p>
          <p className="jw-body jw-body--students" style={{ marginBottom: "1.5rem" }}>
            You do not have to send anything about yourself. There is no form here.
          </p>
          <Link to="/contact" className="jw-btn-primary">
            Go to the contact page
          </Link>
        </div>
      </section>
    </>
  );
}
