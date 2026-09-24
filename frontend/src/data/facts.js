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

// 12 Sep 2026, second pass: the homepage said "BSc Computing" while the family, About and Credentials pages said
// "BSc (Hons) Computer Science", and the years split between twelve and thirteen depending on the page. The credentials
// page is the one explicitly presenting verifiable evidence, so its wording wins and every other page imports it.
//
// The years are not in conflict once written out: Foxwood Academy Jan 2006 to Oct 2018 is twelve years in a specialist
// SEMH school, and EOTAS delivery resumed in April 2025. Thirteen years teaching in specialist provision is the
// aggregate. Write the aggregate and the Foxwood figure together so neither reads as a contradiction of the other.
// The years are written into each page's own sentence rather than exported as a string, because the grammar differs
// every time. What must not differ: thirteen years teaching, twelve of them at the SEMH school, five commissioning.
export const BIO = {
  degree: "BSc (Hons) Computer Science",
  degreeShort: "BSc Computer Science",
};

// Placements and taught hours. /provision and /tuition each carried their own range (3-15 and 5-25) and disagreed.
// 12 Sep 2026: 3-15 taught hours a week is the accurate range. One number, one place.
export const DELIVERY = {
  hoursPerWeek: "3 to 15 hours per week",
};

export const TRAINING = {
  safeguarding: { name: "Safeguarding and child protection, KCSIE 2026 update", completed: "9 September 2026" },
  prevent: { name: "Prevent duty", completed: "9 September 2026" },
  allergy: { name: "Allergy awareness and anaphylaxis", completed: "24 August 2026" },
  dbs: { name: "Enhanced DBS", status: "On the Update Service, verifiable the same day" },
  // 24 Sep 2026: Designated Safeguarding Lead (Level 3), High Speed Training. Verified by Claude and
  // decided by James on 24 Sep 2026; source: sources/training/dsl-level3-2026/README.md. Both James
  // and Asmaa Ahmed completed it; the recommended renewal is 23 September 2028.
  dsl: {
    name: "Designated Safeguarding Lead (Level 3)",
    provider: "High Speed Training",
    completed: "24 September 2026",
    renewal: "September 2028",
  },
};

// Who holds the safeguarding roles. Decided by James on 24 Sep 2026; source:
// sources/training/dsl-level3-2026/README.md. Asmaa Ahmed has consented to her name, role and
// certificate being public, and James supplied the brief introduction below. Publish nothing else
// about her (no contact details, photo, employer or school). Both roles carry the DSL Level 3 training above.
//
// 24 Sep 2026: brief public introduction for Asmaa, from sources/people/asmaa-ahmed.md only. She
// began as a primary teacher, taught at a charter school in New York, holds a Master's in Education
// and now leads digital journey transformation in EdTech. No employer, school or university is
// named because the source does not supply one. "over eleven years" was confirmed by James on 24 Sep 2026
// (he first said "over 9").
const dsl = {
  name: "Asmaa Ahmed",
  role: "Designated Safeguarding Lead",
  yearsInEducation: "over eleven years",
};
dsl.intro = `${dsl.name} has worked in education for ${dsl.yearsInEducation}, beginning as a primary teacher at a charter school in New York. She holds a Master's in Education and now leads digital journey transformation in EdTech.`;

export const SAFEGUARDING_ROLES = {
  dsl,
  deputy: { name: "James Wallace", role: "Deputy Designated Safeguarding Lead" },
};

// Reviewed by hand. If this date is stale the page should not claim currency.
export const REVIEWED = "25 September 2026";

// "Taking new placements now" is worth more to a commissioner with a date against it: they can tell whether they are
// reading something live or something written six months ago. Update `reviewed` whenever the status is checked, even
// if the status itself has not changed.
export const AVAILABILITY = {
  status: "Taking new students and placements now",
  statusPlacements: "Taking new placements now",
  reviewed: REVIEWED,
};

// Written references from previous employers, held on file. The full set with ratings is on /credentials; the homepage
// shows one, so a visitor meets a second voice without having to go looking for it.
export const REFERENCES = [
  {
    quote:
      "James is a gifted and effective teacher. He has a high degree of professionalism and is wholly committed to supporting young people to develop their skills and interests in order to reach their potential.",
    name: "Chris Humphreys",
    role: "Previous Manager, Foxwood Academy",
    ratings: { timekeeping: 5, flexibility: 4, honesty: 5, safeguarding: 5, communication: 5 },
  },
  {
    quote:
      "James brings a wealth of qualities that make him highly effective in working with children and young people. His patience, empathy, and dedication to fostering both academic and personal growth allowed him to build strong relationships with students, families, and colleagues.",
    name: "James Sinclair",
    role: "Public Health Analyst, Nottinghamshire County Council",
    ratings: { timekeeping: 5, flexibility: 5, honesty: 5, safeguarding: 5, communication: 5 },
  },
];
