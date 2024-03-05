import nodemailer from 'nodemailer';

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.email,
      pass: process.env.email_password,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.email, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
}
