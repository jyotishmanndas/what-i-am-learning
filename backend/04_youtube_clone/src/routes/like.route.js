import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controllers.js";


const router = Router();

router.use(verifyJWT);

router.post("/:videoId", toggleVideoLike)
router.post("/:commentId", toggleCommentLike)
router.post("/:tweetId", toggleTweetLike);

router.get("/videos", getLikedVideos)

export default router