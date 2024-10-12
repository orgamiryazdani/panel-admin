import { DemoProductSkeleton } from "../components/common/Skeleton";
import CreateProductForm from "../components/products/CreateProductForm";
import AppLayout from "../layouts/AppLayout";
import { lazy, Suspense } from "react";
const ProductDemo = lazy(() => import("../components/products/ProductDemo"));

const CreateProduct = () => {
  return (
    <AppLayout
      sidebar={
        <Suspense fallback={<DemoProductSkeleton />}>
          <ProductDemo />
        </Suspense>
      }>
      <div className='w-full h-full'>
        <CreateProductForm />
      </div>
    </AppLayout>
  );
};

export default CreateProduct;
