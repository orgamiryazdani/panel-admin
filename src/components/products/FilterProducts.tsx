import { ListFilter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DialogComponent from "../common/Dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useCategory from "../../hooks/useCategories";
import Loading from "../common/Loading";
import { Slider } from "../ui/slider";
import { memo, Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

const FilterProducts = () => {
  const plusValueCategoryLimit = 5;
  const [categoryLimit, setCategoryLimit] = useState(plusValueCategoryLimit);
  const [searchParams, setSearchParams] = useSearchParams();
  const priceMin = Number(searchParams.get("price_min") || 1);
  const priceMax = Number(searchParams.get("price_max") || 100);
  const categoryIdQuery = Number(searchParams.get("categoryId") || "");
  const title = searchParams.get("title") || "";
  const offsetValue = Number(searchParams.get("offset") || 0);

  const {
    data,
    isLoading,
    refetch: categoryRefetch,
  } = useCategory({ limit: categoryLimit });

  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);
  const [categoryId, setCategoryId] = useState(categoryIdQuery);
  const [filterLoading, setFilterLoading] = useState(false);

  const handleValueChange = (value: number[]) => {
    setPriceRange(value);
  };

  const getMoreCategory = async () => {
    await setCategoryLimit(categoryLimit + plusValueCategoryLimit);
    categoryRefetch();
  };

  const { refetch } = useProducts({
    title,
    limit: 3,
    offset: offsetValue,
    price_min: priceMin,
    price_max: priceMax,
    categoryId,
  });

  const changeTitleHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await searchParams.set("title", e.target.value);
    await searchParams.set("offset", "0");
    await setSearchParams(searchParams);
    refetch();
  };

  const filterHandler = async () => {
    await setFilterLoading(true);
    await searchParams.set("categoryId", String(categoryId || ""));
    await searchParams.set("price_min", String(priceRange[0]));
    await searchParams.set("price_max", String(priceRange[1]));
    await searchParams.set("offset", String(0));
    await setSearchParams(searchParams);
    await refetch();
    setFilterLoading(false);
  };

  return (
    <div className='w-full md:h-[10%] min-h-12 max-h-16 h-14 md:border-b mt-2 md:mt-0 flex items-center justify-end md:px-3 px-4'>
      <div className='flex w-full items-center gap-x-2 relative'>
        {/* search title */}
        <Input
          type='email'
          placeholder='جستجو'
          className='md:w-[86%] w-11/12 pr-11'
          autoComplete='false'
          onChange={changeTitleHandler}
          value={title}
        />
        <div className='h-8 top-1 w-10 text-muted-foreground absolute right-1 flex items-center justify-center cursor-pointer'>
          <Search className='w-5' />
        </div>
      </div>
      {/* dialog filter */}
      <DialogComponent
        title='فیلتر محصولات'
        onClick={filterHandler}
        acceptBtn={filterLoading ? <Loading width='60' /> : "اعمال فیلتر"}
        trigger={
          <Button variant='outline'>
            <span className='hidden md:flex'>فیلتر محصولات</span>
            <ListFilter className='mr-1 w-5' />
          </Button>
        }>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            {/* category */}
            <Label className='text-xs md:text-base'>دسته بندی</Label>
            <Select
              dir='rtl'
              onValueChange={(value) => setCategoryId(Number(value))}
              value={String(categoryId)}>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='یک دسته بندی انتخاب کنید' />
              </SelectTrigger>
              <Suspense fallback='loading...'>
                <SelectContent>
                  <SelectGroup className='max-h-56 h-auto'>
                    <SelectItem value='0'>همه محصولات</SelectItem>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                    {data && data?.length > plusValueCategoryLimit - 1 && (
                      <div
                        onClick={getMoreCategory}
                        className='w-full text-center pb-2'>
                        <span className='text-blue-500 border-b border-blue-500 cursor-pointer'>
                          بیشتر...
                        </span>
                      </div>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Suspense>
            </Select>
          </div>
          {/* price */}
          <div className='flex items-center justify-between md:text-sm text-xs mt-2'>
            <span>
              قیمت از {priceRange[0]} تا {priceRange[1]} تومان
            </span>
            <Slider
              value={priceRange}
              onValueChange={handleValueChange} // مقدار جدید را در state ذخیره می‌کند
              max={100}
              min={1}
              step={1}
              className='w-[58%]'
            />
          </div>
        </div>
      </DialogComponent>
    </div>
  );
};

export default memo(FilterProducts);
