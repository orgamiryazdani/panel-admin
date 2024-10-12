import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import useProducts from "../hooks/useProducts";
import AppLayout from "../layouts/AppLayout";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  FilterSkeleton,
  ProductSkeleton,
  SingleProductSkeleton,
} from "../components/common/Skeleton";
const ProductDetails = lazy(
  () => import("../components/products/ProductDetails"),
);
const FilterProducts = lazy(
  () => import("../components/products/FilterProducts"),
);

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetValue = Number(searchParams.get("offset") || 0);
  const [offset, setOffset] = useState(Number(offsetValue));
  const price_min = Number(searchParams.get("price_min"));
  const price_max = Number(searchParams.get("price_max"));
  const categoryId = Number(searchParams.get("categoryId"));
  const title = searchParams.get("title") || "";

  const { data, isLoading, refetch } = useProducts({
    title,
    limit: 3,
    offset,
    price_min,
    price_max,
    categoryId,
  });

  useEffect(() => {
    if (data && data?.length > 0) {
      searchParams.set("offset", String(offset));
      setSearchParams(searchParams);
    }
  }, [data]);

  useEffect(() => {
    const offsetValue = Number(searchParams.get("offset") || 0);
    setOffset(offsetValue);
  }, [offsetValue]);

  const getNewData = async (operator: string) => {
    const newOffset =
      operator === "plus"
        ? offsetValue + 3
        : offsetValue > 0
        ? offsetValue - 3
        : offsetValue - 0;
    await setOffset(newOffset);
    await refetch();
  };

  return (
    <AppLayout
      sidebar={
        <Suspense fallback={<SingleProductSkeleton />}>
          <ProductDetails />
        </Suspense>
      }>
      <Suspense fallback={<FilterSkeleton />}>
        <FilterProducts />
      </Suspense>
      <div className='w-full h-[78%] pb-16 md:pb-0 overflow-y-scroll md:overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start p-6 gap-y-6'>
        {isLoading ? (
          <ProductSkeleton />
        ) : data && data?.length > 0 ? (
          data.map((item) => (
            <ProductCard
              key={`product-${item.id}`}
              item={item}
            />
          ))
        ) : (
          <p>محصولی وجود ندارد</p>
        )}
      </div>
      {/* pagination */}
      <Pagination
        dir='ltr'
        className='pb-5 pt-3 absolute bottom-0 md:relative bg-background md:min-h-12'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                data?.length == 0
                  ? "cursor-not-allowed text-muted-foreground hover:text-muted-foreground hover:bg-transparent"
                  : "cursor-pointer"
              }
              onClick={() => getNewData("minus")}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{offsetValue}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                data?.length == 0
                  ? "cursor-not-allowed text-muted-foreground hover:text-muted-foreground hover:bg-transparent"
                  : "cursor-pointer"
              }
              onClick={() => getNewData("plus")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AppLayout>
  );
};

export default Products;
