import { useForm } from "react-hook-form";
import DialogComponent from "../common/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { parseImages } from "../../utils/parseImages";
import Loading from "../common/Loading";
import { Edit } from "lucide-react";
import ImageUploader from "../ImageUploader";
import { useUpdateCategory } from "../../hooks/useCategories";
import { category } from "../../types/Category";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "وارد کردن عنوان اجباری است",
  }),
});

const UpdateCategory = ({ id, name, image }: category) => {
  const [images, setImages] = useState<string[]>(parseImages([image] || []));

  const { toast } = useToast();
  const { mutateAsync, isPending } = useUpdateCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (data: { name: string }) => {
    const image = images[0];
    if (image) {
      mutateAsync({ id, image, ...data });
    } else {
      toast({
        title: "حداقل 1 تصویر انتخاب کنید",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <DialogComponent
        title='ویراش محصول'
        description={name}
        acceptBtn={isPending ? <Loading width='80' /> : "ذخیره تغییرات"}
        onClick={form.handleSubmit(onSubmit)}
        trigger={<Edit className='w-5' />}>
        {/* image tab */}
        <ImageUploader
          images={images}
          setImages={setImages}
          direction='vertical'
          minImage={0}
          maxImage={1}
        />
        {/* info tab */}

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <div className='flex items-center justify-between w-full gap-x-10'>
                <FormLabel htmlFor='title'>عنوان</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    id='name'
                    {...field}
                    placeholder='عنوان را وارد کنید'
                  />
                </FormControl>
              </div>
              <FormMessage className='mr-[72px] pt-1' />
            </FormItem>
          )}
        />
      </DialogComponent>
    </Form>
  );
};

export default UpdateCategory;
