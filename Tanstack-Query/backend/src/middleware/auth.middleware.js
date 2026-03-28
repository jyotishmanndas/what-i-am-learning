import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";
import config from "../config/environment.js";
import AuthService from "../services/auth.service.js";

const { ACCESS_TOKEN_SECRET } = config;

const authService = new AuthService();

export const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken;
        const authHeader = req.headers.authorization;

        if (!token && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]
        };

        if (!token) {
            throw new AppError(`Unauthorized request`, 401);
        };

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        if (!decoded || !decoded.userId) {
            throw new AppError(`Invalid or expired token`, 401)
        };

        const user = await authService.getUserById(decoded.userId);
        if (!user) {
            throw new AppError(`User not found`, 404)
        };

        req.user = user;
        next();
    } catch (error) {
        next(new AppError(error.message || "Invalid or expired token.", 401));
    }
}