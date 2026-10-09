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
// The years are not in conflict once written out: Foxwood Academy Jan 2006 to Oct 2018 is twelve years in a special
// school (James, 7 Oct 2026: "it's not a special SEMH school, it's just special school"), and EOTAS delivery resumed in April 2025. Thirteen years teaching in specialist provision is the
// aggregate. Write the aggregate and the Foxwood figure together so neither reads as a contradiction of the other.
// The years are written into each page's own sentence rather than exported as a string, because the grammar differs
// every time. What must not differ: thirteen years teaching, twelve of them at the special school, five commissioning.
export const BIO = {
  degree: "BSc (Hons) Computer Science",
  degreeShort: "BSc Computer Science",
};

// Placements and taught hours. /provision and /tuition each carried their own range (3-15 and 5-25) and disagreed.
// 12 Sep 2026: 3-15 taught hours a week was the range. 8 Oct 2026 (James: "align the website with the bid"): the
// Nottingham tender (CPU7109 Lot 1) offers up to twelve hours a week for a pupil, so the site says the same.
// One number, one place.
export const DELIVERY = {
  hoursPerWeek: "up to 12 hours per week",
};

// The reply-time promise. /for-las already published "within 2 working days" for referral
// enquiries; James extended the same promise to parents on 5 Oct 2026 (QUEUE REPLY-PROMISE,
// prompt prompts/2026-10-05-analytics-jobs.md), so /for-las, /tuition and /contact read it from
// here and cannot drift. Source: already published on /for-las; extended to parents by James,
// 5 Oct 2026. Do not strengthen it (not "same day", not "within hours").
export const REPLY = {
  within: "within 2 working days",
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
  // James, 25 Sep 2026. Source: sources/people/james-project-search.md. The date and provider are
  // also named on /compliance, so they live here once. Seven modules plus assessment; the module
  // list is the source's own ordering, lone working and personal safety first.
  safeAndSupported: {
    name: "Safe and Supported",
    provider: "Fresh Start in Education",
    completed: "22 August 2026",
    score: "Scored 100%. Verification code 6452621159JW.",
    modules:
      "Seven modules plus assessment covering lone working and personal safety, recognising dysregulation, non-physical de-escalation, when to pause or end a session, emergency procedures, absconding and incident reporting.",
  },
  // Asmaa Ahmed's Home Office Prevent duty training, completed 26 September 2026. Source:
  // sources/training/asmaa-prevent-2026/README.md. Three courses from the Home Office Prevent duty
  // training service; the Home Office states no expiry, and the org rule renews Prevent every 24
  // months (26 September 2028).
  asmaaPrevent: {
    provider: "Home Office, Prevent duty training service",
    completed: "26 September 2026",
    renewal: "26 September 2028",
    courses: [
      { name: "Prevent awareness course", reference: "3P9B-N462-KE7A" },
      { name: "Prevent referrals course", reference: "2KC9-U462-B7PK" },
      {
        name: "Prevent Channel or Prevent Multi-Agency Panel (PMAP) course",
        reference: "2G8V-M462-CDAC",
      },
    ],
  },
};

// James, 25 Sep 2026. Source: sources/people/james-project-search.md. Ran alongside teaching at
// Foxwood Academy (Jan 2006 to Oct 2018), not as a separate job: James's wording is "jointly led
// rather than led; it was a project across employers". No partner is named beyond Nottingham
// University Hospitals, and the programme is described only in general terms.
export const PROJECT_SEARCH = {
  title: "Project SEARCH",
  employer: "Nottingham University Hospitals",
  dates: "2012 to 2018",
  concurrency: "alongside teaching at Foxwood Academy",
  summary: "Jointly led Project SEARCH at Nottingham University Hospitals, 2012 to 2018.",
  description:
    "A supported-internship programme for young people with learning disabilities or autism, delivered across employers.",
};

// James, 25 Sep 2026 (QUEUE 20260925-site-followups): the platform product is "JWE Portal". Named on
// /platform, /compliance, /provision and /for-las, so it lives here once.
export const PRODUCT = { name: "JWE Portal" };

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

// James, 26 Sep 2026 ("yes to all"; QUEUE TRN-7S). Named safeguarding leads beyond the DSL and
// deputy; source: sources/training/asmaa-prevent-2026/README.md ("Named leads"). The Prevent lead
// sits with Asmaa's DSL role; James holds online safety and attendance alongside the deputy DSL role.
const deputy = { name: "James Wallace", role: "Deputy Designated Safeguarding Lead" };
const preventLead = { name: dsl.name, role: "Prevent lead" };
const onlineSafetyLead = { name: "James Wallace", role: "Online safety lead" };
const attendanceLead = { name: "James Wallace", role: "Attendance lead" };

