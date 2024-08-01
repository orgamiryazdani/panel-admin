import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import img from "../assets/images/user-default.svg"
interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    // onUpload(data.data.url); // استفاده از data.data.url برای دریافت لینک تصویر
  };

  return (
    <div className='relative h-[88px] flex items-center justify-center my-3'>
      <input type="file" id='image' onChange={handleFileChange} className='absolute w-16 h-16 opacity-0 cursor-pointer
            '/>
      <label htmlFor="image" className='flex items-center justify-between flex-col h-full cursor-pointer '>

      <Avatar className='w-16 h-16 bg-white'>
      <AvatarImage src={img} alt="@shadcn" className='object-cover'/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <span className='text-[11px] border-b pb-[2px] border-white'>تصویر خود را انتخاب کنید ( اختیاری )</span>
      </label>
    </div>
  );
};

export default ImageUploader;