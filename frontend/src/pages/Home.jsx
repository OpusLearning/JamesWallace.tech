import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { AVAILABILITY, REFERENCES, REVIEWED } from "../data/facts";

const questions = [
  {
    question: "My child cannot manage school. Where do we start?",
    answer: "With a conversation about what life is like for your child now. We talk about what they enjoy, what feels difficult and what you hope might change. There is no need to have a plan worked out before you get in touch.",
    to: "/tuition",
    link: "How tuition starts",
  },
  {
    question: "Does my child need a diagnosis or an EHCP?",
    answer: "You can enquire about private tuition without a diagnosis or an Education, Health and Care Plan (EHCP). If an EHCP is in place, teaching can be shaped around its outcomes. We will discuss the support your child needs and whether I am the right person to provide it.",
    to: "/contact?for=parent",
    link: "Discuss your situation",
  },
  {
    question: "Where does teaching take place?",
    answer: "In person across Derbyshire and Nottinghamshire, or online. Sessions can take place at home or in an agreed community setting, depending on what your child can manage and what is appropriate for the placement.",
    to: "/tuition",
    link: "Explore the options",
  },
  {
    question: "Can an agency, school or local authority arrange a placement?",
    answer: "Yes. I work with private families, agencies, schools and local authorities. Qualifications, professional references and compliance information are available to support your checks. Scope, availability and reporting arrangements are agreed before a placement begins.",
    to: "/for-las",
    link: "Information for commissioners",
  },
];

const steps = [
  {
    number: "01",
    title: "First, we listen.",
    text: "A free conversation about your child, what has happened so far and what you need. We decide together whether the fit is right.",
  },
  {
    number: "02",
    title: "Find a starting point.",
    text: "A first session built around their interests and what feels manageable. Time to get to know each other before expecting too much.",
  },
  {
    number: "03",
    title: "Make the next step clear.",
    text: "An agreed personal learning plan, thoughtful teaching and session notes. We review what is helping and adjust what is not.",
  },
];

