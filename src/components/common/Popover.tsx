import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const PopoverComponent = ({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className='w-52'>{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverComponent;
