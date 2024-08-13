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
import { useState } from "react";

const FilterProducts = () => {
  const { data, isLoading } = useCategory();
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleValueChange = (value: number[]) => {
    setPriceRange(value)
  }

  const test = () => {
    console.log("amir");
  };

  return (
    <div className='w-full md:h-[10%] h-14 md:border-b mt-2 md:mt-0 flex items-center justify-end md:px-3 px-4'>
      <div className='flex w-full items-center gap-x-2 relative'>
        <Input
          type='email'
          placeholder='جستجو'
          className='md:w-[86%] w-11/12 pr-11'
          autoComplete='false'
        />
        <div className='h-8 top-1 w-10 text-muted-foreground absolute right-1 flex items-center justify-center cursor-pointer'>
          <Search className='w-5' />
        </div>
      </div>
      {/* dialog filter */}
      <DialogComponent
        title='فیلتر محصولات'
        onClick={test}
        acceptBtn="اعمال فیلتر"
        trigger={
          <Button variant='outline'>
            <span className='hidden md:flex'>فیلتر محصولات</span>
            <ListFilter className='mr-1 w-5' />
          </Button>
        }>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className="text-xs md:text-base">دسته بندی</Label>

            <Select dir='rtl'>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='یک دسته بندی انتخاب کنید' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className='h-56'>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    data?.map((category) => (
                      <SelectItem value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-between md:text-sm text-xs mt-2'>
            <span>
              قیمت از {priceRange[0]} تا {priceRange[1]} تومان
            </span>
            <Slider
              value={priceRange}
              onValueChange={handleValueChange} // مقدار جدید را در state ذخیره می‌کند
              max={100}
              step={1}
              className='w-[58%]'
            />
          </div>
        </div>
      </DialogComponent>
    </div>
  );
};

export default FilterProducts;
