import { useEffect, useState } from "react";
import ImageUploader from "../ImageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useCreateCategory } from "../../hooks/useCategories";
import Loading from "../common/Loading";
import { useToast } from "../ui/use-toast";
import {
  categoryDataType,
  useCategoryDemo,
} from "../../context/CategoryDemoProvider";
import HeaderBuilderPage from "../common/HeaderBuilderPage";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "وارد کردن عنوان اجباری است",
    })
    .transform((val) => val.trim()),
});

const CreateCategoryForm = () => {
  const [image, setImage] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { toast } = useToast();
  const { mutateAsync, isPending } = useCreateCategory();
  const { updateCategoryDemoField } = useCategoryDemo();

  useEffect(() => {
    updateCategoryDemoField("image", image);
  }, [image]);

  const onSubmit = (data: { name: string }) => {
    if (image.length == 0) {
      toast({
        variant: "destructive",
        title: "حداقل یک تصویر اضافه کنید",
      });
      return;
    }
    const getOneImage = image[0];
    mutateAsync({ image: getOneImage, ...data });
  };

  return (
    <div className='w-full h-full'>
      <HeaderBuilderPage text='اطلاعات دسته بندی خود را وارد کنید' />
      <div className='w-full h-[90%] overflow-y-auto px-4'>
        <ImageUploader
          images={image}
          setImages={setImage}
          direction='vertical'
          maxImage={1}
          minImage={1}
          height='h-96'
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-9 mb-5 md:mb-2 mt-3 md:mt-5 w-full'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center justify-center relative'>
                    <FormControl className='mt-2'>
                      <Input
                        type='text'
                        placeholder='عنوان دسته بندی'
                        className='rounded-lg !bg-accent'
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateCategoryDemoField(
                            "name" as keyof categoryDataType,
                            e.target.value,
                          );
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
                "ایجاد دسته بندی"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