function Arrow() {
  return <svg className="jw-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export default function Home() {
  usePageMeta({
    title: "James Wallace | One-to-one teaching for children who cannot manage school",
    description: "Specialist SEND and EOTAS teaching in Derbyshire, Nottinghamshire and online. QTS, MEd, enhanced DBS. For families, agencies and local authorities.",
    path: "/",
  });

  return (
    <div className="jw-home">
      <section className="jw-home-hero" aria-labelledby="home-heading">
        <div className="jw-container jw-hero-grid">
          <div className="jw-hero-copy">
            <p className="jw-eyebrow jw-hero-eyebrow"><span aria-hidden="true" /> Specialist one-to-one teaching</p>
            <h1 id="home-heading">A way back<br />to <em>learning.</em></h1>
            <p className="jw-hero-intro">For children who find school difficult.<br />Teaching that starts with who they are.</p>
            <p className="jw-hero-description">I’m James Wallace. I help young people find a starting point, build trust and take their next step in education.</p>
            <div className="jw-hero-actions">
              <Link to="/contact?for=parent" className="jw-btn-primary">Talk about your child <Arrow /></Link>
              <a href="#how-it-starts" className="jw-text-link">How it starts <span aria-hidden="true">↓</span></a>
            </div>
            <p className="jw-hero-location">Derbyshire, Nottinghamshire &amp; online</p>
          </div>
          <figure className="jw-hero-portrait">
            <div className="jw-portrait-frame">
              <img src="/james-wallace.webp" alt="James Wallace, specialist teacher" width="1024" height="1536" fetchPriority="high" />
              <span className="jw-portrait-edge" aria-hidden="true">A personal approach to education</span>
            </div>
            <figcaption><span>James Wallace</span><span>Specialist teacher · QTS, MEd</span></figcaption>
          </figure>
        </div>
        <div className="jw-container">
          <div className="jw-hero-footnote"><p>One young person. Their own way forward.</p><a href="#find-your-route">Find the right support <span aria-hidden="true">↓</span></a></div>
        </div>
      </section>

      <section className="jw-proof-rail" aria-label="Qualifications and professional checks">
        <div className="jw-container jw-proof-grid">
          <p className="jw-proof-intro">Experience you can<br /><em>look into.</em></p>
          <Link to="/credentials"><strong>Qualified teacher</strong><span>QTS since 2004 · MEd</span></Link>
          <Link to="/about"><strong>13 years in specialist teaching</strong><span>Including 12 at Foxwood Academy</span></Link>
          <Link to="/compliance"><strong>Enhanced DBS</strong><span>On the Update Service</span></Link>
          <Link to="/credentials" className="jw-proof-arrow" aria-label="View credentials and professional references"><Arrow /></Link>
        </div>
      </section>

      <section id="find-your-route" className="jw-section jw-pathways" aria-labelledby="pathways-heading">
        <div className="jw-container">
          <div className="jw-section-heading"><p className="jw-eyebrow">A different route through education</p><h2 id="pathways-heading">The right support starts<br />with <em>understanding.</em></h2></div>
          <div className="jw-pathways-grid">
            <Link to="/tuition" className="jw-family-path">
              <span className="jw-eyebrow">For parents &amp; carers</span>
              <h3>You know your child.<br />Let’s start there.</h3>
              <p>When school has become difficult, finding help can feel like another thing to get right. One-to-one teaching offers space to begin with your child’s needs, interests and pace.</p>
              <span className="jw-path-link">Explore tuition for your child <Arrow /></span>
              <span className="jw-family-path-line" aria-hidden="true" />
            </Link>
            <div className="jw-professional-paths">
              <Link to="/agencies" className="jw-professional-path">
                <span className="jw-eyebrow">For agencies &amp; schools</span>
                <h3>A specialist you can place<br className="jw-desktop-break" /> with a clear brief.</h3>
                <p>Experienced SEND teaching, professional checks and session evidence to support your placement.</p>
                <span className="jw-path-link">Work with James <Arrow /></span>
              </Link>
              <Link to="/for-las" className="jw-professional-path">
                <span className="jw-eyebrow">For local authorities</span>
                <h3>Individual provision.<br />Accountable delivery.</h3>
                <p>Teaching informed by five years in Nottinghamshire County Council’s children’s commissioning team.</p>
                <span className="jw-path-link">Explore commissioned provision <Arrow /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="jw-reference-section" aria-label="Professional reference">
        <div className="jw-container jw-reference-layout">
          <div className="jw-reference-label"><p className="jw-eyebrow">A colleague’s perspective</p><span aria-hidden="true">“</span></div>
          <figure className="jw-reference">
            <blockquote>“{REFERENCES[0].quote}”</blockquote>
            <figcaption><div><strong>{REFERENCES[0].name}</strong><span>{REFERENCES[0].role}</span></div><Link to="/credentials" className="jw-text-link">Read professional references <Arrow /></Link></figcaption>
          </figure>
        </div>
      </section>

      <section id="how-it-starts" className="jw-section jw-approach" aria-labelledby="approach-heading">
        <div className="jw-container">
          <div className="jw-section-heading jw-heading-split"><div><p className="jw-eyebrow">How it starts</p><h2 id="approach-heading">Small steps.<br /><em>A considered approach.</em></h2></div><p>We do not need all the answers on day one. We need a place to begin, and a way to notice what helps.</p></div>
          <ol className="jw-steps">{steps.map((step) => <li key={step.number}><span className="jw-step-number" aria-hidden="true">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
          <Link to="/tuition" className="jw-text-link">More about working together <Arrow /></Link>
        </div>
      </section>

      <section className="jw-evidence-section" aria-labelledby="evidence-heading">
        <div className="jw-container jw-evidence-grid">
          <div className="jw-evidence-copy"><p className="jw-eyebrow">Thoughtful teaching. Visible work.</p><h2 id="evidence-heading">You should never<br />have to wonder<br /><em>what happened.</em></h2><p>A personal learning plan gives the teaching direction. Session reports record the activities, engagement and work towards agreed outcomes.</p><p>For families, it is a clearer picture. For commissioners, it is evidence you can use in reviews.</p><Link to="/platform" className="jw-text-link">See how the work is recorded <Arrow /></Link></div>
          <figure className="jw-plan-figure">
            <div className="jw-plan-paper">
              <div className="jw-plan-topline"><span>James Wallace</span><span>Teaching &amp; learning</span></div>
              <p className="jw-plan-label">Illustrative teaching plan</p>
              <h3>A starting point.<br />A next step.</h3>
              <dl className="jw-plan-entries">
                <div><dt><span aria-hidden="true">01</span> Start with</dt><dd>A familiar interest.<small>Something the young person wants to explore.</small></dd></div>
                <div><dt><span aria-hidden="true">02</span> Make space for</dt><dd>A manageable activity.<small>The pace and setting that feel possible.</small></dd></div>
                <div><dt><span aria-hidden="true">03</span> Reflect on</dt><dd>What helped today.<small>What to keep, what to change, what comes next.</small></dd></div>
              </dl>
              <div className="jw-plan-bottom"><span>Agreed together. Reviewed regularly.</span><span aria-hidden="true">↗</span></div>
            </div>
            <figcaption>A simplified illustration of the approach, not a learner’s record or a report of results.</figcaption>
          </figure>
        </div>
      </section>

      <section className="jw-section jw-faq-section" aria-labelledby="faq-heading">
        <div className="jw-container jw-faq-grid"><div><p className="jw-eyebrow">Before you get in touch</p><h2 id="faq-heading">A few things<br />you may be<br /><em>wondering.</em></h2><Link to="/about" className="jw-text-link">Get to know James <Arrow /></Link></div><div className="jw-faq-list">{questions.map((item) => <details key={item.question} className="jw-faq"><summary>{item.question}<span aria-hidden="true" className="jw-faq-indicator" /></summary><div className="jw-faq-answer"><p>{item.answer}</p><Link to={item.to} className="jw-text-link">{item.link} <Arrow /></Link></div></details>)}</div></div>
      </section>

      <section className="jw-invitation" aria-labelledby="invitation-heading">
        <div className="jw-container jw-invitation-inner"><p className="jw-eyebrow">There is a place to begin</p><h2 id="invitation-heading">Let’s talk about<br /><em>what’s possible.</em></h2><p>A free first conversation. Space to explain.<br />An honest view of whether I can help.</p><Link to="/contact?for=parent" className="jw-btn-primary">Start a conversation <Arrow /></Link><div className="jw-availability"><span className="jw-availability-dot" aria-hidden="true" /><span>{AVAILABILITY.status}<small>Availability reviewed {AVAILABILITY.reviewed}</small></span></div><p className="jw-invitation-note">Qualifications and compliance information reviewed {REVIEWED}. <Link to="/compliance">View details</Link></p></div>
      </section>
    </div>
  );
}
