import { ForgotUser } from "@/components/forms/ForgotPasswordForm";
import { loginInput } from "@/components/forms/LoginForm";
import { updatePass } from "@/components/forms/ResetPasswordForm";
import { RegisterInput } from "@/components/forms/SignupForm";
import { axiosInstance } from "@/config/axiosInstance"

export const register = async (data: RegisterInput) => {
    const response = await axiosInstance.post("/api/v1/auth/register", data);
    return response.data
};

export const login = async (data: loginInput) => {
    const response = await axiosInstance.post("/api/v1/auth/login", data);
    return response.data
};

export const forgotPassword = async (data: ForgotUser) => {
    const response = await axiosInstance.post("/api/v1/auth/forgot-password", data);
    return response.data
};

export const updatePassword = async ({ data, token }: updatePass) => {
    const response = await axiosInstance.patch("/api/v1/auth/updatePassword", { data, token });
    return response.data
};