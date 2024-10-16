import SignInForm from "../components/auth/form/SignInForm";
import img from "../../public/images/loginImage.webp";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import SignUpForm from "../components/auth/form/SignUpForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { useAccount } from "../context/AccountProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

const textItems = [
  "امکان ورود با چند حساب",
  "قابلیت سوییچ بین اکانت ها",
  "خروج از حساب مورد نظر",
];

const SignIn = () => {
  const [tabValue, setTabValue] = useState("signin");
  const { allUserAccount } = useAccount();

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className='w-svw h-svh flex md:flex-row flex-col items-center'>
      <div className='w-full h-20 bg-background top-0 sm:hidden'></div>
      {/* login */}
      <div className='md:w-1/2 w-full max-h-[700px] h-[62%] overflow-auto lg:overflow-hidden md:h-full flex items-start justify-center xl:pt-[88px] pt-5 md:pt-12 lg:pt-10'>
        <Tabs
          value={tabValue}
          className='md:w-3/4 w-full px-6 md:px-0'>
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
              <span className='md:text-md text-xs md:text-base font-bold text-gray-500 md:mt-6 mt-3'>
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
      <div className='md:w-1/2 w-full h-[38%] md:h-full p-[18px] md:relative'>
        {/* back to home */}
        <Link
          className={`absolute md:left-9 left-5 md:top-8 top-5 bg-accent-foreground text-accent opacity-70 px-2 py-[2px] rounded-full text-xs flex items-center gap-x-1 ${
            allUserAccount.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
          }
              `}
          to={allUserAccount.length > 0 ? "/" : "/signin"}>
          برگشت به صفحه اصلی
          <ArrowLeft className='w-4 mt-[2px]' />
        </Link>
        {/* slider text */}
        <div className='absolute bottom-10 right-[25%] w-1/2 h-20 flex items-center'>
          <Carousel
            dir='ltr'
            plugins={[plugin.current]}
            className='w-full max-w-xs'
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}>
            <CarouselContent>
              {textItems.map((text) => (
                <CarouselItem key={text}>
                  <div className='p-1 flex items-center justify-center'>
                    <span className='text-xl font-semibold select-none'>
                      {text}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
