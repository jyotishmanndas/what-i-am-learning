import { Router } from "express";
import { forgotPassword, updatePassword, userSignIn, userSignUp, verifyResetPasswordToken } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/forgot-password", forgotPassword);
router.get("/resetpassword/:token", verifyResetPasswordToken);
router.patch("/updatepassword", updatePassword);


export default router;