import { roomSchema } from "../lib/zod"
import { Room } from "../models/room.model";

export const createRoom = async (req, res) => {
    try {
        const payload = roomSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid input", err: payload.error.message })
        }

        const existingRoom = await Room.findOne({
            slug: payload.data.slug
        });

        if (existingRoom) {
            return res.status(400).json({ msg: "Room already exists" })
        };

        await Room.create({
            slug: payload.data.slug,
            owner: req.user._id
        });

        return res.status(200).json({ msg: "Room created successully" });

    } catch (error) {
        console.log(`Error while creating a room`);

        return res.status(500).json({ msg: "Internal server error" })
    }
}