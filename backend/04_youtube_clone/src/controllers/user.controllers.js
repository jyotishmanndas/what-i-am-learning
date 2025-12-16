import mongoose from "mongoose";
import { createAccessToken, createRefreshToken } from "../lib/authService.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../lib/cloudinary.js";
import { imageFileSchema, signinSchema, signupSchema, updateProfileSchema } from "../lib/zod.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
    const response = signupSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(400).json({ msg: "Invalid inputs", error: response.error.message })
    }
    try {
        const existingUser = await User.findOne({
            email: response.data.email
        });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exits with this email" })
        }

        console.log("Request files", req.files);

        const avatarObj = req.files?.avatar[0];
        const coverImageObj = req.files?.coverImage[0];
        if (!avatarObj || !coverImageObj) {
            return res.status(400).json({ msg: "Avatar field and coverImage field are required" })
        }

        const avatarMetaData = {
            path: avatarObj.path,
            mimetype: avatarObj.mimetype,
            size: avatarObj.size
        }

        const coverImageMetaData = {
            path: coverImageObj.path,
            mimetype: coverImageObj.mimetype,
            size: coverImageObj.size
        }

        const avatarCheck = imageFileSchema.safeParse(avatarMetaData);
        const coverImageCheck = imageFileSchema.safeParse(coverImageMetaData);

        if (!avatarCheck.success || !coverImageCheck.success) {
            return res.status(400).json({ msg: "Invalid file metadata" })
        }

        const avatarUrl = await uploadOnCloudinary(avatarCheck.data.path);
        const coverImageUrl = await uploadOnCloudinary(coverImageCheck.data.path);

        const passwordhashed = await bcrypt.hash(response.data.password, 12);

        const user = await User.create({
            fullName: response.data.fullName?.trim(),
            username: response.data.username?.toLowerCase().trim(),
            email: response.data.email,
            password: passwordhashed,
            avatar: avatarUrl.secure_url,
            coverImage: coverImageUrl.secure_url
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
        return res.status(400).json({ msg: "Invalid Inputs", error: response.error.message });
    }
    try {
        const existingUser = await User.findOne({
            email: response.data.email
        })
        if (!existingUser) {
            return res.status(400).json({ msg: "User doesn't exits with this email" });
        }

        const passwordCheck = await bcrypt.compare(response.data.password, existingUser.password);
        if (!passwordCheck) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const accessToken = createAccessToken(existingUser._id);
        const refreshToken = createRefreshToken(existingUser._id);

        existingUser.refreshToken = refreshToken;
        await existingUser.save({ validateBeforeSave: false });

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
        console.log("Something went wrong while signin", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const logOut = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
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
        const response = updateProfileSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.message })
        }

        const hashedPassword = await bcrypt.hash(response.data.newpassword, 12);
        await User.findByIdAndUpdate(req.user._id,
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
        const avatar = req.file;
        if (!avatar) {
            return res.status(400).json({ msg: "Avatar field is required" })
        };

        const avatarMetaData = {
            path: avatar.path,
            mimetype: avatar.mimetype,
            size: avatar.size
        };

        const avatarCheck = imageFileSchema.safeParse(avatarMetaData);
        if (!avatarCheck.success) {
            return res.status(400).json({ msg: "Invalid file metadata" })
        }

        if (req.user.avatar) {
            const avatarCloudinaryId = req.user.avatar.split("/").pop().split(".")[0];
            await deleteFromCloudinary(avatarCloudinaryId)
        }

        const avatarUrl = await uploadOnCloudinary(avatarCheck.data.path);
        if (!avatarUrl) {
            return res.status(400).json({ msg: "Error while uploading" })
        }

        await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    avatar: avatarUrl.secure_url
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
        const coverImage = req.file;
        if (!coverImage) {
            return res.status(400).json({ msg: "CoverImage field is required" })
        };

        const coverImageMetaData = {
            path: coverImage.path,
            mimetype: coverImage.mimetype,
            size: coverImage.size
        };

        const coverImageCheck = imageFileSchema.safeParse(coverImageMetaData);
        if (!coverImageCheck.success) {
            return res.status(400).json({ msg: "Invalid file metadata" })
        }

        if (req.user.coverImage) {
            const coverImageCloudinaryId = req.user.coverImage.split("/").pop().split(".")[0];
            await deleteFromCloudinary(coverImageCloudinaryId);
        }

        const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);
        if (!coverImageUrl) {
            return res.status(400).json({ msg: "Error while uploading" })
        }

        await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    coverImage: coverImageUrl.secure_url
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
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ msg: "Username is missing" })
        }

        const channel = await User.aggregate([
            {
                $match: {
                    username: username.toLowerCase()
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
                            if: { $in: [req.user._id, "$subscribers.subscriber"] },
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

        if (!channel?.length) {
            return res.status(400).json({ msg: "Channel doesn't exists" })
        }

        return res.status(200).json({
            success: true,
            message: "User channel fetched successfully",
            data: channel[0]
        });
    } catch (error) {
        console.log("error while fetching user profile", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const getWatchHistory = async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user?._id)
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
        ]);

        if (!user.length) {
            return res.status(400).json({ msg: "User not found" })
        }

        return res.status(200).json({
            success: true,
            message: "Watch history fetched successfully",
            data: user[0].watchHistory
        });
    } catch (error) {
        console.log("Error while fetching the user's watch history", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}