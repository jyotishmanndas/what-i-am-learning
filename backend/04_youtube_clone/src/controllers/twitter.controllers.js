import mongoose from "mongoose";
import { tweetSchema } from "../lib/zod.js";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js"


export const createTweet = async (req, res) => {
    try {
        const response = tweetSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.message });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        };

        await Tweet.create({
            content: response.data.content.trim(),
            owner: user._id
        })

        return res.status(200).json({ msg: "Tweet created sucessfully" })
    } catch (error) {
        console.log("Error during tweet", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateTweet = async (req, res) => {
    try {
        const { tweetId } = req.params;
        if (!tweetId) {
            return res.status(400).json({ msg: "tweet id is missing" });
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(400).json({ msg: "Tweet not found" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        };

        if (tweet.owner.toString() !== req.userId) {
            return res.status(400).json({ msg: "You are not allowed to update this tweet details" })
        }
        const response = tweetSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.message });
        }

        const updatedtweet = await Tweet.findByIdAndUpdate(tweet._id, {
            $set: {
                content: response.data.content
            }
        }, {
            new: true
        });

        await updatedtweet.populate("owner", "fullName username")

        return res.status(200).json({ msg: "Tweet updated successfully", updatedtweet });
    } catch (error) {
        console.log("Error during updating tweet", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const { tweetId } = req.params;
        if (!tweetId) {
            return res.status(400).json({ msg: "tweet id is missing" });
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(400).json({ msg: "Tweet not found" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        };

        if (tweet.owner.toString() !== req.userId) {
            return res.status(400).json({ msg: "You are not allowed to delete this tweet" })
        }

        await Tweet.findByIdAndDelete(tweet._id, {
            new: true
        });

        return res.status(200).json({ msg: "Tweet deleted successfully" });
    } catch (error) {
        console.log("Error during deleting tweet", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getUserTweets = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            return res.status(400).json({ msg: "User id is missing" });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        };

        const tweets = await Tweet.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $sort: {
                    createdAt: -1
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
            }
        ])

        return res.status(200).json({ msg: "All tweets are fetched succefully", tweets })
    } catch (error) {
        console.log("Error during getting all the tweets", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}