import jwt from "jsonwebtoken";

export const createAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "20m" })
};

export const createRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })
};

export const createForgotPasswordToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.RESET_PASSWORD_TOKEN_SECRET!, { expiresIn: "7d" })
};