// Resend replaced Postmark on 25 Sep 2026: Postmark declined the account and paused sending.
// jameswallace.tech is already a verified sending domain in Resend (the portal sends from it).
async function sendEmail({ From, To, ReplyTo, Subject, HtmlBody, TextBody }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY || ''}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: From, to: [To], reply_to: ReplyTo, subject: Subject, html: HtmlBody, text: TextBody }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return res.json()
}

// Form input goes into the HTML body, so escape it.
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const FROM_EMAIL = 'hello@jameswallace.tech'
const SITE_URL = process.env.SITE_URL || 'https://jameswallace.tech'

// Companies Act 2006 / E-Commerce Regs 2002 reg 6: the trading disclosure belongs on email templates
// as well as the site footer. Source: sources/legal/README.md item 1.
const COMPANY_DISCLOSURE = 'James Wallace Education Ltd. Registered in England and Wales, company number 17479328. Registered office: 71–75 Shelton Street, Covent Garden, London WC2H 9JQ.'

// Shown under the acknowledgement email (James, 7 Oct 2026: "add this to the website and emails"). These repeat
// REGISTRATIONS, PRICES and CARE_LEAVERS in frontend/src/data/facts.js by hand: change both together. A badge is
// listed here only once it is held; first aid joins when the certificate arrives.
const BADGES = [
  ['ico-registered.png', 'ICO registered', 34],
  ['nasen.png', 'nasen member', 28],
  ['disability-confident-committed.png', 'Disability Confident Committed', 34],
  ['google-cybersecurity.png', 'Google Cybersecurity Certificate', 34],
]
const BADGES_HTML = BADGES.map(([file, alt, h]) =>
  `<img src="${SITE_URL}/badges/${file}" alt="${alt}" height="${h}" style="height:${h}px;width:auto;margin:0 12px 6px 0;vertical-align:middle;border:0;" />`).join('')
const REGISTRATIONS_TEXT = 'ICO registered (ZC257612) · nasen member · Disability Confident Committed · Google Cybersecurity Certificate'
const PRICES_TEXT = 'Prices: families £45 an hour, or £50 an hour for EHCP-aligned work. Commissioned provision £67.50 an hour in person, £55 an hour online, travel included; half-day and day prices are at jameswallace.tech/for-las#prices.'
const CARE_LEAVERS_TEXT = 'Each year we offer ten free online tuition sessions to one care leaver aged 16 to 25 working towards GCSE or Functional Skills. Ask us for details.'

export async function sendContactNotification(name, email, message) {
  await sendEmail({
    From: `James Wallace Education <${FROM_EMAIL}>`,
    To: FROM_EMAIL,
    ReplyTo: email,
    Subject: `New enquiry from ${String(name).slice(0, 100)}`,
    HtmlBody: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h2 style="color: #1a6640;">New contact form submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
          <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${esc(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${esc(email)}" style="color: #1a6640;">${esc(email)}</a></td></tr>
        </table>
        <div style="background: #f9f9f7; border-left: 3px solid #1a6640; padding: 16px; border-radius: 4px; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${esc(message)}</div>
        <p style="color: #999; font-size: 12px; margin-top: 2rem;">Sent via jameswallace.tech contact form</p>
        <p style="color: #999; font-size: 12px;">${COMPANY_DISCLOSURE}</p>
      </div>
    `,
    TextBody: `New enquiry from ${name} (${email})\n\n${message}\n\n---\n${COMPANY_DISCLOSURE}`,
  })
}

export async function sendContactAcknowledgement(name, email) {
  await sendEmail({
    From: `James Wallace Education <${FROM_EMAIL}>`,
    To: email,
    Subject: `Thanks for getting in touch — James Wallace`,
    HtmlBody: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h1 style="color: #1a6640;">Thanks, ${esc(name)}</h1>
        <p>I've received your message and will reply within 2 working days.</p>
        <p>If your enquiry is urgent, you can also get in touch directly:</p>
        <p><a href="${SITE_URL}/contact" style="color: #1a6640; font-weight: bold;">Get in touch</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #555; font-size: 13px;">${PRICES_TEXT} <a href="${SITE_URL}/tuition" style="color: #1a6640;">Full details</a></p>
        <p style="color: #555; font-size: 13px;">${CARE_LEAVERS_TEXT}</p>
        <p style="margin: 20px 0 6px;">${BADGES_HTML}</p>
        <p style="color: #999; font-size: 12px;">${REGISTRATIONS_TEXT}</p>
        <p style="color: #999; font-size: 12px;">James Wallace Education — jameswallace.tech</p>
        <p style="color: #999; font-size: 12px;">${COMPANY_DISCLOSURE}</p>
      </div>
    `,
    TextBody: `Thanks ${name},\n\nI've received your message and will reply within 2 working days.\n\nIf urgent, get in touch: ${SITE_URL}/contact\n\n${PRICES_TEXT}\n${CARE_LEAVERS_TEXT}\n\nJames Wallace Education\n${REGISTRATIONS_TEXT}\n${COMPANY_DISCLOSURE}`,
  })
}

