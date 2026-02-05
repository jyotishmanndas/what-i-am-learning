import { axiosInstance } from "@/config/axiosInstance"

export const fetchedProducts = async () => {
    try {
        const res = await axiosInstance.get("/api/v1/product/allproducts")
        return res.data.products
    } catch (error) {
        console.log("Something went wrong when fetching", error);
    }
}