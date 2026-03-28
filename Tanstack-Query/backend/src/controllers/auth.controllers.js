import AuthService from "../services/auth.service.js"
import AppError from "../utils/error.js";

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
                .json({
                    success: true,
                    msg: "User created successfully",
                    token: result.accessToken,
                    data: result.user
                })
        } catch (error) {
            next(error)
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login({ email, password });

            res.status(200)
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
                .json({
                    success: true,
                    msg: "Login successfully",
                    token: result.accessToken,
                    data: result.user
                })
        } catch (error) {
            next(error)
        }
    };

    logOut = async (req, res, next) => {
        try {
            const userId = req.user._id;
            await this.authService.logOut(userId);

            res.status(200)
                .clearCookie("accessToken", {
                    httpOnly: true,
                    secure: true,
                })
                .clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                })
                .json({ success: true, message: "Logged out successfully" });

        } catch (error) {
            next(error)
        }
    };

    forgotPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            await this.authService.forgotPassword(email);

            res.status(200).json({
                success: true,
                message: "Password reset link sent to your email"
            });

        } catch (error) {
            next(error)
        }
    };

    verifyResetPasswordToken = async (req, res, next) => {
        try {
            const { token } = req.params;
            const { callbackUrl } = req.query;

            if (typeof token !== "string") {
                throw new AppError("Invalid token", 400);
            };

            await this.authService.verifyResetPasswordToken(token)

            res.redirect(`${callbackUrl}?token=${token}`)
        } catch (error) {
            next(error)
        }
    };

    updatePassword = async(req, res, next)=>{
        try {
            const {newPassword, confirmPassword} = req.body;
            const {token} = req.params;

            if (typeof token !== "string") {
                throw new AppError("Invalid token", 400);
            };

            if(!newPassword || !confirmPassword){
                throw new AppError("Both new and confirm passwor are required", 400)
            };

            if(newPassword !== confirmPassword){
                throw new AppError("Both password should match", 400)
            };

            await this.authService.updatePassword(token, newPassword);

            res.status(200).json({success: true, msg: "password updated successfully"})

        } catch (error) {
            next(error)
        }
    }
};

export default new AuthController