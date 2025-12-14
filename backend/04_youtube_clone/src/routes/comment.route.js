import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controllers.js";

const router = Router();

router.use(verifyJWT);

router.get("/:videoId", getVideoComments)
router.post("/:videoId", addComment);
router.patch("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);

export default router