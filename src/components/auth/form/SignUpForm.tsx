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
import { useSignUp } from "../../../hooks/useUsers";
import { dataSignUpType } from "../../../types/Auth";
import Loading from "../../common/Loading";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  name: z
    .string()
    .refine((val) => val.length > 0, {
      message: "وارد کردن نام اجباری است",
    })
    .refine((val) => val.length >= 3 || val.length === 0, {
      message: "نام شما باید حداقل 3 حرف باشد",
    }),
});

const SignUpForm = ({
  setTabValue,
}: {
  setTabValue: Dispatch<SetStateAction<string>>;
}) => {
  const { mutateAsync, isPending } = useSignUp();
  const [showPassword, setShowPassword] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(data: dataSignUpType) {
    try {
      await mutateAsync(data);
      setTabValue("signin");
    } catch {
      setTabValue("signup");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-7 mt-9 w-full'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='نام'
                  className='rounded-lg !bg-accent !ring-0 focus:border-violet-900'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='ایمیل'
                  className='rounded-lg !bg-accent !ring-0 focus:border-violet-900'
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
                <FormControl className='mt-0'>
                  <Input
                    type={showPassword ? "password" : "text"}
                    placeholder='رمز عبور'
                    className='rounded-lg !bg-accent !ring-0 focus:border-violet-900'
                    {...field}
                  />
                </FormControl>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className='h-8 top-1 w-10 [&>*]:w-5 absolute left-1 bg-accent rounded-md flex items-center justify-center cursor-pointer'>
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
            "ثبت نام"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default memo(SignUpForm);
