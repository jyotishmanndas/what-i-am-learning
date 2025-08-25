import { prisma } from "@/lib/db";
import { setOtp } from "@/lib/optStote";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {

    const { email } = await req.json();

    if (!email) {
        return new NextResponse("Email is required", { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        return new NextResponse("Email already exists", { status: 404 })
    };

    // otp generate
    const code = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
    setOtp(email, code);

    await prisma.user.create({
        data: { email }
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
    })
}