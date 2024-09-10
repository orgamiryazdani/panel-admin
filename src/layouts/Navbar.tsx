import { Link } from "react-router-dom";
import { useAccount } from "../context/AccountProvider";
import useProfile from "../hooks/useUsers";
import { Button } from "../components/ui/button";
import AlertDialogComponent from "../components/common/AlertDialog";
import { LogOut, Plus } from "lucide-react";
import { ProfileSkeleton } from "../components/common/Skeleton";
import truncateText from "../utils/truncateText";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { memo } from "react";

const Navbar = () => {
  const { data, isLoading } = useProfile();
  const { logout } = useAccount();

  return (
    <div className='w-full h-full flex items-center justify-between px-3'>
      {/* add and logout account */}
      <div className='flex text-xs w-1/2 mr-10 md:mr-0'>
        <Link to='/signin'>
          <Button className='h-9 text-[10.5px] bg-secondary text-primary hover:bg-primary-foreground'>
            ساخت حساب جدید <Plus className='w-4 mr-1 mb-[1px]' />
          </Button>
        </Link>
        <AlertDialogComponent
          title='آیا میخواهید از حساب خود خارج شوید ؟'
          onClick={() => logout(data?.email)}>
          <Button className='h-9 bg-secondary cursor-pointer text-primary hover:bg-primary-foreground hover:text-red-600 mr-2'>
            <LogOut className='w-4 rotate-180' />
          </Button>
        </AlertDialogComponent>
      </div>
      {/* profile */}
      <div className='flex items-center h-full justify-end w-1/2'>
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <Link
            to='/profile'
            className='flex items-center justify-end w-auto text-xs'>
            {/* info */}
            <div className='flex items-end h-full flex-col ml-2 mt-1 justify-center'>
              <span dir='ltr'>
                {truncateText(
                  data ? data.name.toUpperCase() : "AMIR YAZDANI",
                  10,
                )}
              </span>
              <span className=' border-white text-sky-400 text-[10px]'>
                {data?.role.toUpperCase()}
              </span>
            </div>
            {/* profile image */}
            <Avatar className='w-9 h-9'>
              <AvatarImage
                src={data?.avatar}
                alt='profile image'
              />
              <AvatarFallback className="text-[8px]">پروفایل</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);