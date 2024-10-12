import { useNavigate, useSearchParams } from "react-router-dom";
import { useSingleCategory } from "../../hooks/useCategories";
import { SingleCategorySkeleton } from "../common/Skeleton";
import { parseImages } from "../../utils/parseImages";
import { isPersian } from "../../utils/isPersian";
import AvatarComponent from "../common/Avatar";

const CategoryDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryActive = Number(searchParams.get("categoryactive")) || 1;
  const { data, isLoading } = useSingleCategory({
    id: categoryActive,
    enabledValue: true,
  });
  const navigate = useNavigate();

  const setQueryAndPushUser = () => {
    searchParams.set("categoryId", String(categoryActive));
    setSearchParams(searchParams);
    navigate({
      pathname: "/",
      search: `?${searchParams.toString()}`, // نگه داشتن کوئری‌ها
    });
  };

  return (
    <div className='w-full h-auto flex items-center justify-start flex-col'>
      {isLoading ? (
        <SingleCategorySkeleton />
      ) : !data ? (
        <p>لطفا یک دسته بندی انتخاب کنید</p>
      ) : (
        <div className='w-full'>
          {/* image */}
          <AvatarComponent
            src={parseImages(data?.image)}
            alt={data?.name}
            text='دسته بندی بدون تصویر'
          />
          {/* info */}
          <div className='mt-7'>دسته بندی شماره {data?.id}</div>
          <div
            dir={isPersian(data?.name || "") ? "rtl" : "ltr"}
            className='w-full flex items-start justify-between mt-5'>
            <p className='text-xl font-bold mt-0 w-3/6'>{data?.name}</p>
            <div
              onClick={setQueryAndPushUser}
              className='cursor-pointer border-b rounded-none pb-0 border-blue-500 text-blue-500'>
              مشاهده محصولات مرتبط
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
