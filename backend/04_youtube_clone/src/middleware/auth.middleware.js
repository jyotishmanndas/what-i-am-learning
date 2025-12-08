import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        const authHeader = req.header("Authorization");

        if (!token && authHeader.startsWith("Bearer")) {
            token = jwtToken.split(" ")[1];
        };

        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized request"
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (!decoded.userId) {
            return res.status(401).json({
                msg: "Invalid token payload"
            });
        }

        req.userId = decoded.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Invalid or expired token"
        })
    }
}