import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";


// controller to return subscriber list of a channel
export const getUserChannelSubscibers = async (req, res) => {
    try {
        const { channelId } = req.params;
        if (!channelId) {
            return res.status(400).json({ msg: "channel id is missing" });
        }

        const subscribers = await Subscription.aggregate([
            {
                $match: {
                    channel: new mongoose.Types.ObjectId(channelId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscriber",
                    foreignField: "_id",
                    as: "subscriber",
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
                    subscriber: {
                        $first: "$subscriber"
                    }
                }
            }
        ])

        if (!subscribers.length) {
            return res.status(400).json({ msg: "Subscribers not found" })
        }

        return res.status(200).json({ msg: "Subscribers fetched Successfully", subscribers })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

// controller to return channel list to which user has subscribed
export const getSubscribedChannels = async (req, res) => {
    try {
        const { subscriberId } = req.params;
        if (!subscriberId) {
            return res.status(400).json({ msg: "subscriber Id is missing" });
        }

        const channels = await Subscription.aggregate([
            {
                $match: {
                    subscriber: new mongoose.Types.ObjectId(subscriberId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as: "channel",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                fullName: 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    channel: {
                        $first: "$channel"
                    }
                }
            }
        ])

        if (!channels.length) {
            return res.status(400).json({ msg: "channels not found" })
        }

        return res.status(200).json({ msg: "channels fetched Successfully", channels })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const toggleSubscription = async (req, res) => {
    try {
        const { channelId } = req.params;
        if (!channelId) {
            return res.status(400).json({ msg: "channel id is missing" });
        }

        const channelOwner = await User.findById(channelId);
        if (!channelOwner) {
            return res.status(400).json({ msg: "channel not found" });;
        }

        if (channelOwner._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ msg: "One cannot subscribe his own channel" })
        }

        const existingSubscription = await Subscription.findOne({
            subscriber: req.user._id,
            channel: channelOwner._id
        })

        if (existingSubscription) {
            await existingSubscription.deleteOne();
            return res.status(200).json({ msg: "Unsubscribed to this channel" });
        }


        const subscription = await Subscription.create({
            subscriber: req.user._id,
            channel: channelId
        });

        return res.status(200).json({ msg: "Subscribed successfully", subscription })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}