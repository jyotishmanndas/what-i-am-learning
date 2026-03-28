import jwt from "jsonwebtoken";
import config from "../config/environment.js";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, RESET_PASSWORD_TOKEN_SECRET } = config

export const createAccessToken = (userId) => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
};

export const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "5d" })
};

export const createResetPasswordToken = (userId) => {
    return jwt.sign({ userId }, RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "2m" })
};