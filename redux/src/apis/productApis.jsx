import { axiosInstance } from "../config/axiosInstance";

export const fetchedProducts = async () => {
    try {
        const res = await axiosInstance.get("/products");
        return res.data
    } catch (error) {
        console.log("error while getting products data", error);
    }
}