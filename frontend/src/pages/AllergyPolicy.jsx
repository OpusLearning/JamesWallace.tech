import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import PageHeader from "../components/PageHeader";
import { ALLERGY_POLICY_HTML } from "../data/allergyPolicy";

/**
 * The published Allergy and Anaphylaxis Safety Policy (James, 13 Oct 2026: "check if I have an allergy policy,
 * if not publish it"; a commissioner's specification asks for it to be published). The text is the approved
 * version 2.0, word for word; see src/data/allergyPolicy.js for how it is generated.
 */
export default function AllergyPolicy() {
  usePageMeta({
    title: "Allergy and Anaphylaxis Safety Policy | James Wallace Education",
    description: "The Allergy and Anaphylaxis Safety Policy of James Wallace Education Ltd, version 2.0, approved 27 September 2026.",
    path: "/allergy-policy",
  });
  return (
    <>
      <PageHeader
        noImage
        eyebrow="Policy"
        title="Allergy and Anaphylaxis Safety Policy"
        lede="James Wallace Education Ltd. Version 2.0, approved by James Wallace, Director, on 27 September 2026. Next review September 2027, or sooner after an incident or a change in guidance."
      />
      <section className="jw-section jw-section-white">
        <div className="jw-container" style={{ maxWidth: "50rem" }}>
          <p className="jw-body" style={{ borderLeft: "3px solid var(--brand)", paddingLeft: "1rem" }}>
            <strong>Update, 13 October 2026.</strong> Where the policy below says Emergency First Aid at Work is booked,
            that course was completed on 12 October 2026 and the certificate is held. The text below is version 2.0 as
            approved; the next version will carry this change.
          </p>
          <div className="jw-policy-text" dangerouslySetInnerHTML={{ __html: ALLERGY_POLICY_HTML }} />
          <p className="jw-body" style={{ marginTop: "2.5rem" }}>
            The other policies in the set, and the forms and registers this policy refers to by number, are shared with
            commissioners on request. <Link to="/compliance">Compliance and safeguarding</Link> ·{" "}
            <Link to="/contact?for=commissioner">Request the policy set</Link>
          </p>
        </div>
      </section>
    </>
  );
}
