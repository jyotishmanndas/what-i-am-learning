import { forgotPassword, login, register, updatePassword } from "@/apis/auth/authApi"
import { ForgotUser } from "@/components/forms/ForgotPasswordForm";
import { loginInput } from "@/components/forms/LoginForm";
import { updatePass } from "@/components/forms/ResetPasswordForm";
import { RegisterInput } from "@/components/forms/SignupForm"
import { useMutation } from "@tanstack/react-query"

export const useRegister = () => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (data: RegisterInput) => register(data)
    })
};

export const useLogin = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: loginInput) => login(data)
    })
};

export const useForgotPassword = () => {
    return useMutation({
        mutationKey: ["forgotpassword"],
        mutationFn: (data: ForgotUser) => forgotPassword(data)
    })
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationKey: ["updatePassword"],
        mutationFn: (payload: updatePass) => updatePassword(payload)
    })
};

