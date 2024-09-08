import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "../types/GlobalTypes";
import { getAccessTokenApi, getProfileApi, signInApi, signUpApi } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { dataLoginType, dataSignUpType, UserType } from "../types/Auth";
import { useToast } from "../components/ui/use-toast";
import { deleteUser, getSingleUser, getUsers, updateUser } from "../services/usersService";
import { queryClient } from "../providers/AppProviders";

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
    const { toast } = useToast()
    return useMutation<void, ApiError, dataSignUpType>({
        mutationFn: (data) => signUpApi(data),
        onSuccess: () => {
            toast({
                title: "خوش آمدید لطفا وارد شوید",
            })
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
        mutationFn: (token) => getAccessTokenApi(token),
        retry: false
    });
};

export const useGetUsers = ({ limit }: { limit: number }) => {
    const queryResult: UseQueryResult<UserType[]> = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(limit),
    });
    const { data, isLoading, error, refetch } = queryResult;
    return { data, isLoading, error, refetch };
};

export const useDeleteUser = (): UseMutationResult<void, ApiError, number, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, number>({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast({
                title: "کاربر با موفقیت حذف شد",
            })
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};


// update user
export const useUpdateUser = (): UseMutationResult<void, ApiError, UserType, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, UserType>({
        mutationFn: updateUser,
        onSuccess: () => {
            toast({
                title: "تغییرات با موفقیت اعمال شد",
            });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};

// use single user
export const useSingleUser = (id: number) => {
    const queryResult: UseQueryResult<UserType, number> = useQuery({
        queryKey: ["single-user"],
        queryFn: () => getSingleUser(id),
        retry: false
    });

    const { data, isLoading, refetch } = queryResult;

    return { data, isLoading, refetch };
};