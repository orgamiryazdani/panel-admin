import { Trash } from "lucide-react";
import { category } from "../../types/Category";
import { isPersian } from "../../utils/isPersian";
import truncateText from "../../utils/truncateText";
import { parseImages } from "../../utils/parseImages";
import AlertDialogComponent from "../common/AlertDialog";
import Loading from "../common/Loading";
import { useDeleteCategory } from "../../hooks/useCategories";
import UpdateCategory from "./UpdateCategory";

const CategoryCard = ({ category }: { category: category }) => {
  const { id, name, image } = category;

  const { isPending, mutateAsync } = useDeleteCategory();

  return (
    <div className='w-[48%] min-w-54 max-w-96 h-56 rounded-lg rounded-t-xl bg-accent overflow-hidden'>
      {/* category image */}
      <div className='w-full h-5/6'>
        <img
          className='bg-cover rounded-xl w-full h-full'
          src={parseImages(image)}
          alt={name}
        />
      </div>
      <div
        dir={isPersian(name) ? "rtl" : "ltr"}
        className='w-full h-1/6 flex items-center justify-between px-3'>
        {/* category name */}
        <p>{truncateText(name, 14)}</p>
        <div className='flex items-center [&>*]:w-5 [&>*]:cursor-pointer gap-3'>
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

export default CategoryCard;