export const SAFEGUARDING_ROLES = {
  dsl,
  deputy,
  preventLead,
  onlineSafetyLead,
  attendanceLead,
  // The one sentence that names every lead, built from the roles above so the names cannot drift.
  // Rendered plainly on /credentials, /compliance and /complaints.
  leads:
    `${dsl.role} and ${preventLead.role}: ${dsl.name}. Deputy DSL, ` +
    `${onlineSafetyLead.role.toLowerCase()} and ${attendanceLead.role.toLowerCase()}: ${deputy.name}.`,
};

// James, 28 Sep 2026 (QUEUE ICO-NUMBER). James Wallace Education Ltd's registration with the
// Information Commissioner's Office as a data controller: number ZC257612, confirmed 28 September
// 2026 (application reference C2042401, fee paid 25 September 2026). The older registration
// ZB477144 is James's own as a sole trader and is deliberately not recorded here, because it is
// not the company's. Shown in the footer company line and in the privacy notice's controller
// details, so the number lives here once.
export const ICO = {
  registrationNumber: "ZC257612",
  registerUrl: "https://ico.org.uk/ESDWebPages/Entry/ZC257612",
};

// James, 6 Oct 2026 (QUEUE BADGES). The footer's registrations strip. `held: false` renders greyed
// with its status line, and must be flipped only when the evidence is in hand:
// - Disability Confident Committed: confirmed by DWP on 6 October 2026 (scheme ID DCS050928), valid
//   to 6 October 2029. Renewal is every three years.
// - Emergency First Aid at Work: Skills Training Group course booked for 12 October 2026.
// Logos (James, 6 Oct 2026: "use the organisations actual images"). The ICO image is the file James
// supplied; the nasen mark is its site logo (white) on its own header green; first aid carries the
// training provider's logo, greyed until the certificate is in hand. Claude told James that the ICO's
// re-use terms say its logo signifies ICO approval, and that nasen's member e-badge is a Plus-tier
// benefit; he chose to show them. `icon` is the drawn fallback if an image is ever removed.
export const REGISTRATIONS = [
  {
    key: "ico",
    image: "/badges/ico-registered.png",
    imageAlt: "ICO registered",
    imageSize: [81, 76],
    icon: "shield",
    name: "ICO registered",
    detail: `Registration ${ICO.registrationNumber}`,
    href: ICO.registerUrl,
    held: true,
  },
  {
    // nasen Core (free, individual) membership in James's name, joined 6 October 2026. The member
    // e-badge comes only with the paid Plus tier, so this entry is text only.
    key: "nasen",
    image: "/badges/nasen.png",
    imageAlt: "nasen",
    imageSize: [478, 200],
    icon: "book",
    name: "nasen member",
    detail: "Special educational needs association",
    held: true,
  },
  {
    key: "disability-confident",
    name: "Disability Confident Committed",
    detail: "Valid to 6 October 2029",
    // DWP's own badge file, downloaded from the employer account on 6 October 2026. The branding
    // guidance says it must not be recoloured, cropped or redrawn, so it is shown as supplied.
    image: "/badges/disability-confident-committed.png",
    imageAlt: "Disability Confident Committed badge",
    imageSize: [500, 241],
    held: true,
  },
  {
    // James's own certificate (Coursera, eight courses), issued 25 December 2023; the badge is the one
    // Credly issued to him. Full record on /credentials.
    key: "google-cyber",
    icon: "shield",
    image: "/badges/google-cybersecurity.png",
    imageAlt: "Google Cybersecurity Professional Certificate badge",
    imageSize: [256, 243],
    name: "Google Cybersecurity Certificate",
    detail: "Issued December 2023",
    held: true,
  },
  {
    key: "first-aid",
    image: "/badges/skills-training-group.svg",
    imageAlt: "Skills Training Group",
    imageSize: [125, 53],
    icon: "cross",
    name: "Emergency First Aid at Work",
    detail: "Course booked, 12 October 2026",
    held: false,
  },
];

// James, 6 Oct 2026 (QUEUE AFC-1). The company's Armed Forces Covenant pledge was submitted on GOV.UK on
// 6 October 2026 (form reference L36GV2PM). Until Defence Relationship Management confirm it and James
// signs the certificate, the site must say "submitted", never "signed", and must not show the Covenant
// logo. The pledges James chose: promote externally, fair access to services, the wellbeing of Service
// children, signposting to support, and display of the logo once issued. `status` flips to "signed"
// (with the date) when the certificate is in hand; the two sentences below are then rewritten together.
export const ARMED_FORCES = {
  status: "submitted",
  submitted: "6 October 2026",
  covenantUrl: "https://www.armedforcescovenant.gov.uk/",
  families:
    "If someone in your family is serving, I plan around postings and deployments. Sessions can move online or be rearranged, and a move does not have to end the teaching.",
  statement:
    "James Wallace Education Ltd submitted its pledge to the Armed Forces Covenant on 6 October 2026 and is awaiting confirmation.",
};

