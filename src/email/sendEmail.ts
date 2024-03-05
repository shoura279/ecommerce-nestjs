import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate';


export async function sendEmail(options: any) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.email,
            pass: process.env.email_password
        }
    });




    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.email, // sender address
        to: options['email'], // list of receivers
        subject: "verify", // Subject line
        text: "Hello world?", // plain text body
        html: emailTemplate(options['api']), // html body 
    });


    console.log("Message sent: %s", info.messageId);
}