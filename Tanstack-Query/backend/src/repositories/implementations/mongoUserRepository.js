import { User } from "../../models/user.model.js";
import AppError from "../../utils/error.js";
import IUserRepository from "../contracts/IUserRepository.js";

class MongoUserRepository extends IUserRepository {
    async createUser(userData) {
        try {
            const user = new User(userData);
            const saveUser = await user.save();
            return saveUser
        } catch (error) {
            console.log("Error while create user", error);
            throw new AppError(`Failed to create user: ${error.message}`, 500, error)
        }
    };

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user
        } catch (error) {
            throw new AppError(`Falied to find user this email: ${error.message}`, 400, error)
        }
    };

    async saveRefreshToken(userId, token) {
        try {
            return await User.findByIdAndUpdate(userId, {
                refreshToken: token
            })
        } catch (error) {
            throw new AppError(`Falied to save refresh token: ${error.message}`, 400, error)
        }
    };

    async findUserById(id) {
        try {
            return await User.findById(id)
        } catch (error) {
            throw new AppError(`Falied to find user: ${error.message}`, 400, error)
        }
    };

    async removeRefreshToken(userId) {
        try {
            return await User.findByIdAndUpdate(userId, {
                $set: { refreshToken: null }
            })
        } catch (error) {
            throw new AppError(`Failed to remove refreshToken: ${error.message}`, 400, error)
        }
    };

    async saveResetPasswordToken(userId, token) {
        try {
            return await User.findByIdAndUpdate(userId, {
                $set: {
                    resetPasswordToken: token,
                    resetPasswordExpires: new Date(Date.now() + 5 * 60 * 1000)
                }
            })
        } catch (error) {
            throw new AppError(`Failed to update resetPasswordToken: ${error.message}`, 400, error)
        }
    };

    async findResetPasswordToken(userId, token) {
        try {
            return await User.findOne({
                _id: userId,
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            })
        } catch (error) {
            throw new AppError(`Failed to find user: ${error.message}`, 400, error)
        }
    };

    async updatePassword(userId, password) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new AppError("User not found", 404);
            }

            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.refreshToken = undefined;

            await user.save();
        } catch (error) {
            throw new AppError(`Failed to update password: ${error.message}`, 400);
        }
    }
};

export default MongoUserRepository