import { Link } from "react-router-dom";
import { LegalPage, LegalSection } from "../components/Legal";

const CONTACT_EMAIL = "hello@jameswallace.tech";
const CONTACT_PHONE = "07897 021077";

export default function Accessibility() {
  return (
    <LegalPage
      title="Accessibility statement"
      metaTitle="Accessibility statement | James Wallace"
      description="How accessible jameswallace.tech is, the reading preferences available, known issues, and how to ask for information in another format."
      path="/accessibility"
      updated="Last updated: 25 September 2026"
      intro="We want this site to work for everyone, including people who use screen readers, keyboard navigation or enlarged text."
    >
      <LegalSection heading="1. Our target">
        <p>
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. This is the
          benchmark used under the Equality Act 2010, and we treat it as the standard this site should
          reach rather than a one-off exercise. If you meet a barrier here, we want to hear about it so
          we can fix it.
        </p>
      </LegalSection>

      <LegalSection heading="2. What we have done">
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li>Semantic headings and landmarks, so the page structure is announced and skippable.</li>
          <li>A &quot;skip to content&quot; link at the top of every page.</li>
          <li>Every interactive control, including the chat assistant, is reachable and operable by keyboard, with a visible focus outline.</li>
          <li>
            A <strong>reading-preferences widget</strong>, opened from the header, which lets you
            change text size, colour contrast, an alternative reading font, reduced motion and line
            spacing, and reset to the defaults. Your choices are saved in your browser.
          </li>
          <li>Animations are reduced or removed when your device asks for reduced motion.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Known issues">
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li>
            Some documents offered for download — training certificates and policy packs, which come
            from third-party providers — may not be tagged for use with screen readers. We will supply
            an accessible version on request.
          </li>
          <li>
            The reading-preferences &quot;alternative reading font&quot; uses fonts that may not be
            installed on every device; where they are missing, your browser falls back to a plain
            sans-serif. The other preferences are not affected.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Asking for information in another format">
        <p>
          If you need any part of this site, or one of our documents, in a different format — larger
          print, plain text, or an accessible PDF — email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call{" "}
          <a href="tel:07897021077">{CONTACT_PHONE}</a> and we will arrange it.
        </p>
      </LegalSection>

      <LegalSection heading="5. Feedback">
        <p>
          If something on this site is difficult or impossible to use, please tell us using the{" "}
          <Link to="/contact">contact form</Link> or the details above. We will look into it and, where
          we can, fix it. How to raise a service complaint is set out on the{" "}
          <Link to="/complaints">complaints page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
