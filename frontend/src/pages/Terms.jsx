import { LegalPage, LegalSection } from "../components/Legal";

export default function Terms() {
  return (
    <LegalPage
      title="Website terms of use"
      metaTitle="Website terms of use | James Wallace"
      description="Short terms for using jameswallace.tech: the information is general and not advice, how we handle links and liability, and the law that applies."
      path="/terms"
      updated="Last updated: 25 September 2026"
      intro="These are the terms for using this website. They are not terms of business."
    >
      <LegalSection heading="1. Who we are">
        <p>
          This website is operated by James Wallace Education Ltd, registered in England and Wales,
          company number 17479328. Our registered office is 71–75 Shelton Street, Covent Garden, London
          WC2H 9JQ, which is for correspondence only.
        </p>
      </LegalSection>

      <LegalSection heading="2. General information, not advice">
        <p>
          The information on this site is general information about our teaching and provision. It is
          not medical, clinical, legal, or financial advice, and it is not a diagnosis or an assessment
          of any young person&apos;s needs. You should not rely on it as any of those things. If you
          need advice of that kind, please speak to a suitably qualified professional.
        </p>
        <p>
          Provision commissioned by a school or local authority is delivered under a separate agreement
          with the commissioning body. These website terms do not form part of that agreement.
        </p>
      </LegalSection>

      <LegalSection heading="3. Accuracy and changes">
        <p>
          We keep this site as accurate and current as we can, but we do not promise that everything on
          it is complete, up to date, or free from error. We may change, move or remove any part of the
          site at any time.
        </p>
      </LegalSection>

      <LegalSection heading="4. Links to other sites">
        <p>
          This site links to other websites, including our journal and the portal, that we do not
          control. We are not responsible for their content or for how they handle your data. Their own
          terms and privacy notices apply when you visit them.
        </p>
      </LegalSection>

      <LegalSection heading="5. Liability">
        <p>
          To the extent the law allows, we are not liable for any indirect or consequential loss
          arising from your use of this website or from relying on its content. Nothing in these terms
          limits any liability that cannot be limited by law, including liability for death or personal
          injury caused by negligence, or for fraud.
        </p>
      </LegalSection>

      <LegalSection heading="6. The law that applies">
        <p>
          These terms are governed by the law of England and Wales, and any dispute about them is
          subject to the courts of England and Wales.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
