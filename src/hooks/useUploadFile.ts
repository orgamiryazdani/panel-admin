import { useMutation } from "@tanstack/react-query";
import { ApiError } from "../types/GlobalTypes";
import { useToast } from "../components/ui/use-toast";
import { uploadFileApi } from "../services/filesService";

interface UploadResponse {
  location: string;
}

// Update the useUploadFile hook
export const useUploadFile = (): {
  mutateAsync: (file: FormData) => Promise<UploadResponse>;
  isPending: boolean;
  data: UploadResponse | undefined;
} => {
  const { toast } = useToast();

  return useMutation<UploadResponse, ApiError, FormData>({
     mutationFn: uploadFileApi,
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
    },
  });

};