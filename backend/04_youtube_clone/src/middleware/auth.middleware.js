import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken;

        const authHeader = req.header("Authorization");

        if (!token && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        };

        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized request"
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (!decoded?.userId) {
            return res.status(401).json({
                msg: "Invalid token payload"
            });
        } 

        const user = await User.findById(decoded.userId).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ msg: "user not found" })
        }

        req.user = user
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Invalid or expired token"
        })
    }
}