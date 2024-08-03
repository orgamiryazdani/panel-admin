import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "../types/GlobalTypes";
import { getAccessTokenApi, getProfileApi, signInApi, signUpApi } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { dataLoginType, dataSignUpType, UserType } from "../types/Auth";
import { useToast } from "../components/ui/use-toast";

const useProfile = () => {
    const queryResult: UseQueryResult<UserType> = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi,
        retry: false
    });
    const { data, isLoading, error } = queryResult;
    return { data, isLoading, error };
};

export default useProfile;

export const useSignIn = (): UseMutationResult<void, ApiError, dataLoginType, unknown> => {
    const navigate = useNavigate();
    const { toast } = useToast()
    return useMutation<void, ApiError, dataLoginType>({
        mutationFn: (data) => signInApi(data),
        onSuccess: () => {
            toast({
                title: "خوش آمدید",
            })
            navigate("/");
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
        retry: false
    });
};

export const useSignUp = (): UseMutationResult<void, ApiError, dataSignUpType, unknown> => {
    const navigate = useNavigate();
    const { toast } = useToast()
    return useMutation<void, ApiError, dataSignUpType>({
        mutationFn: (data) => signUpApi(data),
        onSuccess: () => {
            toast({
                title: "خوش آمدید لطفا وارد شوبد",
            })
            navigate("/signin");
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};

export const useGetAccessToken = (): UseMutationResult<void, ApiError, string, unknown> => {
    return useMutation<void, ApiError, string>({
        mutationFn: (token) => getAccessTokenApi(token)
    });
};