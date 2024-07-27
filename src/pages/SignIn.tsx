import { Link } from "react-router-dom";
import SignInForm from "../components/auth/form/SignInForm";

const SignIn = () => {
  return (
    <div className='w-svw h-svh flex md:flex-row flex-col'>
      <div className='md:w-1/2 w-full h-3/4 md:h-full flex flex-col items-center justify-center'>
        <span className='text-2xl font-bold'>وارد حساب کاربری خود شوید</span>
        <span className='text-xl text-gray-500 mt-3'>
          برای ورود ایمیل و رمز عبور خود را وارد کنید
        </span>
        <SignInForm />
        <div className='mt-6'>
          <Link
            to='/signup'
            className='text-blue-600 text-sm border-b border-blue-600'>
            حساب ندارید ؟ ثبت نام کنید
          </Link>
        </div>
      </div>
      <img
        className='md:w-1/2 w-full h-1/4 md:h-full rounded-t-2xl md:rounded-t-none object-cover'
        src='https://d3gvyx4eg3tne0.cloudfront.net/wp-content/uploads/2024/02/login.jpg'
        alt='image'
      />
    </div>
  );
};

export default SignIn;