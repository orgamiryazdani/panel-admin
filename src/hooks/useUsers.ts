import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiError } from "../types/GlobalTypes";
import { signInApi, signUpApi } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dataLoginType, dataSignUpType } from "../types/Auth";

export const useSignIn = (): UseMutationResult<void, ApiError, dataLoginType, unknown> => {
    const navigate = useNavigate();
    return useMutation<void, ApiError, dataLoginType>({
        mutationFn: (data) => signInApi(data),
        onSuccess: () => {
            toast.success("خوش آمدید");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "خطای ناشناخته‌ای رخ داد");
        },
    });
};

export const useSignUp = (): UseMutationResult<void, ApiError, dataSignUpType, unknown> => {
    const navigate = useNavigate();
    return useMutation<void, ApiError, dataSignUpType>({
        mutationFn: (data) => signUpApi(data),
        onSuccess: () => {
            toast.success("خوش آمدید لطفا وارد شوبد");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "خطای ناشناخته‌ای رخ داد");
        },
    });
};