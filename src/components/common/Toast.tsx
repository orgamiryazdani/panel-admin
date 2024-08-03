import { useToast } from "../ui/use-toast";

const ToastDemo = (title: string) => {
  const { toast } = useToast();
  return toast({
    title: title,
  });
};

export default ToastDemo;
