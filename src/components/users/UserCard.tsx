import { Trash } from "lucide-react";
import { isPersian } from "../../utils/isPersian";
import truncateText from "../../utils/truncateText";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserType } from "../../types/Auth";
import AlertDialogComponent from "../common/AlertDialog";
import { useDeleteUser } from "../../hooks/useUsers";
import Loading from "../common/Loading";
import UpdateUser from "./UpdateUser";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "../../providers/AppProviders";

const UserCard = ({ user }: { user: UserType }) => {
  const { id, email, name, role, avatar, password } = user;
  const { mutateAsync, isPending } = useDeleteUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryHandler = async () => {
    await searchParams.set("useractive", id.toString());
    await setSearchParams(searchParams);
    queryClient.invalidateQueries({ queryKey: ["single-user"] });
  };

  return (
    <div className='md:w-[30%] w-[90%] min-w-80 md:min-w-44 h-auto rounded-sm bg-primary-foreground flex items-center flex-col overflow-hidden'>
      {/* profile user */}
      <Avatar
        onClick={activeCategoryHandler}
        className='w-16 h-16 mt-3 cursor-pointer'>
        <AvatarImage
          src={avatar}
          alt='profile image'
        />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      {/* email amd name */}
      <div
        onClick={activeCategoryHandler}
        className='w-full flex flex-col items-center justify-between cursor-pointer mt-4'
        dir={isPersian(name) ? "rtl" : "ltr"}>
        <p>{truncateText(name, 15)}</p>
        <p>{truncateText(email, 15)}</p>
      </div>
      {/* role and check email */}
      <div className='flex bg-slate-200 bg-opacity-25 items-center  w-full p-2 mt-3'>
        <div
          dir='ltr'
          className='w-full flex items-center justify-between'>
          <div
            className={`bg-accent rounded-sm py-1 px-2 text-xs ${
              role === "admin" ? "text-yellow-500" : "text-blue-400"
            }`}>
            {role}
          </div>
          <div className='flex items-center  gap-x-2 [&>*]:w-[19px]'>
            <UpdateUser
              id={id}
              name={name}
              role={role}
              email={email}
              avatar={avatar}
              password={password}
            />
            <AlertDialogComponent
              acceptBtn={isPending ? <Loading width='30' /> : "بله"}
              title='آیا از حذف این کاربر مطمعن هستید ؟'
              onClick={() => mutateAsync(id)}>
              <Trash className='text-rose-500 cursor-pointer' />
            </AlertDialogComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UserCard);
