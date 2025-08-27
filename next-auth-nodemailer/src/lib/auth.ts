
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getOtp, deleteOtp } from "@/lib/optStote";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" },
            },
            authorize: async (credentials) => {
                const email = credentials?.email as string;
                const otp = credentials?.otp as string;

                if (!email || !otp) return null;

                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (!user) return null;

                const storedOtp = getOtp(user.email);
                if (!storedOtp) return null;

                if (otp === storedOtp) {
                    deleteOtp(user.email);
                    return { id: user.id, email: user.email };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.AUTH_SECRET
})