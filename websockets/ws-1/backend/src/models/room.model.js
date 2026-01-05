import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export const Room = mongoose.model("Room", roomSchema)