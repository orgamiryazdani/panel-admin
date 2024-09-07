import CategoryCard from "../components/category/CtegoryCard";
import Loading from "../components/common/Loading";
import useCategory from "../hooks/useCategories";
import AppLayout from "../layouts/AppLayout";

const Category = () => {
  const { data, isLoading } = useCategory();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppLayout sidebar={<p>ایشالا بعد خدمت</p>}>
      <div className='w-full h-full'>
        <div className='w-full h-[10%] min-h-12 border-b flex items-center justify-center'>
          با کلیک روی دسته بندی میتوانید محصولات مرتبط به آن را ببینید
        </div>
        <div className='w-full h-[90%] overflow-y-auto flex items-center justify-center flex-wrap gap-4 py-4 px-2'>
          {data?.map((category)=>(
            <CategoryCard key={category.id} category={category}/>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Category;
