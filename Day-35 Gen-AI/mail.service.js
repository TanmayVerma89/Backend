import nodemailer from 'nodemailer'
import { config } from 'dotenv'
config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        clientId: process.env.CLIENT_ID
    }
})

transporter.verify()
    .then(() => {
        console.log("Email transporter is ready to send emails")
    })
    .catch((err) => {
        console.error("Email transporter verification failed: ", err)
    })

export async function sendEmail({ to, subject, html, text }) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log(details)
    return "Email send successfully to " + to;
}