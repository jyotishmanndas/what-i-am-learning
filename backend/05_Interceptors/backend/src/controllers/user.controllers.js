import { createAccessToken, createRefreshToken } from "../lib/authService.js";
import { signInSchema, signUpSchema } from "../lib/zod.js"
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
    const payload = signUpSchema.safeParse(req.body);
    if (!payload.success) {
        return res.status(400).json({ msg: "Invalid inputs", error: payload.error.message });
    }

    try {
        const existingUser = await User.findOne({
            email: payload.data.email
        });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(payload.data.password, 12);

        const user = await User.create({
            username: payload.data.username?.trim().toLowerCase(),
            email: payload.data.email,
            password: hashedPassword
        })

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

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
            .json({ msg: "User created successfully", accessToken, refreshToken })

    } catch (error) {
        console.log("Error while signup", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const userSignIn = async (req, res) => {
    const payload = signInSchema.safeParse(req.body);
    if (!payload.success) {
        return res.status(400).json({ msg: "Invalid inputs", error: payload.error.message })
    }

    try {
        const existingUser = await User.findOne({
            email: payload.data.email
        })
        if (!existingUser) {
            return res.status(400).json({ msg: "User does not exists with this email" })
        }

        const passwordCheck = await bcrypt.compare(payload.data.password, existingUser.password);
        if (!passwordCheck) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const accessToken = createAccessToken(existingUser._id);
        const refreshToken = createRefreshToken(existingUser._id);

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
            .json({ msg: "User signin successfully", accessToken, refreshToken })

    } catch (error) {
        console.log("Error while signin", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const logout = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: null
            }
        }, {
            new: true
        });

        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        return res.status(200)
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: true
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: true
            })
            .json({ msg: "user logged out successfully" })
    } catch (error) {
        console.log("Error while logout", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(400).json({ msg: "Unauthorized request" })
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if (!decodedToken.userId) {
            return res.status(400).json({ msg: "Invalid token" });
        }

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        if (user.refreshToken !== token) {
            return res.status(400).json({ msg: "Refresh token is expired or used" });
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

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
            .json({ msg: "Access token refreshed", accessToken, refreshToken })
    } catch (error) {
        console.log("Error while refresh token", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}