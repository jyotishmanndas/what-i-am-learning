import { axiosInstance } from "@/config/axiosInstance"

export const CartApi = async() =>{
    try {
        const res = await axiosInstance.get(`/api/v1/cart/getcart`);
        return res.data.cart
    } catch (error) {
        console.log("Something went wrong when fetching cart", error);
    }
}