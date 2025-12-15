import mongoose from "mongoose";
import { createAccessToken, createRefreshToken } from "../lib/authService.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../lib/cloudinary.js";
import { signinSchema, signupSchema, updateProfileSchema } from "../lib/zod.js";
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
            avatar: avatar.secure_url,
            coverImage: coverImage.secure_url
        });

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 25 * 60 * 1000  // 25 mins
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
            })
            .json({ msg: "User signup successfully", accessToken, refreshToken })

    } catch (error) {
        console.log("Internal error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const userSignIn = async (req, res) => {
    const response = signinSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            msg: "Invalid Inputs",
            error: response.error.message
        });
    }

    try {
        const existingUser = await User.findOne({
            email: response.data.email
        })

        if (!existingUser) {
            return res.status(400).json({ msg: "User doesn't exits with this email" })
        }

        const passwordCheck = await bcrypt.compare(response.data.password, existingUser.password);

        if (!passwordCheck) {
            return res.status(401).json({ msg: "Invalid credentials" })
        }

        const accessToken = createAccessToken(existingUser._id);
        const refreshToken = createRefreshToken(existingUser._id);

        existingUser.refreshToken = refreshToken;
        await existingUser.save({ validateBeforeSave: false })

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 25 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({ msg: "Login successful", accessToken, refreshToken })

    } catch (error) {
        console.log("Internal error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const logOut = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    refreshToken: null
                }
            }, {
            new: true
        }
        )

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(200)
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            })
            .json({ msg: "Logged out successful" })
    } catch (error) {
        console.log("Logout error:", error);
        return res.status(500).json({ msg: "Something went wrong", error })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const IncomingRefreshToken = req.cookies.refreshToken;

        if (!IncomingRefreshToken) {
            return res.status(401).json({ msg: "Unauthorized request" })
        }

        const decodedToken = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN);

        const user = await User.findById(decodedToken?.userId);

        if (!user) {
            return res.status(401).json({ msg: "Invalid refresh token" })
        }

        if (IncomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({ msg: "Refresh token is expired or used" })
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 25 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({ msg: "Access token refreshed", accessToken, refreshToken })
    } catch (error) {
        return res.status(500).json({ msg: "Invalid refresh token", error })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        const response = updateProfileSchema.safeParse(req.body);

        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.message })
        }

        const hashedPassword = await bcrypt.hash(response.data.newpassword, 12);

        await User.findByIdAndUpdate(user._id,
            {
                $set: {
                    fullName: response.data.fullName,
                    password: hashedPassword
                }
            }, {
            new: true
        })

        return res.status(200).json({ msg: "profile updated successfully" })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error })
    }
}

export const updateUserAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ msg: "Avatar field is required" })
        };

        if (user.avatar) {
            const cloudinaryId = user.avatar.split("/").pop().split(".")[0];
            await deleteFromCloudinary(cloudinaryId)
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar) {
            return res.status(400).json({ msg: "Error while uploading" })
        }

        await User.findByIdAndUpdate(user._id,
            {
                $set: {
                    avatar: avatar.secure_url
                }
            }, {
            new: true
        })

        return res.status(200).json({ msg: "Avatar updated successfully" })

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error })
    }
}

export const updateUserCoverImage = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        const coverImageLocalPath = req.file?.path;
        if (!coverImageLocalPath) {
            return res.status(400).json({ msg: "Avatar field is required" })
        }

        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if (!coverImage) {
            return res.status(400).json({ msg: "Error while uploading" })
        }

        await User.findByIdAndUpdate(user._id,
            {
                $set: {
                    coverImage: coverImage.secure_url
                }
            }, {
            new: true
        })

        return res.status(200).json({ msg: "coverImage updated successfully" })

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error })
    }
}

export const getUserChannelProfile = async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ msg: "Username is missing" })
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedTo: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.userId, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedTo: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1
            }
        }
    ]);

    console.log("getChannelProfile", channel);

    if (!channel?.length) {
        return res.status(400).json({ msg: "Channel doesn't exists" })
    }

    return res.status(200).json({
        success: true,
        message: "User channel fetched successfully",
        data: channel[0]
    });
}

export const getWatchHistory = async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "ownerDetails",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$ownerDetails"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200).json({
        success: true,
        message: "Watch history fetched successfully",
        data: user[0].watchHistory
    });
}