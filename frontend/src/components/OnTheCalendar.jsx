import { useEffect, useState } from "react";
import { onTheCalendar, dateLabel } from "../data/awarenessDays";

/**
 * One quiet line in the bar along the foot of the home hero: the awareness day that is on today or has just
 * been, and the next one coming, each linked to whoever leads it. It is chosen in the browser from today's date, so the
 * prerendered page never shows a stale day. Its place in the bar is reserved, so nothing moves when it
 * fades in, and when the calendar has nothing near, the bar simply stays as it was.
 */
export default function OnTheCalendar() {
  const [pick, setPick] = useState(null);
  useEffect(() => { setPick(onTheCalendar(new Date())); }, []);
  const lead = { today: "Today", recent: "Just gone", month: "This month" };
  const entry = (label, item) => (
    <span className="jw-hero-calendar-entry" key={label}>
      <span className="jw-hero-calendar-lead">{label}</span>
      <a href={item.link} rel="noopener" title={`Led by ${item.by}`}>{item.name}</a>
      <span className="jw-hero-calendar-date">{dateLabel(item)}</span>
    </span>
  );
  return (
    <p className={`jw-hero-calendar${pick ? " is-ready" : ""}`} aria-hidden={pick ? undefined : "true"}>
      {pick && pick.now && entry(lead[pick.when], pick.now)}
      {pick && pick.next && entry("Coming up", pick.next)}
    </p>
  );
}
