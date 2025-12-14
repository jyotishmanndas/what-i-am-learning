import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    console.log("Uploading to Cloudinary:", localFilePath);
    try {
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });

        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

export const deleteFromCloudinary = async (cloudinaryId) => {
    if (!cloudinaryId) return null;

    try {
        const response = await cloudinary.uploader.destroy(cloudinaryId, {resource_type: "image"});
        return response
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return null
    }
}