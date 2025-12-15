import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getSubscribedChannels, getUserChannelSubscibers, toggleSubscription } from "../controllers/subscription.controllers.js";


const router = Router();

router.use(verifyJWT);

router.post("/:channelId", toggleSubscription)
router.get("/:channelId", getUserChannelSubscibers);
router.get("/:subscriberId", getSubscribedChannels);


export default router;