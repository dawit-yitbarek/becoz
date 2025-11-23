import nodemailer from "nodemailer";
import generateEmail from './emailTemplate.js';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_SMTP_KEY
    },
});

export const sendEmail = async (req, res) => {
    const { name, email, phone, message } = req.body;
    const html = generateEmail({ name, email, phone, message });

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.BROKER_EMAIL,
            replyTo: email,
            subject: 'New Contact Message',
            text: `Phone: ${phone}\n\nMessage:\n${message}`,
            html: html,
        });

        res.status(200).json({ success: true, message: 'Message sent successfully.' });
        console.log('Contact form submitted successfully on /sendMessage endpoint');
    } catch (error) {
        console.error('Contact form error:', error.message);
        res.status(500).json({ error: 'Something went wrong. Try again later.' });
    }
};