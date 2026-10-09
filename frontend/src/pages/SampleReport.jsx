import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";

// A sample of the two records a commissioner receives. EVERY name, date and figure here is invented:
// nothing on this page comes from a learner's record. The field list follows the portal's own session
// report (attendance, session type and place, planned and actual times, engagement 0 to 5, summary,
// impact moment, evidence, safeguarding, physical intervention, hours) and the monthly deliverables
// listed on /for-las. If those change, change this page with them.
const session = [
  ["Learner", "Learner A, Year 9, EHCP in place"],
  ["Session", "14 of the placement (week 6, Tuesday)"],
  ["Attendance", "Present, morning session"],
  ["Type and place", "In person, community library study room"],
  ["Planned time", "09:30 to 11:30"],
  ["Actual time", "09:40 to 11:30. Started ten minutes late: taxi delayed"],
  ["Engagement", "4 out of 5"],
  ["Evidence uploaded", "Yes: two photographs of written work"],
  ["Safeguarding concern", "None raised"],
  ["Physical intervention", "None"],
  ["Hours delivered", "1.8 of 2.0 commissioned"],
  ["Report filed", "Same day, 14:05"],
];

const criteria = [
  ["Reads a short non-fiction text and answers three retrieval questions", "Answered three of three, unprompted, on an article about bridge design", "Achieved today"],
  ["Uses a written method for multiplying two-digit numbers", "Four of six correct with the grid method; place-value slips on the other two", "In progress"],
  ["Stays with a task he finds hard for ten minutes before asking for a break", "Twelve minutes on the multiplication work, then asked for a break in words", "In progress"],
];

const month = [
  ["Sessions planned", "12"],
  ["Sessions delivered", "11"],
  ["Learner absence", "1 (illness, reported by parent before the session; catch-up booked)"],
  ["Attendance", "92%"],
  ["Average engagement", "3.8 out of 5 (3.1 the month before)"],
  ["Plan criteria", "9 in the plan: 3 achieved, 4 in progress, 2 not started"],
  ["Commissioned hours", "24.0"],
  ["Delivered hours", "22.0 (variance of 2.0, catch-up booked for week 9)"],
  ["Reports filed within 24 hours", "11 of 11"],
  ["Safeguarding", "Nil return, signed by the Designated Safeguarding Lead"],
  ["Invoice", "Session by session, matching the delivered hours above"],
];

function renderRows(rows) {
  return (
    <dl className="jw-sample-rows">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function SampleReport() {
  usePageMeta({
    title: "Sample session report and monthly summary | James Wallace Education",
    description:
      "A sample of what a commissioner receives: one session report and one monthly summary, shown with invented data so the format can be judged before a placement.",
    path: "/sample-report",
  });

  return (
    <>
      <section className="jw-section jw-section-warm">
        <div className="jw-container" style={{ maxWidth: "860px" }}>
          <p className="jw-eyebrow">Sample, with invented data</p>
          <h1>What a commissioner receives</h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
            One session report and one monthly summary, laid out with the fields recorded for every session.
            Every name, date and figure on this page is invented. No learner&apos;s record is shown here, and
            none ever will be.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--text-muted)" }}>
            The engagement score is the teacher&apos;s own observation of that session, on a scale of 0 to 5.
            It shows how a learner&apos;s engagement changes over time. It is not a measure of attainment.
          </p>
        </div>
      </section>

      <section className="jw-section jw-section-white">
        <div className="jw-container" style={{ maxWidth: "860px" }}>
          <article className="jw-sample-doc" aria-labelledby="sample-session">
            <p className="jw-sample-stamp">Sample: invented data</p>
            <h2 id="sample-session">Session report</h2>
            {renderRows(session)}

            <h3>What we did</h3>
            <p>
              Started with ten minutes on the bridge article he chose last week, then retrieval questions.
              Moved to grid-method multiplication at the whiteboard before trying it on paper. Finished with
              his own choice: sketching a bridge to scale, which gave a reason to measure and multiply.
            </p>

            <h3>What stood out</h3>
            <p>
              When the multiplication went wrong he asked for a break in words rather than leaving the room.
              That is the first time in the placement.
            </p>

            <h3>Progress against the plan</h3>
            <div className="jw-sample-table-wrap">
              <table className="jw-sample-table">
                <thead>
                  <tr><th scope="col">Criterion from the plan</th><th scope="col">Evidence today</th><th scope="col">Status</th></tr>
                </thead>
                <tbody>
                  {criteria.map(([c, e, s]) => (
                    <tr key={c}><th scope="row">{c}</th><td>{e}</td><td>{s}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Next session</h3>
            <p style={{ marginBottom: 0 }}>
              Repeat the grid method with place-value counters first. Bring the scale drawing back as the
              starting activity.
            </p>
          </article>

          <article className="jw-sample-doc" aria-labelledby="sample-month" style={{ marginTop: "2.5rem" }}>
            <p className="jw-sample-stamp">Sample: invented data</p>
            <h2 id="sample-month">Monthly summary</h2>
            <p>Month 2 of the placement, for the commissioning officer.</p>
            {renderRows(month)}
            <h3>Summary for review</h3>
            <p style={{ marginBottom: 0 }}>
              Attendance has held since the move to morning sessions. Engagement is rising, most clearly when
              a session starts from something he has chosen. Reading retrieval is secure; written
              multiplication is the current priority. Two hours are owed and booked. No safeguarding concerns
              this month.
            </p>
          </article>

          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "2rem" }}>
            A real report is shared only with the commissioner and the people named in the placement plan.
            What a placement receives, and how often, is agreed in the commission.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link to="/for-las" className="jw-text-link">How commissioning works <span aria-hidden="true">→</span></Link>
          </p>
        </div>
      </section>
    </>
  );
}
