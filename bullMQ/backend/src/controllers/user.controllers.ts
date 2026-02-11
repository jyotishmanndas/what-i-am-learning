import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { createAccessToken, createRefreshToken } from "../utils/authService";
import { emailQueue } from "../queues/email.queue";

export const signupController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        };

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already registered with this email" })
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            name,
            password: hashedPassword
        });

        await emailQueue.add("welcomeEmail", {
            id: user.id,
            email: user.email,
            name: user.name
        });

        const accessToken = createAccessToken(user._id.toString());
        const refreshToken = createRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res.status(201)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            })
            .json({
                success: true, msg: "signup successfull", data: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
    } catch (error) {
        console.log(`Error while sihnup`, error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        };

        const existingUser = await User.findOne({
            email: email
        });

        if (!existingUser) {
            return res.status(400).json({ msg: "User not found with email" })
        };

        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        if (!passwordCheck) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const accessToken = createAccessToken(existingUser._id.toString());
        const refreshToken = createRefreshToken(existingUser._id.toString());

        existingUser.refreshToken = refreshToken;
        await existingUser.save({ validateBeforeSave: false });

        return res.status(201)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            })
            .json({
                success: true, msg: "login successfull", data: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
            })
    } catch (error) {
        console.log(`Error while login`, error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}