import { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader";
import { parseImages } from "../../utils/parseImages";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loading from "../common/Loading";
import useCategory from "../../hooks/useCategories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { createProductType } from "../../types/Product";
import { useCreateProduct } from "../../hooks/useProducts";
import { useToast } from "../ui/use-toast";
import { useProductDemo } from "../../context/ProductDemoProvider"; // Import the context

const formSchema = z.object({
  title: z.string().min(1, {
    message: "وارد کردن عنوان اجباری است",
  }),
  price: z.string().min(1, {
    message: "وارد کردن قیمت اجباری است",
  }),
  description: z.string().min(1, {
    message: "وارد کردن توضیحات اجباری است",
  }),
  categoryId: z.string().min(1, {
    message: "انتخاب دسته‌بندی اجباری است",
  }),
});

const formItems = [
  { id: 1, name: "title", type: "text", placeholder: "عنوان" },
  { id: 2, name: "price", type: "number", placeholder: "قیمت" },
];

const CreateProductForm = () => {
  const plusValueCategoryLimit = 5;
  const [categoryLimit, setCategoryLimit] = useState(plusValueCategoryLimit);
  const { updateProductDemoField } = useProductDemo();
  const [images, setImages] = useState<string[]>(parseImages([]));
  const { data, isLoading, refetch } = useCategory({ limit: categoryLimit });
  const { mutateAsync, isPending } = useCreateProduct();
  const { toast } = useToast();

  useEffect(() => {
    updateProductDemoField("images", images);
  }, [images]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: Omit<createProductType, "images">) => {
    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "حداقل یک عکس اضافه کنید",
      });
      return;
    }
    mutateAsync({ images, ...data });
  };

  const getMoreCategory = async () => {
    await setCategoryLimit(categoryLimit + plusValueCategoryLimit);
    refetch();
  };

  return (
    <div className='w-full h-full'>
      <div className='w-full flex flex-row justify-between items-center px-4 h-[10%] min-h-12 border-b'>
        <span className='font-bold text-sm md:text-[9px] lg:text-base'>
          اطلاعات محصول خود را وارد کنید
        </span>
        <div className='bg-muted p-[10px] text-xs rounded-md lg:text-xs md:text-[7px] flex items-center gap-x-2'>
          مشاهده نتیجه بصورت زنده
          <span className=' w-2 h-2 bg-red-500 rounded-full'></span>
        </div>
      </div>
      <div className='w-full h-[90%] px-5 overflow-auto'>
        <ImageUploader
          images={images}
          setImages={setImages}
          direction='horizontal'
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-[22px] md:mt-5 mt-7 w-full mb-5 md:mb-0'>
            <div className='flex flex-col gap-y-[22px] md:gap-y-0 md:flex-row items-center gap-x-4 justify-between'>
              {formItems.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={item.name as "title" | "price"}
                  render={({ field }) => (
                    <FormItem className='md:w-1/2 w-full'>
                      <FormControl>
                        <Input
                          type={item.type}
                          className='rounded-lg'
                          placeholder={item.placeholder}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            updateProductDemoField(
                              item.name as keyof createProductType,
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateProductDemoField("categoryId", value);
                      }}
                      value={field.value}>
                      <SelectTrigger
                        className='w-full'
                        dir='rtl'>
                        <SelectValue placeholder='یک دسته بندی انتخاب کنید' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className='max-h-56'>
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
                          {data &&
                            data?.length > plusValueCategoryLimit - 1 && (
                              <div
                                dir='rtl'
                                onClick={getMoreCategory}
                                className='w-full text-center pb-2'>
                                <span className='text-blue-500 border-b border-blue-500 cursor-pointer'>
                                  بیشتر...
                                </span>
                              </div>
                            )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <div className='flex items-center justify-between w-full gap-x-5'>
                    <FormControl>
                      <Textarea
                        className='w-full h-28'
                        id='description'
                        {...field}
                        placeholder='توضیحات'
                        onChange={(e) => {
                          field.onChange(e);
                          updateProductDemoField("description", e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full text-lg'>
              {isPending ? (
                <Loading
                  width='55'
                  height='21'
                />
              ) : (
                "اضافه کردن محصول"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProductForm;
