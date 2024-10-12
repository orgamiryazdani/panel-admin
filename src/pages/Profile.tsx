import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import useProfile from "../hooks/useUsers";
import truncateText from "../utils/truncateText";
import bgImage from "../../public/images/loginImage.webp";
import { Button } from "../components/ui/button";
import { toLocalDateString } from "../utils/toLocalDate";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfilePageSkeleton } from "../components/common/Skeleton";

const Profile = () => {
  const { data, isLoading } = useProfile();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-svw h-svh flex items-center justify-center relative'>
      <img
        src={bgImage}
        className='absolute w-full h-full object-cover'
        alt='bg image'
      />
      <div className='w-full h-full flex justify-end p-5 text-white absolute bg-slate-800 bg-opacity-35'>
        <Link to='/' className="h-6">
          <ArrowLeft />
        </Link>
      </div>
      {isLoading ? (
        <ProfilePageSkeleton />
      ) : (
        <div className='md:w-96 w-80 md:h-5/6 h-4/6 max-h-[515px] bg-primary-foreground rounded-lg z-10'>
          <div className='w-full p-7 flex flex-col items-center justify-end'>
            <div className='w-full justify-end flex'>
              <span
                className={`px-2 py-1 rounded-md
                  ${
                    data?.role === "admin"
                      ? "bg-yellow-500 text-black"
                      : "bg-blue-500 text-white"
                  }
                `}>
                {data?.role}
              </span>
            </div>
            <Avatar className='w-40 h-40'>
              <AvatarImage
                src={data?.avatar}
                alt={data?.name}
              />
              <AvatarFallback className='rounded-none relative'>
                پروفایل
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='w-full flex space-y-3 items-center flex-col justify-center'>
            <span className='text-2xl font-bold'>
              {truncateText(data?.name || "نام", 20)}
            </span>
            <span className='text-xl'>
              {truncateText(data?.email || "نام", 20)}
            </span>
          </div>
          <div className='w-full flex flex-col items-center space-y-5 justify-end px-7 mt-3'>
            <div className='w-full flex justify-end'>
              <div className='w-10 h-10 bg-opacity-50 flex items-center justify-center bg-purple-500 rounded-full font-bold pt-1 text-lg'>
                {data?.id}
              </div>
            </div>
            <Button className='w-full hover:bg-purple-700 hover:bg-opacity-20 hover:border-none gap-x-5 border bg-transparent text-primary border-purple-700 flex items-center justify-between'>
              <span>رمز عبور شما</span>
              <div className='flex items-center justify-center gap-x-3'>
                <span>
                  {showPassword ? (
                    <p className='pt-1 max-w-44 overflow-x-auto overflow-y-hidden'>
                      {data?.password}
                    </p>
                  ) : (
                    <p className='text-xl pt-3'>****</p>
                  )}
                </span>
                {showPassword ? (
                  <Eye
                    onClick={() => setShowPassword(false)}
                    className='w-5 cursor-pointer'
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowPassword(true)}
                    className='w-5 cursor-pointer'
                  />
                )}
              </div>
            </Button>
            <Button className='w-full hover:bg-purple-700 hover:bg-opacity-20 hover:border-none gap-x-5 border bg-transparent text-primary border-purple-700 flex items-center justify-between'>
              <span>تاریخ ثبت نام</span>
              <span>
                {toLocalDateString(data?.creationAt || String(Date.now()))}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
