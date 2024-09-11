import { Edit, Trash } from "lucide-react";
import truncateText from "../../utils/truncateText";
import { isPersian } from "../../utils/isPersian";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserType } from "../../types/Auth";
import imageDefault from "../../assets/images/imageDefault.jpg";
import { useUserDemo } from "../../context/UserDemoProvider";

const UserDemo = () => {
  const { userDemoData } = useUserDemo();
  return (
    <div className='w-full h-full space-y-5'>
      <div className='w-full border-b pb-1'>دمو کارت کاربر</div>
      <div className='w-full flex items-center justify-center'>
        <UserCard userDemoData={userDemoData} />
      </div>
      <div className='w-full border-b pb-1'>دمو توضیحات کاربر</div>
      <UserDetail userDemoData={userDemoData} />
    </div>
  );
};

export default UserDemo;

const UserCard = ({ userDemoData }: { userDemoData: Omit<UserType, "id"> }) => {
  return (
    <div className='w-[100%] max-w-80 min-w-80 md:min-w-44 h-auto rounded-sm bg-primary-foreground flex items-center flex-col overflow-hidden'>
      {/* profile user */}
      <Avatar className='w-16 h-16 mt-3 cursor-pointer'>
        <AvatarImage
          src={
            typeof userDemoData.avatar === "string"
              ? userDemoData.avatar
              : userDemoData.avatar.length > 0
              ? userDemoData.avatar[0] // استفاده از اولین تصویر در آرایه
              : imageDefault
          }
          alt={userDemoData.name || "پروفایل"}
        />
        <AvatarFallback className='text-xs'>پروفایل</AvatarFallback>
      </Avatar>
      {/* email amd name */}
      <div
        className='w-full flex flex-col items-center justify-between cursor-pointer mt-4'
        dir={isPersian(userDemoData.name || "نام کاربر") ? "rtl" : "ltr"}>
        <p>{truncateText(userDemoData.name || "نام کاربر", 15)}</p>
        <p>{truncateText(userDemoData.email || "ایمیل کاربر", 15)}</p>
      </div>
      {/* role and check email */}
      <div className='flex bg-slate-200 bg-opacity-25 items-center  w-full p-2 mt-3'>
        <div
          dir='ltr'
          className='w-full flex items-center justify-between'>
          <div
            className={`bg-accent rounded-sm py-1 px-2 text-xs 
            ${
              userDemoData.role === "admin"
                ? "text-yellow-500"
                : "text-blue-400"
            }
            `}>
            {userDemoData.role || "نقش کاربر"}
          </div>
          <div className='flex items-center  gap-x-2 [&>*]:w-[19px]'>
            <Edit className='cursor-not-allowed' />
            <Trash className='text-rose-500 cursor-not-allowed' />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDetail = ({
  userDemoData,
}: {
  userDemoData: Omit<UserType, "id">;
}) => {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      {/* avatar */}
      <Avatar className='w-72 h-72'>
        <AvatarImage
          src={
            typeof userDemoData.avatar === "string"
              ? userDemoData.avatar
              : userDemoData.avatar.length > 0
              ? userDemoData.avatar[0] // استفاده از اولین تصویر در آرایه
              : imageDefault
          }
          alt={userDemoData.name || "پروفایل"}
        />
        <AvatarFallback>پروفایل</AvatarFallback>
      </Avatar>
      {/* info */}
      <div className='mt-5 flex flex-col items-center w-full space-y-3'>
        <span className='font-bold text-lg w-full max-w-96'>
          کاربر شماره ...
        </span>
        <div className='detailItemStyle'>
          <span>نام</span>
          <p className='overflow-x-auto overflow-y-hidden max-w-[85%]'>
            {userDemoData.name || "نام کاربر"}
          </p>
        </div>
        <div className='detailItemStyle'>
          <span>ایمیل</span>
          <p className='overflow-x-auto overflow-y-hidden max-w-[85%]'>
            {userDemoData.email || "ایمیل کاربر"}
          </p>
        </div>
        <div className='detailItemStyle'>
          <span>رمز عبور</span>
          <span className='overflow-x-auto overflow-y-hidden max-w-[85%]'>
            {userDemoData.password || "رمز عبور"}
          </span>
        </div>
        <div className='detailItemStyle'>
          <span>نقش کاربر</span>
          <span>{userDemoData.role || "نقش کاربر"}</span>
        </div>
      </div>
    </div>
  );
};
