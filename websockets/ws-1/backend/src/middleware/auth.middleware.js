import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({ msg: "Access token missing" })
        };

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded?.userId) {
            return res.status(401).json({ msg: "Invalid token" })
        }

        const user = await User.findById(decoded.userId).select("-password -refreshToken");
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ msg: "Invalid or expired token" })
    }
}