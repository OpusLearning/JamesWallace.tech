import { useEffect, useState } from "react";
import { onTheCalendar, dateLabel } from "../data/awarenessDays";

/**
 * One quiet line in the bar along the foot of the home hero: the awareness day that is on today, has just
 * been or is coming next, linked to whoever leads it. It is chosen in the browser from today's date, so the
 * prerendered page never shows a stale day. Its place in the bar is reserved, so nothing moves when it
 * fades in, and when the calendar has nothing near, the bar simply stays as it was.
 */
export default function OnTheCalendar() {
  const [pick, setPick] = useState(null);
  useEffect(() => { setPick(onTheCalendar(new Date())); }, []);
  const lead = pick ? { today: "Today", recent: "Just gone", soon: "Coming up" }[pick.when] : "";
  return (
    <p className={`jw-hero-calendar${pick ? " is-ready" : ""}`} aria-hidden={pick ? undefined : "true"}>
      {pick && (
        <>
          <span className="jw-hero-calendar-dot" aria-hidden="true" />
          <span className="jw-hero-calendar-lead">{lead}</span>
          <a href={pick.item.link} rel="noopener" title={`Led by ${pick.item.by}`}>{pick.item.name}</a>
          <span className="jw-hero-calendar-date">{dateLabel(pick.item)}</span>
        </>
      )}
    </p>
  );
}
