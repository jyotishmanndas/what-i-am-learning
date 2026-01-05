import cookie from "cookie";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
        return next(new Error("No cookies found"));
    }

    const cookies = cookie.parse(cookieHeader);
    const token = cookies.accessToken;

    if (!token) {
        return next(new Error("No token"));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        socket.userId = decoded._id; // attach user info
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
}