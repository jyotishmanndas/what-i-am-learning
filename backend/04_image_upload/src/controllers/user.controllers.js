import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { signupSchema } from "../lib/zod.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
    const response = signupSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            msg: "Invalid inputs",
            error: response.error.message
        })
    }

    try {
        const existingUser = await User.findOne({
            email: response.data.email
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exits with this email" })
        }

        console.log("Request files", req.files);

        const avatarLocalPath = req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            return res.status(400).json({ msg: "Avatar field is required" })
        }

        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if (!coverImageLocalPath) {
            return res.status(400).json({ msg: "Cover Image is required" })
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        const passwordhashed = await bcrypt.hash(response.data.password, 12);

        const user = await User.create({
            fullName: response.data.fullName,
            username: response.data.username.toLowerCase(),
            email: response.data.email,
            password: passwordhashed,
            avatar,
            coverImage
        });

        const userId = user._id;

        const token = jwt.sign({ userId }, process.env.JWT_PASSWORD);

        return res.status(200).json({
            msg: "User signup successfully",
            token,
        })

    } catch (error) {
        console.log("Internal error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}