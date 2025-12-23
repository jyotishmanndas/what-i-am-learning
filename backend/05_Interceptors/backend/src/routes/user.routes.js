import { Router } from "express";
import { logout, refreshToken, userDetails, userSignIn, userSignUp } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);

router.post("/refresh-token", refreshToken);

router.get("/auth/me", verifyJWT, userDetails)

router.post("/logout", verifyJWT, logout)


export default router