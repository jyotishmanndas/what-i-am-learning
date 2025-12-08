import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: ".env"
})

export const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: "25m" })
}

export const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })
}