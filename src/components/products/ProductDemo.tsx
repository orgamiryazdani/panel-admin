import { Ellipsis } from "lucide-react";
import { isPersian } from "../../utils/isPersian";
import truncateText from "../../utils/truncateText";
import { useProductDemo } from "../../context/ProductDemoContext";
import { useState } from "react";
import { parseImages } from "../../utils/parseImages";

const ProductDemo = () => {
  const { productDemoData } = useProductDemo();
  const [productActive, setProductActive] = useState(true);

  return (
    <div className='space-y-5 w-full'>
      <div
        className={`w-full min-w-72 max-h-32 h-32 flex border rounded-xl
        ${
          isPersian(productDemoData.title || "فارسی")
            ? "rounded-r-2xl"
            : "rounded-l-2xl"
        }
         ${productActive && "bg-accent"}`}
        dir={isPersian(productDemoData.title || "فارسی") ? "rtl" : "ltr"}>
        <div className='md:w-52 w-32 p-0 cursor-pointer'>
          <img
            onClick={() => setProductActive(!productActive)}
            src={
              parseImages(productDemoData.images)[0] ||
              "https://hashtagyar.com/adminz-conten/uploads/2023/12/97.jpg"
            }
            alt='Photo by Drew Beamer'
            className={`object-cover h-full w-full rounded-2xl ${
              !productActive && "p-2"
            }`}
          />
        </div>

        <div
          onClick={() => setProductActive(!productActive)}
          className='w-2/4 p-3 pt-3 cursor-pointer'>
          <div className='text-[22px] h-8 overflow-hidden'>
            {truncateText(productDemoData.title, 26) || "عنوان"}
          </div>
          <div className='mt-1 text-[13px] h-[60px] overflow-hidden'>
            {truncateText(productDemoData.description, 100) ||
              " توضیحات محصول شما"}
          </div>
        </div>

        <div className='flex justify-between w-1/4 px-2 flex-col items-end pb-2 pt-1'>
          {/* delete and edit */}
          <Ellipsis className='cursor-pointer' />

          {/* price, category and option */}
          <div className='gap-y-1 flex flex-col items-end'>
            <p
              className={`text-sm text-green-500 px-1 flex gap-x-[2px] ${
                isPersian(productDemoData.title || "فارسی") &&
                "flex-row-reverse"
              }`}>
              <span>$</span> {truncateText(productDemoData.price, 4) || 0}
            </p>
            <div
              dir='ltr'
              className='text-[9px] bg-primary-foreground rounded-md p-2 cursor-pointer'>
              # {truncateText(productDemoData.categoryId, 20) || "دسته بندی"}
            </div>
          </div>
        </div>
      </div>
      {/* <ProductDetails /> */}
    </div>
  );
};

export default ProductDemo;
