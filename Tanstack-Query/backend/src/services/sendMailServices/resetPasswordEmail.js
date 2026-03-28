import nodemailer from "nodemailer";
import config from "../../config/environment";

const { EMAIL_SERVER_USER, EMAIL_SERVER_PASS } = config;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASS
    }
});

export const sendResetPasswordEmail = async ({ email, name, resetLink }) => {
    try {
        await transport.sendMail({
            from: EMAIL_SERVER_USER,
            to: email,
            subject: "Reset your password",
            html: `
            <h2>Password Reset</h2>
            <p>Hello ${name || "User"},</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetLink}" 
               style="padding:10px 20px; background:#007bff; color:white; text-decoration:none;">
               Reset Password
            </a>
            <p>This link will expire in 2 minutes.</p>
          `
        })
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
}