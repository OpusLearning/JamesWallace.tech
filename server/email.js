import * as postmark from 'postmark'

let _client = null

function getClient() {
  if (!_client) {
    _client = new postmark.ServerClient(process.env.POSTMARK_API_KEY || '')
  }
  return _client
}

const FROM_EMAIL = 'hello@jameswallace.tech'
const SITE_URL = process.env.SITE_URL || 'https://jameswallace.tech'

export async function sendContactNotification(name, email, message) {
  await getClient().sendEmail({
    From: FROM_EMAIL,
    To: FROM_EMAIL,
    ReplyTo: email,
    Subject: `New enquiry from ${name}`,
    HtmlBody: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h2 style="color: #1a6640;">New contact form submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
          <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a6640;">${email}</a></td></tr>
        </table>
        <div style="background: #f9f9f7; border-left: 3px solid #1a6640; padding: 16px; border-radius: 4px; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</div>
        <p style="color: #999; font-size: 12px; margin-top: 2rem;">Sent via jameswallace.tech contact form</p>
      </div>
    `,
    TextBody: `New enquiry from ${name} (${email})\n\n${message}`,
  })
}

export async function sendContactAcknowledgement(name, email) {
  await getClient().sendEmail({
    From: FROM_EMAIL,
    To: email,
    Subject: `Thanks for getting in touch — James Wallace`,
    HtmlBody: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h1 style="color: #1a6640;">Thanks, ${name}</h1>
        <p>I've received your message and will be in touch within 24 hours.</p>
        <p>If your enquiry is urgent, you can also book a free 20-minute call directly:</p>
        <p><a href="${SITE_URL}/calendly" style="color: #1a6640; font-weight: bold;">Book a free call</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 12px;">James Wallace Tutoring — jameswallace.tech</p>
      </div>
    `,
    TextBody: `Thanks ${name},\n\nI've received your message and will be in touch within 24 hours.\n\nIf urgent, book a free call: ${SITE_URL}/calendly\n\nJames Wallace Tutoring`,
  })
}

export async function sendPurchaseConfirmation(email, name, tier, tierName) {
  await getClient().sendEmail({
    From: FROM_EMAIL,
    To: email,
    Subject: 'Your tutoring session is confirmed — James Wallace',
    HtmlBody: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h1 style="color: #16213e;">Booked — thank you, ${name}</h1>
        <p>Your <strong>${tierName}</strong> purchase is confirmed.</p>
        <p>James will be in touch within 24 hours to schedule your session and send over any prep materials.</p>
        <p>In the meantime, if you have any questions or want to share anything useful ahead of the session, just reply to this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #666; font-size: 14px;">
          You can also book a free discovery call at any time:<br/>
          <a href="${SITE_URL}/calendly" style="color: #5c6bc0;">${SITE_URL}/calendly</a>
        </p>
        <p style="color: #999; font-size: 12px;">James Wallace Tutoring — jameswallace.tech</p>
      </div>
    `,
  })
}
