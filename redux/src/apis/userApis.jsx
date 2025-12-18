import { axiosInstance } from "../config/axiosInstance";

export const fetchedUser = async () => {
    try {
        const res = await axiosInstance.get("/users")
        return res.data
    } catch (error) {
        console.log("error while getting users data", error);
    }
}