// The policy pack. Checked against the live portal on 6 October 2026: 46 policies ACTIVE with an
// APPROVED current version (43 approved 27 September 2026, three more on 5 October 2026), four retired.
// Every page that describes the suite's status reads it from here. The public /policies page is a
// separate job (QUEUE POL-PUB-S); until it ships, policies are shared on request.
export const POLICY_PACK = {
  approved: "27 September 2026",
  version: "2.0",
  status: "approved on 27 September 2026 and reviewed every year",
};

// Prices. James, 7 Oct 2026: "make prices consistent but remember what's been added in previous bids".
// The commissioned rates are the ones tendered to Derbyshire (CCS061, 27 Sep 2026) and Leicestershire
// (DN827502, 6 Oct 2026): 67.50 an hour in person or at home, 55.00 an hour online, travel met by the
// company and not charged, no VAT (the company is not VAT registered). The site used to show "£250 per
// day" for commissioned work, which matched neither bid. Family rates are James's private rates and are
// not part of any bid. server/helper.js (the chat assistant) repeats these figures by hand: change both.
export const PRICES = {
  family: "£45",
  familyEhcp: "£50",
  commissionedInPerson: "£67.50",
  commissionedOnline: "£55",
  // 8 Oct 2026: the day and half-day prices tendered to Nottingham (CPU7109 Lot 1), which buys by the day and
  // half day and takes no hourly price. A half day is up to 3 hours (three hours at the hourly rate); a day is
  // more than 3 and up to 5.5 hours (the Derbyshire day price, in person). server/helper.js and server/email.js
  // repeat these by hand.
  commissionedHalfDayInPerson: "£202.50",
  commissionedDayInPerson: "£309.38",
  commissionedHalfDayOnline: "£165",
  commissionedDayOnline: "£252.09",
};

// Where commissioned records are hosted. James, 8 Oct 2026: "write EU and to be ported to UK only". True today:
// the portal database is in Frankfurt and its documents in Western Europe. The Nottingham tender (CPU7109) commits
// to UK storage before any Nottingham pupil's data is entered; that framework starts on 14 April 2027, so that is
// the latest date. When the move is done (QUEUE UK-INSTANCE), change `now` and delete `planned`.
export const HOSTING = {
  now: "EU (Frankfurt)",
  planned:
    "Moving to UK-only hosting before 14 April 2027, and sooner for any placement that needs it.",
};

// Care leavers. James, 7 Oct 2026 ("you pick a workable offer for care leaver", then "add this to the
// website and emails"). The offer was submitted on the Care Leaver Covenant's sign-up form on 7 October
// 2026; the Covenant team confirm and publish it after James approves their draft. Until then the site
// states the offer itself and says the company "has applied to join", never "signatory", and shows no
// Covenant logo. server/email.js repeats the offer line by hand: change both.
export const CARE_LEAVERS = {
  offer:
    "Each year I offer ten free one-to-one online tuition sessions, in maths or English, to one care leaver aged 16 to 25 who is working towards a GCSE or Functional Skills qualification.",
  how: "To ask about it, email hello@jameswallace.tech, or ask a personal adviser or leaving care team to email for you.",
  statement: "James Wallace Education Ltd has applied to join the Care Leaver Covenant (7 October 2026).",
  covenantUrl: "https://mycovenant.org.uk/",
};

