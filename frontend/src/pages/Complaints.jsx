import { Link } from "react-router-dom";
import { LegalPage, LegalSection } from "../components/Legal";
import { SAFEGUARDING_ROLES } from "../data/facts";

const CONTACT_EMAIL = "hello@jameswallace.tech";
const CONTACT_PHONE = "07897 021077";

export default function Complaints() {
  return (
    <LegalPage
      title="Complaints and concerns"
      metaTitle="Complaints and concerns | James Wallace"
      description="How to raise a complaint about the service, how to raise a safeguarding concern with the DSL or deputy DSL, and the urgent routes if a child is at risk."
      path="/complaints"
      updated="Last updated: 25 September 2026"
      intro="How to raise a complaint about the service, and how to raise a safeguarding concern."
    >
      <LegalSection heading="1. Service complaints">
        <p>
          If you are unhappy with any part of the service, please tell us. It is better for everyone if
          a concern is raised early, and we will take it seriously.
        </p>
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or write to the registered
          office: James Wallace Education Ltd, 71–75 Shelton Street, Covent Garden, London WC2H 9JQ.
          Please say what happened, when, and what you would like us to do.
        </p>
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li>We will <strong style={{ color: "var(--text-primary)" }}>acknowledge your complaint within 5 working days</strong>.</li>
          <li>We will give you a <strong style={{ color: "var(--text-primary)" }}>full response within 20 working days</strong>.</li>
        </ul>
        <p>
          If your provision is commissioned by a school or a local authority, you can also raise the
          matter with the commissioning authority directly.
        </p>
      </LegalSection>

      <LegalSection heading="2. Data-protection complaints">
        <p>
          Complaints about how we have handled your personal data are dealt with separately, with an
          acknowledgement within 30 days. How to make one, and the form to use, is set out in the{" "}
          <Link to="/privacy#complaints">privacy notice</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="3. Safeguarding concerns">
        <p>
          If you have a concern about a young person&apos;s safety or welfare, please raise it with us
          straight away. {SAFEGUARDING_ROLES.leads}
        </p>
        <p>
          Both can be reached through <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or{" "}
          <a href="tel:07897021077">{CONTACT_PHONE}</a>.
        </p>
        <p>
          <strong>In an emergency, or if a child is at immediate risk, call 999.</strong> You can also
          contact the child&apos;s local authority children&apos;s social care front door. If you are
          unsure who to call, the safeguarding lead above will help you work it out.
        </p>
        <p>
          Please do not send a child&apos;s name, diagnosis or safeguarding details through the website
          form. Ring or email instead, and we will agree a secure way to share anything further.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
