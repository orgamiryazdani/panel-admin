import { useSearchParams } from "react-router-dom";
import FilterProducts from "../components/products/FilterProducts";
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
import { useEffect, useState } from "react";
import { product } from "../types/Product";
import { ProductSkeleton } from "../components/common/Skeleton";
import { useToast } from "../components/ui/use-toast";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetValue = Number(searchParams.get("offset") || 0);
  const [offset, setOffset] = useState(Number(offsetValue));
  const [dataLoaded, setDataLoaded] = useState<product[]>([]);
  const price_min = Number(searchParams.get("price_min"));
  const price_max = Number(searchParams.get("price_max"));
  const categoryId = Number(searchParams.get("categoryId"));
  const title = searchParams.get("title") || "";
  const { toast } = useToast();

  const { data, isLoading, refetch } = useProducts({
    title,
    limit: 3,
    offset,
    price_min,
    price_max,
    categoryId,
  });

  const dataLength = data?.length || 0;

  useEffect(() => {
    if (dataLength > 0) {
      setDataLoaded(data ? data : []);
      offsetHandler();
    }
    if (data?.length == 0) {
      toast({
        variant: "destructive",
        title: "محصولی پیدا نشد",
      });
    }
  }, [data]);

  const offsetHandler = () => {
    if (dataLength > 0) {
      searchParams.set("offset", String(offset));
      setSearchParams(searchParams);
    }
  };

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
    <AppLayout>
      <FilterProducts />
      <div className='w-full h-[78%] pb-16 md:pb-0 overflow-y-scroll md:overflow-y-hidden overflow-x-hidden flex flex-col items-center justify-start p-6 gap-y-6'>
        {isLoading ? (
          <ProductSkeleton />
        ) : dataLoaded.length > 0 ? (
          dataLoaded.map((item) => (
            <ProductCard
              key={item.id}
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
        className='pb-5 pt-3 absolute bottom-0 md:relative bg-background'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                offsetValue === 0
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
                dataLength <= 0
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
