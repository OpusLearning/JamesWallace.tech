import { Link } from "react-router-dom";
import { LegalPage, LegalSection, LegalTable } from "../components/Legal";

export default function Cookies() {
  return (
    <LegalPage
      title="Cookies and storage"
      metaTitle="Cookies and storage | James Wallace"
      description="The cookies and browser storage used by jameswallace.tech, why each one is exempt, and how to clear it. There is no banner because nothing non-essential is used."
      path="/cookies"
      updated="Last updated: 25 September 2026"
      intro="What this site stores in your browser, and why you will not see a cookie banner here."
    >
      <LegalSection heading="1. No banner, because nothing non-essential is used">
        <p>
          This site sets no cookies of its own for advertising, analytics or tracking, so there is no
          cookie banner. Everything listed below is either strictly necessary to make the site work or
          is a function you have asked for, and none of it is used to follow you around the web.
        </p>
      </LegalSection>

      <LegalSection heading="2. What is stored, and why it is exempt">
        <LegalTable
          caption="Cookies and browser storage used by this website"
          columns={["Name", "Where it lives", "What it is for", "Why it is exempt"]}
          rows={[
            [
              "jw-a11y",
              "localStorage in your browser",
              "Remembers your reading preferences — text size, colour contrast, reading font, reduced motion and spacing.",
              "Strictly necessary to provide a feature you chose to use. It is set only when you open the reading-preferences widget, and it is never sent to us.",
            ],
            [
              "jw-helper-v1",
              "sessionStorage in your browser",
              "Keeps the chat conversation for the tab you are using, so moving between pages does not wipe it.",
              "A visitor-requested function. It is cleared when you close the tab, and it is never sent to us.",
            ],
            [
              "__cf_bm",
              "Cookie set by Cloudflare",
              "Helps tell people apart from automated traffic when Cloudflare challenges a request.",
              "Strictly necessary for security. It is set by Cloudflare, not by this site, and only when a challenge is triggered.",
            ],
            [
              "Portal login session",
              "Cookie on portal.jameswallace.tech",
              "Keeps you signed in to the portal.",
              "Strictly necessary for the login to work. The portal is a separate site with its own privacy notice.",
            ],
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. What this site does not do">
        <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
          <li>No advertising or analytics cookies.</li>
          <li>No third-party trackers, pixels or social plug-ins.</li>
          <li>No third-party fonts — the fonts used here are served from this site, so your browser does not call out to a font provider.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. How to clear or block them">
        <p>
          You can clear cookies and site data at any time in your browser&apos;s settings — look for
          &quot;cookies and site data&quot; or &quot;clear browsing data&quot;. The chat entry in
          sessionStorage clears on its own when you close the tab.
        </p>
        <p>
          If you block storage altogether, the site still works, but your reading preferences and the
          chat history will not be remembered between visits. For more on how we handle personal data,
          see the <Link to="/privacy">privacy notice</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
