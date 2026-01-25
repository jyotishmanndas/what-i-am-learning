import { Request, Response } from "express";
import { bookingSchema, updateBookingSchema } from "../utils/zod";
import { Booking } from "../models/booking.model";
import { User } from "../models/user.model";

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
};

export const getBookings = async (req: Request, res: Response) => {
    try {
        const { bookingId, summary } = req.query;

        if (bookingId) {
            const bookings = await Booking.findOne({
                _id: bookingId,
                owner: req.user?._id
            });
            if (!bookings) {
                return res.status(404).json({ msg: "booking not found" })
            };

            const totalCost = bookings.days * bookings.rentPerDay;

            return res.status(200).json({
                success: true, data: {
                    id: bookings._id,
                    carName: bookings.carName,
                    days: bookings.days,
                    rent_per_day: bookings.rentPerDay,
                    status: bookings.status,
                    totalCost
                }
            })
        } else if (summary === "true") {
            const user = await User.findById(req.user?._id).select("userName _id");
            if (!user) {
                return res.status(404).json({ msg: "user not found" });
            };

            const bookings = await Booking.find({
                owner: user._id,
                status: {
                    $in: ["booked", "completed"]
                }
            });

            const totalBookings = bookings.length;

            const totalAmountSpent = bookings.reduce((acc, s) => {
                return acc + s.days * s.rentPerDay
            }, 0);

            return res.status(200).json({
                success: true,
                data: {
                    userId: user._id,
                    username: user.userName,
                    totalBookings,
                    totalAmountSpent,
                },
            });
        } else {
            return res.status(400).json({ msg: "Invalid request" })
        }
    } catch (error) {
        console.log("Error while getting booking info", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateBooking = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;
        if (!bookingId) {
            return res.status(400).json({ msg: "bookingId not found" })
        };

        const existingBooking = await Booking.findById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ msg: "Booking not found" })
        };

        if (existingBooking.status === "completed") {
            return res.status(400).json({ msg: "Cannot update this booking! Booking is already completed" })
        };

        if (existingBooking.status === "cancelled") {
            return res.status(400).json({ msg: "Cannot update this booking! Booking is already cancelled" })
        }

        if (existingBooking.owner.toString() !== req.user?._id.toString()) {
            return res.status(403).json({ msg: "booking does not belong to user" })
        };

        const payload = updateBookingSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs" })
        };

        const updateBooking = await Booking.findByIdAndUpdate(existingBooking._id, {
            $set: payload.data
        }, { new: true });

        if (!updateBooking) {
            return res.status(400).json({ msg: "Something went wrong" })
        }

        const totalCost = updateBooking.days * updateBooking.rentPerDay

        return res.status(200).json({
            success: true, data: {
                msg: "Booking updated successfully",
                booking: {
                    id: updateBooking._id,
                    carName: updateBooking.carName,
                    days: updateBooking.days,
                    rent_per_day: updateBooking.rentPerDay,
                    status: updateBooking.status,
                    totalCost
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const deleteBooking = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;
        if (!bookingId) {
            return res.status(400).json({ msg: "bookingId not found" })
        };

        const existingBooking = await Booking.findById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ msg: "Booking not found" })
        };

        if (existingBooking.owner.toString() !== req.user?._id.toString()) {
            return res.status(400).json({ msg: "booking does not belong to user" })
        };

        await Booking.findByIdAndDelete(existingBooking._id);

        return res.status(200).json({
            success: true,
            data: {
                msg: "Booking deleted successfully"
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
}