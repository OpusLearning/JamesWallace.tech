// The four things the LOCAL-2 county pages take from each council's own website, read from the
// Journal's checked council list.
//
// The source is a faithful copy of `sources/eotas-guide/council-policies.json` (39 councils, each
// with a section 19 / medical needs document, an EOTAS policy, an alternative provision page and a
// SEND information, advice and support service, every link checked on 8 October 2026 and the
// advice services on 9 October 2026). The copy lives at `src/data/council-policies.json` so that a
// refresh is a file replacement; it must be refreshed when the Journal's own list changes.
//
// This module only selects and formats; it never describes what a council's policy says. The pages
// print the council's own title and link, and nothing more (sources/local-pages/README.md rule 7).

import records from "../data/council-policies.json";

// The brief's four categories, in its order. `label` is the page's own plain-English label; the
// council's own `title` is printed beside it.
export const POLICY_KINDS = [
  { kind: "section19_medical", label: "Section 19 and medical needs" },
  { kind: "eotas_policy", label: "EOTAS guidance" },
  { kind: "local_offer_ap", label: "Alternative provision" },
  { kind: "sendiass", label: "SEND information, advice and support" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2026-10-08" -> "8 October 2026". The JSON's own date, never a new claim.
export function formatChecked(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

// One row per kind for one council: the label, the council's own title, its link (or null where the
// council publishes nothing), and the date the link was checked. A record counts as "found" only
// when it carries a URL that answered on the day it was checked.
function rawRows(council) {
  return POLICY_KINDS.map(({ kind, label }) => {
    const rec = records.find((r) => r.council === council && r.kind === kind);
    if (!rec) return { label, title: null, url: null, checked: null, found: false };
    const found = Boolean(rec.url) && rec.status === 200;
    return {
      label,
      title: rec.title,
      url: found ? rec.url : null,
      checked: formatChecked(rec.date_checked),
      found,
    };
  });
}

// Where a council covers two of the page's labels with one page, print that page once under both
// labels, so one council document is never shown as two.
export function councilRows(council) {
  const out = [];
  for (const row of rawRows(council)) {
    const same = row.found && out.find((r) => r.found && r.url === row.url);
    if (same) same.label = `${same.label}, and ${row.label}`;
    else out.push({ ...row });
  }
  return out;
}
