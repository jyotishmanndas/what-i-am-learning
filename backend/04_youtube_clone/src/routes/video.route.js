import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { publishVideo } from "../controllers/video.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/publish-video", upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
    {
        name: "thumbnail",
        maxCount: 1
    }
]), publishVideo);


export default router