import { emailQueue } from "../queues/email.queue.js";
import MongoUserRepository from "../repositories/implementations/mongoUserRepository.js";
import { createAccessToken, createRefreshToken, createResetPasswordToken } from "../utils/authService.js";
import AppError from "../utils/error.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/environment.js";

const { BASE_URL, FRONTEND_URL, RESET_PASSWORD_TOKEN_SECRET } = config


class AuthService {
    constructor() {
        this.userRepository = new MongoUserRepository()
    };

    getSafeUserPayload(user) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    };

    async register(userData) {
        const { email } = userData;

        const existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new AppError(`Email is already registered`, 400)
        };

        const user = await this.userRepository.createUser(userData);

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        await this.userRepository.saveRefreshToken(user._id, refreshToken);

        const safeUser = this.getSafeUserPayload(user)
        return { accessToken, refreshToken, user: safeUser }
    };

    async login({ email, password }) {
        const existingUser = await this.userRepository.findUserByEmail(email);
        if (!existingUser) {
            throw new AppError(`user doesn't exists with this email`, 400)
        };

        const isPasswordMatch = await existingUser.comparePassword(password);
        if (!isPasswordMatch) {
            throw new AppError(`Invalid credentials`, 400)
        };

        const accessToken = createAccessToken(existingUser._id);
        const refreshToken = createRefreshToken(existingUser._id);

        await this.userRepository.saveRefreshToken(existingUser._id, refreshToken);

        const safeUser = this.getSafeUserPayload(existingUser)
        return { accessToken, refreshToken, user: safeUser }
    };

    async getUserById(userId) {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        };
        return user
    };

    async logOut(userId) {
        const user = await this.userRepository.removeRefreshToken(userId);
        if (!user) {
            throw new AppError("Logout failed", 400);
        }
    };

    async forgotPassword(email) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) return;

        const resetToken = createResetPasswordToken(user._id);

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        await this.userRepository.saveResetPasswordToken(user._id, hashedToken);

        const resetLink = `${BASE_URL}/api/v1/auth/verify/${resetToken}?callbackUrl=${FRONTEND_URL}/reset-password`;
        try {
            await emailQueue.add("resetPassword", {
                id: user._id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                resetLink
            })
        } catch (error) {
            throw new AppError("Failed to send reset email", 500);
        }
    };

    async verifyResetPasswordToken(token) {
        const decoded = jwt.verify(token, RESET_PASSWORD_TOKEN_SECRET);
        if (!decoded || !decoded.userId) {
            throw new AppError("Invalid or expired token", 401)
        };

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await this.userRepository.findResetPasswordToken(decoded.userId, hashedToken);
        if (!user) {
            throw new AppError("Invalid or expired token", 401)
        };

        return true;
    };

    async updatePassword(token, password) {
        const decoded = jwt.verify(token, RESET_PASSWORD_TOKEN_SECRET);
        if (!decoded || !decoded.userId) {
            throw new AppError("Invalid or expired token", 401)
        };

        const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const user = await this.userRepository.findResetPasswordToken(decoded.userId, hashedToken);
        if (!user) {
            throw new AppError("Invalid or expired token", 401)
        };

        await this.userRepository.updatePassword(decoded.userId, password);

        return true
    }
};


export default AuthService