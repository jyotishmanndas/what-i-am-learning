import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const VerifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies.accessToken;
        const authheader = req.headers.authorization;

        if (!token && authheader?.startsWith("Bearer ")) {
            token = authheader.split(" ")[1]
        };

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" });
        };

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({ msg: "Invalid token" })
        };

        const user = await User.findById(decoded.userId).select("-password -refreshToken");
        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired token" });
        };

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })
    }
};