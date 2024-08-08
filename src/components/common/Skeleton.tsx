import { Skeleton } from "../ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div
      className='flex items-center w-auto'
      dir='ltr'>
      <Skeleton className='h-9 w-9 rounded-full mr-1' />
      <div className='space-y-2'>
        <Skeleton className='h-2 w-[80px]' />
        <Skeleton className='h-2 w-[40px]' />
      </div>
    </div>
  );
};
