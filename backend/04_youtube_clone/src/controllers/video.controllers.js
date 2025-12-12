import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { fileMetaSchema, videoSchema } from "../lib/zod.js";
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

        console.log(req.files);

        const videoFileObj = req.files?.videoFile[0];
        if (!videoFileObj) {
            return res.status(400).json({ msg: "video file field is required" });
        };

        const thumbnailObj = req.files?.thumbnail[0];
        if (!thumbnailObj) {
            return res.status(400).json({ msg: "Thumbnail field is required" });
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

        const videoCheck = fileMetaSchema.safeParse(videoMetaData);
        const imageCheck = fileMetaSchema.safeParse(thumbnailMetaData)

        if (!videoCheck.success || !imageCheck.success) {
            return res.status(400).json({ msg: "Invalid file metadata" })
        }

        const videoFile = await uploadOnCloudinary(videoFileObj.path);
        if (!videoFile || !videoFile.secure_url) {
            return res.status(400).json({ msg: "Error while uploading video" });
        }

        const thumbnail = await uploadOnCloudinary(thumbnailObj.path);
        if (!thumbnail || !thumbnail.secure_url) {
            return res.status(400).json({ msg: "Error while uploading thumbnail" });
        }

        await Video.create({
            title: response.data.title.trim(),
            description: response.data.description.trim(),
            videoFile: videoFile.secure_url,
            thumbnail: thumbnail.secure_url,
            duration: videoFile.duration,
            isPublished: false,
            owner: user._id
        });

        return res.status(200).json({ msg: "Video uploaded successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}