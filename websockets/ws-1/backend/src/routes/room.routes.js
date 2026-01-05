import { Router } from "express";
import { createRoom } from "../controllers/room.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-room", verifyJWT, createRoom)


export default router