import mongoose, { Document, Model, Schema, Types } from "mongoose";

type BookingStatus = "completed" | "booked" | "cancelled"

interface IBookings extends Document {
    carName: string,
    days: number,
    rentPerDay: number,
    status: BookingStatus,
    owner: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const bookingSchema = new Schema<IBookings>({
    carName: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "booked", "cancelled"],
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

export const Booking: Model<IBookings> = mongoose.model("Booking", bookingSchema); 