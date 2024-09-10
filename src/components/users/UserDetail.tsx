import { useSearchParams } from "react-router-dom";
import { useSingleUser } from "../../hooks/useUsers";
import { UserDetailSkeleton } from "../common/Skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserDetail = () => {
  const [searchParams] = useSearchParams();
  const userActive = Number(searchParams.get("useractive")) || 1;
  const { data, isLoading } = useSingleUser(userActive);

  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
      {/* avatar */}
      <Avatar className='w-72 h-72'>
        <AvatarImage
          src={data?.avatar}
          alt='profile image'
        />
        <AvatarFallback>پروفایل</AvatarFallback>
      </Avatar>
      {/* info */}
      <div className='mt-5 flex flex-col items-center w-full space-y-3'>
        <span className='font-bold text-lg w-full max-w-96'>
          کاربر شماره {data?.id}
        </span>
        <div className='detailItemStyle'>
          <span>نام</span>
          <p className='overflow-x-auto overflow-y-hidden max-w-[85%]'>{data?.name}</p>
        </div>
        <div className='detailItemStyle'>
          <span>ایمیل</span>
          <p className='overflow-x-auto overflow-y-hidden max-w-[85%]'>{data?.email}</p>
        </div>
        <div className='detailItemStyle'>
          <span>رمز عبور</span>
          <span className='overflow-x-auto overflow-y-hidden max-w-[85%]'>{data?.password}</span>
        </div>
        <div className='detailItemStyle'>
          <span>نقش کاربر</span>
          <span>{data?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
