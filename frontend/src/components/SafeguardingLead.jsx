import PropTypes from "prop-types";
import { SAFEGUARDING_CONTACT, SAFEGUARDING_ROLES } from "../data/facts";

/**
 * The one line naming the designated safeguarding lead and the safeguarding mailbox. James,
 * 9 Oct 2026 (QUEUE SITEFIX-3 item 4). It is shown wherever a parent or commissioner would look —
 * /contact, /for-las, /compliance and the safeguarding section of /provision — and built from
 * facts.js so the name and the mailbox cannot drift. Asmaa Ahmed has consented to her name and
 * role (facts.js); this adds only the mailbox, and no new safeguarding procedure.
 */
export default function SafeguardingLead({ className }) {
  return (
    <p className={className}>
      Designated safeguarding lead: {SAFEGUARDING_ROLES.dsl.name}. Safeguarding concerns:{" "}
      <a href={`mailto:${SAFEGUARDING_CONTACT.email}`}>{SAFEGUARDING_CONTACT.email}</a>. If a child is in
      immediate danger, call 999.
    </p>
  );
}

SafeguardingLead.propTypes = { className: PropTypes.string };
