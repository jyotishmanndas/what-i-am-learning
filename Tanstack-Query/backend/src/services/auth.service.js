import MongoUserRepository from "../repositories/implementations/mongoUserRepository.js";
import { createAccessToken, createRefreshToken } from "../utils/authService.js";
import AppError from "../utils/error.js";

class AuthService {
    constructor() {
        this.userRepository = new MongoUserRepository()
    };

    async register(userData) {
        const {email} = userData;

        const existingUser = await this.userRepository.findUserByEmail(email);
        if(existingUser){
            throw new AppError(`User already registered with this email`, 400)
        };

        const user = await this.userRepository.createUser(userData);
        
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        await this.userRepository.saveRefreshToken(user._id, refreshToken);
        return {accessToken, refreshToken, user}
    }
};


export default AuthService