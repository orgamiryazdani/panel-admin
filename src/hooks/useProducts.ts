import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProducts, getSingleProduct, updateProduct } from "../services/productsService";
import { product, queryStringType } from "../types/Product";
import { ApiError } from "../types/GlobalTypes";
import { queryClient } from "../providers/AppProviders";
import { useToast } from "../components/ui/use-toast";

// get all products
const useProducts = (qs: queryStringType) => {
    const queryResult: UseQueryResult<product[]> = useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts(qs),
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
export const useDeleteProduct = (id: number): UseMutationResult<void, ApiError, number, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, number>({
        mutationFn: () => deleteProduct(id),
        onSuccess: () => {
            // toast.success("محصول با موفقیت حذف شد !");
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
export const useUpdateProduct = (id: number, title: string, price: number): UseMutationResult<void, ApiError, number, unknown> => {
    const { toast } = useToast()
    return useMutation<void, ApiError, number>({
        mutationFn: () => updateProduct(id, title, price),
        onSuccess: () => {
            // toast.success("محصول با موفقیت آپدیت شد");
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