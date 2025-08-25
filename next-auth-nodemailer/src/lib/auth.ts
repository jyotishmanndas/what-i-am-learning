import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string;
                const otp = credentials.otp as string;

                if(!email || !otp) return null;
            }
        })
    ]
})