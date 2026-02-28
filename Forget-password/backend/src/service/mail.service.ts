import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASS
    }
});

export const sendMail = async ({ email, link }: { email: string, link: string }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_SERVER_USER,
            to: email,
            subject: "Reset your password",
            html: `
            <p>Click below to reset your password:</p>
            <a href="${link}">Reset Password</a>
            `
        })
    } catch (error) {
        console.error("Email error:", error);
    }
}