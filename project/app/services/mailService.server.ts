import { Mailer } from '~/mailer.server'

const mailer = new Mailer()

export function sendTestMail(to: string) {
  mailer.sendMail({
    to,
    subject: 'Test Mail',
    html: '<h1>Test Mail</h1>',
  })
}

export function sendEmailVerificationMail(
  to: string,
  name: string,
  token: string
) {
  // @todo Use env variables for the frontend URL
  mailer.sendMail({
    to,
    subject: 'Email Verification',
    html: `
      <h1>Email Verification</h1>
      <p>Hi ${name},</p>
      <p>Click the link below to verify your email address</p>
      <a href="http://localhost:3000/auth/verify-email/${token}">Verify Email</a>
    `,
  })
}
