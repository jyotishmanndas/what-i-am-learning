import { Request, Response } from "express";
import { signInSchema, signUpSchema } from "../utils/zod";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/authService";
import jwt from "jsonwebtoken";

export const signupController = async (req: Request, res: Response) => {
    try {
        const payload = signUpSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues })
        }

        const existingUser = await User.findOne({
            userName: payload.data.userName
        });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this username" });
        };

        const hashedPassword = await bcrypt.hash(payload.data.password, 12);
        const newUser = await User.create({
            userName: payload.data.userName,
            name: payload.data.name,
            password: hashedPassword
        });

        const accessToken = createAccessToken(newUser._id.toString());
        const refreshToken = createRefreshToken(newUser._id.toString());

        newUser.refreshToken = refreshToken;
        await newUser.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 6 * 24 * 60 * 60 * 1000
            })
            .json({
                success: true, msg: "User created successfully", accessToken, data: {
                    name: newUser.name,
                    userName: newUser.userName,
                    createdAt: newUser.createdAt
                }
            })

    } catch (error) {
        console.log("Error while signup", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const signInController = async (req: Request, res: Response) => {
    try {
        const payload = signInSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues })
        };

        const existingUser = await User.findOne({
            userName: payload.data.userName
        });

        if (!existingUser) {
            return res.status(400).json({ msg: "User doesn't exists with this username" });
        };

        const isPasswordMatch = await bcrypt.compare(payload.data.password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid credentials" })
        };

        const accessToken = createAccessToken(existingUser._id.toString());
        const refreshToken = createRefreshToken(existingUser._id.toString());

        existingUser.refreshToken = refreshToken;
        await existingUser.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 6 * 24 * 60 * 60 * 1000
            })
            .json({ msg: "Login successfully", accessToken })

    } catch (error) {
        console.log("Error while login", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const logoutController = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.user?._id, {
            $set: {
                refreshToken: null
            }
        }, {
            new: true
        });

        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        };

        return res.status(200)
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: true
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: true
            })
            .json({ msg: "Logout successfully" })
    } catch (error) {
        console.log("Error while logout", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const IncomingRefreshToken = req.cookies.refreshToken;
        if (!IncomingRefreshToken) {
            return res.status(400).json({ msg: "Unauthorized request" })
        };

        const decoded = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ msg: "Invalid refresh token" });
        };

        if (user.refreshToken !== IncomingRefreshToken) {
            return res.status(400).json({ msg: "Invalid refresh token" });
        };

        const accessToken = createAccessToken(user._id.toString());
        const refreshToken = createRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToke", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 6 * 24 * 60 * 60 * 1000
            })
            .json({ msg: "Access token refreshed successfully", accessToken })
    } catch (error) {

    }
}