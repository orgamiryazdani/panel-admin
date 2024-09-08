import { Edit } from "lucide-react";
import DialogComponent from "../common/Dialog";
import Loading from "../common/Loading";
import ImageUploader from "../ImageUploader";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useUpdateProduct } from "../../hooks/useProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseImages } from "../../utils/parseImages";
import { memo, useState } from "react";
import { product } from "../../types/Product";
import truncateText from "../../utils/truncateText";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "وارد کردن عنوان اجباری است",
  }),
  description: z
    .string()
    .min(1, {
      message: "وارد کردن توضیحات اجباری است",
    }),
  price: z.number().min(1, {
    message: "وارد کردن قیمت اجباری است",
  }),
});

const UpdateProduct = ({
  id,
  title,
  description,
  price,
  images: img,
}: Omit<product, "category">) => {
  const { mutateAsync: mutateUpdateProduct, isPending: updatePending } =
    useUpdateProduct();

  const [images, setImages] = useState<string[]>(parseImages(img || []));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
      price,
    },
  });

  const onSubmit = async (
    data: Omit<product, "id" | "images" | "category">,
  ) => {
    mutateUpdateProduct({ id, images, ...data });
  };

  return (
    <Form {...form}>
      <DialogComponent
        title='ویراش محصول'
        description={truncateText(title,20)}
        acceptBtn={updatePending ? <Loading width='80' /> : "ذخیره تغییرات"}
        onClick={form.handleSubmit(onSubmit)}
        trigger={
          <div className='w-5/6 md:w-full flex items-center gap-x-2 h-10 p-2 rounded-md mt-5 mb-7 bg-accent text-accent-foreground cursor-pointer'>
            <Edit className='w-[22.5px]' />
            <span>ویراش محصول</span>
          </div>
        }>
        <Tabs
          defaultValue='info'
          className='grid-cols-4'
          dir='rtl'>
          {/* change tab btn */}
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='info'>اطلاعات</TabsTrigger>
            <TabsTrigger value='image'>تصاویر</TabsTrigger>
          </TabsList>
          {/* image tab */}
          <TabsContent value='image'>
            <ImageUploader
              images={images}
              setImages={setImages}
              direction="vertical"
              maxImage={6}
            />
          </TabsContent>
          {/* info tab */}
          <TabsContent
            className='grid gap-4 py-4'
            value='info'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <div className='flex items-center justify-between w-full gap-x-10'>
                    <FormLabel htmlFor='title'>عنوان</FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        id='title'
                        {...field}
                        placeholder='عنوان را وارد کنید'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mr-[72px] pt-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <div className='flex items-center justify-between w-full gap-x-10'>
                    <FormLabel htmlFor='price'>قیمت</FormLabel>
                    <FormControl>
                      <Input
                        className='w-full'
                        id='price'
                        type='number'
                        {...field}
                        placeholder='قیمت را وارد کنید'
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mr-[72px] pt-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <div className='flex items-center justify-between w-full gap-x-5'>
                    <FormLabel htmlFor='description'>توضیحات</FormLabel>
                    <FormControl>
                      <Textarea
                        className='w-full h-28'
                        id='description'
                        {...field}
                        placeholder='توضیحات را وارد کنید'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mr-[72px] pt-1' />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </DialogComponent>
    </Form>
  );
};

export default memo(UpdateProduct);
