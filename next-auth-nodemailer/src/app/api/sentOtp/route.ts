import { prisma } from "@/lib/db";
import { setOtp } from "@/lib/optStote";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ msg: "Email is required" }, { status: 400 })
        };

        // otp generate
        const code = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        console.log(code);

        setOtp(email, code);

        await prisma.user.upsert({
            where: { email },
            update: {},
            create: { email },
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "YOur OTP code",
            text: `Your login OTP is ${code}`
        });

        return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}