// James, 8 Oct 2026 (QUEUE LINKS-2: "add links to make some of the tools and pages more visible").
// The free parent-facing guides on the journal, so the main site can point families and carers at
// them from one place. The lines are deliberately flat and factual: the guides are free, written for
// parents and carers in England from the law and government guidance, and are information rather than
// legal advice (GUIDES_NOTE). No outcome claims and no sales language. `hub` is the journal's index of
// every guide; the rest are the individual guides plus the deadline calculator.
export const GUIDES = [
  {
    key: "hub",
    name: "Parent guides hub",
    line: "All of the free parent guides in one place.",
    url: "https://blog.jameswallace.tech/guides/",
  },
  {
    key: "send-guide",
    name: "EHC plans and SEND Tribunal appeals",
    line: "How EHC plans work, how to ask for an assessment, and how to appeal to the SEND Tribunal.",
    url: "https://blog.jameswallace.tech/send-guide/",
  },
  {
    key: "exclusions-guide",
    name: "School suspensions and permanent exclusions",
    line: "How suspensions and permanent exclusions work, what the school must tell you, and how to challenge a decision.",
    url: "https://blog.jameswallace.tech/exclusions-guide/",
  },
  {
    key: "eotas-guide",
    name: "Education when a child cannot attend school: Section 19 and EOTAS",
    line: "What the council must arrange when a child cannot attend school, and how education otherwise than at school (EOTAS) works.",
    url: "https://blog.jameswallace.tech/eotas-guide/",
  },
  {
    key: "admissions-guide",
    name: "School admission appeals",
    line: "How to appeal a school admission decision, the deadlines, and how the panel decides.",
    url: "https://blog.jameswallace.tech/admissions-guide/",
  },
  {
    key: "calculator",
    name: "EHC plan deadline calculator",
    line: "Works out the usual EHC plan deadlines from a date you enter.",
    url: "https://blog.jameswallace.tech/ehcp-deadline-calculator/",
  },
];

// The journal's index of every guide, and the one note that describes the whole set.
export const GUIDES_HUB = GUIDES[0];
export const GUIDES_NOTE =
  "Free, for parents and carers in England, written from the law and government guidance. Information, not legal advice.";

// James, 9 Oct 2026 (QUEUE SITEFIX-3). The area served. James: "let's say East Midlands, although
// primarily D2N2" — the abbreviation is never written on the site. A sentence for prose, a short
// form for labels, and one areaServed list for JSON-LD, so every page says the same thing. The two
// place names that stay put are employment facts (Nottinghamshire County Council, Foxwood Academy),
// not statements of the area served.
export const AREA = {
  sentence:
    "In person across the East Midlands, mainly Derby, Derbyshire, Nottingham and Nottinghamshire, and online.",
  label: "East Midlands (mainly Derby, Derbyshire, Nottingham and Nottinghamshire); online across the UK",
  // For the home page hero and search descriptions, where the full label is too long (Claude, 9 Oct 2026).
  short: "Derby, Derbyshire, Nottingham, Nottinghamshire and online",
  // For search descriptions, which are cut off at about 160 characters (red team, 9 Oct 2026).
  meta: "Derbyshire, Nottinghamshire and online",
  jsonLd: [
    { "@type": "AdministrativeArea", name: "Derby" },
    { "@type": "AdministrativeArea", name: "Derbyshire" },
    { "@type": "AdministrativeArea", name: "Nottingham" },
    { "@type": "AdministrativeArea", name: "Nottinghamshire" },
    { "@type": "AdministrativeArea", name: "East Midlands" },
  ],
};

// Where sessions can take place. James, 9 Oct 2026: a school is possible but rare, because a child
// who can get to school is usually better placed in lessons there.
export const SESSIONS = {
  school:
    "A session can take place in a school where that suits the child, but that is rare.",
};

// The platform's status. James, 9 Oct 2026: it cannot truly be live until there is a real pupil.
export const PLATFORM_STATUS = {
  sentence:
    "The platform is built and is being tested end to end with made-up data. It goes into live use with the first commissioned placement.",
  // The same fact for use straight after a sentence that already begins "The platform is built to".
  follow:
    "It is being tested end to end with made-up data and goes into live use with the first commissioned placement.",
};

// The safeguarding mailbox, shown beside the named designated safeguarding lead wherever a parent
// or commissioner would look (SITEFIX-3 item 4). Asmaa Ahmed has consented to her name and role
// (see the comment above SAFEGUARDING_ROLES); this adds only the mailbox.
export const SAFEGUARDING_CONTACT = {
  email: "safeguarding@jameswallace.tech",
};

// Profile URLs published on the site's own pages, for the Organization and Person JSON-LD sameAs.
// James, 9 Oct 2026 (SITEFIX-3 item 5). The footer has no place for social links, so these are
// structured-data only.
export const PROFILES = [
  "https://www.linkedin.com/in/jameswallace-education",
  "https://www.youtube.com/@JamesWallaceEducation",
];

// Reviewed by hand. If this date is stale the page should not claim currency.
export const REVIEWED = "25 September 2026";

// "Taking new placements now" is worth more to a commissioner with a date against it: they can tell whether they are
// reading something live or something written six months ago. Update `reviewed` whenever the status is checked, even
// if the status itself has not changed.
export const AVAILABILITY = {
  status: "Taking new students and placements now",
  statusPlacements: "Taking new placements now",
  // James confirmed availability on 6 October 2026. Kept apart from REVIEWED, which dates the qualifications and
  // compliance review and must not move unless that review is redone.
  reviewed: "6 October 2026",
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
