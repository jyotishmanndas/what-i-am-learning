import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createTweet, deleteTweet, updateTweet } from "../controllers/twitter.controllers.js";


const router = Router();

router.use(verifyJWT);

router.post("/", createTweet);
router.patch("/:tweetId", updateTweet);
router.delete("/:tweetId", deleteTweet);

export default router;