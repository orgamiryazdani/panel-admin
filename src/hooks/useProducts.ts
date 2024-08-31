import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProducts, getSingleProduct, updateProduct } from "../services/productsService";
import { product, queryStringType, UpdateDataType } from "../types/Product";
import { ApiError } from "../types/GlobalTypes";
import { queryClient } from "../providers/AppProviders";
import { useToast } from "../components/ui/use-toast";

// get all products
const useProducts = (qs: queryStringType) => {
    const { toast } = useToast()
    const queryResult: UseQueryResult<product[]> = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const data = await getProducts(qs);
            if (!data || data.length === 0) {
                // اگر داده جدید دریافت نشد، داده‌های کش فعلی را بازگردانید
                toast({
                    variant: "destructive",
                    title: "محصولی پیدا نشد",
                })
                return queryClient.getQueryData<product[]>(["products"]);
            }
            return data;
        },
    });

    const { data, isLoading, refetch } = queryResult;

    return { data, isLoading, refetch };
};

export default useProducts;

// get single product
export const useSingleProduct = (productActive: number) => {
    const queryResult: UseQueryResult<product> = useQuery({
        queryKey: ["singleProduct"],
        queryFn: () => getSingleProduct(productActive),
    });

    const { data, isLoading, refetch } = queryResult;

    return { data, isLoading, refetch };
};

// delete product
export const useDeleteProduct = (): UseMutationResult<void, ApiError, number, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, number>({
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast({
                title: "محصول با موفقیت حذف شد",
            });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            })
        },
    });
};

// update product
export const useUpdateProduct = (): UseMutationResult<void, ApiError, UpdateDataType, unknown> => {
    const { toast } = useToast();

    return useMutation<void, ApiError, UpdateDataType>({
        mutationFn: updateProduct,
        onSuccess: () => {
            toast({
                title: "عملیات با موفقیت انجام شد",
            });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            });
        },
    });
};