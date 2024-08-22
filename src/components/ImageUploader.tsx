import React, { useEffect, useState } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
import { X } from "lucide-react";
import { useSingleProduct } from "../hooks/useProducts";
import defaultImg from "../assets/images/imageUploader.png";

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
}

const ImageUploader = (id: { id: number }) => {
  const { mutateAsync, progress, data } = useUploadFile();
  const { data: singleData, isLoading } = useSingleProduct(id);

  const [files, setFiles] = useState(singleData?.images || []);
  console.log(files);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      mutateAsync(formData);
    }
  };

  useEffect(() => {
    if (data?.length > 0) {
      setFiles([...files, data?.location]);
    }
  }, [data]);

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const previewImage = data ? data.location : defaultImg; // اگر فایلی انتخاب شده باشد، از پیش‌نمایش استفاده کن

  return (
    <div className='flex flex-col items-end'>
      <div className='relative w-full h-36 flex items-center justify-center mb-3 border rounded-md overflow-hidden'>
        <input
          type='file'
          id='image'
          multiple
          onChange={handleFileChange}
          className='absolute w-full h-full opacity-0 cursor-pointer'
        />
        <img
          src={previewImage}
          className='w-full h-full object-contain'
          alt='Selected preview'
        />
      </div>
      <div className='flex items-center justify-start gap-x-4 w-full'>
        {files.map((file, index) => (
          <div
            key={index}
            className='relative w-20 h-20 rounded-md border overflow-hidden'>
            <img
              src={file}
              className='w-full h-full object-cover'
              alt=''
            />
            <button
              className='absolute top-0 right-0 m-1 text-white bg-black rounded-full'
              onClick={() => handleRemoveFile(index)}>
              <X size={16} />
            </button>
            <p
              dir='ltr'
              className='absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs text-center'>
              {progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
