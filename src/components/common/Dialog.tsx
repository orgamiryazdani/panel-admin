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
import { UiComponentType } from "../../types/GlobalTypes";
import { isPersian } from "../../utils/isPersian";

const DialogComponent = ({
  title,
  description = "",
  acceptBtn = "تایید",
  onClick,
  trigger,
  children,
}: Omit<UiComponentType, "cancelBtn">) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] w-11/12 md:w-full rounded-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription dir={isPersian(description) ? "rtl" : "ltr"}>
            {description}
          </DialogDescription>
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
