import { Router } from "express";
import { VerifyJWT } from "../middleware/auth.middleware.js";
import { userProfileController, userUpdateController } from "../controllers/user.controllers.js";

const router = Router();

router.use(VerifyJWT);

router.get("/profile", userProfileController);
router.patch("/update-profile", userUpdateController);

export default router;