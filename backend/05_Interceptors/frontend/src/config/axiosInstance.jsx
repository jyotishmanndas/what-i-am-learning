import axios from "axios"
import { store } from "../store/store";
import { logOut } from "../features/authSlice";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve();
    });
    failedQueue = [];
};


axiosInstance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/refresh-token")
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axiosInstance(originalRequest));
            }

            isRefreshing = true;

            try {
                await axiosInstance.post("/api/v1/user/refresh-token");
                processQueue();
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err);
                store.dispatch(logOut())
                window.location.href = "/login"
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
