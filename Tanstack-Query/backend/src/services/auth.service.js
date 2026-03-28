import MongoUserRepository from "../repositories/implementations/mongoUserRepository.js";
import { createAccessToken, createRefreshToken } from "../utils/authService.js";
import AppError from "../utils/error.js";

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
    }

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
    }
};


export default AuthService