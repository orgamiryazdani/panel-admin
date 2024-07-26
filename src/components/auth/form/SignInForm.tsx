import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { signInApi } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInApi(values);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
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
              <FormLabel>کلمه عبور</FormLabel>
              <FormControl>
                <Input
                  placeholder='changeme'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default SignInForm;
