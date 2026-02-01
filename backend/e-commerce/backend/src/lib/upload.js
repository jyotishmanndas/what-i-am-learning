import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const imageKit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL
});

export const uploadToIK = async (file, fileName) => {
    if (!file || !fileName) return null;

    try {
        const response = await imageKit.upload({
            file,
            fileName,
            folder: "Products"
        });

        return response;
    } catch (error) {
        console.log("ImageKit error:", error);
        throw new Error("Failed to upload image");
    }
};