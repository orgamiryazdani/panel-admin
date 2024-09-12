import React from "react";
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

export const ProductSkeleton = () => {
  return (
    <div
      className='w-full h-full flex flex-col justify-between min-w-72 space-y-5 mb-12'
      dir='ltr'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className='flex w-full'
          key={index}>
          <Skeleton className='h-[125px] w-[20%] min-w-10 rounded-xl' />
          <div className='space-y-5 pt-2 ml-3 min-w-10 w-[70%]'>
            <Skeleton className='h-8 w-[60%] min-w-10' />
            <Skeleton className='h-16 w-[80%] min-w-10' />
          </div>
          <div className='flex flex-col items-end justify-between w-[10%]'>
            <Skeleton className='h-2 w-[20px]' />
            <div className='space-y-2 w-full'>
              <Skeleton className='h-5 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SingleProductSkeleton = () => {
  return (
    <div
      className='flex flex-col space-y-3 w-full'
      dir='ltr'>
      <Skeleton className='h-64 w-full rounded-xl' />
      <div className='space-y-4'>
        <Skeleton className='h-8 w-[60%] mt-2' />
        <Skeleton className='h-32 w-[100%]' />
      </div>
      <div className='flex justify-between pt-3'>
        <Skeleton className='h-8 w-[30%]' />
        <Skeleton className='h-8 w-[30%]' />
      </div>
    </div>
  );
};

// category

export const CategorySkeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <React.Fragment key={index}>
          <div className='w-[45%] md:min-w-56 min-w-80 h-56 my-2'>
            <Skeleton className='h-5/6 w-full min-w-10 rounded-xl mb-3' />
            <Skeleton className='h-1/6 w-full min-w-10 rounded-xl' />
          </div>
          <div className='w-[45%] md:min-w-56 min-w-80 h-56'>
            <Skeleton className='h-5/6 w-full min-w-10 rounded-xl mb-3' />
            <Skeleton className='h-1/6 w-full min-w-10 rounded-xl' />
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export const SingleCategorySkeleton = () => {
  return (
    <div className='flex flex-col space-y-3 w-full'>
      <Skeleton className='h-64 w-full rounded-xl' />
      <Skeleton className='h-8 w-[40%] mt-2' />
      <div className='flex justify-between pt-3'>
        <Skeleton className='h-8 w-[45%]' />
        <Skeleton className='h-8 w-[45%]' />
      </div>
    </div>
  );
};

export const UsersSkeleton = () => {
  return (
    <div className='flex md:flex-wrap flex-col md:flex-row md:justify-center justify-start gap-5 w-full h-full'>
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col items-center'>
          <Skeleton className='h-36 w-[90%] md:w-44 rounded-sm mb-3' />
          <Skeleton className='h-10 w-[90%] md:w-44 rounded-sm' />
        </div>
      ))}
    </div>
  );
};

export const UserDetailSkeleton = () => {
  return (
    <div className='flex flex-col space-y-7 w-full items-center'>
      <Skeleton className='h-72 w-72 rounded-full' />
      <Skeleton className='h-10 max-w-96 w-full rounded-xl' />
      <Skeleton className='h-10 max-w-96 w-full rounded-xl' />
      <Skeleton className='h-10 max-w-96 w-full rounded-xl' />
    </div>
  );
};

export const ProfilePageSkeleton = () => {
  return <Skeleton className='md:w-96 w-80 md:h-5/6 h-4/6 bg-primary-foreground rounded-lg z-10' />;
};
