import mongoose from "mongoose";
import { playlistSchema } from "../lib/zod.js"
import { Playlist } from "../models/playlist.model.js";
import { Video } from "../models/video.model.js";


export const createPlaylist = async (req, res) => {
    try {
        const response = playlistSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: response.error.message });
        };

        const existingPlaylist = await Playlist.findOne({
            name: response.data.name,
            owner: req.user._id
        })

        if (existingPlaylist) {
            return res.status(400).json({ msg: "Playlist already exists with this name" })
        }

        await Playlist.create({
            name: response.data.name,
            description: response.data.description,
            videos: [],
            owner: req.user._id
        });

        return res.status(200).json({ msg: "Playlist created successfully" })

    } catch (error) {
        console.log("Error while creating playlist", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const addVideosToPlaylist = async (req, res) => {
    try {
        const { videoId, playlistId } = req.params;

        if (!videoId || !playlistId) {
            return res.status(400).json({ msg: "Both video id and playlist id is required" });
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(400).json({ msg: "video is not found" });
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(400).json({ msg: "playlist not found" });
        };

        if (playlist.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({ msg: "You are not able to add videos in this playlist" });
        }

        const alreadyInPlaylist = playlist.videos.some((v) => v._id.toString() === videoId);
        if (alreadyInPlaylist) {
            return res.status(400).json({ msg: "Already in the playlist" })
        }

        playlist.videos.push(videoId);
        await playlist.save();

        return res.status(200).json({ msg: "Video addded to playlist" })
    } catch (error) {
        console.log("Error while creating playlist", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const getUserPlaylists = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ msg: "user id is missing" });
        }

        const userPlaylist = await Playlist.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "videos",
                    foreignField: "_id",
                    as: "videos",
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
                                            avatar: 1,
                                        },
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                owner: { $first: "$owner" },
                            }
                        },
                        {
                            $project: {
                                title: 1,
                                description: 1,
                                thumbnail: 1,
                                owner: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    videos: 1,
                    createdAt: 1,
                },
            },
        ]);

        if (!userPlaylist.length) {
            return res.status(400).json({ msg: "user playlist not found" });
        }

        return res.status(200).json({ msg: "user playlist fetched successfully", userPlaylist });
    } catch (error) {
        console.log("Error while getting user playlist", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getPlaylistById = async (req, res) => {
    try {
        const { playlistId } = req.params;
        if (!playlistId) {
            return res.status(400).json({ msg: "playlist id is missing" });
        }

        const playlist = await Playlist.findById(playlistId)
            .sort({ createdAt: -1 })
            .populate("owner", "username avatar")
            .populate("videos", "title description thumbnail videoFile");

        if (!playlist) {
            return res.status(404).json({ msg: "playlist not found" })
        }

        return res.status(200).json({ msg: "playlist fetched successfully", playlist })
    } catch (error) {
        console.log("Error while getting user playlist by Id", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const updatePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        if (!playlistId) {
            return res.status(400).json({ msg: "playlist id is missing" });
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(400).json({ msg: "playlist not found" })
        };

        if (playlist.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({ msg: "Your are not allowed to update this playlist" });
        }

        const response = playlistSchema.safeParse(req.body);
        if(!response.success){
            return res.satus(400).json({msg: "Invalid inputs", error: response.error.message})
        };

        await Playlist.findByIdAndUpdate(playlist._id, {
            $set:{
                name: response.data.name,
                description: response.data.description
            }
        }, {
            new: true
        })

        return res.status(200).json(({msg: "playlist updated successfully"}))
    } catch (error) {
        console.log("Error while deleting the playlist", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const removeFromPlaylist = async (req, res) => {
    try {
        const { videoId, playlistId } = req.params;
        if (!videoId || !playlistId) {
            return res.status(400).json({ msg: "Video id and playlist id is missing" })
        }

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(400).json({ msg: "Video not found" });
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(400).json({ msg: "playlist not found" })
        }

        if (playlist.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({ msg: "You are not allowed to remove this video from the playlist" })
        }

        playlist.videos = playlist.videos.filter((v) => v.toString() !== video._id.toString());
        await playlist.save()

        return res.status(200).json({ msg: "video removed from playlist" })
    } catch (error) {
        console.log("Error while removing the playlist", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        if (!playlistId) {
            return res.status(400).json({ msg: "playlist id is missing" });
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(400).json({ msg: "playlist not found" })
        };

        if (playlist.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({ msg: "Your are not allowed to delete this playlist" });
        }

        await Playlist.findByIdAndDelete(playlistId, {
            new: true
        })

        return res.status(200).json({ msg: "playlist deleted succesfully" })
    } catch (error) {
        console.log("Error while deleting the playlist", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}