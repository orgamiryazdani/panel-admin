import { z } from "zod";
import HeaderBuilderPage from "../common/HeaderBuilderPage";
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
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { UserType } from "../../types/Auth";
import { Button } from "../ui/button";
import ImageUploader from "../ImageUploader";
import Loading from "../common/Loading";
import { useCreateUser } from "../../hooks/useUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUserDemo } from "../../context/UserDemoProvider";

const formItems = [
  { id: 1, name: "name", type: "text", placeholder: "نام کاربر" },
  { id: 2, name: "email", type: "email", placeholder: "ایمیل کاربر" },
  { id: 3, name: "password", type: "password", placeholder: "رمز عبور" },
];

const roleUserItem = [
  { id: 1, role: "admin", text: "ادمین" },
  { id: 2, role: "customer", text: "مشتری" },
];

const formSchema = z.object({
  name: z.string().min(1, {
    message: "وارد کردن نام اجباری است",
  }),
  email: z
    .string()
    .min(1, {
      message: "وارد کردن ایمیل اجباری است",
    })
    .email({
      message: "فرمت ایمیل وارد شده صحیح نیست",
    })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .refine((val) => val.length > 0, {
      message: "وارد کردن رمز عبور اجباری است",
    })
    .refine((val) => val.length >= 4 || val.length === 0, {
      message: "رمز عبور باید حداقل ۴ حرف یا عدد باشد",
    })
    .transform((val) => val.trim()),
  role: z.string().min(1, {
    message: "انتخاب نقش کاربر اجباری است",
  }),
});

const CreateUserForm = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<string[]>([]);
  const { mutateAsync, isPending } = useCreateUser();
  const { updateUserDemoField } = useUserDemo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  useEffect(() => {
    updateUserDemoField("avatar", image);
  }, [image]);

  const onSubmit = async (data: Omit<UserType, "id" | "avatar">) => {
    if (image.length === 0) {
      toast({
        variant: "destructive",
        title: "حداقل یک عکس اضافه کنید",
      });
      return;
    }
    const profile = image[0];
    mutateAsync({ avatar: profile, ...data });
  };

  return (
    <div className='w-full h-full'>
      <HeaderBuilderPage text='اطلاعات کاربر خود را وارد کنید' />
      <div className='w-full h-[90%] overflow-y-auto px-4'>
        {/* image uploader */}
        <ImageUploader
          images={image}
          setImages={setImage}
          maxImage={1}
          minImage={1}
        />
        {/* input */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-10 md:mt-5 mt-7 w-full mb-5'>
            {formItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.name as "name" | "email" | "password" | "role"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={item.type}
                        className='rounded-lg'
                        placeholder={item.placeholder}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updateUserDemoField(
                            item.name as keyof Omit<UserType, "id">,
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
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateUserDemoField("role", value);
                      }}
                      value={field.value}>
                      <SelectTrigger
                        className='w-full'
                        dir='rtl'>
                        <SelectValue placeholder='یک نقش برای کاربر انتخاب کنید' />
                      </SelectTrigger>
                      <SelectContent dir='rtl'>
                        <SelectGroup className='max-h-56'>
                          {roleUserItem.map((role) => (
                            <SelectItem
                              key={role.id}
                              value={String(role.role)}>
                              {role.text}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                "ایجاد کاربر"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserForm;
