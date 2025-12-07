import { Router } from "express";
import { userSignup } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

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
]), userSignup)



export default router