import { Router } from "express";
import { bookingsController } from "../controllers/booking.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/", bookingsController);

export default router;