import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { createAccessToken, createForgotPasswordToken, createRefreshToken } from "../utils/authService";
import { sendMail } from "../service/mail.service";
import crypto from "crypto"

export const userSignUp = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(404).json({ msg: "All fields are required" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username?.trim().toLowerCase(),
            email,
            password: hashedPassword
        })

        const accessToken = createAccessToken(user._id.toString());
        const refreshToken = createRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 20 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                msg: "User created successfully", accessToken,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
    } catch (error) {
        console.log("Error while signup", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const userSignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ msg: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ msg: "User does not exists with this email" })
        }

        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        if (!passwordCheck) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const accessToken = createAccessToken(existingUser._id.toString());
        const refreshToken = createRefreshToken(existingUser._id.toString());

        existingUser.refreshToken = refreshToken;
        await existingUser.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 20 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                msg: "User signin successfully", accessToken,
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email
                }
            })
    } catch (error) {
        console.log("Error while signin", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: "Email field is required" })
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "'User not found with tgis email" })
        };

        const resetToken = createForgotPasswordToken(user._id.toString());

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex")

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000)
        await user.save()

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`

        await sendMail({ email, link: resetLink })

    } catch (error) {
        console.log("Error while forgot password", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};