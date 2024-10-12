import UserCard from "../components/users/UserCard";
import AppLayout from "../layouts/AppLayout";
import { useGetUsers } from "../hooks/useUsers";
import { UserType } from "../types/Auth";
import { lazy, Suspense, useState } from "react";
import {
  UserDetailSkeleton,
  UsersSkeleton,
} from "../components/common/Skeleton";
const UserDetail = lazy(() => import("../components/users/UserDetail"));

const Users = () => {
  const plusValueUserLimit = 9;
  const [userLimit, setUserLimit] = useState(plusValueUserLimit);
  const { data, isLoading, refetch } = useGetUsers({
    limit: userLimit,
  });

  const getMoreUser = async () => {
    await setUserLimit(userLimit + plusValueUserLimit);
    refetch();
  };

  return (
    <AppLayout
      sidebar={
        <Suspense fallback={<UserDetailSkeleton />}>
          <UserDetail />
        </Suspense>
      }>
      <div className='w-full h-full'>
        <div className='w-full h-[10%] min-h-12 max-h-16 border-b flex items-center justify-center px-4'>
          <span className='text-xs lg:text-base'>
            با کلیک روی کاربر میتواند جزئیات مربوط به آن را مشاهده کنید
          </span>
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
          {data && data?.length > plusValueUserLimit - 1 && (
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
