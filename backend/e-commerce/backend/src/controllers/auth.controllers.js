import { redisClient } from "../config/redis.js";
import { createAccessToken, createRefreshToken } from "../lib/authService.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const payload = registerSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues });
        };

        const existingUser = await User.findOne({
            email: payload.data.email.toLowerCase()
        });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        };

        const hashedPassword = await bcrypt.hash(payload.data.password, 10);
        const newUser = await User.create({
            name: payload.data.name,
            email: payload.data.email.toLowerCase(),
            mobile: payload.data.mobile,
            password: hashedPassword
        });

        const cart = await Cart.create({
            userId: newUser._id
        });
        newUser.cart = cart._id;
        await newUser.save({ validateBeforeSave: false });

        const id = newUser._id;
        const accessToken = createAccessToken(id);
        const refreshToken = createRefreshToken(id);

        newUser.refreshToken = refreshToken;
        await newUser.save({ validateBeforeSave: false });

        return res.status(201)
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
                success: true, msg: "register successfully", token: accessToken, data: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    mobile: newUser.mobile,
                    cart: cart._id
                }
            })
    } catch (error) {
        console.log("Error while register", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const loginController = async (req, res) => {
    try {
        const payload = loginSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues });
        };

        const existingUser = await User.findOne({
            email: payload.data.email
        });
        if (!existingUser) {
            return res.status(400).json({ msg: "Invalid email or password" });
        };

        const passwordCheck = await bcrypt.compare(payload.data.password, existingUser.password);
        if (!passwordCheck) {
            return res.status(400).json({ msg: "Invalid email or password" });
        };

        const id = existingUser._id;
        const accessToken = createAccessToken(id);
        const refreshToken = createRefreshToken(id);

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
            .json({
                success: true, msg: "login successfully", token: accessToken, data: {
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    mobile: existingUser.mobile,
                    cart: existingUser.cart
                }
            })
    } catch (error) {
        console.log("Error while login", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const logout = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: null
            }
        }, { new: true });

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        };

        const token = req.cookies.accessToken;
        await redisClient.setEx(`blacklist:${token}`, 900, "1")

        return res.status(200)
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            })
            .json({ success: true, msg: "Logged out successfully" });
    } catch (error) {
        console.log("Error while logout", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const refreshToken = async (req, res) => {
    try {
        const incommingRefreshToken = req.cookies.refreshToken;
        if (!incommingRefreshToken) {
            return res.status(401).json({ msg: "Unauthorized request" })
        };

        const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ msg: "user not found" })
        };

        if (user.refreshToken !== incommingRefreshToken) {
            return res.status(401).json({ msg: "Refresh token is expired or used" })
        };

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

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
            .json({ success: true, msg: "Access token refreshed" })
    } catch (error) {
        console.log("Error while refresh token", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};