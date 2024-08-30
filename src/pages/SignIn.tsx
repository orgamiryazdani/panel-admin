import SignInForm from "../components/auth/form/SignInForm";
import img from "../assets/images/loginInage.jpg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import SignUpForm from "../components/auth/form/SignUpForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import { useAccount } from "../context/AccountProvider";

const textItems = [
  "امکان ورود با چند حساب",
  "قابلیت سوییچ بین اکانت ها",
  "خروج از حساب مورد نظر",
];

const SignIn = () => {
  const [tabValue, setTabValue] = useState("signin");
  const { allUserAccount } = useAccount();
  return (
    <div className='w-svw h-svh flex md:flex-row flex-col'>
      <div className='w-full h-20 bg-background top-0 sm:hidden'></div>
      {/* login */}
      <div className='md:w-1/2 w-full h-3/4 overflow-auto lg:overflow-hidden md:h-full flex items-start justify-center xl:pt-[88px] pt-5 md:pt-12 lg:pt-10'>
        <Tabs
          value={tabValue}
          className='w-3/4'>
          {/* tablist */}
          <TabsList className='grid w-full grid-cols-2 '>
            <TabsTrigger
              onClick={() => setTabValue("signup")}
              value='signup'>
              ثبت نام
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setTabValue("signin")}
              value='signin'>
              ورود
            </TabsTrigger>
          </TabsList>
          {/* sign in tab */}
          <TabsContent value='signin'>
            <div
              className='w-full h-full flex flex-col items-start justify-center md:mt-11 mt-6'
              dir='rtl'>
              <span className='md:text-3xl text-xl font-bold'>
                وارد حساب کاربری خود شوید
              </span>
              <span className='md:text-md text-xs font-bold text-gray-500 md:mt-6 mt-3'>
                برای ورود ایمیل و رمز عبور خود را وارد کنید
              </span>
              <SignInForm />
            </div>
          </TabsContent>
          {/* sign up tab */}
          <TabsContent value='signup'>
            <div
              className='w-full h-full flex flex-col items-start justify-center md:mt-11 mt-6'
              dir='rtl'>
              <span className='md:text-3xl text-xl font-bold'>
                یک حساب کاربری ایجاد کنید
              </span>
              <span className='md:text-base text-xs font-bold text-gray-500 md:mt-6 mt-3'>
                برای ایجاد حساب کاربری مشخصات خواسته شده را وارد کنید
              </span>
              <SignUpForm setTabValue={setTabValue} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* info  */}
      <div className='md:w-1/2 w-full h-2/4 md:h-full p-[18px] md:relative'>
        {/* back to home */}
        <Link
          className={`absolute md:left-9 left-5 md:top-8 top-5 bg-white bg-opacity-25 text-white px-2 py-[2px] rounded-full text-xs flex items-center gap-x-1 ${
            allUserAccount.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
          }
              `}
          to={allUserAccount.length > 0 ? "/" : "/signin"}>
          برگشت به صفحه اصلی
          <ArrowLeft className='w-4 mt-[2px]' />
        </Link>
        {/* slider text */}
        <div className='absolute bottom-10 right-[25%] w-1/2 h-20 flex items-center'>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet my-custom-bullet",
              bulletActiveClass: "my-custom-bullet-active",
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper'>
            {textItems.map((text) => (
              <SwiperSlide
                key={text}
                className='w-full flex items-start justify-center h-20 md:text-[21px]'>
                {text}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* image bg */}
        <img
          className='w-full h-full object-cover rounded-lg'
          src={img}
          alt='image'
        />
      </div>
    </div>
  );
};

export default SignIn;
