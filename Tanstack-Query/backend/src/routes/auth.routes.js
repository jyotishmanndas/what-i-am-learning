import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", verifyJWT, authControllers.logOut);


export default router;