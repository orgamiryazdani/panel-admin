import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { category } from "../types/Category";
import { getCategories, getSingleCategory } from "../services/categoryService";

const useCategory = () => {
    const queryResult: UseQueryResult<category[]> = useQuery({
        queryKey: ["category"],
        queryFn: getCategories,
    });

    const { data, isLoading } = queryResult;

    return { data, isLoading };
};

export default useCategory;

export const useSingleCategory = (id:number) => {
    const queryResult: UseQueryResult<category, number> = useQuery({
        queryKey: ["single-category"],
        queryFn: () => getSingleCategory(id),
        enabled:false
    });

    const { data, isLoading ,refetch} = queryResult;

    return { data, isLoading ,refetch};
};