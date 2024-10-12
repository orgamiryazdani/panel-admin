import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { category } from "../types/Category";
import { createCategory, deleteCategory, getCategories, getSingleCategory, updateCategory } from "../services/categoryService";
import { ApiError } from "../types/GlobalTypes";
import { useToast } from "../components/ui/use-toast";
import { queryClient } from "../lib/react-query";

const useCategory = ({ limit }: { limit: number }) => {
    const queryResult: UseQueryResult<category[]> = useQuery({
        queryKey: ["category"],
        queryFn: () => getCategories(limit),
    });

    const { data, isLoading, refetch } = queryResult;

    return { data, isLoading, refetch };
};

export default useCategory;

export const useSingleCategory = ({ id, enabledValue = false }: { id: number; enabledValue?: boolean }) => {
    const queryResult: UseQueryResult<category, number> = useQuery({
        queryKey: ["single-category", `category-${id}`],
        queryFn: () => getSingleCategory(id),
        enabled: enabledValue,
        retry: false
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


// update category
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

// create category
export const useCreateCategory = (): UseMutationResult<void, ApiError, Omit<category, "id">, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, Omit<category, "id">>({
        mutationFn: createCategory,
        onSuccess: () => {
            toast({
                title: "دسته بندی با موفقیت ایجاد شد",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};
