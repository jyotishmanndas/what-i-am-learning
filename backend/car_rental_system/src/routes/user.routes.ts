import { Router } from "express";
import { logoutController, refreshTokenController, signInController, signupController } from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signInController);

router.post("/logout", verifyJWT, logoutController);

router.post("/refresh-token", refreshTokenController);


export default router;