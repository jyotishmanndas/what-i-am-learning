import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteVideo, getAllVideos, getVideosById, publishVideo, togglePublishStatus, updateVideoDetails, updateVideoThumbnail } from "../controllers/video.controllers.js";
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

router.get("/getBy-id/:videoId", getVideosById)
router.get("/allVideos", getAllVideos)

router.patch("/update-details/:videoId", updateVideoDetails);
router.patch("/update-thumbnail/:videoId", upload.single("thumbnail"), updateVideoThumbnail);
router.patch("/toggle/publish/:videoId", togglePublishStatus);
router.delete("/delete/:videoId", deleteVideo);


export default router