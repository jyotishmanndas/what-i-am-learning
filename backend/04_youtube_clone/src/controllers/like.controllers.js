import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Video } from "../models/video.model.js";


export const toggleVideoLike = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ msg: "video id is missing" });
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(400).json({ msg: "video not found" });
        }

        const existingLike = await Like.findOne({
            video: video._id,
            likedBy: req.user._id
        });

        if (existingLike) {
            await existingLike.deleteOne();
            return res.status(200).json({ msg: "liked removed from this video" })
        }

        await Like.create({
            video: video._id,
            likedBy: req.user._id
        });

        return res.status(200).json({ msg: "Successfully Liked this video" })
    } catch (error) {
        console.log("Error during like video", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const toggleCommentLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ msg: "comment id is missing" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({ msg: "comment is not found" });
        }

        const existingCommentLike = await Like.findOne({
            comment: comment._id,
            likedBy: req.user._id
        });

        if (existingCommentLike) {
            await existingCommentLike.deleteOne();
            return res.status(200).json({ msg: "liked removed from this comment" })
        }

        await Like.create({
            comment: comment._id,
            likedBy: req.user._id
        });

        return res.status(200).json({ msg: "Successfully Liked this comment" })
    } catch (error) {
        console.log("Error during like video", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const toggleTweetLike = async (req, res) => {
    try {
        const { tweetId } = req.params;
        if (!tweetId) {
            return res.status(400).json({ msg: "tweet id is missing" });
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(400).json({ msg: "tweet is not found" });
        }

        const existingTweetLike = await Like.findOne({
            tweet: tweet._id,
            likedBy: req.user._id
        });

        if (existingTweetLike) {
            await existingTweetLike.deleteOne();
            return res.status(200).json({ msg: "liked removed from this tweet" })
        }

        await Like.create({
            tweet: tweet._id,
            likedBy: req.user._id
        });

        return res.status(200).json({ msg: "Successfully Liked this tweet" })
    } catch (error) {
        console.log("Error during like video", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getLikedVideos = async (req, res) => {
    try {
        const likedVideos = await Like.aggregate([
            {
                $match: {
                    likedBy: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $sort:{
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "video",
                    foreignField: "_id",
                    as: "video",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner",
                                pipeline: [
                                    {
                                        $project: {
                                            username: 1,
                                            avatar: 1
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
                            $project: {
                                title: 1,
                                description: 1,
                                thumnail: 1,
                                videoFile: 1,
                                owner: 1
                            }
                        }
                    ]
                }
            },
        ])

        if(!likedVideos.length){
            return res.status(400).json({msg: "No liked videos found"})
        }

        return res.status(200).json({ msg: "All liked videos are fetched", likedVideos })
    } catch (error) {
        console.log("Error during like getting like", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}