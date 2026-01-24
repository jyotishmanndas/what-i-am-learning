import { Request, Response } from "express";
import { bookingSchema } from "../utils/zod";
import { Booking } from "../models/booking.model";

export const bookingsController = async (req: Request, res: Response) => {
    try {
        const payload = bookingSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues })
        };

        const existingBooking = await Booking.findOne({
            carName: payload.data.carName,
            owner: req.user?._id,
            status: "booked"
        });
        if (existingBooking) {
            return res.status(400).json({ msg: "you already booked a car" })
        };

        const newBooking = await Booking.create({
            carName: payload.data.carName,
            days: payload.data.days,
            rentPerDay: payload.data.rentPerDay,
            status: payload.data.status,
            owner: req.user?._id
        });

        const totalCost = newBooking.rentPerDay * newBooking.days

        return res.status(201).json({
            success: true, data: {
                msg: "Booking created successfully",
                bookingId: newBooking._id,
                days: newBooking.days,
                totalCost
            }
        })

    } catch (error) {
        console.log("Error while create booking", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}