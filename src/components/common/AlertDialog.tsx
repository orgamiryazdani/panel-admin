import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type props = {
  title: string;
  description?: string;
  cancelBtn?: string;
  acceptBtn?: string | ReactNode;
  onClick: () => void;
  children: ReactNode;
};

const AlertDialogComponent = ({
  title,
  description = "",
  cancelBtn = "خیر",
  acceptBtn = "بله",
  onClick,
  children,
}: props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-11/12 md:w-full rounded-md">
        <AlertDialogHeader className='items-start'>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='gap-x-2'>
          <AlertDialogCancel>{cancelBtn}</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>{acceptBtn}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
