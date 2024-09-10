import { Trash } from "lucide-react";
import { category } from "../../types/Category";
import { isPersian } from "../../utils/isPersian";
import truncateText from "../../utils/truncateText";
import { parseImages } from "../../utils/parseImages";
import AlertDialogComponent from "../common/AlertDialog";
import Loading from "../common/Loading";
import { useDeleteCategory } from "../../hooks/useCategories";
import UpdateCategory from "./UpdateCategory";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { memo, useState } from "react";
import { queryClient } from "../../providers/AppProviders";
import AvatarComponent from "../common/Avatar";

const CategoryCard = ({ category }: { category: category }) => {
  const { id, name, image } = category;
  const { isPending, mutateAsync } = useDeleteCategory();
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategoryHandler = async () => {
    await searchParams.set("categoryactive", id.toString());
    await setSearchParams(searchParams);
    queryClient.invalidateQueries({ queryKey: ["single-category"] });
  };

  const setQueryAndPushUser = () => {
    searchParams.set("categoryId", String(id));
    setSearchParams(searchParams);
    navigate({
      pathname: "/",
      search: `?${searchParams.toString()}`, // نگه داشتن کوئری‌ها
    });
  };

  return (
    <div
      onMouseEnter={() => setActiveCategory(id)}
      onMouseLeave={() => setActiveCategory(0)}
      className='w-[48%] md:min-w-56 min-w-80 max-w-96 h-56 relative rounded-lg rounded-t-xl bg-accent overflow-hidden'>
      {/* option btn */}
      <div
        className={`absolute z-20 gap-y-2 w-full h-full bg-slate-700 bg-opacity-80 flex-col items-center justify-center ${
          activeCategory == id ? "flex" : "hidden"
        }`}>
        <div
          onClick={setQueryAndPushUser}
          className='bg-transparent cursor-pointer border-b rounded-none pb-0 border-blue-500 text-blue-500'>
          مشاهده محصولات مرتبط
        </div>
        <Button
          onClick={activeCategoryHandler}
          className='px-[22px] hover:bg-accent rounded-xl bg-accent text-accent-foreground shadow-lg'>
          مشاهده جزئیات دسته بندی
        </Button>
      </div>
      {/* category image */}
      <div className='w-full flex items-center justify-center h-5/6 overflow-hidden rounded-xl'>
        <AvatarComponent
          src={parseImages(image)}
          alt={name}
          text='دسته بندی بدون تصویر'
        />
      </div>
      <div
        dir={isPersian(name) ? "rtl" : "ltr"}
        className='w-full h-1/6 relative z-30 flex items-center justify-between px-3'>
        {/* category name */}
        <p>{truncateText(name, 14)}</p>
        <div className='flex items-center absolute right-3 [&>*]:w-5 [&>*]:cursor-pointer gap-3'>
          {/* edit category */}
          <UpdateCategory
            id={id}
            name={name}
            image={image}
          />
          {/* delete category */}
          <AlertDialogComponent
            acceptBtn={isPending ? <Loading width='30' /> : "بله"}
            title='آیا از حذف این دسته بندی مطمعن هستید ؟'
            onClick={() => mutateAsync(id)}>
            <Trash className='text-rose-600' />
          </AlertDialogComponent>
        </div>
      </div>
    </div>
  );
};

export default memo(CategoryCard);
