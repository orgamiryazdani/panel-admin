import { useMutation } from "@tanstack/react-query";
import { ApiError } from "../types/GlobalTypes";
import { useToast } from "../components/ui/use-toast";
import { uploadFileApi } from "../services/filesService";
import { useState } from "react";
import { AxiosProgressEvent } from "axios";

// Define the response type
interface UploadResponse {
  location: string;
  // Other fields if needed
}

// Update the useUploadFile hook
export const useUploadFile = (): {
  mutateAsync: (file: FormData) => Promise<UploadResponse>;
  isPending: boolean;
  data: UploadResponse | undefined;
  progress: number;
} => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation<UploadResponse, ApiError, FormData>({
    mutationFn: (file: FormData) =>
      uploadFileApi(file, (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      }),
    onSuccess: () => {
      toast({
        title: "عکس با موفقیت آپلود شد",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
      });
      setProgress(0); // Reset progress after error
    },
  });

  return {
    ...mutation,
    progress,
  };
};
