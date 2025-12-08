import { Router } from "express";
import { logOut, refreshToken, userSignIn, userSignup } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), userSignup);

router.post("/signin", userSignIn);
router.post("/refresh-token", refreshToken)
router.post("/logout", verifyJWT, logOut)


export default router