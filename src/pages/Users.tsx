import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import UserCard from "../components/users/UserCard";
import AppLayout from "../layouts/AppLayout";
import { useGetUsers } from "../hooks/useUsers";
import { UserType } from "../types/Auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UsersSkeleton } from "../components/common/Skeleton";
import UserDetail from "../components/users/UserDetail";

const Users = () => {
  const plusValueUserLimit = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const userLimitQuery = Number(searchParams.get("userlimit"));
  const [userLimit, setUserLimit] = useState(
    userLimitQuery || plusValueUserLimit,
  );
  const { data, isLoading, refetch } = useGetUsers({
    limit: userLimit,
  });

  useEffect(() => {
    if (data && data?.length > 0) {
      searchParams.set("userlimit", String(userLimit));
      setSearchParams(searchParams);
    } else {
      setUserLimit(userLimitQuery || 9);
    }
  }, [data]);

  const getMoreUser = async () => {
    await setUserLimit(userLimit + plusValueUserLimit);
    refetch();
  };

  return (
    <AppLayout sidebar={<UserDetail />}>
      <div className='w-full h-full'>
        <div className='w-full h-[10%] min-h-12 border-b flex items-center px-4'>
          <div className='flex w-full items-center gap-x-2 relative'>
            {/* search user */}
            <Input
              type='email'
              placeholder='جستجو کاربر'
              className='w-full pr-11'
              autoComplete='false'
              // onChange={changeTitleHandler}
              // value={title}
            />
            <div className='h-8 top-1 w-10 text-muted-foreground absolute right-1 flex items-center justify-center cursor-pointer'>
              <Search className='w-5' />
            </div>
          </div>
        </div>
        {/* users card */}
        <div className='w-full h-[90%] overflow-y-auto flex flex-wrap gap-5 items-start justify-center p-3'>
          {isLoading ? (
            <UsersSkeleton />
          ) : !data ? (
            <p>کاربری وجود ندارد</p>
          ) : (
            data?.map((user: UserType) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))
          )}
          {data && data?.length > 8 && (
            <div
              onClick={getMoreUser}
              className='w-full text-center mb-2'>
              <span className='text-blue-500 border-b border-blue-500 cursor-pointer'>
                بیشتر...
              </span>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Users;
