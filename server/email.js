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
        <p>I've received your message and will be in touch within 24 hours.</p>
        <p>If your enquiry is urgent, you can also get in touch directly:</p>
        <p><a href="${SITE_URL}/contact" style="color: #1a6640; font-weight: bold;">Get in touch</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 12px;">James Wallace Education — jameswallace.tech</p>
        <p style="color: #999; font-size: 12px;">${COMPANY_DISCLOSURE}</p>
      </div>
    `,
    TextBody: `Thanks ${name},\n\nI've received your message and will be in touch within 24 hours.\n\nIf urgent, get in touch: ${SITE_URL}/contact\n\nJames Wallace Education\n${COMPANY_DISCLOSURE}`,
  })
}

