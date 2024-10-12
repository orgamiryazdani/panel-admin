import { lazy, Suspense, useState } from "react";
import CategoryCard from "../components/category/CategoryCard";
import {
  CategorySkeleton,
  SingleCategorySkeleton,
} from "../components/common/Skeleton";
import useCategory from "../hooks/useCategories";
import AppLayout from "../layouts/AppLayout";
const CategoryDetail = lazy(
  () => import("../components/category/CategoryDetail"),
);

const Category = () => {
  const plusValueCategoryLimit = 5;
  const [categoryLimit, setCategoryLimit] = useState(plusValueCategoryLimit);

  const { data, isLoading, refetch } = useCategory({
    limit: categoryLimit,
  });

  const getMoreUser = async () => {
    await setCategoryLimit(categoryLimit + plusValueCategoryLimit);
    refetch();
  };

  return (
    <AppLayout
      sidebar={
        <Suspense fallback={<SingleCategorySkeleton />}>
          <CategoryDetail />
        </Suspense>
      }>
      <div className='w-full h-full'>
        <div className='w-full h-[10%] max-h-16 text-xs lg:text-base min-h-12 border-b flex items-center justify-center'>
          با کلیک روی دسته بندی میتوانید محصولات مرتبط به آن را ببینید
        </div>
        <div className='w-full h-[90%] overflow-y-auto flex items-center justify-center flex-wrap gap-4 py-4 px-2'>
          {isLoading ? (
            <CategorySkeleton />
          ) : !data ? (
            <span>دسته بندی وجود ندارد</span>
          ) : (
            data?.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))
          )}
          {data && data?.length > plusValueCategoryLimit - 1 && (
            <div
              onClick={getMoreUser}
              className='w-full text-center mb-2'>
              <span className='text-blue-500 border-b border-blue-500 cursor-pointer'>
                بیشتر...
              </span>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Category;
