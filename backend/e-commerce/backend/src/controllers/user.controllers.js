import { User } from "../models/user.model.js";
import { profileUpdateSchema } from "../validations/auth.validation.js";
import bcrypt from "bcrypt";

export const userProfileController = async (req, res) => {
    try {
        if (req.user._id) {
            return res.status(200).json({ success: true, msg: "profile fetched successfully", data: req.user })
        }
    } catch (error) {
        console.log("Error while fetching user profile", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const userUpdateController = async (req, res) => {
    try {
        const payload = profileUpdateSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues });
        };

        const updateData = {};

        if (payload.data.name) {
            updateData.name = payload.data.name
        };

        if (payload.data.newPassword) {
            const hashedPassword = await bcrypt.hash(payload.data.newPassword, 10);
            updateData.password = hashedPassword;
        };

        await User.findByIdAndUpdate(req.user._id, {
            $set: updateData,
        }, { new: true, runValidators: true });

        return res.status(200).json({ success: true, msg: "profile update successfully" })
    } catch (error) {
        console.log("Error while update user profile", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};