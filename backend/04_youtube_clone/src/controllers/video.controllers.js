import mongoose from "mongoose";
import { deleteFromCloudinary, uploadOnCloudinary } from "../lib/cloudinary.js";
import { imageFileSchema, videoFileSchema, videoSchema } from "../lib/zod.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

export const publishVideo = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(401).json({
            msg: "User not found"
        })
    }

    try {
        const response = videoSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.flatten })
        }

        const videoFileObj = req.files?.videoFile[0];
        const thumbnailObj = req.files?.thumbnail[0];

        if (!videoFileObj || !thumbnailObj) {
            return res.status(400).json({ msg: "Video and thumbnail are required" });
        }

        const videoMetaData = {
            path: videoFileObj.path,
            mimetype: videoFileObj.mimetype,
            size: videoFileObj.size
        }

        const thumbnailMetaData = {
            path: thumbnailObj.path,
            mimetype: thumbnailObj.mimetype,
            size: thumbnailObj.size
        }

        const videoCheck = videoFileSchema.safeParse(videoMetaData);
        const imageCheck = imageFileSchema.safeParse(thumbnailMetaData);

        if (!videoCheck.success || !imageCheck.success) {
            return res.status(400).json({ msg: "Invalid file metadata" })
        };

        const videoFileUrl = await uploadOnCloudinary(videoFileObj.path);
        if (!videoFileUrl || !videoFileUrl.secure_url) {
            return res.status(400).json({ msg: "Error while uploading video" });
        }

        const thumbnailUrl = await uploadOnCloudinary(thumbnailObj.path);
        if (!thumbnailUrl || !thumbnailUrl.secure_url) {
            return res.status(400).json({ msg: "Error while uploading thumbnail" });
        }

        await Video.create({
            title: response.data.title.trim(),
            description: response.data.description.trim(),
            videoFile: videoFileUrl.secure_url,
            thumbnail: thumbnailUrl.secure_url,
            videoPublicId: videoFileUrl.public_id,
            thumbnailPublicId: thumbnailUrl.public_id,
            duration: videoFileUrl.duration,
            isPublished: false,
            owner: user._id
        });

        return res.status(200).json({ msg: "Video uploaded successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const getAllVideos = async (req, res) => {
    try {
        const { limit, query, sortBy, sortType } = req.query;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        };

        const limitNumber = Math.max(Number(limit) || 10);

        const match = {
            isPublished: true
        };

        if (query?.trim()) {
            match.title = {
                $regex: query.trim(),
                $options: "i"
            }
        };

        const videos = await Video.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                avatar: 1,
                                username: 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    owner: {
                        $first: "$owner"
                    }
                }
            },
            {
                $sort: {
                    [sortType]: sortBy === "asc" ? 1 : -1
                }
            },
            {
                $limit: limitNumber
            }
        ])

        if (!videos) {
            return res.status(400).json({ msg: "Videos not found" });
        }

        return res.status(200).json({ msg: "Videos fetched succcessfully", videos })
    } catch (error) {
        console.log("Get videos error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getVideosById = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId.trim()) {
            return res.status(400).json({ msg: "VideoId is missing" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const video = await Video.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(videoId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                avatar: 1,
                                username: 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    owner: {
                        $first: "$owner"
                    }
                }
            }
        ])

        if (!video) {
            return res.status(401).json({ msg: "Invalid video Id" })
        }

        return res.status(200).json({ msg: "Video retrieved successfully", video })
    } catch (error) {
        console.log("Get video error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateVideoDetails = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "videoId is missing" })
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ msg: "Video not found" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        if (video.owner.toString() !== req.userId) {
            return res.status(403).json({ msg: "You are not allowed to update this video details" });
        }

        const response = videoSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.flatten })
        };

        await Video.findByIdAndUpdate(video._id, {
            $set: {
                title: response.data.title,
                description: response.data.description
            }
        }, {
            new: true
        });

        return res.status(200).json({ msg: "video details updated successfully" })

    } catch (error) {
        console.log("Update error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateVideoThumbnail = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "videoId is missing" })
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ msg: "Video not found" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        if (video.owner.toString() !== req.userId) {
            return res.status(403).json({ msg: "You are not allowed to update this video details" });
        }

        const thumbnailObj = req.file;
        if (!thumbnailObj) {
            return res.status(400).json({ msg: "Thumbnail field is required" });
        }

        const thumbnailMetaData = {
            path: thumbnailObj.path,
            mimetype: thumbnailObj.mimetype,
            size: thumbnailObj.size
        }

        const imageCheck = imageFileSchema.safeParse(thumbnailMetaData);
        if (!imageCheck.success) {
            return res.status(400).json({ msg: "Invalid file metadata" })
        };

        if (video.thumbnailPublicId) {
            await deleteFromCloudinary(video.thumbnailPublicId);
        }

        const thumbnail = await uploadOnCloudinary(thumbnailObj.path);
        if (!thumbnail || !thumbnail.secure_url) {
            return res.status(400).json({ msg: "Error while uploading" })
        }

        await Video.findByIdAndUpdate(video._id, {
            $set: {
                thumbnail: thumbnail.secure_url,
                thumbnailPublicId: thumbnail.public_id
            }
        }, {
            new: true
        })

        return res.status(200).json({ msg: "video thumbnail updated successfully" })

    } catch (error) {
        console.log("Update thumbnail error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const deleteVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "videoId is missing" })
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ msg: "Video not found" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        if (video.owner.toString() !== req.userId) {
            return res.status(403).json({ msg: "You are not allowed to delete this video" });
        }

        if (video.thumbnailPublicId) {
            await deleteFromCloudinary(video.thumbnailPublicId);
        }

        // TODO: video delete from cloudinary
        // if (video.thumbnail) {

        //     await deleteFromCloudinary(cloudinaryId)
        // }

        await Video.findByIdAndDelete(videoId, {
            new: true
        })

        return res.status(200).json({ msg: "Video deleted successfully" })
    } catch (error) {
        console.log("Delete video error", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const togglePublishStatus = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "Video id is missing" })
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(400).json({ msg: "Video not found" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        };

        if (video.owner.toString() !== req.userId) {
            return res.status(400).json({ msg: "You are not allowed to update this video details" })
        }

        const updateVideo = await Video.findByIdAndUpdate(video._id, {
            $set: {
                isPublished: !video.isPublished
            }
        }, {
            new: true
        });

        return res.status(200).json({ msg: "updated successfully", updateVideo })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}