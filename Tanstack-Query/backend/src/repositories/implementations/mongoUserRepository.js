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
    }
};

export default MongoUserRepository