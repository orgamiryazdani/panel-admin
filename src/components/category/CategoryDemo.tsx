import {
  categoryDataType,
  useCategoryDemo,
} from "../../context/CategoryDemoProvider";
import { isPersian } from "../../utils/isPersian";
import truncateText from "../../utils/truncateText";
import imageDefault from "../../../public/images/imageDefault.webp";

const CategoryDemo = () => {
  const { categoryDemoData } = useCategoryDemo();

  return (
    <div className='w-full h-auto flex items-center justify-start flex-col gap-y-5'>
      <span className='w-full border-b pb-1'>دمو توضیحات دسته بندی</span>
      <CategoryDetailDemo categoryDemoData={categoryDemoData} />
      <span className='w-full border-b pb-1'>دمو کارت دسته بندی</span>
      <CategoryCardDemo categoryDemoData={categoryDemoData} />
    </div>
  );
};

export default CategoryDemo;

const CategoryCardDemo = ({
  categoryDemoData,
}: {
  categoryDemoData: categoryDataType;
}) => {
  return (
    <div className='w-full max-w-80 rounded-lg bg-accent h-56 overflow-hidden'>
      <img
        className='w-full h-5/6 object-cover rounded-b-2xl'
        src={
          typeof categoryDemoData.image === "string"
            ? categoryDemoData.image
            : categoryDemoData.image.length > 0
            ? categoryDemoData.image[0] // استفاده از اولین تصویر در آرایه
            : imageDefault
        }
        alt={categoryDemoData.name || "عکس دیفالت"}
      />
      <p
        className={`w-full flex items-center ${
          isPersian(categoryDemoData.name || "عنوان")
            ? "justify-start"
            : "justify-end"
        } px-2 h-1/6`}
        dir={isPersian("test") ? "ltr" : "rtl"}>
        {truncateText(categoryDemoData.name, 20) || "عنوان دسته بندی شما"}
      </p>
    </div>
  );
};

const CategoryDetailDemo = ({
  categoryDemoData,
}: {
  categoryDemoData: categoryDataType;
}) => {
  return (
    <div className='w-full h-auto flex items-center justify-start flex-col px-2'>
      <div className='w-full'>
        {/* image */}
        <img
          className='w-full h-5/6 object-cover rounded-2xl'
          src={
            typeof categoryDemoData.image === "string"
              ? categoryDemoData.image
              : categoryDemoData.image.length > 0
              ? categoryDemoData.image[0] // استفاده از اولین تصویر در آرایه
              : imageDefault
          }
          alt={categoryDemoData.name || "عکس دیفالت"}
        />
        {/* info */}
        <div className='mt-7'>دسته بندی شماره ...؟</div>
        <div
          dir={isPersian(categoryDemoData.name || "عنوان") ? "rtl" : "ltr"}
          className='w-full flex items-start justify-between mt-5'>
          <p className='text-xl font-bold mt-0 w-3/6'>
            {categoryDemoData.name || "عنوان دسته بندی شما"}
          </p>
          <div className='cursor-not-allowed border-b rounded-none pb-0 border-blue-500 text-blue-500'>
            مشاهده محصولات مرتبط
          </div>
        </div>
      </div>
    </div>
  );
};
