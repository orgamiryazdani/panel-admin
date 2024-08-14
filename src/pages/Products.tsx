import Loading from "../components/common/Loading";
import FilterProducts from "../components/products/FilterProducts";
import ProductCard from "../components/products/ProductCard";
import useProducts from "../hooks/useProducts";
import AppLayout from "../layouts/AppLayout";

const Products = () => {
  const { data, isLoading } = useProducts();
  
  if (isLoading) return <Loading />;
  return (
    <AppLayout>
      <FilterProducts />
      <div className=' w-full h-full overflow-hidden flex flex-col items-center justify-start p-6 gap-y-5'>
        {data?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Products;
