import Brevo from "@getbrevo/brevo";
import generateEmail from "./emailTemplate.js";
import dotenv from "dotenv";
dotenv.config();

// Initialize Brevo API
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

export const sendEmail = async (req, res) => {
    const { name, email, phone, message } = req.body;
    const html = generateEmail({ name, email, phone, message });

    try {
        await apiInstance.sendTransacEmail({
            sender: {
                name: name,
                email: process.env.EMAIL_USER,
            },
            to: [
                { email: process.env.BROKER_EMAIL }
            ],
            replyTo: { email },
            subject: "New Contact Message",
            htmlContent: html,
            textContent: `Phone: ${phone}\n\nMessage:\n${message}`
        });

        console.log("Contact form submitted successfully on /sendMessage endpoint");
        res.status(200).json({
            success: true,
            message: "Message sent successfully."
        });

    } catch (error) {
        console.error("Brevo API Error:", error.message);
        res.status(500).json({
            error: "Something went wrong. Try again later."
        });
    }
};