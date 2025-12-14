import mongoose from "mongoose";
import { commentSchema } from "../lib/zod.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";


export const addComment = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "VideoId is missing" });
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ msg: "video not found" })
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const response = commentSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.message })
        }

        await Comment.create({
            content: response.data.content.trim(),
            video: video._id,
            owner: user._id
        });

        return res.status(200).json({ msg: "comment created successfully" })
    } catch (error) {
        console.log("Error during comment", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ msg: "comment id is missing" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({ msg: "comment not found" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (comment.owner.toString() !== req.userId) {
            return res.status(403).json({ msg: "You are not allowed to update this comment" });
        }

        const response = commentSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.flatten })
        };

        await Comment.findByIdAndUpdate(comment._id, {
            $set: {
                content: response.data.content.trim()
            }
        }, {
            new: true
        })

        return res.status(200).json({ msg: "comment updated successfully" });
    } catch (error) {
        console.log("Error during comment", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ msg: "comment id is missing" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({ msg: "comment not found" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (comment.owner.toString() !== req.userId) {
            return res.status(403).json({ msg: "You are not allowed to update this comment" });
        }

        await Comment.findByIdAndDelete(comment._id,
            { new: true }
        );

        return res.status(200).json({ msg: "comment deleted successfully" });
    } catch (error) {
        console.log("Error during deleting comment", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getVideoComments = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "video id is missing" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User is not found" });
        }

        const comment = await Comment.aggregate([
            {
                $match: {
                    video: new mongoose.Types.ObjectId(videoId)
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
        ]);

        if (!comment) {
            return res.status(400).json({ msg: "Invalid video id" })
        };

        return res.status(200).json({ msg: "Comments", comment })

    } catch (error) {
        console.log("Error during getting comment", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}