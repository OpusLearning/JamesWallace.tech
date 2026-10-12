// Dates on the calendar shown on the home page (James, 12 Oct 2026: "mentioning certain days in the calendar
// on the site ... makes it look informed, topical and considerate").
//
// Only days with a FIXED date each year live here, so nothing can be wrong next year. `start` and `end` are
// "MM-DD". `by` is who leads the day and `link` is their own page (each opened on 12 Oct 2026). Days whose
// dates move each year (Anti-Bullying Week, Children's Mental Health Week, Neurodiversity Celebration Week,
// Mental Health Awareness Week and others) go in DATED below, with the year, only after the organiser's own
// page has been read for that year.
export const FIXED = [
  { name: "International Day of Education", start: "01-24", by: "the United Nations", link: "https://www.un.org/en/observances/education-day" },
  { name: "Dyscalculia Awareness Day", start: "03-03", by: "the Dyscalculia Network", link: "https://dyscalculianetwork.com/" },
  { name: "World Down Syndrome Day", start: "03-21", by: "Down Syndrome International", link: "https://www.worlddownsyndromeday.org/" },
  { name: "World Autism Awareness Day", start: "04-02", by: "the United Nations", link: "https://www.un.org/en/observances/autism-day" },
  { name: "World Teachers’ Day", start: "10-05", by: "UNESCO", link: "https://www.unesco.org/en/days/teachers" },
  { name: "ADHD Awareness Month", start: "10-01", end: "10-31", by: "the ADHD Awareness Month Coalition", link: "https://www.adhdawarenessmonth.org/" },
  { name: "Black History Month", start: "10-01", end: "10-31", by: "Black History Month UK", link: "https://www.blackhistorymonth.org.uk/" },
  { name: "World Mental Health Day", start: "10-10", by: "the World Federation for Mental Health", link: "https://wmhdofficial.com/" },
  { name: "International Stammering Awareness Day", start: "10-22", by: "stammering associations worldwide; in the UK, STAMMA", link: "https://stamma.org/" },
  { name: "World Children’s Day", start: "11-20", by: "UNICEF", link: "https://www.unicef.org/world-childrens-day" },
  { name: "International Day of Persons with Disabilities", start: "12-03", by: "the United Nations", link: "https://www.un.org/en/observances/day-of-persons-with-disabilities" },
];

// Days that move: { name, start: "YYYY-MM-DD", end, by, link, checked: "date the organiser's page was read" }.
export const DATED = [];

const DAY = 86400000;
const at = (y, md) => new Date(`${y}-${md}T12:00:00Z`).getTime();

// The one thing to show today, in this order: a single day that is today or within the last three days; a
// single day or week starting within the next ten days; a month-long observance running now; anything
// starting within the next 21 days. Returns { item, when } where when is "today", "recent" or "soon".
export function onTheCalendar(now = new Date()) {
  const t = now.getTime();
  const y = now.getUTCFullYear();
  const items = [];
  for (const yy of [y - 1, y, y + 1]) {
    for (const d of FIXED) items.push({ ...d, s: at(yy, d.start) - DAY / 2, e: at(yy, d.end || d.start) + DAY / 2 });
  }
  for (const d of DATED) items.push({ ...d, s: new Date(`${d.start}T00:00:00Z`).getTime(), e: new Date(`${d.end || d.start}T23:59:59Z`).getTime() });
  const long = (i) => i.e - i.s > 8 * DAY;
  const short = items.filter((i) => !long(i));
  const today = short.filter((i) => t >= i.s && t <= i.e).sort((a, b) => b.s - a.s)[0];
  if (today) return { item: today, when: "today" };
  const recent = short.filter((i) => t > i.e && t - i.e <= 3 * DAY).sort((a, b) => b.e - a.e)[0];
  if (recent) return { item: recent, when: "recent" };
  const upcoming = (days) => items.filter((i) => i.s > t && i.s - t <= days * DAY).sort((a, b) => a.s - b.s)[0];
  const soon = upcoming(10);
  if (soon) return { item: soon, when: "soon" };
  const month = items.filter((i) => long(i) && t >= i.s && t <= i.e).sort((a, b) => a.s - b.s)[0];
  if (month) return { item: month, when: "today" };
  const later = upcoming(21);
  return later ? { item: later, when: "soon" } : null;
}

export function dateLabel(item) {
  const f = (ms) => new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });
  const mid = item.s + DAY / 2;
  if (item.e - item.s > 8 * DAY) return new Date(mid).toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  return item.e - item.s > 1.5 * DAY ? `${f(mid)} to ${f(item.e - DAY / 2)}` : f(mid);
}
