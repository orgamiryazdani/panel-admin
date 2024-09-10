import { Ellipsis } from "lucide-react";
import { isPersian } from "../../utils/isPersian";
import truncateText from "../../utils/truncateText";
import { useProductDemo } from "../../context/ProductDemoContext";
import { useEffect, useState } from "react";
import { parseImages } from "../../utils/parseImages";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useSingleCategory } from "../../hooks/useCategories";
import Loading from "../common/Loading";
import { createProductType } from "../../types/Product";

const ProductDemo = () => {
  const { productDemoData } = useProductDemo();
  const {
    data: category,
    isLoading,
    refetch,
  } = useSingleCategory({ id: Number(productDemoData.categoryId) });

  useEffect(() => {
    if (productDemoData.categoryId) {
      refetch(); // فقط وقتی که categoryId تغییر می‌کند، refetch را فراخوانی کنید
    }
  }, [productDemoData.categoryId, refetch]);

  return (
    <div className='space-y-5 w-full'>
      <div className='w-full border-b pb-1'>دمو کارت محصول</div>
      <ProductCard
        productDemoData={productDemoData}
        category={category || []}
        isLoading={isLoading}
      />
      <div className='w-full border-b pb-1'>دمو توضیحات محصول</div>
      <ProductDetail
        productDemoData={productDemoData}
        category={category || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductDemo;

type dataComponentProduct = {
  productDemoData: createProductType;
  category:
    | {
        id: number;
        name: string;
        image: string;
      }
    | [];
  isLoading: boolean;
};

function ProductCard({
  productDemoData,
  category,
  isLoading,
}: dataComponentProduct) {
  const [productActive, setProductActive] = useState(true);
  return (
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
              isPersian(productDemoData.title || "فارسی") && "flex-row-reverse"
            }`}>
            <span>$</span> {truncateText(productDemoData.price, 4) || 0}
          </p>
          <div
            dir='ltr'
            className='text-[9px] bg-primary-foreground flex items-center rounded-md p-2 cursor-pointer'>
            #{" "}
            {isLoading ? (
              <Loading
                width='35'
                height='5'
              />
            ) : Array.isArray(category) ? (
              "دسته بندی"
            ) : (
              truncateText(category.name, 20)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({
  productDemoData,
  category,
  isLoading,
}: dataComponentProduct) {
  return (
    <div className='w-full h-auto flex items-center justify-start flex-col'>
      <>
        {/* Carousel */}
        <Carousel
          className='relative w-full'
          dir='ltr'>
          <CarouselContent>
            {productDemoData.images.length > 0 ? (
              productDemoData.images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <Card className='min-h-60 overflow-hidden'>
                    <CardContent className='p-0 h-full w-full'>
                      <img
                        className='h-full w-full object-cover'
                        src={image}
                        alt={productDemoData?.title}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <Card className='min-h-60 overflow-hidden'>
                  <CardContent className='p-0 h-full w-full'>
                    <img
                      className='h-full w-full object-cover'
                      src='https://hashtagyar.com/adminz-conten/uploads/2023/12/97.jpg'
                      alt={productDemoData?.title}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className='absolute right-20 bottom-8'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        {/* info */}
        <div
          dir={isPersian(productDemoData?.title || "عنوان") ? "rtl" : "ltr"}
          className='w-full'>
          <p className='text-xl font-bold mt-3'>
            {productDemoData?.title || "عنوان"}
          </p>
          <p className='text-sm my-2'>
            {productDemoData?.description || "توضیحات محصول شما"}
          </p>
          <div
            className='full flex items-end justify-between mt-4'
            dir='ltr'>
            <div className='w-auto bg-accent h-auto rounded-md flex items-center'>
              <img
                className='w-10 h-10 rounded-md'
                src={
                  isLoading
                    ? "https://hashtagyar.com/adminz-conten/uploads/2023/12/97.jpg"
                    : Array.isArray(category)
                    ? "https://hashtagyar.com/adminz-conten/uploads/2023/12/97.jpg"
                    : category.image
                }
                alt={
                  isLoading
                    ? "دسته بندی"
                    : Array.isArray(category)
                    ? "دسته بندی"
                    : category.name
                }
              />
              <p className='px-2 text-sm flex items-center text-muted-foreground'>
                #{" "}
                {isLoading ? (
                  <Loading
                    width='45'
                    height='5'
                  />
                ) : Array.isArray(category) ? (
                  "دسته بندی"
                ) : (
                  category.name
                )}
              </p>
            </div>
            <p className='text-green-500 text-xl'>
              $ {productDemoData?.price || 0}
            </p>
          </div>
        </div>
      </>
    </div>
  );
}
