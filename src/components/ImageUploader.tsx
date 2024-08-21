import React, { useState } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
import { X } from "lucide-react";

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
}

const ImageUploader = () => {
  const { mutateAsync, progress ,data} = useUploadFile();
  console.log(data);
  
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles)
        .slice(0, 3 - files.length) // محدود کردن به 3 تصویر
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
        }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      newFiles.forEach((newFile) => {
        const formData = new FormData();
        formData.append("file", newFile.file);
        mutateAsync(formData);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const defaultImage = "/src/assets/images/imageUploader.png"; // تصویر پیش‌فرض
  const previewImage = files.length > 0 ? files[0].preview : defaultImage; // اگر فایلی انتخاب شده باشد، از پیش‌نمایش استفاده کن

  return (
    <div className="flex flex-col items-end">
      <div className="relative w-full h-36 flex items-center justify-center mb-3 border rounded-md overflow-hidden">
        <input
          type="file"
          id="image"
          multiple
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
          <img
            src={previewImage}
            className="w-full h-full object-contain"
            alt="Selected preview"
          />
      </div>
      <div className="flex items-center justify-start gap-x-4 w-full">
        {files.map((file, index) => (
          <div key={index} className="relative w-20 h-20 rounded-md border overflow-hidden">
            <img src={file.preview} className="w-full h-full object-cover" alt="" />
            <button
              className="absolute top-0 right-0 m-1 text-white bg-black rounded-full"
              onClick={() => handleRemoveFile(index)}
            >
              <X size={16} />
            </button>
            <p dir="ltr" className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs text-center">
              {progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;