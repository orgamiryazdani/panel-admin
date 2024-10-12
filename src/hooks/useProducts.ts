import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../services/productsService";
import { createProductType, product, queryStringType, UpdateDataType } from "../types/Product";
import { ApiError } from "../types/GlobalTypes";
import { useToast } from "../components/ui/use-toast";
import { queryClient } from "../lib/react-query";

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
        queryKey: ["singleProduct", productActive],
        queryFn: () => getSingleProduct(productActive),
        retry: false
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

// create product
export const useCreateProduct = (): UseMutationResult<void, ApiError, createProductType, unknown> => {
    const { toast } = useToast();

    return useMutation<void, ApiError, createProductType>({
        mutationFn: createProduct,
        onSuccess: () => {
            toast({
                title: "محصول شما اضافه شد",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
            });
        },
    });
};