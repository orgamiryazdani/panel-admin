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
import { dataLoginType } from "../../../types/Auth";
import Loading from "../../common/Loading";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
      message: "وارد کردن کلمه عبور اجباری است",
    })
    .refine((val) => val.length >= 4 || val.length === 0, {
      message: "کلمه عبور باید حداقل ۴ کاراکتر باشد",
    }),
});

const SignInForm = () => {
  const { mutateAsync, isPending } = useSignIn();
  const [showPassword, setShowPassword] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: dataLoginType) {
    mutateAsync(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 mt-10 w-4/6'>
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
              <FormItem className='flex items-center justify-center relative'>
                <FormControl className='mt-2'>
                  <Input
                    className=''
                    type={showPassword ? "password" : "text"}
                    placeholder='changeme'
                    {...field}
                  />
                </FormControl>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className='h-9 w-10 [&>*]:w-5 absolute left-1 bg-background flex items-center justify-center cursor-pointer'>
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
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
    </>
  );
};

export default SignInForm;
