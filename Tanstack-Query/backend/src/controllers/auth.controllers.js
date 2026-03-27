import AuthService from "../services/auth.service.js"

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    register = async (req, res, next) => {
        try {
            const userData = req.body;
            const result = await this.authService.register(userData);

            res.status(201)
            .cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000
            })
            .cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 5 * 24 * 60 * 60 * 1000
            })
            .json({success: true, msg: "User created successfully", data: result.user})
        } catch (error) {
            next(error)
        }
    }
};

export default new AuthController