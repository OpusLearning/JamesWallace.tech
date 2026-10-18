// The company and James as structured data, one node each (QUEUE SEO-2, site audit 18 Oct 2026 E1 and E3).
//
// Every page that names James used to describe him afresh, so search engines and AI answers saw several
// unrelated people called James Wallace and a company with no one behind it. The full nodes live here and
// carry fixed @ids; the home page publishes both, /about and /credentials publish James, and any other page
// that names him adds PERSON_REF so it points at the same person. Every value repeats something the site
// already shows (footer, /credentials, facts.js). No postal address: the registered office is not where
// teaching happens.
import { AREA, BIO, COMPANY, PROFILES, TRAINING } from "./facts";

export const ORG_ID = "https://jameswallace.tech/#org";
export const PERSON_ID = "https://jameswallace.tech/#james";
export const PERSON_REF = { "@id": PERSON_ID };

const credential = (name, credentialCategory, recognizedBy) => ({
  "@type": "EducationalOccupationalCredential",
  name,
  credentialCategory,
  ...(recognizedBy ? { recognizedBy: { "@type": "Organization", name: recognizedBy } } : {}),
});

export const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "James Wallace",
  url: "https://jameswallace.tech/about",
  jobTitle: "Specialist EOTAS and SEND tutor",
  worksFor: { "@id": ORG_ID },
  sameAs: PROFILES,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Manchester Metropolitan University" },
    { "@type": "CollegeOrUniversity", name: "University of Derby" },
    { "@type": "CollegeOrUniversity", name: "The Open University" },
  ],
  hasCredential: [
    credential("Qualified Teacher Status (QTS)", "Professional certification", "Department for Education"),
    credential("Master of Education (MEd)", "Degree", "The Open University"),
    credential(BIO.degree, "Degree", "Manchester Metropolitan University"),
    credential("Enhanced DBS on the Update Service", "Background check"),
    credential(TRAINING.dsl.name, "Certificate", TRAINING.dsl.provider),
  ],
};

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: COMPANY.legalName,
  legalName: COMPANY.legalName,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Companies House company number",
    value: COMPANY.number,
  },
  foundingDate: COMPANY.incorporated,
  founder: PERSON_REF,
  url: "https://jameswallace.tech/",
  logo: "https://jameswallace.tech/favicon.svg",
  email: "hello@jameswallace.tech",
  telephone: "07897 021077",
  sameAs: PROFILES,
  areaServed: AREA.jsonLd,
};
