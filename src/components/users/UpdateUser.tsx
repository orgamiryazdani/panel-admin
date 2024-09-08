import { Edit } from "lucide-react";
import DialogComponent from "../common/Dialog";
import ImageUploader from "../ImageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Loading from "../common/Loading";
import { memo, useState } from "react";
import { parseImages } from "../../utils/parseImages";
import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserType } from "../../types/Auth";
import { useUpdateUser } from "../../hooks/useUsers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import truncateText from "../../utils/truncateText";

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
    }),
  password: z
    .string()
    .refine((val) => val.length > 0, {
      message: "وارد کردن رمز عبور اجباری است",
    })
    .refine((val) => val.length >= 4 || val.length === 0, {
      message: "رمز عبور باید حداقل ۴ حرف یا عدد باشد",
    }),
});

const formItems = [
  { id: 1, name: "name", type: "text", label: "نام" },
  { id: 2, name: "email", type: "email", label: "ایمیل" },
  { id: 3, name: "password", type: "text", label: "رمز عبور" },
];

const UpdateUser = ({ id, name, avatar, email, role, password }: UserType) => {
  const [images, setImages] = useState<string[]>(parseImages([avatar] || []));
  const [userRole, setUserRole] = useState(role);

  const { toast } = useToast();
  const { mutateAsync, isPending } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email,
      password,
    },
  });

  const onSubmit = async (data: Omit<UserType, "role" | "avatar" | "id">) => {
    const image = images[0];
    if (image) {
      mutateAsync({ id, avatar: image, role: userRole, ...data });
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
        title='ویراش کاربر'
        description={truncateText(name,20)}
        acceptBtn={isPending ? <Loading width='80' /> : "ذخیره تغییرات"}
        onClick={form.handleSubmit(onSubmit)}
        trigger={<Edit className='cursor-pointer w-[19px]' />}>
        <Tabs
          defaultValue='info'
          className='grid-cols-4'
          dir='rtl'>
          {/* change tab btn */}
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='info'>اطلاعات</TabsTrigger>
            <TabsTrigger value='image'>پروفایل</TabsTrigger>
          </TabsList>
          {/* image tab */}
          <TabsContent value='image'>
            <ImageUploader
              images={images}
              setImages={setImages}
              direction='vertical'
              minImage={0}
              maxImage={1}
            />
          </TabsContent>
          {/* info tab*/}
          <TabsContent value='info'>
            {formItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.name as "name" | "email" | "password"}
                render={({ field }) => (
                  <FormItem className='w-full flex items-center justify-between'>
                    <FormLabel htmlFor='title'>{item.label}</FormLabel>
                    <div className='w-5/6'>
                      <FormControl>
                        <Input
                          type={item.type}
                          className='rounded-lg mb-1'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ))}
            {/* switch */}
            <div
              className='flex items-center space-x-2 w-full justify-between mt-4 pl-1 mb-2'
              dir='ltr'>
              <Switch
                showIcon={false}
                onToggle={() =>
                  setUserRole(userRole == "customer" ? "admin" : "customer")
                }
                checked={userRole == "admin" ? true : false}
              />
              <Label
                htmlFor='role'
                className='text-base'>
                تغییر نقش کاربر به
                <span
                  className={`font-bold ${
                    userRole == "customer" ? "text-yellow-500" : "text-blue-500"
                  }`}>
                  {userRole == "admin" ? " مشتری" : " ادمین"}
                </span>
              </Label>
            </div>
          </TabsContent>
        </Tabs>
      </DialogComponent>
    </Form>
  );
};

export default memo(UpdateUser);
