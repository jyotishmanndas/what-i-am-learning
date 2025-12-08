import { createAccessToken, createRefreshToken } from "../lib/authService.js";
import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { signinSchema, signupSchema } from "../lib/zod.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
    const response = signupSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            msg: "Invalid inputs",
            error: response.error.message
        })
    }

    try {
        const existingUser = await User.findOne({
            email: response.data.email
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exits with this email" })
        }

        console.log("Request files", req.files);

        const avatarLocalPath = req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            return res.status(400).json({ msg: "Avatar field is required" })
        }

        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if (!coverImageLocalPath) {
            return res.status(400).json({ msg: "Cover Image is required" })
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        const passwordhashed = await bcrypt.hash(response.data.password, 12);

        const user = await User.create({
            fullName: response.data.fullName,
            username: response.data.username.toLowerCase(),
            email: response.data.email,
            password: passwordhashed,
            avatar,
            coverImage
        });

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 25 * 60 * 1000  // 25 mins
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
            })
            .json({ msg: "User signup successfully", accessToken, refreshToken })

    } catch (error) {
        console.log("Internal error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}


export const userSignIn = async (req, res) => {
    const response = signinSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            msg: "Invalid Inputs",
            error: response.error.message
        });
    }

    try {
        const existingUser = await User.findOne({
            email: response.data.email
        })

        if (!existingUser) {
            return res.status(400).json({ msg: "User doesn't exits with this email" })
        }

        const passwordCheck = await bcrypt.compare(response.data.password, existingUser.password);

        if (!passwordCheck) {
            return res.status(401).json({ msg: "Invalid credentials" })
        }

        const accessToken = createAccessToken(existingUser._id);
        const refreshToken = createRefreshToken(existingUser._id);

        existingUser.refreshToken = refreshToken;
        await existingUser.save({ validateBeforeSave: false })

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 25 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({ msg: "Login successful", accessToken, refreshToken })

    } catch (error) {
        console.log("Internal error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}


export const logOut = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    refreshToken: null
                }
            }, {
            new: true
        }
        )

        if (!user) {
            return res.status(401).json({
                msg: "User not found"
            })
        }

        return res.status(200)
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            })
            .json({ msg: "Logged out successful" })
    } catch (error) {
        console.log("Logout error:", error);
        return res.status(500).json({
            msg: "Something went wrong",
            error
        })
    }
}


export const refreshToken = async (req, res) => {
    try {
        const IncomingRefreshToken = req.cookies.refreshToken;

        if (!IncomingRefreshToken) {
            return res.status(401).json({ msg: "Unauthorized request" })
        }

        const decodedToken = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN);

        const user = await User.findById(decodedToken?.userId);

        if (!user) {
            return res.status(401).json({ msg: "Invalid refresh token" })
        }

        if (IncomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({ msg: "Refresh token is expired or used" })
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 25 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({ msg: "Access token refreshed", accessToken, refreshToken })
    } catch (error) {
        return res.status(500).json({ msg: "Invalid refresh token", error })
    }
}