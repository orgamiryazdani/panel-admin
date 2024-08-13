import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { category } from "../types/Category";
import { getCategories } from "../services/categoryService";

const useCategory = () => {
    const queryResult: UseQueryResult<category[]> = useQuery({
        queryKey: ["category"],
        queryFn: getCategories,
    });

    const { data, isLoading } = queryResult;

    return { data, isLoading };
};

export default useCategory;