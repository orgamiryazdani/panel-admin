import { useSearchParams } from "react-router-dom";
import Loading from "../components/common/Loading";
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

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetValue = Number(searchParams.get("offset") || 0);
  const [offset, setOffset] = useState(Number(offsetValue));
  const [dataLoaded, setDataLoaded] = useState<product[]>([]);
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

  const dataLength = data?.length || 0;

  useEffect(() => {
    if (dataLength > 0) {
      setDataLoaded(data ? data : []);
      offsetHandler();
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

  if (isLoading) return <Loading />;

  return (
    <AppLayout>
      <FilterProducts />
      <div className=' w-full h-[78%] overflow-hidden flex flex-col items-center justify-start p-6 gap-y-6'>
        {dataLoaded.length > 0 ? (
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
      <Pagination dir='ltr'>
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
