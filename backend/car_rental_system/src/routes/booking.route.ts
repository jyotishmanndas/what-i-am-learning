import { Router } from "express";
import { bookingsController, getBookings } from "../controllers/booking.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/", bookingsController);;
router.get("/", getBookings);

export default router;