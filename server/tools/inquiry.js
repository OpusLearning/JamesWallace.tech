// server/tools/inquiry.js
/**
 * A tool definition and handler for generating a pre‑filled
 * Google Form link for contact inquiries.
 */

export const inquiryTool = {
  name: "submit_inquiry",
  description: "Generate a pre‑filled Google Form link for a contact inquiry",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: "Full name" },
      email: { type: "string", description: "Email address" },
      message: { type: "string", description: "Inquiry message" },
    },
    required: ["name", "email", "message"],
  },
};

/**
 * Build and return the pre‑filled URL.
 * Replace entry.* keys with your actual Form field IDs.
 */
export function handleInquiryCall({ name, email, message }) {
  const BASE =
    "https://docs.google.com/forms/d/e/1FAIpQLScAFWKTVZkNzBcfDWQA1DKUp6ahtjJJxMC51to7HdDuJP9_qQ/viewform?usp=pp_url";
  const params = new URLSearchParams({
    "entry.1111111111": name, // ← your “Name” field ID
    "entry.2222222222": email, // ← your “Email” field ID
    "entry.3333333333": message, // ← your “Message” field ID
  });
  return { url: `${BASE}&${params.toString()}` };
}
