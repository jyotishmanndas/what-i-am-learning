import { Router } from "express";
import { forgotPassword, resetPassword, userSignIn, userSignUp } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);


export default router;