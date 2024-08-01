import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useSignIn } from "../../../hooks/useUsers";
import { dataLoginType, UserAccount } from "../../../types/Auth";
import Loading from "../../common/Loading";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { cleanupOldAccounts } from "../../../utils/cleanupOldAccounts";

const formSchema = z.object({
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

const SignInForm = () => {
  const { mutateAsync, isPending } = useSignIn();
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    cleanupOldAccounts(); // فراخوانی تابع پاکسازی
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: dataLoginType) => {
    const accounts: UserAccount[] = JSON.parse(
      localStorage.getItem("AllEmailAccount") || "[]",
    );

    const updatedAccounts = [
      ...accounts.filter((account) => account.email !== data.email),
      { email: data.email, selected: false, addedTime: Date.now() }, // افزودن تایم‌استمپ
    ];
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));

    try {
      await mutateAsync(data);

      updatedAccounts.forEach((account) => {
        account.selected = account.email === data.email;
      });
      localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
    } catch {
      localStorage.setItem("AllEmailAccount", JSON.stringify(accounts));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 mt-10 md:w-4/6 w-5/6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='john@mail.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-center relative'>
                <FormControl className='mt-2'>
                  <Input
                    type={showPassword ? "password" : "text"}
                    placeholder='changeme'
                    {...field}
                  />
                </FormControl>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className='h-8 top-3 w-10 [&>*]:w-5 absolute left-1 bg-transparent flex items-center justify-center cursor-pointer'>
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
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
            "ورود"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;