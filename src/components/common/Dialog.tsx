import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

type props = {
  title: string;
  description?: string;
  acceptBtn?: string;
  onClick: () => void;
  trigger: ReactNode;
  children: ReactNode;
};

const DialogComponent = ({
  title,
  description = "",
  acceptBtn = "تایید",
  onClick,
  trigger,
  children,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] w-11/12 md:w-full rounded-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button
            type='submit'
            onClick={onClick}>
            {acceptBtn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
