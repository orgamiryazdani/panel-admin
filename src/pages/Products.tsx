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
  const offsetValue = searchParams.get("offset") || 0;
  const [offset, setOffset] = useState(Number(offsetValue));
  const [dataLoaded, setDataLoaded] = useState<product[]>([]);

  const { data, isLoading, refetch } = useProducts({
    limit: 3,
    offset: offset,
  });

  const offsetHandler = () => {
    const dataLength = data?.length || 0;
    if (dataLength > 0) {
      setDataLoaded(data ? data : []);
      searchParams.set("offset", String(offset + 3));
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    offsetHandler();
  }, [data]);

  const getNewData = async () => {
    await setOffset((prev) => prev + 3);
    await refetch();
  };

  if (isLoading) return <Loading />;

  return (
    <AppLayout>
      <FilterProducts />
      <div className=' w-full h-full overflow-hidden flex flex-col items-center justify-start p-6 gap-y-5'>
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

        {/* pagination */}
        <Pagination
          dir='ltr'
          className='mt-5'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className='cursor-pointer'
                onClick={getNewData}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>{offsetValue}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className='cursor-pointer'
                onClick={getNewData}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AppLayout>
  );
};

export default Products;
