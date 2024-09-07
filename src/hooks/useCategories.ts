import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { category } from "../types/Category";
import { deleteCategory, getCategories, getSingleCategory, updateCategory } from "../services/categoryService";
import { ApiError } from "../types/GlobalTypes";
import { useToast } from "../components/ui/use-toast";
import { queryClient } from "../providers/AppProviders";

const useCategory = () => {
    const queryResult: UseQueryResult<category[]> = useQuery({
        queryKey: ["category"],
        queryFn: getCategories,
    });

    const { data, isLoading } = queryResult;

    return { data, isLoading };
};

export default useCategory;

export const useSingleCategory = (id: number) => {
    const queryResult: UseQueryResult<category, number> = useQuery({
        queryKey: ["single-category"],
        queryFn: () => getSingleCategory(id),
        enabled: false
    });

    const { data, isLoading, refetch } = queryResult;

    return { data, isLoading, refetch };
};


// delete category
export const useDeleteCategory = (): UseMutationResult<void, ApiError, number, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, number>({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast({
                title: "دسته بندی با موفقیت حذف شد",
            });
            queryClient.invalidateQueries({ queryKey: ['category'] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};


// delete category
export const useUpdateCategory = (): UseMutationResult<void, ApiError, category, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, category>({
        mutationFn: updateCategory,
        onSuccess: () => {
            toast({
                title: "تغییرات با موفقیت اعمال شد",
            });
            queryClient.invalidateQueries({ queryKey: ['category'] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};
