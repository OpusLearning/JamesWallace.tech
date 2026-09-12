// Single source of truth for the facts that repeat across pages.
//
// 12 Sep 2026: the credentials page recorded KCSIE 2026 training completed 9 September while the family, agency and
// compliance pages still described KCSIE 2025 as current, and compliance cited Working Together 2023 when the 2026
// edition has been in force since March. That drift came from every page hard-coding its own copy of the same fact.
// Statutory guidance and training currency now live here and are imported, so there is one place to update.
//
// Historical certificate titles deliberately do NOT come from here. A certificate that says "KCSIE 2025 Part One" is a
// true record of what that course covered, and must keep saying so.

export const STATUTORY = {
  kcsie: "KCSIE 2026",
  kcsieLong: "Keeping Children Safe in Education (KCSIE 2026)",
  kcsieInForce: "1 September 2026",
  workingTogether: "Working Together to Safeguard Children 2026",
  workingTogetherPublished: "18 March 2026",
};

export const TRAINING = {
  safeguarding: { name: "Safeguarding and child protection, KCSIE 2026 update", completed: "9 September 2026" },
  prevent: { name: "Prevent duty", completed: "9 September 2026" },
  allergy: { name: "Allergy awareness and anaphylaxis", completed: "24 August 2026" },
  dbs: { name: "Enhanced DBS", status: "On the Update Service, verifiable the same day" },
};

// Reviewed by hand. If this date is stale the page should not claim currency.
export const REVIEWED = "12 September 2026";
