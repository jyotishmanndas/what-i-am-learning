import { Router } from "express";
import { bookingsController, deleteBooking, getBookings, updateBooking } from "../controllers/booking.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/", bookingsController);;
router.get("/", getBookings);

router.patch("/:bookingId", updateBooking);

router.delete("/:bookingId", deleteBooking);

export default router;