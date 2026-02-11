import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASS
    }
});

export const sendWelcomeEmail = async ({ email, name }: { email: string, name: string }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_SERVER_USER,
            to: email,
            subject: "Welcome to our platform",
            html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;font-family:Arial, sans-serif;">
              
              <tr>
                <td align="center">
                  <h1 style="margin:0;color:#111;">Welcome, ${name}! 🎉</h1>
                </td>
              </tr>

              <tr>
                <td style="padding:20px 0;color:#444;font-size:16px;line-height:1.6;">
                  Thanks for joining us! We're excited to have you onboard.
                  <br/><br/>
                  You can now explore features, connect with others, and start your journey with us.
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:20px 0;">
                  <a href="${process.env.CLIENT_URL || "#"
                }" 
                     style="background:#4f46e5;color:#ffffff;padding:12px 24px;
                            border-radius:6px;text-decoration:none;font-size:16px;">
                    Get Started
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding-top:30px;font-size:14px;color:#888;text-align:center;">
                  If you did not sign up, you can safely ignore this email.
                </td>
              </tr>

              <tr>
                <td style="padding-top:20px;font-size:12px;color:#aaa;text-align:center;">
                  © ${new Date().getFullYear()} Your Company. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    `,
        })
    } catch (error) {
        console.error("Email error:", error);
    }
}