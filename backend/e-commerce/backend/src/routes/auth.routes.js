import { Router } from "express";
import { loginController, logout, registerController } from "../controllers/auth.controllers.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", VerifyJWT, logout);

export default router