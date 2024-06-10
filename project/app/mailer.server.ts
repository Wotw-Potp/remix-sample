import nodemailer from 'nodemailer'

export class Mailer {
  private transporter: nodemailer.Transporter
  private sender: string = process.env.MAIL_FROM ?? 'no-reply@localhost'

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number.parseInt(process.env.MAIL_PORT ?? '587'),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  sendMail(options: nodemailer.SendMailOptions) {
    try {
      this.transporter.sendMail({ ...options, from: this.sender })
    } catch (error) {
      console.error(error)
    }
  }
}
