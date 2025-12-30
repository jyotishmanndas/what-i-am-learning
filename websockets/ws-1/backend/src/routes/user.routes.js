import { Router } from "express";
import { logout, refreshToken, userDetails, userSignIn, userSignup } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/signup", userSignup);
router.post("/signin", userSignIn);

router.post("/logout", verifyJWT, logout);
router.get("/auth/me", verifyJWT, userDetails);
router.post("/refresh-token", refreshToken);


export default router