import { Router } from "express";
import { forgotPassword, userSignIn, userSignUp } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/forgot-password", forgotPassword);


export default router;